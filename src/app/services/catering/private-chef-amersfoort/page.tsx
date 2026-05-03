// src/app/services/catering/private-chef-amersfoort/page.tsx
//
// Tier 5H landing page targeting "private chef amersfoort" — the top 3
// in this SERP are aggregator platforms (chefmaison.com, takeachef.com,
// huischef.nl), not personal-brand owners. We attack with a real named
// chef + verifiable credentials + Amersfoort locality.
//
// Structure:
//   - hero with chef-credentials capability strip
//   - "Wie is jouw private chef?" 150w bio passage with 4 inline press anchors
//   - "Hoe werkt een private chef diner thuis?" 4-step process
//   - "Wat kost een private chef in Amersfoort?" pricing block (3 tiers)
//   - 8 FAQs specific to private chef intent
//   - Person + Service schema; Person uses jobTitle: "Chef" (NOT a "Chef" type)
//
// Reuses `ui` constants from src/app/services/catering/page.tsx.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChefHat, Clock, MapPin, Star } from "lucide-react";
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
  title: "Private Chef Amersfoort — Chef Jeremy Arrascaeta thuis aan het fornuis | Tasting menu vanaf €55 p.p.",
  description:
    "Boek een private chef in Amersfoort. Chef Jeremy Arrascaeta (10+ jaar high-end keukens, finalist Euro-Toques Young Chef Award 2018, dry-aging lead bij Angler Stirling Adelaide Hills) kookt een 5- of 7-gangen tasting menu bij jou thuis. Voor 6-14 gasten, vanaf €55 p.p. exclusief inkoop. Werkgebied: heel Amersfoort en alle wijken (Binnenstad, Kamp, Soesterkwartier, Vathorst, Hoogland, Leusderkwartier), plus Utrecht, Hilversum, Soest, Leusden, Baarn, Bunschoten, Nijkerk en Barneveld.",
  alternates: { canonical: "/services/catering/private-chef-amersfoort" },
  openGraph: {
    title: "Private Chef Amersfoort — Chef Jeremy Arrascaeta",
    description:
      "Echte chef met verifieerbare credentials (Euro-Toques 2018 finalist, ex-Angler Stirling, chef-kok De Tafelaar). 5-7 gangen tasting menu thuis vanaf €55 p.p.",
    type: "website",
    url: "/services/catering/private-chef-amersfoort",
  },
  keywords: [
    "private chef amersfoort",
    "private chef thuis amersfoort",
    "private chef inhuren amersfoort",
    "chef aan huis amersfoort",
    "tasting menu thuis amersfoort",
    "diner thuis amersfoort",
    "5 gangen diner amersfoort",
    "7 gangen diner amersfoort",
    "private chef binnenstad amersfoort",
    "private chef vathorst",
    "private chef soest",
    "private chef leusden",
    "private chef baarn",
    "private chef hilversum",
    "private chef utrecht",
    "Jeremy Arrascaeta private chef",
    "Chef Jezz private dining",
    "high-end private chef nederland",
  ],
};

// --- Schema ----------------------------------------------------------------

// NOTE: schema entity types restricted to canonical schema.org primitives
// per plan v3. Person uses jobTitle: "Chef" — there is NO "Chef" top-level
// type in schema.org, so we DO NOT use it.

const serviceSchema = buildServicePage({
  slug: "catering/private-chef-amersfoort",
  name: "Private Chef Amersfoort — Chef Jeremy Arrascaeta",
  description:
    "Private chef service in Amersfoort en omgeving. Chef Jeremy Arrascaeta (10+ jaar high-end keukens in Europa en Australië, finalist Euro-Toques Young Chef Award 2018 namens Restaurant Bougainville Amsterdam, dry-aging lead bij Angler Restaurant Stirling Adelaide Hills) kookt een 5- of 7-gangen tasting menu bij jou thuis voor 6 tot 14 gasten. Vanaf €55 per persoon exclusief inkoop. Inclusief menu-ontwerp, lokale inkoop, transport van apparatuur, service en afbouw. Werkgebied: heel Amersfoort, Utrecht, Hilversum, Soest, Leusden, Baarn, Bunschoten, Nijkerk, Barneveld.",
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
  ],
});

const breadcrumbSchema = buildBreadcrumbList([
  { name: "Home", item: "/" },
  { name: "Diensten", item: "/services" },
  { name: "Catering", item: "/services/catering" },
  { name: "Private Chef Amersfoort", item: "/services/catering/private-chef-amersfoort" },
]);

// --- 8 private-chef FAQs (each ~140 words) ---------------------------------

const faqs = [
  {
    q: "Wat kost een private chef in Amersfoort?",
    a: "Het basistarief is €55 per persoon exclusief inkoop voor een 5-gangen tasting menu, en €75 per persoon voor een 7-gangen menu. Vanaf 6 gasten, maximaal 14 (boven 14 wordt het logistiek lastig in een gemiddelde thuiskeuken). Inkoop wordt apart afgerekend op kostprijs zonder opslag — voor een 5-gangen diner reken je gemiddeld €35-€55 per persoon aan inkoop afhankelijk van seizoen en grondstoffen (vlees vs vis vs vegetarisch). Inclusief in het basistarief: menu-ontwerp op basis van dieetwensen en seizoen, inkoop bij lokale leveranciers in Amersfoort (Van de Koolwijk, Nico Beekhuizen, Vishandel Sperling), transport van apparatuur, service aan tafel en volledige afbouw na het diner. Reistoeslag: gratis binnen Amersfoort centrum; €25 voor randwijken (Vathorst, Hooglanderveen, Hoogland) en buurgemeenten; €0,21/km voor verdere afstanden. Aanvragen minimaal 14 dagen vooraf voor garantie op gewenste datum. Betalingsvoorwaarden: 25% aanbetaling bij bevestiging, 75% direct na het diner.",
  },
  {
    q: "Wie is de chef en welke ervaring heeft hij?",
    a: "De private chef is Jeremy Arrascaeta (Chef Jezz). 10+ jaar gedraaid in high-end keukens in Europa en Australië. Finalist Euro-Toques Young Chef Award 2018 namens Restaurant Bougainville Amsterdam. Daarna dry-aging lead bij Angler Restaurant Stirling in de Adelaide Hills, Zuid-Australië (2020-2022) — daar bekend geworden om het fish dry-age programma met cured sashimi, fish sausages, barramundi crackling en carp bacon. Gecoverd in InDaily SA, Australian Good Food Guide, Broadsheet Adelaide en Aquna. Daarvoor head chef op Kangaroo Island bij Hanson Bay Sanctuary en Flinders Chase Café tijdens de 2019/2020 bushfires. Sinds 2025 terug in Nederland als chef-kok bij shared-dining restaurant De Tafelaar Amersfoort (Kamp 8) waar het restaurant 9.8/10 op 96 reviews bij Trustoo heeft (TOP PRO 2026, KHN-lid, Leermeester gecertificeerd). Geen aggregator, geen platform — je hebt direct contact met de chef die zelf kookt.",
  },
  {
    q: "Hoe werkt een private chef diner thuis bij mij?",
    a: "In vier stappen. (1) Discovery call van 20-30 minuten waar we het concept bespreken: aantal gasten, datum, dieetwensen, allergieën, stijlvoorkeuren (klassiek vs experimenteel, bijv. dry-age weldoen of vegetarisch), budget en bijzonderheden van jouw keuken. (2) Menu-voorstel binnen 3 werkdagen met 5 of 7 gangen, wijnsuggesties, en een transparante kostprijs voor de inkoop. Aanpassingen kosteloos. (3) Inkoop en mise en place 1-2 dagen vooraf bij lokale leveranciers in Amersfoort. Op de dag zelf kom ik 3-4 uur voor service-start aan op locatie om de keuken te checken en final prep te doen. (4) Service aan tafel — ik kook live in jouw keuken, plate per gang en serveer. Na het laatste dessert ruim ik volledig op (afwas, schoonmaak, vuilnis). Jullie hoeven niets behalve genieten. Voor 5 gangen reken je 3-4 uur tafel; voor 7 gangen 4-5 uur.",
  },
  {
    q: "Welke menu-stijlen kun je koken?",
    a: "Vier hoofdstijlen, allemaal seizoens-gedreven. (1) Modern Nederlands met Australische invloed — mijn signatuur: dry-age vlees of vis, gefermenteerde groenten, bos- en wildplukken uit Nederlandse seizoenen, finishing op open vuur waar mogelijk. (2) Pure Mediterraan — nadruk op olie, citroen, kruiden, dagelijkse vis (zee), simpele groenten op hun beste moment. (3) Asian fusion (Indonesisch, Thai, Japans) — werkbasis in Australië maakt dit een tweede natuur; cured sashimi, ferments, dashi-bouillons, Thai aromaten. (4) Vegetarisch / veganistisch high-end — geen afterthought; volledig op zichzelf staand 5- of 7-gangen menu met dezelfde technische diepte als vlees of vis. Halal en koosjer mogelijk met 7 dagen aanlooptijd (inkoop loopt dan via gespecialiseerde leverancier). Allergieën en dieetwensen verwerken we 1-op-1 in het menu — geen 'apart bord voor de vegetariër' maar het hele menu past zich aan.",
  },
  {
    q: "Voor hoeveel gasten kun je een private chef diner doen?",
    a: "Optimaal 6 tot 14 gasten in een gemiddelde Nederlandse thuiskeuken. Voor 4-5 gasten ook mogelijk maar de prijs per persoon ligt iets hoger omdat de fixed cost (mijn tijd) over minder mensen verdeeld wordt — voor 4 gasten reken je circa €75-€85 per persoon basistarief in plaats van €55. Voor groepen boven 14 gasten verschuift het concept van 'private chef thuis' naar 'family-style catering met chef op locatie' — daar kunnen we ook in voorzien (vanaf €45 p.p., zie de hoofd-cateringpagina), maar het is een ander soort event. Voor 14+ gasten in een thuiskeuken hebben we ook minimaal een tweede paar handen nodig, wat €175 toeslag betekent voor een sous-chef. De praktische limiet wordt eerder bepaald door de keuken (oven, koelruimte, prep-vlak) dan door mij.",
  },
  {
    q: "In welke wijken en steden kom je private chef diners doen?",
    a: "Heel Amersfoort en alle wijken: Binnenstad, Kamp, Soesterkwartier, Leusderkwartier, Vathorst, Valleipoort, Kattenbroek, Randenbroek, Hoogland, Hooglanderveen, Liendert, Schothorst, Zielhorst. Plus de buurgemeenten Soest, Leusden, Baarn, Bunschoten, Nijkerk en Barneveld. Daarnaast Utrecht en Hilversum binnen 30 minuten rijden. Voor opdrachten verder weg (Amsterdam, Rotterdam, Zwolle, Apeldoorn) rekenen we een reistoeslag van €0,21 per kilometer plus een uurtarief voor reistijd boven 60 minuten. Reistoeslag binnen Amersfoort centrum is gratis; voor randwijken €25 vast. Voor evenementen op een tweede locatie (vakantiehuis, B&B, bedrijfslocatie) komen we ook — graag site-visit vooraf om de keukenfaciliteiten te checken; standaard inbegrepen voor diners boven 10 gasten. Niet beschikbaar voor diners buiten Nederland behalve op uitnodiging in zeer specifieke contexten.",
  },
  {
    q: "Hoe lang van tevoren moet ik een private chef boeken?",
    a: "Standaard 14 dagen vooraf voor reguliere diners. Dat geeft genoeg tijd voor menu-ontwerp, inkoop bij lokale leveranciers en eventuele site-visit. Voor speciale data (kerstavond, oudjaarsavond, Valentijn, Moederdag) reken op 6-8 weken aanloop omdat er beperkte capaciteit is. Voor last-minute diners (binnen 7 dagen) ben ik beschikbaar als ik geen ander event op die datum heb — bel direct +31 6 34127992 om te checken. Halal en koosjer diners hebben een minimum van 14 dagen omdat de vlees-inkoop via gespecialiseerde leveranciers loopt. Voor terugkerende diners (maandelijks of kwartaal) maken we een raamcontract zodat je voorrang hebt op standaarddata. Annulering: kosteloos tot 14 dagen vooraf; tussen 14 en 7 dagen 50% van het basistarief; binnen 7 dagen 100% van het basistarief plus inkoop-kostprijs.",
  },
  {
    q: "Wat heb je nodig in mijn keuken om te kunnen koken?",
    a: "Minder dan je denkt. Basis-vereisten: een functionerende oven, een goed kookvlak met minimaal 3 pitten (gas heeft de voorkeur, inductie kan ook), koelruimte voor mise en place (1 koelkast schap is vaak voldoende), en een plek voor afwas met warm water. Ik breng zelf alle gespecialiseerde apparatuur mee die ik nodig heb: sous-vide circulator, blow torch, schaal-precisie weegschalen, mandolines, scherp messengoed, dry-age tassen indien gewenst, en alle plating tools. Eigen tafelware (borden, bestek, glaswerk) wordt gebruikt — kijk vooraf even of je serviesgoed compleet is voor het aantal gasten en gangen. Geen indrukwekkende keuken nodig. Een normale eetkamer of woonkeuken werkt prima. Voor heel beperkte keukens (klein appartement, geen oven) kunnen we kiezen voor een menu dat hoofdzakelijk op het kookvlak draait — bespreken we tijdens de discovery call.",
  },
];

const faqSchema = buildFaqPage(
  faqs.map((f) => ({ question: f.q, answer: f.a })),
);

// --- Page component --------------------------------------------------------

export default function PrivateChefAmersfoortPage() {
  return (
    <div className={ui.page}>
      <JsonLd data={serviceSchema} id="schema-private-chef-service" />
      <JsonLd data={breadcrumbSchema} id="schema-private-chef-breadcrumb" />
      <JsonLd data={faqSchema} id="schema-private-chef-faq" />

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
            <span className="text-white/80">Private Chef Amersfoort</span>
          </nav>

          <div className={ui.pill + " mx-auto"}>
            <ChefHat className="h-3.5 w-3.5" aria-hidden="true" />
            Private Chef · Tasting menu thuis
          </div>

          <h1 className="mt-5 font-headline text-4xl font-bold leading-tight md:text-6xl">
            Private Chef Amersfoort — Chef Jeremy Arrascaeta thuis aan het fornuis
          </h1>

          <p className={`mt-4 text-base md:text-xl leading-relaxed ${ui.mutedOnNight} mx-auto max-w-3xl`}>
            Geen aggregator-platform met onbekende chefs. Een echte chef met
            verifieerbare credentials kookt een{" "}
            <strong>5- of 7-gangen tasting menu bij jou thuis</strong> in
            Amersfoort en omgeving. 10+ jaar high-end keukens in Europa en
            Australië, finalist Euro-Toques Young Chef Award 2018, ex-Angler
            Stirling dry-aging lead. Voor <strong>6 tot 14 gasten</strong>,
            vanaf <strong>€55 p.p.</strong> exclusief inkoop. Inclusief
            menu-ontwerp, lokale inkoop, service en volledige afbouw.
          </p>

          {/* Capability strip */}
          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 font-semibold text-primary">
              <ChefHat className="h-3.5 w-3.5" aria-hidden="true" /> 10+ jaar high-end
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-semibold">
              <Star className="h-3.5 w-3.5" aria-hidden="true" /> Euro-Toques 2018 finalist
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-semibold">
              Ex-Angler Stirling
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-semibold">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Werkgebied 17 wijken/steden
            </span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/services/catering#aanvraag" className={ui.ctaPrimary}>
              Boek een private chef diner <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a href={`tel:${SITE.contact.phone}`} className={ui.ctaSecondary}>
              Bel direct {SITE.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* CHEF BIO — 150w with inline press anchors */}
      <section className={ui.container + " pb-12 md:pb-20"}>
        <div className={ui.paperSoft + " mx-auto max-w-3xl p-7 md:p-10"}>
          <div className={ui.pill}>
            De chef <span className={ui.copperDot} aria-hidden="true" />
            verifieerbare credentials
          </div>
          <h2 className="mt-4 font-headline text-3xl md:text-4xl font-bold">
            Wie is jouw private chef?
          </h2>
          <p className={`mt-4 leading-relaxed ${ui.mutedOnPaper} md:text-lg`}>
            Jeremy Arrascaeta (Chef Jezz) — 10+ jaar in high-end keukens in
            Europa en Australië. Begonnen in Nederland, finalist{" "}
            <strong>Euro-Toques Young Chef Award 2018</strong> namens
            Restaurant Bougainville Amsterdam. Daarna naar Australië voor
            dry-aging-werk: head chef op Kangaroo Island (Hanson Bay
            Sanctuary, Flinders Chase Café, 2019-2020 tijdens de bushfires)
            en daarna <strong>dry-aging lead bij{" "}
            <a
              href="https://www.indailysa.com.au/news/archive/2020/08/19/stirlings-new-fish-and-chip-restaurant-is-catching-on"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-primary decoration-2 underline-offset-4 hover:opacity-80"
            >
              Angler Restaurant Stirling
            </a></strong>{" "}
            in de Adelaide Hills (2020-2022) — daar bekend geworden om het
            fish dry-age programma met cured sashimi, fish sausages,
            barramundi crackling en carp bacon. Gecoverd in{" "}
            <a
              href="https://www.agfg.com.au/article/oh-my-cod-this-chef-really-knows-seafood-we-talk-to-sam-prancesmith-from-angler-stirling"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-primary decoration-2 underline-offset-4 hover:opacity-80"
            >
              Australian Good Food Guide
            </a>
            ,{" "}
            <a
              href="https://www.broadsheet.com.au/adelaide/food-and-drink/article/broadsheets-favourite-adelaide-dishes-2021"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-primary decoration-2 underline-offset-4 hover:opacity-80"
            >
              Broadsheet Adelaide
            </a>{" "}
            en{" "}
            <a
              href="https://aquna.com/what-does-aquna-murray-cod-actually-taste-like/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-primary decoration-2 underline-offset-4 hover:opacity-80"
            >
              Aquna
            </a>
            . Sinds 2025 terug in Nederland als chef-kok bij shared-dining
            restaurant De Tafelaar Amersfoort (Kamp 8) — het restaurant
            heeft 9.8/10 op 96 reviews bij Trustoo. Voor private chef diners
            werk je dus direct met een verifieerbare chef, niet met een
            aggregator-platform dat freelancers aan boekers koppelt.
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
              Hoe werkt een private chef diner thuis?
            </h2>
          </div>

          <ol className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              {
                n: "1",
                t: "Discovery call",
                d: "20-30 min telefoongesprek over aantal gasten, datum, dieetwensen, stijlvoorkeur, budget en de keukenfaciliteiten thuis.",
              },
              {
                n: "2",
                t: "Menu-voorstel binnen 3 werkdagen",
                d: "5- of 7-gangen tasting menu, transparante inkoop-kostprijs, wijnsuggesties. Aanpassingen kosteloos.",
              },
              {
                n: "3",
                t: "Inkoop + mise en place",
                d: "Inkoop bij lokale Amersfoortse leveranciers (Van de Koolwijk, Nico Beekhuizen, Vishandel Sperling). Op de dag zelf 3-4 uur voor service-start op locatie voor final prep.",
              },
              {
                n: "4",
                t: "Service + afbouw",
                d: "Live koken in jouw keuken, plating per gang, service aan tafel. Volledige afbouw (afwas, schoonmaak, vuilnis) door mij. Jullie genieten alleen.",
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

      {/* PRICING TABLE */}
      <section className={ui.container + " pb-12 md:pb-20"}>
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Wat kost een private chef in Amersfoort?
            </h2>
            <p className={`mt-3 ${ui.mutedOnNight} md:text-lg`}>
              Drie pakketten. Inkoop apart op kostprijs zonder opslag.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-white/15 bg-white/5">
            <table className="w-full text-sm md:text-base">
              <thead className="bg-white/10 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold">Pakket</th>
                  <th className="px-4 py-3 font-semibold">Wat zit erin</th>
                  <th className="px-4 py-3 font-semibold">Gasten</th>
                  <th className="px-4 py-3 text-right font-semibold">Prijs p.p.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-4 py-4 font-medium">Tasting menu 5 gangen</td>
                  <td className="px-4 py-4 text-white/80">Menu-ontwerp · inkoop · service · afbouw</td>
                  <td className="px-4 py-4 text-white/80">6-14</td>
                  <td className="px-4 py-4 text-right font-semibold text-primary">€55</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-medium">Tasting menu 7 gangen</td>
                  <td className="px-4 py-4 text-white/80">Idem + 2 extra gangen + amuse-bouche</td>
                  <td className="px-4 py-4 text-white/80">6-14</td>
                  <td className="px-4 py-4 text-right font-semibold text-primary">€75</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-medium">Klein gezelschap (4-5 gasten)</td>
                  <td className="px-4 py-4 text-white/80">Hogere p.p. door fixed cost over minder gasten</td>
                  <td className="px-4 py-4 text-white/80">4-5</td>
                  <td className="px-4 py-4 text-right font-semibold text-primary">€75-€85</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-medium">+ Sous-chef voor 14+ gasten</td>
                  <td className="px-4 py-4 text-white/80">Tweede paar handen voor logistiek</td>
                  <td className="px-4 py-4 text-white/80">14+</td>
                  <td className="px-4 py-4 text-right font-semibold text-primary">+€175 vast</td>
                </tr>
              </tbody>
            </table>
            <div className={`px-4 py-4 text-xs ${ui.mutedOnNight} md:text-sm`}>
              Inkoop apart afgerekend op kostprijs (gemiddeld €35-€55 p.p.
              voor 5 gangen, afhankelijk van seizoen en grondstoffen).
              Reistoeslag: gratis binnen Amersfoort centrum, €25 voor
              randwijken, €0,21/km voor verdere afstanden. Aanbetaling 25%
              bij bevestiging, 75% direct na het diner.
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={ui.container + " pb-12 md:pb-20"}>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Veelgestelde vragen over private chef in Amersfoort
            </h2>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6">
            <Accordion type="single" collapsible>
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`pc-faq-${i}`} className="border-white/10">
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
            Klaar om een private chef diner te plannen?
          </h2>
          <p className={`mt-3 ${ui.mutedOnNight} md:text-lg`}>
            Discovery call duurt 20-30 minuten. Geen verplichting.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/services/catering#aanvraag" className={ui.ctaPrimary}>
              Boek een private chef diner <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a href={`tel:${SITE.contact.phone}`} className={ui.ctaSecondary}>
              Bel direct {SITE.contact.phoneDisplay}
            </a>
          </div>
          <p className={`mt-6 text-xs ${ui.mutedOnNight}`}>
            Standplaats Amersfoort · Werkgebied: heel Amersfoort + Utrecht,
            Hilversum, Soest, Leusden, Baarn, Bunschoten, Nijkerk, Barneveld
          </p>
        </div>
      </section>
    </div>
  );
}
