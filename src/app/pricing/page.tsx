// src/app/pricing/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ShieldCheck, Clock, Mail } from "lucide-react";

import PageHeader from "@/components/page-header";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import JsonLd from "@/components/seo/json-ld";
import { buildBreadcrumbList, buildFaqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Tarieven — consulting, catering, websites en SEO/GEO",
  description:
    "Transparante prijzen voor Jezza Cooks: restaurant consulting vanaf €450, catering vanaf €45 p.p., restaurant websites €400 eenmalig met optioneel €30/mnd onderhoud, en SEO + GEO optimalisatie €1.300/jaar of €150/mnd. Alle tarieven exclusief BTW.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Tarieven Jezza Cooks | Jezza Cooks",
    description:
      "Heldere prijzen voor consulting, catering, websites en SEO/GEO. Geen verrassingen.",
    url: "/pricing",
    type: "website",
  },
};

type Tier = {
  title: string;
  kicker?: string; // small pill
  price: string;
  cadence?: string; // "eenmalig", "per persoon", "plus reiskosten", etc.
  description: string;

  // marketing clarity
  deliverables: string[]; // "Wat je ontvangt"
  bestFor?: string[]; // "Past bij"
  outcomes?: string[]; // "Wat je overhoudt"

  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
  note?: string; // micro proof line
};

function PricingGrid({ tiers }: { tiers: Tier[] }) {
  const gridCols =
    tiers.length === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : tiers.length === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-3";

  return (
    <div className={cn("grid gap-6 md:items-stretch", gridCols)}>
      {tiers.map((tier) => {
        const isPopular = !!tier.popular;

        return (
          <Card
            key={tier.title}
            className={cn(
              "relative flex h-full flex-col overflow-hidden border-border bg-card/40",
              isPopular && "border-primary/50 ring-1 ring-primary/30 bg-card/60"
            )}
          >
            {isPopular ? (
              <div className="absolute inset-x-0 top-0 z-10">
                <div className="bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground">
                  Meest gekozen
                </div>
              </div>
            ) : null}

            <CardHeader className={cn("space-y-4", isPopular && "pt-14")}>
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="font-headline text-2xl md:text-3xl">
                  {tier.title}
                </CardTitle>

                {tier.kicker ? (
                  <Badge className="rounded-full px-3 py-1">{tier.kicker}</Badge>
                ) : null}
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {tier.description}
              </p>

              {/* What you receive (value first) */}
              <div className="rounded-2xl border border-border bg-background/35 p-4">
                <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                  Wat je ontvangt
                </p>
                <ul className="mt-2 space-y-1">
                  {tier.deliverables.map((item) => (
                    <li key={item} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {(tier.bestFor?.length || tier.outcomes?.length) ? (
                <div className="grid gap-3">
                  {tier.bestFor?.length ? (
                    <div className="rounded-2xl border border-border bg-background/25 p-4">
                      <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                        Past bij
                      </p>
                      <ul className="mt-2 space-y-1">
                        {tier.bestFor.map((item) => (
                          <li key={item} className="text-sm">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {tier.outcomes?.length ? (
                    <div className="rounded-2xl border border-border bg-background/25 p-4">
                      <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                        Wat je overhoudt
                      </p>
                      <ul className="mt-2 space-y-1">
                        {tier.outcomes.map((item) => (
                          <li key={item} className="text-sm">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </CardHeader>

            <CardContent className="flex flex-1 flex-col">
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Price minimized, but clear */}
              <div className="mt-6 rounded-2xl border border-border bg-background/30 p-4">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                      Investering
                    </div>
                    {tier.cadence ? (
                      <div className="mt-1 text-xs text-muted-foreground">
                        {tier.cadence}
                      </div>
                    ) : null}
                  </div>

                  <div className="text-right">
                    <div className="font-headline text-2xl font-bold tracking-tight">
                      {tier.price}
                    </div>
                  </div>
                </div>

                {tier.note ? (
                  <p className="mt-3 text-xs text-muted-foreground">
                    {tier.note}
                  </p>
                ) : null}
              </div>

              <div className="mt-4">
                <Link
                  href={tier.href}
                  className={cn(
                    buttonVariants({
                      size: "lg",
                      variant: isPopular ? "default" : "outline",
                    }),
                    "w-full font-semibold"
                  )}
                >
                  {tier.cta}
                </Link>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Eerst snappen wat je nodig hebt. Daarna pas kiezen.
                </p>
              </div>
            </CardContent>

            {isPopular ? (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-primary/10 to-transparent" />
            ) : null}
          </Card>
        );
      })}
    </div>
  );
}

export default function PricingPage() {
  const consulting: Tier[] = [
    {
      title: "Quick Scan",
      kicker: "Snel overzicht",
      price: "€ 450",
      cadence: "meeting en drie uur meelopen",
      description:
        "We kijken mee in jouw realiteit. Je krijgt daarna een helder plan dat je direct kunt uitvoeren.",
      deliverables: [
        "Eén pagina overzicht van wat er nu misgaat",
        "Top 5 acties voor deze week",
        "Prioriteiten voor de komende 30 dagen",
        "Twee keer FaceTime follow up, om de twee weken",
      ],
      bestFor: [
        "Je wilt snel duidelijkheid, zonder lang traject",
        "Je wilt dat iemand met ervaring meekijkt en het concreet maakt",
      ],
      outcomes: ["Rust en focus", "Plan dat je team snapt en kan uitvoeren"],
      features: [
        "Meekijken in prep en service",
        "Duidelijke prioriteiten, geen lange rapporten",
        "Acties die passen bij jouw team en niveau",
        "Je weet precies wat de volgende stap is",
      ],
      cta: "Start met gratis diagnose",
      href: "/free-diagnosis?type=consulting&plan=quick-scan",
      note: "Ik lees je intake zelf en reageer persoonlijk per e-mail.",
    },
    {
      title: "Op locatie special",
      kicker: "Gericht verbeteren",
      price: "€ 750",
      cadence: "4 uur op locatie, plus reiskosten",
      description:
        "Vier uur op locatie om één terugkerend probleem op te lossen en werkafspraken te maken die blijven staan.",
      deliverables: [
        "Duidelijke werkafspraken voor het team",
        "Een checklijst die je direct kunt gebruiken",
        "Korte training op de vloer",
        "Acties voor de komende 7 tot 14 dagen",
      ],
      bestFor: [
        "Er is één probleem dat elke service terugkomt",
        "Je wilt snel verbetering zonder gedoe",
      ],
      outcomes: ["Meer rust tijdens service", "Team weet wat de standaard is"],
      features: [
        "Meekijken op locatie en direct bijsturen",
        "Werkwijze die het team kan herhalen",
        "Focus op tempo, kwaliteit en duidelijkheid",
        "Duidelijke follow up per mail",
      ],
      cta: "Start met gratis diagnose",
      href: "/free-diagnosis?type=consulting&plan=on-site-4h",
      note: "Je krijgt heldere afspraken en een plan dat je kunt volhouden.",
    },
    {
      title: "Twee dagen volledig meekijken",
      kicker: "Volledige diagnose",
      price: "€ 1.250",
      cadence: "twee dagen, plus reiskosten",
      description:
        "Twee dagen meelopen en een meeting met sleutelpersonen. Doel is volledig begrip, zodat je niet blijft plakken op losse fixes.",
      deliverables: [
        "Duidelijk plan voor 2 tot 4 weken uitvoering",
        "Afspraken voor rollen, ritme en kwaliteit",
        "Checklijsten en werkafspraken die blijven staan",
        "Team snapt precies wat ‘goed’ is",
      ],
      bestFor: [
        "Je voelt dat er meerdere dingen tegelijk lekken",
        "Je wilt rust, structuur en afspraken die blijven staan",
      ],
      outcomes: ["Consistent niveau", "Meer controle en minder ruis"],
      features: [
        "Meekijken in prep en service, zonder aannames",
        "Meeting met sleutelpersonen voor het echte beeld",
        "Implementatieplan dat past bij jouw agenda",
        "Heldere overdracht, zodat je team door kan",
      ],
      cta: "Start met gratis diagnose",
      href: "/free-diagnosis?type=consulting&plan=two-days",
      popular: true,
      note: "Dit is voor ondernemers die het in één keer goed willen begrijpen.",
    },
    {
      title: "Samenwerking per maand",
      kicker: "Structureel verbeteren",
      price: "€ 2.400",
      cadence: "per maand, minimaal 2 maanden",
      description:
        "Twee dagen per week, vier weken lang. We bouwen ritme, structuur en controle zodat het team zelfstandig beter blijft draaien.",
      deliverables: [
        "Twee dagen per week aanwezig, vier weken lang",
        "Vast ritme voor cijfers, keuzes en uitvoering",
        "Werkafspraken die je team kan herhalen",
        "Snelle feedback tussendoor",
      ],
      bestFor: [
        "Je wilt structureel verbeteren in plaats van losse fixes",
        "Je wilt vaste momenten om keuzes te maken en uit te voeren",
      ],
      outcomes: ["Meer controle", "Minder stress", "Betere uitvoering door het team"],
      features: [
        "We bouwen stap voor stap, zonder chaos",
        "Duidelijke focus per week",
        "Team wordt zelfstandiger",
        "Je hoeft het niet allemaal alleen te dragen",
      ],
      cta: "Start met gratis diagnose",
      href: "/free-diagnosis?type=consulting&plan=monthly",
      note: "Je betaalt voor rust en ritme. Niet voor mooie praat.",
    },
  ];

  const catering: Tier[] = [
    {
      title: "Private Dinner",
      kicker: "Diner op locatie",
      price: "Vanaf € 95",
      cadence: "per persoon, minimaal 8",
      description:
        "Chef-led diner bij jou op locatie. Menu op maat, strakke timing en zorgvuldige uitvoering.",
      deliverables: [
        "Menu op maat, dieetwensen inbegrepen",
        "Inkoop en voorbereiding inbegrepen",
        "Koken en uitserveren op locatie",
        "Keuken schoon achtergelaten",
      ],
      features: [
        "Heldere planning vooraf",
        "Rustige service en goede timing",
        "Duidelijke communicatie",
        "Geen gedoe voor jou",
      ],
      cta: "Vraag een voorstel",
      href: "/contact?service=catering&package=private-dinner",
      note: "Je krijgt een voorstel dat past bij jouw gasten en jouw avond.",
    },
    {
      title: "Event Catering",
      kicker: "Voor groepen",
      price: "Vanaf € 45",
      cadence: "per persoon",
      description:
        "Catering die overeind blijft als het druk wordt. Duidelijk plan, goede voorbereiding en service die klopt.",
      deliverables: [
        "Menu gemaakt voor snelheid en kwaliteit",
        "Allergenen netjes geregeld",
        "Duidelijke planning voor timing en service",
        "Personeelsplan als dat nodig is",
      ],
      features: [
        "Heldere afspraken vooraf",
        "Betrouwbare uitvoering op volume",
        "Focus op smaak en tempo",
        "Geen last-minute stress",
      ],
      cta: "Vraag een offerte",
      href: "/contact?service=catering&package=event",
      popular: true,
      note: "Je weet vooraf wat er gebeurt, en wat je wel en niet krijgt.",
    },
    {
      title: "Chef for the Day",
      kicker: "Chef support",
      price: "Vanaf € 650",
      cadence: "per dag",
      description:
        "Chef ondersteuning voor voorbereiding of service. Ik stap in en bewaak tempo en kwaliteit.",
      deliverables: [
        "Ondersteuning in voorbereiding of service",
        "Tempo en kwaliteit bewaken op een station",
        "Korte overdracht met duidelijke notities",
        "Heldere afspraken vooraf",
      ],
      features: [
        "Direct extra chefkracht",
        "Rust op de werkvloer",
        "Tempo blijft hoog zonder rommel",
        "Snelle, duidelijke communicatie",
      ],
      cta: "Check beschikbaarheid",
      href: "/contact?service=catering&package=chef-day",
      note: "Ideaal als je een dag extra zekerheid nodig hebt.",
    },
  ];

  const websites: Tier[] = [
    {
      title: "Restaurant website",
      kicker: "Meest gekozen",
      price: "€ 400",
      cadence: "eenmalig, complete site",
      description:
        "Complete restaurant of horeca website, eenmaal betaald en klaar. Gebouwd voor conversie, lokaal SEO en AI citaties. Geen abonnementen waar je in vast zit.",
      deliverables: [
        "Home, menu, over, contact, locatie en FAQ",
        "Snelle moderne Next.js stack met schema.org markup",
        "Google Bedrijfsprofiel koppeling en basis SEO",
        "Tekststructuur die gasten richting reserveren of aanvraag stuurt",
      ],
      bestFor: [
        "Je wilt een complete site die past bij jouw merk",
        "Je wilt een vaste prijs zonder maandelijkse lock-in",
      ],
      outcomes: [
        "Meer directe reserveringen en aanvragen",
        "Site die rankt in Google én geciteerd wordt door AI engines",
      ],
      features: [
        "Restaurant schema met openingstijden en reserveringsflow",
        "Mobile-first, rustig en snel",
        "Foto's, menu en locatie op de juiste plekken",
        "Geen verborgen kosten",
      ],
      cta: "Start met gratis diagnose",
      href: "/free-diagnosis?type=website&plan=restaurant-site",
      popular: true,
      note: "Eén prijs, één site. Geen verborgen kosten of upsells.",
    },
    {
      title: "Maintenance & updates",
      kicker: "Optioneel abonnement",
      price: "€ 30",
      cadence: "per maand, maandelijks opzegbaar",
      description:
        "Optioneel onderhoud voor je Jezza Cooks restaurant website. Kleine tekst- en menuwijzigingen, hosting check, security patches en snelle support.",
      deliverables: [
        "Onbeperkte kleine tekst- en menu-updates",
        "Maandelijkse security en performance check",
        "Prioritaire mail en WhatsApp support",
        "Backup en uptime monitoring",
      ],
      bestFor: [
        "Je wilt dat iemand de site voor je bijhoudt",
        "Je verandert regelmatig je menukaart of openingstijden",
      ],
      outcomes: ["Site blijft actueel en snel", "Minder zorgen, meer tijd voor je zaak"],
      features: [
        "Alleen beschikbaar bij sites die Jezza Cooks heeft gebouwd",
        "Geen minimum looptijd",
        "Nieuwe features of pagina's aparte offerte",
        "Je blijft eigenaar van je site",
      ],
      cta: "Vraag maintenance aan",
      href: "/contact?service=websites&package=maintenance",
      note: "Maakt alleen zin als je regelmatig wijzigingen hebt. Anders overbodig.",
    },
    {
      title: "Maatwerk website",
      kicker: "Offerte",
      price: "Offerte",
      cadence: "op aanvraag",
      description:
        "Voor multi-locatie, meertalige sites of speciale integraties zoals reserveringssystemen, POS koppelingen of loyalty programma's.",
      deliverables: [
        "Offerte op basis van scope en complexiteit",
        "Duidelijke planning en mijlpalen vooraf",
        "Geen verrassingen in kosten",
        "Eerst begrijpen, dan bouwen",
      ],
      features: [
        "Meerdere locaties of talen als dat nodig is",
        "POS/reservering/loyalty integraties",
        "Custom booking flow (zoals boekeerlijk.nl)",
        "Je houdt controle over scope en planning",
      ],
      cta: "Mail voor offerte",
      href: "/contact?service=websites&package=custom",
      note: "Maatwerk is alleen slim als het je echt extra oplevert.",
    },
  ];

  const seoGeo: Tier[] = [
    {
      title: "Jaarcontract",
      kicker: "Meest gekozen",
      price: "€ 1.300",
      cadence: "ex BTW per jaar, eenmaal vooruit",
      description:
        "Volledige SEO en GEO (Generative Engine Optimization) voor 12 maanden. Technische audit, schema.org, content voor passage extraction, lokale signalen en maandelijkse rapportage.",
      deliverables: [
        "Schema.org implementatie en maandelijkse audit",
        "Content herstructurering voor AI citaties",
        "Google Business Profile en lokale NAP optimalisatie",
        "Maandelijkse rapportage met drie prioriteiten",
      ],
      bestFor: [
        "Restaurants en horecabedrijven die zichtbaar willen zijn in Google én ChatGPT",
        "Lokale ondernemers in Amersfoort, Utrecht en omgeving",
      ],
      outcomes: [
        "Hoger in Google lokaal pack en SERPs",
        "Geciteerd in AI Overviews, ChatGPT en Perplexity",
      ],
      features: [
        "Twaalf maanden volledige scope",
        "Kwartaal strategie-sessies (60 min)",
        "Onbeperkte on-page tweaks",
        "€500 voordeliger dan maandelijks betalen",
      ],
      cta: "Start met gratis diagnose",
      href: "/free-diagnosis?type=website&plan=seo-geo-year",
      popular: true,
      note: "Meeste klanten kiezen deze route — eenmaal betalen en klaar voor het jaar.",
    },
    {
      title: "Maandcontract",
      kicker: "Flexibel",
      price: "€ 150",
      cadence: "per maand, min. 3 maanden",
      description:
        "Dezelfde volledige scope als het jaarcontract maar maandelijks betaald. Ideaal om voorzichtig te beginnen en na drie maanden te beslissen.",
      deliverables: [
        "Identieke maandelijkse SEO + GEO scope",
        "Minimale looptijd drie maanden",
        "Maandelijkse factuur en rapportage",
        "Upgrade naar jaarcontract met korting altijd mogelijk",
      ],
      bestFor: [
        "Je wilt eerst zien hoe het werkt voor je vastlegt",
        "Je hebt een kleinere site en wilt klein starten",
      ],
      outcomes: [
        "Flexibiliteit zonder jaarcommitment",
        "Volledige scope op maandbasis",
      ],
      features: [
        "Geen lange lock-in na maand drie",
        "Zelfde technische diepte als jaarcontract",
        "Korting op upgrade bij overstap",
        "Maandelijkse facturatie ex BTW",
      ],
      cta: "Start met gratis diagnose",
      href: "/free-diagnosis?type=website&plan=seo-geo-monthly",
      note: "Prijsverschil over 12 maanden: €500 extra ten opzichte van jaarcontract.",
    },
    {
      title: "SEO/GEO + website bundel",
      kicker: "Korting",
      price: "Vanaf € 1.550",
      cadence: "€400 site + €1.150 eerste jaar SEO/GEO",
      description:
        "Nieuwe website + eerste jaar SEO en GEO, samen afgenomen. €150 korting op het jaarcontract in het eerste jaar omdat ik de site zelf bouw en de basis al klopt.",
      deliverables: [
        "Complete restaurant website (normaal €400)",
        "Eerste jaar SEO + GEO met €150 korting",
        "Eén gesprek, één factuur, één contactpersoon",
        "Schema en structuur meteen GEO-klaar bij launch",
      ],
      features: [
        "Alles vanaf dag één correct ingericht",
        "Geen dubbele audits of onboarding",
        "Maintenance abonnement optioneel erbij",
        "Best value voor nieuwe klanten",
      ],
      cta: "Vraag een voorstel",
      href: "/contact?service=bundle",
      note: "Alleen geldig voor nieuwe klanten die een site laten bouwen.",
    },
  ];

  const pricingFaqs = [
    {
      q: "Zijn prijzen inclusief btw?",
      a: "Nee, alle prijzen zijn exclusief btw. Je krijgt altijd vooraf een duidelijke bevestiging.",
    },
    {
      q: "Wat kost een restaurant website bij Jezza Cooks?",
      a: "Een complete restaurant website kost €400 eenmalig. Dat is home, menu, over, contact, locatie en FAQ met rijke schema.org markup, openingstijden en reserveringsflow. Onderhoud is optioneel voor €30 per maand maar alleen zinvol als je regelmatig menukaarten of openingstijden wijzigt.",
    },
    {
      q: "Wat kost SEO en GEO optimalisatie per jaar?",
      a: "SEO en GEO optimalisatie kost €1.300 ex BTW per jaar (eenmaal vooruit) of €150 per maand met minimum drie maanden. Beide tarieven dekken dezelfde scope: technische audit, schema.org, content voor passage extraction, Google Business Profile werk en maandelijkse rapportage. Het jaarcontract is €500 voordeliger.",
    },
    {
      q: "Kan ik website en SEO/GEO samen afnemen?",
      a: "Ja. De bundel is €400 voor de site plus €1.150 voor het eerste jaar SEO/GEO (€150 korting). Daarna €1.300 per jaar. Voordeel: alles wordt vanaf dag één correct ingericht, geen dubbele onboarding.",
    },
    {
      q: "Wat betekent ‘plus reiskosten’?",
      a: "Als ik op locatie kom stemmen we reistijd en kosten vooraf af. Heldere afspraken, geen verrassingen.",
    },
    {
      q: "Waarom start alles met een gratis diagnose?",
      a: "Omdat we eerst jouw situatie moeten snappen. Dan voorkom je dat je betaalt voor iets wat niet past.",
    },
    {
      q: "Werk je door heel Nederland?",
      a: "Ja. Ik werk door heel Nederland. Amersfoort is thuis, maar consulting en web/SEO werk kan overal. We stemmen vooraf af wat slim is voor planning en reiskosten.",
    },
  ];

  const pricingFaqSchema = buildFaqPage(
    pricingFaqs.map((f) => ({ question: f.q, answer: f.a }))
  );
  const pricingBreadcrumbSchema = buildBreadcrumbList([
    { name: "Home", item: "/" },
    { name: "Tarieven", item: "/pricing" },
  ]);

  return (
    <div className="relative">
      <JsonLd data={pricingBreadcrumbSchema} id="schema-pricing-breadcrumb" />
      <JsonLd data={pricingFaqSchema} id="schema-pricing-faq" />

      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/10 to-transparent" />

      <PageHeader
        title="Tarieven"
        subtitle="Kies wat je nu nodig hebt. Eerst begrijpen, dan pas bouwen of verbeteren."
      />

      <section className="relative py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Trust block: reduce price fear */}
          <div className="mx-auto mb-10 max-w-5xl rounded-2xl border border-border bg-card/40 p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="md:max-w-[34%]">
                <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                  Zo werken we
                </p>
                <p className="mt-2 text-base leading-relaxed">
                  Je betaalt niet voor mooie praat. Je betaalt voor duidelijkheid, afspraken en uitvoering.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3 md:flex-1">
                <div className="rounded-2xl border border-border bg-background/30 p-4">
                  <div className="flex items-center gap-2 font-semibold">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Helder vooraf
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Je weet wat je krijgt, wat de volgende stap is, en waar we niet aan beginnen.
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-background/30 p-4">
                  <div className="flex items-center gap-2 font-semibold">
                    <Clock className="h-4 w-4 text-primary" />
                    Tempo zonder chaos
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Kort, concreet en uitvoerbaar. Geen weken wachten op een rapport.
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-background/30 p-4">
                  <div className="flex items-center gap-2 font-semibold">
                    <Mail className="h-4 w-4 text-primary" />
                    Persoonlijk
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Geen automatische antwoorden. Jij krijgt reactie van mij, niet van een systeem.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
              <p className="text-sm text-muted-foreground">
                Niet zeker wat je nodig hebt? Start met de gratis diagnose. Dan weet je meteen of dit past.
              </p>
              <Link
                href="/free-diagnosis#choose"
                className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
              >
                Gratis diagnose
              </Link>
            </div>
          </div>

          <div className="mx-auto mb-8 max-w-3xl rounded-xl border border-border bg-card/40 p-4 text-sm text-muted-foreground">
            <p className="leading-relaxed">
              Alle prijzen zijn exclusief btw. Reistijd en eventuele kosten stemmen we vooraf af.
              Heldere afspraken, geen verrassingen.
            </p>
          </div>

          {/* Jump-nav: quick access to each service group.
              Rendered as anchor links so crawlers and AI engines can follow
              them directly. No JS state — each section below is fully
              server-rendered and SEO/GEO-indexable. */}
          <nav
            aria-label="Tarief-categorieën"
            className="mx-auto mb-12 max-w-3xl"
          >
            <div className="flex flex-wrap justify-center gap-2 rounded-full border border-border bg-card/40 p-2">
              <a
                href="#consulting"
                className="rounded-full px-5 py-2 text-sm font-medium text-muted-foreground hover:bg-background/40 hover:text-foreground"
              >
                Consulting
              </a>
              <a
                href="#catering"
                className="rounded-full px-5 py-2 text-sm font-medium text-muted-foreground hover:bg-background/40 hover:text-foreground"
              >
                Catering
              </a>
              <a
                href="#websites"
                className="rounded-full px-5 py-2 text-sm font-medium text-muted-foreground hover:bg-background/40 hover:text-foreground"
              >
                Websites
              </a>
              <a
                href="#seo-geo"
                className="rounded-full px-5 py-2 text-sm font-medium text-muted-foreground hover:bg-background/40 hover:text-foreground"
              >
                SEO &amp; GEO
              </a>
            </div>
          </nav>

          {/* --- Consulting tiers --- */}
          <section id="consulting" className="scroll-mt-24">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                Restaurant consulting
              </div>
              <h2 className="mt-2 font-headline text-3xl font-bold md:text-4xl">
                Consulting tarieven
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Menu engineering, food cost controle, prepstructuur, SOPs en
                teamtraining. Vier pakketten — van snelle diagnose tot
                maandcontract.
              </p>
            </div>
            <PricingGrid tiers={consulting} />
          </section>

          {/* --- Catering tiers --- */}
          <section id="catering" className="mt-20 scroll-mt-24">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                Catering &amp; private chef
              </div>
              <h2 className="mt-2 font-headline text-3xl font-bold md:text-4xl">
                Catering tarieven
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Chef-led diners, events en chef-support op locatie. Helder
                vooraf wat je krijgt en wat het kost.
              </p>
            </div>
            <PricingGrid tiers={catering} />
          </section>

          {/* --- Websites tiers --- */}
          <section id="websites" className="mt-20 scroll-mt-24">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                Restaurant websites
              </div>
              <h2 className="mt-2 font-headline text-3xl font-bold md:text-4xl">
                Website tarieven
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Complete restaurant website voor €400 eenmalig. Optioneel €30
                per maand onderhoud. Geen lock-in, geen verborgen kosten.
              </p>
            </div>
            <PricingGrid tiers={websites} />
          </section>

          {/* --- SEO/GEO tiers --- */}
          <section id="seo-geo" className="mt-20 scroll-mt-24">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                SEO &amp; GEO optimalisatie
              </div>
              <h2 className="mt-2 font-headline text-3xl font-bold md:text-4xl">
                SEO + GEO tarieven
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Hoger in Google én geciteerd door ChatGPT, Perplexity en AI
                Overviews. Jaarcontract €1.300 of maandcontract €150 — zelfde
                scope, verschillende betaalritme.
              </p>
            </div>
            <PricingGrid tiers={seoGeo} />
          </section>

          <div className="mx-auto mt-20 max-w-3xl">
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-center">
              Vragen over tarieven
            </h2>
            <p className="mt-2 text-center text-muted-foreground">
              Korte antwoorden, zodat je snel kunt beslissen.
            </p>

            <Accordion type="single" collapsible className="w-full mt-6">
              {pricingFaqs.map((item, i) => (
                <AccordionItem value={`pricing-${i}`} key={item.q}>
                  <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </section>
    </div>
  );
}
