// Elite Exposures Travel — concept demo. Content adapted from eliteexposures.in (cleaned).
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
    intro: "Plan your travel with Elite Exposures Travel to Taiwan — discover the best places to visit with our itinerary, immerse yourself in rich culture and heritage, and embark on adventures to hidden gems.",
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

const MV_AREAS = {
  northmale: {
    label: "North Malé Atoll — speedboat, easy arrivals", short: "North Malé Atoll",
    airport: "Velana International Airport, Malé",
    transfer: "a 15–55 minute speedboat ride (boats run day and night, so even a late flight works)",
    excursions: ["Banana Reef snorkelling", "Malé city and market tour", "Sandbank picnic trip", "Sunset dolphin cruise"],
    resorts: [
      { name: "One&Only Reethi Rah", area: "northmale", styles: ["Luxury"], stay: "grand beach and overwater villas spread across 12 beaches", activities: ["Private beach picnics on a secluded sandbank", "Spa and wellness rituals", "House-reef snorkelling and diving", "Tennis, art studio and water sports"], inclusions: ["daily breakfast", "private beach and pool access", "non-motorised water sports"] },
      { name: "Hard Rock Hotel Maldives", area: "northmale", styles: ["Premium", "Family-friendly"], stay: "beach and overwater villas at the CROSSROADS marina", activities: ["Roxity Kids Club and Teen Spirit sessions", "Snorkelling and dive-centre trips", "Live music and themed dinners", "Exploring the CROSSROADS marina and shops"], inclusions: ["daily breakfast", "kids' club access", "lagoon water sports"] },
      { name: "Bandos Maldives", area: "northmale", styles: ["Family-friendly", "Premium"], stay: "beach villas just a 15-minute speedboat ride from Malé", activities: ["Kokko Kids Club adventures", "House-reef snorkelling straight off the beach", "Glass-bottom boat rides and night fishing", "Dive school experiences"], inclusions: ["daily breakfast", "kids' club", "house reef access"] }
    ]
  },
  southmale: {
    label: "South Malé Atoll — speedboat, calmer waters", short: "South Malé Atoll",
    airport: "Velana International Airport, Malé",
    transfer: "a relaxed 30–45 minute speedboat ride",
    excursions: ["Guraidhoo local island and surf point", "Sunset dolphin cruise", "Sandbank and snorkelling trip", "Reef snorkelling at Cocoa Thila"],
    resorts: [
      { name: "Anantara Dhigu", area: "southmale", styles: ["Luxury", "Premium", "Family-friendly"], stay: "beach and overwater villas around a calm family lagoon", activities: ["Overwater spa treatments", "Surf breaks a short boat ride away", "Kids' club and family lagoon time", "Sunset cruises from the jetty"], inclusions: ["daily breakfast", "lagoon activities", "kids' club"] },
      { name: "Sun Siyam Olhuveli", area: "southmale", styles: ["Premium", "Family-friendly"], stay: "beach and water villas spread over three linked islands", activities: ["Kids' club and family pools", "House-reef snorkelling", "Jetty sunset fishing", "Water sports centre fun"], inclusions: ["daily breakfast", "family pools", "kids' club access"] },
      { name: "Adaaran Club Rannalhi", area: "southmale", styles: ["Premium"], stay: "beach rooms and water bungalows on a compact, friendly island", activities: ["House-reef snorkelling", "Night fishing trips", "Spa treatments", "Excursion-desk boat trips"], inclusions: ["daily breakfast", "beach and reef access"] }
    ]
  },
  baa: {
    label: "Baa Atoll — mantas (May–Nov), UNESCO reefs", short: "Baa Atoll",
    airport: "Velana International Airport, Malé",
    transfer: "a scenic 35-minute seaplane flight (seaplanes fly in daylight — Bhavna times it around your flight)",
    excursions: ["Hanifaru Bay manta snorkelling (May–Nov, UNESCO reserve)", "Coral garden snorkelling", "Turtle safari", "Dharavandhoo local island visit"],
    resorts: [
      { name: "Soneva Fushi", area: "baa", styles: ["Luxury"], stay: "barefoot-luxury beach villas hidden in jungle greenery", activities: ["Open-air cinema under the stars", "Observatory stargazing", "Glass-blowing studio and cooking classes", "Private sandbank experiences"], inclusions: ["daily breakfast", "a bicycle for every villa", "non-motorised water sports"] },
      { name: "Four Seasons Landaa Giraavaru", area: "baa", styles: ["Luxury"], stay: "beach and overwater villas inside a UNESCO biosphere reserve", activities: ["Marine Discovery Centre and turtle rehabilitation visit", "Manta snorkel safaris (in season)", "Ayurvedic spa village rituals", "Seaplane photo flights over the atoll"], inclusions: ["daily breakfast", "marine centre experiences", "yoga and wellness sessions"] },
      { name: "Royal Island Resort & Spa", area: "baa", styles: ["Premium"], stay: "beach bungalows a short hop from Hanifaru Bay", activities: ["Hanifaru Bay trips (in season)", "House-reef diving", "Sunset fishing", "Spa and tennis"], inclusions: ["daily breakfast", "beach access", "excursion desk"] }
    ]
  },
  southari: {
    label: "South Ari Atoll — whale sharks, year-round", short: "South Ari Atoll",
    airport: "Velana International Airport, Malé",
    transfer: "a seaplane of about 25–30 minutes, or a short domestic flight plus a speedboat",
    excursions: ["Whale shark safari in the South Ari MPA", "Manta point snorkelling", "Night diving", "Dhigurah local island and sandbank walk"],
    resorts: [
      { name: "LUX* South Ari Atoll", area: "southari", styles: ["Luxury", "Premium"], stay: "beach and overwater villas along a long, calm lagoon", activities: ["Whale shark excursions", "House-reef diving", "Beach cinema and pop-up dining", "Spa and yoga sessions"], inclusions: ["daily breakfast", "lagoon activities", "beach facilities"] },
      { name: "Centara Grand Island Resort", area: "southari", styles: ["Premium", "Family-friendly"], stay: "beach suites and overwater villas, proudly family-focused", activities: ["Kids' club and family pool days", "House-reef snorkelling", "Whale shark trips", "Spa and water sports"], inclusions: ["daily breakfast", "kids' club", "house reef access"] },
      { name: "Villa Park (Sun Island)", area: "southari", styles: ["Family-friendly", "Premium"], stay: "one of the Maldives' largest resort islands, all gardens and lagoons", activities: ["Whale shark excursions", "Stingray and shark feeding shows", "Cycling the island gardens", "Spa and water sports"], inclusions: ["daily breakfast", "island bicycles", "lagoon access"] }
    ]
  },
  local: {
    label: "A local island — Maafushi, Thulusdhoo, Dhigurah", short: "a local island",
    airport: "Velana International Airport, Malé",
    transfer: "a shared speedboat or the public ferry from Malé (your guesthouse arranges it)",
    excursions: ["Snorkel trips to reefs and turtle points", "Sandbank picnics", "Resort island day-visits", "Night fishing and dolphin cruises"],
    resorts: [
      { name: "Maafushi guesthouses", area: "local", styles: ["Budget — local island guesthouse"], stay: "family-run guesthouses near the bikini beach (Bhavna picks the right one for you)", activities: ["Daily snorkel and sandbank boats", "Bikini beach days", "Dive school outings", "Island cafés and souvenir streets"], inclusions: ["daily breakfast", "excursion desk bookings", "airport transfer help"] },
      { name: "Thulusdhoo guesthouses", area: "local", styles: ["Budget — local island guesthouse"], stay: "surf-island guesthouses by a soft lagoon", activities: ["Cokes and Chickens surf breaks", "Snorkelling and sandbank trips", "Island cycling", "Local cafés and crafts"], inclusions: ["daily breakfast", "surf boat transfers (arranged)", "excursion desk bookings"] },
      { name: "Dhigurah guesthouses", area: "local", styles: ["Budget — local island guesthouse"], stay: "guesthouses on a long, quiet island beside the whale shark area", activities: ["Whale shark tours (year-round)", "Long sandbank walks", "House-reef snorkelling", "Bicycle island days"], inclusions: ["daily breakfast", "tour bookings", "transfer help"] }
    ]
  }
};
const MV_NOPREF_KEY = "advise";
MV_AREAS[MV_NOPREF_KEY] = {
  label: "No preference — advise me", short: "the Maldives",
  airport: "Velana International Airport, Malé",
  transfer: "a transfer matched to your resort and flight timings",
  excursions: ["Sandbank picnic trip", "Sunset dolphin cruise", "House-reef snorkelling", "Local island visit"],
  resorts: [MV_AREAS.northmale.resorts[0], MV_AREAS.baa.resorts[0], MV_AREAS.southari.resorts[0], MV_AREAS.local.resorts[0]]
};

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
      `Breakfast at ${R.name} (included in your stay), then: ${act[i].charAt(0).toLowerCase() + act[i].slice(1)} — one of the experiences ${R.name} is loved for. Evening at leisure.`]);
    if (exc[i]) middles.push([exc[i].split("(")[0].trim(),
      `After breakfast, head out on the water: ${exc[i].charAt(0).toLowerCase() + exc[i].slice(1)} — a signature ${A.short} excursion, arranged with trusted local operators.`]);
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
  days.push(["Last morning & departure",
    `Breakfast and one final swim, then ${A.transfer.replace(/^a |^an /, "the ")} back to ${A.airport} in time for your flight${A.transfer.includes("seaplane") ? " — seaplane guests leave earlier in the day, and Bhavna times everything for you" : ""}.`]);
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
      const y = -hr.top;
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
