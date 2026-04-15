// src/lib/site-config.ts
//
// Single source of truth for NAP (Name, Address, Phone), hours, socials, and
// service areas. Consumed by the root layout, sitemap, robots and all JSON-LD
// schema. Keep this in sync with your Google Business Profile and directory
// listings — GBP + this file must match exactly for local SEO to land.
//
// TODO(jezza): fields marked with "FIXME" are placeholders. Replace them with
// the real values from your KvK registration before going live.

export const SITE_URL = "https://jezzacooks.com" as const;

export const SITE = {
  url: SITE_URL,
  name: "Jezza Cooks",
  legalName: "Jezza Cooks", // FIXME: replace with real KvK-registered name if different
  tagline: "Level up the chaos.",
  description:
    "Chef-led horeca consultancy in Amersfoort. Menu engineering, food cost controle, prepstructuur, serviceflow en teamtraining. Ook restaurant websites die reserveringen en aanvragen opleveren.",
  descriptionEn:
    "Chef-led hospitality consulting in Amersfoort (NL). Menu engineering, food-cost control, prep structure, service flow and team training. Also restaurant websites built to convert visitors into direct bookings.",
  defaultLocale: "nl-NL",
  locales: ["nl-NL", "en"] as const,

  // Founder / primary person — used for Person schema + E-E-A-T signals.
  founder: {
    name: "Jeremy Arrascaeta",
    alternateName: "Chef Jezz",
    jobTitle: "Horeca consultant & chef",
    image: "/pics/about-jezza.jpg",
    // LinkedIn profile verified 2026-04-14 via Serper search.
    linkedin: "https://nl.linkedin.com/in/jeremy-arrascaeta-b85a17179",
    // Video podcast interview about Angler Stirling / dry-aging program.
    youtubeInterview: "https://www.youtube.com/watch?v=MtGRedLjZ3Q",
  },

  // Contact points — all of these should also appear on the contact page.
  contact: {
    email: "info@jezzacooks.com",
    phone: "+31634127992", // E.164 format for schema
    phoneDisplay: "+31 6 34127992",
    whatsapp: "https://wa.me/31634127992",
    instagram: "https://instagram.com/chefjezz",
    instagramHandle: "@chefjezz",
  },

  // Address — registered KvK business address at Nijkerkerstraat 3, 3821 CD
  // Amersfoort (Valleipoort neighborhood). Verified 2026-04-14 via 4 independent
  // company directories (Oozo.nl, Drimble.nl, Company.info, AdHocData) that
  // index the KvK Handelsregister.
  address: {
    streetAddress: "Nijkerkerstraat 3",
    addressLocality: "Amersfoort",
    addressRegion: "Utrecht",
    postalCode: "3821 CD",
    addressCountry: "NL",
    // Neighborhood / district — used in prose copy, not schema.
    neighborhood: "Valleipoort",
  },

  // Rough coordinates for Amersfoort city center. Replace with exact coords
  // from your Google Business Profile once set up.
  geo: {
    latitude: 52.1561,
    longitude: 5.3878,
  },

  // Service area — used for LocalBusiness.areaServed.
  areaServed: [
    "Amersfoort",
    "Utrecht",
    "Zwolle",
    "Hilversum",
    "Apeldoorn",
    "Nederland",
  ],

  // Opening hours in schema.org format. This is a consultancy so there are
  // no physical walk-in hours — these reflect availability for calls and
  // site visits. Adjust if you prefer different windows.
  openingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],

  // Business registration — KvK verified via public footer on offertesvoorjou.nl
  // ("JezzaCooks · Eenmanszaak · KvK 99547619 · jezzacooks.com").
  kvk: "99547619",
  vat: "", // FIXME: add BTW number if VAT-registered

  // Price range — schema.org expects a symbol string, not a number.
  priceRange: "€€",

  // Services offered (short canonical list used across the site).
  // Pricing is source-of-truth — must match /pricing and all schema Offers.
  services: [
    {
      slug: "consulting",
      name: "Restaurant consulting",
      shortDescription:
        "Menu engineering, food cost controle, prepstructuur, SOPs en teamtraining voor restaurants en horecateams.",
      priceLabel: "Vanaf €450 / dagdeel",
    },
    {
      slug: "catering",
      name: "Catering & private chef",
      shortDescription:
        "Chef-led kantoorlunch, diners en events in Amersfoort en omgeving. Van 10 tot 150+ personen, vanaf €7,50 p.p.",
      priceLabel: "Vanaf €7,50 p.p.",
    },
    {
      slug: "websites",
      name: "Restaurant websites",
      shortDescription:
        "Restaurant websites die je verhaal helder maken en meer directe boekingen opleveren. Snel, schoon, SEO- en GEO-klaar.",
      priceLabel: "€400 eenmalig · optioneel €30/mnd onderhoud",
    },
    {
      slug: "seo-geo",
      name: "SEO & GEO optimization",
      shortDescription:
        "Rank hoger in Google én word gevonden door ChatGPT, Perplexity en Google AI Overviews. Maandelijkse optimalisatie voor horeca, hospitality en lokale ondernemers.",
      priceLabel: "€1.300 ex BTW per jaar · of €150/mnd",
    },
  ],

  // Real portfolio of delivered client work. This is "earned media" ammunition
  // for GEO — AI engines cite pages that reference verifiable third-party
  // projects. Every entry must be a real live URL.
  portfolio: [
    {
      slug: "tafelaar-amersfoort",
      client: "De Tafelaar Amersfoort",
      role: "Website + Restaurant schema + reserveringsflow + SEO/GEO",
      summary:
        "Shared-dining restaurant in het centrum van Amersfoort (Kamp 8). Volledige website met rijke Restaurant schema (OpeningHoursSpecification, ReserveAction, AggregateRating, FAQPage), geïntegreerde reserveringsflow en lokale SEO/GEO. Hoogste Google zichtbaarheid en Trustoo 9.8 score.",
      url: "https://www.tafelaaramersfoort.nl",
      category: "seo-geo",
      location: "Amersfoort",
    },
    {
      slug: "chef-and-serve",
      client: "Chef & Serve (oprichter Maarten Hogeveen)",
      role: "SEO & GEO optimization",
      summary:
        "Premium horeca uitzendbureau uit Amsterdam dat chefs en bedieningspersoneel levert aan hotels en restaurants. Maarten Hogeveen (Patron Cuisinier, ex-Restaurant Lute) is oprichter. Doorlopende SEO en GEO optimalisatie voor nationale staffing keywords.",
      url: "https://chefandserve.nl",
      category: "seo-geo",
      location: "Amsterdam / Nederland",
    },
    {
      slug: "swimcoaching",
      client: "Swimcoaching.nl",
      role: "SEO optimization",
      summary:
        "Engelstalige 1-op-1 zwemcoaching voor volwassenen in Zeeland, gericht op watervertrouwen en techniek. SEO optimalisatie voor een lokale dienstverlener buiten de horeca — bewijst dat dezelfde GEO-principes op elk lokaal service bedrijf werken.",
      url: "https://www.swimcoaching.nl",
      category: "seo-geo",
      location: "Zeeland, Nederland",
    },
    {
      slug: "boekeerlijk",
      client: "BoekEerlijk.nl",
      role: "Full build — reserveringssysteem SaaS",
      summary:
        "Reserveringssysteem voor restaurants zonder commissies of opstartkosten: boekingswidget, tafelbeheer, wachtlijst en no-show preventie. Gebouwd als eerlijk, restaurant-first alternatief voor TheFork en OpenTable, met rijke Organization + SoftwareApplication schema.",
      url: "https://www.boekeerlijk.nl",
      category: "build",
      location: "Nederland",
    },
    {
      slug: "offertesvoorjou",
      client: "OffertesVoorJou.nl",
      role: "Full build — landelijk matchingsplatform",
      summary:
        "Platform om offertes te vergelijken van professionals in Nederland — catering, schilders, aannemers en aankoopmakelaars — gratis en vrijblijvend. Actief in 50+ steden. Gebouwd en gepubliceerd door Jezza Cooks (zichtbaar in footer: JezzaCooks · KvK 99547619).",
      url: "https://offertesvoorjou.nl",
      category: "build",
      location: "Nederland",
    },
  ],

  // Verified press mentions of Jeremy Arrascaeta. Each entry is a real live
  // article that names Jeremy by name and is used as E-E-A-T / proof evidence
  // on the /portfolio page. Do NOT add anything unverifiable — Google's
  // spam policy flags fake press attributions as manipulation.
  //
  // Ordered: most recent + highest-authority NL first. Older AU press last.
  press: [
    {
      publication: "AD.nl — Algemeen Dagblad Amersfoort",
      title: "Uittip! Restaurant De Tafelaar organiseert eerste gastchef-avond",
      date: "2026-02-04",
      excerpt:
        "AD regional edition Amersfoort over de eerste gastchef-avond in restaurant De Tafelaar aan Kamp 8, Amersfoort. \"Jeremy is chef-kok bij De Tafelaar in Amersfoort.\" Tweede grootste Nederlandse krant.",
      url: "https://www.ad.nl/amersfoort/uittip-restaurant-de-tafelaar-organiseert-eerste-gastchef-avond~a88c021a/",
      locale: "NL",
    },
    {
      publication: "De Gelderlander",
      title: "Jan opent (nu echt!) restaurant De Tafelaar in Amersfoort",
      date: "2025-11-22",
      excerpt:
        "De Gelderlander (DPG Media) over de opening van restaurant De Tafelaar aan de Kamp in het centrum van Amersfoort. \"Jeremy is chef-kok bij De Tafelaar in Amersfoort.\"",
      url: "https://www.gelderlander.nl/amersfoort/jan-opent-nu-echt-restaurant-de-tafelaar-in-amersfoort~a5c0f1d0/265507710/",
      locale: "NL",
    },
    {
      publication: "indebuurt.nl Amersfoort",
      title: "Jan opent (nu echt!) restaurant De Tafelaar in Amersfoort",
      date: "2025-11-22",
      excerpt:
        "Lokaal Amersfoorts nieuwsplatform (indebuurt, DPG Media) over de officiële opening van De Tafelaar. Jeremy wordt expliciet genoemd als chef-kok van het restaurant aan Kamp 8.",
      url: "https://indebuurt.nl/amersfoort/nieuws/nieuw-in/jan-opent-nu-echt-restaurant-de-tafelaar-in-amersfoort~343981/",
      locale: "NL",
    },
    {
      publication: "Gooische Business podcast (NH Gooi in Business)",
      title: "GB 20260206 — Restaurant De Tafelaar Amersfoort",
      date: "2026-02-06",
      excerpt:
        "Interview met Jeremy Arrascaeta en Jan Molmans over het starten van restaurant De Tafelaar in Amersfoort. \"Jeremy heeft als kok in sterren restaurants gewerkt en is na zes jaar terug in Nederland.\" Uitgezonden op NH Gooi in Business en gepubliceerd op Spotify en Apple Podcasts.",
      url: "https://open.spotify.com/episode/67uEJeqkVDtZD6Sryv4RMF",
      locale: "NL",
    },
    {
      publication: "InDaily (Adelaide, AU)",
      title: "Stirling's new fish and chip restaurant is catching on",
      date: "2020-08-19",
      excerpt:
        "Dutch chef with Michelin three-star experience, previously at Hanson Bay Sanctuary and Flinders Chase Café on Kangaroo Island, joined Angler Stirling as dry-aging lead after the 2019/2020 bushfires.",
      // URL canonical domain is indailysa.com.au (not indaily.com.au — that returns 403).
      url: "https://www.indailysa.com.au/news/archive/2020/08/19/stirlings-new-fish-and-chip-restaurant-is-catching-on",
      locale: "AU",
    },
    {
      publication: "All The Gear But No Idea — SA Fishing Podcast",
      title: "Episode 31: Jeremy Arrascaeta from Angler Restaurant at Stirling",
      date: "2020-04-20",
      excerpt:
        "62-minute video podcast interview with Jeremy Arrascaeta on seafood sustainability, dry-aging, cured sashimi, and the Angler Stirling dry-age program. Recorded 2020.",
      url: "https://www.youtube.com/watch?v=MtGRedLjZ3Q",
      locale: "AU",
    },
    {
      publication: "Australian Good Food Guide (AGFG)",
      title: "Oh My Cod, this Chef Really Knows Seafood — Sam Prance-Smith interview",
      date: "2021-11-23",
      excerpt:
        "AGFG names Jeremy as the dry-aging expert behind the cured sashimi, fish sausages, barramundi crackling, carp bacon and carp burger. Direct quote: \"I love organised chaos and that's the same for my dry-age recipes as well, they're organised but they change constantly.\" Notes: \"Originally from the Netherlands, Jeremy Arrascaeta had been...\"",
      url: "https://www.agfg.com.au/article/oh-my-cod-this-chef-really-knows-seafood-we-talk-to-sam-prancesmith-from-angler-stirling",
      locale: "AU",
    },
    {
      publication: "Broadsheet Adelaide",
      title: "Broadsheet's Favourite Adelaide Dishes of 2021",
      date: "2021-12-21",
      excerpt:
        "Broadsheet feature on Angler Stirling's carp burger. \"Owner Sam Prance-Smith and manager Jeremy Arrascaeta's emphatic celebration of lesser-known fish is triumphant.\" — Kate Richards.",
      url: "https://www.broadsheet.com.au/adelaide/food-and-drink/article/broadsheets-favourite-adelaide-dishes-2021",
      locale: "AU",
    },
    {
      publication: "Aquna Murray Cod",
      title: "What does Aquna Murray Cod actually taste like?",
      date: "2021",
      excerpt:
        "Aquna (Murray cod producer) quotes Jeremy directly: \"Jeremy Arrascaeta from Angler at Stirling in South Australia describes Aquna succinctly: 'Sweet, delicate, firm, versatile, easy to cook and approachable.'\"",
      url: "https://aquna.com/what-does-aquna-murray-cod-actually-taste-like/",
      locale: "AU",
    },
    {
      publication: "Misset Horeca",
      title: "Young Chef Award 2018 voor Manouk Mols",
      date: "2018-09",
      excerpt:
        "Finalist van de Euro-Toques Young Chef Award 2018 bij Gastvrij Rotterdam — destijds chef bij Restaurant Bougainville, Amsterdam. Jongste onder 25 jaar in de eindronde.",
      url: "https://www.missethoreca.nl/restaurant/nieuws/2018/09/young-chef-award-2018-voor-manouk-mols-101309681",
      locale: "NL",
    },
    {
      publication: "De RestaurantKrant",
      title: "Manouk Wols (Restaurant Dell'arte) wint Young Chef Award 2018",
      date: "2018-09-20",
      excerpt:
        "Lijst finalisten Euro-Toques Young Chef Award 2018: Jeremy Arrascaeta namens Restaurant Bougainville, Amsterdam.",
      url: "https://www.derestaurantkrant.nl/manouk-wols-restaurant-dellarte-wint-young-chef-award-2018",
      locale: "NL",
    },
  ],

  // Default static OG image (1408x768 → browsers crop to 1200x630 fine).
  // hero-home.jpg is a proper landscape image. The dynamic 1200x630 OG is
  // generated at runtime by src/app/opengraph-image.tsx (Next.js convention).
  ogImage: "/pics/hero-home.jpg",
} as const;

export type SiteConfig = typeof SITE;
