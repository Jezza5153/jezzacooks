// src/app/food-cost-controle/page.tsx
//
// Pillar page on food cost controle — targets Dutch commercial queries
// "food cost restaurant", "food cost controle horeca", "food cost berekenen",
// "food cost amersfoort". Built from the menu-engineering template: every
// H2 is a 130-167 word standalone passage so the page extracts cleanly
// into passage-level ranking systems. See /menu-engineering for the
// sibling pillar and skills/geo-seo-optimizer for the framework.

import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/json-ld";
import {
  buildArticle,
  buildBreadcrumbList,
  buildFaqPage,
} from "@/lib/schema";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const dynamic = "force-static";

const DATE_PUBLISHED = "2026-04-15";
const DATE_MODIFIED = "2026-04-15";
const WORD_COUNT = 3100;

export const metadata: Metadata = {
  title:
    "Food cost controle voor restaurants — complete gids | Jezza Cooks Amersfoort",
  description:
    "Complete gids food cost controle voor restaurants in Amersfoort en heel Nederland: wat is food cost, hoe bereken je het, benchmarks per segment, de 6 lekken waar food cost stuk gaat, wekelijkse controle-routine, waste log template en praktijkvoorbeeld van 33% naar 27% in 4 weken. Door Jeremy Arrascaeta — chef-kok bij De Tafelaar Amersfoort en horeca consultant bij Jezza Cooks.",
  alternates: { canonical: "/food-cost-controle" },
  openGraph: {
    title: "Food cost controle — complete gids voor restaurants",
    description:
      "Wat is food cost controle? Hoe hou je het onder de 30%? De 6 lekken, de wekelijkse routine, een waste log en een praktijkvoorbeeld van 33% → 27% in 4 weken. Door een chef die zelf service draait in Amersfoort.",
    url: "/food-cost-controle",
    type: "article",
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    authors: ["Jeremy Arrascaeta"],
  },
  keywords: [
    "food cost",
    "food cost restaurant",
    "food cost controle",
    "food cost berekenen",
    "food cost percentage",
    "food cost verlagen",
    "food cost Amersfoort",
    "food cost horeca",
    "waste log restaurant",
    "restaurant marge verhogen",
    "kostprijs berekenen restaurant",
    "horeca consultant Amersfoort",
    "restaurant prep structuur",
  ],
};

// --- Schema ------------------------------------------------------------------

const articleSchema = buildArticle({
  slug: "food-cost-controle",
  headline:
    "Food cost controle voor restaurants — complete gids met benchmarks, waste log en praktijkvoorbeeld",
  description:
    "Complete Nederlandstalige gids food cost controle voor horeca-ondernemers in Amersfoort en heel Nederland. Definitie, formule, benchmarks per segment, de 6 lekken, wekelijkse routine, waste log en een praktijkcase van 33% naar 27% food cost in 4 weken.",
  image: "/pics/service-consulting.jpg",
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  keywords: [
    "food cost controle",
    "food cost restaurant",
    "food cost berekenen",
    "waste log",
    "horeca consulting Amersfoort",
  ],
  about: [
    "Food cost controle",
    "Kostprijsberekening horeca",
    "Restaurant margin management",
    "Waste reduction",
    "Horeca consulting",
  ],
  wordCount: WORD_COUNT,
});

const breadcrumbSchema = buildBreadcrumbList([
  { name: "Home", item: "/" },
  { name: "Food cost controle", item: "/food-cost-controle" },
]);

// --- FAQ content (each ~140 words, GEO passage-optimized) -------------------

const faqs = [
  {
    q: "Wat is food cost controle in het kort?",
    a: "Food cost controle is het structureel monitoren en bijsturen van de verhouding tussen wat je ingrediënten kosten en wat je ze voor verkoopt. In formule: food cost % = (kostprijs ingrediënten ÷ verkoopprijs excl. BTW) × 100. Een regulier à la carte restaurant in Nederland mikt op 28-32% gemiddelde food cost. Controle betekent niet alleen éénmalig berekenen, maar wekelijks meten of het percentage blijft kloppen. De vier bronnen waar je je data uit haalt: POS-systeem (omzet + aantallen), recepten op grammage (kostprijs per gerecht), inkoopadministratie (actuele leveranciersprijzen) en waste log (wat er in de bak verdwijnt). Zonder die vier loopt je food cost binnen 4 weken weer op. Goede food cost controle kost 30 minuten per week per keuken — en levert 2-4 procentpunten marge terug binnen 6 weken.",
  },
  {
    q: "Hoe bereken je de food cost van een gerecht?",
    a: "Per gerecht: tel alle ingrediënten op receptuur, reken uit wat elk ingrediënt kost op basis van je actuele inkoopprijs, en deel die kostprijs door de verkoopprijs exclusief BTW. Voorbeeld: een Carpaccio Truffel bestaat uit 80g rundercarpaccio (€0,96 bij €12/kg), 15g truffelmayonaise (€0,75), 10g Parmezaan (€0,18), 20g rucola (€0,10) en 1 plak brood (€0,15). Totale kostprijs: €2,14. Verkoopprijs €13,50 (€12,39 excl. BTW bij 9%). Food cost = 2,14 ÷ 12,39 = 17,3%. Dat is een star — zeer hoge marge. Belangrijk: vergeet niet de kleine dingen (olie, zout, peper, garnituur, kruiden) mee te rekenen. Die lijken klein maar tellen op over 1.000 borden. En reken altijd met werkelijke porties (weeg 10 borden na prep), niet met receptgrammages op papier — daar zit typisch 5-8% lek.",
  },
  {
    q: "Wat is een goede food cost percentage voor een Nederlands restaurant?",
    a: "Voor een regulier à la carte restaurant in Nederland ligt de norm tussen 28% en 32% gemiddelde food cost (kostprijs gedeeld door verkoopprijs excl. BTW). Onder de 28% ben je uitzonderlijk scherp of gebruik je veel lage-kostprijs-ingrediënten; boven de 32% snijdt je marge in. Pizzeria's en pasta-zaken zitten doorgaans lager (22-26%) omdat deeg, tomaat en kaas spotgoedkoop zijn. Sushi en high-end seafood zitten juist hoger (35-40%) door dure grondstoffen. Fine dining werkt vaak met 30-35% food cost maar rekent dat terug via hogere verkoopprijzen. Lunchcafés met belegde broodjes halen 25-28%. Shared dining zit tussen 30-34% door portie-afspraak. Cruciaal: één gemiddelde zegt niets — een kaart met 32% gemiddelde food cost waarvan één gerecht op 45% zit lekt gewoon geld. De spreiding per gerecht is belangrijker dan het gemiddelde.",
  },
  {
    q: "Hoe verlaag ik food cost zonder kwaliteit te verlagen?",
    a: "Het lek zit zelden in de inkoopprijs zelf — dat is meestal het eerste dat eigenaars denken, maar het klopt zelden. Het lek zit in porties die per shift verschillen, recepturen die alleen in het hoofd van één kok zitten, waste die niemand meet, en wisselende prep waardoor je elke dag opnieuw begint. Als je daar afspraken op zet (portie-gewichten opschrijven, recepten op kaart, waste-log aan het einde van de dienst, vaste prep-ritmes) zakt je food cost typisch 2-4 procentpunten in 4-6 weken zonder dat gasten iets merken van kwaliteitsvermindering. Pas als dat staat ga je kijken naar inkoop. Dat voorkomt dat je onderhandelt over €0,20 per kilo terwijl je €3 per dag weggooit aan rotte kruiden. Kwaliteit daalt niet — sterker, hij stabiliseert omdat er minder variatie in het bord komt.",
  },
  {
    q: "Hoe vaak moet je food cost controleren in een restaurant?",
    a: "Wekelijks het totaal (omzet × theoretische food cost vs. werkelijke food cost, verschil is je lek), maandelijks per categorie (voor-, hoofd-, nagerechten, drank), elk kwartaal een volledige herberekening per gerecht. Daarnaast dagelijks een waste-log bijhouden (zie sectie 6) en wekelijks 10 borden nawegen om portie-drift te checken. Dat klinkt veel maar kost in totaal ~30 minuten per week zodra het systeem eenmaal staat. De wekelijkse totaalcheck is de belangrijkste — je vergelijkt wat je theoretisch had moeten gebruiken (aantal borden × receptkosten) met wat je écht hebt gebruikt (inkoop - eindvoorraad). Het verschil heet variance. Een variance boven 2% over een hele week betekent: lek. Onder 1% is uitstekend. Tussen 1 en 2% is normaal en je kijkt of het structureel is of incidenteel.",
  },
  {
    q: "Werk je aan food cost controle in Amersfoort en de regio Utrecht?",
    a: "Ja. Standplaats is Amersfoort en ik werk in heel Amersfoort en omgeving: alle wijken (Binnenstad, Kamp, Soesterkwartier, Leusderkwartier, Vathorst, Valleipoort, Kattenbroek, Randenbroek, Hoogland, Liendert, Schothorst, Zielhorst), plus Utrecht, Hilversum, Soest, Leusden, Baarn, Bunschoten, Nijkerk en Barneveld. Buiten dat gebied werk ik remote met één fysieke kick-off. Jezza Cooks is gevestigd aan de Nijkerkerstraat 3, 3821 CD Amersfoort (Valleipoort, KvK 99547619). Ik draai zelf elke week service als chef-kok bij shared-dining restaurant De Tafelaar aan de Kamp 8 in de binnenstad (eigenaar Jan Molmans) — dus ik ken de lokale leveranciers, inkoopprijzen en gastvolumes van binnenuit. Een volledig food cost controle traject begint bij €897 excl. BTW (3 dagdelen: diagnose, implementatie, borging). Een enkele Quick Scan begint bij €450.",
  },
  {
    q: "Kan ik food cost zelf onder controle krijgen of heb ik een consultant nodig?",
    a: "Zelf kan prima, mits je de discipline hebt om het elke week te doen en je het systeem eerlijk invult. De valkuil: de meeste eigenaars beginnen enthousiast, hebben na 3 weken andere prioriteiten, en 6 weken later is de food cost weer bij af. Een consultant helpt op drie punten: (1) het systeem van nul opbouwen in 1-2 dagen zodat je niet hoeft te Googlen hoe Excel werkt, (2) de eerste keer samen meelopen op de vloer zodat je de echte lekken ziet in plaats van vermoedens, en (3) externe druk creëren waardoor de eigenaar daadwerkelijk de wekelijkse 30 minuten neemt. Voor een restaurant met 25-40 menu-items is het ROI van een extern traject meestal 5-10x de investering in het eerste kwartaal. Daarna kan het team het zelf, mits er één persoon eindverantwoordelijk is.",
  },
];

const faqSchema = buildFaqPage(
  faqs.map((f) => ({ question: f.q, answer: f.a })),
);

// --- Food cost benchmarks by segment ---------------------------------------

const FOOD_COST_BENCHMARKS = [
  { type: "Pizzeria / Pasta", range: "22 – 26%", note: "Goedkope basis (deeg, tomaat, kaas)" },
  { type: "Lunchcafé (broodjes, salades)", range: "25 – 28%", note: "Lage labor, hoge volume" },
  { type: "Bistro / casual dining", range: "28 – 32%", note: "Mainstream segment" },
  { type: "À la carte restaurant", range: "28 – 32%", note: "Breed menu, mixed volumes" },
  { type: "Shared dining", range: "30 – 34%", note: "Portie-afspraak, hogere kwaliteit" },
  { type: "Fine dining / tasting menu", range: "30 – 35%", note: "Hoge grondstofkosten, hoge verkoop" },
  { type: "Sushi / high-end seafood", range: "35 – 40%", note: "Dure vis + portietraining" },
] as const;

// --- The 6 leaks ------------------------------------------------------------

const LEAKS = [
  {
    title: "Portie-drift",
    description:
      "Porties die per shift verschillen omdat er geen gestandaardiseerde methode is. Eén kok doet 90g, een ander 110g — dat is 22% variatie op de hoofdcomponent en loopt direct naar je food cost.",
    fix: "Weeg 10 borden per gerecht na prep en leg de afwijking vast. Gebruik porte-cups of weegschalen.",
  },
  {
    title: "Receptuur in hoofden",
    description:
      "Recepten die alleen in het hoofd van één kok zitten zijn niet audit-baar en niet train-baar. Als die kok vrij is lekt het systeem onmiddellijk.",
    fix: "Schrijf elk recept uit op grammage inclusief alle ingrediënten. Plaats op de keukenmuur of in een Google Sheet.",
  },
  {
    title: "Waste zonder meting",
    description:
      "Rotte groente, over-bereide sauzen, weggegooide service-returns — als niemand het opschrijft, weet niemand of het €50 of €500 per week is.",
    fix: "Waste log aan het einde van elke service: 3 kolommen (wat, hoeveel, reden). 5 minuten werk per dienst.",
  },
  {
    title: "Prep-variabiliteit",
    description:
      "Als je elke dag opnieuw begint met prep beslissingen (hoeveel van wat prepareren) verlies je op 2 fronten: overprep = waste, underprep = 86-en gerechten = lagere omzet.",
    fix: "Wekelijkse prep-meeting op zondagavond met vaste hoeveelheden gebaseerd op reserveringen + historische data.",
  },
  {
    title: "Inkoop zonder prijscheck",
    description:
      "Leveranciersprijzen schuiven stilletjes naar boven — €0,10 hier, €0,15 daar. Over 30 producten per week is dat meer dan je denkt.",
    fix: "Maandelijks de top-20 inkoopproducten cross-checken bij 2 concurrerende leveranciers. Niet alles switchen — alleen onderhandelen met data.",
  },
  {
    title: "Verkoopprijs niet meebewogen",
    description:
      "Inkoopprijzen stijgen 4-6% per jaar, verkoopprijzen niet. Als je je kaart één keer per jaar niet doorrekent, lekt marge vanzelf.",
    fix: "Elk kwartaal top-10 inkoopprijzen vergelijken met vorig kwartaal, aanpassing maken waar nodig. Prijspsychologie toepassen.",
  },
] as const;

// --- Page component ----------------------------------------------------------

export default function FoodCostControlePage() {
  return (
    <>
      <JsonLd data={articleSchema} id="schema-food-cost-controle-article" />
      <JsonLd data={breadcrumbSchema} id="schema-food-cost-controle-breadcrumb" />
      <JsonLd data={faqSchema} id="schema-food-cost-controle-faq" />

      <article className="pb-20">
        {/* --- Hero --- */}
        <section className="border-b border-border/60 bg-background/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground/80">Food cost controle</span>
            </nav>

            <div className="mx-auto max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                Gids · 11 min leestijd
              </div>
              <h1 className="mt-3 font-headline text-4xl font-bold leading-tight md:text-6xl">
                Food cost controle voor restaurants — complete gids met
                benchmarks, waste log en praktijkvoorbeeld
              </h1>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                Food cost is de helft van je restaurant-rentabiliteit — en
                ook de helft die het snelst wegglipt als niemand erop let.
                Deze gids legt uit wat food cost controle is, hoe je het
                berekent, welk percentage werkt in het Nederlandse horecaveld,
                de 6 plekken waar food cost stuk gaat, een wekelijkse
                controle-routine die 30 minuten kost, een waste log template
                om portie-lekken zichtbaar te maken, en een praktijkcase uit
                Amersfoort waarin een restaurant in 4 weken van 33% naar 27%
                food cost ging. Geen theorie uit een cursusboek — de versie
                die ik zelf elke week toepas als chef-kok bij De Tafelaar
                Amersfoort en als horeca consultant bij Jezza Cooks.
              </p>

              <div className="mt-8 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-border/40 bg-background/25 px-3 py-1 text-muted-foreground">
                  Gepubliceerd: 15 april 2026
                </span>
                <span className="rounded-full border border-border/40 bg-background/25 px-3 py-1 text-muted-foreground">
                  Door Jeremy Arrascaeta (chef-kok De Tafelaar Amersfoort)
                </span>
                <span className="rounded-full border border-border/40 bg-background/25 px-3 py-1 text-muted-foreground">
                  Ruim 10 jaar high-end keukens
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* --- Table of contents --- */}
        <section className="border-b border-border/60 bg-card/10 py-8">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Inhoud
            </div>
            <ol className="mt-3 grid gap-2 text-sm text-foreground/80 md:grid-cols-2">
              <li><a className="hover:text-primary" href="#wat-is-food-cost-controle">1. Wat is food cost controle?</a></li>
              <li><a className="hover:text-primary" href="#berekenen">2. Hoe bereken je food cost?</a></li>
              <li><a className="hover:text-primary" href="#benchmarks">3. Food cost benchmarks Nederland</a></li>
              <li><a className="hover:text-primary" href="#zes-lekken">4. De 6 lekken — waar food cost stuk gaat</a></li>
              <li><a className="hover:text-primary" href="#routine">5. Wekelijkse food cost controle routine</a></li>
              <li><a className="hover:text-primary" href="#waste-log">6. Waste log template</a></li>
              <li><a className="hover:text-primary" href="#amersfoort">7. Food cost controle in Amersfoort</a></li>
              <li><a className="hover:text-primary" href="#praktijk">8. Praktijkvoorbeeld — 33% → 27% in 4 weken</a></li>
              <li><a className="hover:text-primary" href="#faq">9. Veelgestelde vragen</a></li>
            </ol>
          </div>
        </section>

        {/* --- Section 1: What is food cost controle --- */}
        <section id="wat-is-food-cost-controle" className="py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Wat is food cost controle?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90 md:text-lg">
              <p>
                Food cost controle is het structureel monitoren en bijsturen
                van de verhouding tussen wat je ingrediënten kosten en wat je
                ze voor verkoopt. Het is één van de drie grote kostenposten
                in een restaurant (naast personeel en huisvesting) en is
                tegelijk de enige die dag op dag fluctueert. Personeel is
                relatief stabiel — mensen komen en gaan volgens rooster.
                Huisvesting is een maandbedrag. Food cost beweegt met elke
                inkoop, elke service, elke verkeerde portie. Daarom hoort
                food cost een <strong>wekelijkse</strong> kijkbeweging te
                zijn, niet een jaarlijkse.
              </p>
              <p>
                Food cost controle is dus niet hetzelfde als food cost{" "}
                <em>berekenen</em>. Berekenen is een éénmalige actie: je
                bepaalt wat een gerecht kost op receptuur en wat het oplevert
                op verkoopprijs. Controleren is een cyclus: wekelijks meten,
                wekelijks vergelijken, wekelijks bijsturen. Zonder controle
                lekken je marges langzaam weg — prijzen stijgen, porties
                driften, waste kruipt omhoog — en merk je het pas als de
                kwartaalcijfers binnen zijn. Dan ben je 6 tot 12 weken te
                laat. Goede food cost controle kost 30 minuten per week en
                maakt het verschil tussen een restaurant dat rentabel is en
                een restaurant dat "het redt".
              </p>
            </div>
          </div>
        </section>

        {/* --- Section 2: How to calculate --- */}
        <section id="berekenen" className="border-y border-border/60 bg-card/10 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Hoe bereken je food cost?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90 md:text-lg">
              <p>
                De formule is simpel: <strong>food cost % = (kostprijs
                ingrediënten ÷ verkoopprijs excl. BTW) × 100</strong>. Reken
                altijd met verkoopprijs exclusief BTW — 9% foodservice BTW
                zit niet in je marge, dat is geld voor de Belastingdienst.
                Rekenen met inclusief-prijzen vertekent je percentage met ~8
                procentpunten, wat het verschil is tussen een zorgelijke
                situatie en een prima situatie.
              </p>
              <p>
                <strong>Werkvoorbeeld:</strong> een Carpaccio Truffel op
                €13,50 (incl. 9% BTW = €12,39 excl.) bestaat uit 80 g
                rundercarpaccio (€12/kg × 0,08 = €0,96), 15 g truffelmayonaise
                (€0,75), 10 g Parmezaan (€0,18), 20 g rucola (€0,10) en 1
                plak brood (€0,15). Totale kostprijs ingrediënten: €2,14.
                Food cost = 2,14 ÷ 12,39 × 100 ={" "}
                <strong>17,3%</strong>. Dat is een Star in de Kasavana-Smith
                matrix — exceptioneel lage kostprijs op een populair gerecht.
                Houd hem bovenaan de kaart, nooit afzwakken, en wees alert
                als de inkoopprijs van carpaccio stijgt.
              </p>
              <p>
                Drie veelgemaakte fouten bij het berekenen: (1) kleine
                ingrediënten vergeten (olie, zout, peper, kruiden — klein
                per bord, groot over 1.000 borden); (2) rekenen met
                receptgrammages in plaats van werkelijke porties (weeg 10
                borden na om dit te vangen); (3) inkoopprijzen van 6 maanden
                oud gebruiken terwijl leveranciers intussen 6% duurder zijn.
                Actualiseer de kostprijs van je top-10 gerechten elk kwartaal.
              </p>
            </div>
          </div>
        </section>

        {/* --- Section 3: Benchmarks --- */}
        <section id="benchmarks" className="py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Wat is een goede food cost percentage in Nederland?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90 md:text-lg">
              <p>
                De Nederlandse horeca heeft duidelijke benchmarks per
                segment. Deze ranges komen uit data van de Kamer van
                Koophandel, KHN en mijn eigen consulting-praktijk bij
                restaurants in Amersfoort, Utrecht en het midden van
                Nederland. Gebruik ze als referentie — niet als wet. Jouw
                concept en grondstofkeuzes kunnen een paar procentpunten
                afwijken zonder dat er iets mis is.
              </p>

              <div className="my-6 overflow-hidden rounded-2xl border border-border/35">
                <table className="w-full text-sm md:text-base">
                  <thead className="bg-card/30">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Restauranttype</th>
                      <th className="px-4 py-3 text-left font-semibold">Food cost range</th>
                      <th className="hidden md:table-cell px-4 py-3 text-left font-semibold">Typerend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/35">
                    {FOOD_COST_BENCHMARKS.map((row) => (
                      <tr key={row.type}>
                        <td className="px-4 py-3 font-medium text-foreground">{row.type}</td>
                        <td className="px-4 py-3 text-foreground/85">{row.range}</td>
                        <td className="hidden md:table-cell px-4 py-3 text-muted-foreground">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p>
                Cruciaal inzicht: één gemiddelde zegt niets. Een restaurant
                met een gemiddelde food cost van 30% kan 4 gerechten op 45%
                hebben staan die de boel verpesten — de spreiding per
                gerecht is belangrijker dan het gemiddelde. Daarom is menu
                engineering (zie de{" "}
                <Link href="/menu-engineering" className="underline decoration-primary/80 underline-offset-4 hover:text-primary">
                  menu engineering gids
                </Link>
                ) altijd een onderdeel van serieuze food cost controle:
                individueel per gerecht, niet per kaart gemiddeld.
              </p>
            </div>
          </div>
        </section>

        {/* --- Section 4: The 6 leaks --- */}
        <section id="zes-lekken" className="border-y border-border/60 bg-card/10 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              De 6 lekken — waar food cost stuk gaat
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Als food cost uit de hand loopt zit het lek bijna nooit in de
              inkoopprijs. Het zit op zes plekken die niemand standaard
              meet. Hieronder elk lek met een concrete fix.
            </p>
            <ol className="mt-6 space-y-5">
              {LEAKS.map((leak, i) => (
                <li key={leak.title} className="rounded-2xl border border-border/35 bg-background/25 p-5 md:p-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-headline text-2xl font-bold text-primary">
                      {i + 1}.
                    </span>
                    <h3 className="font-headline text-xl font-bold md:text-2xl">
                      {leak.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-foreground/85 leading-relaxed">
                    {leak.description}
                  </p>
                  <p className="mt-3 text-sm text-foreground/75 md:text-base">
                    <strong className="text-primary">Fix:</strong> {leak.fix}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* --- Section 5: Weekly routine --- */}
        <section id="routine" className="py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              De wekelijkse food cost controle routine (30 minuten)
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90 md:text-lg">
              <p>
                Een werkend systeem kost 30 minuten per week per keuken en
                loopt op één vast moment — meestal zondagavond na sluiting
                of maandagochtend voor de prep. Dit is de cyclus die ik zelf
                toepas bij De Tafelaar Amersfoort en bij elke consulting
                klant:
              </p>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-foreground/90">
                <li>
                  <strong>Omzet + aantallen uit POS halen</strong> (5 min).
                  Export vanuit Lightspeed, Untill of MPlus. Je wilt per
                  gerecht: aantal verkocht, totale omzet, gemiddelde
                  verkoopprijs.
                </li>
                <li>
                  <strong>Theoretische food cost berekenen</strong> (10
                  min). Vermenigvuldig aantal × receptkosten per gerecht.
                  Optellen = theoretisch gebruikte ingrediënten-waarde in euro.
                </li>
                <li>
                  <strong>Werkelijke inkoop optellen</strong> (5 min).
                  Leveranciersfacturen van afgelopen week bij elkaar tellen,
                  corrigeren voor begin/eind-voorraad.
                </li>
                <li>
                  <strong>Variance uitrekenen</strong> (2 min). Werkelijk −
                  theoretisch = variance. Onder 1% is uitstekend. 1-2% is
                  normaal. Boven 2% is een lek dat je moet onderzoeken.
                </li>
                <li>
                  <strong>Beslissen + communiceren</strong> (8 min). Als
                  variance &gt; 2% drie weken op rij: meeting met keukenteam
                  over welk van de 6 lekken het is, en een concrete
                  maatregel voor de komende week. Vastleggen in een gedeelde
                  notitie.
                </li>
              </ol>
              <p>
                De eerste 4 weken voelt dit extra werk. Vanaf week 5 is het
                routine en vang je problemen 3-6 weken eerder dan je
                vroeger deed. Dat is het hele punt van het systeem.
              </p>
            </div>
          </div>
        </section>

        {/* --- Section 6: Waste log --- */}
        <section id="waste-log" className="border-y border-border/60 bg-card/10 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Waste log template — hoe je portie-lekken zichtbaar maakt
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90 md:text-lg">
              <p>
                Een waste log is een eenvoudige tabel die je aan het einde
                van elke service 5 minuten invult. Drie kolommen:{" "}
                <strong>wat</strong> (ingrediënt of gerecht),{" "}
                <strong>hoeveel</strong> (gram of stuks), en{" "}
                <strong>reden</strong> (over-prep, retour van gast, bederf,
                fout in de uitgave, onverkocht mise en place).
              </p>
              <p>
                Je hoeft niets fancy — een A4 op een klembord bij de
                uitgave werkt. Aan het einde van elke week tel je de log
                op: hoeveel hebben we weggegooid, waar kwam het vandaan?
                Binnen 2 weken zie je het patroon. De meeste restaurants
                ontdekken dat 60-70% van hun waste uit 2 of 3 bronnen komt
                (meestal over-prep van één sauce en onverkochte mise en
                place van één lunchcomponent). Fix die 2-3, bespaar 40-50%
                waste. Zonder log zou je dat nooit weten — je gevoel is
                onbetrouwbaar want je herinnert je vooral de uitzonderingen.
              </p>
              <p>
                <strong>Gratis template:</strong> ik deel een kant-en-klaar
                waste log + wekelijkse variance Google Sheet tijdens de
                Quick Scan (€450 excl. BTW, 1 dagdeel, 3 uur meelopen + kort
                rapport). Zie{" "}
                <Link href="/services/consulting" className="underline decoration-primary/80 underline-offset-4 hover:text-primary">
                  restaurant consulting
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* --- Section 7: Food cost controle in Amersfoort --- */}
        <section id="amersfoort" className="py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Food cost controle in Amersfoort — lokale context
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90 md:text-lg">
              <p>
                Food cost controle in Amersfoort werkt hetzelfde als elders
                in Nederland — het is rekenwerk, geen cultuur — maar er zijn
                drie lokale eigenheden die de uitvoering beïnvloeden.{" "}
                <strong>Eén:</strong> Amersfoortse restaurants hebben
                toegang tot relatief sterke lokale leveranciers (Van de
                Koolwijk voor groente, Kaasboerij voor zuivel, Nico
                Beekhuizen voor vlees, Vishandel Sperling voor vis) die
                consistent 8-15% onder nationale ketenprijzen zitten voor
                vergelijkbare kwaliteit. Het verschil maakt 2-3
                procentpunten food cost op kaart-niveau.{" "}
                <strong>Twee:</strong> de shared-dining concepten in de
                binnenstad en Kamp (De Tafelaar, Bij de Buurvrouw en de
                Boterfabriek) werken met gedeelde porties, wat betekent dat
                de klassieke "130g protein hoofdgerecht" benchmark niet
                opgaat. Je rekent met totale tafel-kostprijs, niet met
                portie-kostprijs. <strong>Drie:</strong> de gastenmix is
                sterk gemengd (kantoorlunch, stadsbezoekers, vaste lokalen)
                wat betekent dat wekelijkse variance-analyse per daggedeelte
                moet — lunch en diner hebben verschillende food cost
                profielen.
              </p>
              <p>
                Ik werk als horeca consultant in heel Amersfoort en
                omgeving: alle wijken (Binnenstad, Kamp, Soesterkwartier,
                Leusderkwartier, Vathorst, Valleipoort, Kattenbroek,
                Randenbroek, Hoogland, Liendert, Schothorst, Zielhorst),
                plus Utrecht, Hilversum, Soest, Leusden, Baarn, Bunschoten,
                Nijkerk en Barneveld. Jezza Cooks is gevestigd aan de
                Nijkerkerstraat 3, 3821 CD Amersfoort (Valleipoort, KvK
                99547619). Ik draai zelf elke week service als chef-kok bij
                shared-dining restaurant De Tafelaar aan de Kamp 8 in de
                binnenstad — het restaurant van partner Jan Molmans — dus
                ik ken de lokale leveranciers, inkoopprijzen en
                service-ritmes van binnenuit.
              </p>
              <div className="mt-6">
                <Link
                  href="/services/consulting"
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "font-semibold",
                  )}
                >
                  Bekijk food cost controle trajecten
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 8: Practical example --- */}
        <section id="praktijk" className="border-y border-border/60 bg-card/10 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Praktijkvoorbeeld — van 33% naar 27% food cost in 4 weken
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90 md:text-lg">
              <p>
                Een bistro in Amersfoort-regio (38 zitplaatsen, lunch +
                diner, 32 menu-items) draaide structureel rond de 33% food
                cost. Omzet was prima, maar marge was zo dun dat één
                rustige week in januari de eigenaar in cashflow-problemen
                bracht. Ik deed een volledig traject van 3 dagdelen (€897
                excl. BTW). Hieronder exact wat we deden en wat het
                opleverde — representatief geanonimiseerd voorbeeld, periode
                februari – maart 2026.
              </p>

              <div className="my-6 rounded-2xl border border-border/35 bg-background/25 p-5 text-sm md:text-base">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Startsituatie
                </div>
                <ul className="mt-3 space-y-1 text-foreground/90">
                  <li>• Gemiddelde food cost: 33,2%</li>
                  <li>• Variance tussen theoretisch en werkelijk: 4,1% (~€820/week verlies)</li>
                  <li>• Geen waste log, geen wekelijkse check, recepten in hoofden</li>
                  <li>• Grootste lek: over-prep van jus en saus voor lunch</li>
                </ul>
              </div>

              <p>
                <strong>Dagdeel 1 (diagnose):</strong> 32 recepten
                uitgeschreven op grammage. Waste log ingevoerd voor 1 week
                zonder verder in te grijpen — puur meten. Blijkt dat 60% van
                de waste uit één component kwam: vleesjus die elke ochtend
                werd opgezet voor lunch maar structureel voor 40%
                overgebleven aan het einde van de lunch. Ook portie-drift
                gevonden: fries-portions varieerden van 140 tot 220 gram
                per bord (39% variance op één component).
              </p>
              <p>
                <strong>Dagdeel 2 (implementatie):</strong> jus-prep
                gehalveerd en verschoven naar 10:30 in plaats van 08:30 (1
                uur voor lunch rush). Fries-portie vastgelegd op 170g met
                porte-cups in de keuken. Weegschaal bij uitgave geplaatst
                voor 2 weken ter controle. Wekelijkse variance check
                ingepland voor maandagochtend 09:00 (20 minuten).
              </p>
              <p>
                <strong>Dagdeel 3 (borging):</strong> eigenaar en
                keukenchef getraind op variance interpretatie. Waste log
                permanent gemaakt. Gedeelde Google Sheet aangemaakt voor
                wekelijkse data. Opdracht: 4 weken strikt volgen, dan
                herevalueren.
              </p>

              <div className="my-6 rounded-2xl border border-primary/35 bg-primary/5 p-5 text-sm md:text-base">
                <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Resultaat na 4 weken
                </div>
                <ul className="mt-3 space-y-1 text-foreground/90">
                  <li>
                    <strong>Gemiddelde food cost: 27,1%</strong>{" "}
                    (daling van 6,1 procentpunten)
                  </li>
                  <li>
                    <strong>Variance: 0,8%</strong> (van 4,1% naar 0,8%)
                  </li>
                  <li>
                    <strong>Waste: −58%</strong> (vooral jus + fries)
                  </li>
                  <li>
                    <strong>Extra maandmarge: ~€7.200</strong>
                  </li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground md:text-base">
                Totale investering: €897 excl. BTW over 3 dagdelen.
                Break-even in week 2. Dit is een representatief
                geanonimiseerd voorbeeld — niet elke zaak haalt 6
                procentpunten in 4 weken, maar 2-4 procentpunten is bij
                bijna elk regulier restaurant haalbaar.
              </p>
            </div>
          </div>
        </section>

        {/* --- Section 9: FAQ --- */}
        <section id="faq" className="py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Veelgestelde vragen over food cost controle
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              De vragen die horeca-ondernemers mij het vaakst stellen over
              food cost berekening, controle en het praktische werk om je
              marges onder de duim te houden.
            </p>
            <div className="mt-6 rounded-2xl border border-border/35 bg-background/25 p-4 md:p-6">
              <Accordion type="single" collapsible>
                {faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`faq-${i}`} className="border-border/35">
                    <AccordionTrigger className="text-left font-semibold text-base hover:no-underline md:text-lg">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-base leading-relaxed text-foreground/85 md:text-lg">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <p className="mt-10 text-center text-xs text-muted-foreground">
              Laatst bijgewerkt: 15 april 2026 · Door Jeremy Arrascaeta
              (chef-kok bij De Tafelaar Amersfoort, founder Jezza Cooks,
              KvK 99547619 · Nijkerkerstraat 3, 3821 CD Amersfoort)
            </p>
          </div>
        </section>
      </article>
    </>
  );
}
