// src/app/services/consulting/page.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, CheckCircle, ClipboardCheck, Shield, Timer } from "lucide-react";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Restaurant consulting in Amersfoort, Utrecht en Zwolle | Jezza Cooks",
  description:
    "Restaurant consulting voor restaurants en horecateams. Menukaart optimaliseren, food cost controle, prepplanning, werkinstructies en teamtraining. Praktisch, uitvoerbaar en gericht op rust op de vloer.",
  openGraph: {
    title: "Restaurant consulting | Jezza Cooks",
    description:
      "Meer grip op marge en rust op de vloer met menukaart optimaliseren, food cost controle, prepplanning, werkinstructies en teamtraining. Amersfoort, Utrecht en Zwolle.",
    type: "website",
  },
};

type Value = { title: string; body: string };
type Block = { title: string; bullets: readonly string[] };
type FAQ = { q: string; a: string };

const heroImage = PlaceHolderImages.find((p) => p.id === "consulting-hero");

const values: Value[] = [
  {
    title: "First Principles Thinking",
    body: "Geen standaard advies. We halen het probleem uit elkaar en bouwen een simpel systeem dat in jouw zaak werkt.",
  },
  {
    title: "Structure Creates Freedom",
    body: "Als prep, rollen en routines kloppen, stijgt de kwaliteit en daalt de stress. Dan wordt service weer leuk.",
  },
  {
    title: "Experience Sells",
    body: "Eten, service en communicatie moeten één lijn zijn. Dan voelen gasten het en gaan ze je aanraden.",
  },
];

const packages: Block[] = [
  {
    title: "Menukaart en pricing",
    bullets: [
      "Analyse op verkoop, marge en prep impact",
      "Kaartstructuur die sneller werkt in service",
      "Porties en kostprijs als basis voor duidelijke prijzen",
    ] as const,
  },
  {
    title: "Keuken structuur",
    bullets: [
      "Prepplanning per dag met stationsheets",
      "Pass afspraken, tempo en checks",
      "Overdracht tussen shifts zodat je niet opnieuw begint",
    ] as const,
  },
  {
    title: "Team en werkwijze",
    bullets: [
      "Werkinstructies die kort zijn en gebruikt worden",
      "Open en close checklist voor keuken en vloer",
      "Training in kleine stukken zodat het blijft hangen",
    ] as const,
  },
];

const whoFor: readonly string[] = [
  "Je maakt goed eten, maar het kost te veel energie om het elke service te herhalen.",
  "Je hebt stress rond prep, porties, planning en afspraken in het team.",
  "Je wilt minder brandjes en meer grip op marge en uitvoering.",
] as const;

const notFor: readonly string[] = [
  "Als je alleen iets wilt lezen en daarna niets wilt aanpassen.",
  "Als je denkt dat meer personeel een systeemprobleem oplost.",
  "Als je geen basis cijfers wilt bekijken, zoals food cost en loonkosten.",
] as const;

const faqs: FAQ[] = [
  {
    q: "Wat doet een restaurant consultant precies?",
    a: "Ik help je team beter draaien met structuur die werkt tijdens echte service. Denk aan menukaart optimaliseren, food cost controle, prepplanning, werkinstructies en training. Het doel is meer grip, minder stress en betere marge.",
  },
  {
    q: "Kun je food cost verlagen zonder kwaliteit te verlagen?",
    a: "Ja. Het lek zit meestal in porties, recepturen, waste en wisselende prep. Als je daar afspraken op zet en ze herhaalt, daalt je food cost terwijl kwaliteit gelijk blijft of beter wordt.",
  },
  {
    q: "Werk je op locatie in Amersfoort, Utrecht en Zwolle?",
    a: "Ja. Op locatie zie je sneller waar het schuurt in prep en service. Online kan ook voor menukaart analyse, kostprijs en werkinstructies. We kiezen wat het snelst resultaat geeft.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Restaurant consulting",
  description:
    "Restaurant consulting voor meer marge en rust op de vloer. Menukaart optimaliseren, food cost controle, prepplanning, werkinstructies en teamtraining.",
  areaServed: ["Amersfoort", "Utrecht", "Zwolle", "Nederland"],
  provider: { "@type": "Person", name: "Jeremy Arrascaeta" },
  serviceType: [
    "Restaurant consulting",
    "Menukaart optimaliseren",
    "Food cost controle",
    "Prepplanning",
    "Werkinstructies",
    "Teamtraining",
  ],
};

const surface =
  "rounded-3xl bg-background/55 border border-border/35 transition duration-300";
const surfaceHover =
  "hover:bg-background/65 hover:border-border/55 hover:shadow-[0_18px_70px_rgba(0,0,0,0.35)]";

function Section({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-12 md:py-20", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">{title}</h2>
          {subtitle ? (
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function BulletItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
      <span className="text-sm md:text-base">{text}</span>
    </li>
  );
}

export default function ConsultingPage() {
  return (
    <div className="relative">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/10 to-transparent" />

      {/* HERO */}
      <section className="relative border-b border-border/60 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            {/* Copy */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="rounded-full px-3 py-1">
                  Amersfoort
                </Badge>
                <Badge variant="outline" className="rounded-full px-3 py-1">
                  Utrecht
                </Badge>
                <Badge variant="outline" className="rounded-full px-3 py-1">
                  Zwolle
                </Badge>
                <Badge variant="outline" className="rounded-full px-3 py-1">
                  Op locatie en online
                </Badge>
              </div>

              <p className="mt-5 font-headline text-primary text-sm font-bold tracking-widest uppercase">
                Level up the chaos.
              </p>

              <h1 className="mt-2 font-headline text-3xl md:text-5xl font-bold tracking-tight">
                Restaurant consulting die je team kan uitvoeren
              </h1>

              <p className="mt-3 text-base md:text-lg text-muted-foreground">
                Don&apos;t chase perfection. Chase improvement.
              </p>

              <p className="mt-4 text-base md:text-xl text-muted-foreground leading-relaxed">
                Minder brandjes, meer grip. We maken je menukaart logischer, je prep strakker en je team duidelijker.
                Zodat service rustiger wordt en je cijfers kloppen.
              </p>

              <ul className="mt-6 space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                  <span>Menukaart, porties en cost control die je elke dag kunt herhalen</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                  <span>Prepplanning en werkinstructies die passen bij drukte</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                  <span>Teamtraining die blijft hangen omdat het kort en praktisch is</span>
                </li>
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/free-diagnosis"
                  className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
                >
                  Start de gratis diagnose <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold")}
                >
                  Bekijk tarieven
                </Link>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                Je vult snel in. Ik reageer persoonlijk met drie stappen die je deze week kunt uitvoeren.
              </p>
            </div>

            {/* Image */}
            <div className={cn(surface, "relative overflow-hidden")}>
              <div className="relative aspect-[4/3] md:aspect-[3/4]">
                {heroImage ? (
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    priority
                    sizes="(min-width: 768px) 50vw, 100vw"
                    data-ai-hint={heroImage.imageHint}
                  />
                ) : (
                  <div className="absolute inset-0 bg-card" />
                )}

                {/* Subtle grade, no text on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <Section title="Hoe ik werk" subtitle="Kort en duidelijk. Dit is de basis van mijn aanpak.">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title} className={cn(surface, surfaceHover, "h-full")}>
              <CardHeader>
                <CardTitle className="font-headline text-xl md:text-2xl text-primary">
                  {v.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                {v.body}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* PACKAGES + FIT */}
      <Section
        title="Wat je krijgt"
        subtitle="Openklappen, scannen, door. Geen muur van tekst."
        className="border-t border-border/60 bg-card/15"
      >
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Card className={cn(surface, "bg-background/45")}>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Deliverables</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {packages.map((p, i) => (
                    <AccordionItem value={`pack-${i}`} key={p.title}>
                      <AccordionTrigger className="text-left font-semibold text-base md:text-lg hover:no-underline">
                        {p.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        <ul className="mt-2 space-y-3">
                          {p.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-3">
                              <ClipboardCheck className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                              <span className="text-sm md:text-base">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="mt-6">
                  <Link
                    href="/free-diagnosis"
                    className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center")}
                  >
                    Start de diagnose <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className={cn(surface, "bg-card/20")}>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Past goed als</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {whoFor.map((x) => (
                    <BulletItem key={x} text={x} />
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className={cn(surface, "bg-card/20")}>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Past niet als</CardTitle>
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
      </Section>

      {/* TRUST + CTA */}
      <section className="py-12 md:py-20 border-t border-border/60">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Card className={cn(surface, surfaceHover, "bg-background/45")}>
              <CardHeader>
                <CardTitle className="font-headline text-2xl md:text-3xl">
                  Start klein. Test het in je service.
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                <p>
                  Ik zet geen cijfers of quotes online als ik ze niet netjes kan onderbouwen.
                  Wat je wel krijgt is een aanpak en tools die je direct kunt testen in je service.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  <div className={cn(surface, "bg-card/15 p-5")}>
                    <div className="flex items-center gap-2 font-headline text-lg font-bold text-foreground">
                      <Timer className="h-5 w-5 text-primary" /> Snel
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Je bent snel klaar. Geen verhaal typen.
                    </p>
                  </div>

                  <div className={cn(surface, "bg-card/15 p-5")}>
                    <div className="flex items-center gap-2 font-headline text-lg font-bold text-foreground">
                      <Shield className="h-5 w-5 text-primary" /> Privé
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Geen mailinglijst. Alleen een persoonlijke reactie.
                    </p>
                  </div>

                  <div className={cn(surface, "bg-card/15 p-5")}>
                    <div className="flex items-center gap-2 font-headline text-lg font-bold text-foreground">
                      <ClipboardCheck className="h-5 w-5 text-primary" /> Concreet
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Drie acties die je deze week kunt uitvoeren.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/free-diagnosis"
                    className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
                  >
                    Start de gratis diagnose <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/pricing"
                    className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold")}
                  >
                    Bekijk tarieven
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 border-t border-border/60 bg-card/15">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center font-headline text-3xl md:text-4xl font-bold">
            Veelgestelde vragen
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
