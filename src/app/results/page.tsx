import Image from 'next/image';
import PageHeader from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const results = [
    {
        client: "Restaurant A",
        service: "Menu Engineering",
        challenge: "Low profitability despite being busy. High food cost and a confusing menu.",
        solution: "Re-engineered the menu layout, re-costed all dishes, and introduced high-margin 'star' items. Trained staff on suggestive selling.",
        metrics: [
            { label: "Gross Profit Margin", value: "+8%", change: "increase" },
            { label: "Food Cost", value: "-5%", change: "decrease" },
            { label: "Average Check Size", value: "+15%", change: "increase" },
        ],
        imageBefore: PlaceHolderImages.find(p => p.id === 'result-1-before'),
        imageAfter: PlaceHolderImages.find(p => p.id === 'result-1-after')
    },
    {
        client: "Cafe B",
        service: "Operational Streamlining",
        challenge: "Owner was working 80+ hours a week, service was inconsistent, and staff turnover was high.",
        solution: "Implemented clear SOPs for opening/closing, created a digital inventory system, and restructured team roles for clearer responsibilities.",
        metrics: [
            { label: "Owner's Weekly Hours", value: "-20 hrs", change: "decrease" },
            { label: "Staff Turnover", value: "-40%", change: "decrease" },
            { label: "Service Speed", value: "+25%", change: "increase" },
        ],
        imageBefore: PlaceHolderImages.find(p => p.id === 'result-1-before'),
        imageAfter: PlaceHolderImages.find(p => p.id === 'result-1-after')
    },
    {
        client: "Boutique Hotel C",
        service: "Hospitality Website",
        challenge: "Over-reliant on OTAs (Booking.com, etc.) and their high commissions. Website was slow and not mobile-friendly.",
        solution: "Designed and built a new, fast, mobile-first website focused on direct bookings, showcasing the hotel's unique story and amenities.",
        metrics: [
            { label: "Direct Booking Rate", value: "+300%", change: "increase" },
            { label: "Website Conversion Rate", value: "+150%", change: "increase" },
            { label: "OTA Commission Saved", value: "€15k+", change: "increase" },
        ],
        imageBefore: PlaceHolderImages.find(p => p.id === 'result-1-before'),
        imageAfter: PlaceHolderImages.find(p => p.id === 'result-1-after')
    }
];

export default function ResultsPage() {
  return (
    <div>
      <PageHeader
        title="Results, Not Reports"
        subtitle="I focus on delivering measurable improvements to your bottom line and operations. Here are a few examples."
      />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="space-y-24">
          {results.map((result, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="font-headline text-3xl">{result.client}</CardTitle>
                        <p className="text-primary font-semibold">{result.service}</p>
                    </div>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg">The Challenge</h3>
                  <p className="text-muted-foreground mt-1">{result.challenge}</p>
                  <h3 className="font-semibold text-lg mt-4">The Solution</h3>
                  <p className="text-muted-foreground mt-1">{result.solution}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">The Impact</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    {result.metrics.map((metric, i) => (
                      <div key={i} className="bg-card p-4 rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                        <p className="text-2xl font-bold text-foreground flex items-center">
                          {metric.value}
                          {metric.change === 'increase' ? <ArrowUpRight className="ml-2 h-5 w-5 text-green-500" /> : <ArrowDownRight className="ml-2 h-5 w-5 text-red-500" />}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="text-center p-8 bg-card rounded-lg border border-border">
              <h2 className="font-headline text-2xl font-bold">More case studies coming soon...</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
