// src/components/websites/websites-page.tsx
import Link from "next/link";
import { ArrowRight, GalleryHorizontal, PenTool, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import WebsitesHero from "@/components/websites/websites-hero";
import PageHeader from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import ResultsSlider from "./results-slider";
import BuildOptions from "./build-options";
import type { Feature } from "./websites-types";

const features: Feature[] = [
  {
    Icon: PenTool,
    title: "Chef-led Copy & Design",
    description:
      "Ik schrijf en ontwerp vanuit de horeca. Dat betekent: duidelijke taal, een menu dat online klopt en een design dat de sfeer van je zaak ademt.",
  },
  {
    Icon: GalleryHorizontal,
    title: "Focus op Directe Boekingen",
    description:
      "Je website is een tool, geen folder. We plaatsen slimme call-to-actions en integreren je reserveringssysteem zodat bezoekers direct converteren.",
  },
  {
    Icon: Search,
    title: "Sterke SEO Basis",
    description:
      "Ik bouw je site met een technische en inhoudelijke SEO-basis, zodat je gevonden wordt op zoektermen die er toe doen, zoals 'restaurant [jouw stad]'.",
  },
];

export default function WebsitesPageLayout() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/5 to-transparent" />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-10 md:pt-16">
        <WebsitesHero />
      </div>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Een website die werkt als een geoliede service
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Minder frictie, meer conversie. Dit is de kern van mijn aanpak.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {features.map(({ Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-border/50 bg-card/30 p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-background">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-5 font-headline text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Slider Section */}
      <section className="py-16 md:py-24 bg-card/40 border-y border-border/60">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Resultaten van klanten</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Voorbeelden van hoe een betere website direct impact maakt.
            </p>
          </div>
          <div className="mt-12">
            <ResultsSlider />
          </div>
        </div>
      </section>
      
      {/* Build Options Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
           <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Transparante pakketten</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Kies het pakket dat past bij jouw fase en ambitie.
            </p>
          </div>
          <div className="mt-12">
            <BuildOptions />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 text-center border-t border-border/60">
          <div className="container mx-auto px-4">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Klaar voor een website die gasten binnenhaalt?</h2>
              <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Laten we praten over wat je nodig hebt. Plan een vrijblijvende call of stuur me een bericht.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact?service=websites" className={cn(buttonVariants({ size: 'lg' }), "font-semibold")}>
                      Start je project
                  </Link>
                  <Link href="/free-diagnosis" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), "font-semibold")}>
                      Gratis diagnose
                  </Link>
              </div>
          </div>
      </section>
    </div>
  );
}
