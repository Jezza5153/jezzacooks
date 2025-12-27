// src/app/page.tsx
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Jezza Cooks | Horeca consultancy, catering en restaurant websites",
  description:
    "Horeca consultant voor restaurants en hospitality teams. Menu engineering, food cost controle, prep structuur, SOP’s en team training. Ook restaurant websites met heldere presentatie en SEO basis.",
  openGraph: {
    title: "Jezza Cooks | Level up the chaos",
    description:
      "Rust op de vloer met betere gewoontes: menu engineering, food cost, SOP’s en training. Plus restaurant websites die helder laten zien wat je doet en meer aanvragen opleveren.",
    type: "website",
  },
};

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === "hero-home");

  const services = [
    {
      title: "Restaurant Consulting",
      description:
        "Menukaart optimaliseren, food cost onder controle, prep structuur en teamtraining. Systemen die blijven staan tijdens echte service.",
      link: "/services/consulting",
      image: PlaceHolderImages.find((p) => p.id === "service-consulting"),
    },
    {
      title: "Catering & Private Chef",
      description:
        "Chef-led diners voor events en privé. Seizoensmenu’s, strakke timing en een ervaring waar gasten over praten.",
      link: "/services/catering",
      image: PlaceHolderImages.find((p) => p.id === "service-catering"),
    },
    {
      title: "Restaurant Websites",
      description:
        "Websites voor restaurants die je verhaal helder maken. Een premium visitekaartje met duidelijke info, foto’s, menu en contact. Reserveren? Daar koppel ik een systeem aan dat bij je zaak past.",
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
      question: "Wat bedoel je met ‘organized chaos’?",
      answer:
        "Horeca blijft druk, dat hoort erbij. Organized chaos betekent: de rush blijft, maar de paniek verdwijnt. Met duidelijke prep, heldere rollen en systemen die je team echt volgt, krijg je consistentie, rustigere shifts en betere marges.",
    },
    {
      question: "Wat gebeurt er bij de gratis diagnose?",
      answer:
        "Je vult een korte vragenlijst in. Ik kijk waar het weglekt: food cost, loondruk, frictie in workflow en menukaartproblemen. Daarna stuur ik drie concrete stappen die je deze week al kunt uitvoeren. Kort, praktisch en uitvoerbaar.",
    },
    {
      question: "Werk je alleen met fine dining restaurants?",
      answer:
        "Nee. Ik werk met restaurants, cafés, pubs, cateringteams en hospitality concepten die meer grip willen en betere resultaten zoeken. De basis blijft hetzelfde: structuur, training, consistentie en een menukaart die logisch draait.",
    },
    {
      question: "Wat maakt jou anders dan een standaard business consultant?",
      answer:
        "Ik ben chef en operator eerst. Ik heb service gedraaid, prepsystemen gebouwd, met leveranciers onderhandeld en teams getraind in echte horeca-druk. Daarom is mijn advies uitvoerbaar op de vloer, niet alleen theorie op papier.",
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

        {/* Stronger image presence: lighter overlay (less fade), still readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-background/40 to-background/10" />

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
              Kies je pad
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Drie manieren om je restaurant of horecateam strakker te laten draaien, met chef-led strategie en uitvoering.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.link}
                className={cn(
                  "group block h-full",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-0"
                )}
                aria-label={`${service.title} bekijken`}
              >
                <Card
                  className={cn(
                    "h-full overflow-hidden rounded-3xl",
                    "border border-white/5",
                    "bg-card/30 backdrop-blur-md",
                    "shadow-[0_18px_70px_rgba(0,0,0,0.35)]",
                    "transition-all duration-300 ease-out",
                    "hover:-translate-y-1 hover:bg-card/40 hover:border-white/8 hover:shadow-[0_28px_90px_rgba(0,0,0,0.45)]"
                  )}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3]">
                    {/* soft top glow, blends in */}
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 opacity-60",
                        "bg-[radial-gradient(900px_320px_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]",
                        "transition-opacity duration-300 ease-out",
                        "group-hover:opacity-80"
                      )}
                    />
                    {service.image && (
                      <Image
                        src={service.image.imageUrl}
                        alt={service.image.description}
                        fill
                        className={cn(
                          "object-contain p-5",
                          "transition-transform duration-300 ease-out",
                          "group-hover:scale-[1.03]"
                        )}
                        data-ai-hint={service.image.imageHint}
                      />
                    )}
                  </div>

                  <CardHeader className="pt-6">
                    <CardTitle className="font-headline text-2xl">
                      {service.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pb-7">
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>

                    {/* CTA hint (not a link, whole card is clickable) */}
                    <div className="mt-6 inline-flex items-center gap-2 text-primary font-semibold">
                      <span>Bekijk hoe het werkt</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
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
              We focussen op wat prestaties in restaurants en horecateams echt verbetert: food cost, workflow, training en directe boekingen.
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
                Met een restaurant website die gemaakt is voor reserveringen + een sterke SEO basis
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
              Vul een korte vragenlijst in. Ik spot de grootste knelpunten (food cost, arbeid, workflow, menu) en stuur je
              drie concrete stappen die je deze week al kunt uitvoeren.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">1) Jij vult het in</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Ongeveer 2 minuten. Meerkeuze. Geen lange verhalen nodig.
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">2) Ik diagnoseer</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Food cost, loondruk, workflow-frictie en menukaart-issues. Recht door zee.
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">3) Jij krijgt een plan</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Drie acties voor deze week. Als het klikt, bespreken we de volgende stap.
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
            Start met de gratis diagnose. Als er een match is, bouwen we snel systemen die je team echt kan draaien.
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
