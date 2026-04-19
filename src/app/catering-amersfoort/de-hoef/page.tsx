// src/app/catering-amersfoort/de-hoef/page.tsx
//
// Neighborhood catering landing page — De Hoef (largest bedrijventerrein in
// Amersfoort, 739 companies, A1/A28 access). This is the most valuable
// of the 5 neighborhood pages because De Hoef has the most offices in the
// 20-200 employee band — the sweet spot for recurring lunch contracts.
//
// The page is GENUINELY location-specific (not a template swap): named
// companies, specific parking/delivery logistics, dedicated FAQs. This
// matters for both AI citation and avoiding Google's doorway-page penalty.

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
import { buildBreadcrumbList, buildFaqPage, buildServicePage } from "@/lib/schema";
import { SITE_URL } from "@/lib/site-config";
import { Briefcase, Clock, MapPin, Package, Truck, UtensilsCrossed } from "lucide-react";

export const metadata: Metadata = {
  title: "Catering De Hoef Amersfoort | Office Lunch op Bedrijventerrein | Tafelaar × Jezza Cooks",
  description:
    "Catering op bedrijventerrein De Hoef in Amersfoort: office lunch vanaf €7,50 p.p., bezorgd vanuit onze restaurantkeuken op Kamp 8. 10 min rijden, lunch-window 11:30–12:30.",
  alternates: { canonical: "/catering-amersfoort/de-hoef" },
  openGraph: {
    title: "Catering De Hoef — Office Lunch in Amersfoort",
    description:
      "Office lunch catering op bedrijventerrein De Hoef, vanaf €7,50 p.p. Restaurantkeuken op Kamp 8, 10 min rijden.",
  },
  keywords: [
    "catering de hoef",
    "catering de hoef amersfoort",
    "office lunch de hoef",
    "bedrijfslunch de hoef",
    "lunch bezorgen de hoef",
    "kantoorcatering de hoef",
    "vergaderlunch de hoef amersfoort",
  ],
};

const faqs = [
  {
    q: "Bezorgen jullie catering op bedrijventerrein De Hoef?",
    a: "Ja, De Hoef is ons dichtstbijzijnde kantorenconcentratie buiten het centrum — vanuit onze restaurantkeuken op Kamp 8 ben je in ongeveer 10 minuten op De Hoef via de Stadsring en Hogeweg. Standaard lunch-window 11:30–12:30. Lunchboxen, individuele boxes, bowls en wraps worden transport-proof verpakt en afgegeven bij receptie of directe doorlevering naar meeting rooms.",
  },
  {
    q: "Hoeveel bedrijven zitten er op De Hoef?",
    a: "De Hoef is met 739 bedrijven het grootste bedrijventerrein van Amersfoort. Gemengd profiel van dienstverlening, IT, consultancy, logistiek en productie — sweet spot voor teams tussen 20 en 200 medewerkers die regelmatig vergaderlunch, teamdag of relatie-events organiseren. Directe A1/A28 aansluiting maakt het bereikbaar voor gasten uit Utrecht en Hilversum als je een hybrid event plant.",
  },
  {
    q: "Vanaf hoeveel personen lever je naar De Hoef?",
    a: "Onze office lunch catering start vanaf 10 personen voor lunchboxen, sandwiches, bowls en wraps (€7,50–€18,50 p.p.). Voor walking dinners en events schalen we tot 150+ personen. Onder de 10 personen is het vaak sneller om met jullie team naar ons restaurant op de Kamp te komen — we liggen op 10 minuten van De Hoef.",
  },
  {
    q: "Kunnen jullie ook lunch op vaste dagen per week leveren aan De Hoef?",
    a: "Ja, recurring lunch contracts (bijvoorbeeld elke dinsdag en donderdag) zijn mogelijk vanaf 15 personen. We plannen de menu-rotatie per week zodat jullie team variatie houdt. Bel +31 6 34127992 of mail info@jezzacooks.com om door te spreken — minimale contractduur en prijsafspraken bespreken we in een eerste gesprek.",
  },
  {
    q: "Hoe zit het met parkeren en inrijden voor bezorging op De Hoef?",
    a: "De meeste kantoorpanden op De Hoef hebben eigen parkeerplaatsen of een laad- en loszone voor kortstondig parkeren. We rijden standaard met één personenauto of klein bedrijfsbusje. Geef bij de aanvraag door hoe de bezorgroute loopt (hoofdingang, laadperron, receptie) — dan zit het lunchmoment strak op tijd.",
  },
];

function servicePageJsonLd() {
  return {
    ...buildServicePage({
      slug: "catering-amersfoort/de-hoef",
      name: "Catering De Hoef Amersfoort",
      description:
        "Office lunch en event catering op bedrijventerrein De Hoef in Amersfoort. Vanaf €7,50 p.p., bezorgd vanuit restaurantkeuken op Kamp 8.",
      areaServed: ["De Hoef", "Amersfoort"],
    }),
  };
}

export default function CateringDeHoefPage() {
  return (
    <>
      <JsonLd data={servicePageJsonLd()} />
      <JsonLd data={buildFaqPage(faqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Home", item: "/" },
          { name: "Catering Amersfoort", item: "/services/catering" },
          { name: "De Hoef", item: "/catering-amersfoort/de-hoef" },
        ])}
      />

      <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
        {/* Hero */}
        <header className="text-center mb-12 max-w-3xl mx-auto">
          <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
            Catering op bedrijventerrein De Hoef
          </p>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
            Catering De Hoef Amersfoort
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Office lunch, vergaderlunch, teamdag en events op De Hoef — bezorgd vanuit onze
            restaurantkeuken op Kamp 8 in het centrum van Amersfoort. Tafelaar × Jezza Cooks,
            vanaf €7,50 p.p.
          </p>
        </header>

        {/* Stats strip */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <Card className="rounded-2xl border p-4">
              <p className="text-2xl font-headline text-primary">~10 min</p>
              <p className="text-xs text-muted-foreground">Rijtijd vanaf Kamp 8</p>
            </Card>
            <Card className="rounded-2xl border p-4">
              <p className="text-2xl font-headline text-primary">739</p>
              <p className="text-xs text-muted-foreground">Bedrijven op De Hoef</p>
            </Card>
            <Card className="rounded-2xl border p-4">
              <p className="text-2xl font-headline text-primary">10+</p>
              <p className="text-xs text-muted-foreground">Personen minimum</p>
            </Card>
            <Card className="rounded-2xl border p-4">
              <p className="text-2xl font-headline text-primary">€7,50</p>
              <p className="text-xs text-muted-foreground">Per persoon vanaf</p>
            </Card>
          </div>
        </section>

        {/* USPs */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Truck className="h-5 w-5" />
                  <CardTitle className="text-lg">Lunch-window 11:30–12:30</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Standaard lunch-window voor De Hoef. Andere tijden op aanvraag (ontbijtlunch 09:30,
                late lunch 13:30 — vraag naar maatwerk).
              </CardContent>
            </Card>
            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <UtensilsCrossed className="h-5 w-5" />
                  <CardTitle className="text-lg">Bereid in restaurantkeuken</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Geen centrale cateringfabriek — alles wordt dezelfde ochtend bereid in de keuken van
                De Tafelaar aan de Kamp, door de chef zelf.
              </CardContent>
            </Card>
            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Package className="h-5 w-5" />
                  <CardTitle className="text-lg">Transport-proof verpakt</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Individuele boxes, ovenbestendige platters voor warme gerechten, en duidelijke
                allergeen-stickers. Klaar om neer te zetten.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-3xl mx-auto mb-12 space-y-6">
          <Card className="rounded-2xl border p-6 sm:p-8">
            <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
              Waarom catering op De Hoef vanuit de Kamp werkt
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                De Hoef is het grootste bedrijventerrein van Amersfoort — 739 bedrijven verspreid
                over gemengde kantoor-, productie- en dienstenpanden, met directe A1/A28 aansluiting
                via de Outputweg en Heliumweg. Dat maakt het de grootste pool mid-size teams
                (20–200 medewerkers) in de stad die regelmatig catering nodig hebben voor
                vergaderingen, teamdagen, directieborrels en relatie-events.
              </p>
              <p>
                Vanuit onze restaurantkeuken op Kamp 8 rijden we De Hoef binnen ongeveer 10 minuten
                via de Stadsring en Hogeweg — korter dan de meeste concurrenten die vanuit Leusden
                of Utrecht moeten rijden. Dat betekent: versere lunch, strak op tijd, en real-time
                bereikbaar als er iets verandert (iemand ziek, extra gast, lunch naar een andere
                meeting room).
              </p>
              <p>
                We cateren op De Hoef variërend van 10-persoons vergaderlunches tot 80-persoons
                teamdagen en 150-persoons relatie-events. Specifiek voor De Hoef bieden we recurring
                lunch contracts (bijvoorbeeld elke dinsdag en donderdag) vanaf 15 personen, met
                wekelijks wisselende menu-rotatie zodat jullie team variatie houdt.
              </p>
            </div>
          </Card>

          <Card className="rounded-2xl border p-6 sm:p-8">
            <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
              Wat cateren we naar De Hoef?
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Office Lunch Boxes</strong> — Classic (€14,50),
                Veggie (€13,50) of Premium (€18,50). Ideaal voor vergaderingen waar iedereen aan eigen
                tafel eet. Transport-proof, individueel verpakt, klaar voor receptie-afgifte.
              </p>
              <p>
                <strong className="text-foreground">Sandwiches, bowls en wraps</strong> — €7,50 per
                broodje/wrap, €10,50 per bowl. Samen te stellen als buffet op een centrale tafel of
                individueel per persoon. Ruim vega, vegan en glutenvrij aanbod.
              </p>
              <p>
                <strong className="text-foreground">Borrel en walking dinner</strong> — voor receptie-,
                directie- of relatie-events op De Hoef. Borrelplanken, warme hapjes, shared dining
                stations. Vraag naar het Chef's Choice arrangement (vanaf €45 p.p.) voor diners met
                sfeer van het restaurant, op locatie.
              </p>
              <p>
                <strong className="text-foreground">Build Your Own Lunch</strong> — per persoon 1
                basis + 1 side + 1 sweet. Flexibel voor teams met mixed diëten en groepen vanaf
                10 personen.
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
                  Lunch bespreken voor jouw kantoor op De Hoef?
                </h2>
                <p className="text-muted-foreground mt-2">
                  Vertel ons datum, aantal personen en adres — wij maken een voorstel op maat.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/services/catering#inquiry"
                  className={cn(buttonVariants({ size: "lg" }), "rounded-xl")}
                >
                  Offerte aanvragen
                </Link>
                <a
                  href="tel:+31634127992"
                  className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-xl")}
                >
                  Bel +31 6 34127992
                </a>
              </div>
            </div>
          </Card>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
            Veelgestelde vragen — catering op De Hoef
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border rounded-2xl px-4">
                <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Internal links */}
        <section className="max-w-2xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/services/catering"
              className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}
            >
              Alle cateringopties
            </Link>
            <Link
              href="/catering-amersfoort/vathorst"
              className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}
            >
              Catering Vathorst
            </Link>
            <Link
              href="/catering-amersfoort/de-wieken"
              className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}
            >
              Catering De Wieken
            </Link>
            <Link
              href="/catering-amersfoort/prijzen"
              className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}
            >
              Prijzen 2026
            </Link>
            <a
              href="https://www.tafelaaramersfoort.nl/catering"
              className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}
            >
              Restaurant De Tafelaar →
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
