// src/app/services/catering/kantoorlunch-amersfoort/page.tsx
//
// Tier 5H landing page targeting "kantoorlunch amersfoort" — the highest-
// leverage attackable query in the per-query diagnosis. tafelaaramersfoort.nl
// already ranks #1 for this exact query (Jezza is the dev/partner of that
// site), so we ride the partner-restaurant footprint via explicit
// cross-link, then differentiate with chef-led + 13-wijken delivery.
//
// Structure:
//   - hero with above-fold capability strip (matching parent catering page pattern)
//   - "Wat is een kantoorlunch van Tafelaar × Jezza Cooks?" 130-167 word block
//   - 13-wijken delivery list with proximity to Kamp 8 (the prep keuken)
//   - "Hoe werkt een bestelling?" 4-step process
//   - 6 FAQs specific to office-lunch intent
//   - Service schema with areaServed = Amersfoort + 8 buurgemeenten
//
// Reuses `ui` constants from src/app/services/catering/page.tsx so visual
// language matches the parent without cloning Tailwind class strings.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, MapPin, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import JsonLd from "@/components/seo/json-ld";
import {
  buildBreadcrumbList,
  buildFaqPage,
  buildServicePage,
} from "@/lib/schema";
import { SITE } from "@/lib/site-config";
import { ui } from "@/app/services/catering/page";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Kantoorlunch Amersfoort — Tafelaar × Jezza Cooks Catering | Vanaf €7,50 p.p.",
  description:
    "Kantoorlunch in Amersfoort vanaf €7,50 p.p. — broodjes, wraps, bowls en lunchpakketten geleverd vanuit shared-dining restaurant De Tafelaar (Kamp 8). Levering binnen 10 minuten in alle Amersfoortse wijken: Binnenstad, Soesterkwartier, Leusderkwartier, Vathorst, Hoogland, Valleipoort. Restaurant-grade HACCP, 10-persoons team, backup-chef stand-by. Vanaf 10 personen. Reactie binnen 1 uur.",
  alternates: { canonical: "/services/catering/kantoorlunch-amersfoort" },
  openGraph: {
    title: "Kantoorlunch Amersfoort — Tafelaar × Jezza Cooks",
    description:
      "Chef-led kantoorlunch in Amersfoort vanaf €7,50 p.p. Levering uit De Tafelaar (Kamp 8) naar alle wijken. Restaurant-team, niet een sandwich-fabriek.",
    type: "website",
    url: "/services/catering/kantoorlunch-amersfoort",
  },
  keywords: [
    "kantoorlunch amersfoort",
    "lunch catering amersfoort",
    "bedrijfslunch amersfoort",
    "lunch op kantoor amersfoort",
    "kantoorlunch bezorgen amersfoort",
    "broodjes catering amersfoort",
    "bowls lunch amersfoort",
    "lunchpakket amersfoort",
    "vergaderlunch amersfoort",
    "team lunch amersfoort",
    "kantoorlunch binnenstad amersfoort",
    "kantoorlunch soesterkwartier",
    "kantoorlunch vathorst",
    "kantoorlunch hoogland",
    "kantoorlunch leusderkwartier",
  ],
};

// --- Schema ----------------------------------------------------------------

const serviceSchema = buildServicePage({
  slug: "catering/kantoorlunch-amersfoort",
  name: "Kantoorlunch Amersfoort — Tafelaar × Jezza Cooks Catering",
  description:
    "Kantoorlunch in Amersfoort en omgeving vanaf €7,50 per persoon. Chef-led catering vanuit shared-dining restaurant De Tafelaar (Kamp 8) — een samenwerking tussen Jeremy Arrascaeta (Jezza Cooks) en Jan Molmans (eigenaar De Tafelaar). Broodjes, wraps, bowls en lunchpakketten geleverd in alle Amersfoortse wijken: Binnenstad, Kamp, Soesterkwartier, Leusderkwartier, Vathorst, Valleipoort, Kattenbroek, Randenbroek, Hoogland, Hooglanderveen. Restaurant-grade HACCP, 10-persoons team, backup-chef op stand-by. Reactie binnen 1 uur, levering binnen 48 uur na bevestiging.",
  areaServed: [
    "Amersfoort",
    "Binnenstad Amersfoort",
    "Kamp Amersfoort",
    "Soesterkwartier",
    "Leusderkwartier",
    "Vathorst",
    "Valleipoort",
    "Kattenbroek",
    "Randenbroek",
    "Hoogland",
    "Hooglanderveen",
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
  { name: "Catering", item: "/services/catering" },
  { name: "Kantoorlunch Amersfoort", item: "/services/catering/kantoorlunch-amersfoort" },
]);

// --- 6 office-lunch FAQs (each ~140 words, GEO passage-optimized) ---------

const faqs = [
  {
    q: "Wat kost een kantoorlunch in Amersfoort bij Tafelaar × Jezza Cooks?",
    a: "Kantoorlunch begint bij €7,50 per persoon voor broodjes en wraps, en €10,50 per persoon voor bowls. Lunchpakketten (sandwich + salad + bite + dessert) zijn €13,50 vegetarisch, €14,50 classic en €18,50 premium. Alle prijzen exclusief 9% BTW op foodservice. Minimumaantal: 10 personen binnen Amersfoort. Levering gratis binnen Amersfoort centrum (postcodes 3811, 3812, 3813) vanaf 15 personen; voor randwijken zoals Vathorst, Hoogland en Hooglanderveen rekenen we €15 bezorgkosten; voor buurgemeentes (Soest, Leusden, Baarn, Bunschoten, Nijkerk, Barneveld) €20 tot €35 afhankelijk van afstand. Aanvragen 48 uur vooraf is voldoende voor groepen tot 30. Voor 30-80 personen vragen we 5 werkdagen aanlooptijd. Een Jezza Cooks Catering offerte staat binnen 24 uur in je inbox; reactietijd op nieuwe aanvragen is gemiddeld onder 1 uur (Trustoo verified voor partner-restaurant De Tafelaar).",
  },
  {
    q: "In welke Amersfoortse wijken leveren jullie kantoorlunch?",
    a: "Bezorggebied is heel Amersfoort en alle wijken: Binnenstad, Kamp, Soesterkwartier, Leusderkwartier, Vathorst, Valleipoort, Kattenbroek, Randenbroek, Hoogland, Hooglanderveen, Liendert, Schothorst en Zielhorst. Plus de buurgemeentes Soest, Leusden, Baarn, Bunschoten, Nijkerk en Barneveld. Vanaf onze prep keuken aan de Kamp 8 (in shared-dining restaurant De Tafelaar) rijden we in minder dan 10 minuten naar de meeste kantoorlocaties in de stad — Hoofdkantoor regio Amersfoort, Eemplein, Stationsplein, De Brand bedrijventerrein, IJsselmeerweg, Vathorst Hoofdstraat. Levering binnen Amersfoort centrum is gratis vanaf 15 personen; randwijken €15; buurgemeentes €20-€35. Voor Utrecht, Hilversum, Apeldoorn en Zwolle leveren we op afspraak met aangepaste levertijd en minimumafname vanaf 20 personen.",
  },
  {
    q: "Hoe lang van tevoren moet ik een kantoorlunch bestellen?",
    a: "Voor groepen van 10 tot 30 personen volstaat 48 uur. Voor 30 tot 80 personen vragen we 5 werkdagen aanlooptijd om in te kopen, te prepareren en te verpakken. Voor groepen van 80 tot 150 personen rekenen we minimaal 7 werkdagen — niet omdat het ingewikkelder is, maar om garantie te kunnen geven op een vast service-team en backup-chef. Voor lunch boven 150 personen werken we altijd met een persoonlijke offerte op maat en plannen we 10-14 werkdagen vooraf. Last-minute bestellingen tot 24 uur vooraf zijn soms mogelijk binnen Amersfoort centrum als de mise en place op de dag al draait — bel direct: +31 6 34127992. Voor terugkerende kantoorlunches (wekelijks of tweewekelijks) maken we een vast contract met flexibele dieetwens-aanpassingen per shift.",
  },
  {
    q: "Wie staat er in de keuken voor onze kantoorlunch?",
    a: "De chef in de keuken is Jeremy Arrascaeta (Chef Jezz) — chef-kok bij shared-dining restaurant De Tafelaar aan de Kamp 8 in de binnenstad van Amersfoort, 10+ jaar ervaring in high-end keukens in Europa en Australië. Finalist Euro-Toques Young Chef Award 2018 namens Restaurant Bougainville Amsterdam, dry-aging lead bij Angler Restaurant Stirling in de Adelaide Hills. Voor kantoorlunch werkt Jeremy in de De Tafelaar keuken samen met het 10-persoons restaurantteam dat 5 diensten per week draait — niet een flex-catering crew. Backup-chef op stand-by: als Jeremy onverhoopt uitvalt, stapt Jan Molmans (eigenaar De Tafelaar) of een andere senior-chef uit het team in. Geen single point of failure. Het restaurant heeft 9.8/10 op 96 reviews bij Trustoo (TOP PRO 2026, Leermeester gecertificeerd, KHN-lid) — diezelfde discipline gaat in elke kantoorlunch box.",
  },
  {
    q: "Kunnen jullie rekening houden met dieetwensen en allergieën in onze kantoorlunch?",
    a: "Ja, volledig. Elke menukaart staat met duidelijke allergenen vermeld (gluten, lactose, eieren, vis, soja, noten, sesam) zodat je team direct ziet wat ze kunnen pakken. Vegetarische opties zijn standaard en geen afterthought — Bieten en Geitenkaas Bowl, Inari Power Bowl, Veggie Meatball Wrap zijn kernitems. Voor veganistisch, glutenvrij, halal of specifieke intoleranties (lactose, ei, soja) maken we individuele varianten die we persoonlijk labelen per gast. Als je een deelnemerslijst hebt met namen en dieetwensen, verwerken we dat rechtstreeks in de verpakking zodat niemand hoeft te zoeken. Bij Build Your Own Lunch krijgen grote groepen met veel dieetwensen een overzicht per persoon. Standaardwerk: 48 uur vooraf aanleveren. Last-minute meldingen (binnen 24 uur) opvangen we voor de 7 meest voorkomende allergieën (gluten, lactose, eieren, vis, noten, soja, sesam) omdat we daar standaard mise en place voor draaien.",
  },
  {
    q: "Wat is het verschil met een sandwich-service of bakkerij-catering?",
    a: "Drie concrete verschillen. Eén: de keuken. Wij werken vanuit een volwaardige restaurantkeuken aan de Kamp 8 (De Tafelaar) waar elke dienst HACCP-geïnspecteerd wordt. Een sandwich-service werkt typisch vanuit een productiekeuken zonder dezelfde sanitatie- en allergenendiscipline. Twee: de chef. De chef-kok bedenkt het menu, kookt het zelf, en draait elke week service in dezelfde keuken — niet via een verkoopafdeling die een receptkaart doorgeeft aan een productie-team. Drie: de kwaliteit-baseline. Restaurant-grade technieken (dry-age, sous-vide, finishing op open vuur) zijn gewoon beschikbaar als jouw event ze vraagt — bij een bakkerij-catering zit je vast aan een lijst broodjes. Voor een simpele kantoorlunch van 15 broodjes maakt dat weinig verschil in prijs (we zitten gewoon op €7,50 p.p. zoals concurrenten). Voor een lunch waar smaak en consistentie ertoe doen — onboarding van klanten, board lunches, off-site teamdagen — maakt het wel verschil.",
  },
];

const faqSchema = buildFaqPage(
  faqs.map((f) => ({ question: f.q, answer: f.a })),
);

// --- 13-wijken delivery list with proximity ---------------------------------

const WIJKEN = [
  { name: "Binnenstad", postcode: "3811", proximity: "5 min", note: "Direct vanaf de Kamp" },
  { name: "Kamp", postcode: "3811-3812", proximity: "2 min", note: "Loopafstand van de keuken" },
  { name: "Soesterkwartier", postcode: "3812", proximity: "5 min", note: "Via Stationsplein" },
  { name: "Leusderkwartier", postcode: "3817", proximity: "8 min", note: "Via Leusderweg" },
  { name: "Valleipoort", postcode: "3815-3821", proximity: "10 min", note: "Centraal in de stad" },
  { name: "Kattenbroek", postcode: "3825", proximity: "12 min", note: "Via Maatweg" },
  { name: "Randenbroek", postcode: "3814", proximity: "10 min", note: "Via Bunschoterstraat" },
  { name: "Vathorst", postcode: "3825-3826", proximity: "15 min", note: "Via Hooglanderhof" },
  { name: "Hoogland", postcode: "3828", proximity: "13 min", note: "Via Liendert" },
  { name: "Hooglanderveen", postcode: "3829", proximity: "16 min", note: "Iets verder, plan vroeger in" },
  { name: "Liendert", postcode: "3815", proximity: "11 min", note: "Via Liendertseweg" },
  { name: "Schothorst", postcode: "3815-3816", proximity: "12 min", note: "Via Schothorsterlaan" },
  { name: "Zielhorst", postcode: "3815-3818", proximity: "13 min", note: "Via Smitsveen" },
] as const;

// --- Page component --------------------------------------------------------

export default function KantoorlunchAmersfoortPage() {
  return (
    <div className={ui.page}>
      <JsonLd data={serviceSchema} id="schema-kantoorlunch-service" />
      <JsonLd data={breadcrumbSchema} id="schema-kantoorlunch-breadcrumb" />
      <JsonLd data={faqSchema} id="schema-kantoorlunch-faq" />

      <div aria-hidden="true" className={ui.bgFX} />

      {/* HERO */}
      <section className={ui.container + " " + ui.sectionY}>
        <div className="mx-auto max-w-4xl text-center">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-semibold uppercase tracking-widest text-white/60">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-primary">Diensten</Link>
            <span className="mx-2">/</span>
            <Link href="/services/catering" className="hover:text-primary">Catering</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Kantoorlunch Amersfoort</span>
          </nav>

          <div className={ui.pill + " mx-auto"}>
            <span className={ui.copperDot} aria-hidden="true" />
            Kantoorlunch · Tafelaar × Jezza Cooks Catering
          </div>

          <h1 className="mt-5 font-headline text-4xl font-bold leading-tight md:text-6xl">
            Kantoorlunch in Amersfoort — chef-led vanaf €7,50 p.p.
          </h1>

          <p className={`mt-4 text-base md:text-xl leading-relaxed ${ui.mutedOnNight} mx-auto max-w-3xl`}>
            Lunch op kantoor die werkt: broodjes, bowls, wraps en lunchpakketten,
            geleverd vanuit een echte restaurantkeuken aan de{" "}
            <strong>Kamp 8 in de binnenstad van Amersfoort</strong>. Niet een
            sandwich-fabriek — een{" "}
            <strong>10-persoons restaurantteam</strong> met chef-kok, restaurant-grade HACCP en backup-chef op stand-by.
            Levering binnen 10 minuten naar de meeste Amersfoortse kantoorlocaties.
          </p>

          {/* Capability strip — same pattern as parent catering page */}
          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 font-semibold text-primary">
              Vanaf €7,50 p.p.
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-semibold">
              Min. 10 personen
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-semibold">
              48 uur vooraf
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-semibold">
              13 wijken bezorging
            </span>
            <a
              href="https://trustoo.nl/utrecht/amersfoort/catering/tafelaar-amersfoort-bv/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 font-semibold text-primary hover:bg-primary/20"
            >
              ★ De Tafelaar 9.8 / 96 (Trustoo)
            </a>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/services/catering#aanvraag" className={ui.ctaPrimary}>
              Offerte aanvragen <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/services/catering#menu" className={ui.ctaSecondary}>
              Bekijk het menu
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT IS — 130-167 word standalone passage */}
      <section className={ui.container + " pb-12 md:pb-20"}>
        <div className={ui.paperSoft + " mx-auto max-w-3xl p-7 md:p-10"}>
          <div className={ui.pill}>
            Wat houdt het in <span className={ui.copperDot} aria-hidden="true" />
            kantoorlunch in Amersfoort
          </div>
          <h2 className="mt-4 font-headline text-3xl md:text-4xl font-bold">
            Wat is een kantoorlunch van Tafelaar × Jezza Cooks?
          </h2>
          <p className={`mt-4 leading-relaxed ${ui.mutedOnPaper} md:text-lg`}>
            Een kantoorlunch van Tafelaar × Jezza Cooks Catering is een
            <strong> chef-led, individueel verpakte lunch</strong> voor groepen
            van 10 tot 150+ personen, geleverd in jouw kantoor in Amersfoort
            of omgeving. We werken met vier vaste categorieën:{" "}
            <strong>broodjes</strong> (€7,50 p.p.) zoals Vitello Tonnato,
            Carpaccio Truffel, Gerookte Zalm en Inari Bao-Style;{" "}
            <strong>bowls</strong> (€10,50 p.p.) zoals Carpaccio Salad Bowl,
            Bieten en Geitenkaas Bowl, Inari Power Bowl;{" "}
            <strong>wraps</strong> (€7,50 p.p.) zoals Pulled Pork, Veggie
            Meatball, Zalm; en <strong>lunchpakketten</strong> (€13,50 –
            €18,50 p.p.) waarbij sandwich + bowl + bite + dessert in één box
            komen. Alle items worden geleverd in individuele transport-proof
            verpakking met heldere allergenen-labels per gast. Geen gedoe op
            kantoor: uitpakken, neerzetten en serveren. Levering vanaf onze
            keuken aan de Kamp 8 (in shared-dining restaurant De Tafelaar) is
            standaard binnen 10 minuten in de meeste Amersfoortse wijken.
            Reactie op nieuwe aanvragen: gemiddeld onder 1 uur.
          </p>
        </div>
      </section>

      {/* DELIVERY — 13 wijken with proximity */}
      <section className={ui.container + " pb-12 md:pb-20"}>
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <div className={ui.pill + " mx-auto"}>
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Bezorggebied
            </div>
            <h2 className="mt-4 font-headline text-3xl md:text-4xl font-bold">
              In welke Amersfoortse wijken leveren we kantoorlunch?
            </h2>
            <p className={`mt-3 ${ui.mutedOnNight} md:text-lg`}>
              Vanaf de keuken aan de Kamp 8 — onderstaande wijken met
              gemiddelde rijtijd. Centrum is gratis vanaf 15 personen.
            </p>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {WIJKEN.map((w) => (
              <div
                key={w.name}
                className="rounded-2xl border border-white/15 bg-white/5 p-4"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-headline text-lg font-bold">
                    {w.name}
                  </div>
                  <div className="text-xs font-semibold text-primary">
                    {w.proximity}
                  </div>
                </div>
                <div className={`mt-1 text-xs ${ui.mutedOnNight}`}>
                  Postcode {w.postcode} · {w.note}
                </div>
              </div>
            ))}
          </div>

          <p className={`mt-6 text-center text-sm ${ui.mutedOnNight} md:text-base`}>
            Buurgemeentes (<strong>Soest, Leusden, Baarn, Bunschoten, Nijkerk,
            Barneveld</strong>) leveren we ook — €20 tot €35 bezorgkosten
            afhankelijk van afstand, minimaal 15 personen. Voor Utrecht,
            Hilversum, Apeldoorn en Zwolle: op afspraak, vanaf 20 personen.
          </p>
        </div>
      </section>

      {/* PROCESS — 4-step */}
      <section className={ui.container + " pb-12 md:pb-20"}>
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <div className={ui.pill + " mx-auto"}>
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Hoe het werkt
            </div>
            <h2 className="mt-4 font-headline text-3xl md:text-4xl font-bold">
              Hoe bestel je een kantoorlunch?
            </h2>
          </div>

          <ol className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              {
                n: "1",
                t: "Aanvraag",
                d: "Vul het korte formulier in op /services/catering of stuur een WhatsApp naar +31 6 34127992. Geef datum, tijd, aantal en locatie.",
              },
              {
                n: "2",
                t: "Voorstel binnen 1 uur",
                d: "Wij sturen een concreet menu-voorstel met prijs en levertijd. Aanpassingen kunnen kosteloos tot 72 uur vooraf.",
              },
              {
                n: "3",
                t: "Prep + bezorging",
                d: "Op de dag zelf: prep in onze keuken aan de Kamp 8, individueel verpakt, geleverd 30 minuten voor lunchtijd op jullie locatie.",
              },
              {
                n: "4",
                t: "Klaar om te serveren",
                d: "Boxen open, allergenen-labels zichtbaar, je team pakt en eet. Wij halen de verpakking de volgende werkdag op of regelen recycling.",
              },
            ].map((s) => (
              <li key={s.n} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-headline text-3xl font-bold text-primary">
                    {s.n}
                  </span>
                  <h3 className="font-headline text-lg font-bold md:text-xl">
                    {s.t}
                  </h3>
                </div>
                <p className={`mt-2 text-sm leading-relaxed ${ui.mutedOnNight} md:text-base`}>
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PARTNER RESTAURANT */}
      <section className={ui.container + " pb-12 md:pb-20"}>
        <div className="mx-auto max-w-4xl rounded-3xl border border-primary/30 bg-primary/5 p-6 md:p-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6">
            <Users className="h-12 w-12 shrink-0 text-primary" aria-hidden="true" />
            <div className="flex-1">
              <h2 className="font-headline text-2xl font-bold md:text-3xl">
                Vanuit een echte restaurantkeuken — niet een sandwich-fabriek
              </h2>
              <p className={`mt-3 leading-relaxed ${ui.mutedOnNight} md:text-lg`}>
                De keuken voor jouw kantoorlunch is de keuken van shared-dining
                restaurant{" "}
                <a
                  href="https://www.tafelaaramersfoort.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-primary decoration-2 underline-offset-4 hover:opacity-80"
                >
                  De Tafelaar
                </a>{" "}
                aan de Kamp 8 in de binnenstad — het restaurant van partner
                Jan Molmans, waar Jeremy Arrascaeta (Jezza Cooks) zelf chef-kok
                is. Het restaurant heeft{" "}
                <a
                  href="https://trustoo.nl/utrecht/amersfoort/catering/tafelaar-amersfoort-bv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-primary decoration-2 underline-offset-4 hover:opacity-80"
                >
                  9.8 / 10 op 96 reviews bij Trustoo
                </a>
                , is TOP PRO 2026, Leermeester-gecertificeerd en lid van
                Koninklijke Horeca Nederland (KHN). Diezelfde discipline,
                inkoop-relaties en sanitatie-standaarden gaan in elke
                kantoorlunch box die we uitleveren.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={ui.container + " pb-12 md:pb-20"}>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Veelgestelde vragen over kantoorlunch in Amersfoort
            </h2>
            <p className={`mt-3 ${ui.mutedOnNight} md:text-lg`}>
              Concrete antwoorden voor procurement, office managers en EA's.
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6">
            <Accordion type="single" collapsible>
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`kantoorlunch-faq-${i}`} className="border-white/10">
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
        </div>
      </section>

      {/* CTA */}
      <section className={ui.container + " pb-12 md:pb-20"}>
        <div className="mx-auto max-w-3xl rounded-3xl border border-primary/40 bg-primary/10 p-7 text-center md:p-10">
          <h2 className="font-headline text-2xl font-bold md:text-3xl">
            Klaar om jullie volgende kantoorlunch te plannen?
          </h2>
          <p className={`mt-3 ${ui.mutedOnNight} md:text-lg`}>
            Korte aanvraag, voorstel binnen 1 uur. Geen verplichting.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/services/catering#aanvraag" className={ui.ctaPrimary}>
              Offerte aanvragen <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href={`tel:${SITE.contact.phone}`}
              className={ui.ctaSecondary}
            >
              Bel direct {SITE.contact.phoneDisplay}
            </a>
          </div>
          <p className={`mt-6 text-xs ${ui.mutedOnNight}`}>
            <CheckCircle className="mr-1 inline h-3 w-3" aria-hidden="true" />
            Reactie gemiddeld onder 1 uur · {SITE.address.streetAddress},{" "}
            {SITE.address.postalCode} {SITE.address.addressLocality} · KvK {SITE.kvk}
          </p>
        </div>
      </section>
    </div>
  );
}
