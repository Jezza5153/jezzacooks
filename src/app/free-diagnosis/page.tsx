
// src/app/free-diagnosis/page.tsx
"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ChevronDown, Clock, Mail, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Option = { value: string; label: string };

const STAGE: Option[] = [
  { value: "open_struggling", label: "Open, but struggling" },
  { value: "open_stable", label: "Open & stable" },
  { value: "opening_soon", label: "Opening soon" },
  { value: "planning", label: "Idea / planning" },
];

const PAIN: Option[] = [
  { value: "chaos", label: "Too much chaos / no overview" },
  { value: "margins", label: "Margins / cashflow pressure" },
  { value: "bookings", label: "Not enough direct bookings" },
  { value: "team", label: "Team issues / consistency" },
];

const URGENCY: Option[] = [
  { value: "now", label: "I need clarity within 1–2 weeks" },
  { value: "2_4w", label: "I need clarity within 2–4 weeks" },
  { value: "1_2m", label: "Within 1–2 months" },
  { value: "later", label: "Later / not urgent" },
];

const REVENUE: Option[] = [
    { value: "<25k", label: "< €25k / month" },
    { value: "25_50k", label: "€25k–€50k / month" },
    { value: "50_100k", label: "€50k–€100k / month" },
    { value: "100k_plus", label: "€100k+ / month" },
    { value: "unknown", label: "Not sure" },
];
  

const COST: Option[] = [
  { value: "under_28", label: "Under 28%" },
  { value: "28_33", label: "28–33%" },
  { value: "33_38", label: "33–38%" },
  { value: "38_45", label: "38–45%" },
  { value: "45_plus", label: "45%+" },
  { value: "unknown", label: "Not sure" },
];

const BOOKINGS: Option[] = [
  { value: "strong", label: "Bookings are strong" },
  { value: "ok", label: "Bookings are okay" },
  { value: "weak", label: "Bookings are weak" },
  { value: "unknown", label: "Not sure" },
];

const SYSTEMS: Option[] = [
  { value: "strong", label: "Systems & routines are solid" },
  { value: "ok", label: "Okay, but not documented" },
  { value: "weak", label: "Weak / inconsistent" },
  { value: "none", label: "No real systems yet" },
];

const SIGNALS = [
    { id: "cashflow", label: "Cashflow stress (always tight)" },
    { id: "food_drift", label: "Food cost drifting / portion control weak" },
    { id: "labor_high", label: "Labor too high / rosters feel random" },
    { id: "menu_chaos", label: "Menu too big / prep is chaos" },
    { id: "team_turnover", label: "High turnover / training weak" },
    { id: "owner_burnout", label: "Owner doing 60–80h (no control)" },
    { id: "reviews_flat", label: "Reviews not improving / experience uneven" },
    { id: "direct_low", label: "Not enough direct bookings" },
  ] as const;

const midMap: Record<string, number> = {
  under_28: 26,
  "28_33": 30.5,
  "33_38": 35.5,
  "38_45": 41.5,
  "45_plus": 47.5,
  unknown: 34,
};

function CardShell(props: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "warm";
}) {
  const { children, className, tone = "default" } = props;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl",
        "border border-border/70 bg-card/35",
        "shadow-[0_24px_80px_rgba(0,0,0,0.45)]",
        "backdrop-blur-md",
        // layered "material" edges
        "ring-1 ring-white/5",
        // subtle top highlight
        "before:pointer-events-none before:absolute before:inset-0",
        "before:bg-[radial-gradient(1200px_400px_at_50%_-10%,rgba(255,255,255,0.10),transparent_60%)]",
        tone === "warm" &&
          "after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(700px_300px_at_20%_0%,hsla(var(--primary)/0.18),transparent_60%)]",
        className
      )}
    >
      <div className="relative p-6 sm:p-8">{children}</div>
    </div>
  );
}

function FieldLabel(props: { n?: string; label: string; required?: boolean }) {
  const { n, label, required } = props;
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <div className="flex items-center gap-3">
        {n ? (
          <div
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full",
              "border border-border/70 bg-background/30",
              "text-xs text-muted-foreground"
            )}
          >
            {n}
          </div>
        ) : null}
        <div className="text-sm font-medium text-foreground">
          {label} {required ? <span className="text-muted-foreground">*</span> : null}
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-border/70 bg-background/35 px-4 py-3 text-sm text-foreground " +
  "placeholder:text-muted-foreground/70 " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] " +
  "transition " +
  "hover:border-border/90 hover:bg-background/45 " +
  "focus:outline-none focus:ring-2 focus:ring-[hsla(var(--primary)/0.35)] focus:border-[hsla(var(--primary)/0.55)]";

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return <input className={cn(inputClass, className)} {...rest} />;
}

function SelectField(props: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
}) {
  const { name, value, onChange, options } = props;
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          inputClass,
          "appearance-none pr-10",
          "cursor-pointer"
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/80" />
    </div>
  );
}

export default function FreeDiagnosisPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Basics
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");

  // 8 blocks
  const [stage, setStage] = useState("open_struggling");
  const [biggestPain, setBiggestPain] = useState("chaos");
  const [urgency, setUrgency] = useState("2_4w");
  const [revenue, setRevenue] = useState("25_50k");
  const [foodCost, setFoodCost] = useState("33_38");
  const [laborCost, setLaborCost] = useState("33_38");
  const [onlineBookings, setOnlineBookings] = useState("ok");
  const [systems, setSystems] = useState("ok");

  // signals (max 3)
  const [signals, setSignals] = useState<string[]>([]);
  
  const toggleSignal = useCallback((id: string) => {
    setSignals((prev) => {
      const has = prev.includes(id);
      if (has) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, id];
    });
  }, []);


  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    if (!name.trim() || !businessName.trim() || !city.trim() || !email.trim()) {
      toast({
        title: "Missing info",
        description: "Please fill in: name, business name, city, email.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const primeCostApprox = Math.round((midMap[foodCost] + midMap[laborCost]) * 10) / 10;
    
    // Calculate snapshot inside the submit handler
    const steps: string[] = [];
    if (primeCostApprox >= 75) {
      steps.push("Step 1: Portion specs + top-10 dish costing this week.");
      steps.push("Step 2: Fix roster to covers (remove dead hours).");
      steps.push("Step 3: Cut/trim 2–3 menu items that cause prep chaos.");
    } else if (primeCostApprox >= 68) {
      steps.push("Step 1: Identify your top 5 sellers + margins (quick menu mix).");
      steps.push("Step 2: Tighten prep map + station ownership for service.");
      steps.push("Step 3: Set 1 weekly KPI rhythm (sales, food%, labor%).");
    } else {
      steps.push("Step 1: Standardize SOPs (opening/closing + 10 core recipes).");
      steps.push("Step 2: Improve direct bookings funnel (CTA, menu clarity, trust).");
      steps.push("Step 3: Weekly rhythm + continuous menu iteration.");
    }
    const snapshot = {
      tag: primeCostApprox >= 68 ? "High Prime Cost" : "Systems Focus",
      steps: steps.slice(0, 4)
    };

    try {
      const payload = {
        name,
        businessName,
        city,
        email,
        website: website?.trim() || "",
        instagram: instagram?.trim() || "",
        stage,
        biggestPain,
        urgency,
        revenue,
        foodCost,
        laborCost,
        primeCostApprox: Math.round(primeCostApprox),
        onlineBookings,
        systems,
        signals,
        nextStep: "quick_scan",
        snapshot,
      };

      const res = await fetch("/api/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      toast({
        title: "Sent ✅",
        description: "Got it — I’ll reply personally by email.",
      });

      // reset
      setName("");
      setBusinessName("");
      setCity("");
      setEmail("");
      setWebsite("");
      setInstagram("");
      setSignals([]);
    } catch {
      toast({
        title: "Error",
        description: "Could not send. Try again in a minute.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [
    loading, name, businessName, city, email, toast,
    website, instagram, stage, biggestPain, urgency, revenue, foodCost,
    laborCost, onlineBookings, systems, signals
  ]);

  const primeCostApprox = Math.round((midMap[foodCost] + midMap[laborCost]) * 10) / 10;

  return (
    <div className="relative">
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/10 to-transparent" />

      {/* HERO */}
      <section className="relative border-b border-border/60">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="rounded-full px-3 py-1">
                Free
              </Badge>
              <Badge className="rounded-full px-3 py-1">15-min Diagnosis</Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1">
                No hard sell
              </Badge>

              <span className="ml-auto hidden sm:flex items-center gap-2 rounded-full border border-border/70 bg-background/30 px-3 py-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" /> ~2 min
              </span>
            </div>

            <h1 className="mt-6 font-headline text-4xl md:text-6xl font-bold tracking-tight">
              Free diagnosis call{" "}
              <span className="text-muted-foreground">(so you feel safe before spending a euro)</span>
            </h1>

            <p className="mt-4 max-w-3xl text-base md:text-xl text-muted-foreground leading-relaxed">
              You fill in what’s going on. I receive it as an email and reply personally with the first fixes I’d make.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#diagnosis"
                className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
              >
                Fill the quick form <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "font-semibold"
                )}
              >
                Book the call instead
              </Link>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Prefer DM? Message “SCAN” on Instagram @chefjezz.
            </p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="diagnosis" className="relative">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
            <form onSubmit={onSubmit} className="space-y-10">
              {/* Block 1: Context */}
              <CardShell tone="warm">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="font-headline text-2xl md:text-3xl font-bold">
                      A bit of context
                    </h2>
                    <p className="mt-2 text-sm md:text-base text-muted-foreground">
                      No need to write essays — this just helps me understand who I’m talking to.
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 rounded-full border border-border/70 bg-background/25 px-3 py-1.5 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    Goes straight to my inbox
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <FieldLabel label="Your name" required />
                    <TextInput
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div>
                    <FieldLabel label="Business name" required />
                    <TextInput
                      name="businessName"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Business name"
                      required
                    />
                  </div>

                  <div>
                    <FieldLabel label="City" required />
                    <TextInput
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      required
                    />
                  </div>

                  <div>
                    <FieldLabel label="Email" required />
                    <TextInput
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div>
                    <FieldLabel label="Website" />
                    <TextInput
                      name="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https:// (optional)"
                    />
                  </div>

                  <div>
                    <FieldLabel label="Instagram" />
                    <TextInput
                      name="instagram"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="@handle (optional)"
                    />
                  </div>
                </div>
              </CardShell>

              {/* Middle title */}
              <div className="px-1">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">
                  What’s actually going on
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Pick what feels closest. Precision is not required.
                </p>
              </div>

              {/* 8 blocks */}
              <CardShell className="p-0">
                <div className="grid gap-5 md:gap-6">
                  <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <FieldLabel n="1" label="Stage" required />
                      <SelectField
                        name="stage"
                        value={stage}
                        onChange={setStage}
                        options={STAGE}
                      />
                    </div>

                    <div>
                      <FieldLabel n="2" label="Biggest pain" required />
                      <SelectField
                        name="biggestPain"
                        value={biggestPain}
                        onChange={setBiggestPain}
                        options={PAIN}
                      />
                    </div>

                    <div>
                      <FieldLabel n="3" label="Urgency" required />
                      <SelectField
                        name="urgency"
                        value={urgency}
                        onChange={setUrgency}
                        options={URGENCY}
                      />
                    </div>

                    <div>
                      <FieldLabel n="4" label="Monthly revenue" />
                      <SelectField
                        name="revenue"
                        value={revenue}
                        onChange={setRevenue}
                        options={REVENUE}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <FieldLabel n="5" label="Food cost %" />
                      <SelectField
                        name="foodCost"
                        value={foodCost}
                        onChange={setFoodCost}
                        options={COST}
                      />
                    </div>

                    <div>
                      <FieldLabel n="6" label="Labour cost %" />
                      <SelectField
                        name="laborCost"
                        value={laborCost}
                        onChange={setLaborCost}
                        options={COST}
                      />
                    </div>

                    <div>
                      <FieldLabel n="7" label="Bookings" />
                      <SelectField
                        name="onlineBookings"
                        value={onlineBookings}
                        onChange={setOnlineBookings}
                        options={BOOKINGS}
                      />
                    </div>

                    <div>
                      <FieldLabel n="8" label="Systems & routines" />
                      <SelectField
                        name="systems"
                        value={systems}
                        onChange={setSystems}
                        options={SYSTEMS}
                      />
                    </div>
                  </div>

                  {/* hidden prime cost for your email template */}
                  <input type="hidden" name="primeCostApprox" value={String(primeCostApprox)} />
                </div>
              </CardShell>

              <CardShell>
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
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                toggleSignal(s.id);
                            }
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
                              disabled={disabled}
                              // prevent double toggle from bubbling to parent
                              onClick={(e) => e.stopPropagation()}
                              onCheckedChange={(v) => {
                                const next = v === true;
                                if (next && !checked) {
                                  toggleSignal(s.id);
                                } else if (!next && checked) {
                                  toggleSignal(s.id);
                                }
                              }}
                              className="mt-0.5"
                            />
                            <div className="text-sm font-medium leading-relaxed">{s.label}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardShell>

              <CardShell>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-muted-foreground">
                    No auto-diagnosis on the site. I read this and reply personally.
                  </div>

                  <input type="hidden" name="nextStep" value="quick_scan" />

                  <Button
                    type="submit"
                    size="lg"
                    className={cn(
                      "w-full sm:w-auto font-semibold rounded-2xl",
                      "shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
                    )}
                    disabled={loading}
                  >
                    {loading ? "Sending…" : "Send & get a personal reply"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardShell>

              {/* tiny reassurance line (mobile) */}
              <div className="lg:hidden">
                <CardShell className="py-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Privacy & zero spam</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        Your answers go to my inbox only. No mailing list. No bots.
                      </div>
                    </div>
                  </div>
                </CardShell>
              </div>
            </form>

            {/* Sticky side: signature + reassurance */}
            <aside className="hidden lg:block lg:sticky lg:top-24">
              <CardShell className="space-y-5">
                <div>
                  <h3 className="font-headline text-2xl font-bold">What happens next</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You submit this. I read it. I reply with the first fixes I’d make — simple, practical, and specific.
                  </p>
                </div>

                <div className="grid gap-3 text-sm">
                  <div className="rounded-2xl border border-border/70 bg-background/25 p-4">
                    <div className="flex items-center gap-2 font-medium">
                      <Clock className="h-4 w-4 text-primary" />
                      Fast turnaround
                    </div>
                    <div className="mt-1 text-muted-foreground">
                      Usually same day or within 24 hours.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-background/25 p-4">
                    <div className="flex items-center gap-2 font-medium">
                      <Mail className="h-4 w-4 text-primary" />
                      Email, not automation
                    </div>
                    <div className="mt-1 text-muted-foreground">
                      No auto reply, no “AI diagnosis” — just me.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-background/25 p-4">
                    <div className="flex items-center gap-2 font-medium">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Privacy
                    </div>
                    <div className="mt-1 text-muted-foreground">
                      Not added to a list. No spam. Ever.
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({ size: "lg", variant: "outline" }),
                      "w-full font-semibold rounded-2xl"
                    )}
                  >
                    Prefer a call? Book here
                  </Link>
                  <p className="mt-3 text-xs text-muted-foreground">
                    If it’s urgent, add a note in the email subject when you book.
                  </p>
                </div>
              </CardShell>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
