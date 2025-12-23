import { Link } from "next-intl";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const whoItIsFor = [
  "Restaurant owners feeling burnt out and overwhelmed.",
  "Chefs who are great with food but struggle with the numbers.",
  "New hospitality ventures needing a solid operational foundation.",
  "Established businesses looking to innovate and increase profitability.",
];

const problemsSolved = [
    "Shrinking profit margins and unpredictable food costs.",
    "Inconsistent service and high staff turnover.",
    "An outdated menu that isn't performing.",
    "Operational chaos and lack of standardized procedures (SOPs)."
];

const deliverables = [
  "In-depth analysis of your P&L and financial weak spots.",
  "A fully engineered and costed menu designed for profitability.",
  "Comprehensive Standard Operating Procedures (SOPs) for BOH and FOH.",
  "Actionable strategies for inventory management and waste reduction.",
  "Hands-on training programs for your kitchen and service teams.",
];

export default function ConsultingPage() {
  return (
    <div>
      <PageHeader
        title="Restaurant Consulting"
        subtitle="Practical, chef-led strategies to improve your margins, streamline your operations, and build a more resilient business."
      />
      <div className="container mx-auto px-4 py-16 md:py-24 space-y-16">
        
        <section className="max-w-3xl mx-auto text-center">
            <h2 className="font-headline text-3xl font-bold">Systems, Not Stress.</h2>
            <p className="mt-4 text-lg text-muted-foreground">
                I've been in your shoes. I know the pressure of a busy service and the headache of a spreadsheet that doesn't add up. My consulting approach is built on real-world experience, not theory. We'll work together to implement practical systems that give you more control, more profit, and more time back in your day.
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
          <h3 className="font-headline text-2xl md:text-3xl font-bold text-center">Typical Deliverables</h3>
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
            <h2 className="font-headline text-3xl font-bold">Ready to Improve Your Numbers?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Packages like the 90-minute 'Quick Scan' start at €495. Let's find the right fit for your business.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="font-semibold">
                    <Link href="/contact?service=consulting">Book a Free Call</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-semibold">
                    <Link href="/pricing">View Packages</Link>
                </Button>
            </div>
        </section>

      </div>
    </div>
  );
}
