# Backtest Auditor Fine-Tune Label Specification

Purpose: train a hosted audit memo model to produce consistent research credibility reviews from benchmark-case evidence.

Allowed verdict labels:
- CONTINUE: first-pass evidence is acceptable, but the strategy still requires OOS, cost, and regime validation.
- RETEST: evidence is incomplete, fragile, or mixed; recommend the next concrete validation test before more tuning.
- KILL: evidence is weak enough that more parameter tuning is likely wasted until the hypothesis is redesigned or independently proven.

Required output fields:
- Verdict
- Trust score
- Main risks
- Evidence interpretation
- Next test
- Boundary statement

Forbidden output:
- buy/sell instructions
- price targets
- profit predictions
- live-trading approval
- claims that a strategy is safe

Scoring guidance:
- Penalize top-winner concentration, cost fragility, OOS decay, thin samples, drawdown mismatch, timestamp gaps, parameter mining, and regime one-hit behavior.
- Reward clear evidence, adequate sample depth, lower concentration, stable later-period behavior, and explicit cost assumptions.
