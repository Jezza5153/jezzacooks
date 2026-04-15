import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import JsonLd from "@/components/seo/json-ld";
import { buildBreadcrumbList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Diensten: consulting, catering, websites en SEO/GEO optimalisatie",
  description:
    "Vier diensten onder één chef-led dak: restaurant consulting (menu engineering, food cost, prep), catering in Amersfoort, restaurant websites voor €400 eenmalig en SEO + GEO optimalisatie vanaf €150 per maand. Amersfoort, Utrecht en heel Nederland.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Diensten | Jezza Cooks",
    description:
      "Restaurant consulting, catering, websites en SEO/GEO. Chef-led, praktisch en gericht op rust op de vloer én zichtbaarheid in Google en AI zoekmachines.",
    type: "website",
    url: "/services",
  },
};

export default function ServicesPage() {
  const services = [
    {
      title: "Restaurant consulting",
      description:
        "Menu engineering, food cost controle, prepstructuur, SOPs en teamtraining voor restaurants en horecateams in Amersfoort, Utrecht en heel Nederland. Minder chaos, betere marges.",
      link: "/services/consulting",
      priceLabel: "Vanaf €450 / dagdeel",
      image: PlaceHolderImages.find((p) => p.id === "service-consulting"),
    },
    {
      title: "Catering & private chef",
      description:
        "Chef-led kantoorlunch, diners en events in Amersfoort en omgeving. Door Jeremy Arrascaeta (chef-kok bij De Tafelaar Amersfoort, 10+ jaar high-end keukens). Seizoensmenu's, strakke timing en een ervaring waar gasten over praten.",
      link: "/services/catering",
      priceLabel: "Vanaf €7,50 p.p.",
      image: PlaceHolderImages.find((p) => p.id === "service-catering"),
    },
    {
      title: "Restaurant websites",
      description:
        "Complete restaurant websites met schema.org, reserveringsflow en AI-klare content structuur. Eenmaal €400 betalen, geen lock-in. Ideaal voor horecabedrijven in Amersfoort en omgeving.",
      link: "/services/websites",
      priceLabel: "€400 eenmalig",
      image: PlaceHolderImages.find((p) => p.id === "service-websites"),
    },
    {
      title: "SEO & GEO optimalisatie",
      description:
        "Rank hoger in Google én word geciteerd door ChatGPT, Perplexity en Google AI Overviews. Horeca-gerichte SEO/GEO door een actieve chef-kok in Amersfoort en omgeving.",
      link: "/services/seo-geo",
      priceLabel: "€1.300/jaar of €150/mnd",
      image: PlaceHolderImages.find((p) => p.id === "service-websites"),
    },
  ];

  const breadcrumb = buildBreadcrumbList([
    { name: "Home", item: "/" },
    { name: "Diensten", item: "/services" },
  ]);

  return (
    <div>
      <JsonLd data={breadcrumb} id="schema-services-breadcrumb" />
      <PageHeader
        title="Vier manieren om je horeca strakker te laten draaien"
        subtitle="Chef-led consulting, catering, websites en SEO/GEO. Praktisch, uitvoerbaar en gericht op resultaat op de vloer én in zoekmachines."
      />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card
                key={service.title}
                className="bg-background overflow-hidden group flex flex-col"
              >
                <div className="relative h-48">
                  {service.image && (
                    <Image
                      src={service.image.imageUrl}
                      alt={service.image.description}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={service.image.imageHint}
                    />
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-xl md:text-2xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-3 text-sm md:text-base flex-1">
                    {service.description}
                  </p>
                  <div className="text-sm font-semibold text-primary/90 mb-3">
                    {service.priceLabel}
                  </div>
                  <Link
                    href={service.link}
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "p-0 font-semibold text-primary self-start"
                    )}
                  >
                    Lees meer <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
