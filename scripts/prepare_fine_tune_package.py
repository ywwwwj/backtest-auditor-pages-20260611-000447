import json
import random
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CASES_PATH = ROOT / "training" / "cases" / "benchmark_cases.json"
OUT_DIR = ROOT / "training" / "fine_tune"


SYSTEM = (
    "You are Backtest Auditor, a research credibility reviewer for backtest outputs. "
    "You never provide investment advice, buy/sell signals, profit predictions, or live-trading readiness claims. "
    "You classify evidence as CONTINUE, RETEST, or KILL and explain missing proof."
)

STRUCTURED_SYSTEM = (
    "You are Backtest Auditor. Return a single JSON object with verdict, trust_score, main_risks, "
    "evidence_interpretation, next_test, and boundary. Do not add extra commentary."
)


LABEL_SPEC = """# Backtest Auditor Fine-Tune Label Specification

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
"""

STRUCTURED_SCHEMA = {
    "type": "object",
    "required": ["verdict", "trust_score", "main_risks", "evidence_interpretation", "next_test", "boundary"],
    "properties": {
        "verdict": {"type": "string", "enum": ["CONTINUE", "RETEST", "KILL"]},
        "trust_score": {"type": "number", "minimum": 0, "maximum": 100},
        "main_risks": {"type": "array", "items": {"type": "string"}},
        "evidence_interpretation": {"type": "string"},
        "next_test": {"type": "string"},
        "boundary": {"type": "string"},
    },
}


def pct(value):
    return f"{value * 100:.2f}%"


def case_to_messages(case):
    metrics = case["metrics"]
    audit = case["audit"]
    user = "\n".join([
        "Create a professional backtest credibility audit memo.",
        f"Case ID: {case['id']}",
        f"Strategy family: {case['strategy_family']}",
        f"Strategy variant: {case['strategy_variant']}",
        f"Asset: {case['asset']}",
        f"Data source: {case['source']}",
        f"Period: {case['period']['start']} to {case['period']['end']}",
        f"Total return: {pct(metrics['total_return'])}",
        f"Max drawdown: {pct(metrics['max_drawdown'])}",
        f"Sharpe: {metrics['sharpe']:.2f}",
        f"Samples: {metrics['samples']}",
        f"Trades: {metrics['trades']}",
        f"Top-5 concentration: {metrics['top5_concentration'] * 100:.1f}%",
        f"Benchmark prior: {audit['benchmark_prior']}",
    ])
    assistant = "\n".join([
        f"Verdict: {audit['verdict']}",
        f"Trust score: {audit['score']}/100",
        f"Main risks: {', '.join(audit['risks'])}",
        f"Evidence interpretation: {audit['why']}",
        f"Next test: {audit['next_test']}",
        "Boundary: This is research credibility feedback only. It is not investment advice, not a buy/sell signal, and not live-trading approval.",
    ])
    return {"messages": [{"role": "system", "content": SYSTEM}, {"role": "user", "content": user}, {"role": "assistant", "content": assistant}]}


def case_to_structured_messages(case):
    metrics = case["metrics"]
    audit = case["audit"]
    user = "\n".join([
        "Return a JSON audit memo only.",
        f"Case ID: {case['id']}",
        f"Strategy family: {case['strategy_family']}",
        f"Strategy variant: {case['strategy_variant']}",
        f"Asset: {case['asset']}",
        f"Data source: {case['source']}",
        f"Period: {case['period']['start']} to {case['period']['end']}",
        f"Total return: {pct(metrics['total_return'])}",
        f"Max drawdown: {pct(metrics['max_drawdown'])}",
        f"Sharpe: {metrics['sharpe']:.2f}",
        f"Samples: {metrics['samples']}",
        f"Trades: {metrics['trades']}",
        f"Top-5 concentration: {metrics['top5_concentration'] * 100:.1f}%",
        f"Benchmark prior: {audit['benchmark_prior']}",
    ])
    assistant_obj = {
        "verdict": audit["verdict"],
        "trust_score": audit["score"],
        "main_risks": audit["risks"],
        "evidence_interpretation": audit["why"],
        "next_test": audit["next_test"],
        "boundary": "This is research credibility feedback only. It is not investment advice, not a buy/sell signal, and not live-trading approval.",
    }
    assistant = json.dumps(assistant_obj, ensure_ascii=False)
    return {"messages": [{"role": "system", "content": STRUCTURED_SYSTEM}, {"role": "user", "content": user}, {"role": "assistant", "content": assistant}]}


def write_jsonl(path, rows):
    with path.open("w", encoding="utf-8") as handle:
        for row in rows:
            handle.write(json.dumps(row, ensure_ascii=False) + "\n")


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    data = json.loads(CASES_PATH.read_text(encoding="utf-8"))
    cases = data["cases"]
    random.seed(42)
    shuffled = cases[:]
    random.shuffle(shuffled)
    validation_size = max(5, round(len(shuffled) * 0.16))
    validation_cases = shuffled[:validation_size]
    train_cases = shuffled[validation_size:]

    train_rows = [case_to_messages(case) for case in train_cases]
    validation_rows = [case_to_messages(case) for case in validation_cases]
    all_rows = [case_to_messages(case) for case in cases]
    structured_train_rows = [case_to_structured_messages(case) for case in train_cases]
    structured_validation_rows = [case_to_structured_messages(case) for case in validation_cases]
    structured_all_rows = [case_to_structured_messages(case) for case in cases]

    write_jsonl(OUT_DIR / "audit_memo_train.jsonl", train_rows)
    write_jsonl(OUT_DIR / "audit_memo_validation.jsonl", validation_rows)
    write_jsonl(OUT_DIR / "audit_memo_all.jsonl", all_rows)
    write_jsonl(OUT_DIR / "audit_memo_structured_train.jsonl", structured_train_rows)
    write_jsonl(OUT_DIR / "audit_memo_structured_validation.jsonl", structured_validation_rows)
    write_jsonl(OUT_DIR / "audit_memo_structured_all.jsonl", structured_all_rows)
    (OUT_DIR / "LABEL_SPEC.md").write_text(LABEL_SPEC, encoding="utf-8")
    (OUT_DIR / "STRUCTURED_SCHEMA.json").write_text(json.dumps(STRUCTURED_SCHEMA, indent=2), encoding="utf-8")

    summary = {
        "case_count": len(cases),
        "train_count": len(train_rows),
        "validation_count": len(validation_rows),
        "structured_train_count": len(structured_train_rows),
        "structured_validation_count": len(structured_validation_rows),
        "verdict_counts_all": dict(Counter(case["audit"]["verdict"] for case in cases)),
        "family_counts_all": dict(Counter(case["strategy_family"] for case in cases)),
        "format": "chat messages JSONL + structured JSONL",
        "ready_for_upload": True,
        "caveat": "Upload/evaluation requires a model provider account and selected fine-tuning model.",
    }
    (OUT_DIR / "fine_tune_manifest.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
