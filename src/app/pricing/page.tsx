
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/page-header";
import { cn } from "@/lib/utils";

export default function PricingPage() {
    const pricingTiers = [
        {
          title: "Quick Scan",
          price: "€ 495",
          description: "A 90-min deep-dive to identify your 3 biggest growth levers.",
          features: ["Review of your choice (Menu, P&L, etc.)", "Actionable priority list", "1-month WhatsApp support"],
          cta: "Book a Scan",
          href: "/contact?service=consulting&package=scan"
        },
        {
          title: "Day Rate",
          price: "€ 1200",
          description: "A full day on-site to tackle your most pressing challenges.",
          features: ["On-site observation", "Hands-on team training", "SOP development", "Follow-up report"],
           cta: "Book a Day",
           href: "/contact?service=consulting&package=day"
        },
        {
          title: "Retainer",
          price: "Custom",
          description: "Ongoing partnership for continuous growth and support.",
          features: ["Weekly KPI check-ins", "Menu iteration & costing", "Marketing & brand support", "Priority access"],
          cta: "Let's Talk",
          href: "/contact?service=consulting&package=retainer"
        },
      ];

    return (
        <div>
            <PageHeader
                title="Transparent Pricing"
                subtitle="Invest in expertise, get measurable returns."
            />
            <section id="pricing" className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pricingTiers.map((tier) => (
                        <Card key={tier.title} className="flex flex-col">
                            <CardHeader>
                            <CardTitle className="font-headline text-2xl">{tier.title}</CardTitle>
                            <p className="text-4xl font-bold pt-4">{tier.price}</p>
                            <p className="text-muted-foreground">{tier.description}</p>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col">
                            <ul className="space-y-3 flex-grow">
                                {tier.features.map((feature) => (
                                <li key={feature} className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                                ))}
                            </ul>
                            <Link href={tier.href} className={cn(buttonVariants({ variant: tier.price === 'Custom' ? 'default' : 'outline' }), "w-full mt-6 font-semibold")}>
                                {tier.cta}
                            </Link>
                            </CardContent>
                        </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
