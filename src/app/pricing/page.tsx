// src/app/pricing/page.tsx
import Link from "next/link";
import { CheckCircle } from "lucide-react";

import PageHeader from "@/components/page-header";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Tier = {
  title: string;
  kicker?: string; // small pill on the right
  price: string;
  cadence?: string; // "/ one-time", "/ per day + travel", "/ per month"
  description: string;
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
            {/* Popular ribbon */}
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
                  Not sure? Start with the free diagnosis below.
                </p>
              </div>
            </CardContent>

            {/* subtle bottom glow for popular */}
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
      kicker: "Best when you want clarity fast.",
      price: "€ 495",
      cadence: "/ one-time",
      description:
        "A 90-min deep-dive to diagnose your biggest leaks and map the top 3 priorities for the next 30 days.",
      features: [
        "Choose 1 focus: Menu / Margins / Operations / Bookings",
        "Clear diagnosis + 3-step priority plan",
        "Session recording",
        "1 month WhatsApp support (light)",
      ],
      cta: "Book a Scan",
      href: "/contact?service=consulting&package=scan",
    },
    {
      title: "Day Rate (On-Site)",
      kicker: "Fastest impact when things feel chaotic.",
      price: "€ 1100",
      cadence: "/ per day + travel",
      description:
        "A full day on-site to fix the real bottleneck: flow, prep, roles, standards, and execution.",
      features: [
        "On-site observation & bottleneck mapping",
        "Hands-on team training during live service or prep",
        "SOP/checklists (minimum viable, actually usable)",
        "Action plan for the next 2–4 weeks",
      ],
      cta: "Book a Day",
      href: "/contact?service=consulting&package=day",
      popular: true,
    },
    {
      title: "Retainer",
      kicker: "Best if you want a long-term operator in your corner.",
      price: "From € 2400",
      cadence: "/ per month",
      description:
        "Ongoing partnership for continuous improvement, accountability, and steady margin + system upgrades.",
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

  // Keep these simple—same layout, different offer
  const catering: Tier[] = [
    {
      title: "Private Dinner",
      kicker: "Perfect for a special night.",
      price: "From € 650",
      cadence: "/ per event",
      description:
        "A chef-led dinner at your location. You enjoy the night—service, timing, and execution are on me.",
      features: [
        "Tailored menu (dietaries included)",
        "Shopping + prep included",
        "On-site cooking + plating",
        "Kitchen left clean",
      ],
      cta: "Enquire",
      href: "/contact?service=catering&package=private-dinner",
    },
    {
      title: "Event Catering",
      kicker: "Best for groups + flow.",
      price: "From € 25",
      cadence: "/ per person",
      description:
        "Food that holds up at volume. Clear plan, tight prep, smooth service, happy guests.",
      features: [
        "Menu designed for speed + quality",
        "Staffing plan (if needed)",
        "Allergies handled properly",
        "Run-of-show for service timing",
      ],
      cta: "Get a Quote",
      href: "/contact?service=catering&package=event",
      popular: true,
    },
    {
      title: "Chef for the Day",
      kicker: "Extra hands, done right.",
      price: "From € 450",
      cadence: "/ per day",
      description:
        "Need a calm, strong chef for prep or service? I slot in and raise standards without drama.",
      features: [
        "Prep + service support",
        "Station leadership",
        "Quality control + pace",
        "Quick handover notes",
      ],
      cta: "Check Availability",
      href: "/contact?service=catering&package=chef-day",
    },
  ];

  const websites: Tier[] = [
    {
      title: "Starter Site",
      kicker: "Clean + fast.",
      price: "From € 950",
      cadence: "/ one-time",
      description:
        "A sharp one-page site that looks premium and gets people to contact you.",
      features: [
        "Hero + offer + social proof",
        "Mobile-first design",
        "Contact form",
        "Basic SEO setup",
      ],
      cta: "Enquire",
      href: "/contact?service=websites&package=starter",
    },
    {
      title: "Booking Site",
      kicker: "Best for restaurants.",
      price: "From € 1750",
      cadence: "/ one-time",
      description:
        "Built to convert. Clear menu, strong CTAs, booking links everywhere—no fluff.",
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
      kicker: "For consistent inbound.",
      price: "From € 350",
      cadence: "/ per month",
      description:
        "Ongoing improvements: SEO, pages, experiments, and conversion upgrades over time.",
      features: [
        "Monthly improvements + reporting",
        "SEO content plan (practical)",
        "Conversion tests",
        "Priority support",
      ],
      cta: "Let’s Talk",
      href: "/contact?service=websites&package=growth",
    },
  ];

  return (
    <div className="relative">
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/10 to-transparent" />

      <PageHeader
        title="Pricing"
        subtitle="Pick the simplest option that gets you momentum. No fluff—just outcomes."
      />

      <section className="relative py-12 md:py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="consulting" className="w-full">
            {/* Top toggle */}
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

            {/* bottom CTA */}
            <div className="mt-10 flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-muted-foreground">
                Not sure what you need? Start with the free diagnosis.
              </p>
              <Link
                href="/free-diagnosis"
                className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
              >
                Free 15-min diagnosis
              </Link>
            </div>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
