// Elite Exposures — concept demo. Content adapted from eliteexposures.in (cleaned).
// Sample day plans are illustrative rhythms only; real itineraries are built per enquiry.
const U = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w || 1000}`;
const Z = (path, w) => `https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=${w || 1000},fit=crop/A85655oqJ9uZbX4k/${path}`;

const DESTINATIONS = [
  {
    id: "maldives", name: "Maldives", tag: "Experience Heaven",
    img: U("photo-1595184979141-090792f6b578"),
    card: "Powdery beaches, turquoise waters and dreamy overwater bungalow resorts across a 26-atoll chain of islands.",
    intro: "A 26-atoll chain of islands with powdery beaches, turquoise waters and dreamy overwater bungalow resorts. The Maldives is home to about five percent of the planet's reefs — an explosion of colour, home to a thousand species of fish, manta rays and whale sharks.",
    highlights: [
      ["Impressive Nature", "Towering palms, fragrant sandalwood and islands that feel anything but small — beauty above and below the water."],
      ["The Reefs", "Coral reefs are the foundation of the islands, protecting them and feeding one of the richest marine ecosystems on Earth."],
      ["Playful Waves", "Nothing screams paradise quite like holiday-making in the Maldives — preferably in the dead of winter back home."]
    ],
    days: [
      ["Arrive in paradise", "Land in Malé and glide to your resort by speedboat or seaplane. Sunset walk on the sandbank."],
      ["Your lagoon, your pace", "A slow morning in the villa, then snorkel the house reef straight from the deck."],
      ["Out on the water", "Dolphin cruise or a sandbank picnic — the atoll at its most photogenic."],
      ["Deep blue day", "Diving or snorkelling with turtles and rays, then a beach dinner under the stars."],
      ["One last swim", "Floating breakfast, a final dip in the lagoon, and a seaplane goodbye."]
    ]
  },
  {
    id: "bali", name: "Bali", tag: "Dive Into a Lifestyle",
    img: U("photo-1537996194471-e657df975ab4"),
    card: "Magical Bali — picturesque beaches, numerous spas and breathtaking resorts. Forget all of your worries.",
    intro: "Need a place to get away? There is no better corner in the world to hide from the dull everyday than magical Bali — picturesque beaches, numerous spas and breathtaking resorts.",
    highlights: [
      ["Colorful Culture", "Various celebrations, bright clothes, ancient stories and a diverse local lifestyle to immerse yourself in."],
      ["Ancient Monuments", "Gazebos on the beaches and mystical temples in the forests — inspiring architecture with deep history."],
      ["Exotic Food", "Fresh and exciting cuisine, from street food to fancy local restaurants, that keeps taste buds happy for weeks."]
    ],
    days: [
      ["Selamat datang", "Arrive, settle into your resort and take an evening stroll on the beach."],
      ["Temples & tales", "Ancient monuments and mystical forest temples with a local guide."],
      ["Island slow-down", "Spa time, café hopping and a sunset over the ocean."],
      ["Flavours of Bali", "Markets, street food and a dinner of local favourites."],
      ["Beach goodbye", "One last swim and a relaxed transfer to the airport."]
    ]
  },
  {
    id: "seychelles", name: "Seychelles", tag: "The Best Beaches",
    img: U("photo-1553829176-61484f865ac3"),
    card: "115 islands scattered across the Indian Ocean — spellbinding beaches, UNESCO sites and the Garden of Eden.",
    intro: "Sailing, diving, fishing and relaxing across the 115 islands of this Indian Ocean archipelago. Mahé, Praslin and La Digue are the most loved — Mahé alone boasts 65 silver beaches — and the islands are home to UNESCO-designated Aldabra and the Vallée de Mai, called the Garden of Eden.",
    highlights: [
      ["Exquisite Islands", "Spellbinding ribbons of sand lapped by turquoise waters, backed by lush hills, palms and Dali-esque boulders."],
      ["Idyllic Beaches", "Scuba among kaleidoscopic reefs, kayak past turtles and rays, or try paddle boarding on glass-like water."],
      ["Flora & Fauna", "From busy, beautiful Mahé to Praslin, La Digue and real lost-world islands a short boat ride away."]
    ],
    days: [
      ["Hello, Mahé", "Arrive on Mahé, breathe in the ocean and wander Victoria, one of the world's smallest capitals."],
      ["Beach-hop day", "Silver beaches and granite boulders — swim, snorkel, repeat."],
      ["Praslin & the Garden of Eden", "Ferry to Praslin for the UNESCO Vallée de Mai, then on to La Digue's famous shores."],
      ["Ocean day", "Sailing, diving or kayaking among turtles and rays."],
      ["Barefoot goodbye", "A slow breakfast and one final swim before you fly."]
    ]
  },
  {
    id: "dubai", name: "Dubai", tag: "Time to Say Dubai",
    img: U("photo-1512453979798-5ea266f8880c"),
    card: "Futuristic skylines, desert adventures and a shopper's paradise — modern Arabia at full sparkle.",
    intro: "Marvel at modern and beautiful Arabic architecture, discover the history and culture of the emirate, ride a camel in the desert, enjoy a day at the waterpark or a hot air balloon adventure — plus much more.",
    highlights: [
      ["Architectural Marvels", "The Burj Khalifa, the world's tallest building, and the sail-shaped Burj Al Arab headline a futuristic skyline."],
      ["Desert Adventures", "Dune bashing, camel riding and sandboarding, ending with stunning desert sunsets and tranquillity."],
      ["Shopping Paradise", "From The Dubai Mall and the Fountain show to traditional souks — a paradise for big spenders and bargain hunters alike."]
    ],
    days: [
      ["City of gold", "Arrive and take in the skyline — an evening at the Dubai Fountain."],
      ["Icons day", "Burj Khalifa views, the Dubai Mall and the Aquarium."],
      ["Into the desert", "Dune bashing, camel ride and a sunset desert dinner."],
      ["Old meets new", "Historic quarters, souks and a waterpark or balloon adventure."],
      ["Souvenir run", "Last-minute shopping and a smooth flight home."]
    ]
  },
  {
    id: "abu-dhabi", name: "Abu Dhabi", tag: "A City of Dreams",
    img: U("photo-1636110911594-84ef8a6b0a9d"),
    card: "The majestic Sheikh Zayed Grand Mosque, the Louvre Abu Dhabi and desert adventures in the heart of Arabia.",
    intro: "Abu Dhabi is deeply rooted in traditional Emirati culture while embracing modernity — home to the majestic Sheikh Zayed Grand Mosque, one of the largest mosques in the world, and hospitality renowned for its warmth.",
    highlights: [
      ["Beautiful Sightseeing", "The Sheikh Zayed Grand Mosque and the Louvre Abu Dhabi, with art and artefacts from around the world."],
      ["Desert Safari", "In the heart of the Arabian Desert — dune bashing, camel riding, sandboarding and stargazing."],
      ["Beautiful City Tour", "Etihad Towers and the Yas Viceroy Hotel straddling the Formula 1 circuit — innovation in every skyline."]
    ],
    days: [
      ["Marhaba, Abu Dhabi", "Arrive and settle in with an evening Corniche walk."],
      ["The Grand Mosque", "A guided morning at the Sheikh Zayed Grand Mosque, then the Louvre Abu Dhabi."],
      ["Desert safari", "Dunes by day, stars by night."],
      ["Yas Island energy", "The F1 circuit, theme parks and waterfront dining."],
      ["Graceful goodbye", "A slow morning and departure."]
    ]
  },
  {
    id: "mauritius", name: "Mauritius", tag: "Forget Your Worries",
    img: U("photo-1513415431848-a433b3de449f"),
    card: "Endless white beaches, turquoise lagoons ringed by coral reefs — a favourite for families and honeymooners alike.",
    intro: "Clear, warm turquoise water and endless white beaches with coconut trees make Mauritius an ideal tropical dream. Famous for unspoiled nature, marine life, colourful coral reefs, cultural diversity and, above all, its welcoming people.",
    highlights: [
      ["Beautiful Resorts", "Beyond the beaches: 18 miles of hiking trails in Black River Gorges National Park, waterfalls and hilltop viewpoints."],
      ["Amazing Beaches", "Port Louis brings vibrant arts, architecture, museums and markets to the island's beach perfection."],
      ["Mindfulness Practices", "The whole island is ringed by coral reefs and calm lagoons — ideal for swimming, bathing and snorkelling."]
    ],
    days: [
      ["Island time begins", "Arrive, check in and watch your first Mauritian sunset."],
      ["Lagoon day", "Snorkel the reef, swim the calm lagoon, do gloriously little."],
      ["Wild southwest", "Black River Gorges — trails, waterfalls and viewpoints."],
      ["Port Louis colour", "Markets, museums and street food in the capital."],
      ["Barefoot goodbye", "Beach breakfast and a relaxed departure."]
    ]
  },
  {
    id: "thailand", name: "Thailand", tag: "Forget Your Worries",
    img: U("photo-1506665531195-3566af2b4dfa"),
    card: "Almost 1,000 islands, Bangkok's buzzing streets, floating markets and serene temples — a plateful of attractions.",
    intro: "Keep your eyes open for the unknown and your heart ready to explore. Intriguing shopping, scuba diving in the Andaman Sea, elephant bathing at national parks and Buddhist temples like Wat Phra and Wat Arun — Thailand suits everyone's taste.",
    highlights: [
      ["Beautiful Resorts", "Over 2,400 km of coastline and almost 1,000 islands — party till dawn, learn to dive, or escape on a secluded romantic break."],
      ["Bustling City", "Bangkok's malls and temples, the Damnoen Saduak floating market, hill-tribe villages of Chiang Mai and the ruins of Ayutthaya."],
      ["Mindfulness Places", "Wat Phra Kaew, Wat Doi Suthep, the White Temple of Chiang Rai — sanctuaries of calm in every region."]
    ],
    days: [
      ["Sawasdee, Bangkok", "Arrive, settle in and taste your first street-food evening."],
      ["Temples & markets", "Wat Phra Kaew and Wat Arun, then the floating market by boat."],
      ["To the islands", "Fly or ferry out — Phuket, Koh Samui or your island of choice."],
      ["Andaman blue", "Snorkelling or scuba among coral and cliffs."],
      ["One more pad thai", "Souvenir markets and home, already planning the return."]
    ]
  },
  {
    id: "vietnam", name: "Vietnam", tag: "Forget Your Worries",
    img: U("photo-1480996408299-fc0e830b5db1"),
    card: "Ha Long Bay's serene waters, Sapa's rice terraces, ancient Hoi An and a culture blended from centuries.",
    intro: "Vietnam boasts a deep and diverse cultural history influenced by Chinese, French and Southeast Asian traditions — ancient temples, bustling markets, the ancient town of Hoi An, the Cu Chi Tunnels and the Imperial Citadel in Hue.",
    highlights: [
      ["Natural Landscapes", "From the towering peaks of Sapa to the serene waters of Ha Long Bay, plus beaches at Da Nang, Nha Trang and Phu Quoc."],
      ["Cultural Heritage", "Hoi An's lanterns, the Cu Chi Tunnels and Hue's Imperial Citadel — a history both fascinating and complex."],
      ["Cultural Experiences", "Handicrafts, textiles and artwork in local markets — a glimpse into the country's artistic heritage."]
    ],
    days: [
      ["Xin chào", "Arrive and dive into the old quarter's energy and flavours."],
      ["Heritage day", "Ancient temples, markets and stories with a local guide."],
      ["Ha Long Bay", "Cruise among limestone karsts on serene green water."],
      ["Hoi An lanterns", "The ancient town at its glowing best, tailor shops and riverside cafés."],
      ["Slow goodbye", "One last Vietnamese coffee and departure."]
    ]
  },
  {
    id: "azerbaijan", name: "Azerbaijan", tag: "Forget Your Worries",
    img: U("photo-1596306499398-8d88944a5ec4"),
    card: "Baku's Flame Towers and UNESCO walled city, Caspian coast and Caucasus mountains — where East meets West.",
    intro: "Azerbaijan sits at the crossroads of Eastern Europe and Western Asia, blending Turkic, Persian and Russian influences. From the Caspian Sea coast to the Caucasus Mountains, it offers lush forests in Guba and the stunning lakes of Goygol National Park.",
    highlights: [
      ["Baku — Old Soul, Bold Skyline", "The Flame Towers and Zaha Hadid's Heydar Aliyev Center rise over a rapidly growing modern capital."],
      ["Breathtaking Landscapes", "Caspian coast, Guba's lush forests and Goygol's alpine lakes — a Silk Road crossroads of scenery."],
      ["Historical Significance", "Baku's UNESCO-listed walled city, the Maiden Tower and Gobustan's ancient rock engravings."]
    ],
    days: [
      ["Salam, Baku", "Arrive and stroll the Caspian boulevard at golden hour."],
      ["Old city, new icons", "The walled city and Maiden Tower, then the Flame Towers by night."],
      ["Gobustan & mud volcanoes", "Ancient rock art and otherworldly landscapes."],
      ["Mountains day", "Guba's forests or Goygol's alpine lakes."],
      ["Bazaar goodbye", "Silk Road souvenirs and home."]
    ]
  },
  {
    id: "taiwan", name: "Taiwan", tag: "Featured Journey",
    img: null, feature: true,
    card: "Discover the best places to visit in Taiwan with our itinerary.",
    intro: "Plan your travel with Elite Exposures to Taiwan — discover the best places to visit with our itinerary, immerse yourself in rich culture and heritage, and embark on adventures to hidden gems.",
    highlights: [
      ["Explore Taiwan", "Discover the best places to visit in Taiwan with our itinerary."],
      ["Spot the Dragon's Head", "Spot the dragon's head among the rocks in Yehliu's second section."],
      ["Experience Taiwan Culture", "Immerse yourself in the rich culture and heritage of Taiwan."],
      ["Taiwan Adventure Tours", "Embark on exciting adventures and explore hidden gems in Taiwan."]
    ],
    days: []
  },
  {
    id: "sabah", name: "Sabah", tag: "Featured Journey · Borneo",
    img: null, feature: true,
    card: "The Land Below the Wind, above your expectations.",
    intro: "Dive into the heart of Borneo's coral paradise. Sabah's sunsets will steal your heart — a gateway to adventure and serenity, with pristine rainforests and rare wildlife.",
    highlights: [
      ["Breathtaking Sabah", "Dive into the heart of Borneo's coral paradise — the Land Below the Wind, above your expectations."],
      ["Sabah Awaits", "Discover paradise — Sabah's sunsets will steal your heart."],
      ["Elite Moments in Sabah's Culture", "Experience culture, nature and adventure — all in Sabah."],
      ["Adventure Refined", "Uncover pristine rainforests and rare wildlife."]
    ],
    days: []
  }
];

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
  el.className = "gallery-tile" + (i === 0 || i === 5 ? " tall" : "") + (i === 3 ? " wide" : "");
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

// ---------- Interactive Plan Popup ----------
// Flow: pick destination/duration/date in the hero bar (or tap Plan on a card)
// -> answer 3-4 chip questions -> see a SAMPLE day-wise plan (no prices, ever)
// -> Contact (prefills the enquiry form) or WhatsApp (plan pre-written).
const planOverlay = document.getElementById("planOverlay");
let planState = null;
const DAYS_GROUP = { key: "days", label: "How many days?", options: ["3–4 days", "5–7 days", "8–12 days", "2 weeks +"] };
const DAYS_MAP = { "3–4 days": 4, "5–7 days": 6, "8–12 days": 10, "2 weeks +": 12 };
const shortOpt = s => s.split(" — ")[0];

const GENERIC_SET = {
  questions: [
    { key: "base", label: "Where do you like to base yourself?", options: ["City centre", "Near the beach / coast", "Quiet outskirts", "No preference"] },
    { key: "pace", label: "Your travel pace?", options: ["Relaxed", "Balanced", "See as much as possible"] },
    { key: "interest", label: "Most exciting for you?", options: ["Sightseeing", "Food & local life", "Adventure", "Shopping"] }
  ],
  core: (a, d) => [
    ["Arrive in " + d.name, "Settle into your stay and take an easy evening walk, ending with a local dinner."],
    [d.name + " highlights", "A guided day through the must-see sights, with the stories and local secrets behind them."],
    ["A day trip out", "A scenic excursion beyond the city — nature, heritage or coastline, whichever shines brightest near " + d.name + "."],
    ["Your kind of day", { "Sightseeing": "Deeper sightseeing — museums, viewpoints and hidden corners most visitors miss.", "Food & local life": "A food lover's day — markets, street food and a local cooking experience.", "Adventure": "An adventure day — outdoor thrills arranged with trusted local operators.", "Shopping": "A shopping day — malls, markets and the best local buys, with bargaining tips from us." }[a.interest] || "A day shaped around your interests, arranged by Bhavna."]
  ],
  fillers: [["Free exploration day", "No fixed plan — wander with our handpicked local tips in your pocket."]],
  last: ["Souvenirs & departure", "Last-minute buys and a relaxed meal before your transfer out."]
};

const PLAN_SETS = {
  maldives: {
    questions: [
      { key: "island", label: "Which island area sounds right?", options: ["North Malé Atoll — speedboat, easy arrivals", "South Malé Atoll — speedboat, calmer waters", "Baa Atoll — mantas (May–Nov), UNESCO reefs", "South Ari Atoll — whale sharks, year-round", "A local island — Maafushi, Thulusdhoo, Dhigurah", "No preference — advise me"] },
      { key: "style", label: "Stay style?", options: ["Luxury", "Premium", "Family-friendly", "Budget — local island guesthouse"] },
      { key: "stay", label: "Sleep style?", options: ["Overwater villa", "Beach villa", "Guesthouse room", "Either — surprise me"] }
    ],
    picks: {
      "Luxury": "Resorts Bhavna often books at this level: Soneva Jani and Cheval Blanc Randheli (Noonu Atoll), Soneva Fushi (Baa), One&Only Reethi Rah (North Malé), Waldorf Astoria Ithaafushi (South Malé). She will confirm the right one for your dates.",
      "Premium": "Resorts Bhavna often books at this level: Kuramathi (Rasdhoo Atoll), Sun Siyam Iru Fushi (Noonu), Anantara Dhigu (South Malé), Hard Rock Hotel Maldives (North Malé). She will confirm the right one for your dates.",
      "Family-friendly": "Family favourites Bhavna often books: Kuramathi (Bageecha Kids Club), Sun Siyam Olhuveli (South Malé), Siyam World (Noonu), Sun Siyam Iru Fushi. She will confirm the right one for your dates.",
      "Budget — local island guesthouse": "The budget route: family-run guesthouses on local islands like Maafushi, Thulusdhoo or Dhigurah — designated bikini beach, daily snorkel and sandbank boats, and real Maldivian island life. Bhavna will pick the right island and guesthouse for you."
    },
    core: a => {
      const isl = a.island || "";
      const isLocal = isl.startsWith("A local island");
      const transfer = isl.startsWith("North Malé") ? "a 15–55 minute speedboat ride — boats run day and night, so even a late flight works"
        : isl.startsWith("South Malé") ? "a relaxed 30–45 minute speedboat ride"
        : isl.startsWith("Baa") ? "a scenic seaplane flight of about 35 minutes (seaplanes fly in daylight — Bhavna will time it around your flight)"
        : isl.startsWith("South Ari") ? "a seaplane, or a short domestic flight plus a boat ride"
        : isLocal ? "a shared speedboat or the public ferry from Malé"
        : "a transfer matched to your flight timings";
      const home = isLocal ? "your guesthouse" : "your " + (a.stay === "Beach villa" ? "beach villa" : a.stay === "Overwater villa" ? "overwater villa" : a.stay === "Guesthouse room" ? "guesthouse" : "villa");
      const marine = isl.startsWith("Baa") ? ["Manta day (in season)", "Snorkel Hanifaru Bay in Baa's UNESCO Biosphere Reserve — from May to November, mantas gather here in numbers found nowhere else. Outside the season, the house reef and nearby dive sites (thilas) take over."]
        : isl.startsWith("South Ari") || (isLocal && isl.includes("Dhigurah")) ? ["Whale shark excursion", "A boat day in the South Ari Marine Protected Area, searching for whale sharks — they feed here all year. Sightings are never guaranteed, but this is the best water in the country for it."]
        : isLocal ? ["Snorkel boat trip", "A guesthouse-run snorkel trip — turtles, rays and coral gardens, with a sandbank stop for photos and a swim."]
        : ["House reef & sandbank day", "Snorkel the house reef straight off the beach in the morning, then a boat out to a white sandbank for a picnic swim."];
      const flavour = a.style === "Family-friendly" ? ["Family day", "Kids' club and shallow-lagoon time for the little ones, a family snorkel safari, and an early movie night under the stars."]
        : a.style === "Luxury" ? ["Private indulgence day", "A private sandbank picnic, a spa ritual in the afternoon and a candle-lit beach dinner to finish."]
        : isLocal ? ["Resort day-visit", "A popular local-island move: a day pass to a nearby resort island for its pools, beach and restaurants — then back to your guesthouse by evening. (Local islands are alcohol-free and swimwear is for the designated bikini beach — Bhavna will brief you.)"]
        : ["Water sports & diving day", "Jet-ski, parasailing or an introductory dive — or a certified fun dive on a coral thila, arranged with the dive centre."];
      return [
        ["Arrive & settle in", "Land at Malé (Velana International) and transfer by " + transfer + ". Check in to " + home + ", freshen up and take a gentle sunset walk — arrival days are for unwinding, not rushing."],
        marine,
        ["Sandbank & sunset dolphins", "A lazy morning, then an afternoon boat out to a sandbank, ending with a sunset cruise as dolphins ride the bow wave."],
        flavour,
        isLocal ? ["Island life day", "Cycle around the island, coffee at a harbour café, local crafts — and sunset at the sandbank tip."] : ["Local island visit", "A half-day trip to a nearby inhabited island — real Maldivian life, local cafés and souvenir crafts, so different from resort islands."]
      ];
    },
    fillers: [
      ["Reef day, round two", "A different snorkel or dive site — or try a night snorkel and see the reef wake up after dark."],
      ["Pure leisure day", "No fixed plan — lagoon, pool and beach entirely at your pace, spa if you feel like it."]
    ],
    last: ["Last lagoon morning", "A slow breakfast and one final swim, then your transfer back to Malé in time for your flight. (Seaplane guests leave earlier in the day — Bhavna times everything for you.)"]
  },
  bali: {
    questions: [
      { key: "area", label: "Where do you want to stay?", options: ["Ubud", "Seminyak", "Kuta", "Nusa Dua", "A mix — split my stay"] },
      { key: "mood", label: "What's your Bali mood?", options: ["Culture & temples", "Beach & nightlife", "Wellness & relaxation"] }
    ],
    core: a => [
      ["Arrive in Bali", "Land at Denpasar and transfer to " + (a.area || "your stay") + ". Settle in, wander the neighbourhood and enjoy your first Balinese dinner."],
      ["Temples & culture", "A guided day through Bali's spiritual side — ancient temples, traditional dance and artisan villages."],
      ["Rice terraces & waterfalls", "The emerald Tegalalang terraces, a jungle waterfall swim and a coffee plantation tasting."],
      ["Beach day", "Surf, beach clubs or pure downtime on the sand — paced exactly how you like it."],
      ["Nusa Penida day trip", "A boat day to the island's famous cliffs and crystal bays, including the Kelingking viewpoint."]
    ],
    fillers: [["Explore at your pace", "Cafés, markets and hidden beaches — a free day with our local tips in your pocket."]],
    last: ["Souvenirs & departure", "Last-minute shopping and a relaxing massage before your transfer to the airport."]
  },
  dubai: {
    questions: [
      { key: "area", label: "Which area for your hotel?", options: ["Downtown — Burj Khalifa side", "Dubai Marina", "Palm Jumeirah", "Deira — old Dubai"] },
      { key: "style", label: "Your Dubai style?", options: ["Luxury", "Family fun", "City explorer"] }
    ],
    core: a => [
      ["Arrive in Dubai", "Check in around " + shortOpt(a.area || "Downtown") + " and take an evening stroll — the city lights are the first attraction."],
      ["Icons day", "Burj Khalifa from the top, Dubai Mall, and the dancing fountains by night."],
      ["Desert safari", "Dune bashing, camel rides, a desert-camp dinner and live shows under the stars."],
      ["Old Dubai", "Gold and spice souks, an abra boat ride across the Creek and the Al Fahidi heritage quarter."],
      ["Palm & beach day", "Palm Jumeirah and Atlantis, then a relaxed afternoon on the beach."]
    ],
    fillers: [["Your choice day", "An Abu Dhabi day trip, a theme park, or pure shopping — we will line it up for you."]],
    last: ["Last looks & departure", "A final mall run or a slow brunch, then your transfer to the airport."]
  },
  seychelles: {
    questions: [
      { key: "base", label: "Your island base?", options: ["Mahé", "Praslin", "La Digue", "Island-hopping"] },
      { key: "style", label: "Your Seychelles style?", options: ["Luxury", "Relaxed beach", "Nature & hiking"] }
    ],
    core: a => [
      ["Arrive & unwind", "Settle into your stay (" + (a.base || "Mahé") + " base) and watch your first Indian Ocean sunset."],
      ["Beach trail day", "Famous beaches one after another — powdery sand, granite boulders and swim stops along the way."],
      ["Vallée de Mai, Praslin", "The ancient palm forest called the Garden of Eden, then Anse Lazio — often called the world's best beach."],
      ["La Digue slow day", "Bicycles, giant tortoises and the picture-perfect boulders of Anse Source d'Argent."],
      ["Reef day", "Snorkelling or a glass-bottom boat over coral gardens full of tropical fish."]
    ],
    fillers: [["Barefoot leisure day", "No plan at all — just you, the sand and the sea."]],
    last: ["Last swim & departure", "A final dip and a fresh seafood lunch before your transfer to the airport."]
  },
  mauritius: {
    questions: [
      { key: "coast", label: "Which coast suits you?", options: ["North — Grand Baie side", "West — sunset side", "East — quiet & breezy", "South — wild & scenic"] },
      { key: "style", label: "Your Mauritius style?", options: ["Luxury", "Family-friendly", "Golf & leisure"] }
    ],
    core: a => [
      ["Arrive in Mauritius", "Transfer to your stay on the " + shortOpt(a.coast || "North").toLowerCase() + " coast and unwind with a sunset by the lagoon."],
      ["Catamaran day", "Sail to Île aux Cerfs — turquoise lagoons, snorkelling and a barbecue on board."],
      ["The colourful south", "Chamarel's seven-coloured earth, waterfalls and the sacred lake of Grand Bassin."],
      ["Port Louis & gardens", "The capital's markets and waterfront, then the famous Pamplemousses botanical gardens."],
      ["Sea adventures", "Swim with dolphins, try parasailing, or walk under the sea — your pick."]
    ],
    fillers: [["Resort leisure day", "Beach, pool and spa — a day with nothing on the clock."]],
    last: ["Last lagoon morning", "A slow breakfast and a final swim before your airport transfer."]
  }
};

function destIdByName(name) { const d = DESTINATIONS.find(x => x.name === name); return d ? d.id : null; }
function planGroups() {
  const groups = [];
  if (!planState.destId) groups.push({ key: "dest", label: "Where would you like to go?", options: DESTINATIONS.map(d => d.name) });
  const set = PLAN_SETS[planState.destId] || GENERIC_SET;
  groups.push(...set.questions, DAYS_GROUP);
  return groups;
}
function renderPlanQuestions() {
  const d = DESTINATIONS.find(x => x.id === planState.destId);
  document.getElementById("planTitle").textContent = d ? "Your " + d.name + " plan" : "Your trip plan";
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
      b.className = "chip" + (planState.answers[g.key] === opt ? " active" : "");
      b.textContent = opt;
      b.addEventListener("click", () => {
        planState.answers[g.key] = opt;
        if (g.key === "dest") { planState.destId = destIdByName(opt); renderPlanQuestions(); return; }
        chips.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === b));
        validatePlan();
      });
      chips.appendChild(b);
    });
    div.appendChild(chips);
    wrap.appendChild(div);
  });
  validatePlan();
}
function validatePlan() {
  document.getElementById("planGo").disabled = planGroups().some(g => !planState.answers[g.key]);
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
  planState = { destId: "maldives", answers: {}, tourType: preset.tourType || "", date: preset.date || "" };
  if (preset.durLabel) planState.answers.days = preset.durLabel;
  document.getElementById("planStep1").hidden = false;
  document.getElementById("planStep2").hidden = true;
  renderPlanQuestions();
  planOverlay.hidden = false;
  document.body.style.overflow = "hidden";
  planOverlay.querySelector(".overlay-panel").scrollTop = 0;
}
function closePlan() { planOverlay.hidden = true; document.body.style.overflow = ""; }
document.getElementById("planClose").addEventListener("click", closePlan);
planOverlay.addEventListener("click", e => { if (e.target === planOverlay) closePlan(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closePlan(); });
document.getElementById("planBack").addEventListener("click", () => {
  document.getElementById("planStep2").hidden = true;
  document.getElementById("planStep1").hidden = false;
});

function composeDays(set, d, a, n) {
  const core = set.core(a, d);
  const out = [];
  const bodyCount = n - 1;
  if (bodyCount <= core.length) out.push(...core.slice(0, bodyCount));
  else {
    out.push(...core);
    let i = 0;
    while (out.length < bodyCount) out.push(set.fillers[i++ % set.fillers.length]);
  }
  out.push(set.last);
  return out;
}
let planSummary = "", planDayLines = "";
document.getElementById("planGo").addEventListener("click", () => {
  const d = DESTINATIONS.find(x => x.id === planState.destId);
  const set = PLAN_SETS[d.id] || GENERIC_SET;
  const n = DAYS_MAP[planState.answers.days] || 5;
  const days = composeDays(set, d, planState.answers, n);
  const picks = Object.keys(planState.answers).filter(k => k !== "days" && k !== "dest").map(k => planState.answers[k]);
  planSummary = d.name + " · " + n + " days" + (planState.date ? " · from " + planState.date : "") + (picks.length ? " · " + picks.join(" · ") : "");
  planDayLines = days.map((day, i) => "Day " + (i + 1) + ": " + day[0] + " — " + day[1]).join("\n");
  document.getElementById("planMeta").textContent = planSummary;
  const picksEl = document.getElementById("planPicks");
  const islAns = planState.answers.island || "";
  const pickKey = islAns.startsWith("A local island") ? "Budget — local island guesthouse" : planState.answers.style;
  if (set.picks && pickKey && set.picks[pickKey]) { picksEl.textContent = set.picks[pickKey]; picksEl.hidden = false; }
  else picksEl.hidden = true;
  document.getElementById("planDays").innerHTML =
    days.map(day => `<li><span class="day-badge"></span><div><strong>${day[0]}</strong><p>${day[1]}</p></div></li>`).join("");
  document.getElementById("planWhats").href = "https://wa.me/" + WA_NUMBER + "?text=" +
    encodeURIComponent("Hi Bhavna! I sketched a trip with your planner:\n" + planSummary + "\n\nMy sample plan:\n" + planDayLines + "\n\nPlease customise this for me.");
  document.getElementById("planStep1").hidden = true;
  document.getElementById("planStep2").hidden = false;
  planOverlay.querySelector(".overlay-panel").scrollTop = 0;
});
document.getElementById("planContact").addEventListener("click", () => {
  const d = DESTINATIONS.find(x => x.id === planState.destId);
  if (d) document.getElementById("fDest").value = d.name;
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

// Parallax — transform-only, single rAF loop, no libraries.
// Hero background drifts slower than the headline; doodles float at their own
// speeds; section photos shift gently. Fully disabled for reduced motion.
(function parallax() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const heroImg = document.getElementById("heroImg");
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
      const y = -hr.top;
      heroImg.style.transform = `translate3d(0, ${y * 0.30}px, 0) scale(1.14)`;
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
});
mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mainNav.classList.remove("open")));

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
    "New trip enquiry — Elite Exposures website",
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
