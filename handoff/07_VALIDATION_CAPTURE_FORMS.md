# Validation Capture Forms

This document records the first real lead-capture layer added after the static MVP.

## Why This Was Added

Previous version:

- Waitlist and paid intent were saved only in browser localStorage.
- That was useful for demo instrumentation but not real market validation.

Current decision:

- Use Netlify Forms first.
- Keep implementation static and low-complexity.
- Do not add accounts or backend yet.

This matches the Validation Capture Sprint from `05_NEXT_OPTIMIZATION_PLAN.md`.

## Forms Added

Three Netlify form types are now used:

1. `early-access`
2. `import-template-request`
3. `paid-intent`

## Entry Points

Current page coverage:

- `index.html`
  - Early Access
  - Import Template Request
  - Paid Intent
- `demo.html`
  - Early Access
  - Paid Intent
- `methodology.html`
  - Import Template Request
  - Early Access
- `app.html`
  - Early Access
  - Import Template Request
  - Paid Intent

## Shared Frontend Logic

New shared file:

- `lead-capture.js`

Role:

- Intercepts lead forms.
- Submits URL-encoded payloads to `/`.
- Shows lightweight success/failure message.

Important note:

- In local preview, submit may fail depending on environment.
- On Netlify deploy, submissions should appear in the Netlify Forms dashboard.

## App-Specific Conversion Upgrade

`app.html` and `script.js` were upgraded so that:

- Example report loads can trigger a paid-intent conversion panel.
- Latest strategy name, verdict, score, and example type are copied into hidden paid-intent form fields.
- Local analytics events are still preserved for funnel observation.

## What Was Intentionally Not Added

Not added yet:

- Checkout
- Auth
- Supabase
- CRM sync
- Email automation
- Server-side lead enrichment

Reason:

- Need proof of demand first.

## Next Recommended Check

After Netlify deployment:

1. Submit all three form types once.
2. Confirm submissions appear in Netlify.
3. Confirm example-triggered paid intent includes hidden strategy context.
4. Confirm pages still feel product-focused instead of becoming generic landing-page clutter.
