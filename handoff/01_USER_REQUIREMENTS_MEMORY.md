# User Requirements Memory

This document summarizes the user's most important requirements, preferences, and decisions that shaped the product.

## Strategic Background

The user wanted a realistic, monetizable indie SaaS direction that could be built by one person with low cost and high specificity. Early ideas included:

- Personal quant tools.
- AI agent tools.
- Practical consumer or business utilities.
- A platform-like, addictive interaction model.
- Examples such as Cal AI, gaming AI TikTok tools, Linko-style SaaS bundling, and AI wrapper products that become real workflow products.

The direction converged into Backtest Auditor:

> A research workspace that helps quant traders kill weak strategies before wasting more time.

## Requirements That Must Be Preserved

The product should:

- Be more than a CSV report generator.
- Avoid generic AI features.
- Have a professional, narrow workflow.
- Be useful even when users already use TradingView, QuantConnect, Python, Excel, JoinQuant, or BigQuant.
- Compete by owning a specific painful workflow rather than becoming a broad platform.
- Make users return weekly through strategy versions, retest tasks, and kill reasons.
- Have clear paid value through workflow memory, not just more charts.
- Support both domestic and global positioning.

## Strong Product Principles From the User

The user repeatedly emphasized:

- Do not just praise or agree. Make decisive judgments.
- Check whether there is real demand and whether users will return.
- Product must solve a pain, be convenient, and retain customers.
- Professional rules, complete workflow, structured output, and repeat usage matter more than generic AI.
- If the user only uploads once and gets a report, it is a feature.
- If the user returns weekly to manage strategy versions, run tests, and make Continue / Retest / Kill decisions, it is a product.

## Core Features Requested

Already implemented or reflected in current version:

- Paste CSV / table data.
- CSV template.
- Auto CSV Mapper.
- Professional Audit Pack.
- Strong Verdict: Continue / Retest / Kill.
- AI Memo / AI Research Judge.
- Weekly Queue.
- Retest Calendar.
- Task status: Todo / Done / Skipped / Blocked.
- Retest result note.
- 4-week Research Review.
- Kill Reason Statistics.
- Export weekly retests as `.ics`.
- Demo separated from workspace.
- Overview page separated from app.
- Methodology page or section.
- Supported exports guide.
- Example reports: KILL / RETEST / CONTINUE.
- Trust copy saying it is not investment advice and does not predict returns.
- Import Wizard.
- Example Report Gallery.
- One-click samples.

## Current Product Pages Requested

The user explicitly wanted pages separated:

- Introduction page should be separate.
- Demo should be a separate page and should feel like a video-style demo, not just a button inside the workspace.
- Workspace should be separate.

Current implementation:

- `index.html`: introduction.
- `demo.html`: video-style demo.
- `methodology.html`: trust/methodology.
- `app.html`: workspace.

## Key User Wording To Preserve

English:

- "Your backtest looks profitable. We tell you why it may be fake."
- "Backtest Auditor is a research workspace that helps quant traders kill weak strategies before they waste more time."
- "Turn every weak signal into a scheduled research test."

Chinese:

- "你的回测看起来赚钱，我们帮你找出它可能是假的地方。"
- "一个帮量化研究者尽早淘汰假强策略的研究工作台。"
- "把每个风险信号变成一个有截止日期的复测任务。"

## Features Not To Overbuild Yet

Avoid for now unless explicitly requested:

- Full backtesting engine.
- Broker execution.
- Live trading or profit claims.
- Community feed or TikTok-like platform.
- Mobile app.
- Generic AI chat.
- Too many charts without workflow value.
- Complex accounts and backend before demand is validated.

## Next Business Objective

The next phase should improve conversion:

1. Make first use frictionless.
2. Capture real user interest.
3. Productize AI API safely.
4. Move workspace data from localStorage to cloud only after validation.
