"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Article = {
  slug: string;
  title: string;
  description: string;
  image: string; // placeholder id
  category: string; // e.g. Margins, Systems, Menu, Bookings
  readTimeMin: number;
  year: number;
  // body can exist elsewhere; not needed here
};

const articles: Article[] = [
  {
    slug: "restaurant-consultant-ultimate-guide",
    title: "What Is a Restaurant Consultant? The Ultimate Guide",
    description:
      "A chef’s guide to when to hire a consultant, what good looks like, and how to get real ROI.",
    image: "blog-pillar",
    category: "Systems",
    readTimeMin: 10,
    year: 2025,
  },
  {
    slug: "prime-cost-explained",
    title: "Prime Cost Explained (Without the Spreadsheet Pain)",
    description:
      "What prime cost is, the benchmarks that matter, and the fastest levers to pull this week.",
    image: "blog-prime-cost",
    category: "Margins",
    readTimeMin: 7,
    year: 2025,
  },
  {
    slug: "menu-engineering-chef-version",
    title: "Menu Engineering: Stars, Puzzles, Plowhorses, Dogs (Chef Version)",
    description:
      "A practical menu mix + margin approach that chefs actually use — no fluff.",
    image: "blog-menu-engineering",
    category: "Menu",
    readTimeMin: 9,
    year: 2025,
  },
  {
    slug: "calm-service-system",
    title: "The Calm Service System",
    description:
      "How to replace chaos with a simple service system your team can follow every shift.",
    image: "blog-service-system",
    category: "Systems",
    readTimeMin: 8,
    year: 2025,
  },
  {
    slug: "website-booking-tool",
    title: "Your Website Is a Booking Tool",
    description:
      "Turn your website into a direct booking machine with the right structure and CTAs.",
    image: "blog-booking-site",
    category: "Bookings",
    readTimeMin: 6,
    year: 2025,
  },
  {
    slug: "weekly-owner-rhythm",
    title: "The Weekly Owner’s Rhythm",
    description:
      "A weekly routine to stay in control (prime cost, people, marketing) without burning out.",
    image: "blog-weekly-rhythm",
    category: "Systems",
    readTimeMin: 7,
    year: 2025,
  },
];

// Keep this aligned with your screenshot pills
const filters = ["All", "Margins", "Systems", "Menu", "Bookings"] as const;
type Filter = (typeof filters)[number];

export default function InsightsPage() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = useMemo(() => {
    if (active === "All") return articles;
    return articles.filter((a) => a.category === active);
  }, [active]);

  return (
    <div className="relative">
      {/* Top hero band */}
      <section className="border-b border-border bg-background/40">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl border border-border bg-card/40 backdrop-blur px-6 py-10 md:px-10 md:py-12">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <h1 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">
                    Learn the thinking behind the systems
                  </h1>
                  <p className="mt-3 text-muted-foreground text-base md:text-lg">
                    If you’re running good food with messy execution, start here —
                    then work through margins → systems → bookings.
                  </p>
                </div>

                {/* Pills */}
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {filters.map((f) => (
                    <button
                      key={f}
                      onClick={() => setActive(f)}
                      className={cn(
                        "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                        "border border-border bg-background/40 hover:bg-card",
                        active === f && "bg-primary text-primary-foreground border-primary"
                      )}
                      type="button"
                    >
                      {f === "All" ? "All" : f}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA right under hero (optional but nice) */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="font-semibold">
                  <Link href="/free-diagnosis">Free 15-min diagnosis</Link>
                </Button>
                <Button asChild variant="secondary" className="font-semibold">
                  <Link href="/results">See Results</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Card grid */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {filtered.map((article) => {
              const img = PlaceHolderImages.find((p) => p.id === article.image);

              return (
                <Card
                  key={article.slug}
                  className="overflow-hidden bg-card/40 border-border hover:bg-card/60 transition-colors"
                >
                  <Link href={`/insights/${article.slug}`} className="block">
                    <div className="relative aspect-[16/10] bg-background">
                      {img ? (
                        <Image
                          src={img.imageUrl}
                          alt={img.description}
                          fill
                          className="object-cover"
                          data-ai-hint={img.imageHint}
                        />
                      ) : null}

                      {/* Top-left category badge */}
                      <div className="absolute left-4 bottom-4">
                        <Badge variant="secondary" className="rounded-full">
                          {article.category}
                        </Badge>
                      </div>

                      {/* Bottom-right meta */}
                      <div className="absolute right-4 bottom-4 text-xs text-muted-foreground">
                        {article.readTimeMin} min · {article.year}
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <h3 className="font-headline text-xl font-bold leading-snug">
                        {article.title}
                      </h3>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {article.description}
                      </p>
                    </CardContent>

                    <CardFooter className="pt-0">
                      <span className="text-sm font-semibold text-primary inline-flex items-center">
                        Read <span className="ml-2">→</span>
                      </span>
                    </CardFooter>
                  </Link>
                </Card>
              );
            })}
          </div>

          {/* Bottom CTA band (small, punchy) */}
          <div className="mt-14 rounded-2xl border border-border bg-card/40 p-8 text-center">
            <h3 className="font-headline text-2xl font-bold">Want the fast version?</h3>
            <p className="mt-2 text-muted-foreground">
              Do the quick diagnosis. I’ll tell you the 3 fixes that matter first.
            </p>
            <div className="mt-6 flex justify-center">
              <Button asChild size="lg" className="font-semibold">
                <Link href="/free-diagnosis">Start free diagnosis</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
