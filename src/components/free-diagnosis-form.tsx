// components/free-diagnosis-form.tsx
"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Stage = "starting" | "open" | "struggling" | "scaling";
type BiggestPain = "margins" | "chaos" | "bookings" | "team" | "menu";
type Urgency = "asap" | "2-4w" | "1-3m";
type Revenue = "<10k" | "10-25k" | "25-50k" | "50-100k" | "100k+";
type FoodCost = "<28" | "28-32" | "33-38" | "39+";
type LaborCost = "<28" | "28-32" | "33-38" | "39+";
type OnlineBookings = "strong" | "ok" | "weak" | "none";
type Systems = "strong" | "ok" | "weak";
type NextStep = "free_call" | "quick_scan" | "day_rate" | "retainer" | "not_sure";

type FormState = {
  // minimal identity
  name: string;
  businessName: string;
  city: string;
  email: string;

  // multiple choice diagnosis
  stage: Stage;
  biggestPain: BiggestPain;
  urgency: Urgency;

  revenue: Revenue;
  foodCost: FoodCost;
  laborCost: LaborCost;

  onlineBookings: OnlineBookings;
  systems: Systems;

  // choose max 3
  signals: string[];

  nextStep: NextStep;

  // optional (still multiple choice-ish)
  website: string;
  instagram: string;
};

const SIGNALS = [
  { id: "cashflow", label: "Cashflow stress (always tight)" },
  { id: "food_drift", label: "Food cost drifting / no portion control" },
  { id: "labor_high", label: "Labor too high / rosters feel random" },
  { id: "menu_big", label: "Menu too big / prep is chaos" },
  { id: "inconsistent", label: "Quality/service inconsistent" },
  { id: "owner_burnout", label: "Owner working 60–80h (no control)" },
  { id: "weak_reviews", label: "Google reviews not helping" },
  { id: "no_direct", label: "Not enough direct bookings" },
  { id: "team_turnover", label: "High staff turnover / training weak" },
];

const initialState: FormState = {
  name: "",
  businessName: "",
  city: "",
  email: "",

  stage: "open",
  biggestPain: "margins",
  urgency: "2-4w",

  revenue: "25-50k",
  foodCost: "33-38",
  laborCost: "33-38",

  onlineBookings: "weak",
  systems: "weak",

  signals: [],
  nextStep: "free_call",

  website: "",
  instagram: "",
};

function scoreBandToMid(band: FoodCost | LaborCost) {
  switch (band) {
    case "<28":
      return 27;
    case "28-32":
      return 30;
    case "33-38":
      return 36;
    case "39+":
      return 41;
    default:
      return 36;
  }
}

export default function FreeDiagnosisForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>("");

  const primeCost = useMemo(() => {
    const food = scoreBandToMid(form.foodCost);
    const labor = scoreBandToMid(form.laborCost);
    return food + labor; // rough midpoint sum
  }, [form.foodCost, form.laborCost]);

  const snapshot = useMemo(() => {
    const steps: string[] = [];
    const risks: string[] = [];

    // Prime cost heuristic
    if (primeCost >= 75) {
      risks.push("Prime cost looks CRITICAL (likely >75%).");
      steps.push("Step 1: Portion specs + top-10 dish costing this week.");
      steps.push("Step 2: Fix roster to covers (remove dead hours).");
      steps.push("Step 3: Cut/trim 2–3 menu items that cause prep chaos.");
    } else if (primeCost >= 68) {
      risks.push("Prime cost looks HIGH (likely 68–75%).");
      steps.push("Step 1: Identify your top 5 sellers + margins (quick menu mix).");
      steps.push("Step 2: Tighten prep map + station ownership for service.");
      steps.push("Step 3: Set 1 weekly KPI rhythm (sales, food%, labor%).");
    } else {
      risks.push("Prime cost looks workable — focus on scaling systems.");
      steps.push("Step 1: Standardize SOPs (opening/closing + 10 core recipes).");
      steps.push("Step 2: Improve direct bookings funnel (CTA, menu clarity, trust).");
      steps.push("Step 3: Weekly rhythm + continuous menu iteration.");
    }

    // Overlay biggest pain
    if (form.biggestPain === "bookings") {
      steps.unshift("Fast win: Google Business Profile + booking CTA visible everywhere.");
    }
    if (form.biggestPain === "chaos") {
      steps.unshift("Fast win: Define roles + prep cut-off time before service.");
    }
    if (form.biggestPain === "menu") {
      steps.unshift("Fast win: Reduce menu complexity + rewrite descriptions for clarity.");
    }
    if (form.biggestPain === "team") {
      steps.unshift("Fast win: 1-page training standard + service script.");
    }

    return {
      headline:
        form.urgency === "asap"
          ? "Likely first steps (ASAP plan)"
          : "Likely first steps (quick plan)",
      risks: risks.slice(0, 2),
      steps: steps.slice(0, 4),
    };
  }, [primeCost, form.biggestPain, form.urgency]);

  const onChange =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [k]: e.target.value as any }));
    };

  function toggleSignal(id: string) {
    setForm((prev) => {
      const exists = prev.signals.includes(id);
      if (exists) return { ...prev, signals: prev.signals.filter((x) => x !== id) };
      if (prev.signals.length >= 3) return prev; // max 3
      return { ...prev, signals: [...prev.signals, id] };
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          primeCostApprox: primeCost,
          snapshot,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to send");
      }

      setStatus("sent");
      setForm(initialState);
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong.");
    }
  }

  return (
    <div className="rounded-lg border border-border bg-background/40 p-5 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Free Diagnosis (Multiple choice)</p>
          <h3 className="font-headline text-xl font-bold">2 minutes. I reply fast.</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick answers → you’ll see a “likely first steps” snapshot instantly. Then I email you back.
          </p>
        </div>
        <Badge variant="outline">~2 min</Badge>
      </div>

      {/* Instant hook */}
      <div className="mt-5 rounded-lg border border-border bg-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-semibold">{snapshot.headline}</p>
          <Badge variant="secondary">Prime cost ≈ {primeCost}%</Badge>
        </div>
        <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5 space-y-1">
          {snapshot.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-muted-foreground">
          This is rule-based (no AI on the site). You’ll get a tailored reply after submission.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-6">
        {/* Basics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Your name *</label>
            <input
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Business name *</label>
            <input
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.businessName}
              onChange={(e) => setForm((p) => ({ ...p, businessName: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">City *</label>
            <input
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.city}
              onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email *</label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              required
            />
          </div>
        </div>

        {/* Diagnosis picks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Stage *</label>
            <select
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.stage}
              onChange={onChange("stage")}
            >
              <option value="starting">Starting soon</option>
              <option value="open">Open & running</option>
              <option value="struggling">Struggling</option>
              <option value="scaling">Scaling</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Biggest pain *</label>
            <select
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.biggestPain}
              onChange={onChange("biggestPain")}
            >
              <option value="margins">Margins / cashflow</option>
              <option value="chaos">Chaos / operations</option>
              <option value="bookings">Bookings / marketing</option>
              <option value="team">Team / training</option>
              <option value="menu">Menu / concept clarity</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Urgency *</label>
            <select
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.urgency}
              onChange={onChange("urgency")}
            >
              <option value="asap">ASAP (this month)</option>
              <option value="2-4w">2–4 weeks</option>
              <option value="1-3m">1–3 months</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Monthly revenue (pick one)</label>
            <select
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.revenue}
              onChange={onChange("revenue")}
            >
              <option value="<10k">&lt; €10k</option>
              <option value="10-25k">€10k–€25k</option>
              <option value="25-50k">€25k–€50k</option>
              <option value="50-100k">€50k–€100k</option>
              <option value="100k+">€100k+</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Food cost % (pick one)</label>
            <select
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.foodCost}
              onChange={onChange("foodCost")}
            >
              <option value="<28">&lt; 28%</option>
              <option value="28-32">28–32%</option>
              <option value="33-38">33–38%</option>
              <option value="39+">39%+</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Labor cost % (pick one)</label>
            <select
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.laborCost}
              onChange={onChange("laborCost")}
            >
              <option value="<28">&lt; 28%</option>
              <option value="28-32">28–32%</option>
              <option value="33-38">33–38%</option>
              <option value="39+">39%+</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Online bookings</label>
            <select
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.onlineBookings}
              onChange={onChange("onlineBookings")}
            >
              <option value="strong">Strong (consistent)</option>
              <option value="ok">Okay</option>
              <option value="weak">Weak</option>
              <option value="none">Almost none</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Systems (SOPs, costing, rhythm)</label>
            <select
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.systems}
              onChange={onChange("systems")}
            >
              <option value="strong">Strong</option>
              <option value="ok">Okay</option>
              <option value="weak">Weak / not documented</option>
            </select>
          </div>
        </div>

        {/* Signals (max 3) */}
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold">Pick up to 3 signals</p>
            <Badge variant="secondary">
              {form.signals.length}/3 selected
            </Badge>
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
            {SIGNALS.map((s) => {
              const checked = form.signals.includes(s.id);
              const disabled = !checked && form.signals.length >= 3;
              return (
                <label
                  key={s.id}
                  className={`flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm cursor-pointer ${
                    disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-background/30"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleSignal(s.id)}
                  />
                  {s.label}
                </label>
              );
            })}
          </div>
        </div>

        {/* Next step preference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">What do you want next?</label>
            <select
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.nextStep}
              onChange={onChange("nextStep")}
            >
              <option value="free_call">Free 15-min diagnosis call</option>
              <option value="quick_scan">Quick Scan</option>
              <option value="day_rate">On-site day rate</option>
              <option value="retainer">Monthly retainer</option>
              <option value="not_sure">Not sure</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Website (optional)</label>
            <input
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.website}
              onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
              placeholder="https://..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">Instagram (optional)</label>
            <input
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.instagram}
              onChange={(e) => setForm((p) => ({ ...p, instagram: e.target.value }))}
              placeholder="@handle"
            />
          </div>
        </div>

        {status === "error" && <p className="text-sm text-destructive">{error}</p>}

        {status === "sent" ? (
          <div className="rounded-md border border-border bg-card p-4">
            <p className="font-semibold">Sent ✅</p>
            <p className="text-sm text-muted-foreground mt-1">
              Got it. I’ll reply within 1 business day with clear first steps.
            </p>
          </div>
        ) : (
          <Button type="submit" className="w-full font-semibold" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send & get diagnosed"}
          </Button>
        )}

        <p className="text-xs text-muted-foreground text-center">
          No spam. One reply. Straight to the point.
        </p>
      </form>
    </div>
  );
}
