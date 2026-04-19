// src/app/catering-amersfoort/de-brand/page.tsx
//
// Neighborhood catering landing page — De Brand. Mixed retail + hotels +
// kantoorpanden. Near A28. Profile: mix of retail training events, hotel-team
// catering, and medium-size office lunch. Shorter reach than De Hoef (~8 min).

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
import { Hotel, ShoppingBag, Truck, UtensilsCrossed } from "lucide-react";

export const metadata: Metadata = {
  title: "Catering De Brand Amersfoort | Retail & Hotel Catering | Tafelaar × Jezza Cooks",
  description:
    "Catering op De Brand Amersfoort: office lunch, retail training en hotel group catering. Vanaf €7,50 p.p., bereid in restaurantkeuken Kamp 8 — 8 min rijden.",
  alternates: { canonical: "/catering-amersfoort/de-brand" },
  openGraph: {
    title: "Catering De Brand — Retail & Hotel Catering Amersfoort",
    description: "Catering op De Brand vanaf €7,50 p.p. — retail events, hotel catering en office lunch.",
  },
  keywords: [
    "catering de brand",
    "catering de brand amersfoort",
    "hotel catering amersfoort",
    "retail training catering",
    "office lunch de brand",
    "bedrijfscatering de brand",
  ],
};

const faqs = [
  {
    q: "Bezorgen jullie catering op De Brand?",
    a: "Ja. De Brand ligt dicht tegen het centrum aan — ongeveer 8 minuten rijden vanaf onze restaurantkeuken op Kamp 8. Korte route betekent de versste lunch van alle Amersfoortse bedrijventerreinen. Standaard lunch-window 11:30–12:30, maar omdat de rijtijd kort is kunnen we ook laat-afgesproken ontbijt- of late-lunch momenten aan.",
  },
  {
    q: "Welke soort bedrijven/organisaties zit er op De Brand?",
    a: "De Brand is een gemengd gebied — retail-panden, meerdere hotels, en een mix van middelgrote kantoorpanden. Dat maakt het catering-profiel breder: retail training dagen (bv. voor personeel van winkelketens), groepscatering voor hotelgasten of congresgangers, en reguliere office lunch voor de aanwezige mkb-kantoren.",
  },
  {
    q: "Cateren jullie ook voor hotels op De Brand?",
    a: "Ja. We werken met een aantal hotels in Amersfoort voor overloop-catering — bijvoorbeeld als een groep meer gasten heeft dan de hotelkeuken tegelijk kan bedienen, of als een congres een externe catering-partner wil. Walking dinners, conference breakfasts en lunch-break-boxes voor 50–150 personen zijn standaard formats.",
  },
  {
    q: "Kunnen jullie een retail training dag cateren?",
    a: "Zeker. Retail training dagen hebben een distinct profiel: vroege ochtend-koffie + gebak (vanaf 08:30), mid-morning bite (10:30), lunch (12:30), en vaak afsluitend borrelhapjes (16:00). Wij plannen dit als één geïntegreerd pakket zodat de organisatie één aanspreekpunt heeft. Vraag naar het Full Day Retail Training pakket voor prijs en opties.",
  },
  {
    q: "Hoe snel kunnen jullie een spoed-order naar De Brand doen?",
    a: "Vanwege de korte rijtijd (~8 min) zijn spoedorders naar De Brand vaak mogelijk tot 24–48 uur van tevoren voor lunchboxen en sandwiches. Bel +31 6 34127992 voor actuele beschikbaarheid; we kijken direct of we de order kunnen inplannen.",
  },
];

export default function CateringDeBrandPage() {
  return (
    <>
      <JsonLd data={buildServicePage({
        slug: "catering-amersfoort/de-brand",
        name: "Catering De Brand Amersfoort",
        description: "Office lunch, retail training catering en hotel group catering op De Brand. Vanaf €7,50 p.p.",
        areaServed: ["De Brand", "Amersfoort"],
      })} />
      <JsonLd data={buildFaqPage(faqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={buildBreadcrumbList([
        { name: "Home", item: "/" },
        { name: "Catering Amersfoort", item: "/services/catering" },
        { name: "De Brand", item: "/catering-amersfoort/de-brand" },
      ])} />

      <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
        <header className="text-center mb-12 max-w-3xl mx-auto">
          <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
            Catering op De Brand
          </p>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
            Catering De Brand Amersfoort
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Office lunch, retail training en hotel group catering op De Brand — 8 minuten vanaf
            Kamp 8, dus de versste lunch van de stad. Vanaf €7,50 p.p.
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <ShoppingBag className="h-5 w-5" />
                  <CardTitle className="text-lg">Retail training dag</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Ontbijt + bite + lunch + borrel als één geïntegreerd full-day pakket voor retail
                opleidingsdagen.
              </CardContent>
            </Card>
            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Hotel className="h-5 w-5" />
                  <CardTitle className="text-lg">Hotel overloop-catering</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Voor groepen die groter zijn dan de hotelkeuken tegelijk kan bedienen, of congressen
                met externe catering.
              </CardContent>
            </Card>
            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Truck className="h-5 w-5" />
                  <CardTitle className="text-lg">8 min = spoedorders</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                De kortste route van alle Amersfoortse bedrijventerreinen. Spoedorders vaak mogelijk
                tot 24–48 uur vooraf.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12 space-y-6">
          <Card className="rounded-2xl border p-6 sm:p-8">
            <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
              Het mixed-use profiel van De Brand
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                De Brand is een gemengd gebied tegen de rand van het Amersfoortse centrum aan — je
                hebt hier retail-panden, meerdere hotels, een bioscoop, en een mix van middelgrote
                kantoorpanden. Die mix maakt het catering-profiel breder dan puur office-gericht.
                Wij leveren hier regelmatig drie distinct types catering naast elkaar.
              </p>
              <p>
                <strong className="text-foreground">Retail training catering</strong> — opleidingsdagen
                voor winkelpersoneel of franchisenemers. Ontbijt (08:30), mid-morning bite (10:30),
                lunch (12:30), afsluitende borrelhapjes (16:00). We plannen dit als één geïntegreerd
                full-day pakket met één aanspreekpunt.
              </p>
              <p>
                <strong className="text-foreground">Hotel group catering</strong> — groepen die groter
                zijn dan de hotelkeuken tegelijk kan bedienen, of congressen waar de organisator
                een externe catering-partner wil naast de hotel-F&B. Walking dinners, conference
                breakfast-carts en lunch-break-boxes voor 50–150 personen.
              </p>
              <p>
                <strong className="text-foreground">Office lunch</strong> — regulier pakket voor de
                middelgrote kantoren op De Brand. Zelfde prijzen als elders in Amersfoort: boxes
                €13,50–€18,50 p.p., sandwiches/wraps €7,50, bowls €10,50. Voor De Brand is de
                korte rijtijd (8 min) een voordeel voor last-minute spoed-orders.
              </p>
            </div>
          </Card>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <Card className="rounded-2xl border p-6 sm:p-8 bg-primary/5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-headline text-2xl tracking-tight">Catering op De Brand plannen?</h2>
                <p className="text-muted-foreground mt-2">
                  Vertel ons datum, type event en aantal personen — wij maken een voorstel.
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
            Veelgestelde vragen — catering De Brand
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
            <Link href="/catering-amersfoort/centrum" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>Amersfoort Centrum</Link>
            <Link href="/catering-amersfoort/prijzen" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>Prijzen 2026</Link>
          </div>
        </section>
      </div>
    </>
  );
}
