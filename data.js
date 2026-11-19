// Shared demo data — used by index.html (app.js) and byod.html (byod.js).
// Destination content adapted from eliteexposures.in (cleaned); Maldives planner
// dataset researched Nov 2026. Bhavna's real data replaces this when she shares it.

const U = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w || 1000}`;

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
