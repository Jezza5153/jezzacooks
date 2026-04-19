// src/app/catering-amersfoort/vathorst/page.tsx
//
// Neighborhood catering landing page — Vathorst. 58 ha, 2,034 arbeidsplaatsen,
// home to IKEA + Loods 5 + Kwantum + Gamma + a lot of retail/logistics. Newer
// than De Hoef, mixes residential + commercial, growing fast. Sweet spot for
// events (store openings, retail events, company parties) in addition to office
// lunch.

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
import { Package, Sparkles, Truck, UtensilsCrossed } from "lucide-react";

export const metadata: Metadata = {
  title: "Catering Vathorst Amersfoort | Office & Retail Events | Tafelaar",
  description:
    "Catering Vathorst: office lunch vanaf €7,50 p.p., retail events en store openings. Restaurantkeuken Kamp 8, 12 min rijden.",
  alternates: { canonical: "/catering-amersfoort/vathorst" },
  openGraph: {
    title: "Catering Vathorst — Office Lunch & Retail Events",
    description:
      "Catering in Vathorst vanaf €7,50 p.p. — office lunch, teamdagen en retail events.",
  },
  keywords: [
    "catering vathorst",
    "catering vathorst amersfoort",
    "office lunch vathorst",
    "lunch bezorgen vathorst",
    "event catering vathorst",
    "retail event catering amersfoort",
    "bedrijfslunch vathorst",
  ],
};

const faqs = [
  {
    q: "Bezorgen jullie catering in Vathorst?",
    a: "Ja. Vathorst ligt op ongeveer 12 minuten rijden vanaf onze restaurantkeuken op Kamp 8 — we nemen de A28 of gaan via Hooglanderveen afhankelijk van jouw adres. Lunch-window standaard 11:30–12:30, voor retail events of store openings leveren we op het tijdstip dat past bij jullie event-flow.",
  },
  {
    q: "Wat zijn veelvoorkomende catering-momenten in Vathorst?",
    a: "Vathorst heeft een uniek profiel — 58 ha, 2.034 arbeidsplaatsen, met grote retailers zoals IKEA, Loods 5, Kwantum en Gamma naast kantoren en woon-werk-units. Wij cateren hier office lunch voor teamvergaderingen, maar net zo vaak events: store openings, retail training dagen, klantenworkshops en zakelijke borrels. Vathorst ligt bovendien tegen de A1/A28 aan, dus aantrekkelijk voor bedrijven met bezoekers uit Amsterdam en Utrecht.",
  },
  {
    q: "Kunnen jullie catering regelen voor een retail event of winkelopening?",
    a: "Ja. Voor retail events schalen we van walk-around borrelhapjes (vanaf 30 personen) tot walking dinners (50–150 personen). We brengen borrelplanken, warme hapjes, shared-dining stations en drankenservice. Vraag naar het Chef's Choice arrangement (vanaf €45 p.p.) als je een kant-en-klaar event-paket wilt met restaurant-niveau catering.",
  },
  {
    q: "Leveren jullie ook aan Hooglanderveen en Vathorst Noord?",
    a: "Ja. Hooglanderveen en Vathorst Noord zitten in ons standaard leverbereik — reistijd vergelijkbaar met centraal Vathorst (10–13 min). Geef bij de aanvraag het exacte adres door, dan plannen we de route zodat je lunch of event strak op tijd is.",
  },
  {
    q: "Hoeveel gasten kunnen jullie cateren voor een Vathorst event?",
    a: "Van 10 personen (lunch) tot 150+ (walking dinner of borrel op locatie). Voor grotere events werken we met extra staff en mobiel materieel. Minimaal 2 weken vooruit inplannen voor events van 50+ personen — voor lunch catering van 10–40 personen is 3 werkdagen meestal voldoende.",
  },
];

export default function CateringVathorstPage() {
  return (
    <>
      <JsonLd data={buildServicePage({
        slug: "catering-amersfoort/vathorst",
        name: "Catering Vathorst Amersfoort",
        description: "Office lunch, event catering en retail event catering in Vathorst. Vanaf €7,50 p.p., bereid in restaurantkeuken Kamp 8.",
        areaServed: ["Vathorst", "Hooglanderveen", "Amersfoort"],
      })} />
      <JsonLd data={buildFaqPage(faqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={buildBreadcrumbList([
        { name: "Home", item: "/" },
        { name: "Catering Amersfoort", item: "/services/catering" },
        { name: "Vathorst", item: "/catering-amersfoort/vathorst" },
      ])} />

      <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
        <header className="text-center mb-12 max-w-3xl mx-auto">
          <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
            Catering in Vathorst
          </p>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
            Catering Vathorst Amersfoort
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Office lunch, retail event catering en walking dinners in Vathorst — vanuit onze
            restaurantkeuken op Kamp 8 in 12 minuten bezorgd. Vanaf €7,50 p.p., 10 tot 150+ personen.
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <Card className="rounded-2xl border p-4">
              <p className="text-2xl font-headline text-primary">~12 min</p>
              <p className="text-xs text-muted-foreground">Rijtijd vanaf Kamp 8</p>
            </Card>
            <Card className="rounded-2xl border p-4">
              <p className="text-2xl font-headline text-primary">58 ha</p>
              <p className="text-xs text-muted-foreground">Bedrijvengebied Vathorst</p>
            </Card>
            <Card className="rounded-2xl border p-4">
              <p className="text-2xl font-headline text-primary">2.034</p>
              <p className="text-xs text-muted-foreground">Arbeidsplaatsen</p>
            </Card>
            <Card className="rounded-2xl border p-4">
              <p className="text-2xl font-headline text-primary">150+</p>
              <p className="text-xs text-muted-foreground">Max gasten per event</p>
            </Card>
          </div>
        </section>

        <section className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-5 w-5" />
                  <CardTitle className="text-lg">Retail event specialist</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Van store openings tot klantenborrel bij IKEA/Loods 5-buren. Borrelplanken en
                walking dinner op maat.
              </CardContent>
            </Card>
            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Truck className="h-5 w-5" />
                  <CardTitle className="text-lg">Flexibele lunch-windows</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                11:30–12:30 standaard, ontbijt- of late-lunch op aanvraag. Event timing afhankelijk
                van jullie flow.
              </CardContent>
            </Card>
            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <UtensilsCrossed className="h-5 w-5" />
                  <CardTitle className="text-lg">Chef-led op locatie</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Voor events kan Jeremy (chef-kok van De Tafelaar) ter plaatse staan voor live-cooking
                stations en walking dinner service.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12 space-y-6">
          <Card className="rounded-2xl border p-6 sm:p-8">
            <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
              Waarom Vathorst een ander catering-profiel heeft
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Vathorst is het grootste en nieuwste bedrijvengebied van Amersfoort — 58 hectare,
                2.034 arbeidsplaatsen en een mix van kantoor, retail, horeca en woon-werk-units.
                Grote retailers als IKEA, Loods 5, Kwantum en Gamma zitten hier naast logistieke
                hubs en mid-size kantoren. Dat maakt het catering-profiel anders dan De Hoef of De
                Wieken: meer events, meer store openings, meer klantenbeleving-momenten, naast de
                reguliere office lunch.
              </p>
              <p>
                We rijden Vathorst vanaf Kamp 8 in ongeveer 12 minuten — via de A28 of via
                Hooglanderveen afhankelijk van jouw exacte adres. Dat houdt de kwaliteit hoog omdat
                er maar één transport-fase tussen keuken en gast zit. Geen centraal cateringcentrum
                dat vooraf inpakt en uren later levert.
              </p>
              <p>
                Voor retail-events in Vathorst hebben we drie standaard pakketten: walk-around
                borrelhapjes (€15–€25 p.p., 30+ gasten), walking dinner (€45–€65 p.p., 50–100
                gasten) en chef-led live cooking station (vanaf €65 p.p., gasten zien de chef live
                koken). Voor office lunch gelden dezelfde prijzen als in het centrum: boxes €13,50–€18,50,
                sandwiches/wraps €7,50, bowls €10,50.
              </p>
            </div>
          </Card>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <Card className="rounded-2xl border p-6 sm:p-8">
            <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
              Prijzen voor catering in Vathorst
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <ul className="space-y-1 text-sm">
                <li><strong className="text-foreground">€7,50 p.p.</strong> — Sandwich of wrap (office lunch, vanaf 10 personen)</li>
                <li><strong className="text-foreground">€10,50 p.p.</strong> — Salad bowl</li>
                <li><strong className="text-foreground">€13,50–€18,50 p.p.</strong> — Office Lunch Box (Veggie / Classic / Premium)</li>
                <li><strong className="text-foreground">€15–€25 p.p.</strong> — Walk-around borrelhapjes voor retail events (30+ gasten)</li>
                <li><strong className="text-foreground">€45–€65 p.p.</strong> — Walking dinner (50–150 gasten, 5–7 gangen)</li>
                <li><strong className="text-foreground">€65+ p.p.</strong> — Chef-led live cooking station</li>
              </ul>
              <p className="text-xs">
                Alle prijzen inclusief bezorging in Vathorst (~12 min vanaf Kamp 8), exclusief BTW bij
                zakelijke factuur. Volledige prijsgids:{" "}
                <Link href="/catering-amersfoort/prijzen" className="underline hover:text-foreground">wat kost catering in Amersfoort</Link>.
              </p>
            </div>
          </Card>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <Card className="rounded-2xl border p-6 sm:p-8 bg-primary/5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-headline text-2xl tracking-tight">
                  Catering of event plannen in Vathorst?
                </h2>
                <p className="text-muted-foreground mt-2">
                  Datum, aantal personen, adres — wij stellen een voorstel samen.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/services/catering#inquiry" className={cn(buttonVariants({ size: "lg" }), "rounded-xl")}>
                  Offerte aanvragen
                </Link>
                <a href="tel:+31634127992" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-xl")}>
                  Bel +31 6 34127992
                </a>
              </div>
            </div>
          </Card>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
            Veelgestelde vragen — catering Vathorst
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

        <section className="max-w-2xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/services/catering" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>Alle cateringopties</Link>
            <Link href="/catering-amersfoort/de-hoef" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>De Hoef</Link>
            <Link href="/catering-amersfoort/de-wieken" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>De Wieken</Link>
            <Link href="/catering-amersfoort/de-brand" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>De Brand</Link>
            <Link href="/catering-amersfoort/centrum" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>Centrum</Link>
            <Link href="/catering-amersfoort/prijzen" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}>Prijzen 2026</Link>
          </div>
        </section>
      </div>
    </>
  );
}
