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
    <div class="pop-foot"><span class="price-note">Price on enquiry</span><button class="btn-enquire" type="button">Enquire →</button></div></div>`;
  el.querySelector("img").addEventListener("click", () => openDest(d.id));
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

// Search-style bar -> prefill the enquiry form and jump to it (enquiry-style, not a booking engine)
document.getElementById("heroSearch").addEventListener("submit", e => {
  e.preventDefault();
  const dest = document.getElementById("hsDest").value;
  const type = document.getElementById("hsType").value;
  const dur = document.getElementById("hsDur").value;
  if (dest) document.getElementById("fDest").value = dest;
  if (type) document.getElementById("fTour").value = type;
  const msg = document.getElementById("fMsg");
  if (dur && !msg.value.trim()) msg.value = "Preferred trip duration: " + dur;
  document.getElementById("enquire").scrollIntoView({ behavior: "smooth" });
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
