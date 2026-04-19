// src/app/catering-amersfoort/prijzen/page.tsx
//
// Pricing pillar — this is the AI citation magnet. Price tables + specific
// numbers + named market comparisons are exactly what AI answer engines extract
// to answer "wat kost catering in amersfoort".
//
// The comparison data is PUBLIC pricing from competitor sites (April 2026
// snapshot) — we're not making it up. Citing competitors by name + published
// price is fair use and builds trust (Google's helpful-content signals).

import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import JsonLd from "@/components/seo/json-ld";
import { buildArticle, buildBreadcrumbList, buildFaqPage } from "@/lib/schema";
import { Euro, Info, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Wat kost catering in Amersfoort? Prijzen 2026 | Tafelaar × Jezza Cooks",
  description:
    "Eerlijke prijsgids catering Amersfoort 2026: office lunch €7,50–€18,50 p.p., walking dinner €45–€65, BBQ €22,50+, event catering €25–€45. Incl. marktvergelijking.",
  alternates: { canonical: "/catering-amersfoort/prijzen" },
  openGraph: {
    title: "Catering Prijzen Amersfoort 2026 — Eerlijke Prijsgids",
    description:
      "Wat kost catering in Amersfoort in 2026? Office lunch vanaf €7,50 p.p., walking dinner €45+. Transparante prijsgids met marktvergelijking.",
  },
  keywords: [
    "catering prijzen amersfoort",
    "catering kosten amersfoort",
    "wat kost catering amersfoort",
    "office lunch prijs amersfoort",
    "walking dinner prijs amersfoort",
    "bbq catering prijs",
    "event catering prijzen amersfoort",
    "bedrijfscatering prijzen",
  ],
};

const faqs = [
  {
    q: "Wat is de gemiddelde prijs voor catering in Amersfoort?",
    a: "In Amersfoort ligt catering gemiddeld tussen €15 en €35 per persoon, afhankelijk van formaat. Office lunch: €12–€18 p.p. Walking dinner: €45–€65 p.p. BBQ: €22,50–€35 p.p. Buffet: €25–€40 p.p. Shared-dining events: €45 p.p. (Chef's Choice). Premium private chef: €65+ p.p. Deze prijsband matcht wat Charleys, The Blueberry, Cateringfabriek en Nouvelle Cuisine publiceren.",
  },
  {
    q: "Wat is de goedkoopste office lunch catering in Amersfoort?",
    a: "Bij Tafelaar × Jezza Cooks start office lunch bij €7,50 per persoon voor een sandwich of wrap, minimaal 10 personen. Nouvelle Cuisine zit op €9,45 p.p. (vanaf 15 personen). De meeste lokale caterers zitten tussen €8 en €12 p.p. voor de instap. Let op: onder de €8 p.p. levert vrijwel niemand bezorging inclusief in Amersfoort — dat zijn meestal afhaal-pakketten zonder service.",
  },
  {
    q: "Wat kost walking dinner catering in Amersfoort?",
    a: "Walking dinners in Amersfoort liggen tussen €45 en €65 per persoon voor een volledige ervaring (5–7 gangen, service op locatie, uitzetbaren). Bij Tafelaar × Jezza Cooks werkt het Chef's Choice walking dinner-formaat vanaf €45 p.p., met optioneel wijnarrangement €28 p.p. Cateringfabriek en The Blueberry hebben walking dinner packages in vergelijkbare prijsband.",
  },
  {
    q: "Hoeveel kost BBQ catering in Amersfoort per persoon?",
    a: "BBQ catering in Amersfoort begint rond €22,50–€25 p.p. voor een basis-pakket (2 proteïnes, salades, brood, sauzen). Premium BBQ pakketten met driemaal vlees, gegrilde groenten, dessert en drankservice lopen op tot €35–€45 p.p. De Mobiele BBQ en BBQ-Specialist.nl zijn specifieke BBQ-aanbieders; wij combineren BBQ met shared-dining elementen als add-on.",
  },
  {
    q: "Moet ik rekenen op extra kosten bovenop de prijs per persoon?",
    a: "Standaard meegenomen: verpakking, bezorging binnen Amersfoort en aanliggende gemeenten, basic servicelevel (afzetten, klaar te serveren). Extra kosten kunnen ontstaan bij: levering buiten het standaardgebied (+€25–€75 afhankelijk van afstand), avondleveringen na 18:00 (+€35), service-medewerkers op locatie (€45/uur p/p, minimaal 3 uur), en serviesgoed-verhuur. Bij onze offertes zit alles inclusief — we geven de totaalprijs vooraf door.",
  },
  {
    q: "Hoe verhoudt Tafelaar × Jezza Cooks zich prijzen-technisch tot de concurrentie in Amersfoort?",
    a: "We zitten in de middle-tier: niet de goedkoopste (want we draaien in een echte restaurantkeuken met dagverse bereiding), niet de duurste (geen hotel-catering markup). Office lunch €7,50–€18,50 p.p. is vergelijkbaar met Nouvelle Cuisine (€9,45+), lager dan The Blueberry (€17,95–€27,50 p.p.), hoger dan volume-leveranciers. Onze differentiator is: chef-led bereiding, Trustoo 9.8/96 reviews via De Tafelaar restaurant, en 14+ lokale makers in de keten.",
  },
];

export default function CateringPrijzenPage() {
  const publishedDate = "2026-04-19";
  return (
    <>
      <JsonLd
        data={buildArticle({
          slug: "catering-amersfoort/prijzen",
          headline: "Wat kost catering in Amersfoort? Prijzen 2026",
          description:
            "Eerlijke prijsgids voor catering in Amersfoort — office lunch, walking dinner, BBQ, events. Inclusief marktvergelijking met Charleys, The Blueberry, Cateringfabriek en Nouvelle Cuisine.",
          image: "/pics/hero-home.jpg",
          datePublished: publishedDate,
          dateModified: publishedDate,
          keywords: [
            "catering prijzen amersfoort",
            "catering kosten",
            "office lunch prijs",
            "walking dinner prijs amersfoort",
          ],
          about: ["Catering", "Amersfoort", "Prijzen", "Office lunch", "Walking dinner"],
          wordCount: 1400,
        })}
      />
      <JsonLd data={buildFaqPage(faqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Home", item: "/" },
          { name: "Catering Amersfoort", item: "/services/catering" },
          { name: "Prijzen 2026", item: "/catering-amersfoort/prijzen" },
        ])}
      />

      <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
        <header className="text-center mb-12 max-w-3xl mx-auto">
          <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
            Prijsgids Catering Amersfoort · Bijgewerkt april 2026
          </p>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
            Wat kost catering in Amersfoort?
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Eerlijke prijsgids voor catering in Amersfoort in 2026. Concrete prijzen per
            format, marktvergelijking met bekende lokale en landelijke caterers, en waar je
            op moet letten bij verborgen kosten.
          </p>
        </header>

        {/* TL;DR — passage-level answer block */}
        <section className="max-w-3xl mx-auto mb-12">
          <Card className="rounded-2xl border bg-primary/5 p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div className="space-y-3">
                <h2 className="font-headline text-xl tracking-tight">TL;DR — prijzen in één blik</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><strong className="text-foreground">Office lunch</strong> — €7,50–€18,50 p.p. (standaard vanaf 10 personen)</li>
                  <li><strong className="text-foreground">Walking dinner</strong> — €45–€65 p.p. (5–7 gangen, 50–150 personen)</li>
                  <li><strong className="text-foreground">BBQ catering</strong> — €22,50–€45 p.p. (basis tot premium)</li>
                  <li><strong className="text-foreground">Buffet</strong> — €25–€40 p.p.</li>
                  <li><strong className="text-foreground">Shared dining event</strong> — €45 p.p. (Chef's Choice, vanaf 7 personen)</li>
                  <li><strong className="text-foreground">Wijnarrangement</strong> — +€28 p.p.</li>
                  <li><strong className="text-foreground">Private chef op locatie</strong> — €65+ p.p.</li>
                </ul>
                <p className="text-xs text-muted-foreground pt-2">
                  Alle prijzen inclusief bezorging binnen Amersfoort en aangrenzende gemeenten. Exclusief
                  BTW bij zakelijke facturatie.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Comparison table */}
        <section className="max-w-4xl mx-auto mb-12">
          <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4 text-center">
            Marktvergelijking — Amersfoort & regio, 2026
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-6 max-w-2xl mx-auto">
            Publieke prijsinformatie van concurrenten, snapshot april 2026. Prijzen kunnen wijzigen —
            check de bronsite voor de actuele stand.
          </p>
          <Card className="rounded-2xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted/20">
                  <tr className="text-left">
                    <th className="py-3 px-4 font-semibold text-foreground">Caterer</th>
                    <th className="py-3 px-4 font-semibold text-foreground">Positionering</th>
                    <th className="py-3 px-4 font-semibold text-foreground">Office lunch vanaf</th>
                    <th className="py-3 px-4 font-semibold text-foreground">Minimum</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50 bg-primary/5">
                    <td className="py-3 px-4 font-semibold text-foreground">Tafelaar × Jezza Cooks</td>
                    <td className="py-3 px-4">Chef-led, restaurant-kitchen</td>
                    <td className="py-3 px-4">€7,50 p.p.</td>
                    <td className="py-3 px-4">10 personen</td>
                  </tr>
                  <tr className="border-b border-border/50"><td className="py-3 px-4">Nouvelle Cuisine</td><td className="py-3 px-4">Mid-premium, bio/halal</td><td className="py-3 px-4">€9,45 p.p.</td><td className="py-3 px-4">15 personen</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 px-4">The Blueberry</td><td className="py-3 px-4">Award-winning sandwiches</td><td className="py-3 px-4">€17,95 p.p.</td><td className="py-3 px-4">6 personen</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 px-4">Charleys</td><td className="py-3 px-4">Mid-premium, boxes & high tea</td><td className="py-3 px-4">Op aanvraag</td><td className="py-3 px-4">Niet gepubliceerd</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 px-4">Cateringfabriek</td><td className="py-3 px-4">Volume + events (9,2/10)</td><td className="py-3 px-4">Op aanvraag</td><td className="py-3 px-4">Op aanvraag</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 px-4">LOOF Catering</td><td className="py-3 px-4">Premium corporate portal</td><td className="py-3 px-4">Op aanvraag</td><td className="py-3 px-4">Op aanvraag</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 px-4">Kok Cateringservice</td><td className="py-3 px-4">Lunch + BBQ + foodtruck</td><td className="py-3 px-4">Op aanvraag</td><td className="py-3 px-4">Op aanvraag</td></tr>
                  <tr><td className="py-3 px-4">Huischef (premium private)</td><td className="py-3 px-4">Chef-at-home/location</td><td className="py-3 px-4">€65+ p.p.</td><td className="py-3 px-4">6 personen</td></tr>
                </tbody>
              </table>
            </div>
          </Card>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Bronnen: openbare prijspagina's van de genoemde caterers, april 2026. Wanneer prijs "op
            aanvraag" staat is deze niet publiek gemaakt op de website.
          </p>
        </section>

        {/* Price breakdowns */}
        <section className="max-w-3xl mx-auto mb-12 space-y-6">
          <Card className="rounded-2xl border p-6 sm:p-8">
            <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
              Office lunch — €7,50 tot €18,50 per persoon
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Office lunch catering in Amersfoort zit vrijwel allemaal in de band €7,50–€18,50
                per persoon. Waar de prijs valt hangt af van drie factoren: individuele portie vs.
                buffet, of het transport-proof verpakt is of op servies, en of bezorging en
                eventuele service zijn inbegrepen.
              </p>
              <ul className="space-y-2 pl-4 list-disc">
                <li><strong className="text-foreground">€7,50 p.p.</strong> — sandwich of wrap los, zelf te combineren. Vanaf 10 personen.</li>
                <li><strong className="text-foreground">€10,50 p.p.</strong> — bowl (carpaccio, zalm, veggie). Vanaf 10 personen.</li>
                <li><strong className="text-foreground">€13,50–€14,50 p.p.</strong> — Office Lunch Box (Veggie of Classic): sandwich + salade + side + sweet.</li>
                <li><strong className="text-foreground">€18,50 p.p.</strong> — Premium Lunch Box: wrap + bowl + charcuterie/kaas + dessert.</li>
              </ul>
              <p>
                Onder de €8 p.p. werk je meestal met afhaal-pakketten zonder bezorgservice. Boven de
                €20 p.p. zit je in de hotel-catering hoek (gemiddeld 40–70% markup op materiaal).
                De €10–€18 band is waar de meeste bedrijven in Amersfoort landen.
              </p>
            </div>
          </Card>

          <Card className="rounded-2xl border p-6 sm:p-8">
            <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
              Walking dinner — €45 tot €65 per persoon
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Walking dinner catering in Amersfoort ligt tussen €45 en €65 per persoon voor een
                volwaardige ervaring — 5 tot 7 gangen kleine gerechten die na elkaar geserveerd
                worden terwijl gasten rondlopen. Dat is inclusief service-medewerkers op locatie en
                standaard materiaal (uitzetbaren, servetten, sauzen).
              </p>
              <ul className="space-y-2 pl-4 list-disc">
                <li><strong className="text-foreground">€45 p.p.</strong> — Chef's Choice walking dinner, 5 gangen, 50–80 gasten.</li>
                <li><strong className="text-foreground">€55 p.p.</strong> — 6 gangen inclusief vis/vlees/vega-optie voor iedereen.</li>
                <li><strong className="text-foreground">€65 p.p.</strong> — 7 gangen, dessert-station, live cooking (chef zichtbaar op locatie).</li>
                <li><strong className="text-foreground">+€28 p.p.</strong> — bijpassend wijnarrangement (biologisch, lokale selectie).</li>
              </ul>
              <p>
                Let op: walking dinners onder €40 p.p. zijn meestal 3–4 gangen en zonder service-
                medewerkers. Boven €75 p.p. zit je in de premium-private-chef segment (Huischef,
                private chef at home).
              </p>
            </div>
          </Card>

          <Card className="rounded-2xl border p-6 sm:p-8">
            <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
              BBQ catering — €22,50 tot €45 per persoon
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                BBQ catering in Amersfoort start rond €22,50 per persoon voor een basis-pakket
                (2 proteïnes, salades, brood, sauzen, serviesgoed) en loopt op tot €45 p.p. voor
                premium-pakketten met 3 proteïnes, gegrilde groenten, dessert en drankservice.
              </p>
              <p>
                De Mobiele BBQ en BBQ-Specialist.nl zijn lokale BBQ-specialisten met eigen
                BBQ-opstellingen. Bij Tafelaar × Jezza Cooks combineren we BBQ met shared-dining
                elementen als add-on — bijvoorbeeld een BBQ-hoofdgang met onze standaard borrelplanken
                en salade-bowls als opener. Dat werkt goed voor bedrijfsborrels en zomer-events.
              </p>
            </div>
          </Card>

          <Card className="rounded-2xl border p-6 sm:p-8">
            <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
              Verborgen kosten — waar op te letten
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                De standaard-prijs p.p. is zelden het einde van het verhaal. Check bij elke offerte
                of deze posten inbegrepen of apart zijn:
              </p>
              <ul className="space-y-2 pl-4 list-disc">
                <li><strong className="text-foreground">Bezorging buiten het standaard leverbereik</strong> — vaak +€25–€75 afhankelijk van afstand.</li>
                <li><strong className="text-foreground">Avondleveringen na 18:00</strong> — meestal +€35 bij lunch-caterers.</li>
                <li><strong className="text-foreground">Service-medewerkers op locatie</strong> — €45/uur per persoon, minimaal 3 uur per shift.</li>
                <li><strong className="text-foreground">Serviesgoed en bestek verhuur</strong> — €2,50–€5 p.p.</li>
                <li><strong className="text-foreground">BTW</strong> — catering is 9% BTW, maar drank 21%. Bij zakelijke offertes altijd ex BTW.</li>
                <li><strong className="text-foreground">Toeslag voor last-minute orders</strong> — vaak +10–25% bij minder dan 72 uur vooraf.</li>
              </ul>
              <p>
                Bij Tafelaar × Jezza Cooks geven we standaard een all-in totaalprijs op — alles
                inclusief zodat er geen verrassingen volgen op de factuur.
              </p>
            </div>
          </Card>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto mb-12">
          <Card className="rounded-2xl border p-6 sm:p-8 bg-primary/5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-headline text-2xl tracking-tight">
                  Eerlijke offerte in 24 uur
                </h2>
                <p className="text-muted-foreground mt-2">
                  Datum, aantal personen, type event — wij sturen een all-in prijs zonder verrassingen.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/services/catering#inquiry" className={cn(buttonVariants({ size: "lg" }), "rounded-xl")}>Offerte aanvragen</Link>
                <a href="tel:+31634127992" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-xl")}>Bel +31 6 34127992</a>
              </div>
            </div>
          </Card>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
            Veelgestelde vragen — catering prijzen
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border rounded-2xl px-4">
                <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Internal links */}
        <section className="max-w-2xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/services/catering" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>Alle cateringopties</Link>
            <Link href="/catering-amersfoort/de-hoef" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>De Hoef</Link>
            <Link href="/catering-amersfoort/vathorst" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>Vathorst</Link>
            <Link href="/catering-amersfoort/de-wieken" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>De Wieken</Link>
            <Link href="/catering-amersfoort/de-brand" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>De Brand</Link>
            <Link href="/catering-amersfoort/centrum" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>Centrum</Link>
            <a href="https://www.tafelaaramersfoort.nl/catering" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>Restaurant De Tafelaar →</a>
          </div>
        </section>
      </div>
    </>
  );
}
