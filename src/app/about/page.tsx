import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Check } from "lucide-react";

const aboutImage = PlaceHolderImages.find((p) => p.id === 'about-jezza');
const principles = [
    { title: "No Poeha (No Fuss)", description: "We focus on practical solutions that deliver real results, without the fluff." },
    { title: "Profitability is Key", description: "A great restaurant must also be a great business. We build systems for healthy margins." },
    { title: "Consistency Wins", description: "From the first dish to the last, consistency builds trust and loyalty." },
    { title: "Guest Experience Above All", description: "Every decision is made with the guest's delight in mind." },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader 
        title="I'm a chef who builds systems."
        subtitle="I combine a decade of experience behind the pass with a passion for creating smooth, profitable hospitality operations."
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
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">My Story</h2>
                <div className="prose prose-invert prose-lg text-foreground max-w-none mt-6 space-y-4">
                    <p className="text-muted-foreground">
                        I didn't start in an office. I started as a line cook, learning the rhythm of a busy service. I've felt the burn of the stove, the pressure of a full ticket rail, and the satisfaction of a perfectly executed dish. For years, I worked my way up, eventually running kitchens and managing teams in high-pressure environments.
                    </p>
                    <p className="text-muted-foreground">
                        But I noticed something: the most talented chefs weren't always the most successful. The difference was never about the food alone. It was about the <span className="text-foreground font-semibold">systems</span>. Inventory, costing, staff training, menu psychology, and the all-important guest journey.
                    </p>
                    <p className="text-muted-foreground">
                        That's when my focus shifted. I became obsessed with the 'how' behind the 'what'. JEZZA COOKS was born from this obsession: to bring a chef's practical mindset to the business of hospitality. I don't just give advice; I roll up my sleeves and help you build a stronger, more resilient, and more profitable business.
                    </p>
                </div>
            </div>
        </div>
      </div>
      
      {/* What I stand for */}
      <section className="bg-card py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">What I Stand For</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((p) => (
                <div key={p.title} className="text-center p-6">
                    <h3 className="font-headline text-xl font-semibold text-primary">{p.title}</h3>
                    <p className="mt-2 text-muted-foreground">{p.description}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">How I Work</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">A simple, effective loop for continuous improvement.</p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="p-4">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border-2 border-primary text-primary mx-auto">
                      <p className="font-headline text-2xl font-bold">1</p>
                  </div>
                  <h3 className="mt-4 font-headline text-xl font-semibold">Plan</h3>
                  <p className="mt-1 text-muted-foreground">We dig into your data and goals to create a clear, actionable strategy.</p>
              </div>
              <div className="p-4">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border-2 border-primary text-primary mx-auto">
                       <p className="font-headline text-2xl font-bold">2</p>
                  </div>
                  <h3 className="mt-4 font-headline text-xl font-semibold">Do</h3>
                  <p className="mt-1 text-muted-foreground">I help you implement the changes, whether it's training staff or building a new menu.</p>
              </div>
              <div className="p-4">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border-2 border-primary text-primary mx-auto">
                       <p className="font-headline text-2xl font-bold">3</p>
                  </div>
                  <h3 className="mt-4 font-headline text-xl font-semibold">Check</h3>
                  <p className="mt-1 text-muted-foreground">We track KPIs to measure the impact and see what's working (and what's not).</p>
              </div>
              <div className="p-4">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border-2 border-primary text-primary mx-auto">
                       <p className="font-headline text-2xl font-bold">4</p>
                  </div>
                  <h3 className="mt-4 font-headline text-xl font-semibold">Improve</h3>
                  <p className="mt-1 text-muted-foreground">We refine the process, doubling down on successes and adjusting our approach.</p>
              </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Let's build a better business.</h2>
            <p className="mt-2 text-lg text-primary-foreground/80 max-w-2xl mx-auto">Book a free, 15-minute introductory call to see if we're a good fit.</p>
            <Button asChild size="lg" variant="secondary" className="mt-8 bg-foreground text-background hover:bg-foreground/80 font-bold">
                <Link href="/contact">Book Your Free Call</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
