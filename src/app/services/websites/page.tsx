import { Link } from "next-intl";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const whoItIsFor = [
  "Restaurants tired of paying high commissions to booking platforms.",
  "Hotels and B&Bs wanting a beautiful, modern site that drives direct bookings.",
  "Caterers and private chefs needing a professional online portfolio.",
  "Any hospitality business whose current website is slow, outdated, or not mobile-friendly."
];

const problemsSolved = [
    "Losing customers due to a slow or confusing website.",
    "Over-reliance on third-party platforms and their fees.",
    "A website that doesn't reflect the quality of your brand.",
    "Poor search engine visibility and low online traffic."
];

const deliverables = [
  "A fast, custom-designed, mobile-first website.",
  "Seamless integration with your preferred booking or reservation system.",
  "A menu layout that is both beautiful and psychologically optimized to sell.",
  "On-page SEO to improve your ranking on Google.",
  "Training on how to update your content, or an optional monthly care plan.",
];

export default function WebsitesPage() {
  return (
    <div>
      <PageHeader
        title="Hospitality Websites"
        subtitle="Websites built by a chef who understands margins, menu psychology, and how to convert visitors into guests."
      />
      <div className="container mx-auto px-4 py-16 md:py-24 space-y-16">
        
        <section className="max-w-3xl mx-auto text-center">
            <h2 className="font-headline text-3xl font-bold">More Than a Website, It's a Growth Engine.</h2>
            <p className="mt-4 text-lg text-muted-foreground">
                Your website is often your first impression. A generic template site built by someone who doesn't understand hospitality will cost you money. I design and build websites with a singular focus: to turn a visitor into a paying guest. That means it needs to be fast, easy to navigate on a phone, and guide the user directly to the 'Book Now' button.
            </p>
        </section>

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
        
        <section className="bg-card p-8 md:p-12 rounded-lg border border-border">
          <h3 className="font-headline text-2xl md:text-3xl font-bold text-center">Key Features & Deliverables</h3>
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

        <section className="text-center">
            <h2 className="font-headline text-3xl font-bold">Start Converting Visitors</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                A one-page booking site starts from €1500. Let's discuss a solution that fits your budget and goals.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="font-semibold">
                    <Link href="/contact?service=websites">Get a Free Proposal</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-semibold">
                    <Link href="/pricing">View Website Packages</Link>
                </Button>
            </div>
        </section>

      </div>
    </div>
  );
}
