window.BACKTEST_AUDITOR_BENCHMARK_CASES = {
  "createdAt": "2026-06-22T05:59:56.443451+00:00",
  "purpose": "Static benchmark case index for audit memo retrieval. Not investment advice.",
  "cases": [
    {
      "id": "BA-BENCH-001",
      "title": "60/20 trend momentum on S&P 500 Index",
      "family": "momentum",
      "asset": "S&P 500 Index",
      "source": "FRED",
      "score": 86,
      "verdict": "CONTINUE",
      "risks": [
        "no major first-pass red flag"
      ],
      "nextTest": "Compare against a simple benchmark and run parameter perturbation.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": 0.9666,
        "maxDrawdown": 0.1984,
        "sharpe": 0.788,
        "top5Concentration": 0.025
      }
    },
    {
      "id": "BA-BENCH-002",
      "title": "120/40 trend momentum on S&P 500 Index",
      "family": "momentum",
      "asset": "S&P 500 Index",
      "source": "FRED",
      "score": 86,
      "verdict": "CONTINUE",
      "risks": [
        "no major first-pass red flag"
      ],
      "nextTest": "Compare against a simple benchmark and run parameter perturbation.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": 0.4409,
        "maxDrawdown": 0.2438,
        "sharpe": 0.444,
        "top5Concentration": 0.0252
      }
    },
    {
      "id": "BA-BENCH-003",
      "title": "90-day breakout momentum on S&P 500 Index",
      "family": "momentum",
      "asset": "S&P 500 Index",
      "source": "FRED",
      "score": 86,
      "verdict": "CONTINUE",
      "risks": [
        "no major first-pass red flag"
      ],
      "nextTest": "Compare against a simple benchmark and run parameter perturbation.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": 0.9377,
        "maxDrawdown": 0.1808,
        "sharpe": 0.771,
        "top5Concentration": 0.0311
      }
    },
    {
      "id": "BA-BENCH-004",
      "title": "drawdown value proxy on S&P 500 Index",
      "family": "value_proxy",
      "asset": "S&P 500 Index",
      "source": "FRED",
      "score": 86,
      "verdict": "CONTINUE",
      "risks": [
        "no major first-pass red flag"
      ],
      "nextTest": "Compare against a simple benchmark and run parameter perturbation.",
      "benchmarkPrior": "Separate true mean reversion from one-period bounce and require long underperformance tolerance.",
      "metrics": {
        "totalReturn": 0.4725,
        "maxDrawdown": 0.2237,
        "sharpe": 0.434,
        "top5Concentration": 0.2209
      }
    },
    {
      "id": "BA-BENCH-005",
      "title": "deep mean-reversion value proxy on S&P 500 Index",
      "family": "value_proxy",
      "asset": "S&P 500 Index",
      "source": "FRED",
      "score": 72,
      "verdict": "CONTINUE",
      "risks": [
        "weak risk-adjusted return"
      ],
      "nextTest": "Compare against a simple benchmark and run parameter perturbation.",
      "benchmarkPrior": "Separate true mean reversion from one-period bounce and require long underperformance tolerance.",
      "metrics": {
        "totalReturn": 0.3098,
        "maxDrawdown": 0.1747,
        "sharpe": 0.359,
        "top5Concentration": 0.3481
      }
    },
    {
      "id": "BA-BENCH-006",
      "title": "z-score mean reversion on S&P 500 Index",
      "family": "mean_reversion",
      "asset": "S&P 500 Index",
      "source": "FRED",
      "score": 46,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return",
        "turnover/cost fragility"
      ],
      "nextTest": "Run 2x and 3x fee/slippage stress with realistic fills.",
      "benchmarkPrior": "Prioritize cost, spread, turnover, and tail-loss checks because small edges vanish quickly.",
      "metrics": {
        "totalReturn": 0.0956,
        "maxDrawdown": 0.2976,
        "sharpe": 0.149,
        "top5Concentration": 0.1638
      }
    },
    {
      "id": "BA-BENCH-007",
      "title": "aggressive z-score mean reversion on S&P 500 Index",
      "family": "mean_reversion",
      "asset": "S&P 500 Index",
      "source": "FRED",
      "score": 46,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return",
        "turnover/cost fragility"
      ],
      "nextTest": "Run 2x and 3x fee/slippage stress with realistic fills.",
      "benchmarkPrior": "Prioritize cost, spread, turnover, and tail-loss checks because small edges vanish quickly.",
      "metrics": {
        "totalReturn": 0.0626,
        "maxDrawdown": 0.2965,
        "sharpe": 0.121,
        "top5Concentration": 0.1475
      }
    },
    {
      "id": "BA-BENCH-008",
      "title": "pair spread mean reversion on S&P 500 Index",
      "family": "pairs_stat_arb",
      "asset": "S&P 500 Index",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Audit spread stability, formation/test separation, and whether the apparent edge is just noisy mean reversion.",
      "metrics": {
        "totalReturn": 0.1736,
        "maxDrawdown": 0.2838,
        "sharpe": 0.209,
        "top5Concentration": 0.1421
      }
    },
    {
      "id": "BA-BENCH-009",
      "title": "moving-average crossover on S&P 500 Index",
      "family": "trend_following",
      "asset": "S&P 500 Index",
      "source": "FRED",
      "score": 70,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Inspect sideways-market whipsaws and whether performance comes from one extended trend.",
      "metrics": {
        "totalReturn": 0.5707,
        "maxDrawdown": 0.3167,
        "sharpe": 0.45,
        "top5Concentration": 0.0525
      }
    },
    {
      "id": "BA-BENCH-010",
      "title": "dual breakout trend on S&P 500 Index",
      "family": "trend_following",
      "asset": "S&P 500 Index",
      "source": "FRED",
      "score": 58,
      "verdict": "RETEST",
      "risks": [
        "low trade count",
        "drawdown mismatch"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Inspect sideways-market whipsaws and whether performance comes from one extended trend.",
      "metrics": {
        "totalReturn": 0.7065,
        "maxDrawdown": 0.3392,
        "sharpe": 0.48,
        "top5Concentration": 0.0668
      }
    },
    {
      "id": "BA-BENCH-011",
      "title": "channel breakout on S&P 500 Index",
      "family": "breakout",
      "asset": "S&P 500 Index",
      "source": "FRED",
      "score": 72,
      "verdict": "CONTINUE",
      "risks": [
        "weak risk-adjusted return"
      ],
      "nextTest": "Compare against a simple benchmark and run parameter perturbation.",
      "benchmarkPrior": "Remove top winners and test whether the curve survives without rare breakout events.",
      "metrics": {
        "totalReturn": -0.1896,
        "maxDrawdown": 0.2322,
        "sharpe": -0.573,
        "top5Concentration": 0.1066
      }
    },
    {
      "id": "BA-BENCH-012",
      "title": "55-day expansion breakout on S&P 500 Index",
      "family": "breakout",
      "asset": "S&P 500 Index",
      "source": "FRED",
      "score": 72,
      "verdict": "CONTINUE",
      "risks": [
        "weak risk-adjusted return"
      ],
      "nextTest": "Compare against a simple benchmark and run parameter perturbation.",
      "benchmarkPrior": "Remove top winners and test whether the curve survives without rare breakout events.",
      "metrics": {
        "totalReturn": -0.1896,
        "maxDrawdown": 0.2322,
        "sharpe": -0.573,
        "top5Concentration": 0.1066
      }
    },
    {
      "id": "BA-BENCH-013",
      "title": "positive drift carry proxy on S&P 500 Index",
      "family": "carry_proxy",
      "asset": "S&P 500 Index",
      "source": "FRED",
      "score": 86,
      "verdict": "CONTINUE",
      "risks": [
        "no major first-pass red flag"
      ],
      "nextTest": "Compare against a simple benchmark and run parameter perturbation.",
      "benchmarkPrior": "Stress funding, gap risk, liquidity, and correlation spikes across regimes.",
      "metrics": {
        "totalReturn": 0.5973,
        "maxDrawdown": 0.2468,
        "sharpe": 0.522,
        "top5Concentration": 0.028
      }
    },
    {
      "id": "BA-BENCH-014",
      "title": "low-vol carry proxy on S&P 500 Index",
      "family": "carry_proxy",
      "asset": "S&P 500 Index",
      "source": "FRED",
      "score": 86,
      "verdict": "CONTINUE",
      "risks": [
        "no major first-pass red flag"
      ],
      "nextTest": "Compare against a simple benchmark and run parameter perturbation.",
      "benchmarkPrior": "Stress funding, gap risk, liquidity, and correlation spikes across regimes.",
      "metrics": {
        "totalReturn": 0.4831,
        "maxDrawdown": 0.2438,
        "sharpe": 0.446,
        "top5Concentration": 0.0321
      }
    },
    {
      "id": "BA-BENCH-015",
      "title": "range grid proxy on S&P 500 Index",
      "family": "crypto_grid",
      "asset": "S&P 500 Index",
      "source": "FRED",
      "score": 60,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "turnover/cost fragility"
      ],
      "nextTest": "Run 2x and 3x fee/slippage stress with realistic fills.",
      "benchmarkPrior": "Check whether small range profits are erased by trend breaks, fees, and liquidation-like drawdowns.",
      "metrics": {
        "totalReturn": 1.3987,
        "maxDrawdown": 0.3197,
        "sharpe": 0.824,
        "top5Concentration": 0.0349
      }
    },
    {
      "id": "BA-BENCH-016",
      "title": "tight crypto grid proxy on S&P 500 Index",
      "family": "crypto_grid",
      "asset": "S&P 500 Index",
      "source": "FRED",
      "score": 76,
      "verdict": "CONTINUE",
      "risks": [
        "turnover/cost fragility"
      ],
      "nextTest": "Run 2x and 3x fee/slippage stress with realistic fills.",
      "benchmarkPrior": "Check whether small range profits are erased by trend breaks, fees, and liquidation-like drawdowns.",
      "metrics": {
        "totalReturn": 0.5665,
        "maxDrawdown": 0.2436,
        "sharpe": 0.485,
        "top5Concentration": 0.0344
      }
    },
    {
      "id": "BA-BENCH-017",
      "title": "60/20 trend momentum on Dow Jones Industrial Average",
      "family": "momentum",
      "asset": "Dow Jones Industrial Average",
      "source": "FRED",
      "score": 54,
      "verdict": "RETEST",
      "risks": [
        "second-half decay",
        "weak risk-adjusted return"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": 0.2569,
        "maxDrawdown": 0.1962,
        "sharpe": 0.315,
        "top5Concentration": 0.0353
      }
    },
    {
      "id": "BA-BENCH-018",
      "title": "120/40 trend momentum on Dow Jones Industrial Average",
      "family": "momentum",
      "asset": "Dow Jones Industrial Average",
      "source": "FRED",
      "score": 72,
      "verdict": "CONTINUE",
      "risks": [
        "weak risk-adjusted return"
      ],
      "nextTest": "Compare against a simple benchmark and run parameter perturbation.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": 0.263,
        "maxDrawdown": 0.197,
        "sharpe": 0.321,
        "top5Concentration": 0.0346
      }
    },
    {
      "id": "BA-BENCH-019",
      "title": "90-day breakout momentum on Dow Jones Industrial Average",
      "family": "momentum",
      "asset": "Dow Jones Industrial Average",
      "source": "FRED",
      "score": 72,
      "verdict": "CONTINUE",
      "risks": [
        "weak risk-adjusted return"
      ],
      "nextTest": "Compare against a simple benchmark and run parameter perturbation.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": 0.1543,
        "maxDrawdown": 0.2454,
        "sharpe": 0.217,
        "top5Concentration": 0.0356
      }
    },
    {
      "id": "BA-BENCH-020",
      "title": "drawdown value proxy on Dow Jones Industrial Average",
      "family": "value_proxy",
      "asset": "Dow Jones Industrial Average",
      "source": "FRED",
      "score": 86,
      "verdict": "CONTINUE",
      "risks": [
        "no major first-pass red flag"
      ],
      "nextTest": "Compare against a simple benchmark and run parameter perturbation.",
      "benchmarkPrior": "Separate true mean reversion from one-period bounce and require long underperformance tolerance.",
      "metrics": {
        "totalReturn": 0.4596,
        "maxDrawdown": 0.272,
        "sharpe": 0.435,
        "top5Concentration": 0.2731
      }
    },
    {
      "id": "BA-BENCH-021",
      "title": "deep mean-reversion value proxy on Dow Jones Industrial Average",
      "family": "value_proxy",
      "asset": "Dow Jones Industrial Average",
      "source": "FRED",
      "score": 72,
      "verdict": "CONTINUE",
      "risks": [
        "weak risk-adjusted return"
      ],
      "nextTest": "Compare against a simple benchmark and run parameter perturbation.",
      "benchmarkPrior": "Separate true mean reversion from one-period bounce and require long underperformance tolerance.",
      "metrics": {
        "totalReturn": 0.2941,
        "maxDrawdown": 0.1981,
        "sharpe": 0.351,
        "top5Concentration": 0.3854
      }
    },
    {
      "id": "BA-BENCH-022",
      "title": "z-score mean reversion on Dow Jones Industrial Average",
      "family": "mean_reversion",
      "asset": "Dow Jones Industrial Average",
      "source": "FRED",
      "score": 46,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return",
        "turnover/cost fragility"
      ],
      "nextTest": "Run 2x and 3x fee/slippage stress with realistic fills.",
      "benchmarkPrior": "Prioritize cost, spread, turnover, and tail-loss checks because small edges vanish quickly.",
      "metrics": {
        "totalReturn": 0.0689,
        "maxDrawdown": 0.3077,
        "sharpe": 0.126,
        "top5Concentration": 0.1736
      }
    },
    {
      "id": "BA-BENCH-023",
      "title": "aggressive z-score mean reversion on Dow Jones Industrial Average",
      "family": "mean_reversion",
      "asset": "Dow Jones Industrial Average",
      "source": "FRED",
      "score": 46,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return",
        "turnover/cost fragility"
      ],
      "nextTest": "Run 2x and 3x fee/slippage stress with realistic fills.",
      "benchmarkPrior": "Prioritize cost, spread, turnover, and tail-loss checks because small edges vanish quickly.",
      "metrics": {
        "totalReturn": 0.0721,
        "maxDrawdown": 0.3573,
        "sharpe": 0.129,
        "top5Concentration": 0.1538
      }
    },
    {
      "id": "BA-BENCH-024",
      "title": "pair spread mean reversion on Dow Jones Industrial Average",
      "family": "pairs_stat_arb",
      "asset": "Dow Jones Industrial Average",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Audit spread stability, formation/test separation, and whether the apparent edge is just noisy mean reversion.",
      "metrics": {
        "totalReturn": 0.1437,
        "maxDrawdown": 0.3077,
        "sharpe": 0.187,
        "top5Concentration": 0.1507
      }
    },
    {
      "id": "BA-BENCH-025",
      "title": "moving-average crossover on Dow Jones Industrial Average",
      "family": "trend_following",
      "asset": "Dow Jones Industrial Average",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Inspect sideways-market whipsaws and whether performance comes from one extended trend.",
      "metrics": {
        "totalReturn": 0.3828,
        "maxDrawdown": 0.2826,
        "sharpe": 0.364,
        "top5Concentration": 0.0542
      }
    },
    {
      "id": "BA-BENCH-026",
      "title": "dual breakout trend on Dow Jones Industrial Average",
      "family": "trend_following",
      "asset": "Dow Jones Industrial Average",
      "source": "FRED",
      "score": 44,
      "verdict": "KILL",
      "risks": [
        "low trade count",
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Inspect sideways-market whipsaws and whether performance comes from one extended trend.",
      "metrics": {
        "totalReturn": 0.1894,
        "maxDrawdown": 0.4015,
        "sharpe": 0.211,
        "top5Concentration": 0.0697
      }
    },
    {
      "id": "BA-BENCH-027",
      "title": "channel breakout on Dow Jones Industrial Average",
      "family": "breakout",
      "asset": "Dow Jones Industrial Average",
      "source": "FRED",
      "score": 72,
      "verdict": "CONTINUE",
      "risks": [
        "weak risk-adjusted return"
      ],
      "nextTest": "Compare against a simple benchmark and run parameter perturbation.",
      "benchmarkPrior": "Remove top winners and test whether the curve survives without rare breakout events.",
      "metrics": {
        "totalReturn": -0.1526,
        "maxDrawdown": 0.1669,
        "sharpe": -0.539,
        "top5Concentration": 0.161
      }
    },
    {
      "id": "BA-BENCH-028",
      "title": "55-day expansion breakout on Dow Jones Industrial Average",
      "family": "breakout",
      "asset": "Dow Jones Industrial Average",
      "source": "FRED",
      "score": 72,
      "verdict": "CONTINUE",
      "risks": [
        "weak risk-adjusted return"
      ],
      "nextTest": "Compare against a simple benchmark and run parameter perturbation.",
      "benchmarkPrior": "Remove top winners and test whether the curve survives without rare breakout events.",
      "metrics": {
        "totalReturn": -0.1526,
        "maxDrawdown": 0.1669,
        "sharpe": -0.539,
        "top5Concentration": 0.161
      }
    },
    {
      "id": "BA-BENCH-029",
      "title": "positive drift carry proxy on Dow Jones Industrial Average",
      "family": "carry_proxy",
      "asset": "Dow Jones Industrial Average",
      "source": "FRED",
      "score": 86,
      "verdict": "CONTINUE",
      "risks": [
        "no major first-pass red flag"
      ],
      "nextTest": "Compare against a simple benchmark and run parameter perturbation.",
      "benchmarkPrior": "Stress funding, gap risk, liquidity, and correlation spikes across regimes.",
      "metrics": {
        "totalReturn": 0.4269,
        "maxDrawdown": 0.1811,
        "sharpe": 0.449,
        "top5Concentration": 0.0332
      }
    },
    {
      "id": "BA-BENCH-030",
      "title": "low-vol carry proxy on Dow Jones Industrial Average",
      "family": "carry_proxy",
      "asset": "Dow Jones Industrial Average",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Stress funding, gap risk, liquidity, and correlation spikes across regimes.",
      "metrics": {
        "totalReturn": 0.0722,
        "maxDrawdown": 0.3164,
        "sharpe": 0.13,
        "top5Concentration": 0.0384
      }
    },
    {
      "id": "BA-BENCH-031",
      "title": "range grid proxy on Dow Jones Industrial Average",
      "family": "crypto_grid",
      "asset": "Dow Jones Industrial Average",
      "source": "FRED",
      "score": 42,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "turnover/cost fragility"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Check whether small range profits are erased by trend breaks, fees, and liquidation-like drawdowns.",
      "metrics": {
        "totalReturn": 0.575,
        "maxDrawdown": 0.3387,
        "sharpe": 0.471,
        "top5Concentration": 0.0356
      }
    },
    {
      "id": "BA-BENCH-032",
      "title": "tight crypto grid proxy on Dow Jones Industrial Average",
      "family": "crypto_grid",
      "asset": "Dow Jones Industrial Average",
      "source": "FRED",
      "score": 62,
      "verdict": "RETEST",
      "risks": [
        "weak risk-adjusted return",
        "turnover/cost fragility"
      ],
      "nextTest": "Run 2x and 3x fee/slippage stress with realistic fills.",
      "benchmarkPrior": "Check whether small range profits are erased by trend breaks, fees, and liquidation-like drawdowns.",
      "metrics": {
        "totalReturn": 0.387,
        "maxDrawdown": 0.2208,
        "sharpe": 0.386,
        "top5Concentration": 0.0319
      }
    },
    {
      "id": "BA-BENCH-033",
      "title": "60/20 trend momentum on NASDAQ Composite",
      "family": "momentum",
      "asset": "NASDAQ Composite",
      "source": "FRED",
      "score": 70,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": 10.516,
        "maxDrawdown": 0.5758,
        "sharpe": 0.726,
        "top5Concentration": 0.0446
      }
    },
    {
      "id": "BA-BENCH-034",
      "title": "120/40 trend momentum on NASDAQ Composite",
      "family": "momentum",
      "asset": "NASDAQ Composite",
      "source": "FRED",
      "score": 70,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": 19.2071,
        "maxDrawdown": 0.6213,
        "sharpe": 0.843,
        "top5Concentration": 0.0392
      }
    },
    {
      "id": "BA-BENCH-035",
      "title": "90-day breakout momentum on NASDAQ Composite",
      "family": "momentum",
      "asset": "NASDAQ Composite",
      "source": "FRED",
      "score": 70,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": 6.913,
        "maxDrawdown": 0.6313,
        "sharpe": 0.635,
        "top5Concentration": 0.0434
      }
    },
    {
      "id": "BA-BENCH-036",
      "title": "drawdown value proxy on NASDAQ Composite",
      "family": "value_proxy",
      "asset": "NASDAQ Composite",
      "source": "FRED",
      "score": 38,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Separate true mean reversion from one-period bounce and require long underperformance tolerance.",
      "metrics": {
        "totalReturn": 0.0718,
        "maxDrawdown": 0.8593,
        "sharpe": 0.209,
        "top5Concentration": 0.0446
      }
    },
    {
      "id": "BA-BENCH-037",
      "title": "deep mean-reversion value proxy on NASDAQ Composite",
      "family": "value_proxy",
      "asset": "NASDAQ Composite",
      "source": "FRED",
      "score": 38,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Separate true mean reversion from one-period bounce and require long underperformance tolerance.",
      "metrics": {
        "totalReturn": -0.0823,
        "maxDrawdown": 0.8525,
        "sharpe": 0.167,
        "top5Concentration": 0.0469
      }
    },
    {
      "id": "BA-BENCH-038",
      "title": "z-score mean reversion on NASDAQ Composite",
      "family": "mean_reversion",
      "asset": "NASDAQ Composite",
      "source": "FRED",
      "score": 28,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return",
        "turnover/cost fragility"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Prioritize cost, spread, turnover, and tail-loss checks because small edges vanish quickly.",
      "metrics": {
        "totalReturn": 0.5767,
        "maxDrawdown": 0.6636,
        "sharpe": 0.272,
        "top5Concentration": 0.0897
      }
    },
    {
      "id": "BA-BENCH-039",
      "title": "aggressive z-score mean reversion on NASDAQ Composite",
      "family": "mean_reversion",
      "asset": "NASDAQ Composite",
      "source": "FRED",
      "score": 60,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "turnover/cost fragility"
      ],
      "nextTest": "Run 2x and 3x fee/slippage stress with realistic fills.",
      "benchmarkPrior": "Prioritize cost, spread, turnover, and tail-loss checks because small edges vanish quickly.",
      "metrics": {
        "totalReturn": 1.5434,
        "maxDrawdown": 0.6729,
        "sharpe": 0.406,
        "top5Concentration": 0.0737
      }
    },
    {
      "id": "BA-BENCH-040",
      "title": "pair spread mean reversion on NASDAQ Composite",
      "family": "pairs_stat_arb",
      "asset": "NASDAQ Composite",
      "source": "FRED",
      "score": 38,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Audit spread stability, formation/test separation, and whether the apparent edge is just noisy mean reversion.",
      "metrics": {
        "totalReturn": 0.4024,
        "maxDrawdown": 0.71,
        "sharpe": 0.239,
        "top5Concentration": 0.0699
      }
    },
    {
      "id": "BA-BENCH-041",
      "title": "moving-average crossover on NASDAQ Composite",
      "family": "trend_following",
      "asset": "NASDAQ Composite",
      "source": "FRED",
      "score": 70,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Inspect sideways-market whipsaws and whether performance comes from one extended trend.",
      "metrics": {
        "totalReturn": 22.7622,
        "maxDrawdown": 0.5868,
        "sharpe": 0.832,
        "top5Concentration": 0.0369
      }
    },
    {
      "id": "BA-BENCH-042",
      "title": "dual breakout trend on NASDAQ Composite",
      "family": "trend_following",
      "asset": "NASDAQ Composite",
      "source": "FRED",
      "score": 58,
      "verdict": "RETEST",
      "risks": [
        "low trade count",
        "drawdown mismatch"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Inspect sideways-market whipsaws and whether performance comes from one extended trend.",
      "metrics": {
        "totalReturn": 15.2141,
        "maxDrawdown": 0.7044,
        "sharpe": 0.752,
        "top5Concentration": 0.0356
      }
    },
    {
      "id": "BA-BENCH-043",
      "title": "channel breakout on NASDAQ Composite",
      "family": "breakout",
      "asset": "NASDAQ Composite",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Remove top winners and test whether the curve survives without rare breakout events.",
      "metrics": {
        "totalReturn": 0.3817,
        "maxDrawdown": 0.3727,
        "sharpe": 0.243,
        "top5Concentration": 0.1351
      }
    },
    {
      "id": "BA-BENCH-044",
      "title": "55-day expansion breakout on NASDAQ Composite",
      "family": "breakout",
      "asset": "NASDAQ Composite",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Remove top winners and test whether the curve survives without rare breakout events.",
      "metrics": {
        "totalReturn": 0.3817,
        "maxDrawdown": 0.3727,
        "sharpe": 0.243,
        "top5Concentration": 0.1351
      }
    },
    {
      "id": "BA-BENCH-045",
      "title": "positive drift carry proxy on NASDAQ Composite",
      "family": "carry_proxy",
      "asset": "NASDAQ Composite",
      "source": "FRED",
      "score": 52,
      "verdict": "RETEST",
      "risks": [
        "second-half decay",
        "drawdown mismatch"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Stress funding, gap risk, liquidity, and correlation spikes across regimes.",
      "metrics": {
        "totalReturn": 1.8786,
        "maxDrawdown": 0.6856,
        "sharpe": 0.443,
        "top5Concentration": 0.0536
      }
    },
    {
      "id": "BA-BENCH-046",
      "title": "low-vol carry proxy on NASDAQ Composite",
      "family": "carry_proxy",
      "asset": "NASDAQ Composite",
      "source": "FRED",
      "score": 38,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Stress funding, gap risk, liquidity, and correlation spikes across regimes.",
      "metrics": {
        "totalReturn": 0.9332,
        "maxDrawdown": 0.323,
        "sharpe": 0.394,
        "top5Concentration": 0.0979
      }
    },
    {
      "id": "BA-BENCH-047",
      "title": "range grid proxy on NASDAQ Composite",
      "family": "crypto_grid",
      "asset": "NASDAQ Composite",
      "source": "FRED",
      "score": 28,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return",
        "turnover/cost fragility"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Check whether small range profits are erased by trend breaks, fees, and liquidation-like drawdowns.",
      "metrics": {
        "totalReturn": 0.2613,
        "maxDrawdown": 0.6644,
        "sharpe": 0.205,
        "top5Concentration": 0.0623
      }
    },
    {
      "id": "BA-BENCH-048",
      "title": "tight crypto grid proxy on NASDAQ Composite",
      "family": "crypto_grid",
      "asset": "NASDAQ Composite",
      "source": "FRED",
      "score": 46,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return",
        "turnover/cost fragility"
      ],
      "nextTest": "Run 2x and 3x fee/slippage stress with realistic fills.",
      "benchmarkPrior": "Check whether small range profits are erased by trend breaks, fees, and liquidation-like drawdowns.",
      "metrics": {
        "totalReturn": -0.7339,
        "maxDrawdown": 0.8071,
        "sharpe": -0.302,
        "top5Concentration": 0.0827
      }
    },
    {
      "id": "BA-BENCH-049",
      "title": "60/20 trend momentum on CBOE Volatility Index",
      "family": "momentum",
      "asset": "CBOE Volatility Index",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": -0.9922,
        "maxDrawdown": 0.9974,
        "sharpe": -0.222,
        "top5Concentration": 0.1167
      }
    },
    {
      "id": "BA-BENCH-050",
      "title": "120/40 trend momentum on CBOE Volatility Index",
      "family": "momentum",
      "asset": "CBOE Volatility Index",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": -0.9961,
        "maxDrawdown": 0.9979,
        "sharpe": -0.355,
        "top5Concentration": 0.1176
      }
    },
    {
      "id": "BA-BENCH-051",
      "title": "90-day breakout momentum on CBOE Volatility Index",
      "family": "momentum",
      "asset": "CBOE Volatility Index",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": -0.9939,
        "maxDrawdown": 0.9965,
        "sharpe": -0.288,
        "top5Concentration": 0.1157
      }
    },
    {
      "id": "BA-BENCH-052",
      "title": "drawdown value proxy on CBOE Volatility Index",
      "family": "value_proxy",
      "asset": "CBOE Volatility Index",
      "source": "FRED",
      "score": 70,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Separate true mean reversion from one-period bounce and require long underperformance tolerance.",
      "metrics": {
        "totalReturn": 13.6625,
        "maxDrawdown": 0.7696,
        "sharpe": 0.802,
        "top5Concentration": 0.0545
      }
    },
    {
      "id": "BA-BENCH-053",
      "title": "deep mean-reversion value proxy on CBOE Volatility Index",
      "family": "value_proxy",
      "asset": "CBOE Volatility Index",
      "source": "FRED",
      "score": 52,
      "verdict": "RETEST",
      "risks": [
        "second-half decay",
        "drawdown mismatch"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Separate true mean reversion from one-period bounce and require long underperformance tolerance.",
      "metrics": {
        "totalReturn": 2.3756,
        "maxDrawdown": 0.7485,
        "sharpe": 0.645,
        "top5Concentration": 0.0567
      }
    },
    {
      "id": "BA-BENCH-054",
      "title": "z-score mean reversion on CBOE Volatility Index",
      "family": "mean_reversion",
      "asset": "CBOE Volatility Index",
      "source": "FRED",
      "score": 60,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "turnover/cost fragility"
      ],
      "nextTest": "Run 2x and 3x fee/slippage stress with realistic fills.",
      "benchmarkPrior": "Prioritize cost, spread, turnover, and tail-loss checks because small edges vanish quickly.",
      "metrics": {
        "totalReturn": 16.7418,
        "maxDrawdown": 0.4331,
        "sharpe": 1.012,
        "top5Concentration": 0.1075
      }
    },
    {
      "id": "BA-BENCH-055",
      "title": "aggressive z-score mean reversion on CBOE Volatility Index",
      "family": "mean_reversion",
      "asset": "CBOE Volatility Index",
      "source": "FRED",
      "score": 60,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "turnover/cost fragility"
      ],
      "nextTest": "Run 2x and 3x fee/slippage stress with realistic fills.",
      "benchmarkPrior": "Prioritize cost, spread, turnover, and tail-loss checks because small edges vanish quickly.",
      "metrics": {
        "totalReturn": 11.6456,
        "maxDrawdown": 0.5219,
        "sharpe": 0.824,
        "top5Concentration": 0.0808
      }
    },
    {
      "id": "BA-BENCH-056",
      "title": "pair spread mean reversion on CBOE Volatility Index",
      "family": "pairs_stat_arb",
      "asset": "CBOE Volatility Index",
      "source": "FRED",
      "score": 70,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Audit spread stability, formation/test separation, and whether the apparent edge is just noisy mean reversion.",
      "metrics": {
        "totalReturn": 34.5762,
        "maxDrawdown": 0.3823,
        "sharpe": 1.058,
        "top5Concentration": 0.0871
      }
    },
    {
      "id": "BA-BENCH-057",
      "title": "moving-average crossover on CBOE Volatility Index",
      "family": "trend_following",
      "asset": "CBOE Volatility Index",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Inspect sideways-market whipsaws and whether performance comes from one extended trend.",
      "metrics": {
        "totalReturn": -0.9858,
        "maxDrawdown": 0.9921,
        "sharpe": -0.227,
        "top5Concentration": 0.0916
      }
    },
    {
      "id": "BA-BENCH-058",
      "title": "dual breakout trend on CBOE Volatility Index",
      "family": "trend_following",
      "asset": "CBOE Volatility Index",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Inspect sideways-market whipsaws and whether performance comes from one extended trend.",
      "metrics": {
        "totalReturn": -0.9192,
        "maxDrawdown": 0.9613,
        "sharpe": 0.036,
        "top5Concentration": 0.1112
      }
    },
    {
      "id": "BA-BENCH-059",
      "title": "channel breakout on CBOE Volatility Index",
      "family": "breakout",
      "asset": "CBOE Volatility Index",
      "source": "FRED",
      "score": 8,
      "verdict": "KILL",
      "risks": [
        "top-winner concentration",
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Remove top winners and rerun the equity curve.",
      "benchmarkPrior": "Remove top winners and test whether the curve survives without rare breakout events.",
      "metrics": {
        "totalReturn": -0.5054,
        "maxDrawdown": 0.7825,
        "sharpe": 0.031,
        "top5Concentration": 0.5522
      }
    },
    {
      "id": "BA-BENCH-060",
      "title": "55-day expansion breakout on CBOE Volatility Index",
      "family": "breakout",
      "asset": "CBOE Volatility Index",
      "source": "FRED",
      "score": 8,
      "verdict": "KILL",
      "risks": [
        "top-winner concentration",
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Remove top winners and rerun the equity curve.",
      "benchmarkPrior": "Remove top winners and test whether the curve survives without rare breakout events.",
      "metrics": {
        "totalReturn": -0.5054,
        "maxDrawdown": 0.7825,
        "sharpe": 0.031,
        "top5Concentration": 0.5522
      }
    },
    {
      "id": "BA-BENCH-061",
      "title": "positive drift carry proxy on CBOE Volatility Index",
      "family": "carry_proxy",
      "asset": "CBOE Volatility Index",
      "source": "FRED",
      "score": 60,
      "verdict": "RETEST",
      "risks": [
        "low trade count",
        "weak risk-adjusted return"
      ],
      "nextTest": "Compare against a simple benchmark and run parameter perturbation.",
      "benchmarkPrior": "Stress funding, gap risk, liquidity, and correlation spikes across regimes.",
      "metrics": {
        "totalReturn": 0.0,
        "maxDrawdown": 0.0,
        "sharpe": 0.0,
        "top5Concentration": 0.0
      }
    },
    {
      "id": "BA-BENCH-062",
      "title": "low-vol carry proxy on CBOE Volatility Index",
      "family": "carry_proxy",
      "asset": "CBOE Volatility Index",
      "source": "FRED",
      "score": 60,
      "verdict": "RETEST",
      "risks": [
        "low trade count",
        "weak risk-adjusted return"
      ],
      "nextTest": "Compare against a simple benchmark and run parameter perturbation.",
      "benchmarkPrior": "Stress funding, gap risk, liquidity, and correlation spikes across regimes.",
      "metrics": {
        "totalReturn": 0.0,
        "maxDrawdown": 0.0,
        "sharpe": 0.0,
        "top5Concentration": 0.0
      }
    },
    {
      "id": "BA-BENCH-063",
      "title": "range grid proxy on CBOE Volatility Index",
      "family": "crypto_grid",
      "asset": "CBOE Volatility Index",
      "source": "FRED",
      "score": 60,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "turnover/cost fragility"
      ],
      "nextTest": "Run 2x and 3x fee/slippage stress with realistic fills.",
      "benchmarkPrior": "Check whether small range profits are erased by trend breaks, fees, and liquidation-like drawdowns.",
      "metrics": {
        "totalReturn": 74.2197,
        "maxDrawdown": 0.4325,
        "sharpe": 1.088,
        "top5Concentration": 0.2016
      }
    },
    {
      "id": "BA-BENCH-064",
      "title": "tight crypto grid proxy on CBOE Volatility Index",
      "family": "crypto_grid",
      "asset": "CBOE Volatility Index",
      "source": "FRED",
      "score": 60,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "turnover/cost fragility"
      ],
      "nextTest": "Run 2x and 3x fee/slippage stress with realistic fills.",
      "benchmarkPrior": "Check whether small range profits are erased by trend breaks, fees, and liquidation-like drawdowns.",
      "metrics": {
        "totalReturn": 4.8847,
        "maxDrawdown": 0.4692,
        "sharpe": 0.667,
        "top5Concentration": 0.1983
      }
    },
    {
      "id": "BA-BENCH-065",
      "title": "60/20 trend momentum on WTI Crude Oil",
      "family": "momentum",
      "asset": "WTI Crude Oil",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": -0.0616,
        "maxDrawdown": 0.6829,
        "sharpe": 0.161,
        "top5Concentration": 0.0559
      }
    },
    {
      "id": "BA-BENCH-066",
      "title": "120/40 trend momentum on WTI Crude Oil",
      "family": "momentum",
      "asset": "WTI Crude Oil",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": -0.2733,
        "maxDrawdown": 0.7265,
        "sharpe": 0.108,
        "top5Concentration": 0.058
      }
    },
    {
      "id": "BA-BENCH-067",
      "title": "90-day breakout momentum on WTI Crude Oil",
      "family": "momentum",
      "asset": "WTI Crude Oil",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": 0.8931,
        "maxDrawdown": 0.5186,
        "sharpe": 0.323,
        "top5Concentration": 0.0503
      }
    },
    {
      "id": "BA-BENCH-068",
      "title": "drawdown value proxy on WTI Crude Oil",
      "family": "value_proxy",
      "asset": "WTI Crude Oil",
      "source": "FRED",
      "score": 38,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Separate true mean reversion from one-period bounce and require long underperformance tolerance.",
      "metrics": {
        "totalReturn": 0.3132,
        "maxDrawdown": 0.7661,
        "sharpe": 0.259,
        "top5Concentration": 0.0394
      }
    },
    {
      "id": "BA-BENCH-069",
      "title": "deep mean-reversion value proxy on WTI Crude Oil",
      "family": "value_proxy",
      "asset": "WTI Crude Oil",
      "source": "FRED",
      "score": 52,
      "verdict": "RETEST",
      "risks": [
        "second-half decay",
        "drawdown mismatch"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Separate true mean reversion from one-period bounce and require long underperformance tolerance.",
      "metrics": {
        "totalReturn": 3.8989,
        "maxDrawdown": 0.5678,
        "sharpe": 0.521,
        "top5Concentration": 0.0414
      }
    },
    {
      "id": "BA-BENCH-070",
      "title": "z-score mean reversion on WTI Crude Oil",
      "family": "mean_reversion",
      "asset": "WTI Crude Oil",
      "source": "FRED",
      "score": 28,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return",
        "turnover/cost fragility"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Prioritize cost, spread, turnover, and tail-loss checks because small edges vanish quickly.",
      "metrics": {
        "totalReturn": 0.1606,
        "maxDrawdown": 0.4174,
        "sharpe": 0.18,
        "top5Concentration": 0.0843
      }
    },
    {
      "id": "BA-BENCH-071",
      "title": "aggressive z-score mean reversion on WTI Crude Oil",
      "family": "mean_reversion",
      "asset": "WTI Crude Oil",
      "source": "FRED",
      "score": 46,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return",
        "turnover/cost fragility"
      ],
      "nextTest": "Run 2x and 3x fee/slippage stress with realistic fills.",
      "benchmarkPrior": "Prioritize cost, spread, turnover, and tail-loss checks because small edges vanish quickly.",
      "metrics": {
        "totalReturn": 0.6716,
        "maxDrawdown": 0.4106,
        "sharpe": 0.288,
        "top5Concentration": 0.071
      }
    },
    {
      "id": "BA-BENCH-072",
      "title": "pair spread mean reversion on WTI Crude Oil",
      "family": "pairs_stat_arb",
      "asset": "WTI Crude Oil",
      "source": "FRED",
      "score": 38,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Audit spread stability, formation/test separation, and whether the apparent edge is just noisy mean reversion.",
      "metrics": {
        "totalReturn": 0.1687,
        "maxDrawdown": 0.5882,
        "sharpe": 0.194,
        "top5Concentration": 0.0686
      }
    },
    {
      "id": "BA-BENCH-073",
      "title": "moving-average crossover on WTI Crude Oil",
      "family": "trend_following",
      "asset": "WTI Crude Oil",
      "source": "FRED",
      "score": 38,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Inspect sideways-market whipsaws and whether performance comes from one extended trend.",
      "metrics": {
        "totalReturn": 0.0525,
        "maxDrawdown": 0.766,
        "sharpe": 0.211,
        "top5Concentration": 0.0447
      }
    },
    {
      "id": "BA-BENCH-074",
      "title": "dual breakout trend on WTI Crude Oil",
      "family": "trend_following",
      "asset": "WTI Crude Oil",
      "source": "FRED",
      "score": 38,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Inspect sideways-market whipsaws and whether performance comes from one extended trend.",
      "metrics": {
        "totalReturn": -0.7257,
        "maxDrawdown": 0.8152,
        "sharpe": -0.063,
        "top5Concentration": 0.042
      }
    },
    {
      "id": "BA-BENCH-075",
      "title": "channel breakout on WTI Crude Oil",
      "family": "breakout",
      "asset": "WTI Crude Oil",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Remove top winners and test whether the curve survives without rare breakout events.",
      "metrics": {
        "totalReturn": -0.5458,
        "maxDrawdown": 0.7215,
        "sharpe": -0.345,
        "top5Concentration": 0.1762
      }
    },
    {
      "id": "BA-BENCH-076",
      "title": "55-day expansion breakout on WTI Crude Oil",
      "family": "breakout",
      "asset": "WTI Crude Oil",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Remove top winners and test whether the curve survives without rare breakout events.",
      "metrics": {
        "totalReturn": -0.5458,
        "maxDrawdown": 0.7215,
        "sharpe": -0.345,
        "top5Concentration": 0.1762
      }
    },
    {
      "id": "BA-BENCH-077",
      "title": "positive drift carry proxy on WTI Crude Oil",
      "family": "carry_proxy",
      "asset": "WTI Crude Oil",
      "source": "FRED",
      "score": 38,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Stress funding, gap risk, liquidity, and correlation spikes across regimes.",
      "metrics": {
        "totalReturn": -0.2124,
        "maxDrawdown": 0.7024,
        "sharpe": 0.062,
        "top5Concentration": 0.0731
      }
    },
    {
      "id": "BA-BENCH-078",
      "title": "low-vol carry proxy on WTI Crude Oil",
      "family": "carry_proxy",
      "asset": "WTI Crude Oil",
      "source": "FRED",
      "score": 38,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Stress funding, gap risk, liquidity, and correlation spikes across regimes.",
      "metrics": {
        "totalReturn": -0.3526,
        "maxDrawdown": 0.5618,
        "sharpe": -0.091,
        "top5Concentration": 0.102
      }
    },
    {
      "id": "BA-BENCH-079",
      "title": "range grid proxy on WTI Crude Oil",
      "family": "crypto_grid",
      "asset": "WTI Crude Oil",
      "source": "FRED",
      "score": 28,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return",
        "turnover/cost fragility"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Check whether small range profits are erased by trend breaks, fees, and liquidation-like drawdowns.",
      "metrics": {
        "totalReturn": 0.0106,
        "maxDrawdown": 0.6712,
        "sharpe": 0.145,
        "top5Concentration": 0.0859
      }
    },
    {
      "id": "BA-BENCH-080",
      "title": "tight crypto grid proxy on WTI Crude Oil",
      "family": "crypto_grid",
      "asset": "WTI Crude Oil",
      "source": "FRED",
      "score": 28,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return",
        "turnover/cost fragility"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Check whether small range profits are erased by trend breaks, fees, and liquidation-like drawdowns.",
      "metrics": {
        "totalReturn": 0.1911,
        "maxDrawdown": 0.4779,
        "sharpe": 0.182,
        "top5Concentration": 0.1008
      }
    },
    {
      "id": "BA-BENCH-081",
      "title": "60/20 trend momentum on Gold Fixing Price",
      "family": "momentum",
      "asset": "Gold Fixing Price",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": 0.631,
        "maxDrawdown": 0.6193,
        "sharpe": 0.284,
        "top5Concentration": 0.0489
      }
    },
    {
      "id": "BA-BENCH-082",
      "title": "120/40 trend momentum on Gold Fixing Price",
      "family": "momentum",
      "asset": "Gold Fixing Price",
      "source": "FRED",
      "score": 38,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": 0.4888,
        "maxDrawdown": 0.629,
        "sharpe": 0.263,
        "top5Concentration": 0.0563
      }
    },
    {
      "id": "BA-BENCH-083",
      "title": "90-day breakout momentum on Gold Fixing Price",
      "family": "momentum",
      "asset": "Gold Fixing Price",
      "source": "FRED",
      "score": 52,
      "verdict": "RETEST",
      "risks": [
        "second-half decay",
        "drawdown mismatch"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": 2.2431,
        "maxDrawdown": 0.6021,
        "sharpe": 0.456,
        "top5Concentration": 0.0558
      }
    },
    {
      "id": "BA-BENCH-084",
      "title": "drawdown value proxy on Gold Fixing Price",
      "family": "value_proxy",
      "asset": "Gold Fixing Price",
      "source": "FRED",
      "score": 38,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Separate true mean reversion from one-period bounce and require long underperformance tolerance.",
      "metrics": {
        "totalReturn": -0.3601,
        "maxDrawdown": 0.8821,
        "sharpe": 0.128,
        "top5Concentration": 0.0392
      }
    },
    {
      "id": "BA-BENCH-085",
      "title": "deep mean-reversion value proxy on Gold Fixing Price",
      "family": "value_proxy",
      "asset": "Gold Fixing Price",
      "source": "FRED",
      "score": 38,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Separate true mean reversion from one-period bounce and require long underperformance tolerance.",
      "metrics": {
        "totalReturn": -0.566,
        "maxDrawdown": 0.8808,
        "sharpe": 0.041,
        "top5Concentration": 0.0411
      }
    },
    {
      "id": "BA-BENCH-086",
      "title": "z-score mean reversion on Gold Fixing Price",
      "family": "mean_reversion",
      "asset": "Gold Fixing Price",
      "source": "FRED",
      "score": 28,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return",
        "turnover/cost fragility"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Prioritize cost, spread, turnover, and tail-loss checks because small edges vanish quickly.",
      "metrics": {
        "totalReturn": -0.1367,
        "maxDrawdown": 0.6767,
        "sharpe": 0.105,
        "top5Concentration": 0.0895
      }
    },
    {
      "id": "BA-BENCH-087",
      "title": "aggressive z-score mean reversion on Gold Fixing Price",
      "family": "mean_reversion",
      "asset": "Gold Fixing Price",
      "source": "FRED",
      "score": 46,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return",
        "turnover/cost fragility"
      ],
      "nextTest": "Run 2x and 3x fee/slippage stress with realistic fills.",
      "benchmarkPrior": "Prioritize cost, spread, turnover, and tail-loss checks because small edges vanish quickly.",
      "metrics": {
        "totalReturn": -0.1605,
        "maxDrawdown": 0.6816,
        "sharpe": 0.11,
        "top5Concentration": 0.0761
      }
    },
    {
      "id": "BA-BENCH-088",
      "title": "pair spread mean reversion on Gold Fixing Price",
      "family": "pairs_stat_arb",
      "asset": "Gold Fixing Price",
      "source": "FRED",
      "score": 38,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Audit spread stability, formation/test separation, and whether the apparent edge is just noisy mean reversion.",
      "metrics": {
        "totalReturn": 0.156,
        "maxDrawdown": 0.7029,
        "sharpe": 0.198,
        "top5Concentration": 0.0704
      }
    },
    {
      "id": "BA-BENCH-089",
      "title": "moving-average crossover on Gold Fixing Price",
      "family": "trend_following",
      "asset": "Gold Fixing Price",
      "source": "FRED",
      "score": 52,
      "verdict": "RETEST",
      "risks": [
        "second-half decay",
        "drawdown mismatch"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Inspect sideways-market whipsaws and whether performance comes from one extended trend.",
      "metrics": {
        "totalReturn": 3.2346,
        "maxDrawdown": 0.4908,
        "sharpe": 0.508,
        "top5Concentration": 0.0484
      }
    },
    {
      "id": "BA-BENCH-090",
      "title": "dual breakout trend on Gold Fixing Price",
      "family": "trend_following",
      "asset": "Gold Fixing Price",
      "source": "FRED",
      "score": 52,
      "verdict": "RETEST",
      "risks": [
        "second-half decay",
        "drawdown mismatch"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Inspect sideways-market whipsaws and whether performance comes from one extended trend.",
      "metrics": {
        "totalReturn": 3.6583,
        "maxDrawdown": 0.607,
        "sharpe": 0.522,
        "top5Concentration": 0.0465
      }
    },
    {
      "id": "BA-BENCH-091",
      "title": "channel breakout on Gold Fixing Price",
      "family": "breakout",
      "asset": "Gold Fixing Price",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Remove top winners and test whether the curve survives without rare breakout events.",
      "metrics": {
        "totalReturn": -0.4441,
        "maxDrawdown": 0.6246,
        "sharpe": -0.262,
        "top5Concentration": 0.1388
      }
    },
    {
      "id": "BA-BENCH-092",
      "title": "55-day expansion breakout on Gold Fixing Price",
      "family": "breakout",
      "asset": "Gold Fixing Price",
      "source": "FRED",
      "score": 56,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Remove top winners and test whether the curve survives without rare breakout events.",
      "metrics": {
        "totalReturn": -0.4441,
        "maxDrawdown": 0.6246,
        "sharpe": -0.262,
        "top5Concentration": 0.1388
      }
    },
    {
      "id": "BA-BENCH-093",
      "title": "positive drift carry proxy on Gold Fixing Price",
      "family": "carry_proxy",
      "asset": "Gold Fixing Price",
      "source": "FRED",
      "score": 70,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Stress funding, gap risk, liquidity, and correlation spikes across regimes.",
      "metrics": {
        "totalReturn": 5.2541,
        "maxDrawdown": 0.4919,
        "sharpe": 0.62,
        "top5Concentration": 0.0496
      }
    },
    {
      "id": "BA-BENCH-094",
      "title": "low-vol carry proxy on Gold Fixing Price",
      "family": "carry_proxy",
      "asset": "Gold Fixing Price",
      "source": "FRED",
      "score": 70,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Stress funding, gap risk, liquidity, and correlation spikes across regimes.",
      "metrics": {
        "totalReturn": 1.5753,
        "maxDrawdown": 0.3685,
        "sharpe": 0.445,
        "top5Concentration": 0.0916
      }
    },
    {
      "id": "BA-BENCH-095",
      "title": "range grid proxy on Gold Fixing Price",
      "family": "crypto_grid",
      "asset": "Gold Fixing Price",
      "source": "FRED",
      "score": 28,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return",
        "turnover/cost fragility"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Check whether small range profits are erased by trend breaks, fees, and liquidation-like drawdowns.",
      "metrics": {
        "totalReturn": 0.4612,
        "maxDrawdown": 0.5869,
        "sharpe": 0.249,
        "top5Concentration": 0.0652
      }
    },
    {
      "id": "BA-BENCH-096",
      "title": "tight crypto grid proxy on Gold Fixing Price",
      "family": "crypto_grid",
      "asset": "Gold Fixing Price",
      "source": "FRED",
      "score": 60,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch",
        "turnover/cost fragility"
      ],
      "nextTest": "Run 2x and 3x fee/slippage stress with realistic fills.",
      "benchmarkPrior": "Check whether small range profits are erased by trend breaks, fees, and liquidation-like drawdowns.",
      "metrics": {
        "totalReturn": 1.9842,
        "maxDrawdown": 0.4484,
        "sharpe": 0.505,
        "top5Concentration": 0.0721
      }
    },
    {
      "id": "BA-BENCH-097",
      "title": "60/20 trend momentum on USD/EUR Exchange Rate",
      "family": "momentum",
      "asset": "USD/EUR Exchange Rate",
      "source": "FRED",
      "score": 70,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": 6.9915,
        "maxDrawdown": 0.5932,
        "sharpe": 0.671,
        "top5Concentration": 0.044
      }
    },
    {
      "id": "BA-BENCH-098",
      "title": "120/40 trend momentum on USD/EUR Exchange Rate",
      "family": "momentum",
      "asset": "USD/EUR Exchange Rate",
      "source": "FRED",
      "score": 70,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": 4.9872,
        "maxDrawdown": 0.667,
        "sharpe": 0.609,
        "top5Concentration": 0.042
      }
    },
    {
      "id": "BA-BENCH-099",
      "title": "90-day breakout momentum on USD/EUR Exchange Rate",
      "family": "momentum",
      "asset": "USD/EUR Exchange Rate",
      "source": "FRED",
      "score": 70,
      "verdict": "RETEST",
      "risks": [
        "drawdown mismatch"
      ],
      "nextTest": "Retest lower leverage and hard risk caps.",
      "benchmarkPrior": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
      "metrics": {
        "totalReturn": 13.2748,
        "maxDrawdown": 0.4994,
        "sharpe": 0.813,
        "top5Concentration": 0.0426
      }
    },
    {
      "id": "BA-BENCH-100",
      "title": "drawdown value proxy on USD/EUR Exchange Rate",
      "family": "value_proxy",
      "asset": "USD/EUR Exchange Rate",
      "source": "FRED",
      "score": 38,
      "verdict": "KILL",
      "risks": [
        "second-half decay",
        "drawdown mismatch",
        "weak risk-adjusted return"
      ],
      "nextTest": "Freeze parameters and run walk-forward / later-period split.",
      "benchmarkPrior": "Separate true mean reversion from one-period bounce and require long underperformance tolerance.",
      "metrics": {
        "totalReturn": 0.7321,
        "maxDrawdown": 0.6946,
        "sharpe": 0.308,
        "top5Concentration": 0.0343
      }
    }
  ]
};
