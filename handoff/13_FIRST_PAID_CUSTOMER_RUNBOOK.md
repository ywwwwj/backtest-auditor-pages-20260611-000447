# First Paid Customer Runbook

This runbook is for the active 3-day goal:

> Turn Backtest Auditor into a weekly strategy research review system and validate at least one real paying customer.

## Current State

Product-side funnel is ready:

```text
manual-audit-request -> payment.html -> manual-payment-proof -> app.html audit -> export paid audit pack -> manual delivery
```

Existing assets:

- `index.html#manual-audit`
- `app.html` Paid Manual Audit section
- `payment.html`
- Netlify form: `manual-audit-request`
- Netlify form: `manual-payment-proof`
- app button: `Export sample paid audit pack`

## 24-Hour Objective

Get one real person to pay for:

```text
$9 / RMB 19 Manual Backtest Audit
```

A payment request is not enough.
Completion evidence must be one of:

- payment processor transaction
- WeChat / Alipay / bank transfer proof
- Gumroad / Stripe / Lemon Squeezy order record
- manual receipt screenshot with buyer identity and amount

## Who To Contact First

Prioritize people who already have backtest pain:

1. TradingView strategy users who share equity curves or Strategy Tester screenshots.
2. Python / pandas quant learners who run notebooks but lack validation discipline.
3. JoinQuant / BigQuant users in Chinese quant learning groups.
4. Friends or classmates who have tried trading systems or quant coursework.
5. Small creators teaching strategy research who need examples for students.

Avoid broad startup audiences first. They understand SaaS but may not feel fake-backtest pain.

## Direct Ask

Use this message:

```text
I am testing a $9 / RMB 19 manual Backtest Auditor review.
Send me one exported strategy result, CSV, TradingView screenshot/export, or backtest table.
I will return a Continue / Retest / Kill review with:
- the top fake-strong risk
- the one retest to run next
- what to save in your research log

No investment advice, no buy/sell signal, no profit prediction. Just research credibility feedback.
```

## Short Chinese Ask

```text
我在测试一个 RMB 19 的人工回测审计服务。
你发我一个回测结果、CSV、TradingView 截图/导出表，或者策略回测表。
我会给你一份 Continue / Retest / Kill 复盘：
- 最主要的假强风险
- 下一步最该做的复测
- 应该记录到研究日志里的结论

不提供投资建议，不给买卖信号，不预测收益，只做回测可信度检查。
```

## Follow-Up If They Ask What They Get

```text
You receive a paid audit pack with:
1. Verdict: Continue / Retest / Kill
2. Evidence summary: return, drawdown, Sharpe, sample count, top-5 concentration
3. Top fake-strong risk
4. Current bottleneck
5. Next test plan
6. Learning-log note for your next weekly review
```

## Follow-Up If They Hesitate

```text
Totally fair. The reason I am charging even a small amount is to test whether this saves real research time.
If it does not produce a clearer next test or kill decision, I do not want to pretend it is a product.
```

## Payment Flow

Preferred flow:

1. Send site link after deployment.
2. User submits `manual-audit-request`.
3. User opens `payment.html`.
4. User submits `manual-payment-proof` with payment reference or asks for payment method.
5. You confirm receipt manually.
6. Fulfill the audit.

If no public site is live yet:

1. Send the direct ask.
2. Receive payment manually through available method.
3. Save screenshot or receipt.
4. Ask user for strategy export.
5. Use local `app.html` to fulfill.

## Fulfillment Checklist

For each paid order:

1. Open `app.html`.
2. Paste/upload the user's backtest export.
3. Run audit.
4. Save strategy version.
5. Set Continue / Retest / Kill.
6. Add retest task note.
7. Generate AI memo.
8. Export sample paid audit pack.
9. Manually tighten the Markdown for clarity.
10. Send final review to user.

## Evidence Log Template

Record the first order like this:

```text
Date:
Buyer:
Amount:
Payment method:
Proof location:
Strategy source:
Verdict delivered:
Delivery file:
User feedback:
Would they use weekly review? Yes/No
```

## Success Criteria

Goal can be marked complete only when there is evidence of:

```text
1 real payment + 1 delivered or deliverable manual audit
```

A form submission without payment is not enough.
A verbal yes is not enough.
A payment proof with no amount or buyer identity is weak evidence and should be clarified.

## Next Product Decision After First Payment

If first buyer pays because they want a one-off answer:

- Improve paid audit pack and export flow.
- Keep Research Pro secondary.

If first buyer asks for weekly follow-up:

- Prioritize cloud workspace and weekly review reminders.

If first buyer struggles with CSV/export:

- Prioritize source-specific import templates before AI upgrades.
