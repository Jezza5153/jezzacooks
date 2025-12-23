// app/pricing/page.tsx
import { Link } from "next-intl";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

type Tier = {
  title: string;
  price: string;
  priceDetails?: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
  note?: string;
};

const consultingTiers: Tier[] = [
  {
    title: "Quick Scan",
    price: "€ 495",
    priceDetails: "one-time",
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
    note: "Best when you want clarity fast.",
  },
  {
    title: "Day Rate (On-Site)",
    price: "€ 1200",
    priceDetails: "per day + travel",
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
    note: "Fastest impact when things feel chaotic.",
  },
  {
    title: "Retainer",
    price: "Custom",
    priceDetails: "per month",
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
    note: "Best if you want a long-term operator in your corner.",
  },
];

const cateringTiers: Tier[] = [
  {
    title: "Private Dinner",
    price: "From € 150",
    priceDetails: "per person",
    description:
      "An intimate multi-course dinner at your location. (Min. 8 guests)",
    features: [
      "Custom 4-course menu",
      "Ingredient sourcing",
      "On-site chef execution",
      "Kitchen cleanup",
    ],
    cta: "Request a Quote",
    href: "/contact?service=catering&package=dinner",
  },
  {
    title: "Event Catering",
    price: "Custom",
    priceDetails: "based on event",
    description:
      "Bespoke food concepts for parties, brand events, and corporate gatherings.",
    features: [
      "Concept + menu development",
      "Walking dinner or seated service",
      "Staffing options available",
      "Planning support",
    ],
    cta: "Plan Your Event",
    href: "/contact?service=catering&package=event",
    popular: true,
  },
  {
    title: "Add-ons",
    price: "À la carte",
    description: "Upgrade the experience with premium extras.",
    features: ["Oyster bar", "Wine pairing", "Signature cocktails", "Late-night snacks"],
    cta: "Inquire Now",
    href: "/contact?service=catering",
  },
];

const websiteTiers: Tier[] = [
  {
    title: "One-Page Booking Site",
    price: "From € 1400",
    priceDetails: "one-time",
    description:
      "Fast, clean, conversion-first one-pager to start getting inquiries and bookings.",
    features: [
      "Custom design (hospitality-first)",
      "Mobile-first & responsive",
      "Clear CTA + booking/inquiry integration",
      "Basic SEO setup",
      "1 hour handover training",
    ],
    cta: "Get Started",
    href: "/contact?service=websites&package=one-page",
  },
  {
    title: "Full Website",
    price: "From € 3200",
    priceDetails: "one-time",
    description:
      "A full site to tell your story, showcase offers/menus, and drive direct bookings.",
    features: [
      "Everything from One-Page",
      "Up to 5 content pages (About, Menu/Offer, Results, FAQ, Contact)",
      "Performance + SEO best practices",
      "Google Business Profile guidance/setup",
    ],
    cta: "Build My Site",
    href: "/contact?service=websites&package=full",
    popular: true,
  },
  {
    title: "Care Plan",
    price: "€ 150",
    priceDetails: "per month",
    description:
      "Keep the site fast, secure, and effective with ongoing updates and small changes.",
    features: [
      "Weekly updates & checks",
      "Security monitoring",
      "Up to 2 hours content edits/month",
      "Priority support",
    ],
    cta: "Let’s Talk",
    href: "/contact?service=websites&package=care",
  },
];

function PricingGrid({ tiers }: { tiers: Tier[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
      {tiers.map((tier) => (
        <Card
          key={tier.title}
          className={`flex flex-col ${tier.popular ? "border-primary border-2" : ""}`}
        >
          {tier.popular && (
            <div className="bg-primary text-center py-1 text-sm font-semibold text-primary-foreground">
              Most Popular
            </div>
          )}

          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="font-headline text-2xl">{tier.title}</CardTitle>
              {tier.note ? (
                <Badge variant="secondary" className="hidden sm:inline-flex">
                  {tier.note}
                </Badge>
              ) : null}
            </div>

            <div className="pt-4">
              <span className="text-4xl font-bold">{tier.price}</span>
              {tier.priceDetails ? (
                <span className="text-muted-foreground">{` / ${tier.priceDetails}`}</span>
              ) : null}
            </div>

            <CardDescription className="pt-2 !mt-0">
              {tier.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-grow">
            <ul className="space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button
              asChild
              className="w-full font-semibold"
              variant={tier.popular ? "default" : "outline"}
            >
              <Link href={tier.href}>{tier.cta}</Link>
            </Button>
            
            <Button
              asChild
              className="w-full font-semibold"
              variant={"link"}
            >
              <Link href="/free-diagnosis">Or start with a free diagnosis</Link>
            </Button>

          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default function PricingPage() {
  return (
    <div>
      <PageHeader
        title="Transparent Pricing"
        subtitle="Clear packages. No vague hours. If it’s not a fit, I’ll tell you straight."
      />

      <div className="container mx-auto px-4 py-16 md:py-24 space-y-12">
        
        {/* TABS */}
        <Tabs defaultValue="consulting" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto h-auto">
            <TabsTrigger value="consulting" className="py-2 text-base">
              Consulting
            </TabsTrigger>
            <TabsTrigger value="catering" className="py-2 text-base">
              Catering
            </TabsTrigger>
            <TabsTrigger value="websites" className="py-2 text-base">
              Websites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consulting" className="mt-12">
            <PricingGrid tiers={consultingTiers} />
          </TabsContent>

          <TabsContent value="catering" className="mt-12">
            <PricingGrid tiers={cateringTiers} />
          </TabsContent>

          <TabsContent value="websites" className="mt-12">
            <PricingGrid tiers={websiteTiers} />
            <div className="mt-12 text-center text-muted-foreground max-w-3xl mx-auto">
              <h3 className="font-headline text-lg text-foreground">
                What does “conversion-focused” mean?
              </h3>
              <p className="mt-2">
                It means the site is built to turn visitors into bookings: clarity, speed, trust
                signals, and CTAs that are impossible to miss—especially on mobile.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
