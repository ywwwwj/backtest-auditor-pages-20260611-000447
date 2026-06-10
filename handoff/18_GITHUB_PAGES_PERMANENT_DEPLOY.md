# GitHub Pages Permanent Deploy

Date: 2026-06-10

Purpose: replace temporary Netlify preview links with a permanent static website URL for outreach.

## Why GitHub Pages

- Free static hosting.
- Permanent public URL.
- Good fit for this project because the site is plain HTML, CSS, and JavaScript.
- No build step required because `deploy/` already contains the publish-ready site.

## What Is Configured

GitHub Actions workflow:

```text
.github/workflows/pages.yml
```

It publishes:

```text
deploy/
```

Expected public URL after deployment:

```text
https://<github-username>.github.io/<repo-name>/
```

The outreach landing page will be:

```text
https://<github-username>.github.io/<repo-name>/audit.html
```

## One-Time Setup

Run these commands after creating an empty GitHub repository.

Replace:

- `<github-username>`
- `<repo-name>`

```powershell
git init
git config user.name "YOUR_NAME"
git config user.email "YOUR_EMAIL"
git branch -M main
git add .
git commit -m "Launch Backtest Auditor static site"
git remote add origin https://github.com/<github-username>/<repo-name>.git
git push -u origin main
```

Then in GitHub:

1. Open the repository.
2. Go to `Settings` -> `Pages`.
3. Under `Build and deployment`, select `GitHub Actions`.
4. Go to the `Actions` tab and wait for `Deploy static site to GitHub Pages` to finish.

## After It Deploys

Set:

```text
SITE_URL=https://<github-username>.github.io/<repo-name>
```

Then use:

```text
handoff/17_READY_TO_SEND_MARKET_MESSAGES.md
```

Replace every `SITE_URL` placeholder with the real GitHub Pages URL before sending market survey messages.

## Tracking Notes

The site already tracks outreach source params in Netlify-style forms:

- `campaign`
- `channel`
- `src`
- `prospect_id`
- `landing_path`
- `landing_query`
- `referrer`

Important caveat:

- GitHub Pages does not collect form submissions by itself.
- For form capture, either keep Netlify Forms, add Formspree/Tally, or use a manual email/payment link.
- The current GitHub Pages deploy solves the permanent URL problem, not backend form storage.
- `lead-capture.js` now provides a static-site fallback: if form submission fails, the page shows a copyable request block that the prospect can send back in the same Reddit, QuantConnect, or TradingView thread/DM.

## Recommended Next Step

For the first $9 validation, use GitHub Pages as the permanent public page and handle payment/order proof manually:

1. Prospect opens `/audit.html`.
2. Prospect replies or sends an export by email/DM.
3. Request $9 payment manually.
4. Record proof in `FIRST_PAID_ORDER_EVIDENCE_LOG.md`.

If form submissions are required on GitHub Pages, add a hosted form endpoint next.
