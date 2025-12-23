import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');

export default function Home() {

  const services = [
    {
      title: "Restaurant Consulting",
      description: "Fine-tune your operations for better margins and smoother service.",
      link: "/services/consulting",
      image: PlaceHolderImages.find(p => p.id === 'service-consulting'),
    },
    {
      title: "Catering & Private Chef",
      description: "Unforgettable dining experiences, tailored to your event.",
      link: "/services/catering",
      image: PlaceHolderImages.find(p => p.id === 'service-catering'),
    },
    {
      title: "Hospitality Websites",
      description: "Convert visitors into bookings with a site built by a chef.",
      link: "/services/websites",
      image: PlaceHolderImages.find(p => p.id === 'service-websites'),
    },
  ];

  const benefits = [
    "Increase your profit margins",
    "Smoother, more efficient operations",
    "A menu that sells and delights",
    "Stronger brand that attracts guests",
    "More direct bookings, less fees",
  ];

  const pricingTiers = [
    {
      title: "Quick Scan",
      price: "€ 495",
      description: "A 90-min deep-dive to identify your 3 biggest growth levers.",
      features: ["Review of your choice (Menu, P&L, etc.)", "Actionable priority list", "1-month WhatsApp support"],
      cta: "Book a Scan",
      href: "/contact?service=consulting&package=scan"
    },
    {
      title: "Day Rate",
      price: "€ 1200",
      description: "A full day on-site to tackle your most pressing challenges.",
      features: ["On-site observation", "Hands-on team training", "SOP development", "Follow-up report"],
       cta: "Book a Day",
       href: "/contact?service=consulting&package=day"
    },
    {
      title: "Retainer",
      price: "Custom",
      description: "Ongoing partnership for continuous growth and support.",
      features: ["Weekly KPI check-ins", "Menu iteration & costing", "Marketing & brand support", "Priority access"],
      cta: "Let's Talk",
      href: "/contact?service=consulting&package=retainer"
    },
  ];

  const faqs = [
      {
          question: "What does 'no poeha' mean?",
          answer: "It's Dutch for 'no fuss' or 'no nonsense'. My approach is direct, practical, and focused on tangible results. We skip the jargon and get straight to what works for your business.",
      },
      {
          question: "I'm just starting out. Can you help?",
          answer: "Absolutely. I help new restaurants and hospitality concepts build a strong foundation from day one, covering everything from menu engineering to operational workflows and a booking-focused website.",
      },
      {
          question: "How are you different from a regular business consultant?",
          answer: "I'm a chef first. I've run the pass, managed inventory, and dealt with the day-to-day chaos of hospitality. My advice is grounded in real-world kitchen and front-of-house experience, not just spreadsheets.",
      }
  ]
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full">
        {heroImage && 
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        }
        <div className="absolute inset-0 bg-background/70 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-foreground max-w-4xl">
            Chef-led growth for hospitality.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
            Consulting, catering, and websites that convert — no poeha, just results.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "font-semibold")}>
              Book a Free Call
            </Link>
            <Link href="/pricing" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold border-2")}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Choose your path</h2>
            <p className="mt-2 text-lg text-muted-foreground">Three ways to elevate your hospitality business.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="bg-background overflow-hidden group">
                <div className="relative h-48">
                {service.image && 
                  <Image
                    src={service.image.imageUrl}
                    alt={service.image.description}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={service.image.imageHint}
                  />
                }
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Link href={service.link} className={cn(buttonVariants({ variant: "link" }), "p-0 font-semibold text-primary")}>
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Practical results, fast.</h2>
                <p className="mt-2 text-lg text-muted-foreground">We focus on what moves the needle for your business.</p>
            </div>
            <div className="mt-12 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-lg text-foreground">{benefit}</span>
                </div>
                ))}
            </div>
        </div>
      </section>
      
      {/* Mini Case/Results Strip */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
            <p className="font-headline text-primary text-sm font-bold tracking-widest uppercase">RESULTS</p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold mt-2">From chaos to control.</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-lg">
                    <p className="font-headline text-5xl font-bold text-primary">+25%</p>
                    <p className="mt-2 text-lg text-muted-foreground">Increase in GOPPAR</p>
                    <p className="text-sm text-muted-foreground/50">Restaurant A, after menu engineering</p>
                </div>
                <div className="p-6 rounded-lg border-x-2 border-border">
                    <p className="font-headline text-5xl font-bold text-primary">-8 hrs</p>
                    <p className="mt-2 text-lg text-muted-foreground">Owner's weekly hours</p>
                    <p className="text-sm text-muted-foreground/50">Cafe B, after ops streamlining</p>
                </div>
                <div className="p-6 rounded-lg">
                    <p className="font-headline text-5xl font-bold text-primary">+300%</p>
                    <p className="mt-2 text-lg text-muted-foreground">Direct booking rate</p>
                    <p className="text-sm text-muted-foreground/50">Hotel C, after new website launch</p>
                </div>
            </div>
            <Link href="/results" className={cn(buttonVariants({ variant: "outline" }), "mt-12")}>
              See More Results
            </Link>
        </div>
      </section>


      {/* Pricing Preview */}
      <section id="pricing" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Transparent Pricing</h2>
            <p className="mt-2 text-lg text-muted-foreground">Invest in expertise, get measurable returns.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <Card key={tier.title} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{tier.title}</CardTitle>
                  <p className="text-4xl font-bold pt-4">{tier.price}</p>
                  <p className="text-muted-foreground">{tier.description}</p>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <ul className="space-y-3 flex-grow">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={tier.href} className={cn(buttonVariants({ variant: tier.price === 'Custom' ? 'default' : 'outline' }), "w-full mt-6 font-semibold")}>
                    {tier.cta}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="text-center mt-8">
            <Link href="/pricing" className={cn(buttonVariants({ variant: "link" }))}>
              See All Packages <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Band */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Ready for a change?</h2>
            <p className="mt-2 text-lg text-primary-foreground/80 max-w-2xl mx-auto">DM or WhatsApp 'SCAN' for a free, no-strings-attached audit of your website or menu.</p>
            <Link href="/contact" className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "mt-8 bg-foreground text-background hover:bg-foreground/80 font-bold")}>
              Get in Touch
            </Link>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full mt-8">
            {faqs.map((faq, i) => (
                <AccordionItem value={`item-${i}`} key={i}>
                    <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                        {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
          <div className="text-center mt-8">
            <Link href="/faq" className={cn(buttonVariants({ variant: "link" }))}>
              More Questions? <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
