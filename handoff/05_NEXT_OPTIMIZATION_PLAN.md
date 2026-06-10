# Next Optimization Plan

This document gives the recommended next steps after the current static MVP.

## Current Priority

The product has enough pages and core workflow for a static MVP.

The next goal should be:

> Turn interest into real validation.

Do not add broad features until there is evidence that users understand the product and are willing to leave contact information or request imports.

## Priority 1: Real Lead Capture

Why:

Current waitlist and paid intent are stored locally. That is not real validation.

Build:

- Early Access Form.
- Request Import Template Form.
- "I would pay for weekly strategy review" intent form.

Recommended low-complexity implementation:

- Netlify Forms first.
- Later migrate to Supabase.

Suggested fields:

- Email.
- User type: Student / Individual trader / Quant learner / Creator / Small desk.
- Main tool: TradingView / Python / Excel / QuantConnect / JoinQuant / BigQuant / Other.
- Biggest pain: overfit / CSV import / AI memo / strategy tracking / other.
- Optional note.

Success signal:

- Users submit email.
- Users request a platform-specific import template.
- Users click paid-intent after viewing a sample report.

## Priority 2: Production AI Memo

Why:

Asking users to paste a DeepSeek API key is only acceptable for local demo. It is not product-grade.

Build:

- Netlify Function or other serverless endpoint.
- Server-side DeepSeek API call.
- Frontend calls `/api/generate-memo`.
- Add rate limits or simple free-tier limit.

Free version:

- 1 to 3 AI memos per day or per email.

Pro version:

- Full memo.
- Multi-version comparison.
- Weekly research review.
- Kill reason summary.
- Personal rulebook suggestions.

Do not allow:

- Investment advice.
- Buy/sell recommendations.
- Profit prediction.

## Priority 3: Cloud Workspace

Why:

The current Strategy Workspace uses localStorage. That is fine for MVP but weak for paid Pro.

Build later with Supabase:

- Auth.
- Users.
- Strategies.
- Strategy versions.
- Research tasks.
- Kill reasons.
- Retest dates.

Minimum tables:

```text
users
strategies
strategy_versions
research_tasks
kill_reasons
```

Do this only after lead capture indicates demand.

## Priority 4: Import Templates And Guides

Why:

CSV preparation can become a drop-off point.

Build:

- TradingView import guide.
- Python pandas export snippet.
- Excel copy-paste guide.
- QuantConnect export guide.
- JoinQuant / BigQuant guide.
- Downloadable CSV templates.

Use lead form results to decide which platform comes first.

## Priority 5: Stronger Methodology

Why:

The product sells trust. The methodology page should become more professional over time.

Possible additions:

- More precise explanation of each filter.
- Visual examples of false confidence.
- Simple formulas for top-5 concentration, drawdown, cost stress, and OOS decay.
- Report cards that show exact evidence used in each verdict.

## What Not To Do Next

Do not prioritize:

- Mobile app.
- Social feed.
- Full backtest engine.
- Broker execution.
- Live trading.
- Complex account system before lead capture.
- More charts that do not change decisions.

## Suggested Next Build Sprint

Sprint name:

Validation Capture Sprint

Deliverables:

1. Add real Netlify Forms.
2. Add Early Access CTA on `index.html`, `demo.html`, `methodology.html`, and `app.html`.
3. Add Request Import Template form.
4. Add paid-intent CTA after example report load.
5. Save form docs in `handoff/` and update `PROJECT_README.md`.

Validation:

- Submit test form locally or on Netlify.
- Confirm Netlify receives submissions.
- Confirm no ShortForm/AI template pollution.
- Confirm example reports still work.

## Later Build Sprint

Sprint name:

AI Memo Production Sprint

Deliverables:

1. Add Netlify Function for DeepSeek.
2. Move prompt server-side.
3. Add fallback when API fails.
4. Add free usage limit.
5. Remove user-facing API-key field from production UI.

## Strategic North Star

The goal is not to become the biggest quant platform.

The goal is to become the tool users open after a backtest looks good and before they decide whether to spend another week on it.
