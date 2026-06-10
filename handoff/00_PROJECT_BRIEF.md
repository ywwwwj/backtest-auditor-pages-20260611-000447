# Project Brief

Project name:

Backtest Auditor / 回测工具

Current product stage:

Static SaaS MVP prototype. It is deployable as a Netlify static site and currently uses browser-local storage for workspace state.

Core positioning:

> Your backtest looks profitable. We tell you why it may be fake.

Chinese positioning:

> 你的回测看起来赚钱，我们帮你找出它可能是假的地方。

More complete positioning:

> Backtest Auditor is an independent fake-backtest filter and strategy research workspace. It helps quant traders and learners decide Continue / Retest / Kill after exporting results from TradingView, Python, Excel, QuantConnect, JoinQuant, or BigQuant.

What it is:

- A second-opinion layer after existing backtesting platforms.
- A research credibility audit tool.
- A workflow for killing weak strategies faster.
- A lightweight strategy research workspace.

What it is not:

- Not a full backtesting platform.
- Not a broker or execution product.
- Not a live trading bot.
- Not investment advice.
- Not a profit predictor.
- Not a generic AI wrapper.

Why it should exist:

Large platforms already run backtests, show charts, and increasingly integrate AI. The wedge is not to replace them. The wedge is to own the uncomfortable moment after a backtest looks profitable and before the user wastes more time optimizing it.

Core product loop:

1. User exports or pastes a backtest result.
2. System maps columns automatically.
3. System runs fake-backtest filters.
4. User receives a Continue / Retest / Kill verdict.
5. User saves the strategy version.
6. System creates next tests, retest dates, and weekly queue.
7. User returns weekly to advance or kill strategy research.

Current page structure:

- `index.html`: overview landing page.
- `demo.html`: video-style product walkthrough.
- `methodology.html`: filters, supported exports, example reports, trust boundary.
- `app.html`: actual app workspace.
- `deploy/`: clean Netlify publish directory.

Current status:

- Import Wizard implemented.
- Example Report Gallery implemented.
- One-click KILL / RETEST / CONTINUE examples implemented.
- Methodology and trust page implemented.
- Demo page separated from workspace.
- Deploy directory cleaned to remove ShortForm / AI template files.
- Netlify config points to `deploy`.

Important deploy rule:

`netlify.toml` must contain:

```toml
[build]
  publish = "deploy"
  command = ""
```
