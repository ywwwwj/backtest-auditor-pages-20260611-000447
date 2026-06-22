const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const baseUrl = process.env.SITE_URL || 'https://ywwwwj.github.io/backtest-auditor-pages-20260611-000447/';
const outDir = path.resolve(process.cwd(), 'handoff', 'live-pages-smoke-output');

const pages = [
  ['home', ''],
  ['audit', 'audit.html'],
  ['payment', 'payment.html'],
  ['methodology', 'methodology.html'],
  ['demo', 'demo.html'],
  ['workspace', 'app.html'],
  ['kill', 'app.html?example=kill'],
  ['retest', 'app.html?example=retest'],
  ['continue', 'app.html?example=continue'],
];

const viewports = [
  ['desktop', { width: 1440, height: 1100 }],
  ['mobile', { width: 390, height: 844 }],
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const report = {
    baseUrl,
    checkedAt: new Date().toISOString(),
    pages: [],
    interactions: [],
    failures: [],
  };

  for (const [viewportName, viewport] of viewports) {
    const context = await browser.newContext({ viewport, ignoreHTTPSErrors: true });

    for (const [name, route] of pages) {
      const page = await context.newPage();
      const consoleIssues = [];
      const requestIssues = [];
      const responseIssues = [];
      page.on('console', (message) => {
        if (['error', 'warning'].includes(message.type())) {
          const text = message.text();
          const externalResourceNoise =
            text.includes('net::ERR_CONNECTION_RESET') ||
            text.includes('Failed to load resource') ||
            text.includes('fonts.googleapis.com') ||
            text.includes('fonts.gstatic.com');
          if (!text.includes('favicon.ico') && !externalResourceNoise) consoleIssues.push(`${message.type()}: ${text}`);
        }
      });
      page.on('requestfailed', (request) => {
        const url = request.url();
        if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) return;
        requestIssues.push(`${url}: ${request.failure()?.errorText || 'request failed'}`);
      });
      page.on('response', (response) => {
        const url = response.url();
        if (!url.startsWith(baseUrl)) return;
        if (response.status() >= 400) responseIssues.push(`${response.status()} ${url}`);
      });
      page.on('pageerror', (error) => consoleIssues.push(`pageerror: ${error.message}`));

      const url = new URL(route, baseUrl).href;
      try {
        const response = await page.goto(url, { waitUntil: 'commit', timeout: 12000 });
        await page.waitForLoadState('domcontentloaded', { timeout: 12000 }).catch(() => {});
        await page.waitForTimeout(700);
        const metrics = await page.evaluate(() => ({
          title: document.title,
          textLength: document.body.innerText.length,
          textStart: document.body.innerText.slice(0, 500),
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          navLinks: [...document.querySelectorAll('a[href]')].map((a) => ({
            text: a.innerText.trim(),
            href: a.href,
          })),
          forms: [...document.querySelectorAll('form')].map((form) => ({
            id: form.id,
            name: form.getAttribute('name'),
            method: form.method,
            action: form.action,
            netlify: form.hasAttribute('data-netlify') || form.hasAttribute('netlify'),
          })),
        }));

        const screenshot = path.join(outDir, `${viewportName}-${name}.png`);
        await page.screenshot({ path: screenshot, fullPage: true });

        const entry = {
          viewport: viewportName,
          page: name,
          url,
          status: response ? response.status() : null,
          screenshot,
          overflow: metrics.scrollWidth > metrics.clientWidth + 2,
          consoleIssues,
          requestIssues,
          responseIssues,
          ...metrics,
        };
        report.pages.push(entry);

        assert(entry.status < 400, `${viewportName} ${name} returned ${entry.status}`);
        assert(entry.textLength > 150, `${viewportName} ${name} has too little visible text`);
        assert(!entry.overflow, `${viewportName} ${name} has horizontal overflow`);
        assert(consoleIssues.length === 0, `${viewportName} ${name} console issues: ${consoleIssues.join('; ')}`);
        assert(requestIssues.length === 0, `${viewportName} ${name} request issues: ${requestIssues.join('; ')}`);
        assert(responseIssues.length === 0, `${viewportName} ${name} bad internal responses: ${responseIssues.join('; ')}`);
      } catch (error) {
        report.failures.push({ viewport: viewportName, page: name, url, message: error.message });
      } finally {
        await page.close();
      }
    }

    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, ignoreHTTPSErrors: true });
  const page = await context.newPage();

  try {
    await page.goto(`${baseUrl}audit.html?src=qa_source&campaign=qa_campaign&prospect_id=qa_1&channel=qa`, { waitUntil: 'commit', timeout: 12000 });
    await page.waitForLoadState('domcontentloaded', { timeout: 12000 }).catch(() => {});
    await page.waitForTimeout(700);
    await page.fill('input[name="email"]', 'qa@example.com');
    await page.selectOption('select[name="price_option"]', { label: '$9 single audit' });
    await page.selectOption('select[name="main_tool"]', { label: 'TradingView' });
    await page.selectOption('select[name="review_focus"]', { label: 'Why this may be fake' });
    await page.fill('textarea[name="strategy_note"]', 'QA smoke test note.');
    await page.click('button[type="submit"]');
    await page.waitForURL(/payment\.html/, { timeout: 10000 });
    const after = new URL(page.url());
    report.interactions.push({
      name: 'audit form submit',
      urlAfter: page.url(),
      tracking: Object.fromEntries(after.searchParams.entries()),
    });
    assert(after.pathname.endsWith('/payment.html'), 'audit form did not redirect to payment.html');
    assert(after.searchParams.get('src') === 'qa_source', 'audit form did not preserve src');
    assert(after.searchParams.get('campaign') === 'qa_campaign', 'audit form did not preserve campaign');
  } catch (error) {
    report.failures.push({ interaction: 'audit form submit', message: error.message, url: page.url() });
  }

  for (const verdict of ['kill', 'retest', 'continue']) {
    try {
      await page.goto(`${baseUrl}app.html?example=${verdict}`, { waitUntil: 'commit', timeout: 12000 });
      await page.waitForLoadState('domcontentloaded', { timeout: 12000 }).catch(() => {});
      await page.waitForTimeout(700);
      const body = await page.locator('body').innerText();
      report.interactions.push({
        name: `${verdict} example verdict`,
        found: body.includes(verdict.toUpperCase()),
      });
      assert(body.includes(verdict.toUpperCase()), `${verdict} example did not show ${verdict.toUpperCase()}`);
    } catch (error) {
      report.failures.push({ interaction: `${verdict} example`, message: error.message });
    }
  }

  await context.close();
  await browser.close();

  fs.writeFileSync(path.join(outDir, 'live-pages-smoke-results.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({
    outDir,
    checkedPages: report.pages.length,
    failures: report.failures,
    screenshots: report.pages.map((page) => page.screenshot),
  }, null, 2));

  if (report.failures.length > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
