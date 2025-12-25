// src/app/consulting/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageHeader from "@/components/page-header";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, TrendingUp, ClipboardCheck, Timer, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Restaurant Consulting | Menu engineering, food cost, SOP’s & teamtraining",
  description:
    "Restaurant consulting voor meer marge en rust op de vloer. Menu engineering, food cost control, prepplanning, SOP’s en teamtraining. Hands-on, uitvoerbaar, meetbaar.",
};

const deliverables = [
  {
    title: "Menu engineering + pricing plan",
    bullets: [
      "Menu mix analyse (popularity + marge per gerecht)",
      "Herbouw van kaartstructuur (logisch voor mise-en-place en verkoop)",
      "Pricing beslissingen onderbouwd (portion specs + contribution margin)",
      "Top-10 ‘money makers’ en ‘menu killers’ benoemd",
    ],
  },
  {
    title: "Food cost control (geen theorie, gewoon strak)",
    bullets: [
      "Recepturen + portion specs (wat gaat er exact op het bord)",
      "Waste-punten zichtbaar (waar lekt het elke dag)",
      "Prep discipline: wat, wanneer, hoeveel (per station)",
      "Inkoop-ritme + simpele checks (zodat het blijft werken)",
    ],
  },
  {
    title: "Prepstructuur + serviceflow",
    bullets: [
      "Prepplan per dag + stationsheets (wie doet wat, wanneer klaar)",
      "Pass/uitgifte afspraken (tempo, communicatie, checks)",
      "Station setup: mise-en-place logisch en herhaalbaar",
      "Handover ritme (zodat de volgende shift niet opnieuw begint)",
    ],
  },
  {
    title: "SOP’s & checklists die je team echt gebruikt",
    bullets: [
      "Open/close checklist (FOH/BOH) – minimum viable, maar strak",
      "10 kern-SOP’s (bijv. sauzen, mise, schoonmaak, ontvangst goederen)",
      "Duidelijke standaarden (kwaliteit, timing, plating, hygiëne)",
      "Trainingsformat: 20 min per week (korte, herhaalbare routine)",
    ],
  },
];

const kpis = [
  {
    title: "Prime cost",
    desc: "Food cost % + loonkosten % — dé realiteit van winst of stress.",
  },
  {
    title: "Food cost %",
    desc: "Portioning, waste, recepturen en inkoopafspraken in controle.",
  },
  {
    title: "Labor %",
    desc: "Rooster vs covers — geen ‘gevoel’, gewoon matchen op vraag.",
  },
  {
    title: "Covers & tempo",
    desc: "Doorlooptijd, tafelrotatie, piekbelasting, pass flow.",
  },
  {
    title: "Reviews & consistentie",
    desc: "Niet ‘leuk’, maar een meetpunt voor herhaalbaarheid van ervaring.",
  },
];

const whoFor = [
  "Restaurants, cafés, bistro’s, pubs en cateringteams die goed eten maken maar te veel chaos draaien.",
  "Eigenaren/chefs die brandjes blussen en geen grip hebben op marge, prep en teamconsistentie.",
  "Teams die klaar zijn om te implementeren: afspraken, ritme, training en checks.",
];

const notFor = [
  "Als je alleen een rapport wilt en daarna niets verandert.",
  "Als je ‘meer personeel’ ziet als oplossing voor een systeemprobleem.",
  "Als je geen cijfers wilt bekijken (zelfs niet de basics zoals food% en labor%).",
];

const howItWorks = [
  {
    n: "1",
    title: "Diagnose op de vloer (of op je cijfers)",
    body:
      "We vinden de echte bottleneck: menu killers, prep chaos, portioning, labor mismatch, serviceflow, of bookings. Niet gokken — kijken.",
  },
  {
    n: "2",
    title: "Plan + deliverables (concreet, niet vaag)",
    body:
      "Je krijgt een strak plan met deliverables: kaartstructuur, pricing, prepplan, SOP’s en training. Geen dikke rapporten. Wel werkbare tools.",
  },
  {
    n: "3",
    title: "Implementeren met het team",
    body:
      "Hands-on. We trainen op de vloer, verdelen rollen en maken afspraken die je team snapt en herhaalt. Structuur op papier → rust op de vloer.",
  },
  {
    n: "4",
    title: "Meten, bijsturen, herhalen",
    body:
      "We volgen een paar KPI’s die je volhoudt. Elke week scherp. Elke maand beter. Verbetering boven perfectie — maar wel zichtbaar.",
  },
];

const proof = [
  {
    title: "Case (voorbeeld) — Menu + prepstructuur",
    bullets: [
      "Situatie: kaart te breed, mise-chaos, inconsistentie in service",
      "Ingreep: kaart gesnoeid + top-10 dish specs + stationsheets + pass afspraken",
      "Resultaat: sneller tempo + minder waste + rust op piekmomenten",
      "Meetpunt: food cost stabieler + minder ‘firefighting’ voor eigenaar",
    ],
    note: "Vul later echte cijfers in zodra je 2–3 cases hebt (anoniem is prima).",
  },
  {
    title: "Quote (voorbeeld)",
    bullets: [
      "“Eindelijk helder wie wat doet. Service loopt strak en we hoeven niet meer te schreeuwen.”",
      "— Owner/chef, (stad) (type zaak)",
    ],
    note: "Echte quotes winnen vertrouwen. 1 zin is genoeg.",
  },
];

const faqs = [
  {
    q: "Wat doet een restaurant consultant precies?",
    a:
      "Ik help je restaurant of horecateam winstgevender en rustiger draaien door systemen te bouwen die in echte service werken: menu engineering, food cost control, prepplanning, SOP’s, teamtraining en serviceflow. Het is praktisch en uitvoerbaar — niet alleen advies.",
  },
  {
    q: "Wat is menu engineering (menukaart optimaliseren)?",
    a:
      "Menu engineering is je menukaart zo bouwen dat hij beter verkoopt én financieel klopt. We kijken naar populariteit, marge per gerecht, pricing, porties en hoe gasten kiezen. Resultaat: een kaart die logischer draait, sneller verkoopt en meer brutowinst oplevert zonder je identiteit te slopen.",
  },
  {
    q: "Kun je food cost verlagen zonder kwaliteit te verlagen?",
    a:
      "Ja. Meestal zit het lek in portion control, recepturen, mise-en-place discipline, waste en inkooproutine. Niet in ‘goedkoper inkopen’. Als je de dagelijkse lekkage dichtzet, daalt je food cost terwijl je kwaliteit gelijk blijft of zelfs stijgt.",
  },
  {
    q: "Hoe snel zie ik resultaat?",
    a:
      "Quick wins zie je vaak binnen 1–2 weken als we de grootste lekken aanpakken (portioning, waste, prepstructuur, kaartkeuzes). Daarna bouwen we systemen en training zodat het blijft plakken, niet terugzakt.",
  },
  {
    q: "Werk je in Utrecht, Amersfoort en Zwolle?",
    a:
      "Ja. Ik werk op locatie in Utrecht, Amersfoort, Zwolle en omgeving. Online kan ook, vooral voor menu engineering, costing, pricing en SOP’s. Op locatie gaat het vaak sneller omdat je de echte frictie ziet in prep en service.",
  },
  {
    q: "Wat heb je nodig om te starten?",
    a:
      "Als je het hebt: menukaart, prijzen, leveranciers/inkoop en basis cijfers (food cost, labor, covers). Heb je dat niet? Geen probleem. Dan starten we met een snelle diagnose en bouwen we vanaf daar structuur op.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Restaurant Consulting",
  description:
    "Restaurant consulting voor meer marge en rust op de vloer. Menu engineering, food cost control, prepplanning, SOP’s en teamtraining.",
  areaServed: ["Utrecht", "Amersfoort", "Zwolle", "Nederland"],
  provider: {
    "@type": "Person",
    name: "Jezza Cooks",
  },
  serviceType: [
    "Restaurant consulting",
    "Menu engineering",
    "Food cost control",
    "SOP ontwikkeling",
    "Team training",
    "Prepplanning",
  ],
};

export default function ConsultingPage() {
  return (
    <div className="relative">
      {/* Structured data for AI/Google */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/10 to-transparent" />

      <PageHeader
        title="Restaurant Consulting"
        subtitle="Meer marge. Meer controle. Rust op de vloer. Hands-on systemen die je team écht kan volgen."
      />

      {/* HERO / VALUE PROP */}
      <section className="relative border-b border-border/60 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-headline text-primary text-sm font-bold tracking-widest uppercase">
              Level up the chaos.
            </p>
            <h1 className="mt-2 font-headline text-3xl md:text-5xl font-bold tracking-tight">
              Don’t chase perfection. Chase improvement.
            </h1>

            <p className="mt-4 text-base md:text-xl text-muted-foreground leading-relaxed">
              Rust komt niet door meer personeel, maar door betere gewoontes. Daarom bouw ik teams die het kunnen herhalen —
              niet gerechten die één keer lukken. Als dat staat, krijg je organized chaos: de shift loopt strak en de kwaliteit
              blijft hoog, service na service.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/free-diagnosis"
                className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
              >
                Start gratis diagnose <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold")}
              >
                Bekijk opties & tarieven
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="outline" className="rounded-full px-3 py-1">
                Menu engineering
              </Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1">
                Food cost control
              </Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1">
                Prepplanning
              </Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1">
                SOP’s & training
              </Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1">
                Utrecht • Amersfoort • Zwolle
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* WHO FOR / NOT FOR */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-card/40">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Voor wie dit is</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {whoFor.map((x) => (
                    <li key={x} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm md:text-base">{x}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/40">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Niet voor jou als…</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {notFor.map((x) => (
                    <li key={x} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-muted-foreground shrink-0" />
                      <span className="text-sm md:text-base text-muted-foreground">{x}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="py-12 md:py-20 border-t border-border/60 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Wat ik oplever</h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              Concreet. Werkbaar. En gemaakt zodat je team het ook écht gebruikt.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {deliverables.map((d) => (
              <Card key={d.title} className="bg-background/60">
                <CardHeader>
                  <CardTitle className="font-headline text-xl md:text-2xl">{d.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {d.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <ClipboardCheck className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm md:text-base">{b}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/free-diagnosis"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "font-semibold")}
            >
              Start met de gratis diagnose <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Hoe ik werk</h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              Chaos in je hoofd → structuur op papier → rust op de vloer.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((s) => (
              <Card key={s.n} className="bg-card/40 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary font-bold">
                      {s.n}
                    </div>
                    <CardTitle className="font-headline text-xl">{s.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed">
                  {s.body}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* KPI SECTION */}
      <section className="py-12 md:py-20 border-t border-border/60 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Waar we op sturen</h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              Geen KPI-circus. Alleen cijfers die je direct helpen beslissen en bijsturen.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {kpis.map((k) => (
              <Card key={k.title} className="bg-background/60">
                <CardHeader>
                  <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {k.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed">
                  {k.desc}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Proof (zonder poeha)</h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              Dit is de plek waar we cijfers en quotes plaatsen. Geen claims zonder bewijs.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {proof.map((p) => (
              <Card key={p.title} className="bg-card/40">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm md:text-base">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-muted-foreground">{p.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 border-t border-border/60 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Wil je weten wat ik als eerste zou fixen?
            </h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              Start met de gratis diagnose: jij vult 2 minuten in, ik reageer persoonlijk met 3 concrete stappen die je deze week kunt uitvoeren.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/free-diagnosis"
                className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
              >
                Start gratis diagnose <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold")}
              >
                Bekijk tarieven
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3 text-left">
              <Card className="bg-background/60">
                <CardHeader>
                  <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <Timer className="h-5 w-5 text-primary" /> Snel
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Je bent in 2 minuten klaar. Jij hoeft geen verhaal te typen.
                </CardContent>
              </Card>

              <Card className="bg-background/60">
                <CardHeader>
                  <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" /> Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Geen mailinglijst, geen bots. Alleen een persoonlijke reactie.
                </CardContent>
              </Card>

              <Card className="bg-background/60">
                <CardHeader>
                  <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-primary" /> Concreet
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  3 acties die je deze week kunt uitvoeren. Geen vage adviezen.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center font-headline text-3xl md:text-4xl font-bold">
            Veelgestelde vragen (restaurant consulting)
          </h2>

          <Accordion type="single" collapsible className="w-full mt-8">
            {faqs.map((f, i) => (
              <AccordionItem value={`item-${i}`} key={f.q}>
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <Link href="/free-diagnosis" className={cn(buttonVariants({ variant: "link" }))}>
              Start met de gratis diagnose <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
