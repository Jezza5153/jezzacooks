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
import JsonLd from "@/components/seo/json-ld";
import { buildBreadcrumbList, buildFaqPage, buildServicePage } from "@/lib/schema";
import { SITE } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Restaurant consulting in Amersfoort — menu engineering, food cost, prep",
  description:
    "Chef-led restaurant consulting in Amersfoort vanaf €450 (Quick Scan). Jeremy Arrascaeta (chef-kok De Tafelaar Amersfoort, 10+ jaar high-end keukens in Europa en Australië): menu engineering, food cost controle, prepstructuur, SOPs en teamtraining. Ook Utrecht, Zwolle, Hilversum en Apeldoorn.",
  alternates: { canonical: "/services/consulting" },
  openGraph: {
    title: "Restaurant consulting Amersfoort | Jezza Cooks",
    description:
      "Chef-led consulting vanaf €450 (Quick Scan). Menu engineering, food cost controle, prepstructuur, SOPs en teamtraining. Amersfoort, Utrecht, Zwolle en heel NL.",
    type: "website",
    url: "/services/consulting",
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
    a: "Een restaurant consultant helpt horeca-ondernemers hun operatie beter draaiend te krijgen op vijf punten: menukaart en pricing, food cost controle, prepstructuur, serviceflow en teamtraining. In de praktijk betekent dat: ik analyseer je huidige kaart op verkoop en marge, zet portie-discipline en recepturen strak, bouw een prep- en dienstritme dat past bij jouw volume, en train het team hands-on tijdens echte service. Bij Jezza Cooks (Amersfoort) start het met een Quick Scan vanaf €450 (meeting plus drie uur meelopen op locatie) of een langer traject, afhankelijk van wat het snelst resultaat geeft. Het doel is altijd hetzelfde: meer grip, minder stress, een hogere gemiddelde marge en rust op de vloer. Geen abstracte Excel-modellen — wel afspraken die het team morgen al kan uitvoeren.",
  },
  {
    q: "Wat kost restaurant consulting bij Jezza Cooks?",
    a: "Consulting begint bij €450 ex BTW voor een Quick Scan: een meeting plus drie uur meelopen op locatie. Dat is voldoende voor een diagnose-bezoek, een menukaart-analyse of een food cost sessie — je krijgt na afloop een helder één-pagina overzicht met de top 5 acties voor deze week en twee korte FaceTime follow-ups. Grotere pakketten: Op locatie special €750 (4 uur op de vloer, één probleem oplossen), Twee dagen volledig meekijken €1.250, of maandcontract €2.400 per maand (2 dagen per week, 4 weken). Reiskosten apart afgestemd. Alle prijzen ex BTW. Voordat we iets afspreken doen we eerst een gratis adviesgesprek van 30 minuten, waarin ik je drie concrete actiepunten geef die je deze week nog kunt uitvoeren — of je nou met me in zee gaat of niet. Facturering: 50% vooraf, 50% bij oplevering.",
  },
  {
    q: "Kun je food cost verlagen zonder kwaliteit te verlagen?",
    a: "Ja — en dat is meestal niet waar mensen denken. Het lek zit zelden in de inkoopprijs zelf; het zit in porties die per shift verschillen, recepturen die alleen in het hoofd van één kok zitten, waste die niemand meet en wisselende prep waardoor je elke dag opnieuw begint. Als je daar afspraken op zet (portie-gewichten opschrijven, recepten op kaart, waste-log aan het einde van de dienst, vaste prep-ritmes) zakt je food cost typisch 2-4 procentpunten in 4-6 weken — van pakweg 30% naar 26-28% — terwijl de kwaliteit gelijk blijft of beter wordt omdat er minder variatie in het bord komt. Als chef-kok bij De Tafelaar Amersfoort draai ik dit soort systemen zelf. Ik verkoop geen theorie die ik zelf niet gebruik.",
  },
  {
    q: "Werk je op locatie in Amersfoort, Utrecht en Zwolle?",
    a: "Ja. Het werkgebied is heel Amersfoort en omgeving — alle wijken (Binnenstad, Kamp, Soesterkwartier, Leusderkwartier, Vathorst, Valleipoort, Kattenbroek, Randenbroek, Hoogland, Liendert, Schothorst), plus Utrecht, Zwolle, Hilversum, Apeldoorn, Soest, Leusden, Baarn, Nijkerk, Barneveld en heel het midden van Nederland. Op locatie werk ik het liefst: in prep en service zie je binnen 2 uur waar het schuurt, en kan ik direct met het team kleine aanpassingen doen die blijven hangen. Online werkt ook prima voor menukaart-analyse, kostprijs berekeningen, SOPs uitschrijven en trainings-materiaal bouwen. Voor een diagnose-bezoek kom ik altijd eerst langs — ik kan geen serieus advies geven zonder de werkvloer gezien te hebben, de bonnen te lezen en het team te ontmoeten. Jezza Cooks is gevestigd aan de Nijkerkerstraat 3 in Amersfoort (Valleipoort-gebied, postcode 3816). Ik ben zelf chef-kok bij De Tafelaar Amersfoort aan de Kamp 8 in de binnenstad — dus ik draai hier dagelijks service, niet alleen advies.",
  },
  {
    q: "Waarom een chef-kok als consultant en niet een generiek horeca-adviesbureau?",
    a: "Omdat ik zelf elke week op de brander sta. Ik ben chef-kok bij De Tafelaar Amersfoort (shared dining, Kamp 8) en heb 10+ jaar gedraaid in high-end keukens in Europa en Australië — finalist Euro-Toques Young Chef Award 2018 namens Restaurant Bougainville Amsterdam, dry-aging lead bij Angler Stirling in de Adelaide Hills (gefeatured in InDaily, Australian Good Food Guide, Broadsheet Adelaide en Aquna), head chef op Kangaroo Island bij Hanson Bay Sanctuary en Flinders Chase Café tijdens de 2019/2020 bushfires. Een generiek bureau stuurt je een PowerPoint en een Excel. Ik loop met je mee in prep, ik lees jullie bonnen tijdens service, en ik train je team op de vloer in plaats van in een vergaderruimte. Dat is het verschil tussen \"advies\" en \"het werkt maandag al\".",
  },
];

const servicePageSchema = buildServicePage({
  slug: "consulting",
  name: "Restaurant consulting",
  description:
    "Chef-led restaurant consulting in Amersfoort vanaf €450 (Quick Scan: meeting + drie uur meelopen). Menu engineering, food cost controle, prepstructuur, SOPs en teamtraining door Jeremy Arrascaeta (chef-kok De Tafelaar Amersfoort, 10+ jaar high-end keukens in Europa en Australië).",
  areaServed: ["Amersfoort", "Utrecht", "Zwolle", "Hilversum", "Apeldoorn", "Nederland"],
});

const faqSchema = buildFaqPage(faqs.map((f) => ({ question: f.q, answer: f.a })));

const breadcrumbSchema = buildBreadcrumbList([
  { name: "Home", item: "/" },
  { name: "Diensten", item: "/services" },
  { name: "Restaurant consulting", item: "/services/consulting" },
]);

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
              Don&apos;t chase perfection. Chase improvement.
            </p>

            <h1 className="mt-3 font-headline text-3xl md:text-5xl font-bold tracking-tight">
              Restaurant consulting in Amersfoort
            </h1>

            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Chef-led menu engineering, food cost controle, prepstructuur en teamtraining —
              door Jeremy Arrascaeta, chef-kok bij De Tafelaar Amersfoort en 10+ jaar in high-end
              keukens in Europa en Australië. Vanaf <strong>€450 Quick Scan</strong>. Amersfoort,
              Utrecht, Zwolle en heel het midden van Nederland.
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
      <JsonLd data={servicePageSchema} id="schema-consulting-service" />
      <JsonLd data={faqSchema} id="schema-consulting-faq" />
      <JsonLd data={breadcrumbSchema} id="schema-consulting-breadcrumb" />

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

      {/* LOCAL POSITIONING BAND — chef identity + NAP + service area for local SEO/GEO */}
      <section className="border-t border-border/60 bg-card/10 py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-primary/25 bg-background/40 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Wie voert het uit
              </p>
              <p className="mt-3 font-headline text-lg font-bold text-foreground">
                Jeremy Arrascaeta
              </p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Chef-kok bij De Tafelaar Amersfoort (Kamp 8) en founder van Jezza Cooks.
                10+ jaar in high-end keukens in Europa en Australië — Restaurant
                Bougainville Amsterdam (finalist Euro-Toques Young Chef Award 2018),
                Angler Stirling Adelaide Hills (dry-aging lead), Hanson Bay Kangaroo
                Island. Gefeatured in AD.nl, De Gelderlander, indebuurt.nl, InDaily,
                AGFG, Broadsheet en Aquna.
              </p>
            </div>

            <div className="rounded-2xl border border-primary/25 bg-background/40 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Werkgebied
              </p>
              <p className="mt-3 font-headline text-lg font-bold text-foreground">
                Amersfoort + midden NL
              </p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Restaurants en horecateams in {SITE.areaServed.slice(0, 5).join(", ")} en heel
                Nederland. Op locatie in prep en service is het snelst; online voor
                menukaart-analyse, kostprijs en SOPs. Binnen 25 km rond Amersfoort reken
                ik geen reiskosten.
              </p>
            </div>

            <div className="rounded-2xl border border-primary/25 bg-background/40 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Vestiging
              </p>
              <p className="mt-3 font-headline text-lg font-bold text-foreground">
                {SITE.name} — {SITE.address.addressLocality}
              </p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {SITE.address.streetAddress}, {SITE.address.postalCode}{" "}
                {SITE.address.addressLocality} ({SITE.address.neighborhood}).<br />
                KvK {SITE.kvk} · eenmanszaak.
                <br />
                {SITE.contact.phoneDisplay} · {SITE.contact.email}
              </p>
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

          <p className="mt-12 text-center text-xs text-muted-foreground">
            Laatst bijgewerkt: 14 april 2026 · {SITE.name}, {SITE.address.streetAddress},{" "}
            {SITE.address.postalCode} {SITE.address.addressLocality} · KvK {SITE.kvk}
          </p>
        </div>
      </section>
    </div>
  );
}
