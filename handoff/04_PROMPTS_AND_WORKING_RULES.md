# Prompts And Working Rules

This document contains reusable instructions for future optimization sessions.

## Master Prompt For Next Developer

Use this when asking another AI/developer to continue:

```text
You are continuing the Backtest Auditor project.

Read the handoff docs first:
- PROJECT_README.md
- handoff/00_PROJECT_BRIEF.md
- handoff/01_USER_REQUIREMENTS_MEMORY.md
- handoff/02_REFERENCE_CASES_AND_INSIGHTS.md
- handoff/03_PRODUCT_ARCHITECTURE_AND_FEATURES.md
- handoff/05_NEXT_OPTIMIZATION_PLAN.md

Do not rebuild the product from scratch.
Preserve the current page structure:
- index.html = overview
- demo.html = video-style demo
- methodology.html = trust/methodology
- app.html = actual workspace

The product is not a full backtesting platform and not investment advice.
The core promise is:
"Your backtest looks profitable. We tell you why it may be fake."

Every new feature must improve at least one of:
- first-use friction
- audit credibility
- Continue / Retest / Kill decision quality
- research memory
- weekly return loop
- user-specific failure-pattern data

Before editing, check deploy hygiene and avoid mixing in the separate ShortForm/AI template project.
After editing, sync to deploy and validate:
- node --check script.js demo.js deploy/script.js deploy/demo.js
- no ShortForm / Agency OS / Studio Kit / AI-Content in deploy
- app.html?example=kill/retest/continue still produce correct verdicts
```

## Product Decision Rules

Say yes to features that:

- Make the first audit easier.
- Make the verdict more trustworthy.
- Explain why a backtest may be fake.
- Save strategy research history.
- Create a next test or retest date.
- Build the user's private failure-pattern library.
- Help capture real demand.

Say no to features that:

- Turn the product into a generic chatbot.
- Promise profitability.
- Add charts without changing decisions.
- Compete directly with TradingView or QuantConnect.
- Require large backend complexity before demand is validated.
- Mix this project with ShortForm / AI template assets.

## Safe Copy Rules

Allowed copy:

- "Research credibility audit."
- "Fake-backtest filter."
- "Second-opinion layer."
- "Find fragile backtests faster."
- "Decide Continue / Retest / Kill."
- "Not investment advice."

Avoid copy:

- "Predicts profitable strategies."
- "Makes your strategy safe."
- "Ready for live trading."
- "Guaranteed alpha."
- "Automated trading profits."

## AI Memo Prompt

Current app prompt style:

```text
You are Backtest Auditor's AI Research Judge.
Use only the provided audit context.
Do not give investment advice or claim future profitability.
Produce a concise memo with exactly these sections:
- Verdict (CONTINUE/RETEST/KILL)
- Why This May Be Fake
- Evidence Required To Continue
- Next Test Plan
- What To Save In The Research Log
Be direct and skeptical.
```

Future production version should move this behind a serverless function.

## Example Report Invariants

The example reports are part of the onboarding funnel. Do not break them.

Expected behavior:

- `app.html?example=kill`
  - Title: `Outlier Breakout`
  - Verdict: KILL
  - Score around 41

- `app.html?example=retest`
  - Title: `Thin Mean Reversion`
  - Verdict: RETEST
  - Score around 46

- `app.html?example=continue`
  - Title: `Stable Momentum`
  - Verdict: CONTINUE
  - Score around 76

These examples prove the product is not one-dimensional and does not kill every strategy.

## Deploy Hygiene Prompt

Use this before deployment:

```text
Inspect deploy. It must only contain Backtest Auditor files.
Remove any ShortForm, Agency OS, Studio Kit, AI-Content, template, workspace, Gumroad, or marketing-kit artifacts from deploy.
Confirm netlify.toml publishes deploy.
Run JS syntax checks.
Open kill/retest/continue examples.
Only then deploy.
```

## Collaboration Preference

The user prefers:

- Decisive feedback, not constant praise.
- Practical build steps over vague strategy.
- Market and user-demand reasoning.
- Clear tradeoffs.
- Avoiding generic AI wrapper traps.
- Keeping features narrow and monetizable.
