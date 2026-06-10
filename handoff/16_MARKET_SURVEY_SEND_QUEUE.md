# Market Survey Send Queue - English First

Date: 2026-06-10

Purpose: run a small, respectful market test with public English/global prospects. Do not spam. Prefer public helpful replies where platform norms allow it. Use DMs only when the platform and user profile make that normal.

Base link:

```text
[site link]/audit.html
```

Replace `[site link]` with the deployed Netlify URL.

## Tracking Links

Use one link per message so Netlify Forms can record the source:

```text
[site link]/audit.html?campaign=day1_market_survey&channel=reddit&src=reddit_overfit_1&prospect_id=prospect_01
[site link]/audit.html?campaign=day1_market_survey&channel=reddit&src=reddit_overbacktesting_1&prospect_id=prospect_05
[site link]/audit.html?campaign=day1_market_survey&channel=quantconnect&src=qc_slippage_fees_1&prospect_id=prospect_07
[site link]/audit.html?campaign=day1_market_survey&channel=quantconnect&src=qc_overfit_1&prospect_id=prospect_08
[site link]/audit.html?campaign=day1_market_survey&channel=tradingview&src=tv_coinoperator_1&prospect_id=prospect_17
```

## Send Queue

| Order | Prospect | Public URL | Tracking src | Action |
|---|---|---|---|---|
| 1 | Reddit OP: "Problem with overfitting" | https://www.reddit.com/r/algotrading/comments/1t70xws/problem_with_overfitting/ | `reddit_overfit_1` | Public helpful reply |
| 2 | Reddit thread: "Overbacktesting is bad" | https://www.reddit.com/r/algotrading/comments/1tgjtco/overbacktesting_is_bad/ | `reddit_overbacktesting_1` | Public helpful reply |
| 3 | QuantConnect: Georg Keller | https://www.quantconnect.com/forum/discussion/7756/intraday-equity-trading-fees-slippage-etc/ | `qc_slippage_fees_1` | Forum reply |
| 4 | QuantConnect: Chantal Coolsma | https://www.quantconnect.com/forum/discussion/6446/likely-overfitting-vs-not-overfitting/ | `qc_overfit_1` | Forum reply |
| 5 | TradingView author: CoinOperator | https://www.tradingview.com/script/51FVkzCB-Backtest-Pro-The-TradingView-Backtesting-Engine/ | `tv_coinoperator_1` | Public comment or profile message if allowed |

## Message 1 - Reddit Overfitting

```text
One framing that may help: separate "profitable result" from "credible research evidence."

For overfitting, I would check:
- did the parameters survive a fresh time split?
- does performance collapse after realistic slippage/fees?
- is the result concentrated in a few trades or one regime?
- can you write the exact next retest before changing parameters again?

I am market-testing a $9 Backtest Auditor review for exactly this use case: one anonymized result in, then a short Continue / Retest / Kill credibility memo out. No investment advice or signals. If useful, here is the request page:
[tracking link]
```

## Message 2 - Reddit Overbacktesting

```text
The tricky part is that more backtests can make a strategy feel more certain while actually increasing data-mining risk.

I am testing a small $9 manual Backtest Auditor review:
- top fake-strong risk
- one next retest before more tuning
- Continue / Retest / Kill verdict
- learning-log note for the next weekly review

No investment advice, no prediction, no signals. Just research credibility feedback. If anyone wants to sanity-check one anonymized result, use this:
[tracking link]
```

## Message 3 - QuantConnect Fees / Slippage

```text
This is exactly where a backtest can look strong while the research evidence is still weak.

I would review:
1. assumed fee/slippage model
2. trade count and average trade size
3. sensitivity to worse fills
4. whether the conclusion changes under conservative costs
5. the next single retest before changing strategy logic

I am market-testing a $9 manual Backtest Auditor review. If you share one anonymized QuantConnect result/export, I can return a concise Continue / Retest / Kill credibility memo. No trading advice or buy/sell signals:
[tracking link]
```

## Message 4 - QuantConnect Overfit

```text
For "likely overfit vs not overfit", I would avoid asking whether the curve looks good and instead ask what evidence would make you stop tuning.

The review checklist I am testing:
- OOS / fresh split survival
- fee and slippage stress
- sample depth
- trade concentration
- drawdown mismatch
- the one next retest

I am testing this as a $9 manual Backtest Auditor review. Send one anonymized result and I return a short Continue / Retest / Kill credibility memo. No investment advice:
[tracking link]
```

## Message 5 - TradingView Author

```text
This is a useful backtesting tool because it helps users generate evidence faster.

The next pain I see for many Strategy Tester users is post-backtest interpretation:
- does the result survive realistic costs?
- is performance concentrated in one regime?
- is there enough sample depth?
- what is the next retest before changing parameters again?

I am market-testing a $9 Backtest Auditor review that turns one anonymized Strategy Tester result into a short Continue / Retest / Kill credibility memo. No investment advice or signals. If useful, I would be happy to review one example result from your users and share the format:
[tracking link]
```

## After Sending

Update `FIRST_20_PROSPECTS_TRACKER.md` only after a message is actually posted or sent:

- `Contact status`: `Contacted`
- `Message sent`: use the tracking `src`
- `Next action`: `Wait 24h; if reply, ask for anonymized export`

Do not mark `Payment requested` until the person has agreed to send a result or asks how to pay.

Do not mark the active goal complete until `FIRST_PAID_ORDER_EVIDENCE_LOG.md` has real payment proof and a deliverable audit pack.
