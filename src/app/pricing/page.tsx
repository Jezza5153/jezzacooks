// src/app/pricing/page.tsx
import Link from "next/link";
import { CheckCircle } from "lucide-react";

import PageHeader from "@/components/page-header";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Tier = {
  title: string;
  kicker?: string; // small pill on the right
  price: string;
  cadence?: string; // "/ one-time", "/ per day + travel", "/ per month"
  description: string;
  bestFor?: string[];
  outcomes?: string[];
  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
};

function PricingGrid({ tiers }: { tiers: Tier[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
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
            {isPopular && (
              <div className="absolute inset-x-0 top-0 z-10">
                <div className="bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground">
                  Most Popular
                </div>
              </div>
            )}

            <CardHeader className={cn("space-y-4", isPopular && "pt-14")}>
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="font-headline text-2xl md:text-3xl">
                  {tier.title}
                </CardTitle>

                {tier.kicker && (
                  <Badge className="rounded-full px-3 py-1">{tier.kicker}</Badge>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
                  <div className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
                    {tier.price}
                  </div>
                  {tier.cadence && (
                    <div className="pb-1 text-sm text-muted-foreground">
                      {tier.cadence}
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {tier.description}
                </p>
              </div>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col">
              {(tier.bestFor?.length || tier.outcomes?.length) && (
                <div className="mb-5 space-y-4 rounded-lg border border-border bg-background/40 p-4">
                  {tier.bestFor?.length ? (
                    <div>
                      <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                        Best for
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
                    <div>
                      <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                        Outcome
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
              )}

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
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
                  Twijfel je? Start met de gratis diagnose hieronder.
                </p>
              </div>
            </CardContent>

            {isPopular && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-primary/10 to-transparent" />
            )}
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
      price: "€ 495",
      cadence: "/ one-time",
      description:
        "90 minuten analyse. We brengen de grootste knelpunten scherp in kaart en zetten een concrete prioriteitenlijst voor de komende 30 dagen.",
      bestFor: [
        "Je wilt duidelijkheid over waar je eerst aan moet werken",
        "Je kiest één focus: Menu, Marges, Operatie of Bookings",
      ],
      outcomes: ["Top 3 prioriteiten (30 dagen)", "3 acties voor deze week"],
      features: [
        "Kies 1 focus: Menu / Marges / Operatie / Bookings",
        "Heldere diagnose + 3-stappen plan",
        "Opname van de sessie",
        "WhatsApp support (30 dagen, light)",
      ],
      cta: "Book a Scan",
      href: "/contact?service=consulting&package=scan",
    },
    {
      title: "Half-Day Sprint (On-Site)",
      kicker: "Gericht verbeteren",
      price: "€ 650",
      cadence: "/ per half day + travel",
      description:
        "4 uur op locatie. We lossen één terugkerend probleem op in prep, rolverdeling, pass, timing of standaarden — en maken het direct werkbaar voor het team.",
      bestFor: [
        "Eén duidelijk knelpunt dat elke service terugkomt",
        "Je wilt snel verbetering zonder een volledig traject",
      ],
      outcomes: ["1 bottleneck opgelost", "Afspraken + werkwijze die het team kan herhalen"],
      features: [
        "On-site observatie + knelpunt analyse",
        "Hands-on training (prep of service)",
        "Minimum viable SOP/checklist (kort en bruikbaar)",
        "Actiepunten voor de komende 7–14 dagen",
      ],
      cta: "Book a Sprint",
      href: "/contact?service=consulting&package=half-day",
    },
    {
      title: "Day Rate (On-Site)",
      kicker: "Meeste momentum",
      price: "€ 995",
      cadence: "/ per day + travel",
      description:
        "Een volle dag op locatie. We verbeteren flow, prep en uitvoering. Doel: rust in de operatie en een niveau dat consistent te draaien is.",
      bestFor: [
        "Inconsistentie in service of uitvoering",
        "Onrust door onduidelijke roles/standaarden",
        "Food cost of workflow lekt, maar niemand ziet waar",
      ],
      outcomes: [
        "Prep + rolverdeling helder",
        "Standards en checks live met het team",
        "Plan voor 2–4 weken uitvoering",
      ],
      features: [
        "On-site observatie + bottleneck mapping",
        "Hands-on team training tijdens live service of prep",
        "SOP/checklists (minimum viable, echt te gebruiken)",
        "Actieplan voor de volgende 2–4 weken",
      ],
      cta: "Book a Day",
      href: "/contact?service=consulting&package=day",
      popular: true,
    },
    {
      title: "Retainer",
      kicker: "Structureel verbeteren",
      price: "From € 1950",
      cadence: "/ per month",
      description:
        "Doorlopende samenwerking met ritme en accountability. We verbeteren marges en systemen stap voor stap, zodat het team het zelfstandig kan blijven draaien.",
      bestFor: [
        "Je wilt structureel verbeteren i.p.v. losse fixes",
        "Je wilt vaste momenten voor KPI’s, keuzes en uitvoering",
      ],
      outcomes: ["Wekelijks ritme + prioriteiten", "Continue verbetering van marge en operatie"],
      features: [
        "Weekly KPI rhythm + priority decisions",
        "Menu iteration + costing support",
        "Operations/SOP improvements over time",
        "Priority access + support",
      ],
      cta: "Let’s Talk",
      href: "/contact?service=consulting&package=retainer",
    },
  ];

  const catering: Tier[] = [
    {
      title: "Private Dinner",
      kicker: "Diner op locatie",
      price: "From € 85",
      cadence: "/ per person (min 8)",
      description:
        "Chef-led diner bij jou op locatie. Menu op maat, strakke timing en zorgvuldige uitvoering — jij hoeft alleen te genieten.",
      features: [
        "Menu op maat (dieetwensen inbegrepen)",
        "Inkoop + prep inbegrepen",
        "On-site koken + plating",
        "Keuken schoon achtergelaten",
      ],
      cta: "Enquire",
      href: "/contact?service=catering&package=private-dinner",
    },
    {
      title: "Event Catering",
      kicker: "Voor groepen",
      price: "From € 29",
      cadence: "/ per person",
      description:
        "Catering die op volume overeind blijft. Duidelijk plan, goede prep en een serviceflow die klopt.",
      features: [
        "Menu ontworpen voor snelheid + kwaliteit",
        "Staffing plan (indien nodig)",
        "Allergenen netjes geregeld",
        "Run-of-show voor timing en service",
      ],
      cta: "Get a Quote",
      href: "/contact?service=catering&package=event",
      popular: true,
    },
    {
      title: "Chef for the Day",
      kicker: "Chef support",
      price: "From € 550",
      cadence: "/ per day",
      description:
        "Chef ondersteuning voor prep of service. Ik stap in, neem verantwoordelijkheid op een station en bewaak tempo en kwaliteit.",
      features: [
        "Prep + service support",
        "Station leadership",
        "Quality control + pace",
        "Korte handover notes",
      ],
      cta: "Check Availability",
      href: "/contact?service=catering&package=chef-day",
    },
  ];

  const websites: Tier[] = [
    {
      title: "Starter Site",
      kicker: "Snel live",
      price: "From € 950",
      cadence: "/ one-time",
      description:
        "Een sterke one-pager die vertrouwen opbouwt en aanzet tot contact of reserveren. Clean, snel en duidelijk.",
      features: [
        "Hero + aanbod + social proof",
        "Mobile-first design",
        "Contact form",
        "Basic SEO setup",
      ],
      cta: "Enquire",
      href: "/contact?service=websites&package=starter",
    },
    {
      title: "Booking Site",
      kicker: "Voor restaurants",
      price: "From € 1750",
      cadence: "/ one-time",
      description:
        "Multi-page site met focus op conversie: duidelijke structuur, sterke CTA’s en boekingslinks op de juiste plekken.",
      features: [
        "Multi-page structure (Home/Services/About)",
        "Menu pages + galleries",
        "Conversion-focused copy structure",
        "Analytics + tracking setup",
      ],
      cta: "Build My Site",
      href: "/contact?service=websites&package=booking",
      popular: true,
    },
    {
      title: "Growth + SEO",
      kicker: "Maandelijkse upgrades",
      price: "From € 350",
      cadence: "/ per month",
      description:
        "Doorlopende optimalisatie: SEO, content pages en conversieverbeteringen. Kleine stappen die optellen.",
      features: [
        "Maandelijkse improvements + korte rapportage",
        "SEO content plan (praktisch, niet theoretisch)",
        "Conversion tests",
        "Priority support",
      ],
      cta: "Let’s Talk",
      href: "/contact?service=websites&package=growth",
    },
  ];

  const pricingFaqs = [
    {
      q: "Zijn prijzen inclusief btw?",
      a: "Nee, alle prijzen zijn exclusief btw. Je ontvangt altijd een duidelijke bevestiging vooraf.",
    },
    {
      q: "Wat is precies ‘on-site’?",
      a: "On-site betekent: ik werk op jouw locatie mee in prep en/of service. Zo zien we de echte frictie en kunnen we direct implementeren met het team.",
    },
    {
      q: "Hoe werkt de gratis diagnose?",
      a: "Kort en praktisch. Jij geeft de basisinformatie, ik spot de grootste knelpunten en je krijgt 3 concrete next steps voor deze week.",
    },
    {
      q: "Werk je in Utrecht, Amersfoort en Zwolle?",
      a: "Ja. Ik werk door heel Nederland. Reistijd en eventuele kosten stemmen we vooraf af.",
    },
    {
      q: "Waarom focus op improvement?",
      a: "Omdat consistentie ontstaat door kleine verbeteringen die je elke dag herhaalt. Dat is wat een team zelfstandig sterk maakt.",
    },
  ];

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/10 to-transparent" />

      <PageHeader
        title="Pricing"
        subtitle="Kies de optie die nu het meeste momentum geeft. Duidelijk, praktisch, uitvoerbaar."
      />

      <section className="relative py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-8 max-w-3xl rounded-xl border border-border bg-card/40 p-4 text-sm text-muted-foreground">
            <p className="leading-relaxed">
              Alle prijzen zijn excl. btw. Reistijd en eventuele kosten worden vooraf afgestemd.
              Heldere afspraken, geen verrassingen.
            </p>
          </div>

          <div className="mx-auto mb-10 max-w-5xl rounded-2xl border border-border bg-card/40 p-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                  Focus
                </p>
                <p className="mt-2 text-base">
                  Menu engineering, food cost, prepstructuur, SOP’s en serviceflow.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                  Werkwijze
                </p>
                <p className="mt-2 text-base">
                  Diagnose → structuur bouwen → implementeren met het team → meten en bijsturen.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                  Resultaat
                </p>
                <p className="mt-2 text-base">
                  Meer controle, minder ruis, en een niveau dat consistent te draaien is.
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="consulting" className="w-full">
            <div className="flex justify-center">
              <TabsList className="h-11 rounded-full border border-border bg-card/40 p-1">
                <TabsTrigger value="consulting" className="rounded-full px-6">
                  Consulting
                </TabsTrigger>
                <TabsTrigger value="catering" className="rounded-full px-6">
                  Catering
                </TabsTrigger>
                <TabsTrigger value="websites" className="rounded-full px-6">
                  Websites
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="mt-10">
              <TabsContent value="consulting">
                <PricingGrid tiers={consulting} />
              </TabsContent>

              <TabsContent value="catering">
                <PricingGrid tiers={catering} />
              </TabsContent>

              <TabsContent value="websites">
                <PricingGrid tiers={websites} />
              </TabsContent>
            </div>

            <div className="mt-10 flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-muted-foreground">
                Niet zeker wat je nodig hebt? Start met de gratis diagnose.
              </p>
              <Link
                href="/free-diagnosis"
                className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
              >
                Free 15-min diagnosis
              </Link>
            </div>

            <div className="mx-auto mt-14 max-w-3xl">
              <h2 className="font-headline text-2xl md:text-3xl font-bold text-center">
                Pricing FAQ
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
          </Tabs>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: pricingFaqs.map((x) => ({
                  "@type": "Question",
                  name: x.q,
                  acceptedAnswer: { "@type": "Answer", text: x.a },
                })),
              }),
            }}
          />
        </div>
      </section>
    </div>
  );
}
