# AI Memo And Research Loop North Star

This document records the next optimization toward the active 3-day goal:

> Turn Backtest Auditor into a weekly strategy research review system and validate at least one real paying customer.

## Why This Upgrade Matters

The North Star is not page visits or email capture.

The North Star is:

```text
Weekly completed Research Loops
```

A completed Research Loop means:

```text
import backtest -> generate audit -> save strategy version -> record blocker/reason -> schedule retest -> update task/result -> decide Continue / Retest / Kill
```

## What Changed

### AI Research Judge Context

The AI memo now uses:

- latest audit
- client profile
- learning log
- bottleneck analysis
- current task record
- version history
- Kill reasons
- Research Loop stats

This makes the memo less like a generic trading analysis and more like a workspace-aware research assistant.

### Rule-Based Memo

The no-API fallback memo now includes:

- Verdict
- Client / research context
- Why this matters
- What the workspace already learned
- Top repeated bottleneck
- Next test plan
- What to save in the learning log
- Research Loop progress

### DeepSeek Prompt

The DeepSeek prompt now asks for exactly:

- Verdict
- Why This May Be Fake
- What The Workspace Already Learned
- Current Bottleneck
- Next Test Plan
- What To Save In The Learning Log

It also explicitly prohibits:

- investment advice
- buy/sell signals
- future profit claims

## Research Loop Metric

New workspace section:

- `Research Loop completion`

A strategy is counted as complete when it has:

- saved audit
- Continue / Retest / Kill decision
- retest date or Kill exclusion
- task update or retest note

The panel shows:

- number of strategies
- completed loops
- completion percentage
- missing step per strategy

## Product Implication

This moves the product closer to retention:

- Users can see what remains before a loop is complete.
- AI memo can tell them what to do next based on memory.
- The workspace now has a measurable reason to return weekly.

## Next Best Step

The next sprint should focus on payment validation:

1. Add a simple paid manual audit offer.
2. Add a checkout-ready CTA or payment link placeholder.
3. Create a sample "weekly research review" deliverable.
4. Ask real users to submit one strategy and pay for the review.
