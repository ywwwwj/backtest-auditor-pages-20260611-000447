# Changelog And Major Decisions

This is a concise history of major decisions and completed work.

## Phase 1: Idea Search

Initial exploration included:

- Small AI tools.
- Personal quant tools.
- Apps with subscription potential.
- AI agent businesses.
- Cal AI-style consumer utility.
- Gaming AI / TikTok-style tool.
- Linko-style multi-tool SaaS bundle.

Decision:

Move toward a professional niche tool rather than a broad consumer app.

## Phase 2: Product Wedge

Problem identified:

Many users can create backtests, but they do not know whether a profitable-looking backtest is trustworthy.

Decision:

Build a fake-backtest filter and strategy research workspace.

Core wedge:

> Large platforms produce the result. Backtest Auditor audits whether the result deserves trust.

## Phase 3: From Feature To Product

Rejected positioning:

- "AI backtest report generator."
- "Upload CSV and get a report."

Adopted positioning:

- "Research workspace."
- "Continue / Retest / Kill decision system."
- "Kill weak strategies before wasting more time."

Implemented workflow:

- Strategy versions.
- Research score trend.
- Weekly queue.
- Retest calendar.
- Kill reason library.
- Task status and result notes.

## Phase 4: Differentiation Against Big Platforms

Concern:

TradingView, QuantConnect, TradeZella, and AI assistants already integrate many features.

Decision:

Do not replace them. Sit after them.

Product language:

- Second-opinion layer.
- Independent quality gate.
- Fake-backtest filter.

## Phase 5: Page Separation

User request:

Demo should not be mixed with the workspace, and the introduction page should be separate.

Implemented:

- `index.html`: overview.
- `demo.html`: video-style demo.
- `methodology.html`: trust and methodology.
- `app.html`: workspace.

## Phase 6: Trust Layer

User requested:

- Methodology.
- Supported exports.
- Example reports.
- Trust copy.

Implemented:

- Fake Backtest Filters explanation.
- TradingView / Python / Excel / QuantConnect / JoinQuant / BigQuant import guidance.
- KILL / RETEST / CONTINUE examples.
- Explicit non-investment-advice boundary.

## Phase 7: First-Use Upgrade

User accepted the next build phase.

Implemented:

- Import Wizard.
- Example Report Gallery.
- One-click example URLs:
  - `app.html?example=kill`
  - `app.html?example=retest`
  - `app.html?example=continue`

Validated expected outputs:

- KILL: Outlier Breakout, score 41.
- RETEST: Thin Mean Reversion, score 46.
- CONTINUE: Stable Momentum, score 76.

## Phase 8: Project Packaging

User requested clean project folder on Desktop.

Completed:

- Created `C:\Users\34054\Desktop\回测工具`.
- Cleaned `deploy/`.
- Removed ShortForm / AI template pollution from deploy.
- Added project README.
- Added handoff documentation.

## Phase 9: Validation Capture Sprint

Problem:

- Waitlist and paid intent only existed in localStorage.
- That was not real validation.

Decision:

- Add Netlify Forms before building backend.
- Cover all key pages with real lead capture.
- Track three demand signals:
  - early access
  - import template requests
  - paid intent

Implemented:

- Netlify form sections on `index.html`
- Netlify form sections on `demo.html`
- Netlify form sections on `methodology.html`
- Netlify form sections on `app.html`
- Shared submit helper: `lead-capture.js`
- Example-triggered paid-intent CTA in the workspace
- New handoff file: `handoff/07_VALIDATION_CAPTURE_FORMS.md`

## Phase 10: Client Context Memory Layer

Problem:

- Memory existed at the project/workspace level, but not as reusable client or research-context memory.
- Task notes and decisions were recorded, but not analyzed enough to explain why research got stuck.

Decision:

- Add client-level context locally before adding backend complexity.
- Convert raw decisions, task notes, and Kill reasons into a visible learning timeline.
- Add a lightweight bottleneck analysis layer to identify repeated blockers.

Implemented:

- `Client Profile` section in the workspace
- `Learning Log` section in the workspace
- `Bottleneck Analysis` section in the workspace
- Local storage keys:
  - `backtest-auditor-client-profile`
  - `backtest-auditor-learning-log`
- New handoff file:
  - `handoff/08_CLIENT_CONTEXT_MEMORY_LAYER.md`

## Phase 11: AI Memo And Research Loop North Star

Problem:

- The AI memo still behaved too much like a latest-audit explanation.
- The product needed a visible North Star tied to weekly retention.

Decision:

- Feed AI memo with full workspace memory:
  - client profile
  - learning log
  - bottleneck analysis
  - task record
  - version history
  - Kill reasons
  - Research Loop stats
- Add a visible Research Loop completion panel to the workspace.

Implemented:

- Expanded `collectCopilotContext`
- Upgraded rule-based memo fallback
- Upgraded DeepSeek prompt
- Added `Research Loop completion` section
- Added `calculateResearchLoopStats`
- Added `renderResearchLoopMetrics`
- New handoff file:
  - `handoff/09_AI_MEMO_AND_RESEARCH_LOOP_NORTH_STAR.md`

## Phase 12: Payment Validation Manual Audit

Problem:

- Paid intent existed, but there was not yet a concrete offer that could produce a first real payment.

Decision:

- Add a low-friction manual audit offer before building checkout or accounts.
- Test `$9 / RMB 19` single audit demand.
- Capture requests through Netlify Forms first.
- Leave a payment-link hook for Stripe, Lemon Squeezy, Gumroad, WeChat, or Alipay.

Implemented:

- `Manual Backtest Audit` section on `index.html`
- `Paid Manual Audit` section on `app.html`
- New Netlify form:
  - `manual-audit-request`
- Payment request analytics event:
  - `payment_request`
- Payment redirect hook in `lead-capture.js` through `data-payment-url`
- New handoff file:
  - `handoff/10_PAYMENT_VALIDATION_MANUAL_AUDIT.md`

## Phase 13: Payment And Proof Clarity

Problem:

- The order page still blurred the difference between requesting the payment link and submitting proof of payment.
- That ambiguity can slow the first paid audit loop.

Decision:

- Keep the offer narrow.
- Make `payment.html` explicitly handle both paths:
  - request the $9 link
  - submit transaction evidence if already paid
- Keep the proof field concrete so the first paid order is easy to verify.

Implemented:

- Clarified the payment/proof language on `payment.html`.
- Added stronger guidance for transaction id / receipt link / screenshot evidence.

## Phase 13: Paid Audit Deliverable

Problem:

- The payment request existed, but the user could not clearly see the deliverable they would receive after paying.

Decision:

- Add a visible paid audit checklist.
- Add an exportable sample paid audit pack for manual fulfillment.

Implemented:

- Deliverable checklist on `index.html`
- Deliverable checklist on `app.html`
- `Export sample paid audit pack` button
- `exportPaidAuditPack()` in `script.js`
- Local analytics event:
  - `export_paid_audit_pack`
- New handoff file:
  - `handoff/11_PAID_AUDIT_DELIVERABLE.md`

## Phase 14: Manual Payment Proof Flow

Problem:

- Manual audit request existed, but without a real payment provider link users had no clear next page to complete or document payment.

Decision:

- Add a manual payment/proof page before full checkout integration.
- Route manual audit requests to that page by default.
- Collect payment reference and strategy export through Netlify Forms.

Implemented:

- New page:
  - `payment.html`
- New Netlify form:
  - `manual-payment-proof`
- `index.html` manual audit form routes to `payment.html`
- `app.html` manual audit form routes to `payment.html`
- `lead-capture.js` recognizes payment proof submissions
- New handoff file:
  - `handoff/12_MANUAL_PAYMENT_PROOF_FLOW.md`

## Phase 15: English-First Payment Validation

Problem:

- The first-customer outreach plan shifted away from Chinese-language customers, but the public site still showed mixed market signals such as `RMB 19`, `China version`, JoinQuant/BigQuant, WeChat, and Alipay.
- Mixed signals made the first paid validation path less focused for Reddit, QuantConnect, and TradingView prospects.

Decision:

- For the first paid validation pass, use an English/global-first funnel.
- Keep the public paid offer focused on a `$9` manual audit.
- Prioritize TradingView, QuantConnect, Python, Excel, and generic CSV exports.
- Move Chinese-language communities and RMB pricing to later backlog until the first English/global validation loop is complete.

Implemented:

- Removed RMB payment options from `index.html`, `app.html`, and `payment.html`.
- Removed Chinese payment methods from `payment.html`.
- Removed China launch toggle copy from `app.html`.
- Set `script.js` default market to `global`.
- Removed JoinQuant/BigQuant from public first-pass forms and platform guide, including the methodology support path.
- Synced updated files to `deploy/`.
- Updated handoff files:
  - `handoff/14_PUBLIC_PROSPECT_SOURCING.md`
  - `handoff/15_DAY1_OUTREACH_TO_PAYMENT_BATCH.md`
  - `handoff/FIRST_20_PROSPECTS_TRACKER.md`

## Phase 16: Outreach Landing Page

Problem:

- Cold prospects from Reddit, QuantConnect, and TradingView should not land on the full product homepage first.
- The first paid validation needs one focused action: submit one anonymized backtest for a `$9` manual audit.

Decision:

- Add a narrow `audit.html` landing page for English/global outreach.
- Keep the page focused on the first paid manual audit, trust boundary, deliverables, and Netlify request form.
- Use `audit.html` as the default link in the Day 1 outreach runbook.

Implemented:

- New page:
  - `audit.html`
- New navigation links to `$9 Audit` from `index.html`, `app.html`, `payment.html`, and `methodology.html`.
- `audit.html` posts to the existing `manual-audit-request` Netlify form and redirects to `payment.html`.
- Updated `handoff/15_DAY1_OUTREACH_TO_PAYMENT_BATCH.md` to use `[site link]/audit.html`.
- Synced `audit.html` and updated pages to `deploy/`.

## Phase 17: Tracked Market Survey Send Pack

Problem:

- Outreach messages needed real source tracking so requests can be attributed to specific Reddit, QuantConnect, or TradingView posts.
- Netlify deployment could not be completed in this environment because Netlify CLI is not logged in.

Decision:

- Add automatic attribution capture to Netlify forms.
- Preserve source parameters from `/audit.html` into the payment/proof step.
- Prepare ready-to-send market survey messages with `SITE_URL` placeholders until a Netlify URL is available.

Implemented:

- `lead-capture.js` now captures:
  - `src`
  - `campaign`
  - `prospect_id`
  - `channel`
  - `landing_path`
  - `landing_query`
  - `referrer`
- Payment redirects preserve attribution query params.
- Synced updated `lead-capture.js` to `deploy/`.
- New handoff files:
  - `handoff/16_MARKET_SURVEY_SEND_QUEUE.md`
  - `handoff/17_READY_TO_SEND_MARKET_MESSAGES.md`

Deployment blocker:

- `npx netlify status` failed through default npm cache.
- `npx --cache .\.npm-cache-netlify netlify-cli status` succeeded but reported `Not logged in`.
- Need either Netlify browser login or `NETLIFY_AUTH_TOKEN` before generating a real public URL.

## Phase 18: Isolated GitHub Pages Permanent Site

Problem:

- Netlify preview links were temporary or quota-limited.
- The user had multiple GitHub projects in progress, so Backtest Auditor needed an isolated Pages repository that would not overwrite or conflict with another project.
- The internal project repo contains handoff notes, prospect trackers, and validation strategy that should not be public.

Decision:

- Create a separate public GitHub repository containing only the static site files from `deploy/`.
- Use a dedicated repo name:
  - `backtest-auditor-pages-20260610`
- Publish from that repo's `gh-pages` branch root.
- Do not publish internal `handoff/` files, prospect trackers, or project memory.

Implemented:

- Created public repo:
  - `https://github.com/ywwwwj/backtest-auditor-pages-20260610`
- Pushed static site files to:
  - `gh-pages`
- GitHub Pages status:
  - `built`
- Permanent outreach landing page:
  - `https://ywwwwj.github.io/backtest-auditor-pages-20260610/audit.html`
- Verified `audit.html` returns HTTP 200.
- Generated final send file:
  - `handoff/20_READY_TO_SEND_MARKET_MESSAGES_FINAL.md`

## Phase 19: Second Isolated GitHub Pages Site

Problem:

- The user has two GitHub projects running at the same time.
- GitHub CLI may be used by another workflow, so the deploy must not reuse or overwrite an existing Pages target.
- The first isolated Pages repo exists, but the user requested opening another isolated page to avoid conflict.

Decision:

- Create a second separate public GitHub Pages repository containing only files from `deploy/`.
- Do not attach a remote to the internal working repo.
- Do not publish `handoff/`, prospect trackers, or project memory.
- Keep this repo separate from:
  - `backtest-auditor-pages-20260610`
  - any other live project Pages repo.

Implemented:

- Created public repo:
  - `https://github.com/ywwwwj/backtest-auditor-pages-20260611-000447`
- Published only static files from `deploy/` to:
  - `gh-pages`
- Added `.nojekyll` in the public deploy repo after the initial GitHub Pages legacy build stalled.
- Synced `.nojekyll` back into local `deploy/` for future publishes.
- GitHub Pages status:
  - `built`
- Permanent site:
  - `https://ywwwwj.github.io/backtest-auditor-pages-20260611-000447/`
- Outreach landing page:
  - `https://ywwwwj.github.io/backtest-auditor-pages-20260611-000447/audit.html`
- Verified with `curl -L -I`:
  - `/` returned `HTTP/1.1 200 OK`
  - `/audit.html` returned `HTTP/1.1 200 OK`

## Phase 20: Live Customer-View QA Fixes

Problem:

- Before outreach, the live GitHub Pages site needed a customer-view smoke test, not just a deploy status check.
- Browser testing found:
  - A missing favicon request on the homepage.
  - Mobile horizontal overflow on `demo.html`.
  - `$9 audit` form submission did not move users to payment on GitHub Pages because there is no Netlify form backend.

Implemented:

- Added `favicon.svg` and linked it from all public pages.
- Updated `lead-capture.js` so manual audit request forms redirect to `payment.html` with tracking params even when static form submission fails on GitHub Pages.
- Added mobile CSS constraints for the demo page:
  - prevent demo containers from forcing width beyond viewport
  - stack timeline and demo pill grids on mobile
  - allow CSV sample content to scroll/wrap safely
- Added reusable live QA script:
  - `scripts/run-live-pages-smoke.js`
- Synced fixes into `deploy/`.
- Pushed fixes to:
  - `https://github.com/ywwwwj/backtest-auditor-pages-20260611-000447`

Validation:

- GitHub Pages status:
  - `built`
- `curl -L -I` returned `HTTP/1.1 200 OK` for:
  - `/`
  - `/audit.html`
  - `/payment.html`
  - `/demo.html`
  - `/app.html?example=kill`
  - `/favicon.svg`
  - `/styles.css`
  - `/lead-capture.js`
- Browser QA generated screenshots under:
  - `handoff/live-pages-smoke-output/`
- Successfully verified:
  - mobile demo screenshot no longer horizontally overflows
  - `audit.html` form redirects to `payment.html?...request_status=static-site-redirect`
  - tracking params are preserved
  - KILL / RETEST / CONTINUE example URLs show the requested verdict

Known QA caveat:

- Some Playwright runs from the local machine saw intermittent `net::ERR_CONNECTION_RESET` to GitHub Pages or Google Fonts. `curl` checks and successful browser screenshots indicate this is local/network instability, not a broken internal link or missing deployed file.

## Phase 21: Speed And Friction Cleanup

Problem:

- The user reported slow page response before customer testing.
- The live pages still loaded Google Fonts from `fonts.googleapis.com` / `fonts.gstatic.com`, which can delay first paint on some networks.
- The manual audit request flow first attempted a static form POST before redirecting to the order page, making the CTA feel slow on GitHub Pages.

Implemented:

- Removed external Google Fonts from all public HTML pages.
- Kept the design on local/fallback fonts so the page no longer waits on cross-origin font requests.
- Changed manual audit request forms to immediately redirect to `payment.html` with attribution params and `request_status=order-started`.
- Preserved the order draft in `sessionStorage` so the order page can prefill email, strategy note, selected offer, main tool, and review focus.
- Synced all fixes into `deploy/`.
- Pushed fixes to:
  - `https://github.com/ywwwwj/backtest-auditor-pages-20260611-000447`

Validation:

- GitHub Pages status:
  - `built`
- `curl` timing for `/audit.html?v=126a708`:
  - total around `0.50s`
  - size `6106` bytes
- Live HTML scan for `/audit.html?v=126a708` found only:
  - `./styles.css`
  - `./lead-capture.js`
- No Google Fonts references remain in public pages.
- Playwright click test:
  - audit form submit to order page redirected in about `398ms`

Known caveat:

- First load from the local China/Asia environment can still feel slower because the host is GitHub Pages/Fastly. If global testers also report slow first loads, move the same `deploy/` folder to a faster static host or CDN-backed domain.

## Phase 22: Professional Data Layer

Problem:

- The product needs professional depth that is stronger than generic AI copy.
- The current workflow had client profile, learning log, and bottleneck analysis, but the professional evidence strategy was not visible enough.
- The built-in review should be calibrated by structured audit evidence, not by asking customers to provide model keys or vague prompts.

Implemented:

- Added a public Professional Data Layer section to `index.html`.
- Added a Professional data strategy section to `methodology.html`.
- Added a Professional Data Layer panel to `app.html` with:
  - primary evidence type
  - benchmark failure case
  - cost preset
  - regime coverage
- Added local persistence for the professional data layer.
- Added the data layer to:
  - learning log entries
  - included review preview memo
  - paid manual audit pack export
- Synced changes into `deploy/`.
- Pushed public deploy to:
  - `https://github.com/ywwwwj/backtest-auditor-pages-20260611-000447`
- Latest public deploy commit:
  - `e46fa82 Add professional data layer`

Validation:

- GitHub Pages status:
  - `built`
- `node --check .\script.js`
- `node --check .\lead-capture.js`
- `node --check .\deploy\script.js`
- `node --check .\deploy\lead-capture.js`
- Public deploy scan found no unwanted internal terms:
  - `API key`, `DeepSeek`, `OpenAI`, `model setup`, `MVP`, `ShortForm`, `Agency OS`, `Studio Kit`, `AI-Content`
- Static smoke test confirmed:
  - public Professional Data Layer sections exist
  - app form IDs exist
  - save event wiring exists
  - memo/export integrations exist
  - CSS classes exist
- Live URL checks with cache-busting `?v=e46fa82` confirmed:
  - `index.html` contains Professional Data Layer
  - `methodology.html` contains Professional data strategy
  - `app.html` contains the data layer form
  - `script.js` contains memo/export data layer integration

Known caveat:

- Full Playwright QA could not run from the local project because the local Node environment does not include a complete Playwright install. The bundled desktop runtime also exposed `playwright` without `playwright-core`.

## Phase 23: Professional Benchmark Corpus

Problem:

- The product needed more professional depth and richer cases than generic fake-backtest examples.
- The user asked whether we can extract mainstream market strategy data, train the built-in skill, and improve capability.
- The safe product direction is not to auto-discover profitable strategies, but to build a professional audit benchmark corpus that improves fake-strong detection.

Implemented:

- Added a public benchmark corpus section to `methodology.html`.
- Added professional source categories:
  - Fama-French factor data
  - AQR style premia datasets
  - QuantConnect backtest output standards
  - QuantConnect community strategy monitoring
- Expanded the in-app Fake-Strong Strategy Library from simple traps to richer audit archetypes:
  - factor clone illusion
  - regime one-hit wonder
  - parameter mining trap
- Expanded Professional Data Layer benchmark options with:
  - Academic momentum factor
  - Value factor decay
  - Cross-asset carry stress
  - Trend-following whipsaw
  - Mean-reversion cost trap
  - Pairs/stat-arb data-mining trap
  - Regime one-hit wonder
- Added benchmark audit priors in `script.js` so selected strategy archetypes now influence:
  - included review preview
  - paid audit pack export
- Synced changes into `deploy/`.

Decision:

- Do not claim that the product trains on private or proprietary market data.
- Do not claim strategy discovery, alpha generation, live-readiness, or profit prediction.
- The professional corpus is for audit calibration: identifying missing evidence, overfit risk, cost fragility, factor-clone risk, and regime weakness.

## Phase 24: Local Benchmark Training Pipeline

Problem:

- The user requested actual self-training assets: market-data backtests, 20-50 benchmark cases, scoring calibration, and RAG/fine-tune data.
- Full model fine-tuning requires an external model provider/account and should not be faked.
- The immediate useful layer is a reproducible local benchmark corpus that improves audit memo retrieval and future hosted AI prompts.

Implemented:

- Added `scripts/build_benchmark_cases.py`.
- Added `scripts/export_benchmark_cases_for_app.py`.
- Generated local training assets under `training/`:
  - `training/cases/benchmark_cases.json`
  - `training/cases/benchmark_cases.csv`
  - `training/rag/benchmark_rag_documents.jsonl`
  - `training/fine_tune/audit_memo_training.jsonl`
  - `training/benchmark_manifest.json`
  - `training/README.md`
- Generated 50 benchmark cases:
  - 18 KILL
  - 28 RETEST
  - 4 CONTINUE
- Data source status:
  - 35 cases from cached FRED market series
  - 15 cases from local bootstrap crypto-style regime seeds
- Added `benchmark-cases.js` as a compact public benchmark index for the app.
- Updated `app.html` to load `benchmark-cases.js` before `script.js`.
- Updated `script.js` so included review preview and paid audit export retrieve nearest benchmark cases.

Decision:

- Do not claim model fine-tuning has been completed.
- Current completed work is benchmark-case generation, audit-label calibration, RAG document generation, fine-tune seed JSONL, and static retrieval inside the app.
- Future true fine-tuning requires choosing a model provider, uploading `training/fine_tune/audit_memo_training.jsonl`, evaluating outputs, and controlling token cost.

## Phase 25: Public Case Library And Fine-Tune Package

Problem:

- The 50 benchmark cases needed to become customer-visible proof, not only internal training assets.
- The fine-tune seed file needed a clearer train/validation split and annotation specification before any real model-provider upload.

Implemented:

- Added `scripts/build_public_case_page.py`.
- Added `scripts/prepare_fine_tune_package.py`.
- Generated `cases.html`:
  - public benchmark case library
  - featured strategy archetypes
  - full 50-case index
  - clear boundary that cases are audit calibration, not alpha research
- Added navigation links to `cases.html` from:
  - `index.html`
  - `methodology.html`
  - `app.html`
- Added case-library styling in `styles.css`.
- Created fine-tune preparation files:
  - `training/fine_tune/audit_memo_train.jsonl`
  - `training/fine_tune/audit_memo_validation.jsonl`
  - `training/fine_tune/audit_memo_all.jsonl`
  - `training/fine_tune/LABEL_SPEC.md`
  - `training/fine_tune/fine_tune_manifest.json`
- Updated benchmark generation so the 50 cases cover:
  - momentum
  - value proxy
  - mean reversion
  - pairs/stat-arb
  - trend following
  - breakout
  - carry proxy
  - crypto grid

Validation:

- `node --check .\deploy\script.js`
- `node --check .\deploy\benchmark-cases.js`
- `python -m py_compile` for all training scripts
- JSONL format check:
  - `audit_memo_train.jsonl`: 42 rows
  - `audit_memo_validation.jsonl`: 8 rows
  - `audit_memo_all.jsonl`: 50 rows
- Public case page smoke test passed.
- Deploy directory scan found no unwanted internal project terms.

Decision:

- Public site can show `cases.html` and compact `benchmark-cases.js`.
- Do not publish full `training/` assets unless explicitly intended.
- Fine-tune is still preparation-ready, not uploaded or trained on a provider yet.

## Phase 26: Expanded Real-Market Benchmark Corpus

Problem:

- The benchmark corpus needed more real-market breadth, not just the original 50 cases.
- The user asked to continue autonomous training with real data and cases.

Implemented:

- Expanded `scripts/build_benchmark_cases.py` with additional real-market series:
  - DJIA
  - VIXCLS
  - DEXJPUS
  - DEXCHUS
  - DTWEXBGS
  - DGS10
  - DGS2
  - FEDFUNDS
- Expanded strategy templates:
  - 90-day breakout momentum
  - deep mean-reversion value proxy
  - dual breakout trend
  - 55-day expansion breakout
  - low-vol carry proxy
  - tight crypto grid proxy
- Rebuilt the corpus to 100 cases total.
- New corpus mix:
  - 26 KILL
  - 57 RETEST
  - 17 CONTINUE
- Updated the public benchmark case library to 100 cases.
- Synced `benchmark-cases.js` and `cases.html` into `deploy/`.

Validation:

- `training/benchmark_manifest.json` confirms multiple real FRED downloads plus cached and bootstrap series.
- `training/fine_tune/fine_tune_manifest.json` confirms 100 chat-style cases with train/validation split:
  - 84 train
  - 16 validation
- Public case library and benchmark payload both contain 100 cases.

Decision:

- This is still audit calibration and fine-tune preparation, not an uploaded fine-tune job.
- The current corpus is now broad enough to support a more serious hosted AI audit layer when model-provider access is configured.

## Phase 27: Professional Skill Upgrade

Problem:

- The user's goal is to cultivate a professional skill that makes the backtest tool feel credible and expert, not just more data-heavy.
- The benchmark library and fine-tune package needed a clearer public training narrative and stronger structured-output preparation.

Implemented:

- Added a public benchmark skill rubric and training workflow to `scripts/build_public_case_page.py`.
- Expanded the public `cases.html` narrative to show:
  - how the skill is trained
  - what the skill should do
  - why the corpus matters
- Added structured fine-tuning outputs in `scripts/prepare_fine_tune_package.py`:
  - `audit_memo_structured_train.jsonl`
  - `audit_memo_structured_validation.jsonl`
  - `audit_memo_structured_all.jsonl`
  - `STRUCTURED_SCHEMA.json`
- Added a stricter structured system prompt for JSON-only audit outputs.
- Kept the original chat-style audit memo data as a parallel training set.

Validation:

- Structured JSONL validation passed for all 100 cases.
- Public case page now includes:
  - Skill Rubric
  - Training Workflow
  - 100 benchmark cases
- Deploy copy of `cases.html` and `benchmark-cases.js` remains in sync.

Decision:

- The most professional posture is now a calibrated audit skill with both narrative and structured outputs.
- The next real step toward model-provider fine-tuning is upload and evaluation, not more speculative feature growth.

## Major Non-Negotiable Decisions

- Do not promise profit.
- Do not provide trading advice.
- Do not build broker execution.
- Do not compete directly with full backtesting platforms.
- Keep the product focused on research credibility and weekly workflow.
- Keep deploy clean and separate from the AI template project.
