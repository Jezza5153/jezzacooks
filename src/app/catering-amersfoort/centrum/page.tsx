// src/app/catering-amersfoort/centrum/page.tsx
//
// Neighborhood catering landing page — Amersfoort Centrum/Binnenstad. The
// nearest-to-kitchen tier. Profile: creative agencies, consultancies, law
// firms, PR bureaus in historic buildings. Often smaller teams (5-50) in
// characterful spaces. Sometimes tricky logistics (pedestrian zone, no
// car access, narrow stairs). This is where our proximity is biggest moat.

import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import JsonLd from "@/components/seo/json-ld";
import { buildBreadcrumbList, buildFaqPage, buildServicePage } from "@/lib/schema";
import { Bike, Clock, MapPin, UtensilsCrossed } from "lucide-react";

export const metadata: Metadata = {
  title: "Catering Amersfoort Centrum | Binnenstad Office Lunch | Tafelaar × Jezza Cooks",
  description:
    "Catering in Amersfoort centrum en binnenstad: office lunch vanaf €7,50 p.p., 5 minuten vanuit onze restaurantkeuken op Kamp 8. Voetgangersgebied, smalle straatjes — wij kennen de routes.",
  alternates: { canonical: "/catering-amersfoort/centrum" },
  openGraph: {
    title: "Catering Amersfoort Centrum — Binnenstad Office Lunch",
    description: "Catering in het centrum van Amersfoort, 5 min vanaf Kamp 8. Vanaf €7,50 p.p.",
  },
  keywords: [
    "catering amersfoort centrum",
    "catering binnenstad amersfoort",
    "office lunch amersfoort centrum",
    "catering kamp amersfoort",
    "lunch bezorgen amersfoort centrum",
    "kantoorlunch binnenstad amersfoort",
    "bedrijfslunch amersfoort centrum",
  ],
};

const faqs = [
  {
    q: "Bezorgen jullie catering in het centrum van Amersfoort?",
    a: "Ja, en wij zijn letterlijk in het centrum gevestigd — onze restaurantkeuken zit op Kamp 8, midden in de binnenstad. Voor adressen binnen het centrum en binnenstad rijden we in 5 tot 10 minuten, en waar het voetgangersgebied restricties oplegt lopen of fietsen we met bakfiets. Geen andere caterer in de stad zit dichterbij.",
  },
  {
    q: "Werken in de binnenstad levert logistieke uitdagingen op — hoe gaan jullie daarmee om?",
    a: "Veel binnenstad-adressen zitten in historische panden — smalle trappen, voetgangerszones, beperkt laden en lossen. Wij kennen de routes, venstertijden voor bevoorrading, en welke kamerservice bij welk pand werkt. Geef de naam van het pand en de verdieping bij de aanvraag — vaak hebben we er al eerder geleverd of weten we de logistieke trucs.",
  },
  {
    q: "Wat voor bedrijven cateren jullie in het centrum?",
    a: "Het centrum heeft een ander profiel dan de bedrijventerreinen: creatieve bureaus, consultancies, advocatenkantoren, PR bureaus, architecten, communicatiestudio's — vaak kleinere teams (5–50 medewerkers) in karaktervolle panden. Typische boekingen: vergaderlunch (15 personen), klantenpresentatie-lunch (10 personen), directie- en partner-overleg (6–12 personen), en teamborrels.",
  },
  {
    q: "Kan ik voor klein groepsetentje ook gewoon in het restaurant reserveren?",
    a: "Absoluut — voor groepen onder 10 personen is het restaurant De Tafelaar zelf (Kamp 8) meestal de betere route. Shared dining in het restaurant werkt voor groepjes van 2 tot 60. Vanaf 7 personen bieden we Chef's Choice arrangement (€45 p.p.) met optioneel wijnarrangement (€28 p.p.). Reserveer via tafelaaramersfoort.nl.",
  },
  {
    q: "Cateren jullie ook events in historische panden in het centrum?",
    a: "Ja, en dat is juist waar we onze thuiswedstrijd spelen. Bedrijfsborrels in monumentale pakhuizen, recepties in statige kantoren aan de Hof, kleine walking dinners in ateliers — de binnenstad heeft unieke ruimtes waar standaard catering-diensten van ver wegblijven. Wij zitten om de hoek, dus we lopen een run-through vooraf en weten wat past.",
  },
];

export default function CateringCentrumPage() {
  return (
    <>
      <JsonLd data={buildServicePage({
        slug: "catering-amersfoort/centrum",
        name: "Catering Amersfoort Centrum",
        description: "Office lunch, vergaderlunch en binnenstad-event catering in het centrum van Amersfoort. 5 min vanaf Kamp 8.",
        areaServed: ["Amersfoort Centrum", "Binnenstad Amersfoort", "Kamp", "Amersfoort"],
      })} />
      <JsonLd data={buildFaqPage(faqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={buildBreadcrumbList([
        { name: "Home", item: "/" },
        { name: "Catering Amersfoort", item: "/services/catering" },
        { name: "Centrum", item: "/catering-amersfoort/centrum" },
      ])} />

      <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
        <header className="text-center mb-12 max-w-3xl mx-auto">
          <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
            Catering in de binnenstad
          </p>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
            Catering Amersfoort Centrum
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Onze restaurantkeuken zit op Kamp 8, midden in het centrum. Geen andere caterer in
            Amersfoort zit dichterbij. 5–10 minuten levertijd, soms per bakfiets door de
            voetgangerszone. Vanaf €7,50 p.p.
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <MapPin className="h-5 w-5" />
                  <CardTitle className="text-lg">Kamp 8 = binnenstad</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Onze keuken ligt in het hart van Amersfoort. Geen caterer zit dichterbij, dus geen
                caterer levert verser.
              </CardContent>
            </Card>
            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Bike className="h-5 w-5" />
                  <CardTitle className="text-lg">Bakfiets door voetgangerszone</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Voor historische panden in het voetgangersgebied waar auto's niet komen. Geen
                extra toeslag.
              </CardContent>
            </Card>
            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <UtensilsCrossed className="h-5 w-5" />
                  <CardTitle className="text-lg">Historische panden</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                We kennen de venstertijden, smalle trappen en laad-los-regels van de binnenstad.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12 space-y-6">
          <Card className="rounded-2xl border p-6 sm:p-8">
            <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
              Waarom catering in het centrum anders werkt
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Het centrum van Amersfoort is compact, historisch en karaktervol — maar
                operationeel lastig voor caterers die vanuit buiten moeten rijden. Voetgangerszone
                op de Langestraat, Krommestraat en het Lieve Vrouwekerkhof. Beperkte
                bevoorradings-venstertijden. Smalle trappen in monumentale kantoorpanden. Dat
                schrikt de meeste grote catering-bedrijven af, of leidt tot late en verkeerde
                leveringen.
              </p>
              <p>
                Wij zitten op Kamp 8 — letterlijk in de binnenstad. Voor adressen in het centrum
                rijden we 5 tot 10 minuten, en waar een auto niet komt lopen of fietsen we met een
                bakfiets. We kennen de routes, de straatnaamborden, de venstertijden, en welke
                receptionisten vrij zijn op welk moment. Die lokale kennis is het voordeel dat een
                centrale catering-hub nooit kan evenaren.
              </p>
              <p>
                Het catering-profiel in het centrum is ook anders dan op de bedrijventerreinen:
                kleinere teams (5–50), vaker creatieve of consultancy-bedrijven, veel klanten-
                presentatielunches en directie-overleg in plaats van grote vergaderlunches. Onze
                Chef's Choice Lunch Box (€18,50) en Premium Box met wijnbegeleiding zijn hier
                favoriet. Voor informelere teamlunches werkt Build Your Own Lunch (€7,50 basis).
              </p>
            </div>
          </Card>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <Card className="rounded-2xl border p-6 sm:p-8 bg-primary/5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-headline text-2xl tracking-tight">
                  Catering bestellen in de binnenstad?
                </h2>
                <p className="text-muted-foreground mt-2">
                  Onze keuken is om de hoek. Snelle afstemming via telefoon of mail.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/services/catering#inquiry" className={cn(buttonVariants({ size: "lg" }), "rounded-xl")}>Offerte aanvragen</Link>
                <a href="tel:+31634127992" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-xl")}>Bel +31 6 34127992</a>
              </div>
            </div>
          </Card>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
            Veelgestelde vragen — catering in het centrum
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

        <section className="max-w-2xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/services/catering" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>Alle cateringopties</Link>
            <Link href="/catering-amersfoort/de-brand" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>De Brand</Link>
            <Link href="/catering-amersfoort/de-hoef" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>De Hoef</Link>
            <Link href="/catering-amersfoort/prijzen" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>Prijzen 2026</Link>
            <a href="https://www.tafelaaramersfoort.nl" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>
              Restaurant De Tafelaar →
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
