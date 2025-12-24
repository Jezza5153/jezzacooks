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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Stage = "open" | "opening_soon" | "idea";
type Pain = "margins" | "systems" | "bookings";
type Band = "28_33" | "33_38" | "38_45" | "unknown";

const SIGNALS = [
  { id: "cashflow", label: "Cashflow stress (always tight)" },
  { id: "food_drift", label: "Food cost drifting / no portion control" },
  { id: "labor_high", label: "Labor too high / rosters feel random" },
  { id: "menu_chaos", label: "Menu too big / prep is chaos" },
  { id: "direct_low", label: "Not enough direct bookings" },
  { id: "training_weak", label: "High turnover / training weak" },
] as const;

const mid: Record<Band, number> = {
  28_33: 30.5,
  33_38: 35.5,
  38_45: 41.5,
  unknown: 34,
};

function planFrom(input: {
  food: Band;
  labor: Band;
  pain: Pain;
  signals: string[];
}) {
  const prime = Math.round((mid[input.food] + mid[input.labor]) * 10) / 10;
  const tag = `Prime cost ≈ ${prime}%`;

  const steps: string[] = [];

  // Step 1 is always diagnostic + menu mix because it's fast and universal
  steps.push("Step 1: Identify your top 5 sellers + margins (quick menu mix).");

  // If they selected typical chaos signals, push structure next
  const hasOps =
    input.signals.includes("menu_chaos") ||
    input.signals.includes("training_weak") ||
    input.pain === "systems";

  const hasMoney =
    input.signals.includes("cashflow") ||
    input.signals.includes("food_drift") ||
    input.signals.includes("labor_high") ||
    input.pain === "margins";

  const hasBookings =
    input.signals.includes("direct_low") || input.pain === "bookings";

  if (hasMoney) {
    steps.push("Step 2: Tighten portions + 7-day waste log (2 items only).");
  } else if (hasOps) {
    steps.push("Step 2: Tighten prep map + station ownership for service.");
  } else {
    steps.push("Step 2: Set 1 weekly KPI rhythm (sales, food%, labor%).");
  }

  if (hasBookings) {
    steps.push("Step 3: One clear ‘Book Now’ CTA above the fold + hours/location everywhere.");
  } else {
    steps.push("Step 3: Set 1 weekly KPI rhythm (sales, food%, labor%).");
  }

  return { tag, steps: steps.slice(0, 3) };
}

export default function FreeDiagnosisPage() {
  const { toast } = useToast();

  // Contact
  const [name, setName] = React.useState("");
  const [business, setBusiness] = React.useState("");
  const [city, setCity] = React.useState("");
  const [email, setEmail] = React.useState("");

  // Inputs
  const [stage, setStage] = React.useState<Stage>("open");
  const [pain, setPain] = React.useState<Pain>("margins");
  const [food, setFood] = React.useState<Band>("33_38");
  const [labor, setLabor] = React.useState<Band>("33_38");
  const [signals, setSignals] = React.useState<string[]>([]);

  const quickPlan = React.useMemo(
    () => planFrom({ food, labor, pain, signals }),
    [food, labor, pain, signals]
  );

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

    if (!name.trim() || !business.trim() || !city.trim() || !email.trim()) {
      toast({
        title: "Missing info",
        description: "Please fill: name, business name, city, email.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      name,
      business,
      city,
      email,
      stage,
      pain,
      food,
      labor,
      signals,
      quickPlan,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/free-diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("api");

      toast({ title: "Sent ✅", description: "Got it — I’ll reply by email." });
    } catch {
      // Safe fallback so you never lose leads while wiring backend
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      toast({
        title: "Saved",
        description: "Copied to clipboard (API not connected yet).",
      });
    }
  }

  return (
    <div className="relative">
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/10 to-transparent" />

      {/* HERO */}
      <section className="relative border-b border-border">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="rounded-full px-3 py-1">
                Free
              </Badge>
              <Badge className="rounded-full px-3 py-1">15-min Diagnosis</Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1">
                No hard sell
              </Badge>
              <span className="ml-auto hidden sm:flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" /> ~2 min
              </span>
            </div>

            <h1 className="mt-6 font-headline text-4xl md:text-6xl font-bold tracking-tight">
              Free diagnosis call{" "}
              <span className="text-muted-foreground">
                (so you feel safe before spending a euro)
              </span>
            </h1>

            <p className="mt-4 text-base md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Tell me what’s happening (margins, chaos, systems, bookings). I’ll
              give you 1–2 quick wins and the simplest next step.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
              >
                Book the free call
              </Link>
              <a
                href="#diagnosis-form"
                className={cn(
                  buttonVariants({ size: "lg", variant: "secondary" }),
                  "font-semibold"
                )}
              >
                Fill the form
              </a>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Prefer DM? Message “SCAN” on Instagram and I’ll send 3 quick wins.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section id="diagnosis-form" className="relative">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            {/* FORM */}
            <Card className="border-border bg-card/50">
              <CardHeader>
                <CardTitle className="font-headline text-3xl md:text-4xl">
                  2 minutes. I reply fast.
                </CardTitle>
                <p className="mt-2 text-muted-foreground">
                  Pick answers → see a “likely first steps” snapshot instantly.
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={onSubmit} className="space-y-8">
                  {/* Basics */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your name *</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="biz">Business name *</Label>
                      <Input
                        id="biz"
                        value={business}
                        onChange={(e) => setBusiness(e.target.value)}
                        placeholder="Restaurant / cafe / hotel"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                      />
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

                  {/* Key selectors */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Stage</Label>
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
                      <Label>Biggest pain</Label>
                      <Select value={pain} onValueChange={(v) => setPain(v as Pain)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pain" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="margins">Margins / cash</SelectItem>
                          <SelectItem value="systems">Systems / chaos</SelectItem>
                          <SelectItem value="bookings">Bookings</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Food cost %</Label>
                      <Select value={food} onValueChange={(v) => setFood(v as Band)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pick one" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="28_33">28–33%</SelectItem>
                          <SelectItem value="33_38">33–38%</SelectItem>
                          <SelectItem value="38_45">38–45%</SelectItem>
                          <SelectItem value="unknown">Not sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Labor cost %</Label>
                      <Select value={labor} onValueChange={(v) => setLabor(v as Band)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pick one" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="28_33">28–33%</SelectItem>
                          <SelectItem value="33_38">33–38%</SelectItem>
                          <SelectItem value="38_45">38–45%</SelectItem>
                          <SelectItem value="unknown">Not sure</SelectItem>
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
                      <Badge className="rounded-full">{signals.length}/3</Badge>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {SIGNALS.map((s) => {
                        const checked = signals.includes(s.id);
                        const disabled = !checked && signals.length >= 3;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => !disabled && toggleSignal(s.id)}
                            className={cn(
                              "rounded-2xl border border-border bg-background/40 p-4 text-left transition-colors",
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
                  </div>

                  <Button type="submit" size="lg" className="w-full font-semibold">
                    Send & get diagnosed <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Instant snapshot is rule-based (no AI on the site). I reply personally by email.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* QUICK PLAN */}
            <div className="lg:sticky lg:top-24">
              <Card className="border-border bg-background/40">
                <CardHeader className="space-y-3">
                  <CardTitle className="font-headline text-2xl">
                    Likely first steps (quick plan)
                  </CardTitle>
                  <Badge className="w-fit rounded-full">{quickPlan.tag}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    {quickPlan.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "w-full font-semibold"
                    )}
                  >
                    Book the free call
                  </Link>

                  <p className="text-xs text-muted-foreground">
                    Prefer DM? Message “SCAN” on Instagram and I’ll send 3 quick wins.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
