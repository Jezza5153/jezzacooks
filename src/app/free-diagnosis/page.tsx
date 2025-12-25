"use client";

import { useCallback, useState, type ReactNode } from "react";
import Link from "next/link";
import { ChevronDown, Clock, Mail, ShieldCheck, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

type Option = { value: string; label: string };

const STAGE: Option[] = [
  { value: "open_struggling", label: "Open, maar het loopt stroef" },
  { value: "open_stable", label: "Open & stabiel" },
  { value: "opening_soon", label: "Opening binnenkort" },
  { value: "planning", label: "Idee / planfase" },
];

const PAIN: Option[] = [
  { value: "chaos", label: "Te veel chaos / geen overzicht" },
  { value: "margins", label: "Marge / cashflow druk" },
  { value: "bookings", label: "Te weinig directe boekingen" },
  { value: "team", label: "Team issues / inconsistentie" },
];

const URGENCY: Option[] = [
  { value: "now", label: "Ik wil binnen 1–2 weken duidelijkheid" },
  { value: "2_4w", label: "Ik wil binnen 2–4 weken duidelijkheid" },
  { value: "1_2m", label: "Binnen 1–2 maanden" },
  { value: "later", label: "Later / niet urgent" },
];

const REVENUE: Option[] = [
    { value: "lt_25k", label: "< €25k / maand" },
    { value: "25_50k", label: "€25k–€50k / maand" },
    { value: "50_100k", label: "€50k–€100k / maand" },
    { value: "100k_plus", label: "€100k+ / maand" },
    { value: "unknown", label: "Weet ik niet zeker" },
];

const COST: Option[] = [
  { value: "under_28", label: "Onder 28%" },
  { value: "28_33", label: "28–33%" },
  { value: "33_38", label: "33–38%" },
  { value: "38_45", label: "38–45%" },
  { value: "45_plus", label: "45%+" },
  { value: "unknown", label: "Weet ik niet zeker" },
];

const BOOKINGS: Option[] = [
  { value: "strong", label: "Boekingen zijn sterk" },
  { value: "ok", label: "Boekingen zijn oké" },
  { value: "weak", label: "Boekingen zijn zwak" },
  { value: "unknown", label: "Weet ik niet zeker" },
];

const SYSTEMS: Option[] = [
  { value: "strong", label: "Systemen & routines staan goed" },
  { value: "ok", label: "Oké, maar niet vastgelegd" },
  { value: "weak", label: "Zwak / inconsistent" },
  { value: "none", label: "Nog geen echte systemen" },
];

const SIGNALS = [
  { id: "cashflow", label: "Cashflow stress (altijd krap)" },
  { id: "food_drift", label: "Food cost loopt weg / portion control zwak" },
  { id: "labor_high", label: "Loonkosten te hoog / roosters voelen random" },
  { id: "menu_chaos", label: "Kaart te groot / prep is chaos" },
  { id: "team_turnover", label: "Veel verloop / training is zwak" },
  { id: "owner_burnout", label: "Owner draait 60–80u (geen controle)" },
  { id: "reviews_flat", label: "Reviews stijgen niet / beleving is wisselend" },
  { id: "direct_low", label: "Te weinig directe boekingen" },
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
  children: ReactNode;
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
        "ring-1 ring-white/5",
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
        className={cn(inputClass, "appearance-none pr-10", "cursor-pointer")}
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

function PremiumCheckbox(props: {
  checked: boolean;
  disabled?: boolean;
  onChange: (next: boolean) => void;
  onClick?: React.MouseEventHandler;
}) {
  const { checked, disabled, onChange, onClick } = props;

  return (
    <button
      type="button"
      aria-pressed={checked}
      aria-checked={checked}
      role="checkbox"
      disabled={disabled}
      onClick={(e) => {
        onClick?.(e);
        if (disabled) return;
        onChange(!checked);
      }}
      className={cn(
        "relative mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md",
        "border border-border/70 bg-background/30",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        "transition",
        "hover:bg-background/45 hover:border-border/90",
        "focus:outline-none focus:ring-2 focus:ring-[hsla(var(--primary)/0.35)]",
        checked && "border-[hsla(var(--primary)/0.55)] bg-[hsla(var(--primary)/0.16)]",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <Check
        className={cn(
          "h-4 w-4",
          checked ? "opacity-100 text-[hsl(var(--primary))]" : "opacity-0"
        )}
      />
    </button>
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
      if (has) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (loading) return;

      if (!name.trim() || !businessName.trim() || !city.trim() || !email.trim()) {
        toast({
          title: "Info ontbreekt",
          description: "Vul dit even in: naam, bedrijfsnaam, stad, e-mail.",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);

      const primeCostApprox =
        Math.round((midMap[foodCost] + midMap[laborCost]) * 10) / 10;

      // (You can remove snapshot later if you want “zero diagnosis” on-site)
      const steps: string[] = [];
      if (primeCostApprox >= 75) {
        steps.push("Stap 1: Portion specs + top-10 dish costing deze week.");
        steps.push("Stap 2: Rooster koppelen aan covers (dode uren eruit).");
        steps.push("Stap 3: Snij 2–3 menu-items die prep-chaos veroorzaken.");
      } else if (primeCostApprox >= 68) {
        steps.push("Stap 1: Top 5 sellers + marge in kaart (snelle menu mix).");
        steps.push("Stap 2: Prep-map strakker + station ownership voor service.");
        steps.push("Stap 3: 1 wekelijks KPI-ritme (omzet, food%, labor%).");
      } else {
        steps.push("Stap 1: SOP’s standaardiseren (open/close + 10 core recipes).");
        steps.push("Stap 2: Directe boekingen funnel verbeteren (CTA, menu, trust).");
        steps.push("Stap 3: Week-ritme + continue menu-iteratie.");
      }
      const snapshot = {
        tag: primeCostApprox >= 68 ? "Hoge Prime Cost" : "Systemen Focus",
        steps: steps.slice(0, 4),
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
          title: "Verzonden ✅",
          description: "Binnen — ik reageer persoonlijk per e-mail.",
        });

        setName("");
        setBusinessName("");
        setCity("");
        setEmail("");
        setWebsite("");
        setInstagram("");
        setSignals([]);
      } catch {
        toast({
          title: "Fout",
          description: "Kon niet versturen. Probeer het zo nog eens.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [
      loading,
      name,
      businessName,
      city,
      email,
      toast,
      website,
      instagram,
      stage,
      biggestPain,
      urgency,
      revenue,
      foodCost,
      laborCost,
      onlineBookings,
      systems,
      signals,
    ]
  );

  const primeCostApprox =
    Math.round((midMap[foodCost] + midMap[laborCost]) * 10) / 10;

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
                Gratis
              </Badge>
              <Badge className="rounded-full px-3 py-1">15-min Diagnose</Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1">
                Geen harde sales
              </Badge>

              <span className="ml-auto hidden sm:flex items-center gap-2 rounded-full border border-border/70 bg-background/30 px-3 py-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" /> ~2 min
              </span>
            </div>

            <h1 className="mt-6 font-headline text-4xl md:text-6xl font-bold tracking-tight">
              Gratis diagnose{" "}
              <span className="text-muted-foreground">(zodat je eerst zeker weet waar je aan begint)</span>
            </h1>

            <p className="mt-4 max-w-3xl text-base md:text-xl text-muted-foreground leading-relaxed">
              Jij vult kort in wat er speelt. Ik krijg het als e-mail en reageer persoonlijk met de eerste fixes die ik zou doen.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#diagnosis" className={cn(buttonVariants({ size: "lg" }), "font-semibold")}>
                Vul de quick scan in <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold")}
              >
                Liever een call? Boek hier
              </Link>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Liever DM? Stuur “SCAN” op Instagram @chefjezz.
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
                    <h2 className="font-headline text-2xl md:text-3xl font-bold">Even context</h2>
                    <p className="mt-2 text-sm md:text-base text-muted-foreground">
                      Geen essays nodig — dit helpt me alleen snappen wie ik spreek.
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 rounded-full border border-border/70 bg-background/25 px-3 py-1.5 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    Gaat direct naar mijn inbox
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <FieldLabel label="Naam" required />
                    <TextInput
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jouw naam"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div>
                    <FieldLabel label="Bedrijfsnaam" required />
                    <TextInput
                      name="businessName"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Bedrijfsnaam"
                      required
                    />
                  </div>

                  <div>
                    <FieldLabel label="Stad" required />
                    <TextInput
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Stad"
                      required
                    />
                  </div>

                  <div>
                    <FieldLabel label="E-mail" required />
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
                      placeholder="https:// (optioneel)"
                    />
                  </div>

                  <div>
                    <FieldLabel label="Instagram" />
                    <TextInput
                      name="instagram"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="@handle (optioneel)"
                    />
                  </div>
                </div>
              </CardShell>

              {/* Middle title */}
              <div className="px-1">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Wat speelt er echt</h2>
                <p className="mt-2 text-muted-foreground">Kies wat het dichtst in de buurt komt. Perfecte precisie is niet nodig.</p>
              </div>

              {/* 8 blocks */}
              <CardShell className="p-0">
                <div className="grid gap-5 md:gap-6">
                  <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <FieldLabel n="1" label="Fase" required />
                      <SelectField name="stage" value={stage} onChange={setStage} options={STAGE} />
                    </div>

                    <div>
                      <FieldLabel n="2" label="Grootste pijn" required />
                      <SelectField
                        name="biggestPain"
                        value={biggestPain}
                        onChange={setBiggestPain}
                        options={PAIN}
                      />
                    </div>

                    <div>
                      <FieldLabel n="3" label="Urgentie" required />
                      <SelectField name="urgency" value={urgency} onChange={setUrgency} options={URGENCY} />
                    </div>

                    <div>
                      <FieldLabel n="4" label="Omzet per maand" />
                      <SelectField name="revenue" value={revenue} onChange={setRevenue} options={REVENUE} />
                    </div>
                  </div>

                  <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <FieldLabel n="5" label="Food cost %" />
                      <SelectField name="foodCost" value={foodCost} onChange={setFoodCost} options={COST} />
                    </div>

                    <div>
                      <FieldLabel n="6" label="Loonkosten %" />
                      <SelectField name="laborCost" value={laborCost} onChange={setLaborCost} options={COST} />
                    </div>

                    <div>
                      <FieldLabel n="7" label="Boekingen" />
                      <SelectField
                        name="onlineBookings"
                        value={onlineBookings}
                        onChange={setOnlineBookings}
                        options={BOOKINGS}
                      />
                    </div>

                    <div>
                      <FieldLabel n="8" label="Systemen & routines" />
                      <SelectField name="systems" value={systems} onChange={setSystems} options={SYSTEMS} />
                    </div>
                  </div>

                  <input type="hidden" name="primeCostApprox" value={String(primeCostApprox)} />
                </div>
              </CardShell>

              {/* Signals (NO Radix checkbox = NO loop) */}
              <CardShell>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <Label className="text-base font-semibold">Kies maximaal 3 signalen</Label>
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
                            <PremiumCheckbox
                              checked={checked}
                              disabled={disabled}
                              // prevent click on checkbox from also triggering card click
                              onClick={(e) => e.stopPropagation()}
                              onChange={(next) => {
                                if (disabled) return;
                                // keep logic consistent with max-3 rule
                                if (next && !checked) toggleSignal(s.id);
                                if (!next && checked) toggleSignal(s.id);
                              }}
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
                    Geen automatische “AI-diagnose” op de site. Ik lees dit zelf en reageer persoonlijk.
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
                    {loading ? "Versturen…" : "Verstuur & krijg een persoonlijke reactie"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardShell>

              <div className="lg:hidden">
                <CardShell className="py-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Privacy & zero spam</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        Jouw antwoorden gaan alleen naar mijn inbox. Geen mailinglijst. Geen bots.
                      </div>
                    </div>
                  </div>
                </CardShell>
              </div>
            </form>

            <aside className="hidden lg:block lg:sticky lg:top-24">
              <CardShell className="space-y-5">
                <div>
                  <h3 className="font-headline text-2xl font-bold">Wat gebeurt er hierna</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Jij verstuurt dit. Ik lees het. Ik reageer met de eerste fixes die ik zou doen — simpel, praktisch en specifiek.
                  </p>
                </div>

                <div className="grid gap-3 text-sm">
                  <div className="rounded-2xl border border-border/70 bg-background/25 p-4">
                    <div className="flex items-center gap-2 font-medium">
                      <Clock className="h-4 w-4 text-primary" />
                      Snelle reactie
                    </div>
                    <div className="mt-1 text-muted-foreground">Meestal dezelfde dag of binnen 24 uur.</div>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-background/25 p-4">
                    <div className="flex items-center gap-2 font-medium">
                      <Mail className="h-4 w-4 text-primary" />
                      E-mail, geen automation
                    </div>
                    <div className="mt-1 text-muted-foreground">Geen auto reply, geen “AI diagnosis” — gewoon ik.</div>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-background/25 p-4">
                    <div className="flex items-center gap-2 font-medium">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Privacy
                    </div>
                    <div className="mt-1 text-muted-foreground">Niet op een lijst. Geen spam. Ooit.</div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full font-semibold rounded-2xl")}
                  >
                    Liever bellen? Boek hier
                  </Link>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Als het echt urgent is: zet “URGENT” in het onderwerp van je afspraak.
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
