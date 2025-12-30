// src/app/results/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export const metadata: Metadata = {
  title: "Resultaten | Jezza Cooks | Wat je kunt verwachten",
  description:
    "Wat je kunt verwachten van Jezza Cooks: meer grip op food cost en marge, rust in prep en service, en restaurant websites die je verhaal helder maken en aanvragen helpen binnenhalen.",
  openGraph: {
    title: "Resultaten | Jezza Cooks",
    description:
      "Meer grip op je cijfers, rust op de vloer en een website die duidelijk verkoopt. Dit is wat we bouwen met systemen die je team kan uitvoeren.",
    type: "website",
  },
};

type Outcome = {
  title: string;
  headline: string;
  body: string;
  points: string[];
  href: string;
  cta: string;
  image: { src: string; alt: string; hint: string; };
};

const HERO_IMAGE_DATA = PlaceHolderImages.find(p => p.id === 'consulting-hero');
const PROOF_IMAGE_DATA = PlaceHolderImages.find(p => p.id === 'about-jezza');


const outcomes: Outcome[] = [
  {
    title: "Marge en food cost",
    headline: "Meer grip op je cijfers",
    body:
      "We maken je kostprijs per gerecht zichtbaar, brengen portionering terug naar duidelijke afspraken en pakken waste aan. Niet met dikke rapporten, maar met routines die je team echt gebruikt.",
    points: [
      "Recepturen en portionering terug naar vaste afspraken",
      "Menukaart keuzes die logisch draaien in prep",
      "Voorraad en inkoop in een simpel ritme",
    ],
    href: "/services/consulting",
    cta: "Bekijk restaurant consulting",
    image: {
      src: PlaceHolderImages.find(p => p.id === 'service-consulting')?.imageUrl || '',
      alt: PlaceHolderImages.find(p => p.id === 'service-consulting')?.description || '',
      hint: PlaceHolderImages.find(p => p.id === 'service-consulting')?.imageHint || '',
    },
  },
  {
    title: "Prep en service",
    headline: "Rust op de vloer",
    body:
      "Drukte blijft. Paniek hoeft niet. We bouwen een prepplan, heldere rollen en werkafspraken die je in een druk moment ook kunt volgen. Daardoor wordt kwaliteit consistenter en shifts voelen lichter.",
    points: [
      "Prepplanning die past bij je covers",
      "Rolverdeling die iedereen snapt",
      "Checklists en werkafspraken die je volhoudt",
    ],
    href: "/services/consulting",
    cta: "Zo bouwen we structuur",
    image: {
        src: PlaceHolderImages.find(p => p.id === 'consulting-hero')?.imageUrl || '',
        alt: PlaceHolderImages.find(p => p.id === 'consulting-hero')?.description || '',
        hint: PlaceHolderImages.find(p => p.id === 'consulting-hero')?.imageHint || '',
      },
  },
  {
    title: "Restaurant websites",
    headline: "Een website die duidelijk verkoopt",
    body:
      "Ik bouw restaurant websites zodat je verhaal klopt. Goede foto’s, menu, openingstijden en contact staan op de juiste plek. Reserveren of aanvragen voelt logisch voor je gast.",
    points: [
      "Premium visitekaartje dat vertrouwen geeft",
      "Duidelijke actieknoppen voor reserveren of contact",
      "Basis Google vindbaarheid netjes geregeld",
    ],
    href: "/services/websites",
    cta: "Bekijk restaurant websites",
    image: {
        src: PlaceHolderImages.find(p => p.id === 'service-websites')?.imageUrl || '',
        alt: PlaceHolderImages.find(p => p.id === 'service-websites')?.description || '',
        hint: PlaceHolderImages.find(p => p.id === 'service-websites')?.imageHint || '',
      },
  },
];

const deliverables = [
  {
    title: "Je krijgt iets wat je team kan uitvoeren",
    body:
      "Geen advies dat alleen werkt als jij ernaast staat. We maken afspraken die een medewerker ook snapt op een druk moment.",
  },
  {
    title: "Een heldere prioriteitenlijst",
    body:
      "Wat eerst, wat later. We kiezen de paar dingen die direct effect hebben en bouwen vanaf daar.",
  },
  {
    title: "Een werkritme dat je volhoudt",
    body:
      "Kleine verbeteringen die je elke week herhaalt. Dat is hoe je vooruit gaat zonder dat het na twee weken wegzakt.",
  },
];

const quickWins = [
  "Je weet precies wat eerst moet (en wat even niet).",
  "De dag voelt minder zwaar door duidelijke rollen en timing.",
  "Je ziet waar je marge weglekt zonder dat het meer administratie wordt.",
];

const monthOutcome = [
  "Een prioriteitenplan voor 30 dagen dat je echt kunt uitvoeren.",
  "Werkafspraken en checklists die je team herhaalt zonder discussie.",
  "Een basis die je kunt meten en blijven verbeteren.",
];

const cardShell =
  "group relative overflow-hidden rounded-3xl border border-border/55 bg-card/25 " +
  "shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md ring-1 ring-white/5 " +
  "transition duration-300 hover:bg-card/35 hover:border-border/75 hover:shadow-[0_28px_90px_rgba(0,0,0,0.42)] " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

function OutcomeCard({ o }: { o: Outcome }) {
  return (
    <div className={cardShell}>
      {/* Image header */}
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={o.image.src}
          alt={o.image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover opacity-90"
          priority={false}
          data-ai-hint={o.image.hint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/35 to-transparent" />
        <div className="absolute left-5 top-5 inline-flex items-center rounded-full border border-border/40 bg-background/30 px-3 py-1 text-xs font-semibold text-foreground/90">
          {o.title}
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        <h3 className="font-headline text-2xl md:text-3xl font-bold text-foreground">
          {o.headline}
        </h3>

        <p className="mt-3 text-muted-foreground leading-relaxed">{o.body}</p>

        <ul className="mt-5 space-y-2 text-muted-foreground">
          {o.points.map((p) => (
            <li key={p} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        {/* Lichter: 1 knop + 1 kleine link */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={o.href}
            className={cn(buttonVariants({ size: "lg" }), "font-semibold rounded-2xl")}
          >
            {o.cta}
          </Link>

          <Link
            href="/free-diagnosis"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/85 hover:text-foreground transition"
          >
            Start gratis diagnose <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Subtle hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(900px_280px_at_20%_0%,hsla(var(--primary)/0.16),transparent_60%)]" />
      </div>
    </div>
  );
}

function StickyCtaBar({ phone }: { phone?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pb-4">
        <div className="rounded-3xl border border-border/40 bg-background/35 backdrop-blur-md px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground">
              Kort en scherp. Dan weet je binnen 24 uur waar je winst zit.
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Link
                href="/free-diagnosis"
                className={cn(buttonVariants({ size: "lg" }), "font-semibold rounded-2xl")}
              >
                Start gratis diagnose <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "font-semibold rounded-2xl"
                )}
              >
                Contact
              </Link>

              {phone ? (
                <a
                  href={`tel:${phone}`}
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "font-semibold rounded-2xl"
                  )}
                >
                  Bel
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  // Optioneel: leeg laten als je dit niet wil tonen
  const PHONE = ""; // bijv. +31612345678

  return (
    <div className="relative pb-28">
      <PageHeader
        title="Wat je kunt verwachten"
        subtitle="Geen grote claims op basis van verzonnen cijfers. Wel een aanpak die je team kan uitvoeren en die je deze week al voelt."
      />

      {/* Premium hero band (approachable) */}
      <section className="relative border-b border-border/60">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          {HERO_IMAGE_DATA && <Image
            src={HERO_IMAGE_DATA.imageUrl}
            alt={HERO_IMAGE_DATA.description}
            fill
            sizes="100vw"
            className="object-cover opacity-[0.22]"
            priority={false}
            data-ai-hint={HERO_IMAGE_DATA.imageHint}
          />}
          <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/25 to-background/85" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_15%_10%,hsla(var(--primary)/0.10),transparent_60%)]" />
        </div>

        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="mx-auto max-w-5xl rounded-3xl border border-border/45 bg-background/35 p-7 md:p-9 backdrop-blur-md">
            <h2 className="font-headline text-2xl md:text-4xl font-bold">
              Je koopt geen advies. Je koopt rust en controle.
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed max-w-3xl">
              Ik help je de chaos te vertalen naar duidelijke afspraken, een haalbare dagstructuur
              en keuzes die je marge beschermen. Zonder poeha, zonder dikke rapporten.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-border/45 bg-background/25 p-5">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Wat je binnen 7 dagen merkt
                </div>
                <ul className="mt-3 space-y-2">
                  {quickWins.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-sm text-foreground/90"
                    >
                      <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-md border border-border/45 bg-background/20">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </span>
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border/45 bg-background/25 p-5">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Wat je binnen 30 dagen hebt
                </div>
                <ul className="mt-3 space-y-2">
                  {monthOutcome.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-sm text-foreground/90"
                    >
                      <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-md border border-border/45 bg-background/20">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </span>
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/free-diagnosis"
                className={cn(buttonVariants({ size: "lg" }), "font-semibold rounded-2xl")}
              >
                Start de gratis diagnose
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "font-semibold rounded-2xl"
                )}
              >
                Bekijk opties
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {outcomes.map((o) => (
            <OutcomeCard key={o.title} o={o} />
          ))}
        </div>

        {/* Premium proof image strip */}
        <div className="mt-12 md:mt-16 overflow-hidden rounded-3xl border border-border/45 bg-card/25">
          <div className="relative h-56 md:h-64">
            {PROOF_IMAGE_DATA && <Image
              src={PROOF_IMAGE_DATA.imageUrl}
              alt={PROOF_IMAGE_DATA.description}
              fill
              sizes="100vw"
              className="object-cover opacity-85"
              priority={false}
              data-ai-hint={PROOF_IMAGE_DATA.imageHint}
            />}
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/45 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_10%,hsla(var(--primary)/0.12),transparent_60%)]" />
            <div className="absolute left-7 top-7 max-w-xl">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Premium, maar toegankelijk
              </div>
              <h3 className="mt-2 font-headline text-2xl md:text-3xl font-bold">
                Geen show. Wel uitvoering.
              </h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                Als je dit leest, weet je al waar het wringt. Ik help je het simpel maken,
                zodat je team het ook echt volhoudt.
              </p>
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <div className="mt-12 md:mt-16 grid gap-6 md:grid-cols-3">
          {deliverables.map((d) => (
            <div
              key={d.title}
              className="rounded-3xl border border-border/45 bg-background/30 p-7"
            >
              <h3 className="font-headline text-xl md:text-2xl font-bold">{d.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>

        {/* Honest note */}
        <div className="mt-12 rounded-3xl border border-border/45 bg-background/30 p-7 md:p-8">
          <h3 className="font-headline text-2xl md:text-3xl font-bold">
            Waarom je hier geen klantnamen en percentages ziet
          </h3>
          <p className="mt-3 text-muted-foreground leading-relaxed max-w-3xl">
            Ik ga geen resultaten claimen die ik niet kan onderbouwen op deze pagina. Wat ik wel
            doe: je situatie scherp krijgen en je drie concrete stappen sturen die je direct kunt
            testen. Als het werkt, bouwen we door. Zo simpel is het.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/free-diagnosis"
              className={cn(buttonVariants({ size: "lg" }), "font-semibold rounded-2xl")}
            >
              Start de gratis diagnose
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "font-semibold rounded-2xl"
              )}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      <StickyCtaBar phone={PHONE || undefined} />
    </div>
  );
}
