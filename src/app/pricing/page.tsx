import Link from 'next/link';
import PageHeader from "@/components/page-header";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle } from 'lucide-react';
import FreeDiagnosisForm from '@/components/free-diagnosis-form';

const consultingTiers = [
  {
    title: "Quick Scan",
    price: "€ 495",
    priceDetails: "one-time",
    description: "A 90-min deep-dive to identify your 3 biggest growth levers.",
    features: ["Review of your choice (Menu, P&L, etc.)", "3-step Actionable priority list", "Recording of our session", "1-month WhatsApp support"],
    cta: "Book a Scan",
    href: "/contact?service=consulting&package=scan"
  },
  {
    title: "Day Rate",
    price: "€ 1200",
    priceDetails: "per day + travel",
    description: "A full day on-site to tackle your most pressing challenges.",
    features: ["On-site observation & analysis", "Hands-on team training", "Standard Operating Procedure (SOP) development", "Detailed follow-up report"],
     cta: "Book a Day",
     href: "/contact?service=consulting&package=day",
     popular: true,
  },
  {
    title: "Retainer",
    price: "From € 2500",
    priceDetails: "per month",
    description: "Ongoing partnership for continuous growth and support.",
    features: ["Weekly KPI check-ins", "Menu iteration & costing", "Marketing & brand support", "Supplier negotiation", "Priority access & support"],
    cta: "Let's Talk",
    href: "/contact?service=consulting&package=retainer"
  },
];

const cateringTiers = [
    {
      title: "Private Dinner",
      price: "From € 150",
      priceDetails: "per person",
      description: "An intimate, multi-course dining experience at your location. (Min. 8 guests)",
      features: ["Custom 4-course menu", "Ingredient sourcing", "On-site chef & service", "Kitchen cleanup"],
      cta: "Request a Quote",
      href: "/contact?service=catering&package=dinner"
    },
    {
      title: "Event Catering",
      price: "Custom",
      priceDetails: "based on event",
      description: "Bespoke food concepts for brand events, parties, and corporate gatherings.",
      features: ["Concept development", "Walking dinners or seated meals", "Professional waitstaff & bartenders", "Full-service planning"],
       cta: "Plan Your Event",
       href: "/contact?service=catering&package=event",
       popular: true,
    },
    {
      title: "Add-ons",
      price: "À la carte",
      priceDetails: "",
      description: "Elevate your experience with our premium selections.",
      features: ["Oyster bar", "Expert wine pairing", "Signature cocktails", "Late-night snacks"],
      cta: "Inquire Now",
      href: "/contact?service=catering"
    },
];

const websiteTiers = [
    {
      title: "One-Page Booking Site",
      price: "From € 1500",
      priceDetails: "one-time",
      description: "A fast, beautiful, and conversion-focused single page site to get you started.",
      features: ["Custom design", "Mobile-first & responsive", "Booking system integration", "Basic SEO setup", "1 hour of training"],
      cta: "Get Started",
      href: "/contact?service=websites&package=one-page"
    },
    {
      title: "Full Website",
      price: "From € 3500",
      priceDetails: "one-time",
      description: "A complete website to tell your story, showcase your menu, and drive bookings.",
      features: ["All features from One-Page", "Up to 5 content pages (e.g., About, Menu, Events)", "Advanced SEO optimization", "Google Business Profile setup"],
       cta: "Build My Site",
       href: "/contact?service=websites&package=full",
       popular: true,
    },
    {
      title: "Care Plan",
      price: "€ 150",
      priceDetails: "per month",
      description: "Keep your website fast, secure, and effective with ongoing support.",
      features: ["Weekly updates & backups", "Security monitoring", "2 hours of content updates", "Monthly performance report", "Priority support"],
      cta: "Let's Talk",
      href: "/contact?service=websites&package=care"
    },
];

const renderPricingTiers = (tiers: typeof consultingTiers) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
    {tiers.map((tier) => (
      <Card key={tier.title} className={`flex flex-col ${tier.popular ? 'border-primary border-2' : ''}`}>
        {tier.popular && <div className="bg-primary text-center py-1 text-sm font-semibold text-primary-foreground">Most Popular</div>}
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{tier.title}</CardTitle>
          <div className="pt-4">
            <span className="text-4xl font-bold">{tier.price}</span>
            <span className="text-muted-foreground">{tier.priceDetails && ` / ${tier.priceDetails}`}</span>
          </div>
          <CardDescription className="pt-2 !mt-0">{tier.description}</CardDescription>
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
        <CardFooter>
          <Button asChild className="w-full font-semibold" variant={tier.popular ? 'default' : 'outline'}>
            <Link href={tier.href}>{tier.cta}</Link>
          </Button>
        </CardFooter>
      </Card>
    ))}
  </div>
);


export default function PricingPage() {
  return (
    <div>
      <PageHeader
        title="Transparent Pricing"
        subtitle="No hidden fees, no complex contracts. Just clear, value-driven packages designed to help your hospitality business thrive."
      />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <Tabs defaultValue="consulting" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto h-auto">
            <TabsTrigger value="consulting" className="py-2 text-base">Consulting</TabsTrigger>
            <TabsTrigger value="catering" className="py-2 text-base">Catering</TabsTrigger>
            <TabsTrigger value="websites" className="py-2 text-base">Websites</TabsTrigger>
          </TabsList>
          <TabsContent value="consulting" className="mt-12">
            {renderPricingTiers(consultingTiers)}
          </TabsContent>
          <TabsContent value="catering" className="mt-12">
            {renderPricingTiers(cateringTiers)}
          </TabsContent>
          <TabsContent value="websites" className="mt-12">
            {renderPricingTiers(websiteTiers)}
             <div className="mt-12 text-center text-muted-foreground max-w-3xl mx-auto">
                <h3 className="font-headline text-lg text-foreground">What does "conversion-focused" mean?</h3>
                <p className="mt-2">It means every element of your site—from the menu layout to the page speed and booking button placement—is meticulously designed to turn a visitor into a paying guest. It's about aligning with Google's best practices and understanding the psychology of a hungry customer.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Free AI-Powered Diagnosis</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                  Not sure where to start? Upload a photo of a dish, your menu, or even your storefront. Our AI will give you a quick analysis and three actionable suggestions to improve.
              </p>
          </div>
          <div className="max-w-2xl mx-auto mt-12">
              <FreeDiagnosisForm />
          </div>
        </div>
      </section>
    </div>
  );
}
