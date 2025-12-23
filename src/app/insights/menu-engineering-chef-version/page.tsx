// app/insights/menu-engineering-chef-version/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find((p) => p.id === "blog-menu-engineering");

export default function MenuEngineeringChefVersionPage() {
  return (
    <div>
      <header className="relative py-24 md:py-32 bg-card">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline">Menu</Badge>
            <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">
              Menu Engineering: Stars, Puzzles, Plowhorses, Dogs (Chef Version)
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A practical way to rebuild your menu so it sells better and earns more—without
              killing the food. Chef-led, simple, and measurable.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Sales mix</Badge>
              <Badge variant="secondary">Margins</Badge>
              <Badge variant="secondary">Menu layout</Badge>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Updated: 2025 · ~9 min read</p>
          </div>
        </div>
      </header>

      <article className="container mx-auto px-4 py-16 md:py-24">
        <div className="prose prose-invert prose-lg max-w-3xl mx-auto">
          {heroImage && (
            <div className="relative aspect-video rounded-lg overflow-hidden not-prose mb-10 border border-border bg-card">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
            </div>
          )}

          <div className="not-prose mb-10 rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Quick idea</p>
            <p className="text-base">
              Menu engineering is just two questions: <b>What sells?</b> and <b>What earns?</b>{" "}
              Your job is to build a menu where your best earners are also your best sellers.
            </p>
          </div>

          <h2 className="font-headline">Step 1: Stop guessing—pull a sales mix</h2>
          <p>
            Pick a period (2–4 weeks). Export from POS: items sold + revenue. Add your dish cost
            (or best estimate). Now you have the only data that matters: popularity + profit.
          </p>

          <h2 className="font-headline">Step 2: The four categories</h2>
          <ul>
            <li><strong>Stars</strong>: sell a lot + high margin → protect and push them.</li>
            <li><strong>Puzzles</strong>: high margin + low sales → fix description, placement, selling.</li>
            <li><strong>Plowhorses</strong>: sell a lot + low margin → adjust portion, price, or cost.</li>
            <li><strong>Dogs</strong>: low sales + low margin → remove or rethink.</li>
          </ul>

          <h2 className="font-headline">Step 3: Chef-level fixes that work</h2>

          <h3 className="font-headline">How to push Stars</h3>
          <ul>
            <li>Give them the best menu placement (top-right, first sections)</li>
            <li>Train one selling line for the team (short, natural)</li>
            <li>Make execution bulletproof (spec sheet, plating, prep)</li>
          </ul>

          <h3 className="font-headline">How to solve Puzzles</h3>
          <ul>
            <li>Rename: clearer, less “chef poetry”</li>
            <li>Rewrite description: benefit first, detail second</li>
            <li>Change price anchor (pair with premium or bundle)</li>
          </ul>

          <h3 className="font-headline">How to fix Plowhorses (without guests noticing)</h3>
          <ul>
            <li>Portion spec: tighten grams, add a garnish that feels premium</li>
            <li>Swap one ingredient for equal impact, lower cost</li>
            <li>Small price move (not everything at once)</li>
          </ul>

          <h3 className="font-headline">What to do with Dogs</h3>
          <ul>
            <li>Remove them or make them seasonal/specials</li>
            <li>If they’re “brand important”, simplify prep + increase margin</li>
          </ul>

          <h2 className="font-headline">Menu layout rules (simple + effective)</h2>
          <ul>
            <li>Reduce choice: fewer items = faster service = better labor %</li>
            <li>Use “anchors”: one premium item makes the rest feel better value</li>
            <li>Remove currency signs if it fits your concept (optional)</li>
            <li>Make the first items in each section your best sellers/earners</li>
          </ul>

          <h2 className="font-headline">The weekly habit that keeps it healthy</h2>
          <p>
            Every week: look at top sellers and top earners. Pick one small change. Small wins
            compound fast.
          </p>

          <div className="not-prose mt-12 bg-card border border-border p-8 rounded-lg text-center">
            <h3 className="font-headline text-2xl font-bold">Want me to engineer your menu?</h3>
            <p className="mt-2 text-muted-foreground">
              Book a free 15-minute call. I’ll tell you what I’d change first.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="font-semibold">
                <Link href="/contact">Book a Free Call</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link href="/services/consulting">See Consulting</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
