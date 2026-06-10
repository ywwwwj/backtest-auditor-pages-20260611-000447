const demoSteps = [
  {
    kicker: "Step 1",
    title: "Import a TradingView-style CSV",
    body: "The user pastes an equity curve that looks profitable at first glance.",
    html: `<div class="demo-csv"><span>date,equity,pnl,return,trades</span><span>2024-01-10,104000,-1100,-0.0105,5</span><span>2024-01-11,154000,50000,0.4808,2</span><span>2024-01-12,153200,-800,-0.0052,4</span></div>`,
  },
  {
    kicker: "Step 2",
    title: "Auto-map the messy export",
    body: "Backtest Auditor identifies date, equity, pnl, return, and trades without forcing a perfect template.",
    html: `<div class="demo-pill-grid"><article><span>date</span><strong>date</strong><em>100%</em></article><article><span>equity</span><strong>equity</strong><em>100%</em></article><article><span>pnl</span><strong>pnl</strong><em>100%</em></article><article><span>return</span><strong>return</strong><em>100%</em></article></div>`,
  },
  {
    kicker: "Step 3",
    title: "Expose the fake-strong pattern",
    body: "The equity curve is positive, but the result depends on one extreme winner and then decays.",
    html: `<div class="demo-chart"><svg viewBox="0 0 520 180"><path d="M20 135 L80 128 L140 136 L200 126 L260 38 L320 48 L380 66 L450 92 L500 118" fill="none" stroke="#23694a" stroke-width="5" stroke-linecap="round"/><circle cx="260" cy="38" r="10" fill="#e15d45"/><text x="275" y="42">outlier winner</text></svg></div>`,
  },
  {
    kicker: "Step 4",
    title: "Give a strong verdict",
    body: "The product does not say this will make money. It says whether the research deserves more time.",
    html: `<div class="demo-verdict"><strong>KILL</strong><p>Score 41 / 100</p><span>Top-5 concentration is too high. Second-half performance decays. Stop tuning until this survives retest.</span></div>`,
  },
  {
    kicker: "Step 5",
    title: "Turn the result into a research task",
    body: "The workflow saves a strategy version, creates a retest queue, and builds a private failure-pattern library.",
    html: `<div class="demo-task"><article><span>Weekly Queue</span><strong>Remove top 5 winners and rerun</strong><p>Due in 3 days</p></article><article><span>Kill Reason</span><strong>Outlier winner trap</strong><p>Saved to private weak-strategy dataset</p></article></div>`,
  },
];

let demoIndex = 0;
let demoTimer = null;

const $ = (selector) => document.querySelector(selector);

function renderTimeline() {
  $("#demoTimeline").innerHTML = demoSteps.map((step, index) => `<button class="${index === demoIndex ? "active" : ""}" type="button" data-step="${index}"><span>${step.kicker}</span><strong>${step.title}</strong></button>`).join("");
}

function renderStep(index) {
  demoIndex = index;
  const step = demoSteps[demoIndex];
  $("#demoScreen").innerHTML = `<p class="kicker">${step.kicker}</p><h2>${step.title}</h2><p>${step.body}</p>${step.html}`;
  $("#demoProgress").style.width = `${((demoIndex + 1) / demoSteps.length) * 100}%`;
  renderTimeline();
}

function playDemo() {
  clearInterval(demoTimer);
  renderStep(0);
  demoTimer = setInterval(() => {
    if (demoIndex >= demoSteps.length - 1) {
      clearInterval(demoTimer);
      return;
    }
    renderStep(demoIndex + 1);
  }, 1800);
}

function resetDemo() {
  clearInterval(demoTimer);
  renderStep(0);
}

renderStep(0);
$("#playDemo").addEventListener("click", playDemo);
$("#resetDemo").addEventListener("click", resetDemo);
$("#demoTimeline").addEventListener("click", (event) => {
  const button = event.target.closest("[data-step]");
  if (!button) return;
  clearInterval(demoTimer);
  renderStep(Number(button.dataset.step));
});
