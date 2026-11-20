// Elite Exposures Travel — Admin Panel v1 (template, demo only)
// Demo-level wiring: content tools save to this browser's localStorage and
// the homepage reads the same keys. Production storage/security is Phase 2.
if (sessionStorage.getItem("ee_admin") !== "1") location.replace("index.html");

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const fmt = n => "₹" + Number(n || 0).toLocaleString("en-IN");
const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const DEST_NAMES = DESTINATIONS.map(d => d.name);
const STATUSES = ["New enquiry", "Called", "Awaiting DMC quotes", "Quote sent", "Booked", "Travelled", "Review/Referral asked"];

function load(key, seed) {
  try { const v = JSON.parse(localStorage.getItem(key) || "null"); if (v !== null) return v; } catch (e) {}
  return JSON.parse(JSON.stringify(seed));
}
function store(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

// ---------- Icons (inline SVG, one set for nav + dashboard cards) ----------
const IC = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ICONS = {
  dashboard: IC('<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>'),
  offers: IC('<rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5.5 12v7A1.5 1.5 0 0 0 7 20.5h10A1.5 1.5 0 0 0 18.5 19v-7M12 8v12.5"/><path d="M12 8c-1.8 0-3.5-1-3.5-2.4C8.5 4.2 10 3.5 11 4c1 .6 1 4 1 4Zm0 0c1.8 0 3.5-1 3.5-2.4 0-1.4-1.5-2.1-2.5-1.6-1 .6-1 4-1 4Z"/>'),
  gallery: IC('<rect x="3.5" y="5" width="17" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4.5 17.5 10 12l3.5 3L17 11.5l2.5 3"/>'),
  stories: IC('<path d="M12 6.5C10 5 7.5 4.5 4.5 4.8v13c3-.3 5.5.2 7.5 1.7 2-1.5 4.5-2 7.5-1.7v-13c-3-.3-5.5.2-7.5 1.7Zm0 0v13"/>'),
  quote: IC('<path d="M6 3.5h12V20l-2-1.4L14 20l-2-1.4L10 20l-2-1.4L6 20Z"/><path d="M9.5 8.5h5M9.5 12h5"/>'),
  itinerary: IC('<path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4Zm0 0v14m6-12v14"/>'),
  invoice: IC('<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M6.5 15h4"/>'),
  worksheet: IC('<path d="M4 4v15.5h16"/><path d="M8.5 16v-5M13 16V8m4.5 8v-3"/>'),
  leads: IC('<circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19.5c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5M16 5.7a3.2 3.2 0 0 1 0 5.9m2.3 3.6c1.2.7 2 1.9 2.3 3.8"/>')
};
$$(".nav-ic").forEach(el => { el.innerHTML = ICONS[el.dataset.icon] || ""; });

// ---------- Seeds (sample data) ----------
const SEED_OFFERS = [
  { img: "https://images.unsplash.com/photo-1595184979141-090792f6b578?auto=format&fit=crop&w=800", title: "Honeymoon Bliss — Maldives", line: "A complimentary sunset cruise and a candlelight dinner on the beach, arranged for couples.", valid: "31 Mar 2027", dest: "Maldives" },
  { img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800", title: "Family Fun — Bali", line: "Complimentary airport transfers and a free family day tour with every Bali family package.", valid: "30 Apr 2027", dest: "Bali" },
  { img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800", title: "City Break Bonus — Dubai", line: "A complimentary desert safari upgrade with every Dubai package booked this season.", valid: "31 May 2027", dest: "Dubai" }
];
const SEED_GALLERY = DESTINATIONS.filter(d => d.img).slice(0, 8).map(d => ({ img: d.img, name: d.name, destId: d.id }));
const SEED_STORIES = DESTINATIONS.map(d => ({ id: d.id, title: d.name, text: d.card, img: d.img || "" }));
const SEED_LEADS = [
  { name: "Rohit Sharma", phone: "+91 98110 22334", dest: "Maldives", source: "Instagram Ad", status: "Quote sent", added: "18 Nov 2026" },
  { name: "Priya Nair", phone: "+91 98200 11223", dest: "Bali", source: "Past Client", status: "Booked", added: "15 Nov 2026" },
  { name: "Karan Mehta", phone: "+91 98990 44556", dest: "Dubai", source: "Instagram Ad", status: "Called", added: "19 Nov 2026" },
  { name: "Sana Sheikh", phone: "+91 98104 77889", dest: "Thailand", source: "Referral", status: "New enquiry", added: "20 Nov 2026" },
  { name: "Col. R. Verma", phone: "+91 98118 99001", dest: "Vietnam", source: "Past Client", status: "Travelled", added: "02 Nov 2026" },
  { name: "Ananya Iyer", phone: "+91 99300 33445", dest: "Seychelles", source: "Website", status: "Awaiting DMC quotes", added: "20 Nov 2026" }
];
const SEED_WORKSHEET = {
  month: "November 2026",
  rows: [
    { date: "2026-11-03", client: "Priya Nair", dest: "Bali", type: "Advance received", details: "50% advance — Bali family package", amount: 50000 },
    { date: "2026-11-05", client: "Priya Nair", dest: "Bali", type: "DMC payment", details: "Paid Bali DMC — hotels + transfers", amount: -68500 },
    { date: "2026-11-08", client: "Col. R. Verma", dest: "Vietnam", type: "Final payment received", details: "Balance for Vietnam tour", amount: 42000 },
    { date: "2026-11-11", client: "—", dest: "—", type: "Expense", details: "Instagram ads — November", amount: -8000 },
    { date: "2026-11-14", client: "Rohit Sharma", dest: "Maldives", type: "Advance received", details: "Honeymoon package advance", amount: 60000 },
    { date: "2026-11-17", client: "Rohit Sharma", dest: "Maldives", type: "DMC payment", details: "Resort booking — first instalment", amount: -55000 }
  ]
};

// ---------- Router ----------
const TITLES = { dashboard: "Dashboard", offers: "Offers Manager", gallery: "Gallery Manager", stories: "Stories Manager", quote: "Quote Builder", itinerary: "Itinerary Builder", invoice: "Invoice Builder", worksheet: "Worksheet", leads: "Leads / Client List" };
function goto(view) {
  $$(".view").forEach(v => v.hidden = v.id !== "view-" + view);
  $$("#adminNav button").forEach(b => b.classList.toggle("active", b.dataset.view === view));
  $("#viewTitle").textContent = TITLES[view];
  window.scrollTo(0, 0);
}
$$("#adminNav button").forEach(b => b.addEventListener("click", () => goto(b.dataset.view)));
$("#logoutBtn").addEventListener("click", () => { sessionStorage.removeItem("ee_admin"); location.href = "index.html"; });
$("#sideToggle").addEventListener("click", () => $("#adminSide").scrollIntoView({ behavior: "smooth" }));

// ---------- Dashboard ----------
const TOOLS = [
  ["offers", "offers", "Offers Manager", "Add, edit or remove the homepage offer cards."],
  ["gallery", "gallery", "Gallery Manager", "Choose the photos on the homepage gallery."],
  ["stories", "stories", "Stories Manager", "Edit story cards and write new ones."],
  ["quote", "quote", "Quote Builder", "DMC cost + commission → a client-ready quote."],
  ["itinerary", "itinerary", "Itinerary Builder", "Day-wise plans you can print or save as PDF."],
  ["invoice", "invoice", "Invoice Builder", "Simple invoices with advance and balance."],
  ["worksheet", "worksheet", "Worksheet", "Your monthly working sheet, editable + CSV."],
  ["leads", "leads", "Leads / Clients", "Every enquiry in one searchable list."]
];
function renderDashboard() {
  const offers = load("ee_offers", SEED_OFFERS), gallery = load("ee_gallery", SEED_GALLERY),
        stories = load("ee_stories", SEED_STORIES), leads = load("ee_leads", SEED_LEADS);
  $("#dashStats").innerHTML = [
    [offers.length, "Offers live"], [gallery.length, "Gallery photos"], [stories.length, "Story cards"],
    [leads.length, "Leads tracked"], [leads.filter(l => l.status === "New enquiry").length, "New enquiries"]
  ].map(([n, l]) => `<div class="stat-chip"><strong>${n}</strong><span>${l}</span></div>`).join("");
  $("#toolGrid").innerHTML = TOOLS.map(([v, icon, name, blurb]) =>
    `<button class="tool-card" data-goto="${v}"><span class="tc-icon">${ICONS[icon] || ""}</span><h3>${name}</h3><p>${blurb}</p></button>`).join("");
  $$("#toolGrid [data-goto]").forEach(c => c.addEventListener("click", () => goto(c.dataset.goto)));
}

// ---------- Content editors (shared pattern) ----------
function editorSave(btnId, statusId, key, getState, noun) {
  $(btnId).addEventListener("click", () => {
    store(key, getState());
    $(statusId).textContent = "Saved ✓ — open the homepage in this browser to see your " + noun + " live.";
    renderDashboard();
  });
  $(btnId.replace("Save", "Reset")).addEventListener("click", () => {
    localStorage.removeItem(key);
    $(statusId).textContent = "Reset to the sample " + noun + ".";
  });
}

// Offers
let offersState = load("ee_offers", SEED_OFFERS);
function renderOffers() {
  $("#offerList").innerHTML = offersState.map((o, i) => `
    <div class="editor-card" style="flex-direction:row;flex-wrap:wrap;align-items:flex-start">
      <img src="${esc(o.img)}" alt="" style="width:150px;height:100px">
      <div style="flex:1;min-width:230px;display:flex;flex-direction:column;gap:.55rem">
        <label>Offer title <input data-k="title" data-i="${i}" value="${esc(o.title)}"></label>
        <label>Short line <input data-k="line" data-i="${i}" value="${esc(o.line)}"></label>
        <label>Photo link <input data-k="img" data-i="${i}" value="${esc(o.img)}"></label>
        <div class="form-2col">
          <label>Valid till <input data-k="valid" data-i="${i}" value="${esc(o.valid)}"></label>
          <label>Destination <select data-k="dest" data-i="${i}">${DEST_NAMES.map(n => `<option ${n === o.dest ? "selected" : ""}>${n}</option>`).join("")}</select></label>
        </div>
        <div class="card-actions"><button class="btn-danger" data-del="${i}" type="button">Remove offer</button></div>
      </div>
    </div>`).join("");
  bindEditor("#offerList", offersState, renderOffers);
}
function bindEditor(sel, state, rerender) {
  $$(sel + " [data-k]").forEach(inp => inp.addEventListener("input", () => {
    const i = +inp.dataset.i;
    state[i][inp.dataset.k] = inp.tagName === "SELECT" ? inp.value : inp.value;
    if (inp.dataset.k === "img" && inp.closest(".editor-card")) {
      const img = inp.closest(".editor-card").querySelector("img");
      if (img) img.src = inp.value;
    }
  }));
  $$(sel + " [data-del]").forEach(b => b.addEventListener("click", () => { state.splice(+b.dataset.del, 1); rerender(); }));
}
$("#offerAdd").addEventListener("click", () => { offersState.push({ img: "", title: "New Offer", line: "", valid: "31 Dec 2027", dest: "Maldives" }); renderOffers(); });
editorSave("#offerSave", "#offerStatus", "ee_offers", () => offersState, "offers");
$("#offerReset").addEventListener("click", () => { offersState = JSON.parse(JSON.stringify(SEED_OFFERS)); renderOffers(); });

// Gallery
let galleryState = load("ee_gallery", SEED_GALLERY);
function renderGallery() {
  $("#galleryList").innerHTML = galleryState.map((g, i) => `
    <div class="editor-card">
      <img src="${esc(g.img)}" alt="">
      <label>Photo link <input data-k="img" data-i="${i}" value="${esc(g.img)}"></label>
      <label>Caption / name <input data-k="name" data-i="${i}" value="${esc(g.name)}"></label>
      <label>Opens destination <select data-k="destId" data-i="${i}">
        <option value="">— just a photo —</option>
        ${DESTINATIONS.map(d => `<option value="${d.id}" ${d.id === g.destId ? "selected" : ""}>${d.name}</option>`).join("")}
      </select></label>
      <div class="card-actions"><button class="btn-danger" data-del="${i}" type="button">Remove photo</button></div>
    </div>`).join("");
  bindEditor("#galleryList", galleryState, renderGallery);
}
$("#galleryAdd").addEventListener("click", () => { galleryState.push({ img: "", name: "New photo", destId: "" }); renderGallery(); });
editorSave("#gallerySave", "#galleryStatus", "ee_gallery", () => galleryState, "gallery");
$("#galleryReset").addEventListener("click", () => { galleryState = JSON.parse(JSON.stringify(SEED_GALLERY)); renderGallery(); });

// Stories
let storiesState = load("ee_stories", SEED_STORIES);
function renderStories() {
  $("#storyList").innerHTML = storiesState.map((s, i) => `
    <div class="editor-card" style="flex-direction:row;flex-wrap:wrap;align-items:flex-start">
      ${s.img ? `<img src="${esc(s.img)}" alt="" style="width:150px;height:100px">` : ""}
      <div style="flex:1;min-width:230px;display:flex;flex-direction:column;gap:.55rem">
        <label>Story title <input data-k="title" data-i="${i}" value="${esc(s.title)}"></label>
        <label>Story text <textarea data-k="text" data-i="${i}" rows="3">${esc(s.text)}</textarea></label>
        <label>Photo link <input data-k="img" data-i="${i}" value="${esc(s.img)}"></label>
        <div class="card-actions"><button class="btn-danger" data-del="${i}" type="button">Remove story</button></div>
      </div>
    </div>`).join("");
  bindEditor("#storyList", storiesState, renderStories);
}
$("#storyAdd").addEventListener("click", () => { storiesState.push({ id: "custom-" + Date.now(), title: "New Story", text: "", img: "" }); renderStories(); });
editorSave("#storySave", "#storyStatus", "ee_stories", () => storiesState, "stories");
$("#storyReset").addEventListener("click", () => { storiesState = JSON.parse(JSON.stringify(SEED_STORIES)); renderStories(); });

// ---------- Quote Builder ----------
function fillDestSelect(sel, current) {
  sel.innerHTML = DEST_NAMES.map(n => `<option ${n === current ? "selected" : ""}>${n}</option>`).join("");
}
fillDestSelect($("#qDest"), "Maldives");
fillDestSelect($("#iDest"), "Maldives");
fillDestSelect($("#leadDest"), "Maldives");

function quoteFinal() {
  const cost = +$("#qCost").value || 0, pct = +$("#qPct").value || 0, over = +$("#qOverride").value || 0;
  return over > 0 ? over : Math.round(cost * (1 + pct / 100));
}
function renderQuote() {
  const final = quoteFinal();
  $("#qFinal").textContent = fmt(final);
  const days = $("#qDays").value.split("\n").map(s => s.trim()).filter(Boolean);
  const dateStr = $("#qDate").value ? new Date($("#qDate").value + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";
  $("#quotePreview").innerHTML = `
    <p class="doc-script">Elite Exposures Travel</p>
    <h3>Travel Quote — ${esc($("#qDest").value)}</h3>
    <p class="doc-meta">Prepared for <strong>${esc($("#qClient").value)}</strong>${$("#qPhone").value ? " · " + esc($("#qPhone").value) : ""}<br>
    Travel date: ${dateStr} · ${$("#qNights").value} nights · ${$("#qAdults").value} adults${+$("#qChildren").value ? " · " + $("#qChildren").value + " children" : ""}</p>
    ${days.length ? `<ul class="doc-lines">${days.map(d => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
    <div class="doc-total"><span>Total payable</span><strong>${fmt(final)}</strong></div>
    <p class="doc-foot">This quote is valid for 7 days. Every detail is confirmed personally by Bhavna before you book.<br>
    Elite Exposures Travel · bhavna@eliteexposures.in · WhatsApp +91 8860145084</p>`;
}
$("#quoteForm").addEventListener("input", renderQuote);
$("#quotePrint").addEventListener("click", () => window.print());
$("#quoteSave").addEventListener("click", () => {
  const saved = load("ee_quotes", []);
  saved.unshift({ client: $("#qClient").value, dest: $("#qDest").value, final: quoteFinal(), when: new Date().toLocaleDateString("en-IN") });
  store("ee_quotes", saved);
  $("#quoteStatus").textContent = "Quote saved ✓ (private list below)";
  renderSavedQuotes();
});
function renderSavedQuotes() {
  const saved = load("ee_quotes", []);
  $("#quoteSaved").innerHTML = saved.length ? "<h3 style='color:var(--navy)'>Saved quotes</h3>" + saved.map(q =>
    `<div class="saved-item"><span>${esc(q.client)} — ${esc(q.dest)}</span><strong>${fmt(q.final)}</strong><span>${esc(q.when)}</span></div>`).join("") : "";
}

// ---------- Itinerary Builder ----------
let itinDays = [
  { title: "Arrival in the Maldives", text: "Land at Velana International Airport, Malé. Speedboat transfer to the resort, welcome drinks and an evening at leisure." },
  { title: "Reef & Dolphins", text: "Morning snorkelling on the house reef; late-afternoon dolphin cruise." },
  { title: "Spa & Sunset", text: "Spa session in the morning; sunset fishing trip in the evening." },
  { title: "Your Day, Your Way", text: "A free day — water sports, a sandbank picnic, or simply the beach." },
  { title: "Departure", text: "Breakfast, a final swim, and your transfer back to Malé for the flight home." }
];
function renderItin() {
  $("#itinDays").innerHTML = itinDays.map((d, i) => `
    <div class="editor-card">
      <label>Day ${i + 1} title <input data-k="title" data-i="${i}" value="${esc(d.title)}"></label>
      <label>Details <textarea data-k="text" data-i="${i}" rows="2">${esc(d.text)}</textarea></label>
      <div class="card-actions"><button class="btn-danger" data-del="${i}" type="button">Remove day</button></div>
    </div>`).join("");
  bindEditor("#itinDays", itinDays, renderItin);
  renderItinPreview();
}
function renderItinPreview() {
  $("#itinPreview").innerHTML = `
    <p class="doc-script">Elite Exposures Travel</p>
    <h3>${esc($("#iTitle").value)}</h3>
    <p class="doc-meta">Prepared for <strong>${esc($("#iClient").value)}</strong> · ${esc($("#iDest").value)}</p>
    <ul class="doc-lines">${itinDays.map((d, i) => `<li><strong>Day ${i + 1}: ${esc(d.title)}</strong> — ${esc(d.text)}</li>`).join("")}</ul>
    <p class="doc-foot">Sample plan — Bhavna confirms every detail personally before you book. Price on enquiry.<br>
    Elite Exposures Travel · bhavna@eliteexposures.in · WhatsApp +91 8860145084</p>`;
}
$("#itinForm").addEventListener("input", renderItinPreview);
$("#itinAdd").addEventListener("click", () => { itinDays.push({ title: "", text: "" }); renderItin(); });
$("#itinPrint").addEventListener("click", () => window.print());

// ---------- Invoice Builder ----------
let invItems = [
  { desc: "Bali family package — 6 nights, hotels + transfers (Priya Nair)", amount: 118000 },
  { desc: "Travel insurance — family cover", amount: 4500 }
];
function invTotal() { return invItems.reduce((s, x) => s + (+x.amount || 0), 0); }
function renderInv() {
  $("#invItems").innerHTML = invItems.map((x, i) => `
    <div class="editor-card" style="flex-direction:row;gap:.6rem;align-items:flex-end;flex-wrap:wrap">
      <label style="flex:2;min-width:200px">Description <input data-k="desc" data-i="${i}" value="${esc(x.desc)}"></label>
      <label style="flex:1;min-width:110px">Amount (₹) <input data-k="amount" data-i="${i}" type="number" min="0" value="${x.amount}"></label>
      <button class="btn-danger" data-del="${i}" type="button">Remove</button>
    </div>`).join("");
  bindEditor("#invItems", invItems, renderInv);
  renderInvPreview();
}
function renderInvPreview() {
  const total = invTotal(), adv = +$("#invAdvance").value || 0;
  $("#invTotal").textContent = fmt(total);
  $("#invBalance").textContent = fmt(total - adv);
  const dateStr = $("#invDate").value ? new Date($("#invDate").value + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";
  $("#invPreview").innerHTML = `
    <p class="doc-script">Elite Exposures Travel</p>
    <h3>Invoice ${esc($("#invNo").value)}</h3>
    <p class="doc-meta">Date: ${dateStr}<br>Billed to <strong>${esc($("#invClient").value)}</strong>${$("#invPhone").value ? " · " + esc($("#invPhone").value) : ""}</p>
    <table class="doc-table"><tr><th>Description</th><th>Amount</th></tr>
    ${invItems.map(x => `<tr><td>${esc(x.desc)}</td><td>${fmt(x.amount)}</td></tr>`).join("")}
    <tr><td><strong>Total</strong></td><td><strong>${fmt(total)}</strong></td></tr>
    <tr><td>Advance paid</td><td>${fmt(adv)}</td></tr>
    <tr><td><strong>Balance due</strong></td><td><strong>${fmt(total - adv)}</strong></td></tr></table>
    <p class="doc-foot">Thank you for travelling with us.<br>
    Elite Exposures Travel · 243, Tower B3, Spaze I Tech Park, Gurugram · bhavna@eliteexposures.in · +91 8860145084</p>`;
}
$("#invForm").addEventListener("input", renderInvPreview);
$("#invAdd").addEventListener("click", () => { invItems.push({ desc: "", amount: 0 }); renderInv(); });
$("#invPrint").addEventListener("click", () => window.print());

// ---------- Worksheet ----------
let wsState = load("ee_worksheet", SEED_WORKSHEET);
function wsSum() { return wsState.rows.reduce((s, r) => s + (+r.amount || 0), 0); }
function renderWorksheet() {
  $("#wsMonth").value = wsState.month;
  $("#wsBody").innerHTML = wsState.rows.map((r, i) => `
    <tr>
      <td><input type="date" data-k="date" data-i="${i}" value="${esc(r.date)}"></td>
      <td><input data-k="client" data-i="${i}" value="${esc(r.client)}"></td>
      <td><input data-k="dest" data-i="${i}" value="${esc(r.dest)}"></td>
      <td><input data-k="type" data-i="${i}" value="${esc(r.type)}"></td>
      <td><input data-k="details" data-i="${i}" value="${esc(r.details)}"></td>
      <td><input type="number" data-k="amount" data-i="${i}" value="${r.amount}"></td>
      <td><button class="row-del" data-del="${i}" type="button" aria-label="Delete row">✕</button></td>
    </tr>`).join("");
  $$("#wsBody [data-k]").forEach(inp => inp.addEventListener("input", () => {
    const i = +inp.dataset.i;
    wsState.rows[i][inp.dataset.k] = inp.dataset.k === "amount" ? +inp.value || 0 : inp.value;
    $("#wsTotal").textContent = fmt(wsSum());
  }));
  $$("#wsBody [data-del]").forEach(b => b.addEventListener("click", () => { wsState.rows.splice(+b.dataset.del, 1); renderWorksheet(); }));
  $("#wsTotal").textContent = fmt(wsSum());
}
$("#wsMonth").addEventListener("input", () => wsState.month = $("#wsMonth").value);
$("#wsAdd").addEventListener("click", () => { wsState.rows.push({ date: "", client: "", dest: "", type: "", details: "", amount: 0 }); renderWorksheet(); });
$("#wsSave").addEventListener("click", () => { store("ee_worksheet", wsState); $("#wsStatus").textContent = "Sheet saved ✓"; });
$("#wsDownload").addEventListener("click", () => {
  const rows = [["Date", "Client", "Destination", "Type", "Details", "Amount (INR)"],
    ...wsState.rows.map(r => [r.date, r.client, r.dest, r.type, r.details, r.amount]),
    ["", "", "", "", "Total", wsSum()]];
  const csv = rows.map(r => r.map(c => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = "worksheet-" + (wsState.month || "month").replace(/\s+/g, "-").toLowerCase() + ".csv";
  a.click();
  URL.revokeObjectURL(a.href);
});

// ---------- Leads ----------
let leadsState = load("ee_leads", SEED_LEADS);
function renderLeads() {
  $("#leadBody").innerHTML = leadsState.map((l, i) => `
    <tr>
      <td>${esc(l.name)}</td><td>${esc(l.phone)}</td><td>${esc(l.dest)}</td><td>${esc(l.source)}</td>
      <td><select data-i="${i}">${STATUSES.map(s => `<option ${s === l.status ? "selected" : ""}>${s}</option>`).join("")}</select></td>
      <td>${esc(l.added)}</td>
      <td><button class="row-del" data-del="${i}" type="button" aria-label="Delete lead">✕</button></td>
    </tr>`).join("");
  $$("#leadBody select").forEach(sel => sel.addEventListener("change", () => {
    leadsState[+sel.dataset.i].status = sel.value;
    store("ee_leads", leadsState);
    $("#leadStatus").textContent = "Status saved ✓";
    renderDashboard();
  }));
  $$("#leadBody [data-del]").forEach(b => b.addEventListener("click", () => {
    leadsState.splice(+b.dataset.del, 1);
    store("ee_leads", leadsState);
    renderLeads(); renderDashboard();
  }));
}
$("#leadForm").addEventListener("submit", e => {
  e.preventDefault();
  leadsState.unshift({
    name: $("#leadName").value.trim(), phone: $("#leadPhone").value.trim(),
    dest: $("#leadDest").value, source: $("#leadSource").value,
    status: "New enquiry", added: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
  });
  store("ee_leads", leadsState);
  e.target.reset();
  $("#leadStatus").textContent = "Lead added ✓";
  renderLeads(); renderDashboard();
});

// Forms are live editors — never let Enter reload the page.
["#quoteForm", "#itinForm", "#invForm"].forEach(f => $(f).addEventListener("submit", e => e.preventDefault()));

// ---------- Init ----------
renderDashboard();
renderOffers();
renderGallery();
renderStories();
renderQuote();
renderSavedQuotes();
renderItin();
renderInv();
renderWorksheet();
renderLeads();
