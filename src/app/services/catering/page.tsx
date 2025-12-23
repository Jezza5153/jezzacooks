import { Link } from "next-intl";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const whoItIsFor = [
  "Companies hosting client dinners or brand activation events.",
  "Individuals celebrating a special occasion with an intimate private dinner.",
  "Event planners looking for a reliable, high-quality culinary partner.",
  "Anyone who values exceptional food and seamless service without the restaurant hassle.",
];

const problemsSolved = [
    "The stress of planning and executing food for an important event.",
    "Generic, uninspired catering menus that fail to impress.",
    "Finding a caterer who understands brand messaging and audience.",
    "The logistical nightmare of coordinating vendors, staff, and cleanup."
];

const deliverables = [
  "Bespoke menu creation tailored to your event theme and dietary needs.",
  "Sourcing of premium, seasonal ingredients from trusted suppliers.",
  "On-site cooking and execution by a professional chef.",
  "Optional wine pairing, cocktail service, and professional waitstaff.",
  "Full setup and cleanup, leaving your space exactly as we found it.",
];

export default function CateringPage() {
  return (
    <div>
      <PageHeader
        title="Catering & Private Chef"
        subtitle="Restaurant-quality dining experiences, wherever you are. From intimate private dinners to full-scale event catering."
      />
      <div className="container mx-auto px-4 py-16 md:py-24 space-y-16">
        
        {/* Intro Section */}
        <section className="max-w-3xl mx-auto text-center">
            <h2 className="font-headline text-3xl font-bold">Unforgettable Food, Flawless Service.</h2>
            <p className="mt-4 text-lg text-muted-foreground">
                I bring the creativity, precision, and quality of a high-end restaurant to your home, office, or event space. My philosophy is simple: start with the best ingredients, treat them with respect, and serve them with warm, unobtrusive hospitality. Every menu is a collaboration, designed to perfectly match your taste, theme, and guests' expectations.
            </p>
        </section>

        {/* Details Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
                <h3 className="font-headline text-2xl font-bold text-primary mb-4">Who It's For</h3>
                <ul className="space-y-3">
                {whoItIsFor.map((item, index) => (
                    <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-1 mr-3 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                    </li>
                ))}
                </ul>
            </div>
            <div>
                <h3 className="font-headline text-2xl font-bold text-primary mb-4">Problems It Solves</h3>
                <ul className="space-y-3">
                {problemsSolved.map((item, index) => (
                    <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-1 mr-3 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                    </li>
                ))}
                </ul>
            </div>
        </section>
        
        {/* Deliverables */}
        <section className="bg-card p-8 md:p-12 rounded-lg border border-border">
          <h3 className="font-headline text-2xl md:text-3xl font-bold text-center">What You Can Expect</h3>
          <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliverables.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-bold mr-4">
                  {index + 1}
                </div>
                <p className="text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Teaser & CTA */}
        <section className="text-center">
            <h2 className="font-headline text-3xl font-bold">Custom Quotes for Your Event</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Private dinners start from €150 per person. For all events, I provide a detailed, transparent quote with no hidden costs.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="font-semibold">
                    <Link href="/contact?service=catering">Request a Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-semibold">
                    <Link href="/pricing">View Pricing Tiers</Link>
                </Button>
            </div>
        </section>

      </div>
    </div>
  );
}
