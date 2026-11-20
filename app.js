// Elite Exposures Travel — concept demo. Content adapted from eliteexposures.in (cleaned).
// Sample day plans are illustrative rhythms only; real itineraries are built per enquiry.
const Z = (path, w) => `https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=${w || 1000},fit=crop/A85655oqJ9uZbX4k/${path}`;

// DESTINATIONS and MV_AREAS live in data.js (shared with byod.html)

// Filter categories for the Top Destination tabs
const CATS = {
  maldives: "islands", bali: "asia islands", seychelles: "islands", dubai: "middleeast",
  "abu-dhabi": "middleeast", mauritius: "islands", thailand: "asia",
  vietnam: "asia", azerbaijan: "asia", taiwan: "asia featured", sabah: "asia featured"
};
DESTINATIONS.forEach(d => { d.cat = CATS[d.id] || ""; });

const WA_NUMBER = "918860145084";
const track = document.getElementById("destTrack");
const insta = document.getElementById("instaStrip");
const gallery = document.getElementById("galleryGrid");
const popRow = document.getElementById("popRow");
const footerInsta = document.getElementById("footerInsta");
const withImg = DESTINATIONS.filter(d => d.img);

// --- Top Destination coverflow cards (all 11) ---
DESTINATIONS.forEach(d => {
  const el = document.createElement("article");
  el.className = "cf-card";
  el.dataset.cat = d.cat; el.dataset.id = d.id;
  el.tabIndex = 0; el.setAttribute("role", "button");
  el.setAttribute("aria-label", "Explore " + d.name);
  el.innerHTML = (d.img
    ? `<img src="${d.img.replace("w=1000", "w=700")}" alt="${d.name}" loading="lazy">`
    : `<div class="cf-card-grad"><span>${d.name}</span></div>`)
    + `<div class="cf-card-shade"></div><p class="cf-card-tag">${d.tag}</p><p class="cf-card-name">${d.name}</p>`;
  el.addEventListener("click", () => {
    if (el.classList.contains("center")) openDest(d.id);
    else el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  });
  el.addEventListener("keydown", e => { if (e.key === "Enter") openDest(d.id); });
  track.appendChild(el);
});
function cfCenter() {
  const mid = track.getBoundingClientRect().left + track.clientWidth / 2;
  let best = null, bestDist = 1e9;
  track.querySelectorAll(".cf-card").forEach(c => {
    if (c.style.display === "none") return;
    const r = c.getBoundingClientRect();
    const dist = Math.abs(r.left + r.width / 2 - mid);
    if (dist < bestDist) { bestDist = dist; best = c; }
  });
  track.querySelectorAll(".cf-card").forEach(c => c.classList.toggle("center", c === best));
}
track.addEventListener("scroll", () => requestAnimationFrame(cfCenter), { passive: true });
document.getElementById("cfPrev").addEventListener("click", () => track.scrollBy({ left: -290, behavior: "smooth" }));
document.getElementById("cfNext").addEventListener("click", () => track.scrollBy({ left: 290, behavior: "smooth" }));
// Tabs filter
document.querySelectorAll("#destTabs .tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll("#destTabs .tab").forEach(t => t.classList.toggle("active", t === tab));
    const f = tab.dataset.filter;
    track.querySelectorAll(".cf-card").forEach(c => {
      c.style.display = (f === "all" || c.dataset.cat.split(" ").includes(f)) ? "" : "none";
    });
    track.scrollTo({ left: 0 });
    setTimeout(cfCenter, 60);
  });
});
setTimeout(cfCenter, 300);

// --- Most Popular Tour cards (featured destinations; price on enquiry, no ratings) ---
["maldives", "bali", "dubai", "seychelles", "mauritius"].forEach(id => {
  const d = DESTINATIONS.find(x => x.id === id);
  const el = document.createElement("article");
  el.className = "pop-card";
  el.innerHTML = `<img src="${d.img.replace("w=1000", "w=700")}" alt="${d.name}" loading="lazy">
    <div class="pop-body"><h3>${d.name}</h3><p>${d.card}</p>
    <div class="pop-foot"><span class="price-note">Price on enquiry</span><span>${d.id === "maldives" ? '<button class="btn-plan-sm" type="button">Plan →</button> ' : ''}<button class="btn-enquire" type="button">Enquire →</button></span></div></div>`;
  el.querySelector("img").addEventListener("click", () => openDest(d.id));
  const planBtn = el.querySelector(".btn-plan-sm");
  if (planBtn) planBtn.addEventListener("click", () => openPlan(d.id));
  el.querySelector(".btn-enquire").addEventListener("click", () => {
    document.getElementById("fDest").value = d.name;
    document.getElementById("enquire").scrollIntoView({ behavior: "smooth" });
  });
  popRow.appendChild(el);
});

// --- Recent Gallery (destination photos; tap to open the journey) ---
withImg.slice(0, 8).forEach((d, i) => {
  const el = document.createElement("div");
  el.className = "gallery-tile";
  el.innerHTML = `<img src="${d.img.replace("w=1000", "w=700")}" alt="${d.name}" loading="lazy">`;
  el.addEventListener("click", () => openDest(d.id));
  gallery.appendChild(el);
});

// --- Instagram tiles + footer thumbnails ---
withImg.forEach((d, i) => {
  const t = document.createElement("a");
  t.className = "insta-tile";
  t.href = "https://www.instagram.com/eliteexposurestravel";
  t.target = "_blank"; t.rel = "noopener";
  t.innerHTML = `<img src="${d.img.replace("w=1000", "w=500")}" alt="${d.name} on Instagram" loading="lazy">`;
  insta.appendChild(t);
  if (i < 6) {
    const f = document.createElement("a");
    f.href = "https://www.instagram.com/eliteexposurestravel";
    f.target = "_blank"; f.rel = "noopener";
    f.innerHTML = `<img src="${d.img.replace("w=1000", "w=300")}" alt="${d.name}" loading="lazy">`;
    footerInsta.appendChild(f);
  }
});

// Overlay
const overlay = document.getElementById("destOverlay");
let currentDest = null;
function openDest(id) {
  const d = DESTINATIONS.find(x => x.id === id);
  if (!d) return;
  currentDest = d;
  document.getElementById("ovTag").textContent = d.tag;
  document.getElementById("ovName").textContent = d.name;
  document.getElementById("ovIntro").textContent = d.intro;
  const img = document.getElementById("ovImg");
  if (d.img) { img.src = d.img.replace("w=1000", "w=1400"); img.alt = d.name; img.style.display = ""; }
  else { img.style.display = "none"; }
  document.getElementById("ovHighlights").innerHTML =
    d.highlights.map(h => `<div class="ov-highlight"><h4>${h[0]}</h4><p>${h[1]}</p></div>`).join("");
  const daysWrap = document.getElementById("ovDaysWrap");
  if (d.days.length) {
    daysWrap.style.display = "";
    document.getElementById("ovDays").innerHTML =
      d.days.map(day => `<li><span class="day-badge"></span><div><strong>${day[0]}</strong><p>${day[1]}</p></div></li>`).join("");
  } else daysWrap.style.display = "none";
  document.getElementById("ovWhats").href =
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Bhavna, I am interested in a trip to " + d.name + ". Please share details.")}`;
  // Plan popup is a Maldives-only pilot — hide its button for other destinations
  document.getElementById("ovPlan").style.display = d.id === "maldives" ? "" : "none";
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
  overlay.querySelector(".overlay-panel").scrollTop = 0;
}
function closeDest() { overlay.hidden = true; document.body.style.overflow = ""; }
document.getElementById("ovClose").addEventListener("click", closeDest);
overlay.addEventListener("click", e => { if (e.target === overlay) closeDest(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeDest(); });
document.querySelectorAll("[data-open]").forEach(el => {
  el.addEventListener("click", () => openDest(el.dataset.open));
  el.addEventListener("keydown", e => { if (e.key === "Enter") openDest(el.dataset.open); });
});
document.getElementById("ovEnquire").addEventListener("click", () => {
  if (currentDest) document.getElementById("fDest").value = currentDest.name;
  closeDest();
  document.getElementById("enquire").scrollIntoView({ behavior: "smooth" });
});

// ---------- Interactive Plan Popup — DYNAMIC (Maldives pilot) ----------
// Behaviour (per Bhavna's correction batch #3): nothing here is a fixed template.
// The client picks an island area -> the resort list rebuilds live from the
// researched per-area dataset below (airport, transfer, resorts, activities,
// inclusions) -> the day-wise itinerary is COMPOSED from the exact selections:
// Day 1 flies them into that area's airport and transfers them to the resort
// they picked; the following days weave in that resort's own activities and
// inclusions (breakfast etc.) plus the area's excursions. Static demo data,
// researched Nov 2026 — Bhavna confirms every detail live before booking.
const planOverlay = document.getElementById("planOverlay");
let planState = null;
function destIdByName(name) { const d = DESTINATIONS.find(x => x.name === name); return d ? d.id : null; }
const DAYS_GROUP = { key: "days", label: "How many days?", options: ["3–4 days", "5–7 days", "8–12 days", "2 weeks +"] };
const DAYS_MAP = { "3–4 days": 4, "5–7 days": 6, "8–12 days": 10, "2 weeks +": 12 };
const MV_STYLES = ["Luxury", "Premium", "Family-friendly", "Budget — local island guesthouse"];

// MV_AREAS lives in data.js (shared with byod.html)

function mvResorts() {
  const a = MV_AREAS[planState.answers.area];
  return a ? a.resorts : [];
}
function mvSelectedResort() {
  return mvResorts().find(r => r.name === planState.answers.resort) || null;
}
function planGroups() {
  const groups = [
    { key: "area", label: "Which island area sounds right?", options: Object.keys(MV_AREAS).map(k => MV_AREAS[k].label) },
    { key: "style", label: "Stay style?", options: MV_STYLES }
  ];
  if (planState.answers.area) groups.push({ key: "resort", label: "Choose your resort / stay", options: mvResorts().map(r => r.name) });
  groups.push(DAYS_GROUP);
  return groups;
}
function renderPlanQuestions() {
  document.getElementById("planTitle").textContent = "Your Maldives plan";
  const wrap = document.getElementById("planQuestions");
  wrap.innerHTML = "";
  planGroups().forEach(g => {
    const div = document.createElement("div");
    div.className = "q-group";
    div.innerHTML = `<p class="q-label">${g.label}</p>`;
    const chips = document.createElement("div");
    chips.className = "chips";
    g.options.forEach(opt => {
      const b = document.createElement("button");
      b.type = "button";
      const val = g.key === "area" ? (Object.keys(MV_AREAS).find(k => MV_AREAS[k].label === opt)) : opt;
      b.className = "chip" + (planState.answers[g.key] === val ? " active" : "");
      b.textContent = opt;
      b.addEventListener("click", () => {
        if (g.key === "area" && planState.answers.area !== val) { planState.answers.resort = ""; }
        planState.answers[g.key] = val;
        renderPlanQuestions();
      });
      chips.appendChild(b);
    });
    div.appendChild(chips);
    if (g.key === "style" && planState.answers.area === "local" && planState.answers.style && planState.answers.style !== "Budget — local island guesthouse") {
      const tip = document.createElement("p");
      tip.className = "resort-tip";
      tip.textContent = "Local islands are the budget route — guesthouses there pair with the 'Budget' style. Resort styles live on the resort atolls above.";
      div.appendChild(tip);
    }
    if (g.key === "resort") {
      const r = mvSelectedResort();
      const det = document.createElement("div");
      det.className = "resort-detail";
      if (r) {
        const home = MV_AREAS[r.area];
        det.innerHTML = `<strong>${r.name}</strong> — ${r.stay}.<br>` +
          `<span>Getting there:</span> ${home.transfer}.<br>` +
          `<span>Signature experiences:</span> ${r.activities.join(" · ")}.<br>` +
          `<span>Typical inclusions (Bhavna confirms):</span> ${r.inclusions.join(", ")}.`;
      } else {
        det.textContent = "Tap a stay to see how you get there, its signature experiences and typical inclusions.";
      }
      div.appendChild(det);
    }
    wrap.appendChild(div);
  });
  if (!planState.answers.area) {
    const hint = document.createElement("p");
    hint.className = "resort-tip";
    hint.textContent = "Pick an island area first — the resort list updates live to match it.";
    wrap.insertBefore(hint, wrap.children[1] || null);
  }
  validatePlan();
}
function validatePlan() {
  const a = planState.answers;
  document.getElementById("planGo").disabled = !(a.area && a.style && a.resort && a.days);
}
function openPlan(destId, preset = {}) {
  // PILOT SCOPE (Rashmi, 19 Nov 2026): the Plan popup is Maldives-only for now.
  // Any other destination keeps the previous behaviour — prefill the enquiry form.
  if (destId && destId !== "maldives") {
    const dd = DESTINATIONS.find(x => x.id === destId);
    if (dd) document.getElementById("fDest").value = dd.name;
    document.getElementById("enquire").scrollIntoView({ behavior: "smooth" });
    return;
  }
  planState = { answers: {}, tourType: preset.tourType || "", date: preset.date || "" };
  if (preset.durLabel) planState.answers.days = preset.durLabel;
  document.getElementById("planStep1").hidden = false;
  document.getElementById("planStep2").hidden = true;
  document.getElementById("planFooter").hidden = true;
  renderPlanQuestions();
  planOverlay.hidden = false;
  document.body.style.overflow = "hidden";
  planOverlay.querySelector(".overlay-body").scrollTop = 0;
}
function closePlan() { planOverlay.hidden = true; document.body.style.overflow = ""; }
document.getElementById("planClose").addEventListener("click", closePlan);
planOverlay.addEventListener("click", e => { if (e.target === planOverlay) closePlan(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closePlan(); });
document.getElementById("planBack").addEventListener("click", () => {
  document.getElementById("planStep2").hidden = true;
  document.getElementById("planFooter").hidden = true;
  document.getElementById("planStep1").hidden = false;
});
document.getElementById("planCloseBtn").addEventListener("click", closePlan);

function composeMaldives(a, n) {
  const R = mvSelectedResort();
  const A = MV_AREAS[R.area];
  const incl = R.inclusions.join(", ");
  const days = [];
  days.push(["Arrive & settle in at " + R.name,
    `Land at ${A.airport}. Your transfer — ${A.transfer} — brings you straight to ${R.name}: ${R.stay}. Check in, freshen up and take a gentle sunset walk. Your stay includes ${incl} (Bhavna confirms the live inclusions for your dates).`]);
  const middles = [];
  const act = R.activities, exc = A.excursions;
  const maxLen = Math.max(act.length, exc.length);
  for (let i = 0; i < maxLen; i++) {
    if (act[i]) middles.push([act[i].split("—")[0].trim(),
      `Breakfast at ${R.name} (included in your stay), then: ${act[i]} — one of the experiences ${R.name} is loved for. Evening at leisure.`]);
    if (exc[i]) middles.push([exc[i].split("(")[0].trim(),
      `After breakfast, head out on the water: ${exc[i]} — a signature ${A.short} excursion, arranged with trusted local operators.`]);
  }
  middles.push(["A slow day, your way",
    `No fixed plan — lagoon, pool and beach at your own pace, with ${R.name}'s team on hand for anything you fancy.`]);
  middles.push(["Second helping of paradise",
    `Revisit your favourite spot from the trip so far, or let Bhavna slot in the one experience you have been saving — she will advise what fits the weather and season.`]);
  const need = n - 2;
  const body = middles.slice(0, need);
  let k = 0;
  while (body.length < need) body.push(middles[k++ % middles.length]);
  days.push(...body);
  const retTransfer = A.transfer.replace(/\s*\([^)]*\)/g, "").replace(/^a |^an /, "the ");
  days.push(["Last morning & departure",
    `Breakfast and one final swim, then ${retTransfer} back to ${A.airport} in time for your flight${A.transfer.includes("seaplane") ? " — seaplanes only fly in daylight, so Bhavna times your departure for you" : ""}.`]);
  return days;
}
let planSummary = "", planDayLines = "";
document.getElementById("planGo").addEventListener("click", () => {
  const a = planState.answers;
  const R = mvSelectedResort();
  const A = MV_AREAS[R.area];
  const n = DAYS_MAP[a.days] || 5;
  const days = composeMaldives(a, n);
  planSummary = R.name + " · " + A.short + " · " + n + " days · " + a.style + (planState.date ? " · from " + planState.date : "");
  planDayLines = days.map((day, i) => "Day " + (i + 1) + ": " + day[0] + " — " + day[1]).join("\n");
  document.getElementById("planMeta").textContent = planSummary;
  document.getElementById("planDays").innerHTML =
    days.map(day => `<li><span class="day-badge"></span><div><strong>${day[0]}</strong><p>${day[1]}</p></div></li>`).join("");
  document.getElementById("planWhats").href = "https://wa.me/" + WA_NUMBER + "?text=" +
    encodeURIComponent("Hi Bhavna! I sketched a trip with your planner:\n" + planSummary + "\n\nMy sample plan:\n" + planDayLines + "\n\nPlease customise this for me.");
  document.getElementById("planStep1").hidden = true;
  document.getElementById("planStep2").hidden = false;
  document.getElementById("planFooter").hidden = false;
  planOverlay.querySelector(".overlay-body").scrollTop = 0;
});
document.getElementById("planContact").addEventListener("click", () => {
  document.getElementById("fDest").value = "Maldives";
  if (planState.tourType) document.getElementById("fTour").value = planState.tourType;
  if (planState.date) document.getElementById("fDate").value = planState.date;
  document.getElementById("fMsg").value = "From the trip planner — " + planSummary + "\nSample plan:\n" + planDayLines;
  closePlan();
  document.getElementById("enquire").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("ovPlan").addEventListener("click", () => {
  const id = currentDest ? currentDest.id : null;
  closeDest();
  openPlan(id);
});

// Hero planning bar -> opens the Plan Popup (destination/duration/date carried in)
document.getElementById("heroSearch").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("hsDest").value;
  const type = document.getElementById("hsType").value;
  const dur = document.getElementById("hsDur").value;
  const dateVal = document.getElementById("hsDate").value;
  const id = name ? destIdByName(name) : null;
  if (id && id !== "maldives") {
    // Non-Maldives destinations: previous behaviour (popup is a Maldives pilot)
    document.getElementById("fDest").value = name;
    if (type) document.getElementById("fTour").value = type;
    if (dateVal) document.getElementById("fDate").value = dateVal;
    const msg = document.getElementById("fMsg");
    if (dur && !msg.value.trim()) msg.value = "Preferred trip duration: " + dur;
    document.getElementById("enquire").scrollIntoView({ behavior: "smooth" });
    return;
  }
  openPlan("maldives", { tourType: type, durLabel: dur || null, date: dateVal });
});

// Category card that just scrolls (Island Escapes)
document.querySelectorAll("[data-goto]").forEach(el => {
  el.addEventListener("click", () => document.querySelector(el.dataset.goto).scrollIntoView({ behavior: "smooth" }));
});

// Testimonials carousel (2 real reviews)
const testiTrack = document.getElementById("testiTrack");
let testiIdx = 0;
function showTesti(i) {
  testiIdx = (i + 2) % 2;
  testiTrack.style.transform = `translateX(-${testiIdx * 100}%)`;
  document.querySelectorAll(".dotb").forEach((d, j) => d.classList.toggle("active", j === testiIdx));
}
document.getElementById("testiPrev").addEventListener("click", () => showTesti(testiIdx - 1));
document.getElementById("testiNext").addEventListener("click", () => showTesti(testiIdx + 1));
document.querySelectorAll(".dotb").forEach(d => d.addEventListener("click", () => showTesti(+d.dataset.slide)));

// Hero slider — 3 slides, smooth crossfade, auto-rotate, dots, pause on hover.
// Reduced motion: no auto-rotation (dots still work, without the zoom).
(function heroSlider() {
  const slides = [...document.querySelectorAll(".hero-slide")];
  const texts = [...document.querySelectorAll(".hero-text")];
  const dots = [...document.querySelectorAll(".hero-dot")];
  if (!slides.length) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let idx = 0, timer = null;
  function go(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, j) => s.classList.toggle("active", j === idx));
    texts.forEach((t, j) => t.classList.toggle("active", j === idx));
    dots.forEach((d, j) => d.classList.toggle("active", j === idx));
  }
  function start() { if (!reduced && !timer) timer = setInterval(() => go(idx + 1), 6000); }
  function stop() { clearInterval(timer); timer = null; }
  dots.forEach(d => d.addEventListener("click", () => { stop(); go(+d.dataset.slide); start(); }));
  const hero = document.querySelector(".hero");
  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", start);
  start();
})();

// Parallax — transform-only, single rAF loop, no libraries.
// Hero background drifts slower than the headline; doodles float at their own
// speeds; section photos shift gently. Fully disabled for reduced motion.
(function parallax() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const heroImg = document.getElementById("heroMedia");
  const heroContent = document.querySelector(".hero-content");
  const hero = document.querySelector(".hero");
  const doodles = [...document.querySelectorAll(".doodle")];
  const plxImgs = [...document.querySelectorAll("img[data-plx-img]")];
  let ticking = false;
  function update() {
    ticking = false;
    const vh = innerHeight;
    // Hero: background at ~30% scroll speed, headline at ~88% (lags just a touch)
    const hr = hero.getBoundingClientRect();
    if (hr.bottom > 0) {
      const y = Math.max(0, -hr.top);
      heroImg.style.transform = `translate3d(0, ${y * 0.30}px, 0)`;
      heroContent.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
    }
    // Doodles: offset by distance of their section from viewport centre × speed
    doodles.forEach(d => {
      const r = d.parentElement.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const delta = (r.top + r.height / 2 - vh / 2) * parseFloat(d.dataset.speed || 0.05);
      d.style.transform = `translate3d(0, ${delta.toFixed(1)}px, 0)`;
    });
    // Section photos: gentle ±10px drift based on scroll progress through viewport
    plxImgs.forEach(img => {
      const r = img.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const progress = (vh - r.top) / (vh + r.height);
      const shift = (progress - 0.5) * 20;
      img.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0) scale(1.07)`;
    });
  }
  addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  addEventListener("resize", () => requestAnimationFrame(update), { passive: true });
  update();
})();

// Offers strip (demo-only: no sending, no saving)
document.getElementById("offersForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("offersDone").hidden = false;
  e.target.reset();
});

// Special tours -> prefill tour type
document.querySelectorAll("[data-tour]").forEach(el => {
  el.addEventListener("click", () => {
    document.getElementById("fTour").value = el.dataset.tour;
    document.getElementById("enquire").scrollIntoView({ behavior: "smooth" });
  });
});

// Header + nav
const header = document.getElementById("siteHeader");
addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 10), { passive: true });
const navToggle = document.getElementById("navToggle");
const mainNav = document.querySelector(".main-nav");
navToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
  if (open) {
    // Pin the header to the top when the menu opens: the panel's height
    // budget assumes a stuck header, so opening at scroll 0 (banner +
    // top bar still above the header) would push the panel's tail —
    // Contact and Admin — behind the fixed bottom bar, unreachable.
    const header = document.querySelector("header");
    if (header && header.getBoundingClientRect().top > 0) {
      window.scrollTo(0, window.scrollY + header.getBoundingClientRect().top);
    }
  }
});
mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => closeNavAndDrops()));

// ---------- Header dropdowns, stories, admin (Batch #4) ----------
function closeNavAndDrops() {
  mainNav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  document.querySelectorAll(".has-drop").forEach(x => {
    x.classList.remove("open");
    // Clear the hover-intent latch and its pending grace timer too, so a
    // dismissal (pick / Escape / outside click) cannot be undone by a
    // timer or latch that was set before it (Batch #5 hardening).
    clearTimeout(x._ht);
    delete x.dataset.hoverOpen;
    // Suppress hover re-open until the pointer leaves the item: without
    // this, choosing a country scrolled to the form while the CSS :hover
    // kept the panel floating over it (the pointer never left the header).
    x.classList.add("drop-suppress");
    const b = x.querySelector(".drop-btn");
    if (b) b.setAttribute("aria-expanded", "false");
  });
}
document.querySelectorAll(".has-drop").forEach(item => {
  item.addEventListener("mouseleave", () => item.classList.remove("drop-suppress"));
  // A fresh entry also clears it: a dismissal from an outside click (pointer
  // already outside) must not leave the next deliberate hover dead.
  item.addEventListener("mouseenter", () => item.classList.remove("drop-suppress"));
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeNavAndDrops(); });
document.querySelectorAll(".drop-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();
    const item = btn.closest(".has-drop");
    item.classList.remove("drop-suppress");
    const was = item.classList.contains("open");
    document.querySelectorAll(".has-drop.open").forEach(x => {
      x.classList.remove("open");
      x.querySelector(".drop-btn").setAttribute("aria-expanded", "false");
    });
    if (!was) { item.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
  });
});
document.addEventListener("click", e => {
  if (!e.target.closest(".has-drop")) closeNavAndDrops();
});
// Desktop hover intent: the mega-panel is centred on the page while its
// button sits left of centre, so a diagonal pointer move toward the far
// columns can briefly leave both button and panel and drop the hover.
// Latch the menu open on mouseenter (fine pointers only) and give it a
// short grace period before closing, so the dropdown never traps a click.
if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.querySelectorAll(".has-drop").forEach(item => {
    item.addEventListener("mouseenter", () => {
      if (!matchMedia("(min-width: 901px)").matches) return;
      clearTimeout(item._ht);
      item.classList.add("open");
      item.dataset.hoverOpen = "1";
      item.querySelector(".drop-btn").setAttribute("aria-expanded", "true");
    });
    item.addEventListener("mouseleave", () => {
      if (!item.dataset.hoverOpen) return;
      item._ht = setTimeout(() => {
        item.classList.remove("open");
        delete item.dataset.hoverOpen;
        item.querySelector(".drop-btn").setAttribute("aria-expanded", "false");
      }, 400);
    });
  });
}
// Match the Special Tours panel height to the Destinations mega-panel
// (Batch #5, Rashmi's side-by-side photo): both panels share the same top,
// so flooring the drop at the mega's rendered height aligns their bottoms.
function matchDropHeight() {
  const mega = document.querySelector(".mega");
  const drop = document.querySelector(".drop");
  if (!mega || !drop) return;
  drop.style.minHeight = matchMedia("(min-width: 901px)").matches ? mega.offsetHeight + "px" : "";
}
window.addEventListener("resize", matchDropHeight);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(matchDropHeight);
matchDropHeight();
// Destinations dropdown: places with content open their destination view
document.querySelectorAll("[data-dest-id]").forEach(a => a.addEventListener("click", e => {
  e.preventDefault();
  closeNavAndDrops();
  const d = DESTINATIONS.find(x => x.id === a.dataset.destId);
  if (d) openDest(d.id);
}));
// Destinations dropdown: new countries pre-pick the enquiry form (no lead lost)
document.querySelectorAll("[data-dest-name]").forEach(a => a.addEventListener("click", () => {
  document.getElementById("fDest").value = a.dataset.destName;
  closeNavAndDrops();
}));
// Offers (Batch #5): an offer's Enquire pre-picks its destination and notes the offer
document.querySelectorAll(".offer-btn").forEach(b => b.addEventListener("click", () => {
  document.getElementById("fDest").value = b.dataset.offerDest;
  const msg = document.getElementById("fMsg");
  if (msg && !msg.value) msg.value = "I'm interested in your " + b.dataset.offerTitle + " offer.";
  document.getElementById("enquire").scrollIntoView({ behavior: "smooth" });
}));
// Stories: destination story cards from real destination content
(function stories() {
  const grid = document.getElementById("storyGrid");
  if (!grid) return;
  grid.innerHTML = DESTINATIONS.map(d => `
    <article class="story-card" data-story="${d.id}">
      ${d.img ? `<img src="${d.img}" alt="${d.name}" loading="lazy">` : `<div class="story-grad">${d.name}</div>`}
      <div class="story-body"><h3>${d.name}</h3><p>${d.card}</p><span class="story-link">Explore this story →</span></div>
    </article>`).join("");
  grid.querySelectorAll("[data-story]").forEach(c => c.addEventListener("click", () => {
    const d = DESTINATIONS.find(x => x.id === c.dataset.story);
    if (d) openDest(d.id);
  }));
})();
// Admin login (demo placeholder — Phase 2 toolkit)
const adminOverlay = document.getElementById("adminOverlay");
function closeAdmin() { adminOverlay.hidden = true; document.body.style.overflow = ""; }
document.getElementById("adminLink").addEventListener("click", e => {
  e.preventDefault();
  closeNavAndDrops();
  adminOverlay.hidden = false;
  document.body.style.overflow = "hidden";
});
document.getElementById("adminClose").addEventListener("click", closeAdmin);
adminOverlay.addEventListener("click", e => { if (e.target === adminOverlay) closeAdmin(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeAdmin(); });
document.getElementById("adminForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("adminNote").hidden = false;
});
// BYOD page handoff: a plan built on byod.html pre-fills this form
try {
  const bd = localStorage.getItem("ee_byod_dest");
  const bm = localStorage.getItem("ee_byod_msg");
  if (bd) { document.getElementById("fDest").value = bd; localStorage.removeItem("ee_byod_dest"); }
  if (bm) { document.getElementById("fMsg").value = bm; localStorage.removeItem("ee_byod_msg"); }
} catch (err) { /* localStorage unavailable — enquiry form simply starts blank */ }

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Enquiry form (demo: validates + composes a WhatsApp message; nothing is sent to a server)
document.getElementById("enquiryForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target;
  const err = document.getElementById("formError");
  const name = f.name.value.trim(), phone = f.phone.value.trim(), dest = f.destination.value;
  if (!name || !phone || !dest) { err.textContent = "Please add your name, phone number and a destination — that's all Bhavna needs to start."; return; }
  if (phone.replace(/\D/g, "").length < 10) { err.textContent = "That phone number looks short — please check it so Bhavna can reach you."; return; }
  err.textContent = "";
  const lines = [
    "New trip enquiry — Elite Exposures Travel website",
    "Name: " + name, "Phone: " + phone,
    f.email.value.trim() ? "Email: " + f.email.value.trim() : null,
    "Destination: " + dest, "Tour type: " + f.tourType.value,
    f.date.value ? "Travel date: " + f.date.value + " (" + f.flexibility.value + ")" : "Travel date: flexible / exploring",
    "Travellers: " + f.adults.value + " adults, " + f.children.value + " children",
    "Budget per person: " + f.budget.value,
    f.message.value.trim() ? "Notes: " + f.message.value.trim() : null
  ].filter(Boolean).join("\n");
  document.getElementById("successText").textContent =
    `Thank you, ${name.split(" ")[0]}! Your ${dest} enquiry is fully ready — in the live website it would already be in Bhavna's inbox. For this demo, you can send it yourself on WhatsApp:`;
  document.getElementById("successWhats").href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`;
  const s = document.getElementById("formSuccess");
  s.hidden = false;
  s.scrollIntoView({ behavior: "smooth", block: "center" });
});
