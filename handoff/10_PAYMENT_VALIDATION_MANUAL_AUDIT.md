# Payment Validation Manual Audit

This document records the first payment-validation offer for the active 3-day goal.

## Goal

Move from:

```text
paid intent
```

to:

```text
specific paid audit request
```

The target is to validate at least one real paying customer for Backtest Auditor.

## Offer

Offer name:

```text
Manual Backtest Audit
```

Price test:

- `$9 single audit`
- `RMB 19 single audit`
- `$29 weekly review waitlist`

Promise:

- User sends one exported strategy result or strategy note.
- Backtest Auditor provides a skeptical credibility review.
- Output focuses on Continue / Retest / Kill, top failure pattern, and the next test to run.

Trust boundary:

- Not investment advice.
- No buy/sell signals.
- No profit prediction.
- Not live-trading readiness.

## Implementation

New Netlify Form:

```text
manual-audit-request
```

Entry points:

- `index.html`: `#manual-audit`
- `app.html`: paid manual audit block inside monetization section

Fields:

- email
- price option
- main tool or review focus
- strategy export link or note
- latest strategy context in app flow:
  - latest strategy
  - latest verdict
  - latest score
  - Research Loop completion

Local analytics event:

```text
payment_request
```

## Payment Link Hook

The current MVP submits the request to Netlify Forms.

When a payment link is ready, add this attribute to payment forms:

```html
data-payment-url="https://your-payment-link"
```

Supported link types:

- Stripe Payment Link
- Lemon Squeezy checkout
- Gumroad product
- WeChat / Alipay payment instruction page

`lead-capture.js` will redirect after successful Netlify form submission if `data-payment-url` is present.

## Why This Matters

This is the shortest path to the payment requirement:

- It does not require auth.
- It does not require checkout integration.
- It tests whether the user will pay for the core pain: avoiding wasted research time.
- It can be manually fulfilled before building scalable product infrastructure.

## Next Outreach Script

Use this direct ask:

```text
I am testing a $9 / RMB 19 manual Backtest Auditor review.
Send one exported strategy result and I will return a Continue / Retest / Kill review with the top fake-strong risk and the next test to run.
No investment advice, just research credibility feedback.
```

## Completion Evidence Needed

The product goal is not complete until there is evidence of:

- one real payment received, or
- a payment-link transaction record, or
- a documented paid manual audit order with receipt.

Form submissions alone count as payment requests, not completed payment.
