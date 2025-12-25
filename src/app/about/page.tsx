// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const heroImage = PlaceHolderImages.find((p) => p.id === "hero-home");

export default function Home() {
  const services = [
    {
      title: "Restaurant Consulting",
      description:
        "Menu engineering, food cost, prime cost, prepstructuur, SOP’s en teamtraining. Rustige systemen die overeind blijven tijdens echte service.",
      link: "/services/consulting",
      image: PlaceHolderImages.find((p) => p.id === "service-consulting"),
    },
    {
      title: "Catering & Private Chef",
      description:
        "Chef-led diners en events. Seizoensmenu’s, strakke uitvoering, goede timing en een gastbeleving die mensen onthouden.",
      link: "/services/catering",
      image: PlaceHolderImages.find((p) => p.id === "service-catering"),
    },
    {
      title: "Hospitality Websites",
      description:
        "Websites voor restaurants en horeca. Duidelijk verhaal, sterke SEO, en meer directe reserveringen zonder eindeloze platformkosten.",
      link: "/services/websites",
      image: PlaceHolderImages.find((p) => p.id === "service-websites"),
    },
  ];

  const benefits = [
    "Lagere food cost en betere margecontrole",
    "Strakkere prepstructuur en soepelere serviceflow",
    "Menu’s die verkopen én bij je concept passen",
    "Training die blijft hangen (minder schreeuwen, meer duidelijkheid)",
    "Meer directe reserveringen en minder platformkosten",
  ];

  const faqs = [
    {
      question: "Wat bedoel je met ‘organized chaos’?",
      answer:
        "Horeca blijft druk. Organized chaos betekent: de druk blijft, maar de paniek verdwijnt. Duidelijke prep, heldere rollen, vaste standaarden en systemen die je team echt volgt. Dat levert consistentie, rustigere shifts en betere marges op.",
    },
    {
      question: "Wat gebeurt er in de gratis diagnose?",
      answer:
        "Je vult een korte intake in. Ik spot de grootste lekken in je operatie: food cost, loonkosten (labor), workflow frictie en menu-keuzes. Daarna krijg je 3 concrete next steps die je deze week kunt uitvoeren. Geen lange rapporten, wel actie.",
    },
    {
      question: "Werk je alleen met fine dining?",
      answer:
        "Nee. Ik werk met restaurants, pubs, cafés, catering teams en horecaconcepten die meer controle en betere resultaten willen. De basis is overal hetzelfde: structuur, training, consistentie en een menu dat klopt.",
    },
    {
      question: "Wat is het verschil met een ‘gewone’ business consultant?",
      answer:
        "Ik ben chef en operator eerst. Ik sta op de vloer, zie wat er echt gebeurt, en bouw systemen die in service werken. Dus geen theorie op slides, maar praktische verbeteringen die je team kan herhalen.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-background/70 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-foreground max-w-4xl">
            Level up the chaos.
          </h1>

          <p className="mt-4 text-lg md:text-2xl text-muted-foreground max-w-3xl">
            Don’t chase perfection. Chase improvement.
          </p>

          <p className="mt-6 text-base md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Rust komt niet door meer personeel, maar door betere gewoontes. Daarom bouw ik teams die het kunnen herhalen,
            niet gerechten die één keer lukken. En als dat staat, dan krijg je organized chaos: de shift loopt strak en de
            kwaliteit blijft hoog, service na service.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/free-diagnosis"
              className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
            >
              Plan een gratis 15-min call
            </Link>
            <Link
              href="/results"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "font-semibold border-2"
              )}
            >
              Bekijk resultaten
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Focus: food cost, prime cost, prepstructuur, serviceflow, training en menu engineering.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Choose your path
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Drie manieren om je horecabedrijf te verbeteren met chef-led strategie en uitvoering op de vloer.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="bg-background overflow-hidden group">
                <div className="relative h-48">
                  {service.image && (
                    <Image
                      src={service.image.imageUrl}
                      alt={service.image.description}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={service.image.imageHint}
                    />
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Link
                    href={service.link}
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "p-0 font-semibold text-primary"
                    )}
                  >
                    Bekijk hoe het werkt <ArrowRight className="ml-2 h-4 w-4" />
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
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Snelle, meetbare verbeteringen.
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              We focussen op de hefbomen die in de horeca écht het verschil maken: food cost, workflow, training, menu engineering en uitvoering.
            </p>
          </div>

          <div className="mt-12 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-lg text-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/free-diagnosis"
              className={cn(buttonVariants({ variant: "outline" }), "font-semibold")}
            >
              Start met de gratis diagnose <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mini Case/Results Strip */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <p className="font-headline text-primary text-sm font-bold tracking-widest uppercase">
            RESULTS
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mt-2">
            Chaos to Control.
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Voorbeelden van wat ondernemers meestal verbeteren met betere structuur, prijsstrategie, menu engineering en uitvoering op de vloer.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg">
              <p className="font-headline text-5xl font-bold text-primary">5–15%</p>
              <p className="mt-2 text-lg text-muted-foreground">Lagere food cost</p>
              <p className="text-sm text-muted-foreground/50">
                Door menu engineering, portiecontrole en strakkere prep
              </p>
            </div>

            <div className="p-6 rounded-lg border-x-2 border-border">
              <p className="font-headline text-5xl font-bold text-primary">4–10 uur</p>
              <p className="mt-2 text-lg text-muted-foreground">Minder brandjes blussen</p>
              <p className="text-sm text-muted-foreground/50">
                Met duidelijke rollen, SOP’s, routines en teamtraining
              </p>
            </div>

            <div className="p-6 rounded-lg">
              <p className="font-headline text-5xl font-bold text-primary">2–4x</p>
              <p className="mt-2 text-lg text-muted-foreground">Meer directe reserveringen</p>
              <p className="text-sm text-muted-foreground/50">
                Met een website die converteert plus SEO basics
              </p>
            </div>
          </div>

          <Link href="/results" className={cn(buttonVariants({ variant: "outline" }), "mt-12")}>
            Bekijk meer resultaten
          </Link>
        </div>
      </section>

      {/* How the free diagnosis works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Gratis diagnose. Zero poeha.
            </h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Vul een korte intake in. Ik spot de grootste lekken in je operatie (food cost, loonkosten, workflow en menu) en je krijgt 3 concrete next steps voor deze week.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">1) Jij vult ‘m in</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                2 minuten. Multiple choice. Geen lange verhalen, alleen de info die ik nodig heb.
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">2) Ik diagnoseer</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Ik kijk naar prime cost (food + labor), serviceflow, prepstructuur en menu-keuzes. Waar lekt geld, waar ontstaat stress?
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">3) Jij krijgt een plan</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                3 acties die je direct kunt uitvoeren. Als het klikt, bepalen we samen de volgende stap.
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/free-diagnosis"
              className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
            >
              Start de gratis diagnose <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Klaar voor meer rust en controle?
          </h2>
          <p className="mt-2 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Start met de gratis diagnose. Als er een fit is, bouwen we snel systemen die je team echt kan draaien.
          </p>
          <Link
            href="/free-diagnosis"
            className={cn(
              buttonVariants({ size: "lg", variant: "secondary" }),
              "mt-8 bg-foreground text-background hover:bg-foreground/80 font-bold"
            )}
          >
            Plan een gratis 15-min call
          </Link>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Veelgestelde vragen
            </h2>
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
              Meer vragen? <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
