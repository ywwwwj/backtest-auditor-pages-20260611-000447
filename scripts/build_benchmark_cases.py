import csv
import json
import math
import random
import statistics
import time
import urllib.error
import urllib.request
from datetime import UTC, datetime, timedelta
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
TRAINING = ROOT / "training"
DATA_DIR = TRAINING / "data"
CASES_DIR = TRAINING / "cases"
RAG_DIR = TRAINING / "rag"
FINE_TUNE_DIR = TRAINING / "fine_tune"

START = datetime(2018, 1, 1)
END = datetime(2026, 6, 15)


ASSETS = [
    {"symbol": "SP500", "name": "S&P 500 Index", "source": "FRED", "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=SP500"},
    {"symbol": "DJIA", "name": "Dow Jones Industrial Average", "source": "FRED", "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=DJIA"},
    {"symbol": "NASDAQCOM", "name": "NASDAQ Composite", "source": "FRED", "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=NASDAQCOM"},
    {"symbol": "VIXCLS", "name": "CBOE Volatility Index", "source": "FRED", "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=VIXCLS"},
    {"symbol": "DCOILWTICO", "name": "WTI Crude Oil", "source": "FRED", "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=DCOILWTICO"},
    {"symbol": "GOLDAMGBD228NLBM", "name": "Gold Fixing Price", "source": "FRED", "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=GOLDAMGBD228NLBM"},
    {"symbol": "DEXUSEU", "name": "USD/EUR Exchange Rate", "source": "FRED", "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=DEXUSEU"},
    {"symbol": "DEXJPUS", "name": "USD/JPY Exchange Rate", "source": "FRED", "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=DEXJPUS"},
    {"symbol": "DEXCHUS", "name": "USD/CNY Exchange Rate", "source": "FRED", "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=DEXCHUS"},
    {"symbol": "DTWEXBGS", "name": "Broad Dollar Index", "source": "FRED", "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=DTWEXBGS"},
    {"symbol": "DGS10", "name": "10-Year Treasury Yield", "source": "FRED", "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS10"},
    {"symbol": "DGS2", "name": "2-Year Treasury Yield", "source": "FRED", "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS2"},
    {"symbol": "FEDFUNDS", "name": "Effective Federal Funds Rate", "source": "FRED", "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=FEDFUNDS"},
    {"symbol": "BTC_BOOTSTRAP", "name": "BTC-like Crypto Regime Seed", "source": "local_bootstrap", "url": ""},
    {"symbol": "ETH_BOOTSTRAP", "name": "ETH-like Crypto Regime Seed", "source": "local_bootstrap", "url": ""},
]


STRATEGY_TEMPLATES = [
    {"family": "momentum", "variant": "60/20 trend momentum", "params": {"lookback": 60, "exit": 20}},
    {"family": "momentum", "variant": "120/40 trend momentum", "params": {"lookback": 120, "exit": 40}},
    {"family": "momentum", "variant": "90-day breakout momentum", "params": {"lookback": 90, "exit": 30}},
    {"family": "value_proxy", "variant": "drawdown value proxy", "params": {"lookback": 90, "threshold": -0.12}},
    {"family": "value_proxy", "variant": "deep mean-reversion value proxy", "params": {"lookback": 120, "threshold": -0.16}},
    {"family": "mean_reversion", "variant": "z-score mean reversion", "params": {"lookback": 20, "entry_z": -1.1}},
    {"family": "mean_reversion", "variant": "aggressive z-score mean reversion", "params": {"lookback": 10, "entry_z": -0.9}},
    {"family": "pairs_stat_arb", "variant": "pair spread mean reversion", "params": {"lookback": 18, "entry_z": -0.8}},
    {"family": "trend_following", "variant": "moving-average crossover", "params": {"fast": 30, "slow": 120}},
    {"family": "trend_following", "variant": "dual breakout trend", "params": {"fast": 50, "slow": 200}},
    {"family": "breakout", "variant": "channel breakout", "params": {"lookback": 55}},
    {"family": "breakout", "variant": "55-day expansion breakout", "params": {"lookback": 55}},
    {"family": "carry_proxy", "variant": "positive drift carry proxy", "params": {"lookback": 80, "vol_cap": 0.035}},
    {"family": "carry_proxy", "variant": "low-vol carry proxy", "params": {"lookback": 120, "vol_cap": 0.028}},
    {"family": "crypto_grid", "variant": "range grid proxy", "params": {"lookback": 18, "band": 0.035}},
    {"family": "crypto_grid", "variant": "tight crypto grid proxy", "params": {"lookback": 12, "band": 0.022}},
]


BENCHMARK_PRIORS = {
    "momentum": "Compare against plain momentum exposure, then test crash sensitivity and post-signal decay.",
    "value_proxy": "Separate true mean reversion from one-period bounce and require long underperformance tolerance.",
    "mean_reversion": "Prioritize cost, spread, turnover, and tail-loss checks because small edges vanish quickly.",
    "pairs_stat_arb": "Audit spread stability, formation/test separation, and whether the apparent edge is just noisy mean reversion.",
    "trend_following": "Inspect sideways-market whipsaws and whether performance comes from one extended trend.",
    "breakout": "Remove top winners and test whether the curve survives without rare breakout events.",
    "carry_proxy": "Stress funding, gap risk, liquidity, and correlation spikes across regimes.",
    "crypto_grid": "Check whether small range profits are erased by trend breaks, fees, and liquidation-like drawdowns.",
}


def ensure_dirs():
    for path in [DATA_DIR, CASES_DIR, RAG_DIR, FINE_TUNE_DIR]:
        path.mkdir(parents=True, exist_ok=True)


def fetch_url(url, timeout=18):
    req = urllib.request.Request(url, headers={"User-Agent": "BacktestAuditorBenchmarkBuilder/0.1"})
    with urllib.request.urlopen(req, timeout=timeout) as response:
        return response.read().decode("utf-8", errors="replace")


def parse_fred_csv(text, symbol):
    rows = []
    reader = csv.DictReader(text.splitlines())
    value_key = symbol
    for item in reader:
        raw = item.get(value_key, "").strip()
        if not raw or raw == ".":
            continue
        try:
            date = datetime.strptime(item["observation_date"], "%Y-%m-%d")
            value = float(raw)
        except (ValueError, KeyError):
            continue
        if START <= date <= END and value > 0:
            rows.append({"date": date.strftime("%Y-%m-%d"), "close": value})
    return rows


def synthetic_regime_series(symbol, seed):
    random.seed(seed)
    rows = []
    date = START
    price = 3800.0 if "BTC" in symbol else 220.0
    regimes = [
        (0.0016, 0.028, 360),
        (-0.0012, 0.045, 250),
        (0.0005, 0.020, 500),
        (0.0021, 0.036, 300),
        (-0.0008, 0.032, 260),
        (0.0009, 0.025, 500),
    ]
    regime_index = 0
    day_in_regime = 0
    while date <= END:
        drift, vol, length = regimes[regime_index % len(regimes)]
        shock = random.gauss(drift, vol)
        if random.random() < 0.012:
            shock += random.choice([-1, 1]) * random.uniform(0.08, 0.18)
        price = max(1.0, price * math.exp(shock))
        rows.append({"date": date.strftime("%Y-%m-%d"), "close": round(price, 4)})
        date += timedelta(days=1)
        day_in_regime += 1
        if day_in_regime >= length:
            regime_index += 1
            day_in_regime = 0
    return rows


def load_asset(asset):
    path = DATA_DIR / f"{asset['symbol']}.csv"
    status = {"symbol": asset["symbol"], "source": asset["source"], "status": "cache", "rows": 0, "url": asset["url"]}
    if path.exists():
        rows = read_price_csv(path)
        status["rows"] = len(rows)
        return rows, status

    rows = []
    if asset["source"] == "FRED":
        try:
            text = fetch_url(asset["url"])
            rows = parse_fred_csv(text, asset["symbol"])
            status["status"] = "downloaded"
        except (urllib.error.URLError, TimeoutError, ValueError) as error:
            status["status"] = f"download_failed: {error.__class__.__name__}"
    if not rows:
        rows = synthetic_regime_series(asset["symbol"], seed=sum(ord(c) for c in asset["symbol"]))
        status["source"] = "local_bootstrap"
        status["status"] = "bootstrap_fallback"
    write_price_csv(path, rows)
    status["rows"] = len(rows)
    return rows, status


def read_price_csv(path):
    with path.open("r", newline="", encoding="utf-8") as handle:
        return [{"date": row["date"], "close": float(row["close"])} for row in csv.DictReader(handle)]


def write_price_csv(path, rows):
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=["date", "close"])
        writer.writeheader()
        writer.writerows(rows)


def returns_from_prices(prices):
    out = [0.0]
    for prev, curr in zip(prices, prices[1:]):
        out.append((curr / prev) - 1.0 if prev else 0.0)
    return out


def rolling_mean(values, index, window):
    start = max(0, index - window)
    sample = values[start:index]
    return sum(sample) / len(sample) if sample else values[index]


def rolling_std(values, index, window):
    start = max(0, index - window)
    sample = values[start:index]
    return statistics.pstdev(sample) if len(sample) > 2 else 0.0


def signal_for(template, prices, rets, index):
    family = template["family"]
    params = template["params"]
    if index < 130:
        return 0.0
    if family == "momentum":
        lookback = params["lookback"]
        exit_window = params["exit"]
        long_mom = prices[index] / prices[index - lookback] - 1.0
        short_mom = prices[index] / prices[index - exit_window] - 1.0
        return 1.0 if long_mom > 0 and short_mom > -0.04 else 0.0
    if family == "value_proxy":
        lookback = params["lookback"]
        drawdown = prices[index] / max(prices[index - lookback:index]) - 1.0
        return 1.0 if drawdown < params["threshold"] else 0.0
    if family == "mean_reversion":
        lookback = params["lookback"]
        mean = rolling_mean(prices, index, lookback)
        std = rolling_std(prices, index, lookback)
        z = (prices[index] - mean) / std if std else 0.0
        return 1.0 if z < params["entry_z"] else 0.0
    if family == "pairs_stat_arb":
        lookback = params["lookback"]
        mean = rolling_mean(prices, index, lookback)
        std = rolling_std(prices, index, lookback)
        z = (prices[index] - mean) / std if std else 0.0
        return 1.0 if z < params["entry_z"] and abs(z) > 0.1 else 0.0
    if family == "trend_following":
        fast = rolling_mean(prices, index, params["fast"])
        slow = rolling_mean(prices, index, params["slow"])
        return 1.0 if fast > slow else 0.0
    if family == "breakout":
        lookback = params["lookback"]
        high = max(prices[index - lookback:index])
        return 1.0 if prices[index] >= high else 0.0
    if family == "carry_proxy":
        lookback = params["lookback"]
        drift = sum(rets[index - lookback:index])
        vol = statistics.pstdev(rets[index - lookback:index]) if index >= lookback + 2 else 0.0
        return 1.0 if drift > 0 and vol < params["vol_cap"] else 0.0
    if family == "crypto_grid":
        mean = rolling_mean(prices, index, params["lookback"])
        distance = abs(prices[index] / mean - 1.0) if mean else 0.0
        trend = abs(prices[index] / prices[index - 60] - 1.0)
        return 1.0 if distance < params["band"] and trend < 0.35 else 0.0
    return 0.0


def run_backtest(rows, template, fee_bps, slippage_bps):
    prices = [float(row["close"]) for row in rows]
    dates = [row["date"] for row in rows]
    asset_rets = returns_from_prices(prices)
    equity = 100000.0
    prev_signal = 0.0
    out = []
    strategy_rets = []
    trades = 0
    total_cost = (fee_bps + slippage_bps) / 10000.0
    for i in range(1, len(prices)):
        signal = signal_for(template, prices, asset_rets, i - 1)
        turnover = abs(signal - prev_signal)
        cost = turnover * total_cost
        strat_ret = prev_signal * asset_rets[i] - cost
        if turnover > 0:
            trades += 1
        equity *= 1.0 + strat_ret
        strategy_rets.append(strat_ret)
        out.append({"date": dates[i], "equity": equity, "return": strat_ret, "trades": trades})
        prev_signal = signal
    return out, strategy_rets


def max_drawdown(equity):
    peak = equity[0] if equity else 1.0
    worst = 0.0
    for value in equity:
        peak = max(peak, value)
        worst = min(worst, value / peak - 1.0)
    return abs(worst)


def compound(returns):
    value = 1.0
    for ret in returns:
        value *= 1.0 + ret
    return value - 1.0


def sharpe(returns):
    if len(returns) < 3:
        return 0.0
    mean = statistics.mean(returns)
    std = statistics.pstdev(returns)
    return (mean / std) * math.sqrt(252) if std else 0.0


def summarize_case(backtest_rows, returns, template, asset, fee_bps, slippage_bps):
    equity = [row["equity"] for row in backtest_rows]
    positives = sorted([ret for ret in returns if ret > 0], reverse=True)
    total_positive = sum(positives) or 1e-9
    top5_concentration = sum(positives[:5]) / total_positive
    half = len(returns) // 2
    first_half = compound(returns[:half])
    second_half = compound(returns[half:])
    cost3x_rows, cost3x_returns = run_backtest(
        [{"date": row["date"], "close": 100000.0 if idx == 0 else 100000.0} for idx, row in enumerate(backtest_rows[:1])],
        template,
        fee_bps * 3,
        slippage_bps * 3,
    ) if False else ([], [])
    metrics = {
        "total_return": compound(returns),
        "max_drawdown": max_drawdown(equity),
        "sharpe": sharpe(returns),
        "samples": len(returns),
        "trades": backtest_rows[-1]["trades"] if backtest_rows else 0,
        "top5_concentration": top5_concentration,
        "first_half_return": first_half,
        "second_half_return": second_half,
        "fee_bps": fee_bps,
        "slippage_bps": slippage_bps,
    }
    risks = []
    score = 86
    if metrics["samples"] < 240:
        risks.append("thin sample")
        score -= 18
    if metrics["trades"] < 15:
        risks.append("low trade count")
        score -= 12
    if top5_concentration > 0.45:
        risks.append("top-winner concentration")
        score -= 22
    if first_half > 0 and second_half < first_half * 0.25:
        risks.append("second-half decay")
        score -= 18
    if metrics["max_drawdown"] > 0.28:
        risks.append("drawdown mismatch")
        score -= 16
    if metrics["sharpe"] < 0.4:
        risks.append("weak risk-adjusted return")
        score -= 14
    if template["family"] in ["mean_reversion", "crypto_grid"] and metrics["trades"] > 80:
        risks.append("turnover/cost fragility")
        score -= 10
    if template["family"] in ["momentum", "breakout"] and top5_concentration > 0.35:
        risks.append("rare-event dependency")
        score -= 10
    score = max(8, min(94, round(score)))
    verdict = "CONTINUE" if score >= 72 and len(risks) <= 2 else "RETEST" if score >= 45 else "KILL"
    if "top-winner concentration" in risks or "rare-event dependency" in risks:
        next_test = "Remove top winners and rerun the equity curve."
    elif "second-half decay" in risks:
        next_test = "Freeze parameters and run walk-forward / later-period split."
    elif "turnover/cost fragility" in risks:
        next_test = "Run 2x and 3x fee/slippage stress with realistic fills."
    elif "drawdown mismatch" in risks:
        next_test = "Retest lower leverage and hard risk caps."
    else:
        next_test = "Compare against a simple benchmark and run parameter perturbation."
    return metrics, risks, score, verdict, next_test


def pct(value):
    return f"{value * 100:.2f}%"


def build_case(case_id, asset, template, rows, fee_bps, slippage_bps):
    backtest_rows, returns = run_backtest(rows, template, fee_bps, slippage_bps)
    metrics, risks, score, verdict, next_test = summarize_case(backtest_rows, returns, template, asset, fee_bps, slippage_bps)
    return {
        "id": case_id,
        "title": f"{template['variant']} on {asset['name']}",
        "strategy_family": template["family"],
        "strategy_variant": template["variant"],
        "asset": asset["name"],
        "symbol": asset["symbol"],
        "source": asset["source"],
        "period": {"start": rows[0]["date"], "end": rows[-1]["date"]},
        "params": template["params"],
        "costs": {"fee_bps": fee_bps, "slippage_bps": slippage_bps},
        "metrics": metrics,
        "audit": {
            "score": score,
            "verdict": verdict,
            "risks": risks or ["no major first-pass red flag"],
            "why": f"{verdict}: {', '.join(risks) if risks else 'first-pass evidence is acceptable but not live-ready'}.",
            "next_test": next_test,
            "benchmark_prior": BENCHMARK_PRIORS.get(template["family"], "Require OOS, costs, and regime evidence."),
        },
        "memo_seed": (
            f"Audit {template['family']} case on {asset['name']}. "
            f"Return {pct(metrics['total_return'])}, drawdown {pct(metrics['max_drawdown'])}, "
            f"Sharpe {metrics['sharpe']:.2f}, top-5 concentration {metrics['top5_concentration'] * 100:.1f}%. "
            f"Verdict {verdict}. Next test: {next_test}"
        ),
    }


def write_outputs(cases, manifest):
    summary_path = CASES_DIR / "benchmark_cases.json"
    with summary_path.open("w", encoding="utf-8") as handle:
        json.dump({"created_at": datetime.now(UTC).isoformat(), "cases": cases}, handle, indent=2)

    csv_path = CASES_DIR / "benchmark_cases.csv"
    with csv_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=[
            "id", "title", "strategy_family", "asset", "source", "score", "verdict",
            "total_return", "max_drawdown", "sharpe", "risks", "next_test",
        ])
        writer.writeheader()
        for case in cases:
            writer.writerow({
                "id": case["id"],
                "title": case["title"],
                "strategy_family": case["strategy_family"],
                "asset": case["asset"],
                "source": case["source"],
                "score": case["audit"]["score"],
                "verdict": case["audit"]["verdict"],
                "total_return": round(case["metrics"]["total_return"], 4),
                "max_drawdown": round(case["metrics"]["max_drawdown"], 4),
                "sharpe": round(case["metrics"]["sharpe"], 3),
                "risks": "; ".join(case["audit"]["risks"]),
                "next_test": case["audit"]["next_test"],
            })

    rag_path = RAG_DIR / "benchmark_rag_documents.jsonl"
    with rag_path.open("w", encoding="utf-8") as handle:
        for case in cases:
            doc = {
                "id": case["id"],
                "title": case["title"],
                "tags": [case["strategy_family"], case["audit"]["verdict"], case["symbol"]],
                "text": "\n".join([
                    case["memo_seed"],
                    f"Benchmark prior: {case['audit']['benchmark_prior']}",
                    f"Risks: {', '.join(case['audit']['risks'])}",
                    f"Decision: {case['audit']['verdict']}",
                    f"Next test: {case['audit']['next_test']}",
                    "Boundary: research credibility review only, not investment advice.",
                ]),
                "metadata": {
                    "strategy_family": case["strategy_family"],
                    "asset": case["asset"],
                    "source": case["source"],
                    "score": case["audit"]["score"],
                    "verdict": case["audit"]["verdict"],
                },
            }
            handle.write(json.dumps(doc, ensure_ascii=False) + "\n")

    ft_path = FINE_TUNE_DIR / "audit_memo_training.jsonl"
    with ft_path.open("w", encoding="utf-8") as handle:
        for case in cases:
            prompt = (
                "You are Backtest Auditor. Produce a skeptical research credibility memo. "
                "Do not provide investment advice. Use Continue/Retest/Kill only.\n\n"
                f"Case: {case['memo_seed']}\n"
                f"Benchmark prior: {case['audit']['benchmark_prior']}"
            )
            completion = (
                f"Verdict: {case['audit']['verdict']}\n"
                f"Trust score: {case['audit']['score']}/100\n"
                f"Main risks: {', '.join(case['audit']['risks'])}\n"
                f"Why: {case['audit']['why']}\n"
                f"Next test: {case['audit']['next_test']}\n"
                "Boundary: this is research credibility feedback, not a trading recommendation."
            )
            row = {"messages": [{"role": "system", "content": "You audit backtest credibility."}, {"role": "user", "content": prompt}, {"role": "assistant", "content": completion}]}
            handle.write(json.dumps(row, ensure_ascii=False) + "\n")

    manifest_path = TRAINING / "benchmark_manifest.json"
    with manifest_path.open("w", encoding="utf-8") as handle:
        json.dump(manifest, handle, indent=2)

    md_path = TRAINING / "README.md"
    with md_path.open("w", encoding="utf-8") as handle:
        handle.write("# Backtest Auditor Benchmark Training Assets\n\n")
        handle.write("This folder contains reproducible benchmark cases for audit calibration, RAG, and future fine-tuning.\n\n")
        handle.write("Boundary: these cases train fake-backtest detection and evidence review. They do not predict returns, provide investment advice, or recommend live trading.\n\n")
        handle.write("## Outputs\n\n")
        handle.write("- `cases/benchmark_cases.json`: structured benchmark case library.\n")
        handle.write("- `cases/benchmark_cases.csv`: compact review table.\n")
        handle.write("- `rag/benchmark_rag_documents.jsonl`: retrieval documents for AI audit memo generation.\n")
        handle.write("- `fine_tune/audit_memo_training.jsonl`: chat-style fine-tuning seed data.\n")
        handle.write("- `benchmark_manifest.json`: data source status and generation settings.\n")


def main():
    ensure_dirs()
    manifest = {
        "created_at": datetime.now(UTC).isoformat(),
        "date_range": {"start": START.strftime("%Y-%m-%d"), "end": END.strftime("%Y-%m-%d")},
        "purpose": "Audit calibration for fake-backtest detection, not alpha generation.",
        "data_sources": [],
    }
    assets = []
    for asset in ASSETS:
        rows, status = load_asset(asset)
        if len(rows) >= 260:
            assets.append(({**asset, "source": status["source"]}, rows))
        manifest["data_sources"].append(status)
    cases = []
    case_no = 1
    for asset, rows in assets:
        for template in STRATEGY_TEMPLATES:
            fee = 2 if asset["source"] == "FRED" else 6
            slippage = 3 if asset["source"] == "FRED" else 10
            case = build_case(f"BA-BENCH-{case_no:03d}", asset, template, rows, fee, slippage)
            cases.append(case)
            case_no += 1
    cases = cases[:100]
    manifest["case_count"] = len(cases)
    manifest["verdict_counts"] = {label: sum(1 for case in cases if case["audit"]["verdict"] == label) for label in ["KILL", "RETEST", "CONTINUE"]}
    write_outputs(cases, manifest)
    print(json.dumps({"case_count": len(cases), "verdict_counts": manifest["verdict_counts"]}, indent=2))


if __name__ == "__main__":
    main()
