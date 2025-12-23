// app/insights/calm-service-system/page.tsx
import Image from "next/image";
import { Link } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find((p) => p.id === "blog-service-system");

export default function CalmServiceSystemPage() {
  return (
    <div>
      <header className="relative py-24 md:py-32 bg-card">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline">Systems</Badge>
            <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">
              The Calm Service System: Prep, Roles, Pace
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              How to remove bottlenecks and reduce stress: a chef-led approach to station flow,
              prep rhythm, and role clarity that holds up in real service.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Prep rhythm</Badge>
              <Badge variant="secondary">Role clarity</Badge>
              <Badge variant="secondary">Flow</Badge>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Updated: 2025 · ~8 min read</p>
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
            <p className="text-sm text-muted-foreground mb-2">Core idea</p>
            <p className="text-base">
              Calm service isn’t personality. It’s structure. If your prep, roles, and pace are
              designed, the kitchen stays calm—even when it’s busy.
            </p>
          </div>

          <h2 className="font-headline">1) Prep rhythm: stop drowning before service</h2>
          <p>
            Most chaos starts at 17:00 when prep wasn’t realistic. A calm service system starts
            with a prep map: who preps what, by what time, and what “done” looks like.
          </p>
          <ul>
            <li>Define “critical prep” (service blockers) vs “nice to have”.</li>
            <li>Set a cut-off time for non-essential tasks before service.</li>
            <li>Build a “station-ready” checklist (fast, short, usable).</li>
          </ul>

          <h2 className="font-headline">2) Roles: one owner per outcome</h2>
          <p>
            If everyone owns everything, nobody owns anything. Assign ownership: pass, garnish,
            fryer, desserts, plating checks, call-backs. Clarity reduces mistakes.
          </p>
          <ul>
            <li>One person owns the pass calls (even if the chef is there).</li>
            <li>One person owns re-fires / fixes (so it doesn’t spread chaos).</li>
            <li>FOH owns pacing and guest communication—kitchen owns execution.</li>
          </ul>

          <h2 className="font-headline">3) Pace: control the night, don’t chase it</h2>
          <p>
            Pace is the hidden profit lever. When pace is messy: labor rises, mistakes rise, and
            guest experience drops. Your goal is controlled throughput.
          </p>
          <ul>
            <li>Decide “max plates per 10 minutes” for your kitchen reality.</li>
            <li>Use simple holds (stagger starters, slow mains) rather than panic.</li>
            <li>Track “ticket time” and fix the bottleneck station—not the whole team.</li>
          </ul>

          <h2 className="font-headline">The calm service checklist (minimum viable)</h2>
          <ul>
            <li>Station-ready checklist done before service.</li>
            <li>Roles assigned in 2 minutes.</li>
            <li>One pace rule: max throughput per window.</li>
            <li>One “stop the bleeding” rule: fix the bottleneck first.</li>
          </ul>

          <div className="not-prose mt-12 bg-card border border-border p-8 rounded-lg text-center">
            <h3 className="font-headline text-2xl font-bold">
              Want me to map your service flow?
            </h3>
            <p className="mt-2 text-muted-foreground">
              Book a free 15-minute call. I’ll tell you what I’d fix first in your operation.
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
