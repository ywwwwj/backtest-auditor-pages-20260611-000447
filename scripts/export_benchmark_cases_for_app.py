import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CASES_PATH = ROOT / "training" / "cases" / "benchmark_cases.json"
OUT_PATH = ROOT / "benchmark-cases.js"


def compact_case(case):
    metrics = case["metrics"]
    audit = case["audit"]
    return {
        "id": case["id"],
        "title": case["title"],
        "family": case["strategy_family"],
        "asset": case["asset"],
        "source": case["source"],
        "score": audit["score"],
        "verdict": audit["verdict"],
        "risks": audit["risks"][:4],
        "nextTest": audit["next_test"],
        "benchmarkPrior": audit["benchmark_prior"],
        "metrics": {
            "totalReturn": round(metrics["total_return"], 4),
            "maxDrawdown": round(metrics["max_drawdown"], 4),
            "sharpe": round(metrics["sharpe"], 3),
            "top5Concentration": round(metrics["top5_concentration"], 4),
        },
    }


def main():
    data = json.loads(CASES_PATH.read_text(encoding="utf-8"))
    cases = [compact_case(case) for case in data["cases"]]
    payload = {
        "createdAt": data["created_at"],
        "purpose": "Static benchmark case index for audit memo retrieval. Not investment advice.",
        "cases": cases,
    }
    text = (
        "window.BACKTEST_AUDITOR_BENCHMARK_CASES = "
        + json.dumps(payload, ensure_ascii=False, indent=2)
        + ";\n"
    )
    OUT_PATH.write_text(text, encoding="utf-8")
    print(f"Wrote {OUT_PATH} with {len(cases)} cases")


if __name__ == "__main__":
    main()
