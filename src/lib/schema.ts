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
