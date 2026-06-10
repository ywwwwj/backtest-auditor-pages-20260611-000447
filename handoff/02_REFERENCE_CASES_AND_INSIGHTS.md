# Reference Cases And Insights

This document captures the external product cases and ideas that influenced Backtest Auditor.

## Case 1: AI Wrappers Versus Real Products

Core insight:

Many products are built on existing infrastructure. That alone is not the problem. The problem is whether the result is merely a feature or a real product.

Important distinction:

- A feature can be copied or absorbed by a platform.
- A product embeds into a real workflow and accumulates user-specific data.

PDF chat apps were used as a negative example:

- Upload PDF and ask questions was useful.
- But once OpenAI and other platforms supported it natively, many standalone tools lost their reason to exist.
- They were mostly features, not products.

Cursor was used as a positive example:

- It also uses AI APIs.
- But it embeds AI into the entire developer workflow: codebase context, file edits, command execution, agentic actions, project memory.
- The user does not just "call AI"; the user works inside a new workflow.

Lesson for Backtest Auditor:

Do not sell "AI backtest analysis" as a thin wrapper.

Sell:

- Strategy research workflow.
- Version history.
- Kill reasons.
- Weekly retest queue.
- Personal rulebook.
- Evidence-based AI memo.

The defensibility comes from workflow memory and user-specific failure-pattern data.

## Case 2: Jenni AI

Observed lesson:

Jenni AI was discussed as an AI writing product that grew by embedding into a writing workflow rather than merely calling a model.

Lesson for Backtest Auditor:

AI Memo should not be the product. It should be a structured layer built from:

- Audit data.
- Strategy version history.
- Next-test queue.
- Kill reason library.
- User rulebook.

## Case 3: Linko 5-in-1 SaaS Bundle

Linko bundled multiple ordinary tools:

- Short links.
- Link-in-bio pages.
- Branded short domains.
- Dynamic QR codes.
- File hosting.
- Click analytics and redirect tracking.

The individual features were not all best-in-class. The value was "one dashboard, one price, fewer subscriptions."

Key Linko lessons:

1. If you cannot beat single-point champions, build a useful bundle.
2. Find a painful issue competitors avoid talking about.
3. Make the middle pricing tier the main offer.
4. Bundle related 80-point features for small customers.
5. The real wedge was not "more tools"; it was cleaner click data and anti-bot trust.

Backtest Auditor equivalent:

- We do not beat TradingView or QuantConnect as a backtester.
- We do not beat TradeZella as a full journal.
- We do not beat ChatGPT as a general assistant.
- We bundle the strategy quality workflow after backtesting.

Our equivalent to Linko's anti-bot wedge:

> Fake-backtest filtering.

Our 5-in-1 bundle:

1. Auto CSV Mapper.
2. Fake Backtest Filters.
3. AI Research Judge.
4. Strategy Workspace.
5. Retest Calendar / Weekly Queue.
6. Failure Pattern Library as the moat.

## Case 4: Cal AI And Consumer App Inspiration

Cal AI was referenced as a high-growth, practical app example.

Lesson:

Mass-market apps can win through strong onboarding, low friction, and repeated daily utility. But Backtest Auditor is more suitable as a niche professional tool than as a mass consumer app.

Implication:

Do not chase broad consumer virality first. Instead:

- Make onboarding almost instant.
- Let users see value without preparing data.
- Use examples and demo pages.
- Convert professional users with workflow specificity.

## Case 5: Gaming AI / TikTok Tool Inspiration

The user was interested in tools that combine AI with platform-like engagement.

Lesson:

Backtest Auditor should not become a content feed, but it can borrow the idea of addictive progression:

- Weekly queue.
- Retest tasks.
- Done / Skipped / Blocked task status.
- Strategy score trend.
- 4-week review.
- Kill reason statistics.

The "platform-like" layer should be task progression, not social content.

## Case 6: Big Platforms Already Integrate Everything

Important strategic conclusion:

Large platforms can run backtests, store data, show charts, and integrate AI. Competing as a full platform is not realistic for a one-person MVP.

Therefore Backtest Auditor should be:

> A second-opinion quality gate after big platforms.

Use case:

- User runs strategy in TradingView.
- User exports or pastes result.
- Backtest Auditor challenges the result.
- User decides Continue / Retest / Kill.

## Product Rule Derived From All Cases

Do not add broad features.

Every new feature should answer one of these:

- Does it reduce first-use friction?
- Does it make the audit more credible?
- Does it help the user decide Continue / Retest / Kill?
- Does it create strategy research memory?
- Does it make the user return next week?
- Does it collect user-specific failure-pattern data?

If not, skip it.
