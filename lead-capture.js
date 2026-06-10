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
  return target.toString();
}

function serializeForm(form) {
  applyAttribution(form);
  return new URLSearchParams(new FormData(form)).toString();
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
  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: serializeForm(form),
    });
    if (!response.ok) throw new Error(`Unexpected status ${response.status}`);
    note.textContent = isPaymentProof
      ? "Payment proof submitted. This is the evidence trail to fulfill the first manual audit order."
      : isPaymentRequest
        ? "Paid audit request submitted. Continue to the payment/proof page to close the order."
        : "Submitted. We can now validate real demand instead of saving intent only in this browser.";
    form.reset();
    if (isPaymentRequest && paymentUrl) window.location.href = appendAttributionToUrl(paymentUrl);
  } catch (error) {
    const fallback = buildManualFallback(form);
    note.textContent = isPaymentProof
      ? "Payment proof could not submit automatically. Copy the request details below and send them in the same thread or DM."
      : isPaymentRequest
        ? "Payment request could not submit automatically. Copy the request details below and send them in the same thread or DM."
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
