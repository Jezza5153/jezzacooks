// src/app/services/seo-geo/page.tsx
//
// Landing page for the 4th service line: SEO + GEO optimization.
// GEO = Generative Engine Optimization (visibility in ChatGPT, Perplexity,
// Google AI Overviews, Gemini). This is a paid service distinct from the
// website build.
//
// Pricing is source-of-truth and must match site-config + /pricing:
//   €1.300 ex BTW per jaar  OR  €150 per maand.
//
// Content is structured for passage extraction: H2s as questions, 130-167
// word self-contained answer blocks, comparison table, FAQ schema.

import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Search,
  Sparkles,
  MapPin,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import JsonLd from "@/components/seo/json-ld";
import { buildBreadcrumbList, buildFaqPage, buildServicePage } from "@/lib/schema";
import { SITE } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "SEO & GEO optimalisatie voor horeca — Amersfoort en Nederland",
  description:
    "SEO en GEO optimalisatie voor restaurants, catering en hospitality in Amersfoort, Utrecht en heel Nederland. Rank hoger in Google én word gevonden door ChatGPT, Perplexity en Google AI Overviews. €1.300 ex BTW per jaar of €150 per maand.",
  alternates: { canonical: "/services/seo-geo" },
  openGraph: {
    title: "Horeca SEO + GEO optimalisatie | Jezza Cooks",
    description:
      "Horeca-gerichte SEO + GEO door een actieve chef-kok in Amersfoort. Zichtbaar in Google, ChatGPT, Perplexity en AI Overviews. €1.300/jaar of €150/maand.",
    url: "/services/seo-geo",
    type: "website",
  },
  keywords: [
    "SEO horeca",
    "GEO optimalisatie",
    "Generative Engine Optimization",
    "AI zichtbaarheid Nederland",
    "SEO restaurant Amersfoort",
    "horeca SEO bureau",
    "ChatGPT SEO",
    "Perplexity SEO",
    "Google AI Overviews",
    "lokale SEO Amersfoort",
    "schema markup restaurant",
    "AI answer engine optimization",
  ],
};

// ---------------------------------------------------------------------------
// Schema

const serviceSchema = buildServicePage({
  slug: "seo-geo",
  name: "SEO & GEO optimalisatie voor horeca",
  description:
    "Maandelijkse SEO en Generative Engine Optimization (GEO) voor restaurants, catering en hospitality. Zichtbaar in Google én in AI zoekmachines zoals ChatGPT, Perplexity en Google AI Overviews. Vanaf €150 per maand of €1.300 ex BTW per jaar.",
  areaServed: [
    "Amersfoort",
    "Utrecht",
    "Zwolle",
    "Hilversum",
    "Apeldoorn",
    "Amsterdam",
    "Nederland",
  ],
});

const breadcrumbSchema = buildBreadcrumbList([
  { name: "Home", item: "/" },
  { name: "Diensten", item: "/services" },
  { name: "SEO & GEO optimalisatie", item: "/services/seo-geo" },
]);

const faqs = [
  {
    q: "Wat is GEO optimalisatie en hoe verschilt het van SEO?",
    a: "SEO (Search Engine Optimization) richt zich op hoger ranken in Google, Bing en lokale zoekpakketten. GEO (Generative Engine Optimization) richt zich op zichtbaarheid in AI antwoord-engines: ChatGPT, Perplexity, Google AI Overviews, Gemini en Claude. De fundamenten overlappen (indexeerbaarheid, schema.org, autoriteit), maar GEO vraagt extra werk: passages moeten zelf-uitlegend zijn, statistieken en citaties versterken vertrouwen, en je content moet in korte antwoord-blokken geleverd worden zodat AI engines er stukken uit kunnen lichten. In 2026 triggeren AI Overviews op ~48 tot 60 procent van alle zoekopdrachten. Voor horeca-queries specifiek ging dat in 12 maanden van 10 naar 78 procent.",
  },
  {
    q: "Waarom is een horeca-specialist beter dan een generiek SEO bureau?",
    a: "Een generiek SEO bureau kent keyword research en backlinks, maar begrijpt niet hoe een menukaart leest, wat food cost is, of waarom openingstijden op zondag belangrijker zijn dan op dinsdag. Ik ben zelf chef-kok bij De Tafelaar Amersfoort en heb ruim 10 jaar gedraaid in high-end keukens in Europa en Australië (Bougainville Amsterdam, Angler Stirling Adelaide Hills, Hanson Bay Kangaroo Island). Ik weet welke zoekwoorden gasten echt gebruiken, hoe je een Restaurant schema bouwt met OpeningHoursSpecification en ReserveAction, en welke foto's rankings verhogen (zaal, bord, team — niet voorraadkast). Dat inhoudelijke inzicht maakt het verschil tussen een site die rankt maar geen gasten trekt, en een site die zowel Google als echte mensen overtuigt.",
  },
  {
    q: "Hoe snel zie ik resultaat van SEO en GEO werk?",
    a: "Technische basis (schema, sitemap, canonical tags, Core Web Vitals) ziet Google binnen één tot twee weken. Lokale pack en brand queries kunnen binnen vier weken bewegen. Rank verbeteringen voor competitieve zoekwoorden duren drie tot zes maanden. Citaties in AI Overviews en ChatGPT zijn grilliger: sommige passages worden direct opgepikt, andere pas nadat Google de content meerdere keren heeft gecrawld en de autoriteitssignalen zich opbouwen. Ik rapporteer maandelijks welke queries bewegen, welke pagina's citaties krijgen en wat de volgende prioriteit is. Geen maandelijkse factuur zonder data.",
  },
  {
    q: "Wat kost SEO en GEO optimalisatie per maand?",
    a: "Twee opties. Jaarcontract: €1.300 ex BTW per jaar, eenmaal vooruit betaald. Maandcontract: €150 per maand, maandelijks opzegbaar na drie maanden. Beide tarieven dekken dezelfde scope: technische audit en fixes, schema.org implementatie, content structuur voor passage extraction, keyword mapping, maandelijkse rapportage en queries monitoring. Het jaarcontract scheelt €500 en is de meeste klanten hun keuze. Voor grotere sites met meer dan 50 pagina's of multi-locatie bedrijven maak ik een aparte offerte. Websites die ik zelf bouw krijgen een korting op het eerste jaar.",
  },
  {
    q: "Werk je alleen met horeca of ook met andere bedrijven?",
    a: "Horeca is de specialisatie, maar het systeem werkt voor elk lokaal dienstverlenend bedrijf. Ik optimaliseer Swimcoaching.nl — Engelstalige zwemcoaching in Zeeland — met exact dezelfde GEO principes als een restaurant website. De kern (lokale schema, passage extraction, autoriteitsopbouw) is identiek. Wel: voor niet-horeca klanten geef ik vooraf aan waar mijn branche-kennis eindigt. Restaurants krijgen menu engineering advies gratis mee, zwemcoaches niet. Meld je aan via de gratis diagnose en ik vertel eerlijk of ik de juiste partner ben voor jouw sector.",
  },
  {
    q: "Wat is het verschil tussen een lokaal pack en een AI Overview?",
    a: "Het lokaal pack (ook 'map pack' of '3-pack') is het kaartje met drie bedrijfslistings dat Google bovenaan toont bij lokale zoekopdrachten — je hebt er een geverifieerd Google Business Profile voor nodig plus een echt adres. De AI Overview is de samenvatting bovenaan die Google zelf schrijft met hulp van Gemini. Die trekt content uit meerdere bronnen en citeert ze met links. Een restaurant kan in beide voorkomen, of alleen in één. GEO werk helpt voornamelijk de AI Overview kant. Lokaal pack vraagt ook aparte aandacht voor GBP reviews, foto's en categorieën.",
  },
];

const faqSchema = buildFaqPage(faqs.map((f) => ({ question: f.q, answer: f.a })));

// ---------------------------------------------------------------------------
// UI helpers

const panel =
  "rounded-[34px] border border-border/35 bg-card/10 overflow-hidden";
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
  id,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-12 md:py-20", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            {title}
          </h2>
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

function StatBlock({
  value,
  label,
  source,
}: {
  value: string;
  label: string;
  source: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-border/35 bg-background/20">
      <p className="font-headline text-4xl md:text-5xl font-bold text-primary">
        {value}
      </p>
      <p className="mt-2 text-base text-foreground">{label}</p>
      <p className="mt-2 text-xs text-muted-foreground/70">{source}</p>
    </div>
  );
}

type Focus = { title: string; desc: string; Icon: typeof Search };

const focusAreas: Focus[] = [
  {
    title: "Technische SEO fundering",
    desc: "Schema.org, sitemap, robots, Core Web Vitals en canonical tags. Zonder basis werkt niks anders.",
    Icon: Search,
  },
  {
    title: "GEO passage extraction",
    desc: "Content herstructureren zodat AI engines er stukken uit kunnen lichten en jouw pagina citeren.",
    Icon: Sparkles,
  },
  {
    title: "Lokale signalen",
    desc: "NAP consistentie, openingstijden als data, Google Business Profile en areaServed voor Amersfoort e.o.",
    Icon: MapPin,
  },
  {
    title: "Maandelijkse rapportage",
    desc: "Query tracking, citation monitoring en drie prioriteiten voor de volgende maand. Geen vage dashboards.",
    Icon: BarChart3,
  },
];

// ---------------------------------------------------------------------------
// Page

export default function SeoGeoPage() {
  return (
    <div className="relative">
      <JsonLd data={serviceSchema} id="schema-seo-geo-service" />
      <JsonLd data={breadcrumbSchema} id="schema-seo-geo-breadcrumb" />
      <JsonLd data={faqSchema} id="schema-seo-geo-faq" />

      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/10 to-transparent" />

      {/* HERO */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className={cn(panel, panelInner, softGlow)}>
            <div className="p-7 md:p-12 lg:p-14">
              <p className="font-headline text-primary text-sm font-bold tracking-widest uppercase">
                SEO + GEO voor horeca
              </p>

              <h1 className="mt-3 font-headline text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl">
                Rank hoger in Google.{" "}
                <span className="text-primary">Word geciteerd door AI.</span>
              </h1>

              <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                SEO en GEO optimalisatie voor restaurants, catering en hospitality
                in Amersfoort, Utrecht en heel Nederland. Horeca-gerichte dienst
                die tegelijk werkt aan Google rankings én zichtbaarheid in
                ChatGPT, Perplexity, Google AI Overviews en Gemini.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/free-diagnosis?type=website"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "font-semibold"
                  )}
                >
                  Start gratis SEO/GEO scan{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "font-semibold border-2"
                  )}
                >
                  €1.300/jaar of €150/mnd
                </Link>
              </div>

              {/* Focus areas grid inside hero panel */}
              <div className="mt-10 grid gap-4 md:grid-cols-4">
                {focusAreas.map((area) => {
                  const Icon = area.Icon;
                  return (
                    <div
                      key={area.title}
                      className="rounded-2xl border border-primary/18 bg-background/25 p-5"
                    >
                      <div className="flex items-center justify-center h-10 w-10 rounded-xl border border-primary/18 bg-background/30">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="mt-4 font-headline text-base font-bold text-foreground">
                        {area.title}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {area.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY GEO NOW — citable stats */}
      <Section
        title="Waarom is GEO optimalisatie belangrijk in 2026?"
        subtitle="De zoekwereld is in twaalf maanden veranderd: Google AI Overviews, ChatGPT Search en Perplexity citeren nu wie de beste passages schrijft, niet wie de meeste links heeft. Dit zijn de cijfers die je niet kunt negeren."
      >
        <div className="grid gap-5 md:grid-cols-3 max-w-5xl mx-auto">
          <StatBlock
            value="48–60%"
            label="van alle Google zoekopdrachten triggert nu een AI Overview"
            source="Search Engine Land, Q1 2026"
          />
          <StatBlock
            value="78%"
            label="van horeca-gerelateerde zoekopdrachten krijgt een AI Overview (was 10% in 2025)"
            source="Local SEO Guide, 12-month delta"
          />
          <StatBlock
            value="+35%"
            label="meer clicks voor pagina's die geciteerd worden in AI Overviews"
            source="AI search CTR studies 2025"
          />
          <StatBlock
            value="~90%"
            label="van ChatGPT citaties komen van pagina's die voorbij positie 21 ranken"
            source="SparkToro / Semrush GEO research"
          />
          <StatBlock
            value="165x"
            label="sneller groeit AI search traffic dan organisch search traffic"
            source="Adobe Digital Insights 2025"
          />
          <StatBlock
            value="47%"
            label="van AI citaties komt van pagina's die NIET in de top 5 ranken"
            source="Profound AI visibility study"
          />
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Vertaald: een restaurant dat alleen op klassieke SEO leunt verliest
          tegelijk CTR (omdat AI Overviews clicks afvangen) én citatie-ruimte
          (omdat goede content in passages onder positie 5 nog steeds geciteerd
          wordt door ChatGPT en Perplexity). Beide hefbomen bedienen is het
          verschil.
        </p>
      </Section>

      {/* WHAT YOU GET */}
      <Section
        title="Wat gebeurt er elke maand in een SEO + GEO traject?"
        subtitle="Transparant, meetbaar en chef-geleid. Elke maand vier vaste blokken voor Amersfoortse horecabedrijven en restaurants in de regio Utrecht."
        className="border-t border-border/60 bg-card/10"
      >
        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          <Card className={cn(cardBase, cardHover)}>
            <CardHeader>
              <CardTitle className="font-headline text-xl text-primary">
                1. Technische basis op orde houden
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <ul className="space-y-2.5">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                  <span>Schema.org audit met Restaurant, LocalBusiness, Service en FAQ types</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                  <span>Core Web Vitals monitoring (LCP, INP, CLS)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                  <span>Sitemap, canonical tags en crawl budget check</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className={cn(cardBase, cardHover)}>
            <CardHeader>
              <CardTitle className="font-headline text-xl text-primary">
                2. Content voor passage extraction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <ul className="space-y-2.5">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                  <span>H2 vragen-structuur met 130–167 woord antwoord-blokken</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                  <span>Statistieken, bronnen en expert quotes voor citatie-kracht</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                  <span>Multimodale content: afbeeldingen met alt text plus video embeds</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className={cn(cardBase, cardHover)}>
            <CardHeader>
              <CardTitle className="font-headline text-xl text-primary">
                3. Lokale dominantie Amersfoort
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <ul className="space-y-2.5">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                  <span>NAP consistentie check: site versus GBP versus directory listings</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                  <span>Google Business Profile optimalisatie (foto's, categorieën, reviews SLA)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                  <span>OpeningHoursSpecification en areaServed per locatie</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className={cn(cardBase, cardHover)}>
            <CardHeader>
              <CardTitle className="font-headline text-xl text-primary">
                4. Rapportage en prioriteiten
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <ul className="space-y-2.5">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                  <span>Query tracking voor 20 doelwoorden in Google plus lokaal pack</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                  <span>AI citation checks in ChatGPT, Perplexity en Google AI Overviews</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                  <span>Drie concrete prioriteiten voor volgende maand (en waarom)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* PRICING PANEL */}
      <Section
        title="Wat kost SEO en GEO optimalisatie voor een horecabedrijf?"
        subtitle="Twee smaken: jaarlijks €1.300 excl. BTW of maandelijks €150 excl. BTW. Geen setup fee voor websites die ik zelf heb gebouwd. Alle tarieven voor restaurants en horecabedrijven in Amersfoort en omgeving."
      >
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <Card className={cn(cardBase, "h-full", cardHover)}>
            <CardHeader>
              <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
                Jaarcontract
              </div>
              <CardTitle className="font-headline text-3xl md:text-4xl mt-2">
                €1.300 <span className="text-lg font-normal text-muted-foreground">ex BTW per jaar</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-5">
                Eenmaal per jaar afrekenen, €500 voordeliger dan maandelijks.
                De meest gekozen optie.
              </p>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                  <span>12 maanden volledige SEO + GEO scope</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                  <span>Kwartaal strategie-sessies (60 min per call)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                  <span>Onbeperkte on-page tweaks binnen scope</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                  <span>Voorrang op nieuwe feature requests</span>
                </li>
              </ul>
              <Link
                href="/contact?ref=seo-geo-jaar"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-7 w-full font-semibold"
                )}
              >
                Jaarcontract aanvragen
              </Link>
            </CardContent>
          </Card>

          <Card className={cn(cardBase, "h-full", cardHover)}>
            <CardHeader>
              <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
                Maandcontract
              </div>
              <CardTitle className="font-headline text-3xl md:text-4xl mt-2">
                €150 <span className="text-lg font-normal text-muted-foreground">per maand</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-5">
                Maandelijks opzegbaar na drie maanden. Ideaal om voorzichtig te
                beginnen en daarna te besluiten.
              </p>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                  <span>Dezelfde volledige scope als het jaarcontract</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                  <span>Minimale looptijd drie maanden, daarna flexibel</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                  <span>Maandelijkse factuur en rapportage</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                  <span>Upgrade naar jaarcontract mogelijk met korting</span>
                </li>
              </ul>
              <Link
                href="/contact?ref=seo-geo-mnd"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "mt-7 w-full font-semibold"
                )}
              >
                Maandcontract aanvragen
              </Link>
            </CardContent>
          </Card>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          Websites die ik zelf bouw (€400 eenmalig) krijgen in het eerste jaar
          een extra korting op SEO/GEO. Vraag het even bij het gesprek.
        </p>
      </Section>

      {/* COMPARISON TABLE — highly extractable by AI engines */}
      <Section
        title="SEO versus GEO: wat is het verschil?"
        subtitle="Beide hebben dezelfde fundering. De laatste laag verschilt."
        className="border-t border-border/60 bg-card/10"
      >
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full text-left text-sm md:text-base">
            <thead>
              <tr className="border-b border-border/50">
                <th className="py-3 pr-4 font-semibold text-muted-foreground">
                  Dimensie
                </th>
                <th className="py-3 px-4 font-semibold text-foreground">
                  Klassiek SEO
                </th>
                <th className="py-3 pl-4 font-semibold text-primary">
                  GEO (Generative Engine Optimization)
                </th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/30">
                <td className="py-4 pr-4 font-medium text-foreground">
                  Doel
                </td>
                <td className="py-4 px-4">
                  Hoger ranken in Google blauwe links en lokaal pack
                </td>
                <td className="py-4 pl-4">
                  Geciteerd worden in ChatGPT, Perplexity, AI Overviews, Gemini
                </td>
              </tr>
              <tr className="border-b border-border/30">
                <td className="py-4 pr-4 font-medium text-foreground">
                  Meeteenheid
                </td>
                <td className="py-4 px-4">Positie, impressies, CTR</td>
                <td className="py-4 pl-4">
                  Citation share, answer inclusion rate, passage hit rate
                </td>
              </tr>
              <tr className="border-b border-border/30">
                <td className="py-4 pr-4 font-medium text-foreground">
                  Content vorm
                </td>
                <td className="py-4 px-4">
                  Lange pagina met keyword density
                </td>
                <td className="py-4 pl-4">
                  Korte zelf-uitlegende passages, 130–167 woorden per blok
                </td>
              </tr>
              <tr className="border-b border-border/30">
                <td className="py-4 pr-4 font-medium text-foreground">
                  H2 stijl
                </td>
                <td className="py-4 px-4">Topic statement</td>
                <td className="py-4 pl-4">Directe vraag die gasten stellen</td>
              </tr>
              <tr className="border-b border-border/30">
                <td className="py-4 pr-4 font-medium text-foreground">
                  Bewijs
                </td>
                <td className="py-4 px-4">Backlinks en Domain Authority</td>
                <td className="py-4 pl-4">
                  Statistieken, bronnen, quotes, vermeldingen in earned media
                </td>
              </tr>
              <tr className="border-b border-border/30">
                <td className="py-4 pr-4 font-medium text-foreground">
                  Rank correlatie
                </td>
                <td className="py-4 px-4">
                  Sterk: top 10 rankings domineren SERPs
                </td>
                <td className="py-4 pl-4">
                  Zwakker: ~47% van citaties komt van pagina's buiten top 5
                </td>
              </tr>
              <tr>
                <td className="py-4 pr-4 font-medium text-foreground">
                  Schema prioriteit
                </td>
                <td className="py-4 px-4">
                  LocalBusiness, Breadcrumb, basis Product
                </td>
                <td className="py-4 pl-4">
                  Rijke @graph met @id cross-references, FAQPage, Restaurant
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* AMERSFOORT FOCUS */}
      <Section
        title="Waarom richt ik me eerst op Amersfoort?"
        subtitle="De lokale markt in Amersfoort (Binnenstad, Kamp, Soesterkwartier, Leusderkwartier, Vathorst, Valleipoort, Hoogland, Randenbroek) en de regio Utrecht is grotendeels open voor horeca-gerichte GEO optimalisatie. Geen enkel bureau claimt de niche — die openheid sluit binnen 12 maanden."
      >
        <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
          <p className="text-muted-foreground leading-relaxed">
            In april 2026 rankt er geen enkel horeca-specialist SEO bureau voor
            zoekopdrachten zoals <em>horeca consultant Amersfoort</em>,{" "}
            <em>menu engineering Amersfoort</em> of{" "}
            <em>restaurant website laten maken Amersfoort</em>. Generieke
            bureaus als Doelbewust en Ranking Masters domineren{" "}
            <em>SEO bureau Amersfoort</em>, maar niemand noemt horeca. Het
            enige overlappende lokale bedrijf (Bonico Horeca Consultancy) doet
            geen websites, catering of SEO.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-5">
            Voor een restaurant of cateringbedrijf in Amersfoort betekent dat:
            de zoekresultaten voor je directe zakelijke doelwoorden zijn nog
            onverdedigd. Eén goed geoptimaliseerde pagina met schema, heldere
            passages en echte lokale signalen kan binnen zes maanden positie
            één pakken. In grotere steden zoals Amsterdam of Utrecht is dat
            veel duurder. Daarom start ik elke SEO/GEO samenwerking met een
            Amersfoort-audit: lokaal pack status, bestaande rankings, gaps in
            content en de snelst bereikbare quick wins.
          </p>
          <div className="mt-8 rounded-2xl border border-border/35 bg-background/20 p-5 md:p-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              Werkgebied
            </div>
            <h3 className="mt-2 font-headline text-xl font-bold md:text-2xl">
              Voor welke wijken en steden doe ik SEO + GEO?
            </h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Standplaats is Amersfoort en ik werk in heel Amersfoort en
              omgeving. Binnen Amersfoort: alle wijken — Binnenstad, Kamp,
              Soesterkwartier, Leusderkwartier, Vathorst, Valleipoort,
              Kattenbroek, Randenbroek, Hoogland, Hooglanderveen, Liendert,
              Schothorst en Zielhorst. In de regio rond Amersfoort: Utrecht,
              Hilversum, Soest, Leusden, Baarn, Bunschoten, Nijkerk en
              Barneveld. Voor opdrachten verder weg (Zwolle, Apeldoorn,
              Amsterdam, Rotterdam, Eindhoven) werk ik remote met één
              fysieke kick-off op locatie. Jezza Cooks is gevestigd aan de
              Nijkerkerstraat 3, 3821 CD Amersfoort (Valleipoort, KvK
              99547619).
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <section className="py-12 md:py-20 border-t border-border/60 bg-card/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center font-headline text-3xl md:text-4xl font-bold">
            Veelgestelde vragen over SEO en GEO voor horeca
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

          <p className="mt-12 text-center text-xs text-muted-foreground">
            Laatst bijgewerkt: 15 april 2026 · Jezza Cooks SEO + GEO optimalisatie voor horeca in Amersfoort en omgeving · {SITE.name} KvK {SITE.kvk} · {SITE.address.streetAddress}, {SITE.address.postalCode} {SITE.address.addressLocality}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Wil je weten of jouw site AI-klaar is?
          </h2>
          <p className="mt-3 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Ik draai een gratis SEO + GEO scan op je huidige website en stuur
            binnen 48 uur drie concrete prioriteiten. Als het klikt, bespreken
            we een maand- of jaarcontract.
          </p>
          <Link
            href="/free-diagnosis?type=website"
            className={cn(
              buttonVariants({ size: "lg", variant: "secondary" }),
              "mt-8 bg-foreground text-background hover:bg-foreground/80 font-bold"
            )}
          >
            Start gratis scan <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
