import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

const pillarImage = PlaceHolderImages.find((p) => p.id === "blog-pillar");

export default function PillarArticlePage() {
  return (
    <div>
      {/* HERO */}
      <header className="relative py-24 md:py-32 bg-card">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline">Ultimate Guide</Badge>

            <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">
              What Is a Restaurant Consultant?
            </h1>

            <p className="mt-4 text-lg text-muted-foreground">
              A chef-led, real-world guide to what consultants do, when to hire
              one, and how to get measurable results (without the corporate
              fluff).
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Consulting</Badge>
              <Badge variant="outline">Margins</Badge>
              <Badge variant="outline">Systems</Badge>
              <Badge variant="outline">Guest Experience</Badge>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Updated: 2025 · ~10 min read
            </p>
          </div>
        </div>
      </header>

      {/* ARTICLE */}
      <article className="container mx-auto px-4 py-16 md:py-24">
        <div className="prose prose-invert prose-lg max-w-3xl mx-auto">
          {/* FEATURE IMAGE */}
          {pillarImage && (
            <div className="relative aspect-video rounded-lg overflow-hidden not-prose mb-10 border border-border bg-card">
              <Image
                src={pillarImage.imageUrl}
                alt={pillarImage.description}
                fill
                className="object-cover"
                data-ai-hint={pillarImage.imageHint}
              />
            </div>
          )}

          {/* QUICK TAKE */}
          <div className="not-prose mb-10 rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Quick definition</p>
            <p className="text-base">
              A <b>restaurant consultant</b> helps owners fix specific problems in
              operations, margins, menu strategy, team performance, and guest
              experience—by building systems you can actually run in real service.
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="rounded-md border border-border bg-background/40 p-3">
                <p className="font-semibold">Best for</p>
                <p className="text-muted-foreground mt-1">
                  Good food, messy execution, weak cashflow.
                </p>
              </div>
              <div className="rounded-md border border-border bg-background/40 p-3">
                <p className="font-semibold">Not for</p>
                <p className="text-muted-foreground mt-1">
                  People wanting theory, ego, or generic templates.
                </p>
              </div>
              <div className="rounded-md border border-border bg-background/40 p-3">
                <p className="font-semibold">Outcome</p>
                <p className="text-muted-foreground mt-1">
                  Clarity → structure → measurable improvement.
                </p>
              </div>
            </div>
          </div>

          {/* INTRO */}
          <p>
            You see the term everywhere: “restaurant consultant.” It sounds
            expensive, vague, and a bit like someone in a suit will walk in and
            tell you how to do your job.
          </p>

          <p>
            A good consultant isn’t a suit. A good consultant is a specialist:
            someone who helps you find the leaks, build structure, and make the
            business run smoother—while protecting standards.
          </p>

          <p>
            This guide breaks down what consultants actually do (in plain
            English), when you should hire one, and how to make sure you get
            real value for your money.
          </p>

          {/* SECTION: WHY */}
          <h2 className="font-headline">Why do restaurant consultants exist?</h2>

          <p>
            Hospitality is brutal because everything happens at once: guests,
            staff, suppliers, prep, service, reviews, and cashflow. Margins are
            thin and mistakes are expensive.
          </p>

          <p>
            Consultants exist because most owners are forced to be experts in
            everything—while also running daily service. That’s not sustainable.
            A consultant helps you zoom out, spot the real bottleneck, and build
            a system that holds up on a Saturday night.
          </p>

          {/* SECTION: CORE AREAS */}
          <h2 className="font-headline">The 5 core areas a strong consultant tackles</h2>

          <p>
            Most restaurant problems fall into a few buckets. A consultant might
            specialize, but the best ones understand how everything connects.
          </p>

          <h3 className="font-headline">1) Margins & financial control</h3>
          <p>
            This is where most “good food / bad cashflow” stories live. We don’t
            just look at numbers—we translate them into decisions your team can
            execute.
          </p>
          <ul>
            <li>
              <strong>Menu engineering:</strong> sales mix vs margin (what sells, what
              earns, what needs fixing).
            </li>
            <li>
              <strong>Food cost leak hunt:</strong> purchasing, portioning, waste,
              comped items, and prep discipline.
            </li>
            <li>
              <strong>Prime cost thinking:</strong> food + labor, and how to control it
              without killing quality.
            </li>
          </ul>

          <h3 className="font-headline">2) Operations & flow</h3>
          <p>
            Smooth service isn’t luck. It’s design. We remove friction so your
            team can execute consistently.
          </p>
          <ul>
            <li>
              <strong>Prep structure:</strong> who does what, when, and in what order.
            </li>
            <li>
              <strong>Station setup:</strong> reduce bottlenecks and ticket panic.
            </li>
            <li>
              <strong>SOPs:</strong> simple checklists that prevent “we forgot…” moments.
            </li>
          </ul>

          <h3 className="font-headline">3) Menu & concept clarity</h3>
          <p>
            Your menu is product + marketing in one. If your menu is confusing,
            your guests feel it—and your margins suffer.
          </p>
          <ul>
            <li>
              <strong>Concept alignment:</strong> menu, price point, vibe, and service style
              telling one story.
            </li>
            <li>
              <strong>Recipe standardization:</strong> consistent execution with clear specs.
            </li>
            <li>
              <strong>Supplier strategy:</strong> quality/price balance and smarter purchasing.
            </li>
          </ul>

          <h3 className="font-headline">4) Team, training & leadership</h3>
          <p>
            The guest experience is delivered by people. Systems are useless if
            the team can’t run them.
          </p>
          <ul>
            <li>
              <strong>Training that sticks:</strong> short, repeatable routines, not long manuals.
            </li>
            <li>
              <strong>Role clarity:</strong> ownership, standards, and expectations.
            </li>
            <li>
              <strong>Manager rhythm:</strong> so you’re not forced to be there 24/7.
            </li>
          </ul>

          <h3 className="font-headline">5) Guest experience, marketing & digital</h3>
          <p>
            Hospitality is an experience business. Marketing must match what
            guests feel. Digital should drive bookings—not just look pretty.
          </p>
          <ul>
            <li>
              <strong>Offer clarity:</strong> what you’re known for and why people choose you.
            </li>
            <li>
              <strong>Booking funnel:</strong> website + menu page + CTA that converts.
            </li>
            <li>
              <strong>Local visibility:</strong> Google profile basics + simple content structure.
            </li>
          </ul>

          {/* SECTION: WHEN TO HIRE */}
          <h2 className="font-headline">When should you hire a consultant?</h2>
          <p>
            If one of these sounds familiar, you’ll likely get value fast:
          </p>
          <ul>
            <li>
              <strong>Good food, bad cashflow:</strong> you’re busy, but money disappears.
            </li>
            <li>
              <strong>Constant firefighting:</strong> the business relies on you to survive a service.
            </li>
            <li>
              <strong>Inconsistency:</strong> guests don’t get the same experience every time.
            </li>
            <li>
              <strong>Menu confusion:</strong> items don’t sell, margins are unclear, pricing feels random.
            </li>
            <li>
              <strong>You’re expanding:</strong> you need standards and training that scale.
            </li>
          </ul>

          {/* SECTION: PICKING */}
          <h2 className="font-headline">How to pick the right consultant (and avoid wasting money)</h2>
          <p>
            Here’s the simple filter:
          </p>

          <ol>
            <li>
              <strong>Real hospitality experience:</strong> have they actually run service, led teams,
              and built systems—not just “advised”?
            </li>
            <li>
              <strong>Clear deliverables:</strong> what exactly do you get at the end—SOPs, costing
              sheets, menu changes, training plan, KPI rhythm?
            </li>
            <li>
              <strong>Measurable targets:</strong> agree on what “better” means (food cost, pace,
              reviews, covers, labor %, etc.).
            </li>
            <li>
              <strong>Fit and communication:</strong> can they challenge you without ego—and do they
              listen?
            </li>
          </ol>

          {/* SECTION: PRICING */}
          <h2 className="font-headline">Pricing models: what to expect</h2>

          <p>
            Pricing varies by scope, urgency, and how hands-on the work is. Most
            consultants use one of these models:
          </p>

          <ul>
            <li>
              <strong>Quick Scan (fixed):</strong> ideal to diagnose one problem and set priorities.
            </li>
            <li>
              <strong>Day rate / on-site blocks:</strong> best when you need real operational change and team training.
            </li>
            <li>
              <strong>Project:</strong> a clear scope (menu rebuild, SOP system, launch plan, booking funnel).
            </li>
            <li>
              <strong>Retainer:</strong> monthly support for owners who want accountability and steady improvement.
            </li>
          </ul>

          <p>
            The “right” model depends on speed. If you’re bleeding money or drowning
            in chaos, on-site work usually creates the fastest impact.
          </p>

          {/* SECTION: ROI */}
          <h2 className="font-headline">What ROI looks like (in reality)</h2>
          <p>
            Real ROI isn’t magic. It’s small improvements stacking up:
          </p>
          <ul>
            <li>1–3% food cost improvement through portion control + purchasing discipline</li>
            <li>Faster service pace through station flow + prep structure</li>
            <li>More repeat guests through consistency and clearer experience</li>
            <li>More direct bookings through a simple, clear booking funnel</li>
            <li>Less owner burnout because the team can run the system</li>
          </ul>

          {/* CONCLUSION */}
          <h2 className="font-headline">Conclusion: it’s structure, not magic</h2>
          <p>
            Hiring a consultant isn’t an admission of failure. It’s a shortcut to
            clarity—so you stop guessing and start building a business that holds
            up under pressure.
          </p>

          {/* CTA BOX */}
          <div className="not-prose mt-12 bg-card border border-border p-8 rounded-lg text-center">
            <h3 className="font-headline text-2xl font-bold">
              Want a quick diagnosis?
            </h3>
            <p className="mt-2 text-muted-foreground">
              Book a free 15-minute call. If I can help, I’ll tell you exactly
              what I’d fix first.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="font-semibold">
                <Link href="/contact">Book Your Free Call</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link href="/services/consulting">See Consulting</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Prefer DM? Message “SCAN” on Instagram @chefjezz.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
