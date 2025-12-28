// src/components/websites/build-options.tsx
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { BuildOption } from "./websites-types";

const options: BuildOption[] = [
  {
    id: "starter",
    title: "Starter Site",
    price: "€950",
    description: "Een professionele one-pager die je verhaal vertelt en gasten aanzet tot contact of reserveren. Snel live, direct resultaat.",
    features: [
      "One-page design",
      "Heldere call-to-actions",
      "Mobiel-perfect",
      "Basis SEO-setup",
      "Contactformulier",
    ],
    cta: "Kies Starter",
  },
  {
    id: "pro",
    title: "Pro Website",
    price: "€1750",
    description: "Een complete site met meerdere pagina's, ontworpen om directe boekingen te maximaliseren en je merk te versterken.",
    features: [
      "Alles van Starter",
      "Menu & Gallerij pagina's",
      "Conversie-gericht design",
      "Integratie reserveringssysteem",
      "Geavanceerde SEO",
    ],
    cta: "Kies Pro",
    popular: true,
  },
  {
    id: "custom",
    title: "Custom Build",
    price: "Maatwerk",
    description: "Een unieke online ervaring met custom animaties en design, perfect voor merken die echt willen opvallen.",
    features: [
      "Alles van Pro",
      "Uniek, custom design",
      "Geavanceerde animaties",
      "Merkstrategie-integratie",
      "Content support",
    ],
    cta: "Plan een call",
  },
];

export default function BuildOptions() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {options.map((option) => (
        <Card
          key={option.id}
          className={cn(
            "flex flex-col rounded-3xl border-border/60 bg-card/40",
            option.popular && "border-primary/50 ring-1 ring-primary/30"
          )}
        >
          <CardHeader className="relative">
            {option.popular && (
              <div className="absolute top-0 right-6 -translate-y-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Meest gekozen
              </div>
            )}
            <CardTitle className="font-headline text-2xl">{option.title}</CardTitle>
            <CardDescription>{option.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between">
            <div>
              <div className="mb-6">
                <span className="font-headline text-4xl font-bold">{option.price}</span>
                <span className="text-muted-foreground"> / eenmalig</span>
              </div>
              <ul className="space-y-3 text-sm">
                {option.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <Link
                href={`/contact?service=websites&package=${option.id}`}
                className={cn(
                  buttonVariants({
                    variant: option.popular ? "default" : "outline",
                    size: "lg",
                  }),
                  "w-full font-semibold"
                )}
              >
                {option.cta}
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
