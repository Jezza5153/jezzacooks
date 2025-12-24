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
import { ArrowRight, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Band = "28_33" | "33_38" | "38_45" | "unknown";
type Pain = "margins" | "systems" | "bookings";

const SIGNALS = [
  { id: "cashflow", label: "Cashflow stress (always tight)" },
  { id: "food_drift", label: "Food cost drifting / no portion control" },
  { id: "labor_high", label: "Labor too high / rosters feel random" },
  { id: "menu_chaos", label: "Menu too big / prep is chaos" },
  { id: "direct_low", label: "Not enough direct bookings" },
  { id: "training_weak", label: "High turnover / training weak" },
] as const;

const mid: Record<Band, number> = {
  "28_33": 30.5,
  "33_38": 35.5,
  "38_45": 41.5,
  unknown: 34,
};

const bandLabel: Record<Band, string> = {
  "28_33": "28–33%",
  "33_38": "33–38%",
  "38_45": "38–45%",
  unknown: "Not sure",
};

function planFrom(input: { food: Band; labor: Band; pain: Pain; signals: string[] }) {
  const prime = Math.round((mid[input.food] + mid[input.labor]) * 10) / 10;
  const tag = `Prime cost ≈ ${prime}%`;

  const hasMoney =
    input.pain === "margins" ||
    input.signals.includes("cashflow") ||
    input.signals.includes("food_drift") ||
    input.signals.includes("labor_high");

  const hasOps =
    input.pain === "systems" ||
    input.signals.includes("menu_chaos") ||
    input.signals.includes("training_weak");

  const hasBookings = input.pain === "bookings" || input.signals.includes("direct_low");

  const steps: string[] = [];
  steps.push("Step 1: Identify your top 5 sellers + margins (quick menu mix).");

  if (hasMoney) steps.push("Step 2: Tighten portions + 7-day waste log (2 items only).");
  else if (hasOps) steps.push("Step 2: Tighten prep map + station ownership for service.");
  else steps.push("Step 2: Set 1 weekly KPI rhythm (sales, food%, labor%).");

  if (hasBookings) steps.push("Step 3: One clear ‘Book Now’ CTA above the fold + hours/location everywhere.");
  else steps.push("Step 3: Set 1 weekly KPI rhythm (sales, food%, labor%).");

  return { tag, steps: steps.slice(0, 3), primeCostApprox: prime };
}

function NativeSelect(props: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const { id, value, onChange, options } = props;
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm",
        "ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50"
      )}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export default function FreeDiagnosisPage() {
  const { toast } = useToast();

  // Contact
  const [name, setName] = React.useState("");
  const [businessName, setBusinessName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [email, setEmail] = React.useState("");

  // Small + focused inputs
  const [pain, setPain] = React.useState<Pain>("margins");
  const [food, setFood] = React.useState<Band>("33_38");
  const [labor, setLabor] = React.useState<Band>("33_38");
  const [signals, setSignals] = React.useState<string[]>([]);

  const quickPlan = React.useMemo(() => planFrom({ food, labor, pain, signals }), [food, labor, pain, signals]);

  function toggleSignal(id: string) {
    setSignals((prev) => {
      const has = prev.includes(id);
      if (has) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  const onSubmit = React.useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !businessName.trim() || !city.trim() || !email.trim()) {
      toast({
        title: "Missing info",
        description: "Please fill: name, business name, city, email.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      name,
      businessName,
      city,
      email,
      biggestPain:
        pain === "margins" ? "Margins / cash" : pain === "systems" ? "Systems / chaos" : "Bookings",
      foodCost: bandLabel[food],
      laborCost: bandLabel[labor],
      primeCostApprox: quickPlan.primeCostApprox,
      signals,
      snapshot: { tag: quickPlan.tag, steps: quickPlan.steps },
      nextStep: "Free 15-min diagnosis",
    };

    try {
      const res = await fetch("/api/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || "Request failed");
      }

      toast({ title: "Sent ✅", description: "Got it — I’ll reply by email." });

      // optional: clear form
      setName("");
      setBusinessName("");
      setCity("");
      setEmail("");
      setSignals([]);
    } catch (err: any) {
      toast({
        title: "Couldn’t send",
        description: err?.message || "Please try again in a minute.",
        variant: "destructive",
      });
    }
  }, [name, businessName, city, email, pain, food, labor, signals, quickPlan, toast]);


  const signalsFull = signals.length >= 3;

  return (
    <div className="relative">
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/10 to-transparent" />

      {/* HERO */}
      <section className="relative border-b border-border">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap gap-2 items-center">
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
              Free diagnosis{" "}
              <span className="text-muted-foreground">(so you feel safe before spending a euro)</span>
            </h1>

            <p className="mt-4 text-base md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Tell me what’s happening. You’ll instantly see a likely first step plan. I’ll reply personally by email.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="#form" className={cn(buttonVariants({ size: "lg" }), "font-semibold")}>
                Start the quick form
              </Link>
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold")}
              >
                Book the call instead
              </Link>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Prefer DM? Message “SCAN” on Instagram @chefjezz and I’ll send 3 quick wins.
            </p>
          </div>
        </div>
      </section>

      {/* FORM + SNAPSHOT */}
      <section id="form" className="relative">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            {/* FORM */}
            <Card className="border-border bg-card/50">
              <CardHeader>
                <CardTitle className="font-headline text-3xl md:text-4xl">2 minutes. I reply fast.</CardTitle>
                <p className="mt-2 text-muted-foreground">Pick a few answers → get your “likely first steps” instantly.</p>
              </CardHeader>

              <CardContent>
                <form onSubmit={onSubmit} className="space-y-8">
                  {/* Basics */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your name *</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="biz">Business name *</Label>
                      <Input
                        id="biz"
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

                  {/* Selectors (native select, stable) */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="pain">Biggest pain</Label>
                      <NativeSelect
                        id="pain"
                        value={pain}
                        onChange={(v) => setPain(v as Pain)}
                        options={[
                          { value: "margins", label: "Margins / cash" },
                          { value: "systems", label: "Systems / chaos" },
                          { value: "bookings", label: "Bookings" },
                        ]}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="food">Food cost %</Label>
                      <NativeSelect
                        id="food"
                        value={food}
                        onChange={(v) => setFood(v as Band)}
                        options={[
                          { value: "28_33", label: "28–33%" },
                          { value: "33_38", label: "33–38%" },
                          { value: "38_45", label: "38–45%" },
                          { value: "unknown", label: "Not sure" },
                        ]}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="labor">Labor cost %</Label>
                      <NativeSelect
                        id="labor"
                        value={labor}
                        onChange={(v) => setLabor(v as Band)}
                        options={[
                          { value: "28_33", label: "28–33%" },
                          { value: "33_38", label: "33–38%" },
                          { value: "38_45", label: "38–45%" },
                          { value: "unknown", label: "Not sure" },
                        ]}
                      />
                    </div>
                  </div>

                  {/* Signals */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                            <Label className="text-base font-semibold">Pick up to 3 signals</Label>
                            <Badge className="rounded-full">{signals.length}/3</Badge>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {SIGNALS.map((s) => {
                            const checked = signals.includes(s.id);
                            const disabled = !checked && signals.length >= 3;

                            return (
                                <div
                                key={s.id}
                                role="button"
                                tabIndex={0}
                                aria-disabled={disabled}
                                onClick={() => !disabled && toggleSignal(s.id)}
                                onKeyDown={(e) => {
                                    if (disabled) return;
                                    if (e.key === "Enter" || e.key === " ") toggleSignal(s.id);
                                }}
                                className={cn(
                                    "rounded-2xl border border-border bg-background/40 p-4 text-left transition-colors select-none",
                                    "focus:outline-none focus:ring-2 focus:ring-primary/40",
                                    checked && "border-primary/60 bg-primary/10",
                                    disabled && "opacity-50 cursor-not-allowed"
                                )}
                                >
                                <div className="flex items-start gap-3">
                                    <Checkbox
                                    checked={checked}
                                    onCheckedChange={() => !disabled && toggleSignal(s.id)}
                                    // prevent double toggle from bubbling to parent
                                    onClick={(e) => e.stopPropagation()}
                                    className="mt-0.5"
                                    />
                                    <div className="text-sm font-medium leading-relaxed">{s.label}</div>
                                </div>
                                </div>
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

            {/* SNAPSHOT */}
            <div className="lg:sticky lg:top-24">
              <Card className="border-border bg-background/40">
                <CardHeader className="space-y-3">
                  <CardTitle className="font-headline text-2xl">Likely first steps (quick plan)</CardTitle>
                  <Badge className="w-fit rounded-full">{quickPlan.tag}</Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    {quickPlan.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>

                  <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "w-full font-semibold")}>
                    Book the free call
                  </Link>

                  <p className="text-xs text-muted-foreground">
                    Prefer DM? Message “SCAN” on Instagram @chefjezz and I’ll send 3 quick wins.
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
