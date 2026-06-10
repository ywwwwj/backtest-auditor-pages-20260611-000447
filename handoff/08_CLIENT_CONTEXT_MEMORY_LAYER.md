# Client Context Memory Layer

This document records the next retention upgrade after validation capture.

## Strategic Reason

The previous workspace had useful project-level memory:

- strategy versions
- retest tasks
- statuses
- kill reasons
- local funnel events

The missing layer was reusable client-level or research-context memory.

Decision:

- Add a lightweight local `Client Profile`.
- Add a timeline-style `Learning Log`.
- Add simple `Bottleneck Analysis` derived from tasks, notes, risks, and Kill reasons.

This moves the prototype closer to recurring software instead of a one-time static report tool.

## New Workspace Sections

Added to `app.html` inside `Strategy Workspace`:

- `Client Profile`
- `Learning Log`
- `Bottleneck Analysis`

## Client Profile

Local storage key:

```text
backtest-auditor-client-profile
```

Fields:

- profile name
- main tool
- research goal
- risk boundary
- review cadence
- decision style

Purpose:

- Make context reusable across audits.
- Let the workspace remember how a user or client wants research reviewed.
- Prepare a future cloud profile model without adding backend yet.

## Learning Log

Local storage key:

```text
backtest-auditor-learning-log
```

Events are created when:

- client profile is saved
- audit report is saved
- demo version is saved
- Continue / Retest / Kill decision changes
- retest task status changes
- retest note changes
- Kill reason is recorded

Purpose:

- Show how research changed over time.
- Turn isolated audits into a visible learning timeline.
- Make repeat use feel cumulative.

## Bottleneck Analysis

Signals analyzed:

- task status: Blocked / Skipped
- retest notes
- Kill reasons
- audit risk card titles

Current buckets:

- Import/data
- Cost assumptions
- OOS proof
- Sample depth
- Review bottleneck
- Unclear next step

Each bucket shows:

- count
- next recommendation

Purpose:

- Tell users why they get stuck.
- Suggest how to move faster next time.
- Convert raw notes into lightweight operational insight.

## What This Still Is Not

This is still a static MVP.

Not added:

- auth
- multi-client database
- team permissions
- approval workflow backend
- server-side learning model

Those should wait until validation forms show enough demand.

## Next Upgrade Path

If demand is validated:

1. Move client profile and learning log to Supabase.
2. Add multiple client profiles per user.
3. Add structured approval/review states.
4. Generate AI memo from profile + learning log + latest audit.
5. Show "what changed since last review" before every new audit.
