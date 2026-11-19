// BYOD — Build Your Own Destination (big planner page).
// Data: DESTINATIONS + MV_AREAS from data.js (shared with the home page).
// Maldives gets the full dynamic planner; other content destinations compose
// from their real sample day rhythms; countries without data route to the
// enquiry form / WhatsApp with the destination pre-picked — no lead is lost.
const WA_NUMBER = "918860145084";
const IMG = {
  aerial: U("photo-1595184979141-090792f6b578"),
  villas: U("photo-1514282401047-d79a71a590e8"),
  curve: U("photo-1573843981267-be1999ff37cd"),
  dive: U("photo-1544551763-46a013bb70d5")
};
const AREA_PHOTOS = { northmale: IMG.aerial, southmale: IMG.villas, baa: IMG.curve, southari: IMG.aerial, local: IMG.dive, advise: IMG.curve };
const RESORT_PHOTOS = [IMG.curve, IMG.villas, IMG.aerial];
const REGIONS = [
  { name: "South East Asia", countries: [
    { name: "Indonesia (Bali)", dest: "bali" }, { name: "Thailand", dest: "thailand" },
    { name: "Vietnam", dest: "vietnam" }, { name: "Malaysia (incl. Sabah)", dest: "sabah" },
    { name: "Cambodia" }, { name: "Singapore" } ] },
  { name: "Indian Subcontinent", countries: [
    { name: "Sri Lanka" }, { name: "Bhutan" }, { name: "India" } ] },
  { name: "Asia", countries: [
    { name: "UAE (Dubai, Abu Dhabi)", dest: "dubai" }, { name: "Uzbekistan" },
    { name: "Kazakhstan (Almaty)" }, { name: "Maldives", dest: "maldives" },
    { name: "Azerbaijan", dest: "azerbaijan" }, { name: "Taiwan", dest: "taiwan" } ] },
  { name: "Africa", countries: [
    { name: "Madagascar" }, { name: "Seychelles", dest: "seychelles" }, { name: "Kenya" },
    { name: "South Africa" }, { name: "Mauritius", dest: "mauritius" } ] },
  { name: "Europe", countries: [
    { name: "Switzerland" }, { name: "France" }, { name: "Italy" }, { name: "Greece" },
    { name: "Spain" }, { name: "United Kingdom" }, { name: "Netherlands" }, { name: "Austria" },
    { name: "Germany" }, { name: "Portugal" }, { name: "Turkey" }, { name: "Iceland" },
    { name: "Croatia" }, { name: "Norway" } ] }
];
const DAYS_OPTS = ["3–4 days", "5–7 days", "8–12 days", "2 weeks +"];
const DAYS_MAP_B = { "3–4 days": 4, "5–7 days": 6, "8–12 days": 10, "2 weeks +": 12 };
const GENERIC_STYLES = ["Relaxed & easy", "Balanced", "Packed with experiences", "Family-friendly"];

const S = { country: null, destId: null, area: "", style: "", resort: "", days: "" };
const $ = id => document.getElementById(id);
function destById(id) { return DESTINATIONS.find(d => d.id === id) || null; }
function show(id) { $(id).hidden = false; }
function hide(id) { $(id).hidden = true; }
function scrollToId(id) { $(id).scrollIntoView({ behavior: "smooth", block: "start" }); }

// ---- Step 1: countries (photo cards, grouped by region) ----
function renderCountries() {
  $("countryWrap").innerHTML = REGIONS.map(r => `
    <h3 class="region-title">${r.name}</h3>
    <div class="pick-grid">${r.countries.map(c => {
      const d = c.dest ? destById(c.dest) : null;
      const img = d && d.img ? `<img src="${d.img}" alt="${c.name}" loading="lazy">` : `<div class="pick-grad">${c.name}</div>`;
      const sub = c.dest === "maldives" ? "Full planner — areas, stays & day-wise plan"
        : d ? "Planner — sample plan from real trip rhythms"
        : "Bhavna plans it personally — enquire";
      return `<button type="button" class="pick-card${S.country === c.name ? " selected" : ""}" data-country="${c.name}" data-dest="${c.dest || ""}">${img}<span class="pick-body"><strong>${c.name}</strong><small>${sub}</small></span></button>`;
    }).join("")}</div>`).join("");
  $("countryWrap").querySelectorAll("[data-country]").forEach(b => b.addEventListener("click", () => pickCountry(b)));
}
function pickCountry(btn) {
  S.country = btn.dataset.country;
  S.destId = btn.dataset.dest || null;
  S.area = ""; S.style = ""; S.resort = ""; S.days = "";
  renderCountries();
  hide("stepPlan");
  if (!S.destId) {
    hide("stepArea"); hide("stepStyle"); hide("stepStay"); hide("stepDays");
    $("nodataTitle").textContent = S.country + " — planned personally by Bhavna";
    $("nodataWhats").href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hi Bhavna! I want to plan a trip to " + S.country + ". Please help me build it.");
    show("stepNoData"); scrollToId("stepNoData");
    return;
  }
  hide("stepNoData");
  if (S.destId === "maldives") { renderAreas(); show("stepArea"); scrollToId("stepArea"); }
  else { hide("stepArea"); hide("stepStay"); renderStyles(GENERIC_STYLES); show("stepStyle"); scrollToId("stepStyle"); }
}
$("nodataContact").addEventListener("click", () => {
  try { localStorage.setItem("ee_byod_dest", S.country); } catch (e) {}
  location.href = "index.html#enquire";
});

// ---- Step 2: Maldives areas (photo cards) ----
function renderAreas() {
  $("areaGrid").innerHTML = Object.keys(MV_AREAS).map(k => {
    const a = MV_AREAS[k];
    return `<button type="button" class="pick-card${S.area === k ? " selected" : ""}" data-area="${k}">
      <img src="${AREA_PHOTOS[k]}" alt="${a.short}" loading="lazy">
      <span class="pick-body"><strong>${a.label}</strong><small>${a.transfer}</small></span></button>`;
  }).join("");
  $("areaGrid").querySelectorAll("[data-area]").forEach(b => b.addEventListener("click", () => {
    S.area = b.dataset.area; S.resort = "";
    renderAreas(); renderStyles(MV_STYLES_B); show("stepStyle"); renderStays(); show("stepStay"); scrollToId("stepStyle");
  }));
}

// ---- Step 3: styles ----
const MV_STYLES_B = ["Luxury", "Premium", "Family-friendly", "Budget — local island guesthouse"];
function renderStyles(list) {
  $("styleRow").innerHTML = list.map(s => `<button type="button" class="chip-lg${S.style === s ? " selected" : ""}" data-style="${s}">${s}</button>`).join("");
  $("styleRow").querySelectorAll("[data-style]").forEach(b => b.addEventListener("click", () => {
    S.style = b.dataset.style;
    renderStyles(list);
    if (S.destId === "maldives") { renderStays(); show("stepStay"); scrollToId("stepStay"); }
    else { show("stepDays"); renderDays(); scrollToId("stepDays"); }
  }));
}

// ---- Step 4: Maldives stays (photo cards + live detail) ----
function renderStays() {
  const a = MV_AREAS[S.area];
  if (!a) { $("stayGrid").innerHTML = ""; return; }
  $("stayGrid").innerHTML = a.resorts.map((r, i) => `
    <button type="button" class="pick-card${S.resort === r.name ? " selected" : ""}" data-resort="${r.name}">
      <img src="${RESORT_PHOTOS[i % RESORT_PHOTOS.length]}" alt="${r.name}" loading="lazy">
      <span class="pick-body"><strong>${r.name}</strong><small>${r.styles.join(" · ")}</small></span>
    </button>`).join("");
  $("stayGrid").querySelectorAll("[data-resort]").forEach(b => b.addEventListener("click", () => {
    S.resort = b.dataset.resort;
    renderStays(); renderStayDetail(); show("stepDays"); renderDays(); scrollToId("stepDays");
  }));
  renderStayDetail();
}
function renderStayDetail() {
  const det = $("stayDetail");
  const a = MV_AREAS[S.area];
  const r = a && a.resorts.find(x => x.name === S.resort);
  if (!r) { det.hidden = true; return; }
  const home = MV_AREAS[r.area];
  det.innerHTML = `<strong>${r.name}</strong> — ${r.stay}.<br><span>Getting there:</span> ${home.transfer}.<br><span>Signature experiences:</span> ${r.activities.join(" · ")}.<br><span>Typical inclusions (Bhavna confirms):</span> ${r.inclusions.join(", ")}.`;
  det.hidden = false;
}

// ---- Step 5: days ----
function renderDays() {
  $("daysRow").innerHTML = DAYS_OPTS.map(d => `<button type="button" class="chip-lg${S.days === d ? " selected" : ""}" data-days="${d}">${d}</button>`).join("");
  $("daysRow").querySelectorAll("[data-days]").forEach(b => b.addEventListener("click", () => {
    S.days = b.dataset.days;
    renderDays(); composePlan(); show("stepPlan"); scrollToId("stepPlan");
  }));
}

// ---- Composition ----
function composeMaldivesB() {
  const a0 = MV_AREAS[S.area];
  const R = a0.resorts.find(x => x.name === S.resort);
  const A = MV_AREAS[R.area];
  const n = DAYS_MAP_B[S.days] || 5;
  const incl = R.inclusions.join(", ");
  const days = [];
  days.push(["Arrive & settle in at " + R.name,
    `Land at ${A.airport}. Your transfer — ${A.transfer} — brings you straight to ${R.name}: ${R.stay}. Check in, freshen up and take a gentle sunset walk. Your stay includes ${incl} (Bhavna confirms the live inclusions for your dates).`]);
  const middles = [];
  const act = R.activities, exc = A.excursions;
  for (let i = 0; i < Math.max(act.length, exc.length); i++) {
    if (act[i]) middles.push([act[i].split("—")[0].trim(), `Breakfast at ${R.name} (included in your stay), then: ${act[i]} — one of the experiences ${R.name} is loved for. Evening at leisure.`]);
    if (exc[i]) middles.push([exc[i].split("(")[0].trim(), `After breakfast, head out on the water: ${exc[i]} — a signature ${A.short} excursion, arranged with trusted local operators.`]);
  }
  middles.push(["A slow day, your way", `No fixed plan — lagoon, pool and beach at your own pace, with ${R.name}'s team on hand for anything you fancy.`]);
  middles.push(["Second helping of paradise", "Revisit your favourite spot from the trip so far, or let Bhavna slot in the one experience you have been saving — she will advise what fits the weather and season."]);
  const need = n - 2;
  const body = middles.slice(0, need);
  let k = 0;
  while (body.length < need) body.push(middles[k++ % middles.length]);
  days.push(...body);
  const ret = A.transfer.replace(/\s*\([^)]*\)/g, "").replace(/^a |^an /, "the ");
  days.push(["Last morning & departure", `Breakfast and one final swim, then ${ret} back to ${A.airport} in time for your flight${A.transfer.includes("seaplane") ? " — seaplanes only fly in daylight, so Bhavna times your departure for you" : ""}.`]);
  return { days, meta: `${R.name} · ${A.short} · ${n} days · ${S.style}`, banner: AREA_PHOTOS[R.area] };
}
function composeGenericB() {
  const d = destById(S.destId);
  const n = DAYS_MAP_B[S.days] || 5;
  let src = d.days;
  if (!src.length) {
    // Taiwan / Sabah carry highlights but no sample rhythm — compose from those.
    src = [["Arrive in " + d.name, d.intro],
      ...d.highlights.map(h => ["Explore: " + h[0], h[1]]),
      ["One last look around", "A slow final morning, souvenirs and photos, then your transfer out — Bhavna times it all."]];
  }
  const days = [];
  for (let i = 0; i < n; i++) {
    const s = src[Math.min(i, src.length - 1)] || src[i % src.length];
    days.push([s[0], s[1]]);
  }
  // For trips longer than the sample rhythm, vary the middle days honestly.
  if (n > src.length) {
    for (let i = src.length - 1; i < n - 1; i++) {
      days[i] = ["A day at your pace in " + d.name, "No fixed plan — Bhavna suggests the best local experiences for your dates, or simply time to relax and wander. (" + S.style + " pace, as you picked.)"];
    }
  }
  return { days, meta: `${d.name} · ${n} days · ${S.style}`, banner: d.img || IMG.curve };
}
let planText = "", planMeta = "";
function composePlan() {
  const out = S.destId === "maldives" ? composeMaldivesB() : composeGenericB();
  planMeta = out.meta;
  planText = out.days.map((d, i) => "Day " + (i + 1) + ": " + d[0] + " — " + d[1]).join("\n");
  $("planHead").textContent = "Your " + S.country + " plan";
  $("planMetaLine").textContent = planMeta;
  $("planBanner").src = out.banner;
  $("planList").innerHTML = out.days.map(d => `<li><strong>${d[0]}</strong><p>${d[1]}</p></li>`).join("");
  $("planWhats").href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hi Bhavna! I built a trip with your BYOD planner:\n" + planMeta + "\n\nMy sample plan:\n" + planText + "\n\nPlease customise this for me.");
}
$("planContact").addEventListener("click", () => {
  try {
    localStorage.setItem("ee_byod_dest", S.destId === "maldives" ? "Maldives" : (destById(S.destId) ? destById(S.destId).name : S.country));
    localStorage.setItem("ee_byod_msg", "From the BYOD planner — " + planMeta + "\nSample plan:\n" + planText);
  } catch (e) {}
  location.href = "index.html#enquire";
});

renderCountries();
