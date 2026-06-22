const captureForms = Array.from(document.querySelectorAll(".lead-form"));

const attributionParams = ["src", "campaign", "prospect_id", "channel"];

function currentAttribution() {
  const params = new URLSearchParams(window.location.search);
  const attribution = {
    landing_path: window.location.pathname,
    landing_query: window.location.search.replace(/^\?/, ""),
    referrer: document.referrer || "",
  };
  attributionParams.forEach((key) => {
    const value = params.get(key);
    if (value) attribution[key] = value;
  });
  return attribution;
}

function ensureHiddenField(form, name, value) {
  let input = form.querySelector(`[name="${name}"]`);
  if (!input) {
    input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    form.append(input);
  }
  input.value = value || "";
}

function applyAttribution(form) {
  const attribution = currentAttribution();
  Object.entries(attribution).forEach(([name, value]) => ensureHiddenField(form, name, value));
}

function appendAttributionToUrl(url) {
  if (!url) return "";
  const attribution = currentAttribution();
  const target = new URL(url, window.location.href);
  attributionParams.forEach((key) => {
    if (attribution[key]) target.searchParams.set(key, attribution[key]);
  });
  if (attribution.referrer) target.searchParams.set("referrer", attribution.referrer);
  return target.toString();
}

function serializeForm(form) {
  applyAttribution(form);
  return new URLSearchParams(new FormData(form)).toString();
}

function rememberOrderDraft(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const draft = {
    email: data.email || "",
    strategy_note: data.strategy_note || "",
    price_option: data.price_option || "",
    main_tool: data.main_tool || "",
    review_focus: data.review_focus || "",
    offer: data.offer || "",
    saved_at: new Date().toISOString(),
  };
  try {
    sessionStorage.setItem("backtest-auditor-order-draft", JSON.stringify(draft));
  } catch {
    // Best-effort convenience only; the order flow still works without storage.
  }
}

function applyOrderDraft() {
  const form = document.querySelector('#payment-proof, form[name="manual-payment-proof"]');
  if (!form) return;
  try {
    const draft = JSON.parse(sessionStorage.getItem("backtest-auditor-order-draft") || "{}");
    if (!draft || typeof draft !== "object") return;
    const email = form.querySelector('[name="email"]');
    const strategyNote = form.querySelector('[name="strategy_note"]');
    const orderNote = form.querySelector('[name="payment_reference"]');
    if (email && draft.email && !email.value) email.value = draft.email;
    if (strategyNote && draft.strategy_note && !strategyNote.value) strategyNote.value = draft.strategy_note;
    if (orderNote && !orderNote.value) {
      const details = [
        draft.price_option ? `Selected offer: ${draft.price_option}` : "",
        draft.main_tool ? `Main tool: ${draft.main_tool}` : "",
        draft.review_focus ? `Review focus: ${draft.review_focus}` : "",
      ].filter(Boolean).join("\n");
      if (details) orderNote.value = details;
    }
  } catch {
    // Ignore invalid drafts.
  }
}

function buildManualFallback(form) {
  applyAttribution(form);
  const lines = Array.from(new FormData(form).entries())
    .filter(([name, value]) => value && name !== "bot-field")
    .map(([name, value]) => `${name}: ${value}`);
  return [
    "If this static site cannot submit the form, copy this request and send it back in the same thread or DM:",
    "",
    "```",
    ...lines,
    "```",
  ].join("\n");
}

async function submitLeadForm(form) {
  const button = form.querySelector('button[type="submit"]');
  const note = form.parentElement.querySelector(".form-feedback") || document.createElement("p");
  const isPaymentRequest = form.dataset.paymentOffer === "manual-audit";
  const isPaymentProof = form.querySelector('[name="form-name"]')?.value === "manual-payment-proof";
  const paymentUrl = form.dataset.paymentUrl || "";
  note.className = "form-feedback";
  if (!note.parentElement) form.parentElement.append(note);
  if (button) button.disabled = true;
  if (isPaymentRequest) rememberOrderDraft(form);
  if (isPaymentRequest && paymentUrl) {
    const target = new URL(appendAttributionToUrl(paymentUrl));
    target.searchParams.set("request_status", "order-started");
    window.location.href = target.toString();
    return;
  }
  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: serializeForm(form),
    });
    if (!response.ok) throw new Error(`Unexpected status ${response.status}`);
    note.textContent = isPaymentProof
      ? "Order request submitted. We will confirm payment and review the strategy material."
      : isPaymentRequest
        ? "Paid audit request submitted. Continue to the order page to send strategy material and payment preference."
        : "Submitted. We will follow up with the next step.";
    form.reset();
    if (isPaymentRequest && paymentUrl) window.location.href = appendAttributionToUrl(paymentUrl);
  } catch (error) {
    if (isPaymentRequest && paymentUrl) {
      note.textContent = "Continue to the order page to send strategy material and payment preference.";
      const target = new URL(appendAttributionToUrl(paymentUrl));
      target.searchParams.set("request_status", "static-site-redirect");
      window.location.href = target.toString();
      return;
    }
    const fallback = buildManualFallback(form);
    note.textContent = isPaymentProof
      ? "Order request could not submit automatically. Copy the request details below and send them in the same thread or DM."
      : isPaymentRequest
        ? "Audit request could not submit automatically. Copy the request details below and send them in the same thread or DM."
        : "Submit failed on this static host. Copy the request details below and send them in the same thread or DM.";
    const pre = document.createElement("pre");
    pre.className = "form-fallback";
    pre.textContent = fallback;
    note.after(pre);
  } finally {
    if (button) button.disabled = false;
  }
}

captureForms.forEach((form) => {
  applyAttribution(form);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await submitLeadForm(form);
  });
});

applyOrderDraft();
