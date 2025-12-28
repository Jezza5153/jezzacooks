// src/components/websites/results-slider.tsx
"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Result } from "./websites-types";

const results: Result[] = [
  {
    id: "restaurant-a",
    businessName: "Restaurant A",
    location: "Utrecht",
    tagline: "Modern European Dining",
    outcome: "+210% direct bookings in 3 months",
    imageUrl: "/pics/result-3-after.jpg",
    imageHint: "booking hotel",
    testimonial: {
      quote:
        "The new site made our brand feel premium and the booking process is so much clearer. We're seeing way more direct reservations.",
      author: "Owner, Restaurant A",
    },
  },
  {
    id: "cafe-b",
    businessName: "Café B",
    location: "Amersfoort",
    tagline: "Specialty Coffee & Bites",
    outcome: "Page 1 on Google for 'specialty coffee amersfoort'",
    imageUrl: "/pics/result-2-after.jpg",
    imageHint: "calm barista",
    testimonial: {
      quote:
        "Jezza understood that we're more than just a cafe. The website tells our story and, crucially, it gets found by the right people.",
      author: "Barista & Co-founder, Café B",
    },
  },
  {
    id: "hotel-c",
    businessName: "Boutique Hotel C",
    location: "Zwolle",
    tagline: "Your Quiet Getaway",
    outcome: "Reduced platform fees by 15%",
    imageUrl: "/pics/result-1-after.jpg",
    imageHint: "clean kitchen",
    testimonial: {
      quote:
        "Our old site was just a brochure. The new one is a sales tool that drives direct bookings and gives us more control over our revenue.",
      author: "Manager, Hotel C",
    },
  },
];

export default function ResultsSlider() {
  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {results.map((result) => (
            <CarouselItem key={result.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="overflow-hidden rounded-3xl border-border/60 bg-card/40 transition-colors hover:bg-card/50">
                  <div className="relative aspect-[16/10] bg-background">
                    <Image
                      src={result.imageUrl}
                      alt={`Website example for ${result.businessName}`}
                      fill
                      className="object-cover"
                      data-ai-hint={result.imageHint}
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-semibold text-primary">{result.outcome}</p>
                    <h4 className="mt-1 font-headline text-xl font-bold">
                      {result.businessName}, {result.location}
                    </h4>
                    <blockquote className="mt-3 border-l-2 border-primary/40 pl-4 text-sm text-muted-foreground italic">
                      <p>&ldquo;{result.testimonial.quote}&rdquo;</p>
                      <cite className="mt-2 block not-italic text-xs text-muted-foreground/80">
                        &ndash; {result.testimonial.author}
                      </cite>
                    </blockquote>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
            <CarouselPrevious className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2" />
        </div>
      </Carousel>
    </div>
  );
}
