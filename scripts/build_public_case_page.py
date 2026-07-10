import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CASES_PATH = ROOT / "training" / "cases" / "benchmark_cases.json"
OUT_PATH = ROOT / "cases.html"


def pct(value):
    return f"{value * 100:.1f}%"


def verdict_class(verdict):
    return verdict.lower()


def main():
    data = json.loads(CASES_PATH.read_text(encoding="utf-8"))
    cases = data["cases"]
    featured = []
    seen = set()
    for case in cases:
        family = case["strategy_family"]
        if family not in seen:
            featured.append(case)
            seen.add(family)
    cards = []
    for case in featured[:8]:
        metrics = case["metrics"]
        audit = case["audit"]
        cards.append(f"""
          <article class="case-study-card {verdict_class(audit['verdict'])}">
            <div class="case-study-top">
              <span>{audit['verdict']}</span>
              <strong>{audit['score']}/100</strong>
            </div>
            <h3>{case['strategy_variant'].title()}</h3>
            <p>{case['asset']} · {case['source']} · {case['period']['start']} to {case['period']['end']}</p>
            <div class="case-metrics">
              <article><span>Return</span><strong>{pct(metrics['total_return'])}</strong></article>
              <article><span>Drawdown</span><strong>{pct(metrics['max_drawdown'])}</strong></article>
              <article><span>Sharpe</span><strong>{metrics['sharpe']:.2f}</strong></article>
            </div>
            <h4>Why it may be fake-strong</h4>
            <p>{', '.join(audit['risks'])}.</p>
            <h4>Next retest</h4>
            <p>{audit['next_test']}</p>
          </article>
        """.strip())
    rows = []
    for case in cases:
        metrics = case["metrics"]
        audit = case["audit"]
        rows.append(f"""
          <tr>
            <td>{case['id']}</td>
            <td>{case['strategy_family']}</td>
            <td>{case['asset']}</td>
            <td><span class="verdict-pill {verdict_class(audit['verdict'])}">{audit['verdict']}</span></td>
            <td>{audit['score']}</td>
            <td>{pct(metrics['total_return'])}</td>
            <td>{pct(metrics['max_drawdown'])}</td>
            <td>{', '.join(audit['risks'][:2])}</td>
          </tr>
        """.strip())
    cards_html = "\n          ".join(cards)
    rows_html = "\n          ".join(rows)
    html = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Benchmark Cases | Backtest Auditor</title>
    <meta name="description" content="A public benchmark case library showing how Backtest Auditor labels fake-strong strategy evidence." />
    <link rel="icon" href="./favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <header class="topbar">
      <a class="brand" href="./index.html" aria-label="Backtest Auditor">
        <span class="brand-mark">BA</span>
        <span>Backtest Auditor</span>
      </a>
      <nav class="nav" aria-label="Primary navigation">
        <a href="./index.html">Overview</a>
        <a href="./methodology.html">Methodology</a>
        <a href="./app.html">Workspace</a>
        <a href="./audit.html">$9 Audit</a>
      </nav>
      <div class="toolbar">
        <a class="secondary" href="./methodology.html">Methodology</a>
        <a class="primary" href="./audit.html">Request audit</a>
      </div>
    </header>
    <main>
      <section class="method-hero">
        <p class="kicker">Benchmark Case Library</p>
        <h1>{len(cases)} strategy cases used to calibrate fake-backtest detection.</h1>
        <p>These cases train the audit workflow to recognize evidence gaps, overfit risk, cost fragility, regime weakness, and factor-clone behavior. They are not investment recommendations or profit predictions.</p>
      </section>
      <section class="market">
        <div class="section-head compact">
          <p class="kicker">Skill Rubric</p>
          <h2>What the professional skill is being trained to do</h2>
        </div>
        <div class="evidence-grid">
          <article><span>01</span><h3>Read the evidence, not the vibe</h3><p>Prioritize samples, drawdown, costs, and time splits over a pretty equity line.</p></article>
          <article><span>02</span><h3>Recognize benchmark traps</h3><p>Compare against factor-like, carry-like, and regime-specific failure modes before trusting the curve.</p></article>
          <article><span>03</span><h3>Return a bounded verdict</h3><p>Always produce Continue, Retest, or Kill with a next test and boundary statement.</p></article>
          <article><span>04</span><h3>Explain missing proof</h3><p>Say exactly what evidence is absent, what is fragile, and what to test next.</p></article>
        </div>
      </section>
      <section class="market">
        <div class="section-head compact">
          <p class="kicker">Training Workflow</p>
          <h2>How the benchmark corpus turns into a more professional audit skill</h2>
        </div>
        <div class="corpus-grid">
          <article><span>Corpus</span><h3>100 labeled cases</h3><p>Real-market and bootstrap regimes mapped to strategy archetypes.</p></article>
          <article><span>RAG</span><h3>Nearest-case retrieval</h3><p>Similarity search pulls comparable cases into the memo before it is delivered.</p></article>
          <article><span>Fine-tune</span><h3>Structured + chat JSONL</h3><p>Training data is split into natural memo and structured JSON formats for future upload.</p></article>
          <article><span>Boundary</span><h3>Audit calibration only</h3><p>The skill learns to review evidence better, not to promise profit or live-readiness.</p></article>
        </div>
      </section>
      <section class="market">
        <div class="section-head compact">
          <p class="kicker">Featured Archetypes</p>
          <h2>Representative cases across mainstream strategy families</h2>
        </div>
        <div class="case-study-grid">
          {cards_html}
        </div>
      </section>
      <section class="market">
        <div class="section-head compact">
          <p class="kicker">Full Case Index</p>
          <h2>All {len(cases)} benchmark labels</h2>
          <p>Source labels reflect the data used in the local benchmark pipeline. FRED cases use cached public market series; bootstrap cases are synthetic regime seeds used for crypto-like stress patterns.</p>
        </div>
        <div class="case-table-wrap">
          <table class="case-table">
            <thead>
              <tr><th>ID</th><th>Family</th><th>Asset</th><th>Verdict</th><th>Score</th><th>Return</th><th>Drawdown</th><th>Main risks</th></tr>
            </thead>
            <tbody>{rows_html}</tbody>
          </table>
        </div>
      </section>
      <section class="trust-strip">
        <div>
          <p class="kicker">Boundary</p>
          <h2>This is audit calibration, not alpha research.</h2>
        </div>
        <ul>
          <li>No buy/sell signals.</li>
          <li>No profit prediction.</li>
          <li>No claim that a strategy is live-ready.</li>
          <li>Use cases to improve evidence review and next-test recommendations.</li>
        </ul>
      </section>
    </main>
  </body>
</html>
"""
    OUT_PATH.write_text(html, encoding="utf-8")
    print(f"Wrote {OUT_PATH} with {len(cases)} cases")


if __name__ == "__main__":
    main()
