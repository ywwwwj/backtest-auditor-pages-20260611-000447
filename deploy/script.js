const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const state = { rows: [], latestReport: null, rulebook: null, market: "global" };
const defaultRulebook = { minSamples: 60, maxDrawdownRule: 20, minSharpeRule: 1.2, maxConcentrationRule: 40 };

const sampleCsv = `date,equity,pnl,return,trades
2024-01-01,100000,0,0,0
2024-01-02,101200,1200,0.012,4
2024-01-03,102350,1150,0.01136,6
2024-01-04,101100,-1250,-0.0122,5
2024-01-05,103900,2800,0.0277,9
2024-01-06,106400,2500,0.0241,8
2024-01-07,105900,-500,-0.0047,5
2024-01-08,108800,2900,0.0274,11
2024-01-09,111700,2900,0.0267,10
2024-01-10,110100,-1600,-0.0143,7
2024-01-11,114400,4300,0.0391,12
2024-01-12,116900,2500,0.0218,13
2024-01-13,116100,-800,-0.0068,6
2024-01-14,119600,3500,0.0301,9
2024-01-15,122900,3300,0.0276,11
2024-01-16,121000,-1900,-0.0155,8
2024-01-17,124800,3800,0.0314,12
2024-01-18,127900,3100,0.0248,10
2024-01-19,130100,2200,0.0172,9
2024-01-20,125400,-4700,-0.0361,12
2024-01-21,126000,600,0.0048,5
2024-01-22,126300,300,0.0024,5
2024-01-23,126700,400,0.0032,4
2024-01-24,126100,-600,-0.0047,5
2024-01-25,125600,-500,-0.004,4
2024-01-26,125900,300,0.0024,4
2024-01-27,125200,-700,-0.0056,5
2024-01-28,124900,-300,-0.0024,4
2024-01-29,124100,-800,-0.0064,6
2024-01-30,123700,-400,-0.0032,5`;

const liveDemoCsv = `date,equity,pnl,return,trades
2024-01-01,100000,0,0,0
2024-01-02,101100,1100,0.011,3
2024-01-03,101900,800,0.0079,4
2024-01-04,100800,-1100,-0.0108,5
2024-01-05,103000,2200,0.0218,4
2024-01-06,101700,-1300,-0.0126,6
2024-01-07,104400,2700,0.0265,4
2024-01-08,103200,-1200,-0.0115,5
2024-01-09,105100,1900,0.0184,4
2024-01-10,104000,-1100,-0.0105,5
2024-01-11,154000,50000,0.4808,2
2024-01-12,153200,-800,-0.0052,4
2024-01-13,152100,-1100,-0.0072,5
2024-01-14,151500,-600,-0.0039,5
2024-01-15,150800,-700,-0.0046,4
2024-01-16,149300,-1500,-0.0099,6
2024-01-17,148900,-400,-0.0027,4
2024-01-18,147600,-1300,-0.0087,5
2024-01-19,147000,-600,-0.0041,5
2024-01-20,145800,-1200,-0.0082,6
2024-01-21,145100,-700,-0.0048,5
2024-01-22,144200,-900,-0.0062,4
2024-01-23,143500,-700,-0.0049,5
2024-01-24,142700,-800,-0.0056,4
2024-01-25,141400,-1300,-0.0091,5
2024-01-26,140900,-500,-0.0035,4
2024-01-27,140100,-800,-0.0057,4
2024-01-28,139600,-500,-0.0036,5
2024-01-29,138900,-700,-0.005,4
2024-01-30,138300,-600,-0.0043,5`;

const retestExampleCsv = `date,equity,pnl,return,trades
2024-01-01,100000,0,0,0
2024-01-02,100900,900,0.009,2
2024-01-03,101700,800,0.0079,3
2024-01-04,100900,-800,-0.0079,4
2024-01-05,102000,1100,0.0109,3
2024-01-06,101100,-900,-0.0088,4
2024-01-07,102300,1200,0.0119,3
2024-01-08,101600,-700,-0.0068,4
2024-01-09,102800,1200,0.0118,3
2024-01-10,103700,900,0.0088,3
2024-01-11,102800,-900,-0.0087,4
2024-01-12,103900,1100,0.0107,3
2024-01-13,104600,700,0.0067,3
2024-01-14,103800,-800,-0.0076,4
2024-01-15,104900,1100,0.0106,3
2024-01-16,105800,900,0.0086,3
2024-01-17,104600,-1200,-0.0113,4
2024-01-18,105900,1300,0.0124,3
2024-01-19,106700,800,0.0076,3
2024-01-20,105200,-1500,-0.0141,4
2024-01-21,106100,900,0.0086,3
2024-01-22,106900,800,0.0075,3
2024-01-23,105800,-1100,-0.0103,4
2024-01-24,106600,800,0.0076,3`;

const continueExampleCsv = `date,equity,pnl,return,trades
2024-01-01,100000,0,0,0
2024-01-02,100520,520,0.0052,4
2024-01-03,101040,520,0.0052,4
2024-01-04,100780,-260,-0.0026,3
2024-01-05,101460,680,0.0067,5
2024-01-06,102010,550,0.0054,4
2024-01-07,101760,-250,-0.0025,3
2024-01-08,102520,760,0.0075,5
2024-01-09,103080,560,0.0055,4
2024-01-10,102820,-260,-0.0025,3
2024-01-11,103560,740,0.0072,5
2024-01-12,104110,550,0.0053,4
2024-01-13,103850,-260,-0.0025,3
2024-01-14,104620,770,0.0074,5
2024-01-15,105180,560,0.0054,4
2024-01-16,104930,-250,-0.0024,3
2024-01-17,105710,780,0.0074,5
2024-01-18,106270,560,0.0053,4
2024-01-19,106010,-260,-0.0024,3
2024-01-20,106810,800,0.0075,5
2024-01-21,107380,570,0.0053,4
2024-01-22,107110,-270,-0.0025,3
2024-01-23,107920,810,0.0076,5
2024-01-24,108500,580,0.0054,4
2024-01-25,108230,-270,-0.0025,3
2024-01-26,109060,830,0.0077,5
2024-01-27,109640,580,0.0053,4
2024-01-28,109370,-270,-0.0025,3
2024-01-29,110210,840,0.0077,5
2024-01-30,110800,590,0.0054,4
2024-01-31,110530,-270,-0.0024,3
2024-02-01,111390,860,0.0078,5
2024-02-02,111990,600,0.0054,4
2024-02-03,111720,-270,-0.0024,3
2024-02-04,112590,870,0.0078,5
2024-02-05,113200,610,0.0054,4
2024-02-06,112920,-280,-0.0025,3
2024-02-07,113810,890,0.0079,5
2024-02-08,114420,610,0.0054,4
2024-02-09,114140,-280,-0.0024,3
2024-02-10,115050,910,0.008,5
2024-02-11,115670,620,0.0054,4
2024-02-12,115390,-280,-0.0024,3
2024-02-13,116310,920,0.008,5
2024-02-14,116940,630,0.0054,4
2024-02-15,116650,-290,-0.0025,3
2024-02-16,117590,940,0.0081,5
2024-02-17,118230,640,0.0054,4
2024-02-18,117940,-290,-0.0025,3
2024-02-19,118900,960,0.0081,5
2024-02-20,119550,650,0.0055,4
2024-02-21,119250,-300,-0.0025,3
2024-02-22,120230,980,0.0082,5
2024-02-23,120890,660,0.0055,4
2024-02-24,120590,-300,-0.0025,3
2024-02-25,121590,1000,0.0083,5
2024-02-26,122260,670,0.0055,4
2024-02-27,121950,-310,-0.0025,3
2024-02-28,122970,1020,0.0084,5
2024-02-29,123650,680,0.0055,4
2024-03-01,123340,-310,-0.0025,3`;

const exampleReports = {
  kill: {
    csv: liveDemoCsv,
    name: "Outlier Breakout",
    desc: "TradingView-style breakout result. It looks profitable, but one extreme winner and second-half decay make the curve fake-strong.",
    source: "TradingView",
    asset: "Crypto",
    frequency: "Daily",
    fee: "3",
    slippage: "4",
  },
  retest: {
    csv: retestExampleCsv,
    name: "Thin Mean Reversion",
    desc: "A mean-reversion sample with potential signal, but too little history and incomplete cost confidence.",
    source: "Python / pandas",
    asset: "US Equity",
    frequency: "Daily",
    fee: "2",
    slippage: "2",
  },
  continue: {
    csv: continueExampleCsv,
    name: "Stable Momentum",
    desc: "A steadier momentum-style sample that passes the first credibility layer but still needs walk-forward validation.",
    source: "QuantConnect",
    asset: "US Equity",
    frequency: "Daily",
    fee: "6",
    slippage: "6",
  },
};

const market = {
  global: {
    name: "Global validation version",
    text: "Start with Reddit algo trading threads, QuantConnect users, and TradingView strategy authors.",
    prices: [
      ["Single audit", "$9", ["1 visual report", "Fake-backtest filters", "Markdown export"]],
      ["Research Pro", "$29/mo", ["Strategy Workspace", "AI Research Judge", "Weekly Queue + Retest Calendar", "Kill Reason Library"]],
      ["Desk", "$149/mo", ["5 seats", "Private strategy library", "Custom rulebook", "Custom import templates"]],
    ],
  },
};

market.global.prices = [
  ["Single audit", "$9", ["1 visual report", "Fake-backtest filters", "Markdown export"]],
  ["Research Pro", "$29/mo", ["Strategy Workspace", "AI Research Judge", "Weekly Queue + Retest Calendar", "Kill Reason Library"]],
  ["Desk", "$149/mo", ["5 seats", "Private strategy library", "Custom rulebook", "Custom import templates"]],
];

const platformGuides = {
  "TradingView": "Export strategy tester performance or closed-trade rows, then keep date/time plus equity, net profit, or return columns. This app is the second-opinion layer after TradingView, not a TradingView replacement.",
  "Python / pandas": "Paste a DataFrame export with date plus equity, pnl, or return columns. The minimum useful schema is date,equity or date,return.",
  "Excel / Google Sheets": "Copy the table directly from your sheet. Keep headers in the first row and include date, equity, pnl, return, or trades if available.",
  "QuantConnect": "Export equity curve, order statistics, or daily returns from the backtest result. Use this as a lightweight pre-review before deeper research.",
  "Other CSV": "Any CSV-like table works as long as it includes at least equity, pnl, or return. Dates are optional, but time-split and regime checks become weaker without them.",
};

function trackEvent(name, detail = {}) {
  const events = JSON.parse(localStorage.getItem("backtest-auditor-events") || "[]");
  events.push({ name, detail, createdAt: new Date().toISOString() });
  localStorage.setItem("backtest-auditor-events", JSON.stringify(events.slice(-200)));
  renderAnalytics();
}

function getEvents() {
  try { return JSON.parse(localStorage.getItem("backtest-auditor-events") || "[]"); }
  catch { return []; }
}

function renderAnalytics() {
  const grid = $("#analyticsGrid");
  if (!grid) return;
  const events = getEvents();
  const names = ["run_live_demo", "load_example", "load_sample", "upload_csv", "paste_csv", "download_template", "source_platform", "generate_ai_memo", "save_report", "schedule_retest", "task_status", "task_note", "save_client_profile", "payment_request", "export_paid_audit_pack", "export_ics", "export_weekly_ics", "join_waitlist", "paid_intent"];
  const labels = {
    run_live_demo: "Live demos",
    load_example: "Examples",
    load_sample: "Sample demos",
    upload_csv: "CSV uploads",
    paste_csv: "Paste inputs",
    download_template: "Templates",
    source_platform: "Source changes",
    generate_ai_memo: "AI memos",
    save_report: "Saved versions",
    schedule_retest: "Retests scheduled",
    task_status: "Task updates",
    task_note: "Retest notes",
    save_client_profile: "Profiles",
    payment_request: "Payment requests",
    export_paid_audit_pack: "Paid packs",
    export_ics: "ICS exports",
    export_weekly_ics: "Weekly ICS",
    join_waitlist: "Waitlist",
    paid_intent: "Paid intent",
  };
  grid.innerHTML = names.map((name) => {
    const count = events.filter((event) => event.name === name).length;
    return `<article><span>${escapeHtml(labels[name])}</span><strong>${count}</strong></article>`;
  }).join("");
}

function syncLeadCaptureContext() {
  const report = state.latestReport;
  if (!report) return;
  $("#latestStrategyName") && ($("#latestStrategyName").value = report.form.strategyName || "");
  $("#latestScore") && ($("#latestScore").value = String(report.audit.score ?? ""));
  const verdict = buildVerdict(report);
  $("#latestVerdict") && ($("#latestVerdict").value = verdict.title || "");
  $("#manualAuditStrategy") && ($("#manualAuditStrategy").value = report.form.strategyName || "");
  $("#manualAuditScore") && ($("#manualAuditScore").value = String(report.audit.score ?? ""));
  $("#manualAuditVerdict") && ($("#manualAuditVerdict").value = verdict.title || "");
  const loop = calculateResearchLoopStats(getSavedReports());
  $("#manualAuditLoopCompletion") && ($("#manualAuditLoopCompletion").value = `${loop.completedLoops}/${loop.strategyCount} (${loop.completionRate}%)`);
}

function showExampleConversion(type) {
  const panel = $("#exampleConversionPanel");
  if (!panel) return;
  const report = state.latestReport;
  const verdict = report ? buildVerdict(report) : null;
  $("#exampleTrigger") && ($("#exampleTrigger").value = type || "");
  $("#exampleConversionTitle") && ($("#exampleConversionTitle").textContent = `${type?.toUpperCase() || "EXAMPLE"} example loaded: ${report?.form.strategyName || "Sample strategy"}`);
  $("#exampleConversionCopy") && ($("#exampleConversionCopy").textContent = verdict
    ? `This sample ended with ${verdict.title} at score ${report.audit.score}/100. If that made the workflow feel useful, record paid intent now.`
    : "If this helped you understand the workflow, record paid intent while the use case is still fresh.");
  panel.hidden = false;
}

function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function formatPercent(value) { return Number.isFinite(value) ? `${(value * 100).toFixed(1)}%` : "--"; }
function normalReturn(value) { return Number.isFinite(value) ? (Math.abs(value) > 1 ? value / 100 : value) : 0; }
function compound(values) { return values.reduce((total, value) => total * (1 + value), 1) - 1; }

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((item) => item.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    return headers.reduce((row, key, index) => {
      const raw = values[index]?.trim() ?? "";
      const number = Number(raw.replace(/%$/, ""));
      row[key] = Number.isFinite(number) && raw !== "" ? number : raw;
      return row;
    }, {});
  });
}

function scoreColumnName(key, candidates) {
  const normalized = key.toLowerCase().replace(/[^a-z0-9]/g, "");
  return candidates.reduce((score, candidate) => {
    const clean = candidate.replace(/[^a-z0-9]/g, "");
    if (normalized === clean) return Math.max(score, 100);
    if (normalized.includes(clean)) return Math.max(score, 76);
    return score;
  }, 0);
}
function detectSchema(rows) {
  const keys = Object.keys(rows[0] || {});
  const specs = {
    dateCol: ["date", "time", "timestamp", "datetime", "day"],
    equityCol: ["equity", "balance", "capital", "nav", "portfolio", "accountvalue"],
    pnlCol: ["pnl", "profit", "netprofit", "pl", "gain"],
    returnCol: ["return", "returns", "ret", "dailyreturn", "pct"],
    tradeCol: ["trade", "trades", "turnover", "orders", "fills"],
  };
  return Object.fromEntries(Object.entries(specs).map(([field, candidates]) => {
    const ranked = keys.map((key) => ({ key, score: scoreColumnName(key, candidates) })).filter((item) => item.score > 0).sort((a, b) => b.score - a.score);
    return [field, { key: ranked[0]?.key || null, confidence: ranked[0]?.score || 0 }];
  }));
}

function drawdowns(equity) {
  let peak = equity[0] || 1;
  return equity.map((value) => {
    peak = Math.max(peak, value);
    return value / peak - 1;
  });
}
function sharpe(returns) {
  if (returns.length < 2) return 0;
  const mean = returns.reduce((sum, value) => sum + value, 0) / returns.length;
  const variance = returns.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (returns.length - 1);
  const stdev = Math.sqrt(variance);
  return stdev ? (mean / stdev) * Math.sqrt(252) : 0;
}

function calculateMetrics(rows) {
  const schema = detectSchema(rows);
  const equityCol = schema.equityCol.key;
  const pnlCol = schema.pnlCol.key;
  const returnCol = schema.returnCol.key;
  const dateCol = schema.dateCol.key;
  const tradeCol = schema.tradeCol.key;
  let equity = [];
  if (equityCol) equity = rows.map((row) => Number(row[equityCol])).filter(Number.isFinite);
  else if (pnlCol) {
    let total = 100000;
    equity = rows.map((row) => { total += Number(row[pnlCol]) || 0; return total; });
  } else if (returnCol) {
    let total = 100000;
    equity = rows.map((row) => { total *= 1 + normalReturn(Number(row[returnCol])); return total; });
  }
  if (equity.length < 2) equity = parseCsv(sampleCsv).map((row) => Number(row.equity));
  const returns = returnCol ? rows.map((row) => normalReturn(Number(row[returnCol]))).filter(Number.isFinite) : equity.slice(1).map((value, index) => value / equity[index] - 1);
  const cleanReturns = returns.length ? returns : equity.slice(1).map((value, index) => value / equity[index] - 1);
  const dd = drawdowns(equity);
  const positive = cleanReturns.filter((value) => value > 0).sort((a, b) => b - a);
  const positiveSum = positive.reduce((sum, value) => sum + value, 0);
  const midpoint = Math.floor(cleanReturns.length / 2);
  const costBps = Number($("#feeBps").value || 0) + Number($("#slippageBps").value || 0);
  return {
    schema,
    columns: { equityCol, pnlCol, returnCol, dateCol, tradeCol },
    equity,
    returns: cleanReturns,
    drawdowns: dd,
    totalReturn: equity.at(-1) / equity[0] - 1,
    maxDrawdown: Math.min(...dd, 0),
    sharpe: sharpe(cleanReturns),
    samples: cleanReturns.length,
    concentration: positiveSum ? positive.slice(0, 5).reduce((sum, value) => sum + value, 0) / positiveSum : 0,
    firstHalfReturn: compound(cleanReturns.slice(0, midpoint)),
    secondHalfReturn: compound(cleanReturns.slice(midpoint)),
    costStress: [0, 1, 2, 3].map((multiplier) => ({ label: `${multiplier}x`, value: compound(cleanReturns.map((value) => value - (costBps * multiplier) / 10000)) })),
  };
}

function getRulebook() {
  try { return { ...defaultRulebook, ...JSON.parse(localStorage.getItem("backtest-auditor-rulebook") || "{}") }; }
  catch { return { ...defaultRulebook }; }
}
function loadRulebook() {
  state.rulebook = getRulebook();
  Object.entries(state.rulebook).forEach(([key, value]) => { if ($(`#${key}`)) $(`#${key}`).value = value; });
}
function saveRulebook() {
  state.rulebook = {
    minSamples: Number($("#minSamples").value || defaultRulebook.minSamples),
    maxDrawdownRule: Number($("#maxDrawdownRule").value || defaultRulebook.maxDrawdownRule),
    minSharpeRule: Number($("#minSharpeRule").value || defaultRulebook.minSharpeRule),
    maxConcentrationRule: Number($("#maxConcentrationRule").value || defaultRulebook.maxConcentrationRule),
  };
  localStorage.setItem("backtest-auditor-rulebook", JSON.stringify(state.rulebook));
  if (state.latestReport) runAudit();
}

function makeAudit(metrics, form) {
  const rules = state.rulebook || defaultRulebook;
  let score = 86;
  const cards = [];
  const add = (level, title, body, actions, penalty) => { score -= penalty; cards.push({ level, title, body, actions }); };
  if (metrics.samples < 30) add("danger", "Sample is too small", `Only ${metrics.samples} return samples were found.`, ["Add more history", "Run out-of-sample testing"], 18);
  const costs = Number(form.feeBps) + Number(form.slippageBps);
  if (costs < 5 && ["Crypto", "Futures", "A-share"].includes(form.assetClass)) add("warn", "Execution cost assumption is light", `Fee plus slippage is only ${costs.toFixed(1)} bps.`, ["Run 2x/3x cost stress tests", "Document slippage assumptions"], 10);
  if (metrics.sharpe > 3) add("warn", "Sharpe looks unusually high", `Sharpe is ${metrics.sharpe.toFixed(2)} and should be checked for overfit.`, ["Run walk-forward with frozen parameters", "Check for lookahead bias"], 10);
  if (metrics.concentration > 0.45) add("danger", "Return concentration is high", `Top 5 positive samples contributed ${(metrics.concentration * 100).toFixed(1)}% of positive returns.`, ["Recalculate without top gains", "Break down by regime"], 15);
  if (metrics.secondHalfReturn < metrics.firstHalfReturn * 0.35) add("danger", "Second-half performance decays", `Second-half return is ${formatPercent(metrics.secondHalfReturn)}, below first-half ${formatPercent(metrics.firstHalfReturn)}.`, ["Mark in-sample and OOS periods", "Run walk-forward"], 18);
  if (Math.abs(metrics.maxDrawdown) > Math.max(0.22, metrics.totalReturn * 0.75)) add("warn", "Drawdown is large relative to return", `Max drawdown is ${formatPercent(metrics.maxDrawdown)}.`, ["Add position constraints", "Re-audit with lower leverage"], 8);
  if (!metrics.columns.dateCol) add("warn", "Date column is missing", "Regime and decay analysis are limited without dates.", ["Add a date/time column", "Export segmented returns"], 6);
  const customHits = [
    { key: "samples", label: "Samples", value: metrics.samples, limit: `>= ${rules.minSamples}`, failed: metrics.samples < rules.minSamples },
    { key: "drawdown", label: "Max drawdown", value: formatPercent(metrics.maxDrawdown), limit: `<= ${rules.maxDrawdownRule}%`, failed: Math.abs(metrics.maxDrawdown) * 100 > rules.maxDrawdownRule },
    { key: "sharpe", label: "Sharpe", value: metrics.sharpe.toFixed(2), limit: `>= ${rules.minSharpeRule}`, failed: metrics.sharpe < rules.minSharpeRule },
    { key: "concentration", label: "Top-5 concentration", value: `${(metrics.concentration * 100).toFixed(1)}%`, limit: `<= ${rules.maxConcentrationRule}%`, failed: metrics.concentration * 100 > rules.maxConcentrationRule },
  ];
  customHits.forEach((hit) => { if (hit.failed) score -= 6; });
  if (!cards.length) cards.push({ level: "ok", title: "No obvious red flags", body: "This does not mean live-ready. It only means no major v1 red flag was triggered.", actions: ["Continue OOS testing", "Add cost stress tests"] });
  return { score: Math.max(8, Math.min(96, Math.round(score))), cards, customHits };
}

function svgLine(values, options = {}) {
  const width = 560, height = 180, pad = 18;
  const min = Math.min(...values), max = Math.max(...values), span = max - min || 1;
  const points = values.map((value, index) => [pad + (index / Math.max(values.length - 1, 1)) * (width - pad * 2), height - pad - ((value - min) / span) * (height - pad * 2)]);
  const path = points.map(([x, y], index) => `${index ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return `<svg viewBox="0 0 ${width} ${height}"><path d="${path} L ${width - pad} ${height - pad} L ${pad} ${height - pad} Z" fill="${options.fill || "rgba(35,105,74,.12)"}"></path><path d="${path}" fill="none" stroke="${options.stroke || "#23694a"}" stroke-width="3"></path></svg>`;
}
function svgBars(values) {
  const width = 560, height = 180, pad = 18, zero = height / 2;
  const maxAbs = Math.max(...values.map((item) => Math.abs(item.value)), .01);
  return `<svg viewBox="0 0 ${width} ${height}"><line x1="${pad}" y1="${zero}" x2="${width - pad}" y2="${zero}" stroke="rgba(22,23,19,.2)"></line>${values.map((item, index) => {
    const step = (width - pad * 2) / values.length, x = pad + index * step + 5, barWidth = step - 10;
    const barHeight = Math.abs(item.value) / maxAbs * (height / 2 - pad), y = item.value >= 0 ? zero - barHeight : zero;
    return `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="4" fill="${item.value >= 0 ? "#23694a" : "#e15d45"}"></rect><text x="${x + barWidth / 2}" y="${height - 4}" text-anchor="middle">${escapeHtml(item.label)}</text>`;
  }).join("")}</svg>`;
}
function svgSparkline(values) {
  const width = 420, height = 72, pad = 8, min = Math.min(...values), max = Math.max(...values), span = max - min || 1;
  const points = values.map((value, index) => [pad + (index / Math.max(values.length - 1, 1)) * (width - pad * 2), height - pad - ((value - min) / span) * (height - pad * 2)]);
  const path = points.map(([x, y], index) => `${index ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return `<svg viewBox="0 0 ${width} ${height}"><path d="${path}" fill="none" stroke="#23694a" stroke-width="3"></path>${points.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3"></circle>`).join("")}</svg>`;
}
function histogram(returns) {
  const buckets = Array.from({ length: 9 }, (_, index) => ({ label: String(index + 1), value: 0 }));
  const min = Math.min(...returns), max = Math.max(...returns), span = max - min || 1;
  returns.forEach((value) => { buckets[Math.min(8, Math.max(0, Math.floor(((value - min) / span) * 9)))].value += 1; });
  return buckets;
}

function buildProfessionalPack(report) {
  const metrics = report.metrics;
  const sortedPositive = metrics.returns.filter((value) => value > 0).sort((a, b) => b - a);
  let removed = 0;
  const withoutTopFive = metrics.returns.filter((value) => value > 0 && sortedPositive.slice(0, 5).includes(value) && removed++ < 5 ? false : true);
  const chunks = 4, chunkSize = Math.max(1, Math.floor(metrics.returns.length / chunks));
  const chunkReturns = Array.from({ length: chunks }, (_, index) => compound(metrics.returns.slice(index * chunkSize, (index + 1) * chunkSize)));
  const profitableChunks = chunkReturns.filter((value) => value > 0).length;
  const cost3x = metrics.costStress.at(-1)?.value ?? 0;
  const topRemovedReturn = compound(withoutTopFive);
  return [
    { passed: metrics.secondHalfReturn > 0 && metrics.secondHalfReturn >= metrics.firstHalfReturn * .35, title: "OOS decay", value: `${formatPercent(metrics.firstHalfReturn)} -> ${formatPercent(metrics.secondHalfReturn)}`, body: "Compares first-half and second-half returns to catch overfit decay." },
    { passed: cost3x > 0, title: "3x cost stress", value: formatPercent(cost3x), body: "Positive returns after higher costs suggest execution margin." },
    { passed: topRemovedReturn > 0, title: "Top-5 winners removed", value: formatPercent(topRemovedReturn), body: "If returns vanish after removing top winners, the curve may be luck-driven." },
    { passed: profitableChunks >= 3, title: "Regime stability", value: `${profitableChunks}/${chunks}`, body: "Splits the backtest into four chunks to test regime consistency." },
  ];
}

function collectCopilotContext(report) {
  const reports = getSavedReports();
  const key = keyName(report.form.strategyName);
  const versions = groupByStrategy(reports)[key]?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || [];
  const killReasons = getKillReasons();
  const taskRecords = getTaskRecords();
  const bottlenecks = buildBottlenecks(reports);
  const learningEntries = getLearningEntries().slice(0, 8).map((entry) => ({
    type: entry.type,
    title: entry.title,
    body: entry.body,
    createdAt: entry.createdAt,
  }));
  return {
    clientProfile: getClientProfile(),
    strategy: report.form,
    score: report.audit.score,
    metrics: {
      totalReturn: formatPercent(report.metrics.totalReturn),
      maxDrawdown: formatPercent(report.metrics.maxDrawdown),
      sharpe: report.metrics.sharpe.toFixed(2),
      samples: report.metrics.samples,
      concentration: `${(report.metrics.concentration * 100).toFixed(1)}%`,
      firstHalf: formatPercent(report.metrics.firstHalfReturn),
      secondHalf: formatPercent(report.metrics.secondHalfReturn),
    },
    risks: report.audit.cards.map((card) => ({ level: card.level, title: card.title, body: card.body })),
    professionalPack: buildProfessionalPack(report).map((item) => ({ title: item.title, passed: item.passed, value: item.value })),
    nextTests: buildNextTestQueue(report).map((task) => task.title),
    bottlenecks,
    learningLog: learningEntries,
    taskRecord: taskRecords[key] || { status: "Todo", note: "" },
    researchLoop: calculateResearchLoopStats(reports),
    versionHistory: versions.slice(0, 5).map((item) => ({
      score: item.audit.score,
      changeNote: item.changeNote || "No change note recorded",
      mainRisk: mainRisk(item)?.title || "None",
      createdAt: item.createdAt,
    })),
    killReasons: Object.values(killReasons).slice(0, 8),
  };
}

function buildRuleBasedMemo(report) {
  const context = collectCopilotContext(report);
  const failedPack = context.professionalPack.filter((item) => !item.passed);
  const topRisk = context.risks.find((risk) => risk.level !== "ok") || context.risks[0];
  const profile = context.clientProfile || {};
  const topBottleneck = context.bottlenecks[0];
  const latestLearning = context.learningLog[0];
  const task = context.taskRecord || {};
  const loop = context.researchLoop || {};
  return [
    `Research memo for ${context.strategy.strategyName}`,
    "",
    "Verdict:",
    `${report.audit.score < 45 ? "KILL or major redesign" : report.audit.score < 72 ? "RETEST before continuing" : "CONTINUE, but prove robustness"}.`,
    `Main risk: ${topRisk?.title || "No major risk detected"}.`,
    `Metrics: return ${context.metrics.totalReturn}, drawdown ${context.metrics.maxDrawdown}, Sharpe ${context.metrics.sharpe}, top-5 concentration ${context.metrics.concentration}.`,
    "",
    "Client / research context:",
    `Profile: ${profile.name || "No profile saved"} | Tool: ${profile.tool || context.strategy.sourcePlatform || "Unknown"} | Cadence: ${profile.cadence || "Not set"}.`,
    `Goal: ${profile.goal || "No goal recorded"}. Risk boundary: ${profile.risk || "No boundary recorded"}.`,
    "",
    "Why this matters:",
    failedPack.length
      ? `The professional pack failed: ${failedPack.map((item) => `${item.title} (${item.value})`).join(", ")}. These are stronger signals than a plain equity curve.`
      : "The professional pack did not show a major failure, but that is not enough for live confidence.",
    "",
    "What the workspace already learned:",
    latestLearning ? `${latestLearning.title}: ${latestLearning.body}` : "No learning log yet. Save the next decision and retest note to build memory.",
    topBottleneck ? `Repeated bottleneck: ${topBottleneck.label} (${topBottleneck.count}). ${topBottleneck.recommendation}` : "No repeated bottleneck detected yet.",
    "",
    "Next test plan:",
    ...context.nextTests.map((item, index) => `${index + 1}. ${item}`),
    "",
    "What to save in the learning log:",
    `Task status now: ${task.status || "Todo"}. Note: ${task.note || "Write the exact evidence found or missing after the retest."}`,
    `Loop progress: ${loop.completedLoops || 0}/${loop.strategyCount || 0} strategies have completed Research Loops.`,
    "",
    "Product edge:",
    "This memo is generated from audit data, client profile, learning log, bottleneck analysis, version history, and kill reasons.",
  ].join("\n");
}

async function generateCopilotMemo() {
  if (!state.latestReport) runAudit();
  const report = state.latestReport;
  const output = $("#copilotOutput");
  const apiKey = $("#apiKeyInput")?.value.trim();
  output.innerHTML = `<p>Generating research memo...</p>`;
  if (!apiKey) {
    output.innerHTML = `<pre>${escapeHtml(buildRuleBasedMemo(report))}</pre>`;
    return;
  }
  const context = collectCopilotContext(report);
  const prompt = `You are Backtest Auditor's AI Research Judge. Use only the provided workspace context: latest audit, client profile, learning log, bottleneck analysis, version history, task record, and kill reasons. Do not give investment advice, trading recommendations, buy/sell signals, or future profitability claims. Produce a concise memo with exactly these sections: Verdict (CONTINUE/RETEST/KILL), Why This May Be Fake, What The Workspace Already Learned, Current Bottleneck, Next Test Plan, What To Save In The Learning Log. Be direct, skeptical, and focused on helping the user complete the next Research Loop faster.\n\nContext:\n${JSON.stringify(context, null, 2)}`;
  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash",
        messages: [
          { role: "system", content: "You are a cautious quant research assistant. You audit research process risk and help users complete research loops. You do not provide investment advice." },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
      }),
    });
    if (!response.ok) throw new Error(`API request failed: ${response.status}`);
    const data = await response.json();
    const memo = data.choices?.[0]?.message?.content || buildRuleBasedMemo(report);
    output.innerHTML = `<pre>${escapeHtml(memo)}</pre>`;
  } catch (error) {
    output.innerHTML = `<pre>${escapeHtml(`${buildRuleBasedMemo(report)}\n\nAPI fallback: ${error.message}`)}</pre>`;
  }
}

function getSavedReports() { try { return JSON.parse(localStorage.getItem("backtest-auditor-reports") || "[]"); } catch { return []; } }
function getStatuses() { try { return JSON.parse(localStorage.getItem("backtest-auditor-strategy-status") || "{}"); } catch { return {}; } }
function saveStatuses(statuses) { localStorage.setItem("backtest-auditor-strategy-status", JSON.stringify(statuses)); }
function getKillReasons() { try { return JSON.parse(localStorage.getItem("backtest-auditor-kill-reasons") || "{}"); } catch { return {}; } }
function saveKillReasons(reasons) { localStorage.setItem("backtest-auditor-kill-reasons", JSON.stringify(reasons)); }
function getRetestDates() { try { return JSON.parse(localStorage.getItem("backtest-auditor-retest-dates") || "{}"); } catch { return {}; } }
function saveRetestDates(dates) { localStorage.setItem("backtest-auditor-retest-dates", JSON.stringify(dates)); }
function getTaskRecords() { try { return JSON.parse(localStorage.getItem("backtest-auditor-task-records") || "{}"); } catch { return {}; } }
function saveTaskRecords(records) { localStorage.setItem("backtest-auditor-task-records", JSON.stringify(records)); }
function getClientProfile() { try { return JSON.parse(localStorage.getItem("backtest-auditor-client-profile") || "{}"); } catch { return {}; } }
function saveClientProfile(profile) { localStorage.setItem("backtest-auditor-client-profile", JSON.stringify(profile)); }
function getLearningEntries() { try { return JSON.parse(localStorage.getItem("backtest-auditor-learning-log") || "[]"); } catch { return []; } }
function saveLearningEntries(entries) { localStorage.setItem("backtest-auditor-learning-log", JSON.stringify(entries.slice(0, 80))); }
function keyName(name) { return String(name || "Untitled").trim().toLowerCase(); }
function groupByStrategy(reports) { return reports.reduce((groups, report) => { const key = keyName(report.form.strategyName); groups[key] = groups[key] || []; groups[key].push(report); return groups; }, {}); }
function mainRisk(report) { return report.audit.cards.find((card) => card.level !== "ok") || report.audit.cards[0]; }

function addLearningEntry(type, title, body, detail = {}) {
  const entries = getLearningEntries();
  entries.unshift({ type, title, body, detail, createdAt: new Date().toISOString() });
  saveLearningEntries(entries);
}

function datePlusDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function suggestedRetestDate(status) {
  if (status === "Kill") return "";
  return datePlusDays(status === "Continue" ? 7 : 3);
}

function retestState(dateText) {
  if (!dateText) return { label: "Not scheduled", className: "unscheduled", days: null };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(`${dateText}T00:00:00`);
  const days = Math.round((date - today) / 86400000);
  if (days < 0) return { label: `Overdue ${Math.abs(days)}d`, className: "overdue", days };
  if (days === 0) return { label: "Due today", className: "due", days };
  if (days <= 7) return { label: `Due in ${days}d`, className: "soon", days };
  return { label: dateText, className: "scheduled", days };
}

function renderSchemaMapper(metrics) {
  const labels = { dateCol: "date", equityCol: "equity", pnlCol: "pnl", returnCol: "return", tradeCol: "trades" };
  $("#schemaMapper").innerHTML = Object.entries(labels).map(([field, label]) => {
    const item = metrics.schema[field];
    const confidence = item.confidence >= 90 ? "high" : item.confidence >= 60 ? "medium" : "low";
    return `<article class="schema-pill ${confidence}"><span>${label}</span><strong>${escapeHtml(item.key || "Not detected")}</strong><em>${item.confidence}%</em></article>`;
  }).join("");
  updateWizardStatus("audit");
}
function renderVisuals(metrics) {
  $("#equityChart").innerHTML = svgLine(metrics.equity);
  $("#drawdownChart").innerHTML = svgLine(metrics.drawdowns, { stroke: "#e15d45", fill: "rgba(225,93,69,.12)" });
  $("#distributionChart").innerHTML = svgBars(histogram(metrics.returns));
  $("#periodChart").innerHTML = svgBars([{ label: "1st", value: metrics.firstHalfReturn }, { label: "2nd", value: metrics.secondHalfReturn }]);
  $("#stressChart").innerHTML = svgBars(metrics.costStress);
  $("#equityInsight").textContent = formatPercent(metrics.totalReturn);
  $("#drawdownInsight").textContent = formatPercent(metrics.maxDrawdown);
  $("#distributionInsight").textContent = `${(metrics.concentration * 100).toFixed(0)}% top-5`;
  $("#periodInsight").textContent = `${formatPercent(metrics.firstHalfReturn)} / ${formatPercent(metrics.secondHalfReturn)}`;
  $("#stressInsight").textContent = formatPercent(metrics.costStress.at(-1).value);
}
function renderProfessionalPack(report) {
  $("#professionalPack").innerHTML = buildProfessionalPack(report).map((item) => `<article class="pack-card ${item.passed ? "pass" : "fail"}"><span>${item.passed ? "PASS" : "RETEST"}</span><strong>${escapeHtml(item.title)}</strong><em>${escapeHtml(item.value)}</em><p>${escapeHtml(item.body)}</p></article>`).join("");
}

function renderPlatformGuide() {
  const platform = $("#sourcePlatform")?.value || "TradingView";
  $("#platformGuide").textContent = platformGuides[platform] || platformGuides["Other CSV"];
}

function updateWizardStatus(stage = "source") {
  const steps = $$("#wizardSteps article");
  if (!steps.length) return;
  const hasRows = state.rows.length > 0;
  const schema = hasRows ? detectSchema(state.rows) : null;
  const mapped = schema ? Object.values(schema).filter((item) => item.key).length : 0;
  const activeIndex = stage === "audit" || mapped >= 3 ? 2 : hasRows || $("#pasteCsv")?.value.trim() ? 1 : 0;
  steps.forEach((step, index) => step.classList.toggle("active", index <= activeIndex));
  const status = $("#wizardStatus");
  if (!status) return;
  if (activeIndex === 0) status.textContent = "Step 1: choose where the backtest came from.";
  else if (activeIndex === 1) status.textContent = "Step 2: data detected. Confirm the mapping below before running the audit.";
  else status.textContent = `Step 3: ${mapped}/5 fields mapped. Run the audit or adjust your CSV headers.`;
}

function applyExample(type, options = {}) {
  const example = exampleReports[type] || exampleReports.kill;
  $("#strategyName").value = example.name;
  $("#strategyDesc").value = example.desc;
  $("#sourcePlatform").value = example.source;
  $("#assetClass").value = example.asset;
  $("#frequency").value = example.frequency;
  $("#feeBps").value = example.fee;
  $("#slippageBps").value = example.slippage;
  $("#pasteCsv").value = example.csv;
  state.rows = parseCsv(example.csv);
  renderPlatformGuide();
  updateWizardStatus("audit");
  runAudit();
  trackEvent("load_example", { type, score: state.latestReport?.audit.score });
  syncLeadCaptureContext();
  showExampleConversion(type);
  if (options.scroll !== false) $("#auditor")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderRuleHits(hits) {
  $("#ruleHitList").innerHTML = hits.map((hit) => `<div class="rule-hit ${hit.failed ? "warn" : ""}"><strong>${escapeHtml(hit.label)}</strong><span>${escapeHtml(hit.value)} / ${escapeHtml(hit.limit)}</span></div>`).join("");
}
function renderVersionDelta(report) {
  const previous = getSavedReports().find((item) => keyName(item.form.strategyName) === keyName(report.form.strategyName));
  if (!previous) { $("#versionDelta").innerHTML = "<p>No previous saved version with the same strategy name.</p>"; return; }
  const rows = [["Trust score", report.audit.score - previous.audit.score], ["Return", report.metrics.totalReturn - previous.metrics.totalReturn], ["Sharpe", report.metrics.sharpe - previous.metrics.sharpe]];
  $("#versionDelta").innerHTML = rows.map(([label, delta]) => `<div class="delta-row"><strong>${label}</strong><span class="delta-pill ${delta >= 0 ? "" : "down"}">${delta >= 0 ? "+" : ""}${label === "Return" ? formatPercent(delta) : delta.toFixed(2)}</span></div>`).join("");
}
function buildVerdict(report) {
  const danger = report.audit.cards.filter((card) => card.level === "danger").length;
  const warn = report.audit.cards.filter((card) => card.level === "warn").length;
  const issues = danger + warn;
  if (report.audit.score < 45 || danger >= 2) return { decision: "KILL", title: "KILL: do not trust this backtest yet", copy: "This strategy failed enough credibility checks that continuing to tune it is likely wasted research time. Redesign the hypothesis or prove it with fresh OOS data first.", next: "Stop tuning", issues };
  if (report.audit.score < 72 || issues >= 2) return { decision: "RETEST", title: "RETEST: assumptions need repair before continuing", copy: "There may be signal here, but the current result is not strong enough to justify more optimization. Fix the failed assumptions first.", next: "Run required tests", issues };
  return { decision: "CONTINUE", title: "CONTINUE: no major red flags, now prove robustness", copy: "The strategy passed the first credibility layer. Continue only with walk-forward, parameter perturbation, and tougher cost stress tests.", next: "Prove robustness", issues };
}
function renderReport(report) {
  syncLeadCaptureContext();
  $("#reportTitle").textContent = report.form.strategyName;
  $("#scoreRing").style.setProperty("--score", `${report.audit.score * 3.6}deg`);
  $("#scoreValue").textContent = report.audit.score;
  [formatPercent(report.metrics.totalReturn), formatPercent(report.metrics.maxDrawdown), report.metrics.sharpe.toFixed(2), String(report.metrics.samples)].forEach((value, index) => { $$("#metricGrid strong")[index].textContent = value; });
  const verdict = buildVerdict(report);
  $("#verdictTitle").textContent = verdict.title;
  $("#verdictCopy").textContent = verdict.copy;
  document.querySelector(".verdict-panel").dataset.decision = verdict.decision;
  $("#issueCount").textContent = verdict.issues;
  $("#nextStep").textContent = verdict.next;
  renderSchemaMapper(report.metrics);
  renderVisuals(report.metrics);
  renderRuleHits(report.audit.customHits);
  renderVersionDelta(report);
  renderProfessionalPack(report);
  $("#auditCards").innerHTML = report.audit.cards.map((card) => `<article class="audit-card"><header><h3>${escapeHtml(card.title)}</h3><span class="level ${card.level === "danger" ? "danger" : card.level === "warn" ? "warn" : ""}">${card.level.toUpperCase()}</span></header><p>${escapeHtml(card.body)}</p><ul>${card.actions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>`).join("");
}
function runAudit() {
  const rows = state.rows.length ? state.rows : parseCsv(sampleCsv);
  state.rows = rows;
  const form = { strategyName: $("#strategyName").value.trim() || "Untitled Strategy", strategyDesc: $("#strategyDesc").value.trim(), sourcePlatform: $("#sourcePlatform")?.value || "Other CSV", assetClass: $("#assetClass").value, frequency: $("#frequency").value, feeBps: $("#feeBps").value || 0, slippageBps: $("#slippageBps").value || 0 };
  const metrics = calculateMetrics(rows);
  const audit = makeAudit(metrics, form);
  state.latestReport = { form, metrics, audit, createdAt: new Date().toISOString() };
  renderReport(state.latestReport);
}

function buildNextTestQueue(report) {
  const tasks = [];
  const add = (key, title, body) => { if (!tasks.some((task) => task.key === key)) tasks.push({ key, title, body }); };
  const metrics = report.metrics, costs = Number(report.form.feeBps) + Number(report.form.slippageBps);
  if (metrics.samples < Math.max(30, (state.rulebook || defaultRulebook).minSamples)) add("samples", "Extend history or run OOS", "Do not keep tuning on a thin sample.");
  if (costs < 5) add("costs", "Run 2x / 3x cost stress", "Increase fee and slippage assumptions, then re-audit.");
  if (metrics.sharpe > 3) add("sharpe", "Freeze parameters and check lookahead", "High Sharpe needs walk-forward validation.");
  if (metrics.concentration > 0.45) add("concentration", "Remove top 5 winners and rerun", "Check whether the curve depends on a few outliers.");
  if (metrics.secondHalfReturn < metrics.firstHalfReturn * .35) add("decay", "Run time-split and walk-forward tests", "Separate in-sample and out-of-sample periods.");
  if (!metrics.columns.dateCol) add("date", "Add date/time column and re-audit", "Regime and decay analysis need timestamps.");
  if (!tasks.length) add("robustness", "Run perturbation and cost stress", "No red flag does not mean live-ready.");
  return tasks.slice(0, 4);
}
function renderWeeklyReview(reports) {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const weekly = reports.filter((report) => new Date(report.savedAt || report.createdAt).getTime() >= weekAgo);
  if (!weekly.length) { $("#weeklySummary").textContent = "Save a few audits to generate a weekly research review."; $("#weeklyAudits").textContent = "0"; $("#weeklyScore").textContent = "--"; $("#weeklyImproved").textContent = "--"; $("#weeklyActions").innerHTML = ""; return; }
  const avg = Math.round(weekly.reduce((sum, report) => sum + report.audit.score, 0) / weekly.length);
  const groups = groupByStrategy(reports);
  const improved = Object.values(groups).filter((items) => { const sorted = items.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); return sorted.length >= 2 && sorted[0].audit.score > sorted[1].audit.score; }).length;
  const worst = weekly.slice().sort((a, b) => a.audit.score - b.audit.score)[0];
  const best = weekly.slice().sort((a, b) => b.audit.score - a.audit.score)[0];
  $("#weeklySummary").textContent = `You saved ${weekly.length} audits this week with an average score of ${avg}. Continue with ${best.form.strategyName}; retest ${worst.form.strategyName} first.`;
  $("#weeklyAudits").textContent = weekly.length;
  $("#weeklyScore").textContent = avg;
  $("#weeklyImproved").textContent = improved;
  $("#weeklyActions").innerHTML = [["Retest first", worst.form.strategyName], ["Continue", best.form.strategyName], ["Research rhythm", "Save at least two versions per week."]].map(([title, body]) => `<article class="weekly-action"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(body)}</p></article>`).join("");
}

function calculateResearchLoopStats(reports) {
  const groups = groupByStrategy(reports);
  const statuses = getStatuses();
  const dates = getRetestDates();
  const records = getTaskRecords();
  const loops = Object.entries(groups).map(([key, versions]) => {
    const latest = versions.slice().sort((a, b) => new Date(b.savedAt || b.createdAt) - new Date(a.savedAt || a.createdAt))[0];
    const record = records[key] || {};
    const hasAudit = Boolean(latest);
    const hasDecision = Boolean(statuses[key]);
    const hasRetest = statuses[key] === "Kill" || Boolean(dates[key]);
    const hasTaskLearning = Boolean(record.status && record.status !== "Todo") || Boolean(record.note);
    const completed = hasAudit && hasDecision && hasRetest && hasTaskLearning;
    const missing = [
      !hasAudit && "saved audit",
      !hasDecision && "Continue / Retest / Kill decision",
      !hasRetest && "scheduled retest or Kill exclusion",
      !hasTaskLearning && "task update or retest note",
    ].filter(Boolean);
    return { key, strategyName: latest?.form.strategyName || key, score: latest?.audit.score || 0, completed, missing };
  });
  const completedLoops = loops.filter((loop) => loop.completed).length;
  return {
    strategyCount: loops.length,
    completedLoops,
    completionRate: loops.length ? Math.round((completedLoops / loops.length) * 100) : 0,
    loops,
  };
}

function renderResearchLoopMetrics(reports) {
  const container = $("#researchLoopMetrics");
  const progress = $("#researchLoopProgress");
  if (!container || !progress) return;
  const stats = calculateResearchLoopStats(reports);
  container.innerHTML = [
    ["Strategies", stats.strategyCount],
    ["Completed loops", stats.completedLoops],
    ["Completion", `${stats.completionRate}%`],
  ].map(([label, value]) => `<article><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></article>`).join("");
  progress.innerHTML = stats.loops.length
    ? stats.loops.slice(0, 5).map((loop) => `<article class="loop-item ${loop.completed ? "complete" : ""}"><strong>${escapeHtml(loop.strategyName)}</strong><span>${loop.completed ? "Loop complete" : `Missing: ${loop.missing.join(", ")}`}</span></article>`).join("")
    : "<p>No Research Loops yet. Save an audit, make a decision, schedule a retest, then update the task result.</p>";
}

function renderWeeklyQueue(reports) {
  if (!reports.length) { $("#weeklyQueue").innerHTML = "<p>Save strategy versions to see the top 3 retests for this week.</p>"; return; }
  const statuses = getStatuses();
  const retestDates = getRetestDates();
  const items = Object.entries(groupByStrategy(reports)).map(([key, versions]) => {
    const report = versions.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    const status = statuses[key] || (report.audit.score >= 72 ? "Continue" : report.audit.score < 45 ? "Kill" : "Retest");
    if (status === "Kill") return null;
    const calendar = retestState(retestDates[key]);
    const calendarBoost = calendar.days === null ? 0 : calendar.days < 0 ? 90 : calendar.days <= 7 ? 60 - calendar.days * 4 : 0;
    const rank = (100 - report.audit.score) + report.audit.cards.filter((card) => card.level !== "ok").length * 8 + (status === "Retest" ? 30 : 0) + calendarBoost;
    return { key, report, status, calendar, retestDate: retestDates[key], rank };
  }).filter(Boolean).sort((a, b) => b.rank - a.rank).slice(0, 3);
  $("#weeklyQueue").innerHTML = items.length
    ? items.map((item, index) => `<article class="queue-item ${item.calendar.className}"><span>#${index + 1}</span><strong>${escapeHtml(item.report.form.strategyName)}</strong><em>${item.status} · ${item.report.audit.score}/100 · ${item.calendar.label}</em><p>${escapeHtml(buildNextTestQueue(item.report)[0]?.title || "Retest assumptions")}</p></article>`).join("")
    : "<p>No active retests. Kill decisions are excluded from the calendar.</p>";
}
function renderKillReasonLibrary() {
  const reasons = Object.entries(getKillReasons()).sort((a, b) => new Date(b[1].createdAt) - new Date(a[1].createdAt));
  $("#killReasonList").innerHTML = reasons.length ? reasons.slice(0, 8).map(([, item]) => `<article class="kill-reason"><strong>${escapeHtml(item.strategyName)}</strong><p>${escapeHtml(item.reason)}</p><span>${new Date(item.createdAt).toLocaleDateString()}</span></article>`).join("") : "<p>When you mark a strategy as Kill, the reason becomes your private weak-strategy dataset.</p>";
}

function renderFourWeekReview(reports) {
  const container = $("#fourWeekReview");
  if (!container) return;
  const fourWeeksAgo = Date.now() - 28 * 24 * 60 * 60 * 1000;
  const recent = reports.filter((report) => new Date(report.createdAt).getTime() >= fourWeeksAgo);
  const records = Object.values(getTaskRecords()).filter((record) => record.updatedAt && new Date(record.updatedAt).getTime() >= fourWeeksAgo);
  if (!recent.length && !records.length) {
    container.innerHTML = "<p>Save strategy versions and complete retest tasks to generate a 4-week review.</p>";
    return;
  }
  const avg = recent.length ? Math.round(recent.reduce((sum, report) => sum + report.audit.score, 0) / recent.length) : "--";
  const done = records.filter((record) => record.status === "Done").length;
  const blocked = records.filter((record) => record.status === "Blocked").length;
  const skipped = records.filter((record) => record.status === "Skipped").length;
  const groups = groupByStrategy(reports);
  const improving = Object.values(groups).filter((items) => {
    const sorted = items.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    return sorted.length >= 2 && sorted.at(-1).audit.score > sorted[0].audit.score;
  }).length;
  container.innerHTML = [
    ["Audits", recent.length],
    ["Avg score", avg],
    ["Improving", improving],
    ["Done tasks", done],
    ["Blocked", blocked],
    ["Skipped", skipped],
  ].map(([label, value]) => `<article class="review-stat"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></article>`).join("");
}

function renderKillStats() {
  const container = $("#killStats");
  if (!container) return;
  const reasons = Object.values(getKillReasons());
  if (!reasons.length) {
    container.innerHTML = "<p>No Kill reasons yet. Mark weak strategies as Kill to build your failure-pattern dataset.</p>";
    return;
  }
  const buckets = {
    "Return concentration": ["concentration", "winner", "top", "outlier"],
    "Cost/slippage": ["cost", "fee", "slippage"],
    "Decay/OOS": ["decay", "second", "oos", "walk"],
    "Sample size": ["sample", "few", "small"],
    "Drawdown": ["drawdown", "risk"],
    "Other": [],
  };
  const counts = Object.fromEntries(Object.keys(buckets).map((key) => [key, 0]));
  reasons.forEach((item) => {
    const text = `${item.reason || ""}`.toLowerCase();
    const match = Object.entries(buckets).find(([, words]) => words.some((word) => text.includes(word)));
    counts[match?.[0] || "Other"] += 1;
  });
  container.innerHTML = Object.entries(counts).filter(([, count]) => count > 0).map(([label, count]) => `<article class="kill-stat"><span>${escapeHtml(label)}</span><strong>${count}</strong></article>`).join("");
}

function loadClientProfile() {
  const profile = getClientProfile();
  if (!$("#clientName")) return;
  $("#clientName").value = profile.name || "";
  $("#clientTool").value = profile.tool || "TradingView";
  $("#clientGoal").value = profile.goal || "";
  $("#clientRisk").value = profile.risk || "";
  $("#clientCadence").value = profile.cadence || "Weekly";
  $("#clientDecisionStyle").value = profile.decisionStyle || "Skeptical and fast to kill";
}

function persistClientProfile() {
  const profile = {
    name: $("#clientName")?.value.trim() || "Default research profile",
    tool: $("#clientTool")?.value || "TradingView",
    goal: $("#clientGoal")?.value.trim() || "Kill weak strategies faster",
    risk: $("#clientRisk")?.value.trim() || "No risk boundary recorded",
    cadence: $("#clientCadence")?.value || "Weekly",
    decisionStyle: $("#clientDecisionStyle")?.value || "Skeptical and fast to kill",
    updatedAt: new Date().toISOString(),
  };
  saveClientProfile(profile);
  addLearningEntry("Profile", "Research profile updated", `${profile.name}: ${profile.goal}. Risk boundary: ${profile.risk}.`, { profile });
  $("#clientProfileMessage").textContent = `Saved ${profile.name}. Future audits now carry this reusable context.`;
  renderContextLab();
  trackEvent("save_client_profile", { tool: profile.tool, cadence: profile.cadence });
}

function buildLearningEntriesFromReports(reports) {
  return reports.slice(0, 8).map((report) => {
    const verdict = buildVerdict(report);
    const risk = mainRisk(report);
    return {
      type: verdict.decision,
      title: report.form.strategyName,
      body: `${verdict.decision} at ${report.audit.score}/100. Main lesson: ${risk?.title || "no major risk"}.`,
      createdAt: report.savedAt || report.createdAt,
    };
  });
}

function renderLearningLog(reports) {
  const container = $("#learningLog");
  if (!container) return;
  const manualEntries = getLearningEntries();
  const entries = [...manualEntries, ...buildLearningEntriesFromReports(reports)]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);
  $("#learningCount").textContent = `${entries.length} entries`;
  container.innerHTML = entries.length
    ? entries.map((entry) => `<article class="learning-entry"><span>${escapeHtml(entry.type || "Learning")}</span><strong>${escapeHtml(entry.title)}</strong><p>${escapeHtml(entry.body)}</p><em>${new Date(entry.createdAt).toLocaleString()}</em></article>`).join("")
    : "<p>Save a profile, audit a strategy, or update a retest task to start the learning timeline.</p>";
}

function classifyTaskNote(text) {
  const value = String(text || "").toLowerCase();
  if (/(data|csv|column|export|timestamp|date|format)/.test(value)) return "Import/data";
  if (/(cost|fee|slippage|spread|execution)/.test(value)) return "Cost assumptions";
  if (/(oos|walk|split|decay|regime|out-of-sample)/.test(value)) return "OOS proof";
  if (/(sample|history|thin|few)/.test(value)) return "Sample depth";
  if (/(client|approve|approval|waiting|blocked|review)/.test(value)) return "Review bottleneck";
  return "Unclear next step";
}

function buildBottlenecks(reports) {
  const records = Object.values(getTaskRecords());
  const reasons = Object.values(getKillReasons());
  const risks = reports.flatMap((report) => report.audit.cards.filter((card) => card.level !== "ok").map((card) => card.title));
  const buckets = {
    "Import/data": 0,
    "Cost assumptions": 0,
    "OOS proof": 0,
    "Sample depth": 0,
    "Review bottleneck": 0,
    "Unclear next step": 0,
  };
  records.forEach((record) => {
    if (record.status === "Blocked" || record.status === "Skipped") buckets["Review bottleneck"] += 1;
    if (record.note) buckets[classifyTaskNote(record.note)] += 1;
  });
  [...reasons.map((item) => item.reason), ...risks].forEach((text) => {
    const bucket = classifyTaskNote(text);
    buckets[bucket] = (buckets[bucket] || 0) + 1;
  });
  const recommendations = {
    "Import/data": "Create a source-specific export checklist before the next audit.",
    "Cost assumptions": "Save default fee and slippage presets in the profile, then stress 2x and 3x every time.",
    "OOS proof": "Freeze parameters before review and require one fresh time split.",
    "Sample depth": "Set a minimum history rule and stop tuning until the sample is extended.",
    "Review bottleneck": "Write the exact missing approval or decision owner in the retest note.",
    "Unclear next step": "Convert vague notes into one measurable next test.",
  };
  return Object.entries(buckets)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([label, count]) => ({ label, count, recommendation: recommendations[label] }));
}

function renderBottleneckAnalysis(reports) {
  const container = $("#bottleneckGrid");
  if (!container) return;
  const bottlenecks = buildBottlenecks(reports);
  container.innerHTML = bottlenecks.length
    ? bottlenecks.map((item) => `<article class="bottleneck-item"><span>${escapeHtml(item.label)}</span><strong>${item.count}</strong><p>${escapeHtml(item.recommendation)}</p></article>`).join("")
    : "<p>Complete or block retest tasks, add notes, and mark Kill reasons to generate bottleneck analysis.</p>";
}

function renderContextLab() {
  const reports = getSavedReports();
  renderLearningLog(reports);
  renderBottleneckAnalysis(reports);
}

function renderWorkspace() {
  const reports = getSavedReports();
  if (!reports.length) $("#workspaceList").innerHTML = `<article class="strategy-card empty-workspace"><strong>No strategy versions yet</strong><p>Saved audits will be grouped by strategy with versions, risks, and next-test queues.</p></article>`;
  else {
    const statuses = getStatuses();
    const retestDates = getRetestDates();
    const taskRecords = getTaskRecords();
    $("#workspaceList").innerHTML = Object.entries(groupByStrategy(reports)).map(([key, versions]) => {
      const sorted = versions.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const latest = sorted[0], risk = mainRisk(latest), status = statuses[key] || (latest.audit.score >= 72 ? "Continue" : latest.audit.score < 45 ? "Kill" : "Retest");
      const taskRecord = taskRecords[key] || { status: "Todo", note: "" };
      const buttons = ["Continue", "Retest", "Kill"].map((item) => `<button class="status-button ${item.toLowerCase()} ${status === item ? "active" : ""}" type="button" data-strategy-key="${escapeHtml(key)}" data-status="${item}">${item}</button>`).join("");
      const retestDate = retestDates[key] || "";
      const calendar = retestState(retestDate);
      const calendarControls = status === "Kill"
        ? `<div class="calendar-panel muted"><strong>Retest Calendar</strong><p>Kill decisions are excluded from the calendar.</p></div>`
        : `<div class="calendar-panel ${calendar.className}"><div><strong>Retest Calendar</strong><p>${calendar.label}</p></div><input type="date" value="${escapeHtml(retestDate)}" data-retest-date="${escapeHtml(key)}" /><button class="secondary" type="button" data-schedule-retest="${escapeHtml(key)}">Schedule ${status === "Continue" ? "7d" : "3d"}</button><button class="secondary" type="button" data-export-ics="${escapeHtml(key)}">Export .ics</button></div>`;
      const taskControls = `<div class="task-panel"><div><strong>Retest task</strong><p>${escapeHtml(taskRecord.status)}${taskRecord.completedAt ? ` · ${new Date(taskRecord.completedAt).toLocaleDateString()}` : ""}</p></div><select data-task-status="${escapeHtml(key)}"><option ${taskRecord.status === "Todo" ? "selected" : ""}>Todo</option><option ${taskRecord.status === "Done" ? "selected" : ""}>Done</option><option ${taskRecord.status === "Skipped" ? "selected" : ""}>Skipped</option><option ${taskRecord.status === "Blocked" ? "selected" : ""}>Blocked</option></select><textarea data-task-note="${escapeHtml(key)}" rows="2" placeholder="Retest result note: what did you find?">${escapeHtml(taskRecord.note || "")}</textarea></div>`;
      const trend = sorted.slice().reverse().map((item) => item.audit.score);
      const queue = buildNextTestQueue(latest).map((task) => `<article class="test-item"><strong>${escapeHtml(task.title)}</strong><span>Next test</span><p>${escapeHtml(task.body)}</p></article>`).join("");
      const versionList = sorted.slice(0, 5).map((item) => `<article class="version-item"><div><div class="version-score">${item.audit.score}</div><span>${new Date(item.createdAt).toLocaleString()}</span></div><div><strong>${escapeHtml(mainRisk(item)?.title || "No risk")}</strong><p>${escapeHtml(item.changeNote || "No change note recorded")}</p></div></article>`).join("");
      return `<article class="strategy-card"><div class="strategy-head"><div><h3>${escapeHtml(latest.form.strategyName)}</h3><p>${sorted.length} versions | latest score ${latest.audit.score} | source: ${escapeHtml(latest.form.sourcePlatform || "Unknown")} | main risk: ${escapeHtml(risk?.title || "none")}</p></div><div class="strategy-status">${buttons}</div></div>${calendarControls}${taskControls}<div class="trend-panel"><div class="workspace-subhead"><strong>Research Score Trend</strong><span>${trend.at(0)} -> ${trend.at(-1)}</span></div>${svgSparkline(trend)}</div><div class="test-queue"><div class="workspace-subhead"><strong>Next Test Queue</strong><span>Generated from latest version</span></div>${queue}</div><div class="version-list"><div class="workspace-subhead"><strong>Version History</strong><span>Score, risk, and change note</span></div>${versionList}</div></article>`;
    }).join("");
  }
  renderWeeklyReview(reports);
  renderResearchLoopMetrics(reports);
  renderWeeklyQueue(reports);
  renderKillReasonLibrary();
  renderFourWeekReview(reports);
  renderKillStats();
  renderContextLab();
}
function saveReport() {
  if (!state.latestReport) runAudit();
  const changeNote = window.prompt("What changed in this version?", state.latestReport.changeNote || "")?.trim() || "No change note recorded";
  const report = { ...state.latestReport, changeNote, savedAt: new Date().toISOString() };
  const reports = getSavedReports();
  reports.unshift(report);
  localStorage.setItem("backtest-auditor-reports", JSON.stringify(reports.slice(0, 40)));
  trackEvent("save_report", { strategyName: report.form.strategyName, score: report.audit.score });
  addLearningEntry("Audit", `${report.form.strategyName} saved`, `Score ${report.audit.score}/100. Change note: ${changeNote}. Main risk: ${mainRisk(report)?.title || "none"}.`, { strategyName: report.form.strategyName, score: report.audit.score });
  const statuses = getStatuses(), key = keyName(report.form.strategyName);
  statuses[key] = statuses[key] || (report.audit.score >= 72 ? "Continue" : report.audit.score < 45 ? "Kill" : "Retest");
  saveStatuses(statuses);
  state.latestReport = report;
  renderWorkspace();
}

function saveDemoVersion(changeNote) {
  if (!state.latestReport) runAudit();
  const report = { ...state.latestReport, changeNote, savedAt: new Date().toISOString() };
  const reports = getSavedReports().filter((item) => !(item.demo && keyName(item.form.strategyName) === keyName(report.form.strategyName)));
  reports.unshift({ ...report, demo: true });
  localStorage.setItem("backtest-auditor-reports", JSON.stringify(reports.slice(0, 40)));
  const key = keyName(report.form.strategyName);
  const statuses = getStatuses();
  statuses[key] = buildVerdict(report).decision === "KILL" ? "Kill" : "Retest";
  saveStatuses(statuses);
  const dates = getRetestDates();
  dates[key] = suggestedRetestDate(statuses[key]);
  saveRetestDates(dates);
  state.latestReport = report;
  trackEvent("run_live_demo", { strategyName: report.form.strategyName, score: report.audit.score });
  addLearningEntry("Demo", `${report.form.strategyName} demo saved`, `Demo created a ${statuses[key]} workflow with retest date ${dates[key] || "none"}.`, { strategyName: report.form.strategyName });
  renderWorkspace();
}

function runLiveDemo() {
  $("#strategyName").value = "TradingView Breakout Demo";
  $("#strategyDesc").value = "Demo strategy exported from TradingView. Equity curve looks profitable, but one outlier winner and second-half decay may make it fake-strong.";
  $("#sourcePlatform").value = "TradingView";
  $("#assetClass").value = "Crypto";
  $("#frequency").value = "Daily";
  $("#feeBps").value = "3";
  $("#slippageBps").value = "4";
  $("#pasteCsv").value = liveDemoCsv;
  renderPlatformGuide();
  state.rows = parseCsv(liveDemoCsv);
  runAudit();
  saveDemoVersion("Live demo: imported TradingView-style CSV, detected fake-strong risk, and scheduled a retest.");
  $("#workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function copySummary() {
  if (!state.latestReport) runAudit();
  const report = state.latestReport, verdict = buildVerdict(report);
  await navigator.clipboard?.writeText([`${report.form.strategyName} Backtest Audit`, `Score: ${report.audit.score}/100`, `Verdict: ${verdict.title}`, `Top issue: ${mainRisk(report)?.title || "None"}`, `Next step: ${verdict.next}`].join("\n"));
}
function exportMarkdown() {
  if (!state.latestReport) runAudit();
  const report = state.latestReport;
  const md = [`# Backtest Audit: ${report.form.strategyName}`, "", `- Score: ${report.audit.score}/100`, `- Total return: ${formatPercent(report.metrics.totalReturn)}`, `- Max drawdown: ${formatPercent(report.metrics.maxDrawdown)}`, `- Sharpe: ${report.metrics.sharpe.toFixed(2)}`, "", "## Risk Cards", ...report.audit.cards.flatMap((card) => ["", `### ${card.title}`, card.body, ...card.actions.map((item) => `- ${item}`)]), "", "## Next Test Queue", ...buildNextTestQueue(report).map((task) => `- ${task.title}: ${task.body}`)].join("\n");
  const url = URL.createObjectURL(new Blob([md], { type: "text/markdown" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${report.form.strategyName.replace(/\s+/g, "-").toLowerCase()}-audit.md`;
  link.click();
  URL.revokeObjectURL(url);
}

function exportPaidAuditPack() {
  if (!state.latestReport) runAudit();
  const report = state.latestReport;
  const verdict = buildVerdict(report);
  const context = collectCopilotContext(report);
  const topRisk = mainRisk(report);
  const topBottleneck = context.bottlenecks[0];
  const nextTests = buildNextTestQueue(report);
  const memo = buildRuleBasedMemo(report);
  const md = [
    `# Paid Manual Audit Pack: ${report.form.strategyName}`,
    "",
    "Research credibility review only. Not investment advice, not a buy/sell signal, and not live-trading readiness.",
    "",
    "## 1. Verdict",
    `- Decision: ${verdict.title}`,
    `- Trust score: ${report.audit.score}/100`,
    `- Next step: ${verdict.next}`,
    "",
    "## 2. Evidence Summary",
    `- Total return: ${formatPercent(report.metrics.totalReturn)}`,
    `- Max drawdown: ${formatPercent(report.metrics.maxDrawdown)}`,
    `- Sharpe: ${report.metrics.sharpe.toFixed(2)}`,
    `- Samples: ${report.metrics.samples}`,
    `- Top-5 concentration: ${(report.metrics.concentration * 100).toFixed(1)}%`,
    "",
    "## 3. Top Fake-Strong Risk",
    `- ${topRisk?.title || "No major risk detected"}`,
    topRisk?.body || "No major risk body recorded.",
    "",
    "## 4. Current Bottleneck",
    topBottleneck ? `- ${topBottleneck.label}: ${topBottleneck.recommendation}` : "- No repeated bottleneck detected yet.",
    "",
    "## 5. Next Test Plan",
    ...nextTests.map((task, index) => `${index + 1}. ${task.title}: ${task.body}`),
    "",
    "## 6. Client / Research Context",
    `- Profile: ${context.clientProfile?.name || "No profile saved"}`,
    `- Tool: ${context.clientProfile?.tool || report.form.sourcePlatform || "Unknown"}`,
    `- Goal: ${context.clientProfile?.goal || "No goal recorded"}`,
    `- Risk boundary: ${context.clientProfile?.risk || "No risk boundary recorded"}`,
    "",
    "## 7. What To Save In The Learning Log",
    context.taskRecord?.note ? `- Existing note: ${context.taskRecord.note}` : "- After retest, record what evidence changed the decision.",
    `- Research Loop progress: ${context.researchLoop.completedLoops}/${context.researchLoop.strategyCount} complete (${context.researchLoop.completionRate}%).`,
    "",
    "## 8. AI Research Judge Memo",
    "```text",
    memo,
    "```",
  ].join("\n");
  const url = URL.createObjectURL(new Blob([md], { type: "text/markdown" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${report.form.strategyName.replace(/\s+/g, "-").toLowerCase()}-paid-audit-pack.md`;
  link.click();
  URL.revokeObjectURL(url);
  trackEvent("export_paid_audit_pack", { strategyName: report.form.strategyName, score: report.audit.score });
}
function renderMarket() {
  const data = market[state.market];
  $("#marketName").textContent = data.name;
  $("#marketCopy").textContent = data.text;
  $("#priceGrid").innerHTML = data.prices.map(([name, price, features], index) => `<article class="price-card ${index === 1 ? "featured" : ""}"><h3>${escapeHtml(name)}</h3><span class="price">${escapeHtml(price)}</span><p>${index === 1 ? "Main offer: the recurring workspace that keeps users coming back each week." : "Designed to test willingness to pay before building heavy features."}</p><ul>${features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}</ul></article>`).join("");
}

function joinWaitlist() {
  const email = $("#waitlistEmail")?.value.trim();
  if (email) trackEvent("join_waitlist", { emailDomain: email.split("@")[1] || "" });
  $("#waitlistMessage").textContent = "Submitting to Netlify Forms. Check the submissions dashboard after deployment.";
}

function recordPaidIntent() {
  trackEvent("paid_intent", { plan: "Pro" });
  syncLeadCaptureContext();
  $("#waitlistMessage").textContent = "Paid intent form is ready. Submission now validates demand beyond this browser.";
}

function recordPaymentRequest() {
  syncLeadCaptureContext();
  const price = $("#manualAuditForm")?.querySelector('[name="price_option"]')?.value || "";
  trackEvent("payment_request", {
    offer: "manual-backtest-audit",
    price,
    strategyName: state.latestReport?.form.strategyName || "",
    score: state.latestReport?.audit.score || "",
  });
}

function exportRetestIcs(key) {
  const reports = getSavedReports();
  const latest = groupByStrategy(reports)[key]?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  const date = getRetestDates()[key];
  if (!latest || !date) return;
  const start = date.replace(/-/g, "");
  const endDate = new Date(`${date}T00:00:00`);
  endDate.setDate(endDate.getDate() + 1);
  const end = endDate.toISOString().slice(0, 10).replace(/-/g, "");
  const task = buildNextTestQueue(latest)[0]?.title || "Retest strategy assumptions";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Backtest Auditor//Retest Calendar//EN",
    "BEGIN:VEVENT",
    `UID:${key}-${start}@backtest-auditor`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:Retest ${latest.form.strategyName}`,
    `DESCRIPTION:${task} | Score ${latest.audit.score}/100 | Not investment advice.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${latest.form.strategyName.replace(/\s+/g, "-").toLowerCase()}-retest.ics`;
  link.click();
  URL.revokeObjectURL(url);
  trackEvent("export_ics", { strategyName: latest.form.strategyName, date });
}

function exportWeeklyIcs() {
  const reports = getSavedReports();
  const statuses = getStatuses();
  const dates = getRetestDates();
  const groups = groupByStrategy(reports);
  const events = Object.entries(dates).flatMap(([key, date]) => {
    const status = statuses[key] || "Retest";
    if (status === "Kill") return [];
    const state = retestState(date);
    if (state.days === null || state.days > 7) return [];
    const latest = groups[key]?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    if (!latest) return [];
    const start = date.replace(/-/g, "");
    const endDate = new Date(`${date}T00:00:00`);
    endDate.setDate(endDate.getDate() + 1);
    const end = endDate.toISOString().slice(0, 10).replace(/-/g, "");
    const task = buildNextTestQueue(latest)[0]?.title || "Retest strategy assumptions";
    return [[
      "BEGIN:VEVENT",
      `UID:${key}-${start}@backtest-auditor`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${end}`,
      `SUMMARY:Retest ${latest.form.strategyName}`,
      `DESCRIPTION:${task} | Score ${latest.audit.score}/100 | Not investment advice.`,
      "END:VEVENT",
    ].join("\r\n")];
  });
  if (!events.length) return;
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Backtest Auditor//Weekly Retest Calendar//EN", ...events, "END:VCALENDAR"].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "backtest-auditor-weekly-retests.ics";
  link.click();
  URL.revokeObjectURL(url);
  trackEvent("export_weekly_ics", { count: events.length });
}

loadRulebook();
loadClientProfile();
renderMarket();
renderPlatformGuide();
updateWizardStatus();
renderWorkspace();
renderAnalytics();
$("#auditForm").addEventListener("submit", (event) => { event.preventDefault(); runAudit(); });
$("#runLiveDemo")?.addEventListener("click", runLiveDemo);
$("#loadSample").addEventListener("click", () => { trackEvent("load_sample"); state.rows = parseCsv(sampleCsv); $("#pasteCsv").value = sampleCsv; updateWizardStatus("data"); runAudit(); });
$("#csvFile").addEventListener("change", async (event) => { const file = event.target.files?.[0]; if (!file) return; trackEvent("upload_csv", { name: file.name, size: file.size }); const text = await file.text(); state.rows = parseCsv(text); $("#pasteCsv").value = text; updateWizardStatus("data"); runAudit(); });
$("#sourcePlatform").addEventListener("change", () => { trackEvent("source_platform", { platform: $("#sourcePlatform").value }); renderPlatformGuide(); updateWizardStatus("source"); });
$("#pasteCsv").addEventListener("input", () => updateWizardStatus("data"));
$$("[data-example]").forEach((button) => button.addEventListener("click", () => applyExample(button.dataset.example)));
$("#usePastedCsv").addEventListener("click", () => {
  const text = $("#pasteCsv").value.trim();
  if (!text) return;
  trackEvent("paste_csv", { length: text.length });
  state.rows = parseCsv(text);
  updateWizardStatus("data");
  runAudit();
});
$("#downloadTemplate").addEventListener("click", () => {
  trackEvent("download_template");
  const url = URL.createObjectURL(new Blob([sampleCsv], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "backtest-auditor-template.csv";
  link.click();
  URL.revokeObjectURL(url);
});
$("#saveReport").addEventListener("click", saveReport);
$("#exportReport").addEventListener("click", exportMarkdown);
$("#exportPaidAuditPack")?.addEventListener("click", exportPaidAuditPack);
$("#copySummary").addEventListener("click", () => { trackEvent("copy_summary"); copySummary(); });
$("#generateMemo").addEventListener("click", () => { trackEvent("generate_ai_memo", { hasApiKey: Boolean($("#apiKeyInput")?.value.trim()) }); generateCopilotMemo(); });
$("#saveRulebook").addEventListener("click", saveRulebook);
$("#resetRulebook").addEventListener("click", () => { localStorage.setItem("backtest-auditor-rulebook", JSON.stringify(defaultRulebook)); loadRulebook(); if (state.latestReport) runAudit(); });
$("#saveClientProfile")?.addEventListener("click", persistClientProfile);
$("#joinWaitlist")?.addEventListener("click", joinWaitlist);
$("#paidIntent")?.addEventListener("click", recordPaidIntent);
$("#paidIntentForm")?.addEventListener("submit", () => recordPaidIntent());
$("#manualAuditRequest")?.addEventListener("click", recordPaymentRequest);
$("#manualAuditForm")?.addEventListener("submit", () => recordPaymentRequest());
$("#exportWeeklyIcs").addEventListener("click", exportWeeklyIcs);
$("#workspaceList").addEventListener("click", (event) => {
  const scheduleButton = event.target.closest("[data-schedule-retest]");
  if (scheduleButton) {
    const key = scheduleButton.dataset.scheduleRetest;
    const statuses = getStatuses();
    const dates = getRetestDates();
    dates[key] = suggestedRetestDate(statuses[key] || "Retest");
    saveRetestDates(dates);
    trackEvent("schedule_retest", { key, date: dates[key] });
    renderWorkspace();
    return;
  }
  const exportButton = event.target.closest("[data-export-ics]");
  if (exportButton) {
    exportRetestIcs(exportButton.dataset.exportIcs);
    return;
  }
  const button = event.target.closest("[data-strategy-key][data-status]");
  if (!button) return;
  const statuses = getStatuses();
  statuses[button.dataset.strategyKey] = button.dataset.status;
  saveStatuses(statuses);
  if (button.dataset.status !== "Kill") {
    const dates = getRetestDates();
    dates[button.dataset.strategyKey] = dates[button.dataset.strategyKey] || suggestedRetestDate(button.dataset.status);
    saveRetestDates(dates);
  }
  if (button.dataset.status === "Kill") {
    const report = groupByStrategy(getSavedReports())[button.dataset.strategyKey]?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    const reason = window.prompt("Why kill this strategy?", mainRisk(report)?.title || "")?.trim();
    if (reason) {
      const reasons = getKillReasons();
      reasons[button.dataset.strategyKey] = { strategyName: report?.form.strategyName || button.dataset.strategyKey, reason, score: report?.audit.score, createdAt: new Date().toISOString() };
      saveKillReasons(reasons);
      addLearningEntry("Kill", `${report?.form.strategyName || button.dataset.strategyKey} killed`, `Reason: ${reason}. This becomes part of the private failure-pattern library.`, { key: button.dataset.strategyKey, reason });
    }
  } else {
    addLearningEntry("Decision", `${button.dataset.status} selected`, `Strategy status changed to ${button.dataset.status}. Next review speed depends on completing the retest note.`, { key: button.dataset.strategyKey, status: button.dataset.status });
  }
  renderWorkspace();
});
$("#workspaceList").addEventListener("change", (event) => {
  const input = event.target.closest("[data-retest-date]");
  if (input) {
    const dates = getRetestDates();
    if (input.value) dates[input.dataset.retestDate] = input.value;
    else delete dates[input.dataset.retestDate];
    saveRetestDates(dates);
    trackEvent("set_retest_date", { key: input.dataset.retestDate, date: input.value });
    renderWorkspace();
    return;
  }
  const status = event.target.closest("[data-task-status]");
  if (status) {
    const records = getTaskRecords();
    const current = records[status.dataset.taskStatus] || {};
    records[status.dataset.taskStatus] = {
      ...current,
      status: status.value,
      completedAt: status.value === "Done" ? new Date().toISOString() : current.completedAt || null,
      updatedAt: new Date().toISOString(),
    };
    saveTaskRecords(records);
    trackEvent("task_status", { key: status.dataset.taskStatus, status: status.value });
    addLearningEntry("Task", `Retest marked ${status.value}`, status.value === "Blocked" ? "This is a bottleneck signal. Add a note with the exact missing evidence or decision owner." : `Task status changed to ${status.value}.`, { key: status.dataset.taskStatus, status: status.value });
    renderWorkspace();
    return;
  }
  const note = event.target.closest("[data-task-note]");
  if (note) {
    const records = getTaskRecords();
    const current = records[note.dataset.taskNote] || { status: "Todo" };
    records[note.dataset.taskNote] = { ...current, note: note.value.trim(), updatedAt: new Date().toISOString() };
    saveTaskRecords(records);
    trackEvent("task_note", { key: note.dataset.taskNote, length: note.value.trim().length });
    addLearningEntry("Note", "Retest note updated", note.value.trim() || "Retest note cleared.", { key: note.dataset.taskNote });
    renderWorkspace();
  }
});
$$("[data-market]").forEach((button) => button.addEventListener("click", () => { state.market = button.dataset.market; $$("[data-market]").forEach((item) => item.classList.toggle("active", item === button)); renderMarket(); }));

const initialExample = new URLSearchParams(window.location.search).get("example");
if (initialExample && exampleReports[initialExample]) applyExample(initialExample, { scroll: false });
