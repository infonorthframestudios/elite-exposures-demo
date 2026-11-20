// Elite Exposures Travel — DMC document parser (Quote Builder v2)
// Pure, dependency-free: consumes "blocks" extracted from a document
//   [{ type:"p", text } | { type:"table", rows:[[cellText,...],...] }]
// (cell text may contain \n) and returns structured fields + confidence.
// Also used by the Node test harness against real DMC documents.
(function (global) {
  "use strict";

  const COUNTRIES = [
    ["Sri Lanka", ["sri lanka", "srilanka", "ceylon", ".lk"]],
    ["Maldives", ["maldives", "malé", "male airport", "velana"]],
    ["Bali", ["bali", "ubud", "kuta", "seminyak", "nusa dua"]],
    ["Indonesia", ["indonesia", "jakarta", "lombok"]],
    ["Thailand", ["thailand", "bangkok", "phuket", "krabi", "pattaya", "chiang mai"]],
    ["Vietnam", ["vietnam", "hanoi", "da nang", "ho chi minh", "ha long", "phu quoc"]],
    ["Dubai", ["dubai"]],
    ["UAE", ["uae", "abu dhabi", "sharjah"]],
    ["Malaysia", ["malaysia", "kuala lumpur", "langkawi", "sabah", "kota kinabalu"]],
    ["Singapore", ["singapore"]],
    ["Mauritius", ["mauritius"]],
    ["Seychelles", ["seychelles"]],
    ["Azerbaijan", ["azerbaijan", "baku"]],
    ["Bhutan", ["bhutan", "thimphu", "paro"]],
    ["Nepal", ["nepal", "kathmandu", "pokhara"]],
    ["India", ["india", "goa", "kerala", "rajasthan", "kashmir", "manali", "andaman"]],
    ["Cambodia", ["cambodia", "siem reap", "angkor"]],
    ["Uzbekistan", ["uzbekistan", "tashkent", "samarkand"]],
    ["Kazakhstan", ["kazakhstan", "almaty"]],
    ["Turkey", ["turkey", "istanbul", "cappadocia", "antalya"]],
    ["Greece", ["greece", "santorini", "athens", "mykonos"]],
    ["Switzerland", ["switzerland", "zurich", "interlaken", "lucerne"]],
    ["France", ["france", "paris"]],
    ["Italy", ["italy", "rome", "venice"]],
    ["Spain", ["spain", "barcelona", "madrid"]],
    ["Kenya", ["kenya", "masai mara", "nairobi"]],
    ["South Africa", ["south africa", "cape town"]],
    ["Madagascar", ["madagascar"]],
    ["Taiwan", ["taiwan", "taipei"]]
  ];
  const SMALL_WORDS = new Set(["and", "the", "of", "at", "in", "on", "de", "la"]);
  function titleCase(s) {
    if (!s) return "";
    s = String(s).replace(/\s+/g, " ").trim();
    if (s !== s.toUpperCase() && s !== s.toLowerCase()) return s; // mixed case: keep as-is
    return s.toLowerCase().split(" ").map((w, i) =>
      i > 0 && SMALL_WORDS.has(w) ? w : w.replace(/[a-z]/, c => c.toUpperCase())).join(" ");
  }
  function cleanLine(s) {
    return String(s || "").replace(/^[\uF0B7·.•Ø*\-–—\s]+/, "").replace(/\s+/g, " ").trim();
  }
  const MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };

  function parseDMC(blocks, fullText) {
    const F = {}; // field -> { value, status: ok|check|missing, note }
    const set = (k, value, status, note) => { F[k] = { value, status: status || "ok", note: note || "" }; };
    const lines = [];
    (blocks || []).forEach(b => {
      if (b.type === "p") String(b.text).split("\n").forEach(l => lines.push(l));
      else if (b.type === "table") b.rows.forEach(r => r.forEach(c => String(c).split("\n").forEach(l => lines.push(l))));
    });
    for (let i = 0; i < lines.length; i++) lines[i] = lines[i].replace(/[’‘]/g, "'");
    const text = (fullText || lines.join("\n")).replace(/[’‘]/g, "'");
    const tables = (blocks || []).filter(b => b.type === "table");

    // ---- Destination ----
    let dest = null, destScore = 0;
    const destLabel = text.match(/destination\s*[:\-]\s*([A-Za-z][A-Za-z ]{2,28})/i);
    if (destLabel) { dest = titleCase(destLabel[1].trim()); destScore = 99; }
    const hay = text.toLowerCase();
    COUNTRIES.forEach(([name, keys]) => {
      let sc = 0;
      keys.forEach(k => { const n = hay.split(k).length - 1; if (n) sc += Math.min(n, 3); });
      if (sc > destScore) { destScore = sc; dest = name; }
    });
    if (dest) set("destination", dest, destScore >= 2 ? "ok" : "check", destScore >= 2 ? "" : "Inferred from the document — please confirm");
    else set("destination", "", "missing", "Not found in the document");

    // ---- Travel date ----
    let dateISO = "", dateLabel = "";
    const dm = text.match(/(?:date of travel|check\s*in|travel date)[:\s]*([0-9]{1,2})[\s\-\/]([A-Za-z]{3,9})[\s\-\/',]*([0-9]{2,4})/i)
      || text.match(/date of travel[:\s]*([0-9]{1,2})[\s\-\/]([A-Za-z]{3,9})[\s\-\/,]*([0-9]{4})/i)
      || text.match(/travel date[:\s]*([0-9]{1,2})[\s\-\/]([A-Za-z]{3,9})[\s\-\/,]*([0-9]{4})/i)
      || text.match(/\b([0-9]{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+([0-9]{4})\b/i)
      || text.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+([0-9]{1,2}),?\s+([0-9]{4})\b/i);
    if (dm) {
      let d, m, y;
      if (isNaN(dm[1])) { m = MONTHS[dm[1].slice(0, 3).toLowerCase()]; d = +dm[2]; y = +dm[3]; }
      else { d = +dm[1]; m = MONTHS[String(dm[2]).slice(0, 3).toLowerCase()]; y = +dm[3]; }
      if (y && y < 100) y += 2000;
      if (d && m && y) {
        dateISO = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        dateLabel = new Date(dateISO + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
      }
    }
    if (dateISO) set("travelDate", dateISO, "ok");
    else set("travelDate", "", "missing", "No travel date found");

    // ---- Pax ----
    const paxLine = lines.find(l => /pax|adults?/i.test(l) && /\d/.test(l)) || "";
    const aM = text.match(/(\d{1,2})\s*adults?/i);
    const cM = text.match(/(\d{1,2})\s*(kids?|child|children|chd)/i);
    const adults = aM ? +aM[1] : 0;
    const children = cM ? +cM[1] : 0;
    let childAges = "";
    if (children) {
      const ageM = paxLine.match(/\(([^)]*(?:\d+\s*(?:Y|yrs?|years?|y\/o))[^)]*)\)/i) || text.match(/kid[^(\n]*\((\d+)\s*Y\)/i);
      if (ageM) childAges = ageM[1].replace(/&/g, ",").replace(/,\s*,/g, ",").replace(/\s*,\s*/g, ", ").replace(/\s+/g, " ").trim();
    }
    if (adults) set("adults", adults, "ok"); else set("adults", "", "missing", "Adults not found");
    set("children", children, "ok");
    set("childAges", childAges, children && !childAges ? "check" : "ok", children && !childAges ? "Child age not stated" : "");

    // ---- Meal plan ----
    const MEALS = { HB: "Half Board (HB)", BB: "Bed & Breakfast (BB)", FB: "Full Board (FB)", AI: "All Inclusive (AI)", RO: "Room Only (RO)", MAP: "Half Board (MAP)", CP: "Bed & Breakfast (CP)", AP: "Full Board (AP)" };
    let meal = "";
    const mealM = text.match(/meal plan[:\s]*([A-Za-z]{2,3})\b/i) || text.match(/\b(HB|BB|FB|AI|RO|MAP|CP|AP)\b\s*(?:meal|plan|basis)/i);
    if (mealM) meal = MEALS[mealM[1].toUpperCase()] || mealM[1].toUpperCase();
    if (!meal) {
      const words = text.match(/(half board|full board|bed (?:and|&) breakfast|all inclusive|room only)/i);
      if (words) meal = titleCase(words[1]);
    }
    if (!meal && /daily breakfast/i.test(text)) set("mealPlan", "Breakfast (BB)", "check", "Read from the inclusions — the document lists daily breakfast");
    else if (meal) set("mealPlan", meal, "ok"); else set("mealPlan", "", "missing", "Meal plan not found");

    // ---- Hotel category ----
    const catM = text.match(/hotel category[:\s]*([0-9](?:\.[0-9])?)\s*stars?/i) || text.match(/\b([0-9])\s*stars?\s*(?:hotel|category|property)/i) || text.match(/\b([0-9])\s*stars?\b/i);
    if (catM) set("hotelCategory", catM[1] + " Star", "ok");
    else set("hotelCategory", "", "missing", "Hotel category not found");

    // ---- Hotels ----
    let hotels = [];
    tables.forEach(t => t.rows.forEach(r => {
      if (r.length >= 3 && /^\s*\d{1,2}\s*N(?:ights?)?\s*$/i.test(r[0])) {
        hotels.push({
          nights: parseInt(r[0], 10),
          area: titleCase(cleanLine(r[1])),
          name: titleCase(cleanLine(r[2])),
          room: titleCase(cleanLine(r[3] || ""))
        });
      }
    }));
    if (!hotels.length) { // plain-line fallback: "04N" then area / name / room lines
      for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(/^\s*(\d{1,2})\s*N\s*$/i);
        if (m) {
          const nx = [lines[i + 1], lines[i + 2], lines[i + 3]].map(x => cleanLine(x || ""));
          if (nx[0] && nx[1]) hotels.push({ nights: +m[1], area: titleCase(nx[0]), name: titleCase(nx[1]), room: titleCase(nx[2] || "") });
        }
      }
    }
    // Family stay lines: "06 Jun'24 - 11 Jun'24 (5N) Hotel Name (Room Type)//Similar"
    const familyHeads = [];
    lines.forEach((l, i) => { const fm = l.match(/^\s*family\s*(\d+)/i); if (fm) familyHeads.push({ n: +fm[1], at: i }); });
    if (!hotels.length) {
      lines.forEach((l, i) => {
        const hm = l.match(/\((\d{1,2})\s*N\)\s*([A-Za-z0-9][A-Za-z0-9&' .\-]{2,60}?)\s*\(([^)]+)\)/);
        if (hm) {
          let fam = null;
          familyHeads.forEach(fh => { if (fh.at < i) fam = fh.n; });
          hotels.push({
            nights: +hm[1],
            area: (dest || "") + (fam ? " (Family " + fam + ")" : ""),
            name: titleCase(cleanLine(hm[2])),
            room: titleCase(cleanLine(hm[3]))
          });
        }
      });
    }
    // Hotel table as plain lines (typical for PDFs): City | Hotel Name | Check in | Check out
    // header, then city / hotel / date / date groups — or whole rows joined on one line.
    let tableCheckinISO = "", mergedDupes = 0;
    if (!hotels.length) {
      const MON3 = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
      const dateTok = l => { const m = l.match(/^(\d{1,2})\s*([A-Za-z]{3,9})$/); return m && MON3[m[2].slice(0, 3).toLowerCase()] ? { d: +m[1], m: MON3[m[2].slice(0, 3).toLowerCase()] } : null; };
      const rawStays = [];
      lines.forEach(l => {
        const m = l.match(/^(.+?)\s+(\d{1,2})\s*([A-Za-z]{3,9})\s+(\d{1,2})\s*([A-Za-z]{3,9})\s*(\(.*\))?$/);
        if (m && MON3[m[3].slice(0, 3).toLowerCase()] && MON3[m[5].slice(0, 3).toLowerCase()]) {
          const words = m[1].trim().split(/\s+/);
          rawStays.push({ city: words[0], name: words.slice(1).join(" "), inD: { d: +m[2], m: MON3[m[3].slice(0, 3).toLowerCase()] }, outD: { d: +m[4], m: MON3[m[5].slice(0, 3).toLowerCase()] }, room: m[6] ? m[6].replace(/[()]/g, "") : "" });
        }
      });
      if (!rawStays.length) {
        const hi2 = lines.findIndex((l, i) => /^city$/i.test(l.trim()) && lines.slice(i, i + 4).some(x => /hotel name/i.test(x)));
        if (hi2 >= 0) {
          let startI = hi2 + 1;
          for (let j = hi2; j < Math.min(lines.length, hi2 + 5); j++) if (/^check out/i.test(lines[j].trim())) { startI = j + 1; break; }
          let cur = null;
          const flush = () => { if (cur && cur.name && cur.inD && cur.outD) rawStays.push(cur); cur = null; };
          for (let i = startI; i < lines.length; i++) {
            const l = lines[i].trim();
            if (!l) continue;
            if (/^inclusions/i.test(l)) { flush(); break; }
            const dt = dateTok(l);
            if (dt) { if (cur && !cur.inD) cur.inD = dt; else if (cur && !cur.outD) { cur.outD = dt; } continue; }
            if (/^\(.*\)$/.test(l)) { if (cur) cur.room = l.replace(/[()]/g, ""); continue; }
            const wrapM = l.match(/^(.+?)\s*\(([^)]+)\)$/);
            if (wrapM && cur && cur.inD && cur.outD) { cur.name += " " + wrapM[1]; if (!cur.room) cur.room = wrapM[2]; continue; }
            if (cur && cur.inD && cur.outD) flush();
            if (!cur) cur = { city: l, name: "", inD: null, outD: null, room: "" };
            else if (!cur.name) cur.name = l;
            else if (!cur.inD) cur.name += " " + l;
          }
          flush();
        }
      }
      const seen = {};
      rawStays.forEach(st => {
        const key = (st.name.toLowerCase().split(/\s+/).slice(0, 3).join(" ") + "|" + st.inD.d + "/" + st.inD.m + "|" + st.outD.d + "/" + st.outD.m);
        if (seen[key]) { seen[key].rooms = (seen[key].rooms || 1) + 1; mergedDupes++; }
        else { st.rooms = 1; seen[key] = st; hotels.push(st); }
      });
      hotels = hotels.map(st => {
        let nights = (st.outD.m - st.inD.m) * 30 + (st.outD.d - st.inD.d);
        if (nights < 0) nights += 365;
        if (!tableCheckinISO) {
          const now = new Date(); let yr = now.getFullYear();
          const cand = new Date(yr, st.inD.m - 1, st.inD.d);
          if ((now - cand) / 864e5 > 30) yr += 1;
          tableCheckinISO = yr + "-" + String(st.inD.m).padStart(2, "0") + "-" + String(st.inD.d).padStart(2, "0");
        }
        return { nights, area: titleCase(cleanLine(st.city)), name: titleCase(cleanLine(st.name)), room: titleCase(cleanLine(st.room || "")), _rooms: st.rooms };
      });
      const rcIdx = lines.findIndex(l => /^room category/i.test(l.trim()));
      if (rcIdx >= 0 && hotels.length) {
        const parts = [];
        for (let i = rcIdx + 1; i < Math.min(lines.length, rcIdx + 7); i++) {
          const l = cleanLine(lines[i]);
          if (!l) { if (parts.length) break; continue; }
          if (/^(tentative|day\s*\d|inclusions|exclusions)/i.test(l)) break;
          parts.push(l);
        }
        if (parts.length) hotels.forEach(h => { if (!h.room || /double room/i.test(h.room)) h.room = parts.join(" "); });
      }
      if (mergedDupes) hotels.forEach(h => { if (h._rooms > 1) h.room = (h.room ? h.room + " · " : "") + h._rooms + " rooms"; });
      hotels.forEach(h => delete h._rooms);
      if (hotels.length && (!F.travelDate || F.travelDate.status === "missing") && tableCheckinISO) set("travelDate", tableCheckinISO, "check", "The document gives no year — the date is the hotel check-in; please confirm the year");
    }
    if (familyHeads.length >= 2) set("families", familyHeads.length, "check",
      "This document quotes " + familyHeads.length + " families separately, each with its own stay and cost — please review every family's lines");
    if (hotels.length) set("hotels", hotels, (familyHeads.length >= 2 || mergedDupes) ? "check" : "ok", mergedDupes ? "The same stay was listed more than once (one row per room) — merged into one stay" : (familyHeads.length >= 2 ? "One row per family — check nights and dates per family" : ""));
    else set("hotels", [], "missing", "No hotel rows found");

    // ---- Nights total ----
    const itinM = text.match(/(\d{1,2})\s*nights?\s*[/,]?\s*(\d{1,2})\s*days?/i);
    const nightsLabel = text.match(/no\.?\s*of\s*nights?[:\s]*(\d{1,2})/i);
    const totalNights = (nightsLabel ? +nightsLabel[1] : 0) || hotels.reduce((s, h) => s + (+h.nights || 0), 0) || (itinM ? +itinM[1] : 0);
    if (totalNights) set("nights", totalNights, "ok");
    else set("nights", "", "missing", "Nights not found");

    // ---- DMC cost ----
    let cost = null, costScore = -1;
    const CUR = { USD: "USD", "US$": "USD", $: "USD", INR: "INR", "RS": "INR", "RS.": "INR", "₹": "INR", EUR: "EUR", "€": "EUR", GBP: "GBP", "£": "GBP", AED: "AED", SGD: "SGD", LKR: "LKR" };
    const moneyRe = /(USD|US\$|INR|Rs\.?|EUR|GBP|AED|SGD|LKR|[$₹€£])\s*([0-9][0-9,]*\.?[0-9]*)/;
    tables.forEach(t => {
      if (/supplement/i.test((t.rows[0] || []).join(" "))) return; // supplements are not the package cost
      t.rows.forEach(r => {
        const joined = r.join(" ");
        const m = joined.match(moneyRe);
        if (!m || !/per person|sharing|total|net|cost|price|dbl|twin/i.test(joined)) return;
        let sc = 0;
        if (/sharing|dbl|twin/i.test(joined)) sc += 3;
        if (/per person/i.test(joined)) sc += 2;
        if (/total|net|cost|price/i.test(joined)) sc += 1;
        if (sc > costScore) {
          costScore = sc;
          const basisCell = r.find(c => /per person|sharing|total|net|dbl|twin/i.test(c)) || "";
          cost = { amount: parseFloat(m[2].replace(/,/g, "")), currency: CUR[(m[1] || "USD").toUpperCase()] || "USD", basis: titleCase(basisCell).replace(/\bDbl\b/gi, "Double") };
        }
      });
    });
    // Multiple cost blocks (e.g. one total per family) -> itemised cost lines
    const costLineHits = [];
    {
      let famCtx = "";
      lines.forEach(l => {
        const fm = l.match(/^\s*(family\s*\d+)/i);
        if (fm) famCtx = titleCase(fm[1]);
        const mm = l.match(moneyRe);
        if (mm && /total/i.test(l)) {
          costLineHits.push({
            label: famCtx || "Cost",
            amount: parseFloat(mm[2].replace(/,/g, "")),
            currency: CUR[(mm[1] || "USD").toUpperCase()] || "USD",
            raw: cleanLine(l)
          });
        }
      });
    }
    if (!cost && costLineHits.length >= 2) {
      set("costLines", costLineHits.map(c => c.label + " — " + c.currency + " " + c.amount.toLocaleString("en-IN") + " (total, for all)"), "check",
        "Separate cost blocks found — itemised here; nothing was merged");
      cost = { amount: "", currency: costLineHits[0].currency, basis: costLineHits.length + " separate totals — see the cost breakdown" };
      set("dmcCost", cost, "check", "This document has more than one cost block — use the itemised breakdown below");
    } else if (costLineHits.length === 1 && !cost) {
      const h = costLineHits[0];
      const tail = (h.raw.match(/for\s+(.+)$/i) || [])[1] || "";
      cost = { amount: h.amount, currency: h.currency, basis: tail ? "Total for " + tail.replace(/(\d)([A-Za-z])/g, "$1 $2").replace(/([A-Za-z])(\d)/g, "$1 $2").replace(/([A-Za-z])\(/g, "$1 (").replace(/\s+/g, " ") : "Total" };
      set("costLines", [], "ok");
    } else if (costLineHits.length) {
      set("costLines", costLineHits.map(c => c.label + " — " + c.currency + " " + c.amount.toLocaleString("en-IN")), "ok");
    } else {
      set("costLines", [], "ok");
    }
    if (!cost) {
      const cm = text.match(/(?:per person|sharing|net|cost|price|total)[^\n]{0,60}?(USD|US\$|INR|Rs\.?|EUR|GBP|AED|SGD|LKR|[$₹€£])\s*([0-9][0-9,]*\.?[0-9]*)/i)
        || text.match(/(USD|US\$|INR|Rs\.?|EUR|GBP|AED|SGD|LKR|[$₹€£])\s*([0-9][0-9,]*\.?[0-9]*)\s*(?:per person|\/?\s*pp\b|sharing)/i);
      if (cm) cost = { amount: parseFloat(cm[2].replace(/,/g, "")), currency: CUR[(cm[1] || "USD").toUpperCase()] || "USD", basis: /per person/i.test(text.slice(Math.max(0, cm.index - 60), cm.index + 60)) ? "Per person" : "" };
    }
    if (F.dmcCost) { /* multi-block cost already recorded above */ }
    else if (cost) set("dmcCost", cost, cost.basis ? "ok" : "check", cost.basis ? "" : "Basis (per person / total) unclear — please confirm");
    else set("dmcCost", { amount: "", currency: "USD", basis: "" }, "missing", "DMC cost not found");

    // ---- Itinerary ----
    const days = [];
    tables.forEach(t => t.rows.forEach(r => {
      const dm2 = (r[0] || "").match(/day\s*0?(\d{1,2})/i);
      if (dm2 && r.length >= 2) {
        let txt = cleanLine(r[1]).replace(/\s*---\s*/g, " — ").replace(/\s*–\s*/g, " – ");
        const stay = cleanLine(r[2] || "");
        if (stay) txt += ` (${stay})`;
        days.push({ day: +dm2[1], text: txt });
      }
    }));
    if (!days.length) {
      let cur = null;
      lines.forEach(l => {
        const dm2 = l.match(/^\s*day\s*0?(\d{1,2})\s*[:\-–.]?\s*(.*)$/i);
        if (dm2) { cur = { day: +dm2[1], text: cleanLine(dm2[2]) }; days.push(cur); }
        else if (/^(inclusions|exclusions|room category|tentative itinerary|total|hope you|your jo)/i.test(l.trim())) { cur = null; }
        else if (cur && cleanLine(l) && !/^(itinerary|stay at)\b/i.test(l)) {
          if (/^stay at/i.test(l)) cur.text += ` (${cleanLine(l)})`;
          else cur.text = (cur.text + " " + cleanLine(l)).trim();
        }
      });
    }
    days.sort((a, b) => (a.day || 0) - (b.day || 0));
    if (days.length) set("itinerary", days, "ok");
    else set("itinerary", [], "missing", "No day-wise itinerary found");
    // (Tours-from-inclusions fallback runs after inclusions are parsed, below.)

    // ---- Supplements ----
    const supps = [];
    tables.forEach(t => {
      const head = (t.rows[0] && t.rows[0].join(" ")) || "";
      if (/supplement/i.test(head)) {
        t.rows.slice(1).forEach(r => {
          // Rows may lose their first (area) cell to a vertical merge in Word,
          // so read item/price from the END of the row.
          if (r.length >= 2 && cleanLine(r[r.length - 2]) && /(USD|INR|Rs\.?|EUR|GBP|AED|[$₹€£])/i.test(r[r.length - 1])) {
            const price = cleanLine(r[r.length - 1]);
            const item = titleCase(cleanLine(r[r.length - 2]));
            const area = r.length >= 3 ? cleanLine(r[0]) : "";
            if (item && !/supplement/i.test(item)) supps.push(`${item}${area ? " (" + titleCase(area) + ")" : ""} — ${price}`);
          }
        });
      }
    });
    if (!supps.length) {
      const si = lines.findIndex(l => /supplement/i.test(l));
      if (si >= 0) for (let i = si + 1; i < Math.min(lines.length, si + 16); i++) {
        if (moneyRe.test(lines[i]) && cleanLine(lines[i]).length > 3) supps.push(cleanLine(lines[i]));
        if (/^(inclusions|exclusions|the above|cancellation|kindly)/i.test(lines[i])) break;
      }
    }
    set("supplements", supps, supps.length ? "ok" : "missing", supps.length ? "" : "No supplements section found (fine if none)");

    // ---- Inclusions / Exclusions ----
    let inc = [], exc = [];
    tables.forEach(t => {
      const headRow = t.rows.find(r => r.some(c => /inclu/i.test(c)) && r.some(c => /exclu/i.test(c)));
      if (headRow) {
        const incIdx = headRow.findIndex(c => /inclu/i.test(c));
        const excIdx = headRow.findIndex(c => /exclu/i.test(c));
        t.rows.forEach(r => {
          if (r === headRow) return;
          if (r.length < headRow.length) return; // spanning rows (e.g. cancellation) are not list items
          if (/cancellation/i.test(r[0] || "")) return;
          if (r[incIdx]) r[incIdx].split("\n").map(cleanLine).filter(x => x && !/cancellation/i.test(x)).forEach(x => inc.push(x));
          if (r[excIdx]) r[excIdx].split("\n").map(cleanLine).filter(Boolean).forEach(x => exc.push(x));
        });
      }
    });
    let incStatus = "ok";
    if (!inc.length && !exc.length) { // line-based fallback
      const hi = lines.findIndex(l => /inclu/i.test(l));
      const he = lines.findIndex(l => /exclu/i.test(l));
      if (hi >= 0) {
        const end = he > hi ? he : Math.min(lines.length, hi + 14);
        for (let i = hi + 1; i < end; i++) if (cleanLine(lines[i])) inc.push(cleanLine(lines[i]));
      }
      if (he >= 0) for (let i = he + 1; i < Math.min(lines.length, he + 14); i++) {
        if (/^(cancellation|kindly note|please note|terms|room category|tentative itinerary|day\s*\d)/i.test(lines[i])) break;
        if (cleanLine(lines[i])) exc.push(cleanLine(lines[i]));
      }
      incStatus = inc.length ? "check" : "missing";
    }
    // Value additions are complimentary extras -> inclusions
    const va = lines.findIndex(l => /value additions/i.test(l));
    if (va >= 0) for (let i = va + 1; i < Math.min(lines.length, va + 8); i++) {
      const c = cleanLine(lines[i]);
      if (c && !/^(supplement|the above|itinerary)/i.test(c)) inc.push(c);
      if (/^(the above|supplement)/i.test(c)) break;
    }
    inc = [...new Set(inc)]; exc = [...new Set(exc)];
    set("inclusions", inc, inc.length ? incStatus : "missing", inc.length ? (incStatus === "check" ? "Split from the document by position — please verify" : "") : "Inclusions not found");
    set("exclusions", exc, exc.length ? (incStatus === "check" ? "check" : "ok") : "missing", exc.length ? "" : "Exclusions not found");

    // Tours-from-inclusions fallback (no day-wise plan in the document)
    if (!days.length && inc.length) {
      const tours = inc.filter(x => /(tour|safari|studios|sentosa|zoo|island|flyer|gardens by|sightseeing|excursion|cruise)/i.test(x) && !/transfers/i.test(x));
      if (tours.length) set("itinerary", tours.map(t => ({ day: null, text: t })), "check",
        "No day-wise itinerary in the document — these tours were read from the Inclusions list; please arrange them by day");
    }

    // ---- Cancellation policy ----
    const canc = [];
    const ci = lines.findIndex(l => /cancellation policy/i.test(l));
    if (ci >= 0) for (let i = ci + 1; i < Math.min(lines.length, ci + 8); i++) {
      const c = cleanLine(lines[i]);
      if (c && /\d/.test(c)) canc.push(c);
      if (/^(kindly|please note|regards)/i.test(c)) break;
    }
    set("cancellation", canc, canc.length ? "ok" : "missing", canc.length ? "" : "No cancellation policy found (optional)");

    // ---- Client name ----
    let client = "";
    const cnM = text.match(/(?:client(?:'s)? name|guest name|passenger name|name of (?:the )?(?:client|guest))[:\s]*([A-Z][A-Za-z .]{2,40})/i)
      || text.match(/dear\s+(mr\.?|mrs\.?|ms\.?|dr\.?)\s+([a-z]+)/i);
    if (cnM) client = titleCase(cnM[2] ? cnM[1] + " " + cnM[2] : cnM[1]);
    if (client) set("clientName", client, "check", "Found in the document — please confirm it is the client");
    else set("clientName", "", "missing", "No client name in the document (it is addressed to the team) — please type it");
    set("clientPhone", "", "missing", "Phone numbers are never taken from DMC documents — please type it");

    // ---- DMC branding (white-label) ----
    const branding = [];
    const greetM = text.match(/greetings from\s+([A-Za-z0-9][A-Za-z0-9&.' ]{1,38})/i);
    if (greetM) {
      const g = greetM[1].replace(/[!.,\s]+$/, "").trim();
      if (g && !/elite/i.test(g)) branding.push("Company name: " + g);
    }
    const withM = text.match(/(?:trip|holiday|tour|travel|stay)\s+with\s+([A-Z][A-Za-z&]+(?:\s+[A-Z][A-Za-z&]+){0,3})\s*[!.]/);
    if (withM && !/elite/i.test(withM[1])) branding.push("Company name: " + withM[1].trim());
    const emailM = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) || [];
    emailM.forEach(e => { if (!/eliteexposures/i.test(e)) branding.push("Email: " + e); });
    const urlM = text.match(/(?:www\.)[A-Za-z0-9.-]+\.[A-Za-z]{2,}|[A-Za-z0-9-]+\.(?:com|net|org|io|travel|tours|lk|in|co)\/[^\s)]*/gi) || [];
    urlM.forEach(u => { if (!/gov/i.test(u) && !/eliteexposures/i.test(u)) branding.push("Website: " + u); });
    const compM = text.match(/[A-Z][A-Za-z&' ]{2,40}?\s(?:Tours|Travels|Travel|Tourism|Holidays|DMC|Expeditions|Journeys)\b(?:\s*\((?:Pvt|Private)[^)]*\))?(?:\s*(?:Pvt\.?\s*Ltd\.?|LLC|Ltd\.?))?/g) || [];
    const NOT_COMPANY = /date of|prior to|\bdays?\b|value additions|travel date|safe flight|the above|check ?in|check ?out|per person|sharing/i;
    compM.forEach(c => {
      const cc = c.replace(/\s+/g, " ").trim();
      if (!/elite exposures/i.test(cc) && !NOT_COMPANY.test(cc) && cc.length > 5) branding.push("Company name: " + titleCase(cc));
    });
    const sigM = text.match(/regards?,?\s*\n\s*([A-Z][A-Za-z& ]{2,40})/i);
    if (sigM && !/elite/i.test(sigM[1])) branding.push("Signature: " + titleCase(sigM[1].trim()));
    set("dmcBranding", [...new Set(branding)], branding.length ? "check" : "ok",
      branding.length ? "Found in the document — it is removed from the client PDF automatically" : "No DMC name or branding found in this document");

    return { fields: F, lineCount: lines.length };
  }

  global.EEParseDMC = parseDMC;
  if (typeof module !== "undefined" && module.exports) module.exports = { parseDMC };
})(typeof window !== "undefined" ? window : globalThis);
