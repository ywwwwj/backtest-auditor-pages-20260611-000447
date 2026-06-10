# Product Architecture And Features

This document describes the current implementation so a new developer can understand what exists before optimizing it.

## File Structure

Root files:

- `index.html`: overview landing page.
- `demo.html`: video-style walkthrough.
- `methodology.html`: methodology, exports, examples, trust boundary.
- `app.html`: actual interactive workspace.
- `styles.css`: shared UI styling.
- `script.js`: main app logic.
- `demo.js`: demo page logic.
- `netlify.toml`: Netlify publish config.
- `PROJECT_README.md`: short project README.

Publish folder:

- `deploy/`

The `deploy/` folder should contain only:

- `index.html`
- `demo.html`
- `methodology.html`
- `app.html`
- `styles.css`
- `script.js`
- `demo.js`

If `deploy/` contains ShortForm, Agency OS, template, workspace, Gumroad, or AI-content files, it is polluted and must be cleaned before deployment.

## Page Responsibilities

### `index.html`

Purpose:

- Explain positioning quickly.
- Route users to demo, methodology, and app.
- Show the 5-in-1 research workflow.
- Show one-click examples.
- Communicate that this is a credibility layer after big platforms.

Important sections:

- Hero: "Your backtest looks profitable. We tell you why it may be fake."
- 5-in-1 workflow bundle.
- Positioning against TradingView, QuantConnect, ChatGPT, DeepSeek, and trade journals.
- One-click examples.
- Pricing placeholder.

### `demo.html`

Purpose:

- Provide a video-like walkthrough without needing a hosted video file.
- Show the story: import, map, expose fake-strong risk, verdict, retest task.

Current interaction:

- `Play demo`
- `Reset`
- Timeline buttons for each step.

Controlled by:

- `demo.js`

### `methodology.html`

Purpose:

- Build trust.
- Explain why the audit checks matter.
- Show supported exports.
- Show KILL / RETEST / CONTINUE examples.
- State the trust boundary.

Filters explained:

- Top-5 winner concentration.
- Cost and slippage stress.
- OOS / second-half decay.
- Sample confidence.
- Drawdown mismatch.
- Timestamp audit gap.

### `app.html`

Purpose:

- Actual interactive workspace.

Current major features:

- Import Wizard.
- Example Report Gallery.
- Source platform selector.
- CSV upload.
- Paste CSV / table data.
- CSV template download.
- Auto CSV Mapper.
- Personal Rulebook.
- Audit Report.
- Trust score ring.
- Strong Verdict: Continue / Retest / Kill.
- Professional Audit Pack.
- AI Research Judge using optional DeepSeek API key.
- Visual diagnostics.
- Strategy Workspace.
- Strategy version history.
- Weekly Queue.
- Retest Calendar.
- `.ics` export.
- Task status: Todo / Done / Skipped / Blocked.
- Retest result note.
- 4-week Research Review.
- Kill Reason Library.
- Kill Reason Statistics.
- Local MVP analytics.
- Waitlist / paid intent local capture.

## Main App Logic

Located in:

- `script.js`

Core state:

- `state.rows`
- `state.latestReport`
- `state.rulebook`
- `state.market`

Core functions:

- `parseCsv`
- `detectSchema`
- `calculateMetrics`
- `makeAudit`
- `buildProfessionalPack`
- `buildVerdict`
- `runAudit`
- `renderReport`
- `buildNextTestQueue`
- `renderWorkspace`
- `generateCopilotMemo`

Important examples:

- `exampleReports.kill`
- `exampleReports.retest`
- `exampleReports.continue`

Example URLs:

- `app.html?example=kill`
- `app.html?example=retest`
- `app.html?example=continue`

Expected current results:

- KILL: `Outlier Breakout`, score `41`.
- RETEST: `Thin Mean Reversion`, score `46`.
- CONTINUE: `Stable Momentum`, score `76`.

## Storage

Current version uses localStorage:

- `backtest-auditor-events`
- `backtest-auditor-reports`
- `backtest-auditor-strategy-status`
- `backtest-auditor-kill-reasons`
- `backtest-auditor-retest-dates`
- `backtest-auditor-task-records`
- `backtest-auditor-rulebook`
- `backtest-auditor-waitlist`

This is acceptable for MVP. Future Pro version should use Supabase or another backend.

## AI Memo

Current AI approach:

- User may enter optional DeepSeek API key locally.
- If no key, rule-based memo is generated.
- Prompt requires structured memo:
  - Verdict.
  - Why This May Be Fake.
  - Evidence Required To Continue.
  - Next Test Plan.
  - What To Save In The Research Log.

Important future improvement:

Move DeepSeek API calls behind a serverless function. Do not ask users to paste API keys in a production version.

## Deployment

Netlify config:

```toml
[build]
  publish = "deploy"
  command = ""
```

Current online deployment may require Netlify login or `NETLIFY_AUTH_TOKEN`.

Deploy command:

```powershell
npx netlify-cli login
npx netlify-cli deploy --prod --dir=deploy
```

## Validation Checklist

Run from project root:

```powershell
node --check .\script.js
node --check .\demo.js
node --check .\deploy\script.js
node --check .\deploy\demo.js
```

Check pollution:

```powershell
Select-String -Path .\deploy\*.html,.\deploy\*.css,.\deploy\*.js,.\netlify.toml -Pattern 'ShortForm|Agency OS|Studio Kit|AI-Content|savedList|publish = "deploy"'
```

Expected:

- No ShortForm / Agency OS / Studio Kit / AI-Content hits.
- One hit for `publish = "deploy"` in `netlify.toml`.
