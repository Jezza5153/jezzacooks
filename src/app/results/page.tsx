import Image from "next/image";
import { Link } from "next-intl";
import PageHeader from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownRight, ArrowUpRight, ShieldCheck, Timer, Target } from "lucide-react";

type Metric = {
  label: string;
  value: string;
  change: "increase" | "decrease";
  note?: string;
};

type CaseStudy = {
  clientLabel: string; // anonymous label for now
  service: string;
  tags: string[];
  challenge: string;
  solution: string;
  scope: string[];
  metrics: Metric[];
  image?: { imageUrl: string; description: string; imageHint?: string };
};

const cases: CaseStudy[] = [
  {
    clientLabel: "Restaurant (Amersfoort) — Anonymous",
    service: "Menu Engineering + Margin Reset",
    tags: ["Margins", "Menu", "Training"],
    challenge:
      "Busy nights, but cashflow stayed tight. Food cost was drifting, menu felt overloaded, and the team wasn’t steering guests toward high-margin choices.",
    solution:
      "Rebuilt menu structure, re-costed core dishes, tightened portion specs, and introduced a simple ‘stars-first’ selling rhythm for the floor team.",
    scope: [
      "Menu costing + margin map",
      "Menu structure rebuild (stars/puzzles/plowhorses/dogs)",
      "Portion/spec sheet alignment",
      "Quick staff training on selling + pace",
    ],
    metrics: [
      { label: "Gross Margin", value: "+8%", change: "increase", note: "after menu reset" },
      { label: "Food Cost", value: "-5%", change: "decrease", note: "portion + purchasing discipline" },
      { label: "Average Check", value: "+15%", change: "increase", note: "selling rhythm + menu clarity" },
    ],
    image: PlaceHolderImages.find((p) => p.id === "result-1-after") ?? undefined,
  },
  {
    clientLabel: "Café (Region) — Anonymous",
    service: "Operations + Team Rhythm",
    tags: ["Systems", "SOPs", "Flow"],
    challenge:
      "Owner was stuck in constant firefighting. Opening/closing was inconsistent, service pace dipped during peaks, and staff turnover was high.",
    solution:
      "Built a calm service system: clear roles, short SOP checklists, a prep rhythm that prevents bottlenecks, and a simple weekly KPI check-in.",
    scope: [
      "Opening/closing SOPs (short + usable)",
      "Role clarity + shift structure",
      "Prep + station flow mapping",
      "Weekly owner rhythm (30 minutes)",
    ],
    metrics: [
      { label: "Owner Hours", value: "-20 hrs", change: "decrease", note: "less firefighting" },
      { label: "Staff Turnover", value: "-40%", change: "decrease", note: "clear standards + training" },
      { label: "Service Pace", value: "+25%", change: "increase", note: "flow + prep structure" },
    ],
    image: PlaceHolderImages.find((p) => p.id === "result-2-after") ?? undefined,
  },
  {
    clientLabel: "Hospitality Business — Anonymous",
    service: "Website as a Booking Tool",
    tags: ["Bookings", "Website", "Conversion"],
    challenge:
      "Too dependent on third-party platforms and commissions. Website was slow, unclear on mobile, and didn’t drive direct inquiries.",
    solution:
      "Built a fast, mobile-first site with clear CTAs, a simplified story, and a booking-first structure. Focus: speed, trust, and conversion—not fancy effects.",
    scope: [
      "Conversion-first page structure",
      "Menu/offer clarity + CTAs",
      "Speed + mobile UX improvements",
      "Basic local trust signals (reviews/FAQ/contact)",
    ],
    metrics: [
      { label: "Direct Inquiries", value: "+300%", change: "increase", note: "clear funnel + CTAs" },
      { label: "Conversion Rate", value: "+150%", change: "increase", note: "mobile UX + speed" },
      { label: "Commission Saved", value: "€15k+", change: "increase", note: "more direct" },
    ],
    image: PlaceHolderImages.find((p) => p.id === "result-3-after") ?? undefined,
  },
];

function MetricCard({ metric }: { metric: Metric }) {
  const Icon = metric.change === "increase" ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="bg-card p-4 rounded-lg border border-border">
      <p className="text-sm text-muted-foreground">{metric.label}</p>
      <p className="text-2xl font-bold text-foreground flex items-center">
        {metric.value}
        <Icon
          className={`ml-2 h-5 w-5 ${
            metric.change === "increase" ? "text-primary" : "text-muted-foreground"
          }`}
        />
      </p>
      {metric.note && (
        <p className="mt-1 text-xs text-muted-foreground">{metric.note}</p>
      )}
    </div>
  );
}

export default function ResultsPage() {
  return (
    <div>
      <PageHeader
        title="Results, Not Reports"
        subtitle="I don’t sell theory. I build structure that holds up in real service—and we measure the impact."
      />

      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* credibility strip */}
        <div className="max-w-5xl mx-auto mb-10 rounded-lg border border-border bg-card p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold">Safe hands</p>
                <p className="text-sm text-muted-foreground">
                  Calm leadership, clear priorities, no ego.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Target className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold">Measurable changes</p>
                <p className="text-sm text-muted-foreground">
                  Margins, pace, consistency, bookings.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Timer className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold">Fast diagnosis</p>
                <p className="text-sm text-muted-foreground">
                  Quick Scan → top 3 priorities → action plan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* cases */}
        <div className="space-y-16">
          {cases.map((c, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <CardTitle className="font-headline text-3xl">
                      {c.clientLabel}
                    </CardTitle>
                    <p className="text-primary font-semibold mt-1">{c.service}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                {c.image && (
                  <div className="relative w-full h-56 md:h-72 rounded-lg overflow-hidden border border-border bg-card">
                    <Image
                      src={c.image.imageUrl}
                      alt={c.image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={c.image.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
                  </div>
                )}
              </CardHeader>

              <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg">The Challenge</h3>
                    <p className="text-muted-foreground mt-1">{c.challenge}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">What We Did</h3>
                    <p className="text-muted-foreground mt-1">{c.solution}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">Scope</h3>
                    <ul className="mt-2 space-y-2 text-muted-foreground">
                      {c.scope.map((s) => (
                        <li key={s}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Impact</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    These are example results. Your numbers depend on your concept, team buy-in,
                    and where the leaks are.
                  </p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {c.metrics.map((m, i) => (
                      <MetricCard key={i} metric={m} />
                    ))}
                  </div>

                  <div className="mt-6 rounded-lg border border-border bg-card p-5">
                    <p className="text-sm text-muted-foreground">
                      Want to know what I’d fix first in your business?
                    </p>
                    <div className="mt-3 flex flex-col sm:flex-row gap-3">
                      <Button asChild size="lg" className="font-semibold">
                        <Link href="/contact">Book a Free 15-min Call</Link>
                      </Button>
                      <Button asChild size="lg" variant="secondary" className="font-semibold">
                        <Link href="/services/consulting">See Consulting</Link>
                      </Button>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Prefer DM? Message “SCAN” on Instagram @chefjezz.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Coming soon */}
          <div className="text-center p-8 bg-card rounded-lg border border-border max-w-3xl mx-auto">
            <h2 className="font-headline text-2xl font-bold">
              More case studies coming soon
            </h2>
            <p className="mt-2 text-muted-foreground">
              As projects finish, I’ll add real examples with clearer numbers and before/after snapshots.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="font-semibold">
                <Link href="/contact">Start with a Quick Scan</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link href="/pricing">See Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
