# Public Prospect Sourcing - Backtest Auditor

Date: 2026-06-09

Purpose: find public, relevant, normally contactable prospect pools for the first paid manual audit without scraping private data or spamming.

## Safety Rules

- Use only public posts, public handles, public community threads, or existing warm relationships.
- Do not collect private emails, phone numbers, real identities, account balances, broker logins, or strategy code unless the person voluntarily sends an anonymized export for audit.
- Do not promise profit, live-readiness, or investment advice.
- First contact should be a useful public reply where possible; DM only if the platform and person make that normal.

## Current Focus

For the first paid validation pass, do not prioritize Chinese-language customers.

Focus only on English/global prospects:

- Reddit algo trading and TradingView users.
- QuantConnect users with structured backtest evidence.
- TradingView strategy/template authors with existing distribution.

Chinese-language communities such as vn.py, JoinQuant, BigQuant, Zhihu, and Xiaohongshu stay in the later backlog until the first English/global validation loop is complete.

## Best Candidate Pools

| Priority | Source | Why it fits | Pain signal | Outreach angle |
|---|---|---|---|---|
| P0 | Reddit r/algotrading overfitting threads | Users already admit their backtests look too good or fragile | OOS proof, data snooping, over-optimization | Offer a cheap Continue / Retest / Kill review for one anonymized result |
| P0 | QuantConnect forum fee/slippage/live-vs-backtest posts | Users can export structured backtests and understand audit value | Slippage, fills, live discrepancy, overfit labels | Offer independent credibility audit, not code debugging or signals |
| P1 | TradingView backtest-template authors | They have audiences of users running Strategy Tester reports | Users need post-backtest interpretation | Ask for collaboration or one anonymized user report |
| P2 | TradingView strategy users/commenters | Many create Strategy Tester outputs but lack robust next steps | Repainting, intrabar accuracy, costs, drawdown | Comment with fake-strong checklist and link to manual audit |

## First Outreach Script - English

```text
I am testing a $9 manual Backtest Auditor review.

If you send one anonymized backtest result, TradingView Strategy Tester screenshot/export, CSV, or QuantConnect result, I will return a short Continue / Retest / Kill review:
- the top fake-strong risk
- the one retest to run next
- what to save in your research log

No investment advice, no buy/sell signal, no profit prediction. Just research credibility feedback.
```

## Next Action

Contact prospects in this order:

1. Reddit overfitting threads: easiest pain match.
2. QuantConnect fee/slippage and overfitting threads: best evidence quality.
3. TradingView authors: best distribution, slower conversion.
4. TradingView strategy users/commenters: broad top-of-funnel, use sparingly to avoid spam.

Record every contact in `FIRST_20_PROSPECTS_TRACKER.md`. The goal is not "20 names"; the goal is one real payment and one deliverable paid audit.
