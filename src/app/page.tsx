
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

export default function Home() {
  const services = [
    {
      title: "Restaurant Consulting",
      description:
        "Menu engineering, food cost control, prep structure, SOPs, and team training. Calm systems that hold up in real service.",
      link: "/services/consulting",
      image: PlaceHolderImages.find((p) => p.id === "service-consulting"),
    },
    {
      title: "Catering & Private Chef",
      description:
        "Chef-led dining for events and private dinners. Seasonal menus, smooth execution, and a guest experience people remember.",
      link: "/services/catering",
      image: PlaceHolderImages.find((p) => p.id === "service-catering"),
    },
    {
      title: "Hospitality Websites",
      description:
        "Websites built for restaurants. Clear story, strong SEO, and more direct bookings without endless platform fees.",
      link: "/services/websites",
      image: PlaceHolderImages.find((p) => p.id === "service-websites"),
    },
  ];

  const benefits = [
    "Lagere food cost en betere margecontrole",
    "Strakkere prep en een soepelere serviceflow",
    "Menu’s die verkopen én bij je passen",
    "Training die blijft hangen (minder schreeuwen, meer duidelijkheid)",
    "Meer directe boekingen, minder platformkosten",
  ];

  const faqs = [
    {
      question: "What do you mean by 'organized chaos'?",
      answer:
        "Hospitality will always be busy. Organized chaos means the rush stays, but the panic is gone. Clear prep, clear roles, and systems your team actually follows. That’s how you get consistency, calmer shifts, and better margins.",
    },
    {
      question: "What happens in the free diagnosis?",
      answer:
        "You answer a short questionnaire. I look for the obvious leaks: food cost, labor pressure, workflow friction, and menu issues. Then you get 3 concrete next steps you can implement this week. No long reports, no fluff.",
    },
    {
      question: "Do you only work with fine dining?",
      answer:
        "No. I work with restaurants, pubs, cafes, catering teams, and hospitality concepts that want more control and better results. The principles are the same: structure, training, consistency, and a menu that makes sense.",
    },
    {
      question: "How are you different from a standard business consultant?",
      answer:
        "I’m a chef and operator first. I’ve run service, built prep systems, negotiated with suppliers, trained teams, and dealt with real hospitality chaos. So the advice is practical and executable, not theory on a slide deck.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full">
        <Image
          src="/pics/hero-home.jpg"
          alt="Jezza Cooks — organized chaos in hospitality"
          fill
          className="object-cover"
          priority
          data-ai-hint="chef kitchen"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/55 to-background/10" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-foreground max-w-4xl">
            Level up the chaos.
          </h1>

          <p className="mt-4 text-lg md:text-2xl text-muted-foreground max-w-3xl">
            Don&apos;t chase perfection. Chase improvement.
          </p>

          <p className="mt-6 text-base md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Rust komt niet door meer personeel, maar door betere gewoontes. Daarom bouw ik teams die het kunnen herhalen,
            niet gerechten die één keer lukken.
            <br />
            Als dat staat, dan krijg je organized chaos: de shift loopt strak en de kwaliteit blijft hoog, keer op keer.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/free-diagnosis"
              className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
            >
              Gratis 15-min diagnose
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
            Typische focus: food cost, prep-structuur, soepelere service en meer controle.
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
              Three ways to improve your hospitality business with chef-led strategy and execution.
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
                    See how it works <ArrowRight className="ml-2 h-4 w-4" />
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
              Snelle, praktische resultaten.
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              We focussen op de hefbomen die prestaties in restaurants en horecateams écht verbeteren:
              food cost, workflow, training en directe boekingen.
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
              Start je gratis diagnose <ArrowRight className="ml-2 h-4 w-4" />
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
            Voorbeelden van wat klanten meestal verbeteren met betere structuur, prijsstelling en uitvoering.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg">
              <p className="font-headline text-5xl font-bold text-primary">5–15%</p>
              <p className="mt-2 text-lg text-muted-foreground">Lagere food cost</p>
              <p className="text-sm text-muted-foreground/50">
                Door menu engineering + strakkere prep en portiecontrole
              </p>
            </div>

            <div className="p-6 rounded-lg border-x-2 border-border">
              <p className="font-headline text-5xl font-bold text-primary">4–10 uur</p>
              <p className="mt-2 text-lg text-muted-foreground">Minder brandjes blussen</p>
              <p className="text-sm text-muted-foreground/50">
                Met duidelijke rollen, SOP’s/checklists en teamtraining
              </p>
            </div>

            <div className="p-6 rounded-lg">
              <p className="font-headline text-5xl font-bold text-primary">2–4x</p>
              <p className="mt-2 text-lg text-muted-foreground">Meer directe boekingen</p>
              <p className="text-sm text-muted-foreground/50">
                Met een booking-focused hospitality website + SEO basics
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
              Vul een korte vragenlijst in. Ik spot de grootste “leaks” (food cost, arbeid, workflow, menu) en stuur je
              3 concrete next steps die je deze week al kunt uitvoeren.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">1) Jij vult het in</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                2 minuten. Multiple choice. Geen lange verhalen nodig.
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">2) Ik diagnoseer</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Food cost, loondruk, workflow-frictie en menu-issues. Recht door zee.
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">3) Jij krijgt een plan</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                3 acties voor deze week. Als het klikt, bespreken we de volgende stap.
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
            Klaar voor een rustigere, sterkere operatie?
          </h2>
          <p className="mt-2 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Start met de gratis diagnose. Als er een match is, bouwen we snel systemen die je team écht kan draaien.
          </p>
          <Link
            href="/free-diagnosis"
            className={cn(
              buttonVariants({ size: "lg", variant: "secondary" }),
              "mt-8 bg-foreground text-background hover:bg-foreground/80 font-bold"
            )}
          >
            Gratis 15-min diagnose
          </Link>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
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
              More Questions? <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
