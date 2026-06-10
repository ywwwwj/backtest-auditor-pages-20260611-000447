# Manual Payment Proof Flow

This document records the payment/proof page added to support the active 3-day goal.

## Why This Was Added

The previous payment validation path had:

- a manual audit request form
- a paid audit deliverable
- a payment-link hook

Remaining gap:

- Without a real Stripe / Gumroad / WeChat / Alipay link, users had no clear next page after requesting payment.

Decision:

- Add `payment.html` as a manual payment/proof page.
- Route manual audit request forms to that page by default.
- Collect proof through a Netlify Form.

## New Page

```text
payment.html
```

Purpose:

- Explain the $9 / RMB 19 manual audit order.
- Restate the trust boundary.
- Show what the customer receives.
- Collect payment reference, order note, and strategy export link.

## New Netlify Form

```text
manual-payment-proof
```

Fields:

- email
- payment method
- amount
- payment reference or order note
- strategy export link or note

## Updated Request Flow

Current flow:

```text
manual-audit-request -> payment.html -> manual-payment-proof -> fulfill with paid audit pack
```

Forms updated:

- `index.html` manual audit request
- `app.html` paid manual audit request

Both now use:

```html
data-payment-url="./payment.html"
```

## Fulfillment After Proof

When a proof/order arrives:

1. Open `app.html`.
2. Paste or upload the user's strategy export.
3. Run audit.
4. Save strategy version.
5. Generate AI memo.
6. Export paid audit pack.
7. Manually tighten the pack.
8. Send final review back to customer.

## Completion Evidence Needed

The active goal can only be completed with external evidence:

- payment processor transaction, or
- screenshot/link showing payment received, or
- documented manual transfer / paid order receipt.

`manual-payment-proof` submissions are strong evidence of payment workflow, but not enough by themselves unless the proof includes a real payment record.
