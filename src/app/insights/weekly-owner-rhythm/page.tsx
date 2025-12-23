// app/insights/weekly-owner-rhythm/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find((p) => p.id === "blog-weekly-rhythm");

export default function WeeklyOwnerRhythmPage() {
  return (
    <div>
      <header className="relative py-24 md:py-32 bg-card">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline">Leadership</Badge>
            <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">
              The Weekly Owner Rhythm: 30 Minutes That Saves Your Week
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              If you feel like you’re always reacting, this is your reset. A simple weekly check-in
              that spots problems early and keeps margins, pace, and consistency under control.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">KPI rhythm</Badge>
              <Badge variant="secondary">Clarity</Badge>
              <Badge variant="secondary">Less burnout</Badge>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Updated: 2025 · ~5 min read</p>
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
            <p className="text-sm text-muted-foreground mb-2">The point</p>
            <p className="text-base">
              You don’t need 20 dashboards. You need <b>a weekly rhythm</b> that makes problems visible
              before they become fires.
            </p>
          </div>

          <h2 className="font-headline">The 30-minute weekly meeting (with yourself)</h2>
          <p>Same day each week. Same questions. Same simple template.</p>

          <h3 className="font-headline">Step 1: Pull the numbers (10 minutes)</h3>
          <ul>
            <li>Sales</li>
            <li>Covers (guests served)</li>
            <li>Average spend per guest</li>
            <li>Food cost % (rough is fine)</li>
            <li>Labor cost %</li>
            <li>Top 5 sellers + any “dead” items</li>
          </ul>

          <h3 className="font-headline">Step 2: Ask the 5 questions (10 minutes)</h3>
          <ol>
            <li>What improved this week?</li>
            <li>What got worse?</li>
            <li>What was the bottleneck during service?</li>
            <li>What did guests complain about (or love)?</li>
            <li>What is the ONE thing we fix next week?</li>
          </ol>

          <h3 className="font-headline">Step 3: Choose 2 actions (10 minutes)</h3>
          <ul>
            <li><strong>One margin action:</strong> portion check, purchasing, menu tweak.</li>
            <li><strong>One system action:</strong> SOP, prep map, role clarity, pace rule.</li>
          </ul>

          <h2 className="font-headline">Why this works</h2>
          <p>
            Consistency beats intensity. This rhythm keeps you in control without needing to be in
            the building 80 hours a week.
          </p>

          <div className="not-prose mt-12 bg-card border border-border p-8 rounded-lg text-center">
            <h3 className="font-headline text-2xl font-bold">
              Want me to build your weekly rhythm?
            </h3>
            <p className="mt-2 text-muted-foreground">
              Book a free 15-minute call. I’ll tell you what I’d track first for your concept.
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
