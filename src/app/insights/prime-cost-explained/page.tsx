// app/insights/prime-cost-explained/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find((p) => p.id === "blog-prime-cost");

export default function PrimeCostExplainedPage() {
  return (
    <div>
      <header className="relative py-24 md:py-32 bg-card">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline">Margins</Badge>
            <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">
              Prime Cost Explained (Without the Spreadsheet Pain)
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Prime cost is the fastest way to see if your business is leaking money.
              Here’s the chef-led version: what it is, what “good” looks like, and how
              to control it week by week—without killing standards.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Food</Badge>
              <Badge variant="secondary">Labor</Badge>
              <Badge variant="secondary">Weekly rhythm</Badge>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Updated: 2025 · ~7 min read</p>
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
            <p className="text-sm text-muted-foreground mb-2">Quick definition</p>
            <p className="text-base">
              <b>Prime cost</b> = <b>Food cost + Labor cost</b> (as a % of sales). It’s the
              number that tells you if you’re actually making money from being busy.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              If you only track one thing weekly, track this.
            </p>
          </div>

          <h2 className="font-headline">Why prime cost matters</h2>
          <p>
            Most restaurants don’t fail because the food is bad. They fail because the math
            doesn’t hold up. Prime cost is the simplest “control panel” you can use: it shows
            whether your operation is sustainable.
          </p>

          <h2 className="font-headline">The formula (keep it simple)</h2>
          <ul>
            <li>
              <strong>Food cost %</strong> = (COGS ÷ Sales) × 100
            </li>
            <li>
              <strong>Labor cost %</strong> = (Total labor ÷ Sales) × 100
            </li>
            <li>
              <strong>Prime cost %</strong> = Food cost % + Labor cost %
            </li>
          </ul>

          <h2 className="font-headline">What is “good” prime cost?</h2>
          <p>
            It depends on concept, country, and pricing power. But as a working rule:
          </p>
          <ul>
            <li><strong>Under ~60%</strong>: usually healthy (if overhead is under control).</li>
            <li><strong>60–70%</strong>: can work, but you need tight systems and strong volume.</li>
            <li><strong>Over 70%</strong>: you’re likely leaking money somewhere.</li>
          </ul>

          <h2 className="font-headline">Where prime cost leaks actually happen</h2>
          <h3 className="font-headline">Food side</h3>
          <ul>
            <li>Portions drifting (no spec, no checks)</li>
            <li>Waste from messy prep rhythm or overproduction</li>
            <li>Purchasing without a plan (price creep, wrong pack sizes)</li>
            <li>Menu items that sell but don’t earn</li>
          </ul>

          <h3 className="font-headline">Labor side</h3>
          <ul>
            <li>Too many people at the wrong times</li>
            <li>No role clarity → everyone steps on each other</li>
            <li>Slow service flow → longer shifts → higher labor</li>
            <li>Training gaps → mistakes → remakes → time + waste</li>
          </ul>

          <h2 className="font-headline">The weekly rhythm (30 minutes)</h2>
          <p>
            Prime cost becomes powerful when you treat it like a weekly check-in, not a yearly
            report.
          </p>
          <ol>
            <li><strong>Pull sales, COGS, and labor for the week.</strong></li>
            <li><strong>Calculate the 3 percentages.</strong> (Food, labor, prime)</li>
            <li><strong>Ask 3 questions:</strong> What moved? Why? What do we change next week?</li>
            <li><strong>Pick 1 action</strong> for food and 1 for labor. Keep it small.</li>
          </ol>

          <h2 className="font-headline">Fast fixes that don’t ruin quality</h2>
          <ul>
            <li><strong>Portion specs</strong> on your top 10 sellers (written + checked)</li>
            <li><strong>Menu trim</strong>: kill 1–2 low-margin high-effort items</li>
            <li><strong>Prep map</strong>: who preps what, by what time</li>
            <li><strong>Labor schedule</strong>: align staffing to covers (not to “habit”)</li>
          </ul>

          <h2 className="font-headline">If you want help</h2>
          <p>
            If your numbers feel unclear, start with a Quick Scan. I’ll tell you exactly where I’d
            look first and what I would change in 30 days.
          </p>

          <div className="not-prose mt-12 bg-card border border-border p-8 rounded-lg text-center">
            <h3 className="font-headline text-2xl font-bold">Want a quick diagnosis?</h3>
            <p className="mt-2 text-muted-foreground">
              Book a free 15-minute call—or DM “SCAN” on Instagram @chefjezz.
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
