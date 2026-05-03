// src/app/services/websites/restaurant-website-laten-maken/page.tsx
//
// Tier 5H landing page targeting "restaurant website laten maken" — top
// 3 in this SERP are thin auto-generated exact-match-domain sites with
// minimal proof. Our edge: 5 real client case studies + chef-led
// hospitality angle no agency can match.
//
// Localized to Amersfoort because national-intent for this query is
// significantly harder (DA fight); local-intent has a softer SERP.
//
// Structure:
//   - hero with above-fold capability strip
//   - "Wat is een Jezza Cooks restaurant website?" 130-167w block
//   - 5 client case study summaries (200w each: BoekEerlijk, OffertesVoorJou,
//     Chef & Serve, Swimcoaching, Tafelaar Amersfoort)
//   - "Wat krijg je voor €400?" feature comparison
//   - "Hoe lang duurt het?" timeline
//   - 7 FAQs
//
// Reuses `ui` constants from src/app/services/catering/page.tsx.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import JsonLd from "@/components/seo/json-ld";
import {
  buildArticle,
  buildBreadcrumbList,
  buildFaqPage,
  buildServicePage,
} from "@/lib/schema";
import { SITE } from "@/lib/site-config";
import { ui } from "@/app/services/catering/page";

export const dynamic = "force-static";

const DATE_PUBLISHED = "2026-04-15";
const DATE_MODIFIED = "2026-04-15";

export const metadata: Metadata = {
  title: "Restaurant Website Laten Maken Amersfoort — €400 eenmalig | Jezza Cooks",
  description:
    "Restaurant website laten maken in Amersfoort en omgeving. Eenmalig €400 voor een complete chef-led website met schema.org JSON-LD, reserveringsflow (TheFork, Resengo, TableBooker), Core Web Vitals groen op PageSpeed, en AI-klare content voor citation in ChatGPT, Perplexity en Google AI Overviews. 5 echte client builds in productie: BoekEerlijk, OffertesVoorJou, Chef & Serve, Swimcoaching.nl, De Tafelaar Amersfoort. Geen lock-in contracten. Door een chef-kok die zelf service draait.",
  alternates: { canonical: "/services/websites/restaurant-website-laten-maken" },
  openGraph: {
    title: "Restaurant Website Laten Maken Amersfoort — €400 | Jezza Cooks",
    description:
      "5 live client builds. Eenmalig €400 voor een complete chef-led restaurant website met schema, reserveringsflow en Core Web Vitals groen.",
    type: "article",
    url: "/services/websites/restaurant-website-laten-maken",
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    authors: ["Jeremy Arrascaeta"],
  },
  keywords: [
    "restaurant website laten maken",
    "restaurant website laten maken amersfoort",
    "horeca website laten maken",
    "horeca website amersfoort",
    "restaurant website €400",
    "goedkope restaurant website amersfoort",
    "restaurant website met schema",
    "horeca website builder amersfoort",
    "restaurant website ontwerper amersfoort",
    "menukaart op website",
    "reserveringssysteem restaurant website",
    "Jezza Cooks restaurant website",
    "chef-led restaurant website",
  ],
};

// --- Schema ----------------------------------------------------------------

const articleSchema = buildArticle({
  slug: "services/websites/restaurant-website-laten-maken",
  headline: "Restaurant Website Laten Maken in Amersfoort — €400 eenmalig met schema, reserveringsflow en AI-klare content",
  description:
    "Complete gids restaurant website laten maken in Amersfoort en omgeving. Wat zit er in een €400 website, welke schema, welke reserveringsflow, hoe lang duurt het en 5 echte client cases. Door Jeremy Arrascaeta — chef-kok bij De Tafelaar Amersfoort en developer van Jezza Cooks.",
  image: "/pics/service-websites.jpg",
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  keywords: [
    "restaurant website laten maken",
    "horeca website amersfoort",
    "restaurant website kosten",
    "schema.org restaurant",
    "reserveringsflow integratie",
  ],
  about: [
    "Restaurant website development",
    "Hospitality SEO",
    "Schema.org for restaurants",
    "Reservation flow integration",
  ],
  wordCount: 1800,
});

const serviceSchema = buildServicePage({
  slug: "services/websites/restaurant-website-laten-maken",
  name: "Restaurant Website Laten Maken — Amersfoort en omgeving",
  description:
    "Restaurant website laten maken in Amersfoort en heel Nederland. Eenmalig €400 voor een complete chef-led website met schema.org JSON-LD, reserveringsflow integratie (TheFork, Resengo, TableBooker), Core Web Vitals groen, en AI-klare content. 5 live client builds: BoekEerlijk, OffertesVoorJou, Chef & Serve, Swimcoaching.nl, De Tafelaar Amersfoort. Geen lock-in. Door Jeremy Arrascaeta (chef-kok bij De Tafelaar Amersfoort, founder Jezza Cooks).",
  areaServed: [
    "Amersfoort",
    "Utrecht",
    "Hilversum",
    "Soest",
    "Leusden",
    "Baarn",
    "Bunschoten",
    "Nijkerk",
    "Barneveld",
  ],
});

const breadcrumbSchema = buildBreadcrumbList([
  { name: "Home", item: "/" },
  { name: "Diensten", item: "/services" },
  { name: "Restaurant websites", item: "/services/websites" },
  { name: "Restaurant Website Laten Maken Amersfoort", item: "/services/websites/restaurant-website-laten-maken" },
]);

// --- 7 FAQs (each ~140 words) ----------------------------------------------

const faqs = [
  {
    q: "Wat kost een restaurant website laten maken bij Jezza Cooks?",
    a: "Eenmalig €400 voor een complete chef-led restaurant website. Geen verborgen kosten, geen lock-in contract. Optioneel €30 per maand voor hosting, security updates en kleine content-aanpassingen — of je doet dat zelf. Het basistarief van €400 bevat: complete website (hero, menukaart, over, contact), mobile-first responsive design, Core Web Vitals geoptimaliseerd (groen op PageSpeed Insights), schema.org JSON-LD (Restaurant + OpeningHours + Menu + FAQ), intake op locatie binnen Amersfoort en omgeving, één ronde tekstuele revisies, oplevering binnen 2 weken. Voor reserveringsflow-integratie (TheFork, Resengo, TableBooker, OpenTable) reken je €150 los of het zit inbegrepen in het €400+€30/mnd pakket. Voor uitgebreidere wensen (meertalig, eigen fotografie halve dag op locatie, blog/events module) hebben we maatwerkpakketten van €1.200 tot €2.500. BTW 21% komt boven op alle prijzen. Eén extra reservering van gemiddeld €65 per week verdient de €400 binnen 7 weken terug.",
  },
  {
    q: "Hoe lang duurt het om een restaurant website te laten maken?",
    a: "Voor een €400 standaard website: 2 weken vanaf intake tot oplevering. Verloop: week 1 dag 1 = intake op locatie (1-1.5 uur), week 1 dag 3 = eerste design + structuur klaar voor review, week 1 dag 5 = revisie-feedback ronde, week 2 dag 8 = content + foto's + menukaart afgerond, week 2 dag 12 = launch met DNS-verhuizing of nieuw domein, week 2 dag 14 = post-launch check + Google Search Console submit. Voor maatwerk (€1.200-€2.500) reken op 4-6 weken vanwege extra ontwerprondes, eigen fotografie (halve dag op locatie + edit), meertalige content of integraties met POS-systemen. Voor reservering-only updates op een bestaande site: 5-7 werkdagen. Spoed-opleveringen (binnen 7 dagen) zijn mogelijk met een toeslag van 50% op het basistarief, mits de content (teksten, foto's) op tijd wordt aangeleverd door de klant.",
  },
  {
    q: "Welke reserveringsflow integraties zijn beschikbaar?",
    a: "Vier hoofdflows die we standaard ondersteunen, gekozen op basis van klant-volume en regio. (1) TheFork (LaFourchette) — sterk voor restaurants in Amersfoort en Utrecht die veel toeristen of zakelijke gasten ontvangen; nadeel: commissies tot 8% per booking. (2) Resengo — Belgische speler met sterke aanwezigheid in zuid-Nederland; lagere commissies dan TheFork, redelijke UI. (3) TableBooker — Nederlands, integreert goed met POS-systemen zoals Lightspeed en Untill; vooral voor onafhankelijke restaurants die controle willen houden. (4) OpenTable — minder relevant voor NL maar handig voor restaurants met internationale gastenmix. We bouwen ALLE vier in als embedded widget op de boekingspagina, of als directe link uit de header. Voor restaurants die een eigen reserveringssysteem draaien (zelfgebouwd of via een POS-feature) bouwen we een custom form met server-side mailgun naar de host. Geen vendor lock-in: je kan altijd switchen.",
  },
  {
    q: "Kun je een voorbeeld zien van een restaurant website die je gebouwd hebt?",
    a: "Ja, vijf live builds in productie. (1) De Tafelaar Amersfoort (tafelaaramersfoort.nl) — shared-dining restaurant aan de Kamp 8, complete website met Restaurant schema, OpeningHoursSpecification, ReserveAction, FAQPage, en geïntegreerde reserveringsflow. Ranking #1 voor 'kantoorlunch amersfoort' en in top 3 voor 'shared dining amersfoort'. (2) Chef & Serve (chefandserve.nl) — private-chef en catering service van Maarten Hogeveen; website + menu + SEO/GEO. (3) Swimcoaching.nl — landelijk zwem-coaching netwerk met SEO-optimalisatie voor lokale intents (zoekers in 12 NL steden). (4) BoekEerlijk (boekeerlijk.nl) — SaaS platform voor eerlijke horeca-boekhouding, gebouwd vanaf scratch. (5) OffertesVoorJou (offertesvoorjou.nl) — Nederlands matchingsplatform voor offerteaanvragen, ook vanaf scratch. Alle vijf hebben Core Web Vitals groen, schema-validatie 0 errors, en mobile-first responsive. Voor het volledige portfolio met live-links zie /portfolio.",
  },
  {
    q: "Welke schema.org markup zit standaard in jullie restaurant websites?",
    a: "Volledige schema-stack die rich results en AI citation ontgrendelt. Per restaurant website bouwen we standaard: (1) Restaurant entity met name, address, telephone, geo, openingHoursSpecification, servesCuisine, priceRange, hasMenu, acceptsReservations, image, sameAs (social profiles + review platforms). (2) Organization voor het brand-niveau, gelinkt via parentOrganization. (3) WebSite met SearchAction voor sitelinks search box. (4) BreadcrumbList op elke pagina. (5) FAQPage waar er echt FAQ-content is (niet voor de show — kunstmatige FAQs zijn een penalty risk). (6) Review en AggregateRating ALLEEN als er echte third-party reviews zijn en die visueel op de pagina staan (bijv. een Trustoo-widget). (7) Menu met hasMenuSection en hasMenuItem voor elk gerecht (incl. allergens en suitable diet). (8) Event als het restaurant gastchef-avonden of menu-changes heeft. Alle schema wordt gegenereerd via builder-functies in src/lib/schema.ts zodat NAP en pricing single-source-of-truth zijn. Validatie: 0 errors op validator.schema.org en Google Rich Results Test.",
  },
  {
    q: "Werkt deze service ook buiten Amersfoort, en in welke regio?",
    a: "De website-build zelf is 100% remote uit te voeren. Werkgebied voor intakes op locatie: heel Amersfoort en alle wijken (Binnenstad, Kamp, Soesterkwartier, Leusderkwartier, Vathorst, Valleipoort, Kattenbroek, Randenbroek, Hoogland, Hooglanderveen, Liendert, Schothorst, Zielhorst), plus Utrecht, Hilversum, Soest, Leusden, Baarn, Bunschoten, Nijkerk en Barneveld. Voor opdrachten verder weg (Zwolle, Apeldoorn, Amsterdam, Rotterdam, Eindhoven) werken we volledig remote met één video-intake en een fysieke kick-off bij jou op locatie indien gewenst (reistoeslag €0,21/km plus uurtarief voor reistijd boven 60 minuten). Voor restaurants buiten Nederland (België, Duitse grensstreek) maken we een offerte op maat — meertalige integratie en eventueel verschillende reserveringsflow-providers. Het €400 standaardpakket gaat ervan uit dat de intake binnen Amersfoort en omgeving plaatsvindt; voor opdrachten verder weg verschuift het basistarief richting maatwerk omdat reistijd, eventuele 2e bezoek voor fotografie en internationaal hosting de calculatie veranderen.",
  },
  {
    q: "Hoe verhoudt jullie restaurant website service zich tot een klassiek webagency?",
    a: "Drie verschillen. Eén: prijspositionering. Een klassiek agency rekent €3.500-€8.000 voor een vergelijkbare scope omdat ze een verkoopafdeling, project manager en designer apart factureren. Wij zijn een chef die ook code schrijft — zonder die overhead. Twee: hospitality kennis. Wij weten welke menu-categorieën horeca-gasten echt zoeken (allergenen-filter, dieet-icoontjes, prijsranges per categorie), welke reservering-momenten conversie kapen (lunchpiek 11:30-13:00, dinerpiek 18:00-21:00), welke schema rich results ontgrendelt voor restaurant-specifieke queries. Een generiek webagency moet dat van scratch leren of negeert het. Drie: chef-led service betekent een direct lijntje met de chef die je restaurant begrijpt — geen account-manager die je op donderdag 14:00 belt over een typografie-beslissing. Voor restaurants die een corporate brand zoeken met 5+ stakeholder rondes is een agency wellicht beter; voor restaurants die snel live willen met een professionele basis die werkt zijn wij goedkoper, sneller en specifieker.",
  },
];

const faqSchema = buildFaqPage(
  faqs.map((f) => ({ question: f.q, answer: f.a })),
);

// --- 5 client cases ---------------------------------------------------------

const cases = [
  {
    name: "De Tafelaar Amersfoort",
    url: "https://www.tafelaaramersfoort.nl",
    category: "Shared-dining restaurant — volledige website + SEO/GEO",
    summary:
      "Shared-dining restaurant aan de Kamp 8 in de binnenstad van Amersfoort. Complete website met Restaurant schema (OpeningHoursSpecification, ReserveAction, FAQPage), embedded reserveringsflow, AI-klare menukaart-structuur. Ranking #1 voor 'kantoorlunch amersfoort' en top-3 voor 'shared dining amersfoort'. Trustoo 9.8/10 op 96 reviews, TOP PRO 2026, KHN-lid.",
  },
  {
    name: "Chef & Serve",
    url: "https://chefandserve.nl",
    category: "Private chef + catering — website + menu + SEO/GEO",
    summary:
      "Private-chef en catering service van Maarten Hogeveen, gevestigd binnen het Amersfoort-Utrecht werkgebied. Website met menustructuur, kostprijsberekening op de menukaart, receptuur-SOPs in achterkant, plus volledige SEO + GEO optimalisatie. Eén van de 5 referentie-builds van Jezza Cooks.",
  },
  {
    name: "Swimcoaching.nl",
    url: "https://www.swimcoaching.nl",
    category: "Landelijk dienstverlener — SEO voor 12 lokale steden",
    summary:
      "Landelijk zwem-coaching netwerk met locaties in 12 NL-steden. SEO-architectuur gebouwd voor lokale intents per stad — elke stadspagina rankt voor 'zwemles [stadsnaam]' binnen 6 maanden post-launch. Schema-stack omvat LocalBusiness per locatie, Service entiteiten en Article voor blog-content.",
  },
  {
    name: "BoekEerlijk",
    url: "https://www.boekeerlijk.nl",
    category: "SaaS platform horeca-boekhouding — vanaf scratch",
    summary:
      "SaaS platform voor eerlijke horeca-boekhouding — gebouwd vanaf scratch inclusief authentication, billing, dashboard, integraties met POS-systemen (Lightspeed, MPlus). Niet een typische restaurant-website maar bewijst de stack-diepte voor klanten met serieuze backend-eisen.",
  },
  {
    name: "OffertesVoorJou",
    url: "https://offertesvoorjou.nl",
    category: "NL matchingsplatform offerteaanvragen — vanaf scratch",
    summary:
      "Nederlands matchingsplatform voor offerteaanvragen, ook vanaf scratch. Live sinds 2019, draait stabiel met tienduizenden gebruikers. Schema-architectuur, lead-routing, e-mail flows en third-party integraties allemaal in productie.",
  },
];

// --- Page component --------------------------------------------------------

export default function RestaurantWebsiteLatenMakenPage() {
  return (
    <div className={ui.page}>
      <JsonLd data={articleSchema} id="schema-rwlm-article" />
      <JsonLd data={serviceSchema} id="schema-rwlm-service" />
      <JsonLd data={breadcrumbSchema} id="schema-rwlm-breadcrumb" />
      <JsonLd data={faqSchema} id="schema-rwlm-faq" />

      <div aria-hidden="true" className={ui.bgFX} />

      {/* HERO */}
      <section className={ui.container + " " + ui.sectionY}>
        <div className="mx-auto max-w-4xl text-center">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-semibold uppercase tracking-widest text-white/60">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-primary">Diensten</Link>
            <span className="mx-2">/</span>
            <Link href="/services/websites" className="hover:text-primary">Restaurant websites</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Restaurant website laten maken</span>
          </nav>

          <div className={ui.pill + " mx-auto"}>
            <span className={ui.copperDot} aria-hidden="true" />
            Restaurant websites · Amersfoort + heel Nederland
          </div>

          <h1 className="mt-5 font-headline text-4xl font-bold leading-tight md:text-6xl">
            Restaurant website laten maken in Amersfoort — vanaf €400 eenmalig
          </h1>

          <p className={`mt-4 text-base md:text-xl leading-relaxed ${ui.mutedOnNight} mx-auto max-w-3xl`}>
            Een complete chef-led restaurant website met{" "}
            <strong>schema.org JSON-LD</strong>, reserveringsflow integratie
            (TheFork / Resengo / TableBooker), <strong>Core Web Vitals
            groen</strong> op PageSpeed, en AI-klare content voor citation
            in ChatGPT, Perplexity en Google AI Overviews.{" "}
            <strong>5 echte client builds</strong> in productie. Geen
            lock-in, eenmalig betalen. Door een chef-kok die zelf service
            draait — niet een agency met een verkoopafdeling.
          </p>

          {/* Capability strip */}
          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 font-semibold text-primary">
              €400 eenmalig
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-semibold">
              Oplevering 2 weken
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-semibold">
              Schema.org JSON-LD
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-semibold">
              CWV groen op PageSpeed
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-semibold">
              5 live builds
            </span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/free-diagnosis" className={ui.ctaPrimary}>
              Start met een gratis diagnose <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/portfolio" className={ui.ctaSecondary}>
              Bekijk het portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT IS — 130-167 word standalone passage */}
      <section className={ui.container + " pb-12 md:pb-20"}>
        <div className={ui.paperSoft + " mx-auto max-w-3xl p-7 md:p-10"}>
          <div className={ui.pill}>
            Wat het is <span className={ui.copperDot} aria-hidden="true" />
            chef-led restaurant website
          </div>
          <h2 className="mt-4 font-headline text-3xl md:text-4xl font-bold">
            Wat is een Jezza Cooks restaurant website?
          </h2>
          <p className={`mt-4 leading-relaxed ${ui.mutedOnPaper} md:text-lg`}>
            Een Jezza Cooks restaurant website is een{" "}
            <strong>complete, mobile-first, schema-volledige</strong>{" "}
            site gebouwd voor één doel: meer directe boekingen voor jouw
            restaurant zodat je niet 8% commissie betaalt aan
            booking-platforms voor traffic die jij zelf had kunnen vangen.
            Standaard bevat de €400 build: hero met restaurant-merk, complete{" "}
            <strong>menukaart-structuur</strong> (categorieën, allergens,
            dieet-iconen, prijzen), <strong>over</strong>-pagina met chef en
            verhaal, <strong>contact</strong> met openingstijden en map,
            mobile-first responsive design, Core Web Vitals groen op
            PageSpeed Insights, schema.org JSON-LD (Restaurant +
            OpeningHours + Menu + FAQ), en intake op locatie binnen
            Amersfoort en omgeving. Optionele add-ons: reserveringsflow
            (TheFork/Resengo/TableBooker, €150 los of inbegrepen in
            €400+€30/mnd), meertalig (NL/EN, €250 los), eigen fotografie
            (halve dag op locatie, in maatwerk pakket). Geen lock-in
            contracten — je hosted bij wie je wilt.
          </p>
        </div>
      </section>

      {/* CASES — 5 client builds */}
      <section className={ui.container + " pb-12 md:pb-20"}>
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              5 live restaurant- en hospitality-builds in productie
            </h2>
            <p className={`mt-3 ${ui.mutedOnNight} md:text-lg`}>
              Niet mockups. Echte sites met echte gasten en echte conversie.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {cases.map((c) => (
              <article
                key={c.name}
                className="rounded-3xl border border-white/15 bg-white/5 p-6 md:p-8"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                      {c.category}
                    </div>
                    <h3 className="mt-2 font-headline text-xl font-bold md:text-2xl">
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-primary decoration-2 underline-offset-4 hover:opacity-80"
                      >
                        {c.name}
                      </a>
                    </h3>
                    <p className={`mt-3 leading-relaxed ${ui.mutedOnNight} md:text-base`}>
                      {c.summary}
                    </p>
                  </div>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ui.ctaSecondary + " shrink-0 text-xs"}
                  >
                    Bekijk live <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className={ui.container + " pb-12 md:pb-20"}>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <div className={ui.pill + " mx-auto"}>
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Timeline
            </div>
            <h2 className="mt-4 font-headline text-3xl md:text-4xl font-bold">
              Hoe lang duurt het?
            </h2>
            <p className={`mt-3 ${ui.mutedOnNight} md:text-lg`}>
              2 weken voor een €400 standaard website. 4-6 weken voor maatwerk.
            </p>
          </div>

          <ol className="mt-8 space-y-3">
            {[
              { t: "Week 1, dag 1", d: "Intake op locatie binnen Amersfoort en omgeving (1-1.5 uur). Vastleggen brand, doelgroep, content, reserveringsflow keuze." },
              { t: "Week 1, dag 3", d: "Eerste design + structuur klaar voor review." },
              { t: "Week 1, dag 5", d: "Revisie-feedback ronde — één ronde inbegrepen in €400, extra rondes €75/uur." },
              { t: "Week 2, dag 8", d: "Content + foto's + menukaart afgerond, schema gevalideerd." },
              { t: "Week 2, dag 12", d: "Launch met DNS-verhuizing of nieuw domein. SSL automatisch via Vercel/Netlify." },
              { t: "Week 2, dag 14", d: "Post-launch check + Google Search Console submit + URL-indexing aanvraag voor alle hoofdpagina's." },
            ].map((step) => (
              <li key={step.t} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {step.t}
                </div>
                <p className={`mt-2 ${ui.mutedOnNight} md:text-base`}>
                  {step.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className={ui.container + " pb-12 md:pb-20"}>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Veelgestelde vragen over restaurant website laten maken
            </h2>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6">
            <Accordion type="single" collapsible>
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`rwlm-faq-${i}`} className="border-white/10">
                  <AccordionTrigger className="text-left font-semibold text-base md:text-lg hover:no-underline text-white">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className={`${ui.mutedOnNight} text-base leading-relaxed`}>
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <p className={`mt-10 text-center text-xs ${ui.mutedOnNight}`}>
            Laatst bijgewerkt: 15 april 2026 · {SITE.name} KvK {SITE.kvk} · {SITE.address.streetAddress}, {SITE.address.postalCode} {SITE.address.addressLocality}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={ui.container + " pb-12 md:pb-20"}>
        <div className="mx-auto max-w-3xl rounded-3xl border border-primary/40 bg-primary/10 p-7 text-center md:p-10">
          <h2 className="font-headline text-2xl font-bold md:text-3xl">
            Klaar voor een restaurant website die werkt?
          </h2>
          <p className={`mt-3 ${ui.mutedOnNight} md:text-lg`}>
            Start met een gratis diagnose — 30 minuten, geen verplichting.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/free-diagnosis" className={ui.ctaPrimary}>
              Start gratis diagnose <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/portfolio" className={ui.ctaSecondary}>
              Bekijk portfolio
            </Link>
          </div>
          <p className={`mt-6 text-xs ${ui.mutedOnNight}`}>
            <CheckCircle className="mr-1 inline h-3 w-3" aria-hidden="true" />
            5 live builds · CWV groen · Schema validation 0 errors · Geen lock-in
          </p>
        </div>
      </section>
    </div>
  );
}
