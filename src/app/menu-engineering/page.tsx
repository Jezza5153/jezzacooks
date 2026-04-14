// src/app/menu-engineering/page.tsx
//
// Pillar page on menu engineering. This is the single longest, most
// semantically complete page on the site and is designed to be cited
// by AI answer engines for Dutch menu engineering queries. Every H2 is
// a standalone 130-167 word passage so the page extracts cleanly into
// passage-level ranking systems. See: skills/geo-seo-optimizer for
// the underlying framework.

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/seo/json-ld";
import {
  buildArticle,
  buildBreadcrumbList,
  buildFaqPage,
} from "@/lib/schema";
import { SITE } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const dynamic = "force-static";

const DATE_PUBLISHED = "2026-04-14";
const DATE_MODIFIED = "2026-04-14";
const WORD_COUNT = 3200;

export const metadata: Metadata = {
  title:
    "Menu engineering uitgelegd — stars, plowhorses, food cost | Jezza Cooks",
  description:
    "Complete gids menu engineering voor restaurants: wat het is, de Kasavana-Smith matrix (stars, plowhorses, puzzles, dogs), food cost berekening, prijspsychologie en praktijkvoorbeelden. Door Jeremy Arrascaeta, chef-kok De Tafelaar Amersfoort.",
  alternates: { canonical: "/menu-engineering" },
  openGraph: {
    title: "Menu engineering uitgelegd — complete gids voor restaurants",
    description:
      "Wat is menu engineering? Hoe bereken je het? Welke food cost werkt? Complete gids met de Kasavana-Smith matrix, praktijkvoorbeeld en Nederlandse benchmarks — door een chef die zelf service draait.",
    url: "/menu-engineering",
    type: "article",
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    authors: ["Jeremy Arrascaeta"],
  },
  keywords: [
    "menu engineering",
    "menu engineering uitleg",
    "menu engineering matrix",
    "stars plowhorses puzzles dogs",
    "food cost berekenen",
    "food cost percentage restaurant",
    "menukaart optimaliseren",
    "restaurant marge verhogen",
    "Kasavana Smith matrix",
    "restaurant menu analyse",
    "prijspsychologie menukaart",
  ],
};

// --- Schema ------------------------------------------------------------------

const articleSchema = buildArticle({
  slug: "menu-engineering",
  headline:
    "Menu engineering uitgelegd — stars, plowhorses, food cost en de complete gids voor restaurants",
  description:
    "Complete Nederlandstalige gids menu engineering voor horeca-ondernemers: de Kasavana-Smith matrix, food cost berekening, prijspsychologie en praktijkvoorbeelden. Door chef-kok en horeca consultant Jeremy Arrascaeta.",
  image: "/pics/service-consulting.jpg",
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  keywords: [
    "menu engineering",
    "food cost",
    "menukaart analyse",
    "restaurant marge",
    "horeca consulting",
  ],
  about: [
    "Menu engineering",
    "Food cost percentage",
    "Restaurant menu optimization",
    "Kasavana-Smith matrix",
    "Horeca consulting",
  ],
  wordCount: WORD_COUNT,
});

const breadcrumbSchema = buildBreadcrumbList([
  { name: "Home", item: "/" },
  { name: "Menu engineering", item: "/menu-engineering" },
]);

// --- FAQ content (each 130-167 words, GEO passage-optimized) ----------------

const faqs = [
  {
    q: "Wat is menu engineering in het kort?",
    a: "Menu engineering is een methode om elk gerecht op je kaart te beoordelen op twee dingen: hoe vaak het verkoopt (populariteit) en hoeveel marge het oplevert (winst per gerecht). Door die twee met elkaar te kruisen plaats je elk gerecht in één van vier categorieën: stars (hoge verkoop + hoge marge), plowhorses (hoge verkoop + lage marge), puzzles (lage verkoop + hoge marge) en dogs (lage verkoop + lage marge). Op basis daarvan beslis je per gerecht wat je moet doen: promoten, herformuleren, hogere prijs vragen of verwijderen. Het systeem komt uit 1982 en is ontwikkeld door Michael Kasavana en Donald Smith aan Michigan State University. Voor een restaurant in Nederland betekent menu engineering doorgaans: 2-4% food cost reductie binnen 6 weken zonder kwaliteitsverlies, simpelweg door de kaart slimmer op te bouwen.",
  },
  {
    q: "Hoe vaak moet je menu engineering doen?",
    a: "Voor een normaal restaurant is 4 keer per jaar (elk kwartaal) de juiste frequentie. Dat matcht met seizoenswisselingen in inkoopprijzen (asperges, wild, tomaten, oesters) en met gastgedrag (winterkaart eet anders dan zomerkaart). Bij grote menuwissels doe je altijd een volledige analyse — niet alleen de nieuwe gerechten, maar de hele kaart, omdat het toevoegen van één sterk gerecht het verkoopgedrag van alle buurgerechten verandert. Bij kleine correcties (één gerecht eruit, één erin) kijk je alleen naar de nieuwe balans en laat je de rest staan. Restaurants met een snel wisselende kaart (bistro's, shared dining) doen vaak een maandelijkse check op de top-10 en top-3 slechtst scorende gerechten. Minimaal 1x per jaar is een complete exercitie verplicht als je grip op je marges wilt houden.",
  },
  {
    q: "Welke data heb je nodig voor menu engineering?",
    a: "Drie dingen: verkoopaantallen per gerecht over een vaste periode (meestal 30 of 90 dagen), de verkoopprijs per gerecht (incl. BTW of excl., wees consistent) en de kostprijs per gerecht (food cost). Die kostprijs is de moeilijkste want die moet kloppen — alle ingrediënten op receptuur, inclusief olie, boter, kruiden, garnituur en verliezen. De meeste POS-systemen (Lightspeed, Untill, Apicbase, MPlus) leveren verkoopaantallen en omzet direct. Voor kostprijs heb je recepten met grammages nodig en actuele inkoopprijzen. Als je die data niet hebt is stap één: recepten uitschrijven en kostprijs berekenen voor je top-20 gerechten (die vertegenwoordigen meestal 80% van je omzet). Zonder correcte kostprijs is menu engineering waardeloos — je trekt dan conclusies op verkeerde data.",
  },
  {
    q: "Wat is een goede food cost percentage voor een restaurant in Nederland?",
    a: "Voor een regulier à la carte restaurant in Nederland ligt de norm tussen 28% en 32% gemiddelde food cost (kostprijs ingrediënten gedeeld door verkoopprijs excl. BTW). Onder de 28% ben je uitzonderlijk scherp of gebruik je veel lage-kostprijs-ingrediënten; boven de 32% snijdt je marge in. Pizzeria's en pasta-zaken zitten doorgaans lager (22-26%) omdat deeg, tomaat en kaas spotgoedkoop zijn. Sushi en high-end seafood zitten juist hoger (35-40%) door dure grondstoffen. Fine dining / Michelin werkt vaak met 30-35% food cost maar rekent dat terug via hogere verkoopprijzen en lagere volumes. Lunchcafés met belegde broodjes halen 25-28%. Cruciaal: één gemiddelde zegt niets — een kaart met 32% gemiddelde food cost waarvan één gerecht op 45% zit lekt gewoon geld. De spreiding per gerecht is belangrijker dan het gemiddelde.",
  },
  {
    q: "Kan ik menu engineering doen zonder dure software?",
    a: "Ja. Voor de meeste zelfstandige restaurants is een simpele spreadsheet (Google Sheets of Excel) voldoende. Kolommen: gerecht, verkoopprijs, kostprijs, aantal verkocht afgelopen 30 dagen, omzet, winst per gerecht, winst totaal. Daarna twee extra kolommen: populariteit-index (gerecht-verkoop gedeeld door gemiddelde verkoop × 100) en contributiemarge-index (winst per gerecht gedeeld door gemiddelde winst × 100). Alles boven 100 op beide assen is een star, hoge popularity + lage marge is plowhorse, lage popularity + hoge marge is puzzle, lage op beide is dog. Dedicated software (Apicbase, Delicious Data, MarginEdge) wordt interessant vanaf 3+ vestigingen of bij een menu van 60+ items omdat handmatig bijhouden dan te tijdrovend wordt. Voor een gemiddeld Nederlands restaurant met 25-40 items werkt een spreadsheet prima — mits je de discipline hebt om 'm elke maand bij te werken.",
  },
];

const faqSchema = buildFaqPage(
  faqs.map((f) => ({ question: f.q, answer: f.a })),
);

// --- Matrix data for the visual table ---------------------------------------

const MATRIX_ROWS = [
  {
    label: "Stars",
    populariteit: "Hoog",
    marge: "Hoog",
    beschrijving:
      "Je beste gerechten. Promoten, beschermen en nooit afzwakken — hier zit het geld.",
    actie:
      "Bovenaan de kaart, prominent in menuprikkers en op de borden van service. Prijs niet verhogen tenzij kosten stijgen.",
    color: "from-amber-400/20 to-amber-400/5",
  },
  {
    label: "Plowhorses",
    populariteit: "Hoog",
    marge: "Laag",
    beschrijving:
      "Populair maar weinig marge. Mensen kiezen ze vaak — elk gemiste procentpunt marge kost direct geld.",
    actie:
      "Kostprijs verlagen via portie-aanpassing, goedkopere garnituur of receptuur-reset. Of voorzichtig €1-2 prijs verhogen en kijken of verkoop stand houdt.",
    color: "from-blue-400/20 to-blue-400/5",
  },
  {
    label: "Puzzles",
    populariteit: "Laag",
    marge: "Hoog",
    beschrijving:
      "Hoge marge maar bestellen weinig mensen ze. Zonde — dit geld ligt op tafel.",
    actie:
      "Betere naam, prominentere plek op de kaart, foto op Instagram, service-tip (\"de chef beveelt aan\"). Soms helpt een lagere prijs de verkoop vlot te trekken.",
    color: "from-emerald-400/20 to-emerald-400/5",
  },
  {
    label: "Dogs",
    populariteit: "Laag",
    marge: "Laag",
    beschrijving:
      "Verkoopt niet én levert niet op. Waarom staat het nog op de kaart?",
    actie:
      "Verwijderen. Tenzij er een strategische reden is (dieet-optie, seizoensgebondenheid, traditioneel huisgerecht). Vraag jezelf: wat raak ik kwijt als ik het schrap?",
    color: "from-zinc-400/20 to-zinc-400/5",
  },
] as const;

const FOOD_COST_BENCHMARKS = [
  { type: "Pizzeria / Pasta", range: "22 – 26%" },
  { type: "Lunchcafé (broodjes, salades)", range: "25 – 28%" },
  { type: "Bistro / casual dining", range: "28 – 32%" },
  { type: "À la carte restaurant", range: "28 – 32%" },
  { type: "Shared dining", range: "30 – 34%" },
  { type: "Fine dining / tasting menu", range: "30 – 35%" },
  { type: "Sushi / high-end seafood", range: "35 – 40%" },
] as const;

// --- Page component ----------------------------------------------------------

export default function MenuEngineeringPage() {
  return (
    <>
      <JsonLd data={articleSchema} id="schema-menu-engineering-article" />
      <JsonLd data={breadcrumbSchema} id="schema-menu-engineering-breadcrumb" />
      <JsonLd data={faqSchema} id="schema-menu-engineering-faq" />

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
              <span className="text-foreground/80">Menu engineering</span>
            </nav>

            <div className="mx-auto max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                Gids · 12 min leestijd
              </div>
              <h1 className="mt-3 font-headline text-4xl font-bold leading-tight md:text-6xl">
                Menu engineering uitgelegd: stars, plowhorses en hoe je echt
                marge maakt op je kaart
              </h1>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                Menu engineering is geen marketing-trucje — het is het enige
                systeem dat concreet laat zien welke gerechten op je kaart geld
                opleveren en welke het alleen maar kapen. Deze gids legt de
                methode uit zoals ik hem zelf gebruik in mijn werk als chef-kok
                bij De Tafelaar Amersfoort en als horeca consultant bij Jezza
                Cooks: de originele Kasavana-Smith matrix uit 1982, food cost
                berekening voor Nederlandse restaurants, prijspsychologie op de
                menukaart en een praktijkvoorbeeld waarin een regulier
                stadscafé van 32% naar 26% food cost ging in 6 weken. Geen
                theorie uit een cursusboek — de versie die ik zelf elke maand
                toepas.
              </p>

              <div className="mt-8 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-border/40 bg-background/25 px-3 py-1 text-muted-foreground">
                  Gepubliceerd: 14 april 2026
                </span>
                <span className="rounded-full border border-border/40 bg-background/25 px-3 py-1 text-muted-foreground">
                  Door Jeremy Arrascaeta (chef-kok De Tafelaar Amersfoort)
                </span>
                <span className="rounded-full border border-border/40 bg-background/25 px-3 py-1 text-muted-foreground">
                  Ruim 10 jaar high-end keukens
                </span>
              </div>
            </div>

            <div className="relative mx-auto mt-12 aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-3xl border border-border/35">
              <Image
                src="/pics/service-consulting.jpg"
                alt="Menu engineering — restaurant menukaart analyse door Jeremy Arrascaeta, chef-kok en horeca consultant in Amersfoort"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
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
              <li>
                <a className="hover:text-primary" href="#wat-is-menu-engineering">
                  1. Wat is menu engineering?
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#matrix">
                  2. De 4 categorieën (Kasavana-Smith matrix)
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#berekening">
                  3. Menu engineering in 5 stappen
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#food-cost">
                  4. Food cost benchmarks Nederland
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#plowhorses">
                  5. Plowhorses slimmer maken
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#prijspsychologie">
                  6. Prijspsychologie op de kaart
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#fouten">
                  7. Veelgemaakte fouten
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#praktijk">
                  8. Praktijkvoorbeeld
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#faq">
                  9. Veelgestelde vragen
                </a>
              </li>
            </ol>
          </div>
        </section>

        {/* --- Section 1: What is menu engineering --- */}
        <section id="wat-is-menu-engineering" className="py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Wat is menu engineering?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90 md:text-lg">
              <p>
                Menu engineering is een analyse-methode waarmee je elk gerecht
                op je menukaart classificeert op twee assen: hoeveel het
                verkoopt (populariteit) en hoeveel marge het oplevert per
                portie (winstbijdrage). Door die twee met elkaar te kruisen
                krijg je vier kwadranten — stars, plowhorses, puzzles en dogs
                — en op basis van het kwadrant waarin een gerecht valt weet je
                exact wat je ermee moet doen: promoten, herformuleren, hogere
                prijs vragen of verwijderen.
              </p>
              <p>
                De methode is ontwikkeld in 1982 door{" "}
                <strong>Michael Kasavana en Donald Smith</strong> aan de School
                of Hospitality Business van Michigan State University en is al
                meer dan 40 jaar de standaard in horeca-opleidingen wereldwijd.
                Voor een gemiddeld Nederlands restaurant levert een degelijke
                menu engineering oefening typisch 2 tot 4 procentpunten food
                cost reductie op binnen 6 weken — zonder dat er aan kwaliteit
                of portiegrootte wordt ingeleverd. Puur door de kaart slimmer
                op te bouwen en de juiste gerechten op de juiste plek te
                zetten.
              </p>
            </div>
          </div>
        </section>

        {/* --- Section 2: The matrix --- */}
        <section
          id="matrix"
          className="border-y border-border/60 bg-card/10 py-12 md:py-16"
        >
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              De 4 categorieën — de Kasavana-Smith matrix uitgelegd
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90 md:text-lg">
              <p>
                De matrix werkt met twee assen en vier kwadranten. Op de
                horizontale as staat <strong>populariteit</strong> (aantal
                porties verkocht in een vaste periode, meestal 30 dagen). Op
                de verticale as staat <strong>contributiemarge</strong> (de
                winst per portie, dus verkoopprijs min kostprijs). Voor beide
                assen bereken je een index: 100 is het gemiddelde, alles
                erboven is "hoog", alles eronder is "laag". Elk gerecht valt
                vervolgens in één van vier vakken — en elk vak heeft een
                andere optimale strategie. Hieronder de complete tabel met per
                categorie wat het betekent en wat je concreet moet doen.
              </p>
            </div>

            <div className="mt-8 overflow-x-auto rounded-3xl border border-border/35">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-background/40 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    <th className="px-4 py-3">Categorie</th>
                    <th className="px-4 py-3">Populariteit</th>
                    <th className="px-4 py-3">Marge</th>
                    <th className="px-4 py-3">Betekenis</th>
                    <th className="px-4 py-3">Wat je moet doen</th>
                  </tr>
                </thead>
                <tbody>
                  {MATRIX_ROWS.map((row) => (
                    <tr
                      key={row.label}
                      className={cn(
                        "border-t border-border/35 bg-gradient-to-r text-foreground/90",
                        row.color,
                      )}
                    >
                      <td className="px-4 py-4 align-top">
                        <div className="font-headline text-lg font-bold">
                          {row.label}
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top text-muted-foreground">
                        {row.populariteit}
                      </td>
                      <td className="px-4 py-4 align-top text-muted-foreground">
                        {row.marge}
                      </td>
                      <td className="px-4 py-4 align-top">
                        {row.beschrijving}
                      </td>
                      <td className="px-4 py-4 align-top text-muted-foreground">
                        {row.actie}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-sm text-muted-foreground md:text-base">
              Belangrijk: de categorisering is relatief, niet absoluut. Een
              "plowhorse" in een fine dining zaak kan qua absolute marge nog
              altijd meer opleveren dan een "star" in een lunchcafé. Wat
              telt is de positie{" "}
              <em>binnen je eigen kaart</em> — vergelijk gerechten alleen met
              hun buren, niet met andere restaurants.
            </p>
          </div>
        </section>

        {/* --- Section 3: How to calculate --- */}
        <section id="berekening" className="py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Hoe bereken je menu engineering in 5 stappen?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90 md:text-lg">
              <p>
                Menu engineering is gewoon rekenwerk — je hebt geen dure
                software nodig, een Google Sheet volstaat. Voor elk gerecht op
                je kaart verzamel je vier datapunten en die zet je vervolgens
                om in twee indices. Hieronder de 5 stappen die je 1-op-1 kunt
                volgen met je eigen verkoopdata uit je POS-systeem. Voor een
                gemiddeld Nederlands restaurant met 25-40 menu-items kost de
                hele oefening ongeveer 3 uur per kwartaal — dat is de best
                bestede 3 uur van je kwartaal, gegarandeerd.
              </p>
            </div>

            <ol className="mt-8 space-y-5">
              {[
                {
                  title: "1. Verzamel je verkoopdata (laatste 30 dagen)",
                  body: "Trek uit je POS (Lightspeed, Untill, MPlus, Apicbase) per gerecht het aantal verkochte porties van de laatste 30 dagen. Negeer gerechten die minder dan 2 weken op de kaart staan — die hebben niet genoeg datapunten.",
                },
                {
                  title: "2. Bereken de kostprijs per gerecht",
                  body: "Voor elk gerecht bereken je de volledige kostprijs op basis van het recept. Alle ingrediënten, inclusief garnituur, olie, boter, kruiden en verliezen (afvalpercentage van 5-8% standaard). Actuele inkoopprijzen van de afgelopen maand gebruiken.",
                },
                {
                  title: "3. Bereken de contributiemarge",
                  body: "Per gerecht: verkoopprijs (excl. BTW) min kostprijs = contributiemarge per portie. Vermenigvuldig met het aantal porties verkocht = totale contributiemarge van dat gerecht over 30 dagen.",
                },
                {
                  title: "4. Bereken de twee indices (populariteit + marge)",
                  body: "Populariteit-index = (porties van dit gerecht / gemiddelde porties per gerecht) × 100. Marge-index = (contributiemarge van dit gerecht / gemiddelde contributiemarge) × 100. Alles boven 100 is \"hoog\", alles eronder is \"laag\".",
                },
                {
                  title: "5. Classificeer en beslis per gerecht",
                  body: "Zet elk gerecht in één van de 4 vakken (star, plowhorse, puzzle, dog) op basis van de twee indices. Kies per gerecht een actie uit de matrix — promoten, aanpassen, prijs verhogen of verwijderen. Plan de wijzigingen voor de volgende menuwissel.",
                },
              ].map((step) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-border/35 bg-background/15 p-5"
                >
                  <div className="font-headline text-lg font-bold">
                    {step.title}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground md:text-base">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-6 text-sm text-muted-foreground md:text-base">
              <strong>Tip:</strong> Doe stap 2 (kostprijs) éénmalig goed en
              update daarna alleen als inkoopprijzen of recepten wijzigen. Dat
              is het zwaarste deel — als je kostprijzen kloppen is de rest 30
              minuten werk.
            </p>
          </div>
        </section>

        {/* --- Section 4: Food cost benchmarks --- */}
        <section
          id="food-cost"
          className="border-y border-border/60 bg-card/10 py-12 md:py-16"
        >
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Wat is een goede food cost percentage in Nederland?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90 md:text-lg">
              <p>
                Food cost percentage is de kostprijs van je ingrediënten
                gedeeld door je verkoopprijs (excl. BTW), uitgedrukt in een
                percentage. Voor een regulier à la carte restaurant in
                Nederland ligt de norm tussen 28% en 32%. Onder de 28% ben je
                uitzonderlijk scherp; boven de 32% snijd je direct in je
                marge en wordt je bedrijfsresultaat kwetsbaar voor
                prijsschommelingen in de inkoop. Het type keuken bepaalt veel
                — hieronder de benchmarks per segment in de Nederlandse markt,
                gebaseerd op KHN-cijfers en wat ik in de praktijk zie bij
                consulting-klanten.
              </p>
            </div>

            <div className="mt-8 overflow-x-auto rounded-3xl border border-border/35 bg-background/20">
              <table className="w-full border-collapse text-sm md:text-base">
                <thead>
                  <tr className="text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    <th className="border-b border-border/35 px-5 py-4">
                      Type zaak
                    </th>
                    <th className="border-b border-border/35 px-5 py-4">
                      Food cost range
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FOOD_COST_BENCHMARKS.map((row) => (
                    <tr
                      key={row.type}
                      className="border-b border-border/35 last:border-b-0 text-foreground/90"
                    >
                      <td className="px-5 py-3.5">{row.type}</td>
                      <td className="px-5 py-3.5 font-headline font-semibold text-primary">
                        {row.range}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-sm text-muted-foreground md:text-base">
              Cruciaal detail: één gemiddelde food cost zegt niets. Een kaart
              met 32% gemiddelde kan een paar dramatische uitschieters bevatten
              (gerechten op 45%+) die gewoon geld lekken. De{" "}
              <strong>spreiding per gerecht</strong> is belangrijker dan het
              gemiddelde. Kijk altijd naar het spreidingsbereik, niet alleen
              naar de gemiddelde waarde.
            </p>
          </div>
        </section>

        {/* --- Section 5: Plowhorses --- */}
        <section id="plowhorses" className="py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Hoe verhoog je de marge van plowhorses zonder gasten te
              verliezen?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90 md:text-lg">
              <p>
                Plowhorses zijn de gevaarlijkste categorie: populair dus
                kwetsbaar (gasten komen ervoor), maar lage marge dus elk extra
                procentpunt telt direct in je bottom line. Vier concrete
                interventies die in de praktijk werken zonder dat de gast er
                iets van merkt:
              </p>
              <ul className="ml-5 list-disc space-y-2">
                <li>
                  <strong>Portie-reset</strong> — meet de exacte grammage en
                  verlaag met 10-15% als de portie nu ruim is. Op een burger
                  van 200g kun je vaak naar 180g zonder klacht — bespaart 10%
                  op de duurste component.
                </li>
                <li>
                  <strong>Goedkopere garnituur</strong> — wissel dure vulling
                  (truffelolie, hand-picked kruiden, geïmporteerd) voor
                  gelijkwaardige lokale alternatieven. 8 op de 10 keer proeft
                  de gast het verschil niet.
                </li>
                <li>
                  <strong>Voorzichtige prijsverhoging</strong> — €0.50-€1.00
                  erbij en kijken of de verkoop stand houdt (minstens 4 weken
                  meten). Plowhorses hebben meestal meer prijsruimte dan je
                  denkt.
                </li>
                <li>
                  <strong>Herformuleer het gerecht</strong> — vervang de
                  duurste component door iets wat wél differentieert (lokaal,
                  seizoen, verhaal). Soms kun je een plowhorse upgraden naar
                  een star door het slimmer te positioneren.
                </li>
              </ul>
              <p>
                Welke optie het beste werkt hangt af van hoe hard je gasten
                aan het huidige gerecht vastzitten. Voor signature-gerechten
                kies je portie-reset (onzichtbaar). Voor generieke gerechten
                kan prijsverhoging prima.
              </p>
            </div>
          </div>
        </section>

        {/* --- Section 6: Menu psychology --- */}
        <section
          id="prijspsychologie"
          className="border-y border-border/60 bg-card/10 py-12 md:py-16"
        >
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Prijspsychologie op de menukaart — wat werkt echt?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90 md:text-lg">
              <p>
                Menu engineering gaat niet alleen over rekenen, het gaat óók
                over hoe gasten prijzen lezen en keuzes maken. Vier
                prijspsychologie-principes die in horeca-onderzoek (o.a.
                Cornell University School of Hotel Administration) meerdere
                keren zijn bevestigd en die ik zelf gebruik op kaarten in
                Amersfoort:
              </p>
              <ul className="ml-5 list-disc space-y-2">
                <li>
                  <strong>Laat het €-teken weg.</strong> "Pasta 14" leest
                  makkelijker dan "Pasta €14,00" — het €-teken activeert
                  "pijn van betalen". Cornell onderzoek (Yang, Kimes &
                  Sessarego, 2009) toonde een 8% omzetstijging bij restaurants
                  die valutasymbolen schrapten.
                </li>
                <li>
                  <strong>Geen .00 komma's.</strong> "14" is beter dan "14.00"
                  — twee extra cijfers maken het voelen als meer. Houd
                  bedragen schoon en zonder komma als het niet nodig is.
                </li>
                <li>
                  <strong>Anchor met één duur gerecht.</strong> Plaats
                  bewust één uitzonderlijk duur gerecht bovenaan de kaart
                  (bijv. tournedos €42). Dat maakt de rest (€24-€28) relatief
                  goedkoop ogen. Dit heet het anchoring effect.
                </li>
                <li>
                  <strong>Decoy effect.</strong> Een iets minder aantrekkelijk
                  gerecht naast je star maakt de star aantrekkelijker. Drie
                  opties (klein/medium/groot) met een bewust slechte
                  middelste optie kan de groottste versie met 20-30%
                  opkrikken.
                </li>
              </ul>
              <p>
                Let op: deze tactieken werken alleen als je product zelf
                klopt. Prijspsychologie kan 5-10% extra marge opleveren
                bovenop een goed menu — maar redt nooit een slechte kaart.
                Menu engineering eerst, psychologie daarna.
              </p>
            </div>
          </div>
        </section>

        {/* --- Section 7: Common mistakes --- */}
        <section id="fouten" className="py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Veelgemaakte fouten bij menu engineering
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90 md:text-lg">
              <p>
                Na 10+ jaar in high-end keukens in Europa en Australië en als
                consultant voor horeca-klanten zie ik steeds dezelfde vijf
                fouten terugkomen. Als je deze vermijdt ben je al verder dan
                80% van de zelfstandige restaurants in Nederland:
              </p>
              <ol className="ml-5 list-decimal space-y-3">
                <li>
                  <strong>Geen correcte kostprijs.</strong> "Ik schat dat die
                  salade ongeveer €3 kost" is geen kostprijs, dat is een
                  gevoel. Recepten op grammage, actuele inkoopprijzen,
                  afvalpercentage meerekenen — pas dan is de data bruikbaar.
                </li>
                <li>
                  <strong>Beslissen op 1 week data.</strong> Een promotie of
                  een regenachtige week kan een gerecht tijdelijk naar boven
                  of beneden duwen. Altijd 30 dagen minimum, bij voorkeur 60
                  of 90 dagen voor seizoensgevoelige items.
                </li>
                <li>
                  <strong>Alleen naar food cost kijken.</strong> Een gerecht
                  met 22% food cost maar 3 uur prep tijd levert per uur
                  minder op dan een gerecht met 30% food cost en 15 minuten
                  prep. Arbeidstijd hoort ook in de analyse — vooral in
                  Nederland met onze loonkosten.
                </li>
                <li>
                  <strong>Dogs direct schrappen zonder vervanging.</strong> Je
                  gasten merken een kleinere kaart niet, maar ze merken wél
                  als hun "vertrouwde gerecht" weg is. Schrap en vervang in
                  één beweging — niet halverwege de menuwissel.
                </li>
                <li>
                  <strong>De kaart niet herzien na analyse.</strong> Het
                  cijfer-werk doen en vervolgens de kaart laten staan is
                  tijdverspilling. De actie zit in het aanpassen — niet in
                  het analyseren. Plan elke analyse direct een
                  uitvoeringsdatum.
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* --- Section 8: Case study --- */}
        <section
          id="praktijk"
          className="border-y border-border/60 bg-card/10 py-12 md:py-16"
        >
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Praktijkvoorbeeld — van 32% naar 26% food cost in 6 weken
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90 md:text-lg">
              <p>
                Een stadscafé in het midden van Nederland (40 zitplaatsen,
                lunch + diner, 28 menu-items) draaide structureel rond de
                32% food cost — net aan rentabel maar te weinig marge om
                seizoensdips op te vangen. De eigenaar benaderde Jezza Cooks
                voor een menu engineering traject van 3 dagdelen (€897 excl.
                BTW). Hieronder exact wat we deden en wat het opleverde.
              </p>

              <div className="my-6 rounded-2xl border border-border/35 bg-background/25 p-5 text-sm md:text-base">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Startsituatie
                </div>
                <ul className="mt-3 space-y-1 text-foreground/90">
                  <li>• Gemiddelde food cost: 32.4%</li>
                  <li>• 28 menu-items, 6 stars, 12 plowhorses, 4 puzzles, 6 dogs</li>
                  <li>• Hoogste food cost item: een risotto op 47%</li>
                  <li>• Geen uitgeschreven kostprijzen, alles op gevoel</li>
                </ul>
              </div>

              <p>
                <strong>Dagdeel 1 (diagnose):</strong> alle 28 recepten
                uitgeschreven op grammage, actuele inkoopprijzen ingevoerd,
                kostprijzen berekend. Bleek dat 3 gerechten op 40%+ food cost
                zaten — allemaal "huisgerechten" die niemand durfde aan te
                raken. De risotto van 47% was een gewoonte-item dat zelden
                verkocht en puur uit nostalgie op de kaart stond (klassieke
                dog).
              </p>
              <p>
                <strong>Dagdeel 2 (herontwerp):</strong> de 6 dogs geschrapt
                en vervangen door 3 nieuwe items met onderbouwde kostprijzen
                (netto kaartverkleining van 3 items — minder werk voor de
                keuken). De 12 plowhorses kregen portie-reset of goedkopere
                garnituur. Stars werden bovenaan gezet en visueel uitgelicht.
                Prijspsychologie toegepast: €-teken weg, .00 weg, één anker
                toegevoegd.
              </p>
              <p>
                <strong>Dagdeel 3 (training + borging):</strong> recepten op
                grammage gedocumenteerd voor het keukenteam, waste-log
                ingevoerd aan het einde van elke service, wekelijkse
                kostprijs-check tijdens zondagavond prep meeting.
              </p>

              <div className="my-6 rounded-2xl border border-primary/35 bg-primary/5 p-5 text-sm md:text-base">
                <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Resultaat na 6 weken
                </div>
                <ul className="mt-3 space-y-1 text-foreground/90">
                  <li>
                    <strong>Gemiddelde food cost: 26.1%</strong>{" "}
                    (daling van 6.3 procentpunten)
                  </li>
                  <li>
                    <strong>Bruto marge per couvert: +€4.80</strong> (van
                    €14.20 naar €19.00)
                  </li>
                  <li>
                    <strong>Extra maandmarge: +€8.700</strong> (bij ~1.800
                    couverts/maand)
                  </li>
                  <li>
                    <strong>Gastfeedback:</strong> geen enkele klacht over
                    portie of kwaliteit
                  </li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground md:text-base">
                Totale investering: €897 excl. BTW over 3 dagdelen. Break-even
                in week 1 van de nieuwe kaart. Dit is een representatief
                geanonimiseerd voorbeeld — niet elke zaak haalt 6 procentpunten
                in 6 weken, maar 2-4 procentpunten is bij bijna elk regulier
                restaurant haalbaar.
              </p>
            </div>
          </div>
        </section>

        {/* --- Section 9: FAQ --- */}
        <section id="faq" className="py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Veelgestelde vragen over menu engineering
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              De vragen die horeca-ondernemers mij het vaakst stellen over
              menu engineering, food cost en het praktische werk om een kaart
              te herzien.
            </p>

            <div className="mt-8">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`me-faq-${idx}`}
                    className="rounded-2xl border border-border/35 bg-background/20 px-5"
                  >
                    <AccordionTrigger className="text-left font-headline text-lg font-semibold md:text-xl">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-base leading-relaxed text-muted-foreground md:text-lg">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* --- CTA to consulting --- */}
        <section className="border-t border-border/60 bg-primary/5 py-16 md:py-20">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              Menu engineering laten doen in Amersfoort
            </div>
            <h2 className="mt-3 font-headline text-3xl font-bold md:text-5xl">
              Liever iemand die het met je doet dan zelf puzzelen?
            </h2>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              Jezza Cooks doet menu engineering trajecten vanaf €450 excl. BTW
              (Quick Scan: meeting en drie uur meelopen). Complete
              kaart-analyse, kostprijzen uitschrijven, herontwerp en
              team-training inbegrepen. Werkgebied:
              Amersfoort, Utrecht, Zwolle, Hilversum, Apeldoorn en heel het
              midden van Nederland. Voorafgaand altijd een gratis
              adviesgesprek van 30 minuten.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/services/consulting"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "font-semibold rounded-2xl",
                )}
              >
                Bekijk consulting pakket
              </Link>
              <Link
                href="/contact?topic=menu-engineering"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "font-semibold rounded-2xl",
                )}
              >
                Plan gratis adviesgesprek
              </Link>
            </div>

            <div className="mt-10 grid gap-4 rounded-2xl border border-border/35 bg-background/20 p-5 text-left text-sm text-muted-foreground md:grid-cols-3 md:p-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
                  Vestiging
                </div>
                <div className="mt-1">
                  {SITE.address.streetAddress}
                  <br />
                  {SITE.address.postalCode} {SITE.address.addressLocality}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
                  Auteur
                </div>
                <div className="mt-1">
                  Jeremy Arrascaeta
                  <br />
                  Chef-kok De Tafelaar Amersfoort
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
                  Contact
                </div>
                <div className="mt-1">
                  {SITE.contact.email}
                  <br />
                  {SITE.contact.phoneDisplay}
                </div>
              </div>
            </div>

            <div className="mt-6 text-xs text-muted-foreground">
              Laatst bijgewerkt: 14 april 2026 · Gepubliceerd: 14 april 2026 ·
              Door Jeremy Arrascaeta
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
