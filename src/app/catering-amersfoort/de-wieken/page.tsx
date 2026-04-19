// src/app/catering-amersfoort/de-wieken/page.tsx
//
// Neighborhood catering landing page — De Wieken. Modern kantorencomplex
// between De Hoef and Vathorst, A28/A1 access. Profile: mid-large modern
// offices, often HQ-style. Sweet spot for: corporate board meetings,
// directie borrels, bedrijvenverzamelgebouwen.

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
import { Briefcase, Building2, Clock, UtensilsCrossed } from "lucide-react";

export const metadata: Metadata = {
  title: "Catering De Wieken Amersfoort | Corporate Lunch | Tafelaar × Jezza",
  description:
    "Corporate catering op De Wieken: executive lunch, directieborrels en board meetings. Vanaf €7,50 p.p., restaurantkeuken Kamp 8.",
  alternates: { canonical: "/catering-amersfoort/de-wieken" },
  openGraph: {
    title: "Catering De Wieken — Corporate Lunch Amersfoort",
    description: "Corporate catering in De Wieken — lunch, borrel en directie-events vanaf €7,50 p.p.",
  },
  keywords: [
    "catering de wieken",
    "catering de wieken amersfoort",
    "corporate lunch de wieken",
    "directieborrel amersfoort",
    "board meeting catering",
    "kantoorlunch de wieken",
    "bedrijfsborrel amersfoort",
  ],
};

const faqs = [
  {
    q: "Bezorgen jullie catering op De Wieken?",
    a: "Ja. De Wieken ligt op ongeveer 10 minuten rijden vanaf onze restaurantkeuken op Kamp 8 — via Stadsring en Outputweg. Standaard lunch-window 11:30–12:30. Voor directieborrels, board meetings en after-work-events op De Wieken werken we met flexibele aankomsttijden tot 19:00.",
  },
  {
    q: "Wat voor catering past bij de corporate profielen op De Wieken?",
    a: "De Wieken is modern kantorencomplex met vaak HQ-stijl panden — 50 tot 200 medewerkers per pand, veel directiekantoren en board rooms. Wij leveren hier vaker: executive lunch (Premium Lunch Box €18,50, inclusief wijn optioneel), strak verzorgde bordelunches, en directieborrels met charcuterie, kaas en warme hapjes. Voor board meetings met externe gasten: Chef's Choice arrangement vanaf €45 p.p. werkt uitstekend als 'lunch met indruk'.",
  },
  {
    q: "Kunnen jullie ook borrelmomenten buiten kantoortijd op De Wieken verzorgen?",
    a: "Ja. Na-werk-borrels, kwartaalborrels en directie-events buiten standaardtijden zijn standaard. We kunnen tot 19:00 leveren en op locatie blijven voor service als dat gewenst is. Voor grotere events (40+) plannen we 2–4 medewerkers voor service in.",
  },
  {
    q: "Hoe gaat het met laden/lossen bij de grote panden op De Wieken?",
    a: "De meeste moderne panden op De Wieken hebben een duidelijk aangegeven laad- en loszone of parkeergelegenheid bij de hoofdingang. Geef bij de aanvraag door welke ingang, verdieping en contactpersoon bij receptie; we coördineren het vooraf zodat de levering strak zonder gedoe verloopt.",
  },
  {
    q: "Hebben jullie referenties van grotere De Wieken klanten?",
    a: "We werken met een mix van kleinere mkb-kantoren en enkele grotere bedrijfsverzamelgebouwen. Klantnamen delen we op aanvraag met toestemming. Algemene indicatie: we cateren regelmatig board lunches (10–15 personen), kwartaalborrels (30–80 personen) en recurring weekly lunch contracts (15–40 personen per dag).",
  },
];

export default function CateringDeWiekenPage() {
  return (
    <>
      <JsonLd data={buildServicePage({
        slug: "catering-amersfoort/de-wieken",
        name: "Catering De Wieken Amersfoort",
        description: "Corporate lunch, directieborrel en board meeting catering op De Wieken. Vanaf €7,50 p.p.",
        areaServed: ["De Wieken", "Amersfoort"],
      })} />
      <JsonLd data={buildFaqPage(faqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={buildBreadcrumbList([
        { name: "Home", item: "/" },
        { name: "Catering Amersfoort", item: "/services/catering" },
        { name: "De Wieken", item: "/catering-amersfoort/de-wieken" },
      ])} />

      <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
        <header className="text-center mb-12 max-w-3xl mx-auto">
          <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
            Corporate catering op De Wieken
          </p>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
            Catering De Wieken Amersfoort
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Executive lunch, directieborrel en board meeting catering op De Wieken — bereid in onze
            restaurantkeuken op Kamp 8, 10 min rijden. Vanaf €7,50 p.p.
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Briefcase className="h-5 w-5" />
                  <CardTitle className="text-lg">Executive-grade lunch</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Premium Lunch Boxes (€18,50) en chef's choice arrangementen voor board meetings en
                directiemomenten.
              </CardContent>
            </Card>
            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Clock className="h-5 w-5" />
                  <CardTitle className="text-lg">Na-werk-events</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Directieborrel en kwartaalborrel tot 19:00. Charcuterie, kaas, warme hapjes en
                serveerbegeleiding op aanvraag.
              </CardContent>
            </Card>
            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Building2 className="h-5 w-5" />
                  <CardTitle className="text-lg">HQ-stijl panden</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Ervaring met grote moderne kantoorpanden — strakke laad-los-coördinatie met receptie.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12 space-y-6">
          <Card className="rounded-2xl border p-6 sm:p-8">
            <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
              Het corporate catering-profiel van De Wieken
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                De Wieken is het meest recente moderne kantorengebied van Amersfoort, ingeklemd
                tussen De Hoef en Vathorst met directe A28/A1 aansluiting. Het profiel is distinct:
                modernere panden, grotere floorplates, veel HQ-stijl kantoren en directiekantoren.
                Dat betekent ander catering-gedrag dan bij De Hoef (kleinere mkb) of Vathorst
                (retail/logistiek).
              </p>
              <p>
                Onze typische catering-brief voor De Wieken-klanten bestaat uit drie formats:
                (1) Executive lunch — Premium Lunch Box (€18,50 p.p.) voor board meetings en
                externe gasten, inclusief wijnbegeleiding op aanvraag. (2) Recurring weekly lunch
                contracts — vanaf 15 personen, menu-rotatie per week. (3) Kwartaal- en
                directieborrels — charcuterie, kaas, warme hapjes, serveerbegeleiding op locatie.
              </p>
              <p>
                Vanaf Kamp 8 rijden we De Wieken in ongeveer 10 minuten. We coördineren laden/lossen
                vooraf met receptie (ingang, verdieping, contactpersoon) zodat je directie-lunch
                strak binnen het geplande venster zit — zonder geregel tijdens de meeting.
              </p>
            </div>
          </Card>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <Card className="rounded-2xl border p-6 sm:p-8">
            <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
              Prijzen voor corporate catering op De Wieken
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <ul className="space-y-1 text-sm">
                <li><strong className="text-foreground">€13,50–€14,50 p.p.</strong> — Office Lunch Box (Veggie / Classic)</li>
                <li><strong className="text-foreground">€18,50 p.p.</strong> — Premium Lunch Box (wrap + salade + charcuterie/kaas + dessert), board meeting-waardig</li>
                <li><strong className="text-foreground">€45 p.p.</strong> — Chef's Choice arrangement (directieborrel of board dinner, 7+ personen)</li>
                <li><strong className="text-foreground">+€28 p.p.</strong> — Bijpassend wijnarrangement</li>
                <li><strong className="text-foreground">€15–€25 p.p.</strong> — Kwartaalborrel met charcuterie, kaas, warme hapjes</li>
                <li><strong className="text-foreground">€45/uur p/p</strong> — Service-medewerkers op locatie (min. 3 uur)</li>
              </ul>
              <p className="text-xs">
                Alle prijzen inclusief bezorging op De Wieken (~10 min vanaf Kamp 8), exclusief BTW bij
                zakelijke factuur. Zie{" "}
                <Link href="/catering-amersfoort/prijzen" className="underline hover:text-foreground">de volledige prijsgids</Link>.
              </p>
            </div>
          </Card>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <Card className="rounded-2xl border p-6 sm:p-8 bg-primary/5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-headline text-2xl tracking-tight">
                  Corporate catering in De Wieken bespreken?
                </h2>
                <p className="text-muted-foreground mt-2">
                  Board meeting, directieborrel of weekly lunch — wij plannen mee.
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
            Veelgestelde vragen — catering De Wieken
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
            <Link href="/catering-amersfoort/de-hoef" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>De Hoef</Link>
            <Link href="/catering-amersfoort/vathorst" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>Vathorst</Link>
            <Link href="/catering-amersfoort/de-brand" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>De Brand</Link>
            <Link href="/catering-amersfoort/centrum" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>Centrum</Link>
            <Link href="/catering-amersfoort/prijzen" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>Prijzen 2026</Link>
          </div>
        </section>
      </div>
    </>
  );
}
