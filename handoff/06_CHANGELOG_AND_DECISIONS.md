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

## Major Non-Negotiable Decisions

- Do not promise profit.
- Do not provide trading advice.
- Do not build broker execution.
- Do not compete directly with full backtesting platforms.
- Keep the product focused on research credibility and weekly workflow.
- Keep deploy clean and separate from the AI template project.
