import Image from "next/image";
import { Link } from "next-intl";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const aboutImage = PlaceHolderImages.find((p) => p.id === "about-jezza");

const principles = [
  {
    title: "Safe Hands, Clear Direction",
    description:
      "Calm leadership in chaos. I bring clarity, priorities, and a plan your team can actually follow.",
  },
  {
    title: "First Principles Thinking",
    description:
      "No copy-paste advice. We break the problem down, ask the right questions, and rebuild what works for your business.",
  },
  {
    title: "Structure Creates Freedom",
    description:
      "When prep, roles, and systems are tight, creativity and quality go up—stress goes down.",
  },
  {
    title: "Margins Without Killing the Food",
    description:
      "Portions, pricing, menu design, purchasing—practical changes that protect profit and keep standards high.",
  },
  {
    title: "Consistency Wins",
    description:
      "Guests return for consistency. We build repeatable execution: recipes, training, checks, and rhythm.",
  },
  {
    title: "Experience Sells",
    description:
      "Hospitality is an experience business. We align service flow, menu psychology, and marketing with what guests feel.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="I fix chaos in hospitality."
        subtitle="I’m a chef with 20 years of experience, including Michelin-level kitchens and management roles. I help struggling restaurants rebuild structure, protect margins, and create a guest experience that actually sells."
      />

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Image Section */}
          <div className="lg:col-span-2">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-lg">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
            </div>
          </div>

          {/* Text Section */}
          <div className="lg:col-span-3">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
              My Story
            </h2>

            <div className="prose prose-invert prose-lg text-foreground max-w-none mt-6 space-y-4">
              <p className="text-muted-foreground">
                I didn’t start in an office. I started on the line—learning the
                rhythm of service, the pressure of a full ticket rail, and the
                discipline it takes to execute at a high level every single day.
                Over the years I worked my way up through kitchens around the
                world, including Michelin-level environments, and stepped into
                multiple leadership and management roles.
              </p>

              <p className="text-muted-foreground">
                And I learned a hard truth: great food alone doesn’t guarantee a
                great business. The places that survive—and grow—are the ones
                with strong systems behind the scenes. Cost control, prep
                structure, training, menu psychology, purchasing, service flow…
                the “boring” stuff that actually creates freedom.
              </p>

              <p className="text-muted-foreground">
                That’s why I do what I do now. I help hospitality businesses
                that feel stuck—good food, bad cashflow, too much chaos—build a
                calmer operation with better margins. Not with vague theory, but
                with practical structure: clear priorities, repeatable
                processes, and a way of working that improves every week.
              </p>

              <p className="text-muted-foreground">
                My style is high energy when we brainstorm and create, and calm
                and structured when it’s time to put it on paper and execute.
                Thinking is only useful if it becomes real-world results.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What I stand for */}
      <section className="bg-card py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              What I Stand For
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              No ego, no fluff—just practical improvements that your team can
              execute and your numbers can prove.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((p) => (
              <div key={p.title} className="text-center p-6">
                <h3 className="font-headline text-xl font-semibold text-primary">
                  {p.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            How I Work
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple loop that turns chaos into clarity and results you can
            measure.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border-2 border-primary text-primary mx-auto">
                <p className="font-headline text-2xl font-bold">1</p>
              </div>
              <h3 className="mt-4 font-headline text-xl font-semibold">
                Diagnose
              </h3>
              <p className="mt-1 text-muted-foreground">
                We find the real bottlenecks—cashflow leaks, workflow chaos,
                menu margin killers, or experience gaps.
              </p>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border-2 border-primary text-primary mx-auto">
                <p className="font-headline text-2xl font-bold">2</p>
              </div>
              <h3 className="mt-4 font-headline text-xl font-semibold">
                Build Structure
              </h3>
              <p className="mt-1 text-muted-foreground">
                Prep plans, SOPs, training, costing, menu structure—systems your
                team can run without you babysitting.
              </p>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border-2 border-primary text-primary mx-auto">
                <p className="font-headline text-2xl font-bold">3</p>
              </div>
              <h3 className="mt-4 font-headline text-xl font-semibold">
                Execute With the Team
              </h3>
              <p className="mt-1 text-muted-foreground">
                I’m hands-on. We implement, train, adjust roles, and remove
                friction in real service—not in theory.
              </p>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border-2 border-primary text-primary mx-auto">
                <p className="font-headline text-2xl font-bold">4</p>
              </div>
              <h3 className="mt-4 font-headline text-xl font-semibold">
                Measure & Improve
              </h3>
              <p className="mt-1 text-muted-foreground">
                We track a few key numbers (food cost, labor, covers, pace,
                reviews) and improve every week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Ready to get your operation under control?
          </h2>
          <p className="mt-2 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Book a free 15-minute call. If I can help, I’ll tell you exactly
            what I’d fix first.
          </p>

          <Button
            asChild
            size="lg"
            variant="secondary"
            className="mt-8 bg-foreground text-background hover:bg-foreground/80 font-bold"
          >
            <Link href="/contact">Book Your Free Call</Link>
          </Button>

          <p className="mt-4 text-sm text-primary-foreground/70">
            Prefer DM? Message me “SCAN” on Instagram and I’ll send you 3 quick
            wins.
          </p>
        </div>
      </section>
    </div>
  );
}
