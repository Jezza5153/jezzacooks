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
import { useTranslations } from "next-intl";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');

export default function Home() {
  const t = useTranslations('HomePage');

  const services = [
    {
      title: t('consultingTitle'),
      description: t('consultingDescription'),
      link: "/services/consulting",
      image: PlaceHolderImages.find(p => p.id === 'service-consulting'),
    },
    {
      title: t('cateringTitle'),
      description: t('cateringDescription'),
      link: "/services/catering",
      image: PlaceHolderImages.find(p => p.id === 'service-catering'),
    },
    {
      title: t('websitesTitle'),
      description: t('websitesDescription'),
      link: "/services/websites",
      image: PlaceHolderImages.find(p => p.id === 'service-websites'),
    },
  ];

  const benefits = [
    t('benefit1'),
    t('benefit2'),
    t('benefit3'),
    t('benefit4'),
    t('benefit5'),
  ];

  const pricingTiers = [
    {
      title: t('quickScanTitle'),
      price: t('quickScanPrice'),
      description: t('quickScanDescription'),
      features: [t('quickScanFeature1'), t('quickScanFeature2'), t('quickScanFeature3')],
      cta: t('quickScanCta'),
      href: "/contact?service=consulting&package=scan"
    },
    {
      title: t('dayRateTitle'),
      price: t('dayRatePrice'),
      description: t('dayRateDescription'),
      features: [t('dayRateFeature1'), t('dayRateFeature2'), t('dayRateFeature3'), t('dayRateFeature4')],
       cta: t('dayRateCta'),
       href: "/contact?service=consulting&package=day"
    },
    {
      title: t('retainerTitle'),
      price: t('retainerPrice'),
      description: t('retainerDescription'),
      features: [t('retainerFeature1'), t('retainerFeature2'), t('retainerFeature3'), t('retainerFeature4')],
      cta: t('retainerCta'),
      href: "/contact?service=consulting&package=retainer"
    },
  ];

  const faqs = [
      {
          question: t('faq1Question'),
          answer: t('faq1Answer'),
      },
      {
          question: t('faq2Question'),
          answer: t('faq2Answer'),
      },
      {
          question: t('faq3Question'),
          answer: t('faq3Answer'),
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
            {t('heroTitle')}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
            {t('heroSubtitle')}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "font-semibold")}>
              {t('bookCall')}
            </Link>
            <Link href="/pricing" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold border-2")}>
              {t('viewPricing')}
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">{t('servicesTitle')}</h2>
            <p className="mt-2 text-lg text-muted-foreground">{t('servicesSubtitle')}</p>
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
                    {t('learnMore')} <ArrowRight className="ml-2 h-4 w-4" />
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
                <h2 className="font-headline text-3xl md:text-4xl font-bold">{t('benefitsTitle')}</h2>
                <p className="mt-2 text-lg text-muted-foreground">{t('benefitsSubtitle')}</p>
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
            <p className="font-headline text-primary text-sm font-bold tracking-widest uppercase">{t('resultsTag')}</p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold mt-2">{t('resultsTitle')}</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-lg">
                    <p className="font-headline text-5xl font-bold text-primary">{t('gopParIncrease')}</p>
                    <p className="mt-2 text-lg text-muted-foreground">{t('gopParDescription')}</p>
                    <p className="text-sm text-muted-foreground/50">{t('gopParNote')}</p>
                </div>
                <div className="p-6 rounded-lg border-x-2 border-border">
                    <p className="font-headline text-5xl font-bold text-primary">{t('ownerHoursDecrease')}</p>
                    <p className="mt-2 text-lg text-muted-foreground">{t('ownerHoursDescription')}</p>
                    <p className="text-sm text-muted-foreground/50">{t('ownerHoursNote')}</p>
                </div>
                <div className="p-6 rounded-lg">
                    <p className="font-headline text-5xl font-bold text-primary">{t('directBookingIncrease')}</p>
                    <p className="mt-2 text-lg text-muted-foreground">{t('directBookingDescription')}</p>
                    <p className="text-sm text-muted-foreground/50">{t('directBookingNote')}</p>
                </div>
            </div>
            <Link href="/results" className={cn(buttonVariants({ variant: "outline" }), "mt-12")}>
              {t('seeMoreResults')}
            </Link>
        </div>
      </section>


      {/* Pricing Preview */}
      <section id="pricing" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">{t('pricingTitle')}</h2>
            <p className="mt-2 text-lg text-muted-foreground">{t('pricingSubtitle')}</p>
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
              {t('seeAllPackages')} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Band */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">{t('ctaTitle')}</h2>
            <p className="mt-2 text-lg text-primary-foreground/80 max-w-2xl mx-auto">{t('ctaSubtitle')}</p>
            <Link href="/contact" className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "mt-8 bg-foreground text-background hover:bg-foreground/80 font-bold")}>
              {t('getInTouch')}
            </Link>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">{t('faqTitle')}</h2>
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
              {t('moreQuestions')} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

    