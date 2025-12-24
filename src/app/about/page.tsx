// src/app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const values = [
  {
    title: "Safe Hands, Clear Direction",
    body: "Calm leadership in chaos. I bring clarity, priorities, and a plan your team can actually follow.",
  },
  {
    title: "First Principles Thinking",
    body: "No copy-paste advice. We break the problem down, ask the right questions, and rebuild what works for your business.",
  },
  {
    title: "Structure Creates Freedom",
    body: "When prep, roles, and systems are tight, creativity and quality go up—stress goes down.",
  },
  {
    title: "Margins Without Killing the Food",
    body: "Portions, pricing, menu design, purchasing—practical changes that protect profit and keep standards high.",
  },
  {
    title: "Consistency Wins",
    body: "Guests return for consistency. We build repeatable execution: recipes, training, checks, and rhythm.",
  },
  {
    title: "Experience Sells",
    body: "Hospitality is an experience business. We align service flow, menu psychology, and marketing with what guests feel.",
  },
];

const steps = [
  {
    n: "1",
    title: "Diagnose",
    body: "We find the real bottlenecks—cashflow leaks, workflow chaos, menu margin killers, or experience gaps.",
  },
  {
    n: "2",
    title: "Build Structure",
    body: "Prep plans, SOPs, training, costing, menu structure—systems your team can run without you babysitting.",
  },
  {
    n: "3",
    title: "Execute With the Team",
    body: "I’m hands-on. We implement, train, adjust roles, and remove friction in real service—not in theory.",
  },
  {
    n: "4",
    title: "Measure & Improve",
    body: "We track a few key numbers (food cost, labor, covers, pace, reviews) and improve every week.",
  },
];

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find((p) => p.id === "about-jezza");

  return (
    <div className="relative">
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/10 to-transparent" />

      {/* HERO */}
      <section className="relative border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
              I fix chaos in hospitality.
            </h1>
            <p className="mt-4 text-base md:text-xl text-muted-foreground">
              I’m a chef with 20 years of experience, including Michelin-level kitchens and management roles.
              I help struggling restaurants rebuild structure, protect margins, and create a guest experience
              that actually sells.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/free-diagnosis"
                className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
              >
                Book a free 15-min call
              </Link>
              <Link
                href="/services/consulting"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "font-semibold"
                )}
              >
                See how I work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MY STORY */}
      <section className="relative">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            {/* Image */}
            <div className="order-2 md:order-1">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
                {aboutImage ? (
                  <div className="relative aspect-[4/3] md:aspect-[3/4]">
                    <Image
                      src={aboutImage.imageUrl}
                      alt={aboutImage.description}
                      fill
                      className="object-cover"
                      data-ai-hint={aboutImage.imageHint}
                      priority
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] md:aspect-[3/4]" />
                )}
              </div>
            </div>

            {/* Text */}
            <div className="order-1 md:order-2">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">
                My Story
              </h2>
              <div className="mt-6 space-y-5 text-base md:text-lg leading-relaxed text-muted-foreground">
                <p>
                  I didn’t start in an office. I started on the line—learning the rhythm of service, the
                  pressure of a full ticket rail, and the discipline it takes to execute at a high level
                  every single day. Over the years I worked my way up through kitchens around the world,
                  including Michelin-level environments, and stepped into multiple leadership and management roles.
                </p>
                <p>
                  And I learned a hard truth: great food alone doesn’t guarantee a great business.
                  The places that survive—and grow—are the ones with strong systems behind the scenes.
                  Cost control, prep structure, training, menu psychology, purchasing, service flow… the “boring”
                  stuff that actually creates freedom.
                </p>
                <p>
                  That’s why I do what I do now. I help hospitality businesses that feel stuck—good food,
                  bad cashflow, too much chaos—build a calmer operation with better margins. Not with vague theory,
                  but with practical structure: clear priorities, repeatable processes, and a way of working that improves every week.
                </p>
                <p>
                  My style is high energy when we brainstorm and create, and calm and structured when it’s
                  time to put it on paper and execute. Thinking is only useful if it becomes real-world results.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/free-diagnosis"
                  className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
                >
                  Book Your Free Call
                </Link>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold")}
                >
                  Contact
                </Link>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Prefer DM? Message “SCAN” on Instagram @chefjezz and I’ll send you 3 quick wins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I STAND FOR */}
      <section className="relative border-y border-border bg-card/40">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl md:text-5xl font-bold">
              What I Stand For
            </h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              No ego, no fluff—just practical improvements that your team can execute and your numbers can prove.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border bg-background/60 p-6 md:p-7"
              >
                <h3 className="font-headline text-xl md:text-2xl font-bold text-primary">
                  {v.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW I WORK */}
      <section className="relative">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl md:text-5xl font-bold">
              How I Work
            </h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              A simple loop that turns chaos into clarity and results you can measure.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary text-primary font-headline text-2xl font-bold">
                  {s.n}
                </div>
                <h3 className="mt-6 font-headline text-xl md:text-2xl font-bold">
                  {s.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Ready to get your operation under control?
            </h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              Book a free 15-minute call. If I can help, I’ll tell you exactly what I’d fix first.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/free-diagnosis"
                className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
              >
                Book Your Free Call
              </Link>
              <Link
                href="/services/consulting"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold")}
              >
                See Consulting
              </Link>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Prefer DM? Message “SCAN” on Instagram @chefjezz and I’ll send you 3 quick wins.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
