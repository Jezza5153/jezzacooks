// src/lib/schema.ts
//
// Schema.org JSON-LD builders. Each function returns a plain object that
// can be passed straight to <JsonLd data={...} />.
//
// Design notes:
// - We use @graph with stable @id URIs so that every schema block on every
//   page can cross-reference the same Organization/Person/WebSite entities.
//   This is what tells Google "the LocalBusiness on the contact page and the
//   Organization on the home page are the same entity".
// - IDs are fragment URIs on the canonical domain (e.g. "#organization"),
//   which is the pattern Google's own documentation recommends.
// - We only emit fields that are actually populated — schema validators
//   complain about empty strings and undefined values.

import { SITE, SITE_URL } from "@/lib/site-config";

const ORG_ID = `${SITE_URL}/#organization`;
const LOCALBUSINESS_ID = `${SITE_URL}/#localbusiness`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PERSON_ID = `${SITE_URL}/#jeremy`;
// Catering joint-venture entity. Separate FoodEstablishment sub-entity
// because the catering operates from a different physical address (Kamp 8,
// De Tafelaar) than the main Jezza Cooks consultancy (Nijkerkerstraat 3).
// Models the real-world split: Jezza Cooks consultancy = Jeremy's office,
// Tafelaar × Jezza Cooks Catering = joint venture with Jan Molmans at the
// restaurant kitchen.
const CATERING_ID = `${SITE_URL}/#catering`;

// --- Primitive builders ------------------------------------------------------

function buildPostalAddress() {
  const { address } = SITE;
  const out: Record<string, unknown> = {
    "@type": "PostalAddress",
    addressLocality: address.addressLocality,
    addressRegion: address.addressRegion,
    addressCountry: address.addressCountry,
  };
  if (address.streetAddress) out.streetAddress = address.streetAddress;
  if (address.postalCode) out.postalCode = address.postalCode;
  return out;
}

function buildOpeningHoursSpec() {
  return SITE.openingHours.map((slot) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: slot.dayOfWeek,
    opens: slot.opens,
    closes: slot.closes,
  }));
}

function buildSameAs() {
  // All third-party profiles, press mentions, and client footers that name or
  // link to Jezza Cooks / Jeremy Arrascaeta. AI answer engines use sameAs to
  // resolve the entity across the web — the more verifiable links, the higher
  // the trust signal. Deduped because the founder.youtubeInterview URL is
  // also present as a press entry (Gooische Business YouTube interview).
  return Array.from(
    new Set(
      [
        SITE.contact.instagram,
        SITE.founder.linkedin,
        SITE.founder.youtubeInterview,
        ...SITE.press.map((p) => p.url),
        // Third-party client sites that credit Jezza Cooks in their footer:
        "https://offertesvoorjou.nl",
        "https://www.boekeerlijk.nl",
      ].filter(Boolean),
    ),
  );
}

function buildPersonSameAs() {
  // Person-level sameAs — the founder's own verifiable third-party profiles
  // and press attributions. This is what AI engines follow to resolve "who is
  // Jeremy Arrascaeta". Deduped to avoid the youtubeInterview appearing twice
  // (once as founder.youtubeInterview, once inside the press[] array).
  return Array.from(
    new Set(
      [
        SITE.founder.linkedin,
        SITE.founder.youtubeInterview,
        SITE.contact.instagram,
        ...SITE.press.map((p) => p.url),
      ].filter(Boolean),
    ),
  );
}

function buildHasOccupation() {
  // Canonical career occupation objects for Person schema. Each Occupation
  // links to a real organization and period — the raw material LLMs use when
  // answering "who is Jeremy Arrascaeta". Ordered most-recent-first.
  return [
    {
      "@type": "Role",
      roleName: "Chef-kok",
      startDate: "2025",
      hasOccupation: {
        "@type": "Occupation",
        name: "Chef-kok",
        occupationLocation: {
          "@type": "Place",
          name: "Restaurant De Tafelaar Amersfoort — Kamp 8, 3811 AR Amersfoort",
        },
        responsibilities:
          "Chef-kok van shared-dining restaurant De Tafelaar aan de Kamp in het centrum van Amersfoort. Gefeatured in AD.nl, De Gelderlander, indebuurt.nl Amersfoort en de Gooische Business podcast (2025-2026).",
      },
    },
    {
      "@type": "Occupation",
      name: "Horeca consultant & founder",
      occupationLocation: {
        // schema.org City was not a valid top-level type for occupationLocation
        // in the 2026-04-15 validator run (returned "City is not a valid type
        // for this property"). Use Place, the canonical geographic supertype,
        // with addressLocality on its nested PostalAddress instead.
        "@type": "Place",
        name: "Amersfoort, Netherlands",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Amersfoort",
          addressRegion: "Utrecht",
          addressCountry: "NL",
        },
      },
      estimatedSalary: undefined,
      responsibilities:
        "Menu engineering, food cost controle, prepstructuur, serviceflow en teamtraining voor restaurants en horecateams. Restaurant websites en SEO/GEO optimalisatie. Founder van Jezza Cooks (KvK 99547619, Amersfoort, januari 2026).",
    },
    {
      "@type": "Role",
      roleName: "Dry-aging lead & sous chef",
      startDate: "2020",
      endDate: "2022",
      hasOccupation: {
        "@type": "Occupation",
        name: "Sous chef",
        occupationLocation: {
          "@type": "Place",
          name: "Angler Restaurant Stirling — Adelaide Hills, South Australia, Australia",
        },
        responsibilities:
          "Opgezet en geleid het fish dry-age programma van Angler Stirling: cured sashimi, fish sausages, barramundi crackling, carp bacon en carp burger. Gefeatured in InDaily, Australian Good Food Guide, Broadsheet Adelaide en Aquna.",
      },
    },
    {
      "@type": "Role",
      roleName: "Head chef",
      startDate: "2019",
      endDate: "2020",
      hasOccupation: {
        "@type": "Occupation",
        name: "Head chef",
        occupationLocation: {
          "@type": "Place",
          name: "Hanson Bay Sanctuary / Flinders Chase Café, Kangaroo Island, South Australia, Australia",
        },
      },
    },
    {
      "@type": "Role",
      roleName: "Chef de partie",
      startDate: "2018",
      endDate: "2018",
      hasOccupation: {
        "@type": "Occupation",
        name: "Chef de partie",
        occupationLocation: {
          "@type": "Place",
          name: "Restaurant Bougainville, Amsterdam",
        },
        responsibilities:
          "Finalist Euro-Toques Young Chef Award 2018 namens Restaurant Bougainville, Amsterdam. Gefeatured in Misset Horeca en De RestaurantKrant.",
      },
    },
  ];
}

// --- Top-level entity builders ----------------------------------------------

export function buildOrganization() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName || SITE.name,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/pics/logo.png`,
    },
    image: `${SITE_URL}${SITE.ogImage}`,
    description: SITE.description,
    email: SITE.contact.email,
    telephone: SITE.contact.phone,
    address: buildPostalAddress(),
    founder: { "@id": PERSON_ID },
    foundingDate: "2026-01",
    foundingLocation: {
      "@type": "Place",
      name: "Amersfoort, Nederland",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: SITE.contact.phone,
        email: SITE.contact.email,
        availableLanguage: ["Dutch", "English", "French"],
        areaServed: "NL",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: SITE.contact.phone,
        email: SITE.contact.email,
        availableLanguage: ["Dutch", "English"],
        areaServed: "NL",
      },
    ],
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "KvK",
        value: SITE.kvk,
      },
    ],
    sameAs: buildSameAs(),
  };
}

export function buildLocalBusiness() {
  return {
    // ProfessionalService is a more accurate subtype than "Restaurant" for a
    // consultancy. It's still a LocalBusiness in Google's eyes.
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": LOCALBUSINESS_ID,
    name: SITE.name,
    url: SITE_URL,
    image: `${SITE_URL}${SITE.ogImage}`,
    description: SITE.description,
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    priceRange: SITE.priceRange,
    address: buildPostalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: SITE.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    openingHoursSpecification: buildOpeningHoursSpec(),
    knowsAbout: [
      "horeca consultancy",
      "restaurant consulting",
      "menu engineering",
      "food cost controle",
      "prepstructuur",
      "serviceflow",
      "teamtraining",
      "hospitality operations",
      "restaurant websites",
    ],
    makesOffer: SITE.services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.shortDescription,
        url: `${SITE_URL}/services/${s.slug}`,
      },
    })),
    sameAs: buildSameAs(),
    parentOrganization: { "@id": ORG_ID },
  };
}

/**
 * FoodEstablishment / CateringService sub-entity for the Tafelaar × Jezza
 * Cooks Catering joint venture. Uses a different physical address than the
 * main LocalBusiness because catering operates from the De Tafelaar
 * restaurant kitchen at Kamp 8 — that's Jan Molmans's restaurant, where
 * Jeremy also works as chef-kok. The @id is fragment-distinct from
 * LOCALBUSINESS_ID so entity resolution doesn't collapse the two.
 *
 * This models the real business structure:
 *   - Jezza Cooks consultancy (LocalBusiness at Nijkerkerstraat 3) = Jeremy's office
 *   - Tafelaar × Jezza Cooks Catering (this entity at Kamp 8) = joint venture
 *   - Both bill via Jezza Cooks KvK 99547619
 *   - provider cross-link points back to the main LocalBusiness for billing
 */
export function buildCateringEntity() {
  return {
    "@type": ["FoodEstablishment", "CateringService"],
    "@id": CATERING_ID,
    name: "Tafelaar × Jezza Cooks Catering",
    alternateName: "Jezza Cooks Catering Amersfoort",
    url: `${SITE_URL}/services/catering`,
    description:
      "Tafelaar × Jezza Cooks Catering is een samenwerking tussen Jeremy Arrascaeta (Jezza Cooks) en Jan Molmans (eigenaar van shared-dining restaurant De Tafelaar). Kantoorlunch, diners en events in Amersfoort en omgeving, vanaf €7,50 per persoon, vanuit de volwaardige restaurantkeuken aan de Kamp 8 in de binnenstad van Amersfoort.",
    image: `${SITE_URL}/pics/tafelaar-x-jezza-logo.png`,
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    priceRange: "€€",
    // Physical operating address — the De Tafelaar restaurant kitchen where
    // the catering prep actually happens. Different from Jezza Cooks's
    // registered billing address (Nijkerkerstraat 3).
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kamp 8",
      addressLocality: "Amersfoort",
      addressRegion: "Utrecht",
      postalCode: "3811 AR",
      addressCountry: "NL",
    },
    // servesCuisine for LLMs: tells ChatGPT/Perplexity "this is what you
    // get when you order catering from this entity"
    servesCuisine: [
      "Nederlands",
      "European",
      "Shared dining",
      "Kantoorlunch",
      "Event catering",
    ],
    hasMenu: `${SITE_URL}/services/catering#menu`,
    acceptsReservations: true,
    paymentAccepted: ["Cash", "Credit Card", "Invoice", "Bank Transfer"],
    currenciesAccepted: "EUR",
    areaServed: [
      "Amersfoort",
      "Binnenstad Amersfoort",
      "Kamp Amersfoort",
      "Soesterkwartier",
      "Leusderkwartier",
      "Vathorst",
      "Valleipoort",
      "Hoogland",
      "Hooglanderveen",
      "Utrecht",
      "Hilversum",
      "Soest",
      "Leusden",
      "Baarn",
      "Bunschoten",
      "Nijkerk",
      "Barneveld",
    ].map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    // Cross-link: the catering is PROVIDED BY the main Jezza Cooks
    // LocalBusiness entity (that's where the KvK, billing and invoicing
    // lives). This tells Google "these are linked entities, not competitors".
    provider: { "@id": LOCALBUSINESS_ID },
    // Second provider note: explicit mention of Jan Molmans as joint-venture
    // partner via a nested PerformingGroup-style affiliation. The
    // aggregateRating is attached HERE (to the restaurant Organization),
    // NOT to the Jezza Cooks catering entity itself — schema.org rules
    // require that aggregateRating belongs to the entity being rated.
    // The reviews are genuine third-party data from trustoo.nl verified
    // 2026-04-15. De Tafelaar B.V. Trustoo profile:
    //   https://trustoo.nl/utrecht/amersfoort/catering/tafelaar-amersfoort-bv/
    // Scale: Trustoo uses 1-10, schema.org expects bestRating explicit.
    memberOf: {
      "@type": ["Organization", "Restaurant"],
      "@id": `${SITE_URL}/#de-tafelaar-restaurant`,
      name: "Restaurant De Tafelaar Amersfoort",
      legalName: "Tafelaar Amersfoort B.V.",
      url: "https://www.tafelaaramersfoort.nl",
      telephone: "+31637232397",
      // foundingDate + numberOfEmployees sourced from the Trustoo
      // verified profile (trustoo.nl/utrecht/amersfoort/catering/
      // tafelaar-amersfoort-bv). Adds procurement-relevant signals to
      // the schema so "how big is their team" is answerable by AI
      // crawlers — relevant for the "can they handle big events?"
      // intent that procurement teams have when booking catering.
      foundingDate: "2025-03-26",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: 10,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kamp 8",
        addressLocality: "Amersfoort",
        postalCode: "3811 AR",
        addressCountry: "NL",
      },
      founder: {
        "@type": "Person",
        name: "Jan Molmans",
      },
      // aggregateRating for the restaurant (NOT for Jezza Cooks — that
      // would be attribution fraud). Source: Trustoo.nl verified listing.
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "9.8",
        bestRating: "10",
        worstRating: "1",
        reviewCount: "96",
        // sameAs the source so validators can verify the claim
        url: "https://trustoo.nl/utrecht/amersfoort/catering/tafelaar-amersfoort-bv/",
      },
      // Third-party awards on the restaurant (adds credence to the
      // catering joint venture indirectly).
      award: [
        "Trustoo TOP PRO 2026",
        "Trustoo Top Score",
      ],
      // KHN membership + Leermeester certification visible on Trustoo
      memberOf: [
        {
          "@type": "Organization",
          name: "Koninklijke Horeca Nederland",
          url: "https://www.khn.nl",
        },
      ],
      sameAs: [
        "https://trustoo.nl/utrecht/amersfoort/catering/tafelaar-amersfoort-bv/",
        "https://www.instagram.com/tafelaaramersfoort/",
        "https://www.tafelaaramersfoort.nl",
      ],
    },
    // The person actually running the catering kitchen. Cross-link to
    // the Person entity.
    employee: { "@id": PERSON_ID },
    // Cross-domain sameAs. AI answer engines use this to resolve "the
    // catering service on tafelaaramersfoort.nl" and "the catering service
    // on jezzacooks.com" as ONE entity. The tafelaar Restaurant entity
    // reciprocally sameAs's back to this page.
    //
    // NOTE: we deliberately do NOT sameAs the tafelaar #restaurant entity
    // here — that would conflate the Jezza Cooks catering (this entity)
    // with De Tafelaar as an organization, which is already modeled
    // separately via `memberOf` above. sameAs points ONLY to catering
    // entities, not to the restaurant organization itself.
    sameAs: [
      "https://www.tafelaaramersfoort.nl/catering",
      "https://www.tafelaaramersfoort.nl/catering#service",
    ],
  };
}

export function buildPerson() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.founder.name,
    alternateName: SITE.founder.alternateName,
    jobTitle: SITE.founder.jobTitle,
    description:
      "Jeremy Arrascaeta (Chef Jezz) is chef en horeca consultant in Amersfoort met ruim 10 jaar ervaring in high-end keukens en management in Europa en Australië. Chef-kok bij shared-dining restaurant De Tafelaar Amersfoort (Kamp 8) — genoemd in AD.nl, De Gelderlander, indebuurt.nl en de Gooische Business podcast (2025-2026). Founder van Jezza Cooks horeca consultancy (KvK 99547619). Finalist Euro-Toques Young Chef Award 2018 namens Restaurant Bougainville Amsterdam. Dry-aging lead bij Angler Restaurant Stirling in de Adelaide Hills, Zuid-Australië (2020-2022) waar hij bekend werd om het fish dry-age programma met cured sashimi, fish sausages, barramundi crackling en carp bacon — gefeatured in InDaily, Australian Good Food Guide, Broadsheet Adelaide en Aquna. Daarvoor head chef op Kangaroo Island bij Hanson Bay Sanctuary en Flinders Chase Café (2019-2020).",
    image: `${SITE_URL}${SITE.founder.image}`,
    url: `${SITE_URL}/about`,
    worksFor: { "@id": ORG_ID },
    address: buildPostalAddress(),
    nationality: {
      "@type": "Country",
      name: "Netherlands",
    },
    knowsLanguage: ["nl", "en", "fr"],
    knowsAbout: [
      "restaurant consulting",
      "menu engineering",
      "food cost control",
      "kitchen operations",
      "hospitality team training",
      "dry-aging",
      "seafood sustainability",
      "shared dining",
      "mise en place",
      "prepstructuur",
      "serviceflow",
      "restaurant websites",
      "generative engine optimization",
    ],
    hasOccupation: buildHasOccupation(),
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Hotelschool Ter Duinen",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Koksijde",
        addressCountry: "BE",
      },
      // hotelschoolterduinen.be resolves NXDOMAIN in DNS (verified 2026-04-15
      // by Agent E audit). URL field dropped rather than guessing at a
      // successor domain — the @type + name + address is enough for entity
      // resolution and a broken URL is worse than no URL for E-E-A-T.
    },
    award: [
      "Finalist Euro-Toques Young Chef Award 2018 (Restaurant Bougainville, Amsterdam)",
    ],
    // hasCredential = machine-readable credential marker for E-E-A-T. Schema.org
    // EducationalOccupationalCredential is what Google's quality rater guidelines
    // (2024 update) match on for YMYL-adjacent niches like business consulting.
    // Each credential links the award to the issuing organization.
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Finalist Euro-Toques Young Chef Award 2018",
        credentialCategory: "award",
        recognizedBy: {
          "@type": "Organization",
          name: "Euro-Toques Nederland",
          url: "https://www.euro-toques.nl",
        },
        about: "High-end restaurant kitchen — competitie voor young chefs tot 30 jaar, genomineerd vanuit Restaurant Bougainville Amsterdam.",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Dry-aging lead, Angler Restaurant Stirling",
        credentialCategory: "professionalExperience",
        recognizedBy: {
          "@type": "Organization",
          name: "Angler Restaurant Stirling",
          url: "https://www.anglerrestaurant.com.au",
        },
        about: "Ontwikkeling en leiding van het fish dry-age programma (cured sashimi, fish sausages, barramundi crackling, carp bacon, carp burger) in de Adelaide Hills, 2020-2022. Gefeatured in InDaily, Australian Good Food Guide, Broadsheet Adelaide en Aquna.",
      },
    ],
    sameAs: buildPersonSameAs(),
  };
}

export function buildWebSite() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE.name,
    description: SITE.description,
    inLanguage: "nl-NL",
    publisher: { "@id": ORG_ID },
  };
}

/**
 * Global @graph embedded in the root layout. Contains every "about the
 * business" entity — Google joins these via @id so page-level schema can
 * just reference them by @id instead of duplicating fields.
 */
export function buildGlobalGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganization(),
      buildLocalBusiness(),
      buildCateringEntity(),
      buildPerson(),
      buildWebSite(),
    ],
  };
}

// --- Per-page builders -------------------------------------------------------

export type BreadcrumbItem = { name: string; item: string };

export function buildBreadcrumbList(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.item.startsWith("http") ? it.item : `${SITE_URL}${it.item}`,
    })),
  };
}

export type FaqItem = { question: string; answer: string };

export function buildFaqPage(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function buildServicePage(opts: {
  slug: string;
  name: string;
  description: string;
  areaServed?: readonly string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}/services/${opts.slug}`,
    provider: { "@id": LOCALBUSINESS_ID },
    areaServed: (opts.areaServed ?? SITE.areaServed).map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
  };
}

export function buildContactPage() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE.name}`,
    url: `${SITE_URL}/contact`,
    about: { "@id": LOCALBUSINESS_ID },
    mainEntity: {
      "@type": "Organization",
      "@id": ORG_ID,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: SITE.contact.phone,
          email: SITE.contact.email,
          availableLanguage: ["Dutch", "English"],
          areaServed: "NL",
        },
      ],
    },
  };
}

/**
 * Article schema for pillar / long-form content pages. Used for pages like
 * /menu-engineering where a single, citable, well-structured article drives
 * AI citations in answer engines. The author is always our canonical Person
 * (@id) and the publisher is always our Organization (@id) — both resolved
 * via the global @graph in the root layout.
 */
export function buildArticle(opts: {
  slug: string;
  headline: string;
  description: string;
  image: string; // absolute or root-relative
  datePublished: string; // ISO date
  dateModified: string; // ISO date
  keywords?: string[];
  about?: string[]; // topical entities
  wordCount?: number;
}) {
  const imageUrl = opts.image.startsWith("http")
    ? opts.image
    : `${SITE_URL}${opts.image}`;
  const articleUrl = `${SITE_URL}/${opts.slug.replace(/^\//, "")}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    image: imageUrl,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: "nl-NL",
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    ...(opts.keywords && opts.keywords.length > 0
      ? { keywords: opts.keywords.join(", ") }
      : {}),
    ...(opts.about && opts.about.length > 0
      ? {
          about: opts.about.map((name) => ({
            "@type": "Thing",
            name,
          })),
        }
      : {}),
    ...(opts.wordCount ? { wordCount: opts.wordCount } : {}),
  };
}
