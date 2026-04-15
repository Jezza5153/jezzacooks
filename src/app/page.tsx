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
import JsonLd from "@/components/seo/json-ld";
import { buildFaqPage } from "@/lib/schema";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Horeca consultancy, catering, restaurant websites en SEO/GEO",
  description:
    "Chef-led horeca specialist in Amersfoort. Restaurant consulting vanaf €450, catering vanaf €7,50 p.p., restaurant websites voor €400 en SEO + GEO optimalisatie vanaf €150 per maand. Door Jeremy Arrascaeta (chef-kok bij De Tafelaar Amersfoort, 10+ jaar high-end keukens). Zichtbaar in Google én ChatGPT, Perplexity en AI Overviews.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Jezza Cooks | Level up the chaos",
    description:
      "Vier diensten, één operator: consulting, catering, websites en SEO/GEO. Chef-led door Jeremy Arrascaeta (chef-kok bij De Tafelaar Amersfoort), 10+ jaar high-end keukens in Europa en Australië. Amersfoort en heel Nederland.",
    type: "website",
    url: "/",
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
      priceLabel: "Vanaf €450 / dagdeel",
    },
    {
      title: "Catering & Private Chef",
      description:
        "Chef-led kantoorlunch, diners en events in Amersfoort en omgeving. Seizoensmenu's, strakke timing en een ervaring waar gasten over praten.",
      link: "/services/catering",
      image: PlaceHolderImages.find((p) => p.id === "service-catering"),
      priceLabel: "Vanaf €7,50 p.p.",
    },
    {
      title: "Restaurant Websites",
      description:
        "Complete restaurant websites met schema.org, reserveringsflow en AI-klare content structuur. Eenmaal betalen, geen lock-in.",
      link: "/services/websites",
      image: PlaceHolderImages.find((p) => p.id === "service-websites"),
      priceLabel: "€400 eenmalig",
    },
    {
      title: "SEO & GEO Optimalisatie",
      description:
        "Rank hoger in Google én word geciteerd door ChatGPT, Perplexity en AI Overviews. Horeca-gerichte SEO/GEO optimalisatie vanuit Amersfoort voor heel Nederland.",
      link: "/services/seo-geo",
      image: PlaceHolderImages.find((p) => p.id === "service-websites"),
      priceLabel: "€1.300/jaar of €150/mnd",
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
      {/* FAQPage schema mirrors the visible FAQ accordion below. Putting it
          on the home page (not just /faq) gives AI Overviews a clean shot at
          citing us for the highest-volume brand queries. */}
      <JsonLd
        data={buildFaqPage(
          faqs.map((f) => ({ question: f.question, answer: f.answer }))
        )}
        id="schema-home-faq"
      />

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            fetchPriority="high"
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
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Vier diensten, één operator. Van keukenstrategie tot AI zichtbaarheid — chef-led en uitvoerbaar.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 30vw"
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

                    <div className="mt-4 text-sm font-semibold text-primary/90">
                      {service.priceLabel}
                    </div>

                    {/* CTA hint (not a link, whole card is clickable) */}
                    <div className="mt-4 inline-flex items-center gap-2 text-primary font-semibold">
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

      {/* Press / earned media band — third-party authority signals */}
      <section className="border-t border-border/40 bg-background/5 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-headline text-primary text-sm font-bold tracking-widest uppercase">
              Gezien in de pers
            </p>
            <h2 className="mt-3 font-headline text-3xl md:text-4xl font-bold">
              Waar Jeremy in het nieuws kwam
            </h2>
            <p className="mt-3 text-muted-foreground">
              Elf verifieerbare mediaverhalen over Jeremy Arrascaeta in
              Nederland en Australië — van AD.nl en De Gelderlander tot
              Broadsheet Adelaide en Australian Good Food Guide.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {SITE.press.slice(0, 6).map((p) => (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-border/35 bg-background/20 p-6 transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:bg-background/30"
              >
                <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  <span className="text-primary">{p.publication}</span>
                  <span>{p.date.slice(0, 4)}</span>
                </div>
                <div className="mt-3 font-headline text-base font-bold leading-snug text-foreground group-hover:text-primary md:text-lg">
                  {p.title}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {p.excerpt}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary">
                  <span>Lees bij {p.publication.split(" — ")[0].split(" (")[0]}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/portfolio#pers"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "font-semibold",
              )}
            >
              Bekijk alle 11 pers-vermeldingen{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
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

      {/* Portfolio Proof Strip */}
      <section className="py-16 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-headline text-primary text-sm font-bold tracking-widest uppercase">
              Proof of work
            </p>
            <h2 className="mt-3 font-headline text-3xl md:text-4xl font-bold">
              Echte klanten. Echte live sites.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Vijf live projecten in Nederland, van shared-dining restaurants tot landelijke matchingsplatforms.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {[
              { name: "De Tafelaar Amersfoort", role: "Website + schema", url: "https://www.tafelaaramersfoort.nl" },
              { name: "BoekEerlijk", role: "SaaS build", url: "https://www.boekeerlijk.nl" },
              { name: "OffertesVoorJou", role: "Platform build", url: "https://offertesvoorjou.nl" },
              { name: "Chef & Serve", role: "SEO & GEO", url: "https://chefandserve.nl" },
              { name: "Swimcoaching.nl", role: "SEO", url: "https://www.swimcoaching.nl" },
            ].map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-border/35 bg-background/30 p-4 text-center transition-colors hover:bg-background/50 hover:border-primary/30"
              >
                <div className="text-sm font-semibold text-foreground">{item.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{item.role}</div>
              </a>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/portfolio"
              className={cn(buttonVariants({ variant: "outline" }), "font-semibold")}
            >
              Bekijk volledig portfolio <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Waarom Amersfoort — local SEO + GEO signals band */}
      <section className="border-t border-border/40 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-headline text-primary text-sm font-bold tracking-widest uppercase">
              Lokaal geworteld
            </p>
            <h2 className="mt-3 font-headline text-3xl md:text-4xl font-bold">
              Waarom Amersfoort?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              Jezza Cooks is gevestigd aan de Nijkerkerstraat 3 in het
              Valleipoort gebied van Amersfoort — KvK 99547619. Ik ben zelf
              chef-kok bij shared-dining restaurant De Tafelaar aan de Kamp 8
              in het centrum van Amersfoort, dus ik draai elke week service
              in dezelfde stad waar mijn consulting-klanten zitten. Dat is
              het verschil tussen "ik adviseer horeca" en "ik sta zelf in de
              keuken". Werkgebied: Amersfoort (centrum, Binnenstad, Kamp,
              Soesterkwartier, Leusderkwartier, Valleipoort, Vathorst),
              Utrecht, Zwolle, Hilversum, Apeldoorn, en heel het midden van
              Nederland voor grotere trajecten.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-border/35 bg-background/15 p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Vestiging
              </div>
              <div className="mt-3 font-headline text-xl font-bold">
                Nijkerkerstraat 3
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                3821 CD Amersfoort
                <br />
                Valleipoort · KvK 99547619
              </div>
            </div>

            <div className="rounded-2xl border border-primary/35 bg-primary/5 p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                Chef op de werkvloer
              </div>
              <div className="mt-3 font-headline text-xl font-bold">
                De Tafelaar Amersfoort
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Kamp 8 · Binnenstad
                <br />
                Chef-kok sinds 2025
              </div>
            </div>

            <div className="rounded-2xl border border-border/35 bg-background/15 p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Werkgebied
              </div>
              <div className="mt-3 font-headline text-xl font-bold">
                Midden-Nederland
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Amersfoort · Utrecht · Zwolle
                <br />
                Hilversum · Apeldoorn · NL
              </div>
            </div>
          </div>

          <div className="mt-10 mx-auto max-w-3xl rounded-2xl border border-border/35 bg-background/10 p-5 text-center text-sm text-muted-foreground md:text-base">
            <strong className="text-foreground">Waarom dit werkt voor jou:</strong>{" "}
            ik ken de Amersfoortse horeca-markt van binnenuit — leveranciers
            (Sligro Amersfoort, Bidfood, lokale slagers aan de Leusderweg en
            Vermeerkwartier), gastenstromen (Eemhuis, Stadsring, kantoren
            Vathorst/Podium) en welke menu's echt werken op terrassen aan de
            Hof en Lieve Vrouwekerkhof versus aan de Eem. Geen gegoogled
            advies van buiten.
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
