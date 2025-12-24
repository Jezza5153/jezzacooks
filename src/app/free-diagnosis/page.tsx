// src/app/free-diagnosis/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Clock, Mail, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Stage = "open" | "opening_soon" | "idea";
type Pain = "margins_cash" | "systems" | "menu" | "team" | "bookings" | "reviews" | "other";
type Urgency = "now" | "2-4_weeks" | "1-3_months" | "no_rush";
type Revenue = "lt10" | "10_25" | "25_50" | "50_100" | "100plus" | "unknown";
type PercentBand = "lt28" | "28_33" | "33_38" | "38_45" | "45plus" | "unknown";
type Strength = "strong" | "ok" | "weak" | "none";

const SIGNALS = [
  { id: "cashflow", label: "Cashflow stress (always tight)" },
  { id: "food_drift", label: "Food cost drifting / no portion control" },
  { id: "labor_high", label: "Labor too high / rosters feel random" },
  { id: "menu_big", label: "Menu too big / prep is chaos" },
  { id: "quality_inconsistent", label: "Quality/service inconsistent" },
  { id: "owner_60_80", label: "Owner working 60–80h (no control)" },
  { id: "reviews_not_helping", label: "Google reviews not helping" },
  { id: "not_enough_direct", label: "Not enough direct bookings" },
  { id: "turnover_training", label: "High staff turnover / training weak" },
] as const;

const percentMid: Record<PercentBand, number> = {
  lt28: 26,
  "28_33": 30.5,
  "33_38": 35.5,
  "38_45": 41.5,
  "45plus": 48,
  unknown: 34,
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function computePlan(input: {
  stage: Stage;
  pain: Pain;
  revenue: Revenue;
  foodCost: PercentBand;
  laborCost: PercentBand;
  bookings: Strength;
  systems: Strength;
  signals: string[];
}) {
  const fc = percentMid[input.foodCost];
  const lc = percentMid[input.laborCost];
  const prime = clamp(Math.round((fc + lc) * 10) / 10, 45, 95);

  // quick “why” tag
  const tag =
    prime >= 70 ? "Prime cost ≈ " + prime + "%" :
    prime >= 62 ? "Prime cost ≈ " + prime + "%" :
    "Prime cost ≈ " + prime + "%";

  // steps (rule-based, no AI)
  const steps: string[] = [];

  // Always start with menu mix + portioning if margins/cash or food drift signal
  const foodSignals = input.signals.includes("food_drift") || input.pain === "margins_cash" || input.pain === "menu";
  const laborSignals = input.signals.includes("labor_high") || input.pain === "team" || input.pain === "systems";

  if (foodSignals) {
    steps.push("Step 1: Identify your top 5 sellers + margins (quick menu mix).");
    steps.push("Step 2: Lock 3 portion controls (weighing, scoops, ladles) + 1 waste log for 7 days.");
  } else {
    steps.push("Step 1: Clarify your #1 bottleneck (one metric + one process to fix first).");
  }

  if (laborSignals) {
    steps.push("Step 3: Tighten schedule rules (sales forecast → labor hours) + define station ownership.");
  } else {
    steps.push("Step 3: Set 1 weekly KPI rhythm (sales, food%, labor%) + 30-min review.");
  }

  // bookings nudges
  if (input.bookings === "weak" || input.bookings === "none" || input.signals.includes("not_enough_direct")) {
    steps.push("Bonus: Put a single ‘Book Now’ CTA above the fold + add hours/location on every page.");
  }

  // systems nudges
  if (input.systems === "weak" || input.systems === "none" || input.pain === "systems") {
    steps.push("Bonus: Create 3 SOPs only: opening, service pace, close-down (one page each).");
  }

  const urgencyLine =
    input.stage === "opening_soon"
      ? "You’re opening soon — we’ll focus on a launch-safe checklist (menu, prep map, roles)."
      : input.stage === "idea"
      ? "You’re early-stage — we’ll focus on concept clarity + numbers before you spend."
      : input.pain === "margins_cash"
      ? "Cash/margins first — we’ll cut leaks before adding anything new."
      : "We’ll pick the simplest first lever and build momentum.";

  return { tag, steps: steps.slice(0, 5), urgencyLine };
}

export default function FreeDiagnosisPage() {
  const { toast } = useToast();
  const formRef = React.useRef<HTMLDivElement | null>(null);

  const [name, setName] = React.useState("");
  const [businessName, setBusinessName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [instagram, setInstagram] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const [stage, setStage] = React.useState<Stage>("open");
  const [pain, setPain] = React.useState<Pain>("margins_cash");
  const [urgency, setUrgency] = React.useState<Urgency>("2-4_weeks");
  const [revenue, setRevenue] = React.useState<Revenue>("25_50");

  const [foodCost, setFoodCost] = React.useState<PercentBand>("33_38");
  const [laborCost, setLaborCost] = React.useState<PercentBand>("33_38");

  const [bookings, setBookings] = React.useState<Strength>("weak");
  const [systems, setSystems] = React.useState<Strength>("weak");

  const [signals, setSignals] = React.useState<string[]>([]);

  const selectedCount = signals.length;
  const plan = React.useMemo(() => {
    return computePlan({
      stage,
      pain,
      revenue,
      foodCost,
      laborCost,
      bookings,
      systems,
      signals,
    });
  }, [stage, pain, revenue, foodCost, laborCost, bookings, systems, signals]);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleSignal(id: string) {
    setSignals((prev) => {
      const has = prev.includes(id);
      if (has) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, id];
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !businessName.trim() || !city.trim() || !email.trim()) {
      toast({
        title: "Missing info",
        description: "Please fill: name, business name, city and email.",
        variant: "destructive",
      });
      return;
    }

    // If you already have an API route, plug it in here.
    // This keeps the page from breaking while you wire up email later.
    const payload = {
      name,
      businessName,
      city,
      email,
      website,
      instagram,
      stage,
      pain,
      urgency,
      revenue,
      foodCost,
      laborCost,
      bookings,
      systems,
      signals,
      notes,
      quickPlan: plan,
      createdAt: new Date().toISOString(),
    };

    try {
      // Optional: create /src/app/api/free-diagnosis/route.ts and handle it there.
      const res = await fetch("/api/free-diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API not ready");

      toast({
        title: "Sent ✅",
        description: "Got it — I’ll reply by email with your next steps.",
      });

      setNotes("");
    } catch {
      // Fallback: copy payload so you never lose leads while building backend.
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      toast({
        title: "Copied (backend not connected yet)",
        description: "Your submission was copied to clipboard so you don’t lose it.",
      });
    }
  }

  return (
    <div className="relative">
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/10 to-transparent" />

      {/* HERO */}
      <section className="relative">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="rounded-full px-3 py-1">
                Free
              </Badge>
              <Badge className="rounded-full px-3 py-1">
                15-min Diagnosis
              </Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1">
                No hard sell
              </Badge>
            </div>

            <h1 className="mt-6 font-headline text-4xl md:text-6xl font-bold tracking-tight">
              Free diagnosis call{" "}
              <span className="text-muted-foreground">
                (so you feel safe before spending a euro)
              </span>
            </h1>

            <p className="mt-4 text-base md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Tell me what’s happening (margins, chaos, systems, bookings). I’ll ask sharp questions,
              give you 1–2 quick wins, and recommend the simplest next step: do nothing, Quick Scan,
              or on-site.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "font-semibold"
                )}
              >
                <Phone className="mr-2 h-4 w-4" />
                Book the Free Call
              </Link>

              <Button
                type="button"
                size="lg"
                variant="secondary"
                className="font-semibold"
                onClick={scrollToForm}
              >
                <Mail className="mr-2 h-4 w-4" />
                Fill the Diagnosis Form
              </Button>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              The form helps me prep — so you get better answers in less time.
            </p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="relative border-t border-border">
        <div ref={formRef} className="container mx-auto px-4 py-14 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            {/* LEFT: Form */}
            <Card className="border-border bg-card/50">
              <CardHeader className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Free Diagnosis (Multiple choice)
                    </p>
                    <CardTitle className="font-headline text-3xl md:text-4xl">
                      2 minutes. I reply fast.
                    </CardTitle>
                    <p className="mt-2 text-muted-foreground">
                      Pick answers → you’ll see a “likely first steps” snapshot instantly. Then I email you back.
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold">~2 min</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={onSubmit} className="space-y-8">
                  {/* Quick plan preview card (mobile only) */}
                  <div className="lg:hidden">
                    <Card className="border-border bg-background/40">
                      <CardHeader className="pb-3">
                        <CardTitle className="font-headline text-xl">
                          Likely first steps (quick plan)
                        </CardTitle>
                        <Badge className="mt-2 w-fit rounded-full">{plan.tag}</Badge>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <ul className="list-disc pl-5 space-y-2">
                          {plan.steps.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                        <p className="text-xs">
                          This is rule-based (no AI on the site). You’ll get a tailored reply after submission.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Identity */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your name *</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business">Business name *</Label>
                      <Input
                        id="business"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Restaurant / cafe / hotel"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        type="email"
                      />
                    </div>
                  </div>

                  {/* Selects */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Stage *</Label>
                      <Select value={stage} onValueChange={(v) => setStage(v as Stage)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open & running</SelectItem>
                          <SelectItem value="opening_soon">Opening soon</SelectItem>
                          <SelectItem value="idea">Idea / planning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Biggest pain *</Label>
                      <Select value={pain} onValueChange={(v) => setPain(v as Pain)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pain" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="margins_cash">Margins / cash</SelectItem>
                          <SelectItem value="systems">Systems (SOPs, costing, rhythm)</SelectItem>
                          <SelectItem value="menu">Menu / prep</SelectItem>
                          <SelectItem value="team">Team / labor</SelectItem>
                          <SelectItem value="bookings">Bookings / marketing</SelectItem>
                          <SelectItem value="reviews">Reviews / reputation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Urgency *</Label>
                      <Select value={urgency} onValueChange={(v) => setUrgency(v as Urgency)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="now">This week</SelectItem>
                          <SelectItem value="2-4_weeks">2–4 weeks</SelectItem>
                          <SelectItem value="1-3_months">1–3 months</SelectItem>
                          <SelectItem value="no_rush">No rush</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Monthly revenue (pick one)</Label>
                      <Select value={revenue} onValueChange={(v) => setRevenue(v as Revenue)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select revenue" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lt10">{"< €10k"}</SelectItem>
                          <SelectItem value="10_25">€10k–€25k</SelectItem>
                          <SelectItem value="25_50">€25k–€50k</SelectItem>
                          <SelectItem value="50_100">€50k–€100k</SelectItem>
                          <SelectItem value="100plus">€100k+</SelectItem>
                          <SelectItem value="unknown">Not sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Food cost % (pick one)</Label>
                      <Select value={foodCost} onValueChange={(v) => setFoodCost(v as PercentBand)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select food cost" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lt28">{"< 28%"}</SelectItem>
                          <SelectItem value="28_33">28–33%</SelectItem>
                          <SelectItem value="33_38">33–38%</SelectItem>
                          <SelectItem value="38_45">38–45%</SelectItem>
                          <SelectItem value="45plus">45%+</SelectItem>
                          <SelectItem value="unknown">Not sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Labor cost % (pick one)</Label>
                      <Select value={laborCost} onValueChange={(v) => setLaborCost(v as PercentBand)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select labor cost" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lt28">{"< 28%"}</SelectItem>
                          <SelectItem value="28_33">28–33%</SelectItem>
                          <SelectItem value="33_38">33–38%</SelectItem>
                          <SelectItem value="38_45">38–45%</SelectItem>
                          <SelectItem value="45plus">45%+</SelectItem>
                          <SelectItem value="unknown">Not sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Online bookings</Label>
                      <Select value={bookings} onValueChange={(v) => setBookings(v as Strength)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select strength" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="strong">Strong</SelectItem>
                          <SelectItem value="ok">Okay</SelectItem>
                          <SelectItem value="weak">Weak</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Systems (SOPs, costing, rhythm)</Label>
                      <Select value={systems} onValueChange={(v) => setSystems(v as Strength)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select strength" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="strong">Strong</SelectItem>
                          <SelectItem value="ok">Okay</SelectItem>
                          <SelectItem value="weak">Weak / not documented</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Signals */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <Label className="text-base font-semibold">
                        Pick up to 3 signals
                      </Label>
                      <Badge className="rounded-full">
                        {selectedCount}/3 selected
                      </Badge>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {SIGNALS.map((s) => {
                        const checked = signals.includes(s.id);
                        const disabled = !checked && signals.length >= 3;
                        return (
                          <button
                            type="button"
                            key={s.id}
                            onClick={() => !disabled && toggleSignal(s.id)}
                            className={cn(
                              "text-left rounded-2xl border border-border bg-background/40 p-4 transition-colors",
                              checked && "border-primary/60 bg-primary/10",
                              disabled && "opacity-50 cursor-not-allowed"
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <Checkbox
                                checked={checked}
                                onCheckedChange={() => !disabled && toggleSignal(s.id)}
                                className="mt-0.5"
                              />
                              <div className="text-sm font-medium leading-relaxed">
                                {s.label}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      <ShieldCheck className="inline-block h-4 w-4 mr-1 -mt-0.5" />
                      You’ll see an instant snapshot on the right. I’ll reply by email after you submit.
                    </p>
                  </div>

                  {/* Optional */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website (optional)</Label>
                      <Input
                        id="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram (optional)</Label>
                      <Input
                        id="instagram"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="@handle"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Anything else I should know? (optional)</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Example: biggest constraint, what you tried, team size, concept..."
                      className="min-h-[110px]"
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <Button type="submit" size="lg" className="w-full font-semibold">
                      Send & get diagnosed <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="mt-3 text-xs text-muted-foreground text-center">
                      Rule-based preview (no AI on-page). Your reply is written by me.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* RIGHT: Desktop “Likely steps” */}
            <div className="hidden lg:block sticky top-24">
              <Card className="border-border bg-background/40">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="font-headline text-2xl">
                      Likely first steps (quick plan)
                    </CardTitle>
                    <Sparkles className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <Badge className="w-fit rounded-full">{plan.tag}</Badge>

                  <p className="text-sm text-muted-foreground">
                    {plan.urgencyLine}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    {plan.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>

                  <div className="rounded-2xl border border-border bg-card/40 p-4">
                    <p className="text-xs text-muted-foreground">
                      This is rule-based (no AI on the site). You’ll get a tailored reply after submission.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link
                      href="/contact"
                      className={cn(buttonVariants({ size: "lg" }), "font-semibold w-full")}
                    >
                      Book the Free Call
                    </Link>
                    <Link
                      href="/services/consulting"
                      className={cn(
                        buttonVariants({ size: "lg", variant: "outline" }),
                        "font-semibold w-full"
                      )}
                    >
                      See how I work
                    </Link>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Prefer DM? Message “SCAN” on Instagram and I’ll send 3 quick wins.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="relative border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-14 md:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Want me to look at it with you?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Book a free 15-minute call. If I can help, I’ll tell you exactly what I’d fix first.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
              >
                Book the Free Call
              </Link>
              <Button
                type="button"
                size="lg"
                variant="secondary"
                className="font-semibold"
                onClick={scrollToForm}
              >
                Fill the Diagnosis Form
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
