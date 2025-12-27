// src/app/services/consulting/page.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  ArrowRight,
  Calculator,
  ClipboardList,
  UtensilsCrossed,
  CheckCircle,
} from "lucide-react";

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

type PlaceholderImage = (typeof PlaceHolderImages)[number];
const heroImage = PlaceHolderImages.find(
  (p) => p.id === "consulting-hero"
) as PlaceholderImage | undefined;

// Zet je echte logo hier (public folder). Voorbeeld: /brand/jezza-logo-gold.png
const LOGO_SRC = "/pics/logo.png";

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
    title: "Food cost control",
    bullets: [
      "Portie discipline, recepturen en waste punten",
      "Inkoopritme met simpele checks",
      "Rapportage die je volhoudt, niet één keer per maand",
    ] as const,
  },
  {
    title: "SOPs en processen",
    bullets: [
      "Werkinstructies die kort zijn en gebruikt worden",
      "Open en close checklist voor keuken en vloer",
      "Training in kleine stukken zodat het blijft hangen",
    ] as const,
  },
];

const faqs: FAQ[] = [
  {
    q: "Wat doet een restaurant consultant precies?",
    a: "Ik help je team beter draaien met structuur die werkt tijdens echte service. Denk aan menukaart optimaliseren, food cost control, prepplanning, werkinstructies en training. Het doel is meer grip, minder stress en betere marge.",
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
    "Restaurant consulting voor meer marge en rust op de vloer. Menukaart optimaliseren, food cost control, prepplanning, werkinstructies en teamtraining.",
  areaServed: ["Amersfoort", "Utrecht", "Zwolle", "Nederland"],
  provider: { "@type": "Person", name: "Jeremy Arrascaeta" },
  serviceType: [
    "Restaurant consulting",
    "Menukaart optimaliseren",
    "Food cost control",
    "Prepplanning",
    "Werkinstructies",
    "Teamtraining",
  ],
};

const panel = "rounded-[34px] border border-border/35 bg-card/10 overflow-hidden";
const panelInner =
  "bg-gradient-to-b from-background/40 via-background/20 to-background/40";
const softGlow = "shadow-[0_0_90px_hsl(var(--primary)/0.12)]";

const cardBase =
  "rounded-2xl border border-border/35 bg-background/30 backdrop-blur";
const cardHover =
  "hover:bg-background/40 hover:border-border/50 hover:shadow-[0_18px_70px_rgba(0,0,0,0.35)] transition duration-300";

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
        <div className="mx-auto max-w-4xl text-center">
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

type FocusArea = { title: string; desc: string; Icon: LucideIcon };

const focusAreas: FocusArea[] = [
  {
    title: "Menu engineering",
    desc: "Optimaliseer je kaart voor hogere marge en minder frictie in prep.",
    Icon: UtensilsCrossed,
  },
  {
    title: "Food cost control",
    desc: "Grip op porties, recepturen en inkoop met ritme dat blijft werken.",
    Icon: Calculator,
  },
  {
    title: "SOPs en processen",
    desc: "Standaarden die teamconsistentie en soepelere service opleveren.",
    Icon: ClipboardList,
  },
];

function FocusCard({ area }: { area: FocusArea }) {
  const Icon = area.Icon;
  return (
    <div
      className={cn(
        "rounded-2xl border border-primary/18 bg-background/25 p-6",
        "shadow-[0_0_0_1px_hsl(var(--primary)/0.10)]"
      )}
    >
      <div className="flex items-center justify-center h-12 w-12 rounded-xl border border-primary/18 bg-background/30">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="mt-5">
        <div className="font-headline text-lg font-bold text-foreground">
          {area.title}
        </div>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {area.desc}
        </p>
      </div>
    </div>
  );
}

function HeroTop({
  image,
  logoSrc,
}: {
  image?: PlaceholderImage;
  logoSrc: string;
}) {
  return (
    <div className="relative">
      {/* Background photo spans the whole hero-top for more “real estate” */}
      {image ? (
        <Image
          src={image.imageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden="true"
          className="object-cover object-right"
        />
      ) : null}

      {/* Premium grading: make left readable, keep right clean */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-transparent md:from-background/82 md:via-background/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/18 via-transparent to-transparent" />

      {/* Optional subtle vignette for depth */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-black/10" />

      {/* Content grid: right column is mostly “breathing room” so photo feels intentional */}
      <div className="relative grid md:[grid-template-columns:1fr_1.1fr] min-h-[420px] md:min-h-[640px]">
        <div className="p-7 md:p-10 lg:p-12">
          {/* Logo top-left inside the panel */}
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 md:h-12 md:w-12">
              <Image
                src={logoSrc}
                alt="Jezza Cooks"
                width={48}
                height={48}
                className="object-contain"
                sizes="48px"
              />
            </div>
          </div>

          <div className="mt-6">
            <p className="font-headline text-primary text-sm font-bold tracking-widest uppercase">
              Don&apos;t chase perfection.
            </p>

            <h1 className="mt-3 font-headline text-3xl md:text-5xl font-bold tracking-tight">
              Chase improvement.
            </h1>

            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Zet chaos om in controle. Chef-geleide strategie voor betere marges,
              gestructureerde systemen en teamconsistentie.
            </p>

            <div className="mt-7">
              <Link
                href="/free-diagnosis"
                className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
              >
                Gratis adviesgesprek <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="mt-7 grid gap-3 max-w-xl text-muted-foreground">
              <BulletItem text="Menukaart, porties en control die je elke service herhaalt" />
              <BulletItem text="Prep, timing en afspraken die passen bij drukte" />
              <BulletItem text="Training die kort is en blijft hangen in het team" />
            </div>
          </div>
        </div>

        {/* Right side spacer: keeps the composition like your reference */}
        <div className="hidden md:block" />
      </div>
    </div>
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

      {/* HERO PANEL */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className={cn(panel, panelInner, softGlow)}>
            {/* Hero top with background photo + logo left */}
            <HeroTop image={heroImage} logoSrc={LOGO_SRC} />

            {/* focus areas bottom inside same panel */}
            <div className="px-7 pb-8 md:px-10 md:pb-10 lg:px-12 lg:pb-12">
              <div className="mt-2">
                <p className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
                  Onze focusgebieden
                </p>
                <div className="mt-3 h-px w-full bg-border/40" />
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-3">
                {focusAreas.map((area) => (
                  <FocusCard key={area.title} area={area} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <Section
        title="Hoe ik werk"
        subtitle="Kort en duidelijk. Dit is de basis van mijn aanpak."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title} className={cn(cardBase, cardHover, "h-full")}>
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

      {/* DELIVERABLES */}
      <Section
        title="Wat je krijgt"
        subtitle="Openklappen, scannen, door. Geen muur van tekst."
        className="border-t border-border/60 bg-card/10"
      >
        <div className="mx-auto max-w-4xl">
          <Card className={cn(cardBase, "bg-background/25")}>
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
                            <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                            <span className="text-sm md:text-base">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/free-diagnosis"
                  className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
                >
                  Gratis adviesgesprek <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "font-semibold"
                  )}
                >
                  Contact
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* FAQ */}
      <section className="py-12 md:py-20 border-t border-border/60 bg-card/10">
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
            <Link
              href="/free-diagnosis"
              className={cn(buttonVariants({ variant: "link" }))}
            >
              Gratis adviesgesprek <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
