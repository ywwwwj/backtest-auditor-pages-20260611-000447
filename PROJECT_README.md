# Backtest Auditor

Backtest Auditor is a static SaaS prototype for auditing exported backtest results.

Positioning:

- It is not a full backtesting platform.
- It is not a broker or live-trading tool.
- It does not predict future returns or provide investment advice.
- It helps quant researchers decide Continue / Retest / Kill by checking whether a profitable-looking backtest may be fake-strong.

Pages:

- `index.html`: overview landing page.
- `demo.html`: video-style demo walkthrough.
- `methodology.html`: methodology, supported exports, example reports, and trust boundary.
- `app.html`: actual audit workspace with Import Wizard, CSV paste/upload, Auto CSV Mapper, Professional Audit Pack, AI memo, Strategy Workspace, Client Profile, Learning Log, Bottleneck Analysis, Weekly Queue, Retest Calendar, and example reports.
- `payment.html`: manual payment/proof page for the $9 / RMB 19 audit validation flow.

Key examples:

- `app.html?example=kill`
- `app.html?example=retest`
- `app.html?example=continue`

Deploy:

- Netlify publish directory: `deploy`
- Required config: `netlify.toml`

Validation:

```powershell
node --check .\script.js
node --check .\demo.js
node --check .\deploy\script.js
node --check .\deploy\demo.js
```

Current deploy folder has been cleaned to contain only Backtest Auditor files.

Validation capture:

- Real lead capture now uses Netlify Forms instead of browser-only waitlist storage.
- Form types:
  - `early-access`
  - `import-template-request`
  - `paid-intent`
  - `manual-audit-request`
  - `manual-payment-proof`
- Form entry points currently exist on:
  - `index.html`
  - `demo.html`
  - `methodology.html`
  - `app.html`
- Shared submit helper:
  - `lead-capture.js`

Workspace memory:

- `Client Profile`: reusable research context for tool, goal, risk boundary, cadence, and decision style.
- `Learning Log`: timeline generated from profile updates, saved audits, decisions, retest notes, and Kill reasons.
- `Bottleneck Analysis`: lightweight analysis of repeated import, cost, OOS, sample, review, and unclear-next-step blockers.
- `Research Loop completion`: North Star metric for saved audit + decision + retest scheduling + task update/note.
- `AI Research Judge`: memo context includes latest audit, client profile, learning log, bottleneck analysis, task record, version history, and Kill reasons.

Payment validation:

- `Manual Backtest Audit`: $9 / RMB 19 paid audit request offer.
- Current implementation submits `manual-audit-request` to Netlify Forms.
- Current payment request forms redirect to `payment.html`.
- `payment.html` submits `manual-payment-proof` to Netlify Forms.
- Replace `data-payment-url="./payment.html"` with a Stripe, Lemon Squeezy, Gumroad, WeChat, or Alipay link when ready.
- Local analytics event: `payment_request`.
- Paid audit deliverable:
  - Visible deliverable checklist on landing/app.
  - `Export sample paid audit pack` button in app.
  - Local analytics event: `export_paid_audit_pack`.

Handoff documents:

- `handoff/00_PROJECT_BRIEF.md`
- `handoff/01_USER_REQUIREMENTS_MEMORY.md`
- `handoff/02_REFERENCE_CASES_AND_INSIGHTS.md`
- `handoff/03_PRODUCT_ARCHITECTURE_AND_FEATURES.md`
- `handoff/04_PROMPTS_AND_WORKING_RULES.md`
- `handoff/05_NEXT_OPTIMIZATION_PLAN.md`
