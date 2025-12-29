// src/components/diagnosis-client-page.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  Clock,
  Mail,
  ShieldCheck,
  ArrowRight,
  Check,
  Globe,
  Briefcase,
  UtensilsCrossed,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

type DiagnosisType = "website" | "consulting" | "catering";
type Option = { value: string; label: string };

function isDiagnosisType(v: string | null): v is DiagnosisType {
  return v === "website" || v === "consulting" || v === "catering";
}

function optionLabel(options: Option[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

/* ---------------------------
   Shared UI atoms
---------------------------- */

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

/* ---------------------------
   Page wrapper with triage
---------------------------- */

const DIAG_CONFIG: Record<
  DiagnosisType,
  {
    badge: string;
    pill: string;
    estimate: string;
    title: string;
    subtitle: string;
    icon: ReactNode;
    primaryCta: string;
  }
> = {
  website: {
    badge: "Gratis",
    pill: "Website quick scan",
    estimate: "~2 min",
    title: "Website quick scan",
    subtitle:
      "Jij zegt wat je wilt bereiken. Ik stuur je 3 verbeterpunten en een richting voor kosten. Rustig, concreet, zonder druk.",
    icon: <Globe className="h-4 w-4" />,
    primaryCta: "Vul de website scan in",
  },
  consulting: {
    badge: "Gratis",
    pill: "Consulting diagnose",
    estimate: "~2 min",
    title: "Consulting diagnose",
    subtitle:
      "Jij vult kort in wat er speelt. Ik krijg het als e-mail en reageer persoonlijk met de eerste fixes die ik zou doen.",
    icon: <Briefcase className="h-4 w-4" />,
    primaryCta: "Vul de consulting scan in",
  },
  catering: {
    badge: "Gratis",
    pill: "Catering aanvraag",
    estimate: "~2 min",
    title: "Catering aanvraag",
    subtitle:
      "Snel de juiste vragen zodat ik direct een goed voorstel kan maken. Geen eindeloze heen en weer mailtjes.",
    icon: <UtensilsCrossed className="h-4 w-4" />,
    primaryCta: "Start je catering aanvraag",
  },
};

export default function DiagnosisClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialType = useMemo(() => {
    const t = searchParams.get("type");
    return isDiagnosisType(t) ? t : null;
  }, [searchParams]);

  const [type, setType] = useState<DiagnosisType | null>(initialType);

  useEffect(() => {
    setType(initialType);
  }, [initialType]);

  const config = type ? DIAG_CONFIG[type] : null;

  const chooseType = useCallback(
    (next: DiagnosisType) => {
      setType(next);
      router.push(`/free-diagnosis?type=${next}#diagnosis`);
    },
    [router]
  );

  return (
    <div className="relative">
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/10 to-transparent" />

      {/* Hero is handled by page.tsx now */}
      
      {/* TYPE PICKER (only when no type) */}
      {!type ? (
        <section id="choose" className="relative">
          <div className="container mx-auto px-4 py-14 md:py-16">
            <div className="mx-auto max-w-5xl">
              <CardShell tone="warm">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="font-headline text-2xl md:text-3xl font-bold">Kies één route</h2>
                    <p className="mt-2 text-sm md:text-base text-muted-foreground">
                      Dan blijft de intake kort en krijg jij een reactie die klopt voor jouw situatie.
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 rounded-full border border-border/70 bg-background/25 px-3 py-1.5 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    Gaat direct naar mijn inbox
                  </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  <TypeCard
                    title="Website quick scan"
                    desc="3 verbeterpunten en een prijsrichting. Focus op bookings en vertrouwen."
                    icon={<Globe className="h-5 w-5" />}
                    onClick={() => chooseType("website")}
                  />
                  <TypeCard
                    title="Consulting diagnose"
                    desc="Operatie, marge, team, ritme. We pakken het lek dat het meest kost."
                    icon={<Briefcase className="h-5 w-5" />}
                    onClick={() => chooseType("consulting")}
                  />
                  <TypeCard
                    title="Catering aanvraag"
                    desc="Snel de juiste vragen zodat je direct een goed voorstel krijgt."
                    icon={<UtensilsCrossed className="h-5 w-5" />}
                    onClick={() => chooseType("catering")}
                  />
                </div>

                <div className="mt-6 text-xs text-muted-foreground">
                  Tip: als je via de header komt, zit je meestal al in de juiste route.
                </div>
              </CardShell>
            </div>
          </div>
        </section>
      ) : null}

      {/* FORM AREA (only selected type renders) */}
      <section id="diagnosis" className="relative">
        <div className="container mx-auto px-4 py-14 md:py-20">
          {type ? (
            <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
              <div className="space-y-8">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/25 px-3 py-1.5 text-sm text-muted-foreground">
                    {config?.icon} <span>{config?.pill}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => router.push("/free-diagnosis#choose")}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-full font-semibold"
                    )}
                  >
                    Andere route kiezen
                  </button>
                </div>

                {type === "consulting" ? <ConsultingDiagnosisForm /> : null}
                {type === "website" ? <WebsiteQuickScanForm /> : null}
                {type === "catering" ? <CateringIntakeForm /> : null}
              </div>

              <AsideWhatHappensNext type={type} />
            </div>
          ) : (
            <div className="mx-auto max-w-5xl">
              <CardShell>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Kies eerst één route</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Dan houden we het kort en relevant. Scroll iets omhoog en kies Website, Consulting of Catering.
                    </div>
                  </div>
                </div>
              </CardShell>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function TypeCard(props: {
  title: string;
  desc: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  const { title, desc, icon, onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-3xl border border-border/70 bg-background/25 p-5 text-left",
        "hover:bg-background/35 hover:border-border/90 transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-[hsla(var(--primary)/0.35)]"
      )}
    >
      <div className="flex items-center gap-2 text-foreground/95">
        <div className="rounded-xl border border-border/70 bg-background/30 p-2">{icon}</div>
        <div className="font-headline text-lg font-bold">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      <div className="mt-4 text-xs font-semibold tracking-widest uppercase text-primary">
        Start <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
      </div>
    </button>
  );
}

function AsideWhatHappensNext({ type }: { type: DiagnosisType }) {
  const title =
    type === "website"
      ? "Wat je van mij krijgt"
      : type === "consulting"
      ? "Wat gebeurt er hierna"
      : "Wat je van mij krijgt";

  const lines =
    type === "website"
      ? [
          { icon: <Clock className="h-4 w-4 text-primary" />, title: "Snel", body: "Meestal dezelfde dag of binnen 24 uur." },
          { icon: <Mail className="h-4 w-4 text-primary" />, title: "Concreet", body: "3 verbeterpunten en een prijsrichting." },
          { icon: <ShieldCheck className="h-4 w-4 text-primary" />, title: "Privacy", body: "Niet op een lijst. Geen spam. Ooit." },
        ]
      : type === "consulting"
      ? [
          { icon: <Clock className="h-4 w-4 text-primary" />, title: "Snelle reactie", body: "Meestal dezelfde dag of binnen 24 uur." },
          { icon: <Mail className="h-4 w-4 text-primary" />, title: "E-mail, geen automation", body: "Geen auto reply, geen bots. Gewoon ik." },
          { icon: <ShieldCheck className="h-4 w-4 text-primary" />, title: "Privacy", body: "Niet op een lijst. Geen spam. Ooit." },
        ]
      : [
          { icon: <Clock className="h-4 w-4 text-primary" />, title: "Snel", body: "Binnen 24 uur een eerste reactie." },
          { icon: <Mail className="h-4 w-4 text-primary" />, title: "Voorstel op maat", body: "Gebaseerd op gasten, locatie en vibe." },
          { icon: <ShieldCheck className="h-4 w-4 text-primary" />, title: "Privacy", body: "Niet op een lijst. Geen spam. Ooit." },
        ];

  return (
    <aside className="hidden lg:block lg:sticky lg:top-24">
      <CardShell className="space-y-5">
        <div>
          <h3 className="font-headline text-2xl font-bold">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Kort invullen, dan kan ik gericht reageren. Geen poeha, wel duidelijkheid.
          </p>
        </div>

        <div className="grid gap-3 text-sm">
          {lines.map((l) => (
            <div key={l.title} className="rounded-2xl border border-border/70 bg-background/25 p-4">
              <div className="flex items-center gap-2 font-medium">
                {l.icon}
                {l.title}
              </div>
              <div className="mt-1 text-muted-foreground">{l.body}</div>
            </div>
          ))}
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
  );
}

/* ---------------------------
   CONSULTING FORM (your existing code, unchanged in feel)
---------------------------- */

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

function ConsultingDiagnosisForm() {
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

  const primeCostApprox =
    Math.round((midMap[foodCost] + midMap[laborCost]) * 10) / 10;

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
          diagnosisType: "consulting",
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
          description: "Binnen. Ik reageer persoonlijk per e-mail.",
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
      primeCostApprox,
      onlineBookings,
      systems,
      signals,
    ]
  );

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      {/* Block 1: Context */}
      <CardShell tone="warm">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="font-headline text-2xl md:text-3xl font-bold">Even context</h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              Geen essays nodig. Dit helpt me snappen wie ik spreek.
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
        <p className="mt-2 text-muted-foreground">
          Kies wat het dichtst in de buurt komt. Perfecte precisie is niet nodig.
        </p>
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
              <SelectField name="biggestPain" value={biggestPain} onChange={setBiggestPain} options={PAIN} />
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

      {/* Signals */}
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
                      onClick={(e) => e.stopPropagation()}
                      onChange={(next) => {
                        if (disabled) return;
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
            Geen automatische diagnose op de site. Ik lees dit zelf en reageer persoonlijk.
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
  );
}

/* ---------------------------
   WEBSITE FORM (short, first principles, sends to /api/quick-scan)
---------------------------- */

const WEBSITE_REASON: Option[] = [
  { value: "", label: "Maak een keuze" },
  { value: "te-weinig", label: "Te weinig reserveringen of aanvragen" },
  { value: "nieuw", label: "Nieuwe zaak of rebranding" },
  { value: "dienst", label: "Nieuwe dienst (catering, events, private dining)" },
  { value: "onprofessioneel", label: "Website voelt onprofessioneel" },
  { value: "vindbaar", label: "Slecht vindbaar op Google" },
  { value: "anders", label: "Anders" },
];

const WEBSITE_OUTCOME: Option[] = [
  { value: "", label: "Maak een keuze" },
  { value: "reserveringen", label: "Meer reserveringen" },
  { value: "aanvragen", label: "Meer aanvragen" },
  { value: "bellen", label: "Meer telefoontjes" },
  { value: "vertrouwen", label: "Meer vertrouwen (reviews, uitstraling)" },
  { value: "anders", label: "Anders" },
];

const WEBSITE_PRIMARY_ACTION: Option[] = [
  { value: "", label: "Maak een keuze" },
  { value: "reserveren", label: "Reserveren" },
  { value: "offerte", label: "Offerte aanvragen" },
  { value: "bellen", label: "Bellen" },
  { value: "menu", label: "Menu bekijken" },
  { value: "route", label: "Route openen" },
];

const WEBSITE_LEAKS = [
  { id: "te-druk", label: "Te druk of onduidelijk" },
  { id: "aanbod", label: "Aanbod is niet helder" },
  { id: "cta", label: "CTA niet duidelijk" },
  { id: "mobiel", label: "Niet mobielvriendelijk" },
  { id: "traag", label: "Te traag" },
  { id: "trust", label: "Te weinig vertrouwen (reviews, foto’s, verhaal)" },
  { id: "seo", label: "Niet vindbaar op Google" },
  { id: "frictie", label: "Reserveren voelt stroef" },
] as const;

const WEBSITE_TIMELINE: Option[] = [
  { value: "", label: "Maak een keuze" },
  { value: "zo-snel", label: "Zo snel mogelijk" },
  { value: "2-4", label: "2–4 weken" },
  { value: "1-2m", label: "1–2 maanden" },
  { value: "geen", label: "Geen haast" },
];

function WebsiteQuickScanForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [reasonNow, setReasonNow] = useState("");
  const [outcome90, setOutcome90] = useState("");
  const [successMetric, setSuccessMetric] = useState("");
  const [primaryAction, setPrimaryAction] = useState("");
  const [timeline, setTimeline] = useState("");

  const [leaks, setLeaks] = useState<string[]>([]);
  const toggleLeak = useCallback((id: string) => {
    setLeaks((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [websiteUrl, setWebsiteUrl] = useState("");
  const [location, setLocation] = useState("");

  const [consent, setConsent] = useState(false);
  const [honey, setHoney] = useState("");

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (loading) return;

      if (!reasonNow || !outcome90 || !successMetric.trim() || !primaryAction || !timeline) {
        toast({
          title: "Info ontbreekt",
          description: "Vul de basis even in. Dan kan ik je scan scherp maken.",
          variant: "destructive",
        });
        return;
      }

      if (!leaks.length) {
        toast({
          title: "Nog één ding",
          description: "Kies minimaal één punt dat nu misgaat.",
          variant: "destructive",
        });
        return;
      }

      if (!name.trim() || !email.trim() || !consent) {
        toast({
          title: "Contact ontbreekt",
          description: "Naam, e-mail en toestemming zijn nodig om je scan te sturen.",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);

      try {
        const payload = {
          submittedAtIso: new Date().toISOString(),
          reasonNow: optionLabel(WEBSITE_REASON, reasonNow),
          outcome90: optionLabel(WEBSITE_OUTCOME, outcome90),
          successMetric: successMetric.trim(),

          revenueFocus: [],
          avgSpendBand: "",
          primaryAction: optionLabel(WEBSITE_PRIMARY_ACTION, primaryAction),
          leaks: leaks
            .map((id) => WEBSITE_LEAKS.find((x) => x.id === id)?.label)
            .filter(Boolean) as string[],
          biggestDoubt: "",

          businessType: "",
          location: location.trim(),
          websiteUrl: websiteUrl.trim(),
          timeline: optionLabel(WEBSITE_TIMELINE, timeline),
          assetsReady: "",
          budgetBand: "",

          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),

          consent,
          honey,
        };

        const res = await fetch("/api/quick-scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed");

        toast({
          title: "Verzonden ✅",
          description: "Binnen. Je krijgt 3 punten en een prijsrichting per e-mail.",
        });

        setReasonNow("");
        setOutcome90("");
        setSuccessMetric("");
        setPrimaryAction("");
        setTimeline("");
        setLeaks([]);
        setName("");
        setEmail("");
        setPhone("");
        setWebsiteUrl("");
        setLocation("");
        setConsent(false);
        setHoney("");
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
      reasonNow,
      outcome90,
      successMetric,
      primaryAction,
      timeline,
      leaks,
      name,
      email,
      consent,
      phone,
      websiteUrl,
      location,
      honey,
      toast,
    ]
  );

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <CardShell tone="warm">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="font-headline text-2xl md:text-3xl font-bold">First principles</h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              Wat moet de site opleveren, en waar lekt het nu. Dan kan ik meteen scherp reageren.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 rounded-full border border-border/70 bg-background/25 px-3 py-1.5 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            Gaat direct naar mijn inbox
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <FieldLabel n="1" label="Waarom nu" required />
            <SelectField name="reasonNow" value={reasonNow} onChange={setReasonNow} options={WEBSITE_REASON} />
          </div>

          <div>
            <FieldLabel n="2" label="Wat moet het over 90 dagen opleveren" required />
            <SelectField name="outcome90" value={outcome90} onChange={setOutcome90} options={WEBSITE_OUTCOME} />
          </div>

          <div className="md:col-span-2">
            <FieldLabel n="3" label="Hoe meet je succes" required />
            <TextInput
              name="successMetric"
              value={successMetric}
              onChange={(e) => setSuccessMetric(e.target.value)}
              placeholder="Bijv. 10 extra reserveringen per week, 20 aanvragen per maand"
              required
            />
          </div>

          <div>
            <FieldLabel n="4" label="Primaire actie op de site" required />
            <SelectField
              name="primaryAction"
              value={primaryAction}
              onChange={setPrimaryAction}
              options={WEBSITE_PRIMARY_ACTION}
            />
          </div>

          <div>
            <FieldLabel n="5" label="Wanneer wil je live" required />
            <SelectField name="timeline" value={timeline} onChange={setTimeline} options={WEBSITE_TIMELINE} />
          </div>

          <div>
            <FieldLabel label="Huidige website" />
            <TextInput
              name="websiteUrl"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https:// (optioneel)"
            />
          </div>

          <div>
            <FieldLabel label="Regio" />
            <TextInput
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Bijv. Amersfoort, Utrecht"
            />
          </div>
        </div>
      </CardShell>

      <CardShell>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <Label className="text-base font-semibold">Waar lekt het nu</Label>
            <Badge className="rounded-full">{leaks.length}</Badge>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {WEBSITE_LEAKS.map((s) => {
              const checked = leaks.includes(s.id);
              return (
                <div
                  key={s.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleLeak(s.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleLeak(s.id);
                    }
                  }}
                  className={cn(
                    "rounded-2xl border border-border bg-background/40 p-4 text-left transition-colors select-none",
                    "focus:outline-none focus:ring-2 focus:ring-primary/40",
                    checked && "border-primary/60 bg-primary/10"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <PremiumCheckbox
                      checked={checked}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => toggleLeak(s.id)}
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
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <FieldLabel label="Naam" required />
            <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Jouw naam" required />
          </div>
          <div>
            <FieldLabel label="E-mail" required />
            <TextInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              required
            />
          </div>
          <div>
            <FieldLabel label="Telefoon" />
            <TextInput value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(optioneel)" />
          </div>

          <div className="hidden">
            <label htmlFor="honey">Website</label>
            <input id="honey" value={honey} onChange={(e) => setHoney(e.target.value)} />
          </div>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-border/70 bg-background/25 p-4">
          <PremiumCheckbox checked={consent} onChange={setConsent} />
          <div className="text-sm text-muted-foreground">
            Ik mag je mailen met de quick scan. Geen spam. Geen druk.
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted-foreground">
            Je krijgt 3 punten en een prijsrichting per e-mail. Ik lees dit zelf.
          </div>

          <Button
            type="submit"
            size="lg"
            className={cn("w-full sm:w-auto font-semibold rounded-2xl", "shadow-[0_18px_60px_rgba(0,0,0,0.35)]")}
            disabled={loading}
          >
            {loading ? "Versturen…" : "Verstuur website scan"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardShell>
    </form>
  );
}

/* ---------------------------
   CATERING FORM (short intake, sends to /api/diagnosis with type=catering)
---------------------------- */

const CATERING_TYPE: Option[] = [
  { value: "", label: "Maak een keuze" },
  { value: "private_dining", label: "Private dining" },
  { value: "corporate", label: "Zakelijk diner" },
  { value: "wedding", label: "Bruiloft" },
  { value: "party", label: "Feest" },
  { value: "other", label: "Anders" },
];

const CATERING_BUDGET: Option[] = [
  { value: "", label: "Maak een keuze" },
  { value: "lt_40", label: "< €40 p.p." },
  { value: "40_70", label: "€40–€70 p.p." },
  { value: "70_110", label: "€70–€110 p.p." },
  { value: "110_plus", label: "€110+ p.p." },
  { value: "unknown", label: "Nog niet zeker" },
];

function CateringIntakeForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [dietary, setDietary] = useState("");
  const [vibe, setVibe] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [consent, setConsent] = useState(false);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (loading) return;

      if (!eventType || !date.trim() || !guests.trim() || !location.trim()) {
        toast({
          title: "Info ontbreekt",
          description: "Vul even in: type event, datum, aantal gasten, locatie.",
          variant: "destructive",
        });
        return;
      }

      if (!name.trim() || !email.trim() || !consent) {
        toast({
          title: "Contact ontbreekt",
          description: "Naam, e-mail en toestemming zijn nodig om te reageren.",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);

      try {
        const payload = {
          diagnosisType: "catering",
          submittedAtIso: new Date().toISOString(),
          eventType: optionLabel(CATERING_TYPE, eventType),
          date: date.trim(),
          guests: guests.trim(),
          location: location.trim(),
          budget: budget ? optionLabel(CATERING_BUDGET, budget) : "",
          dietary: dietary.trim(),
          vibe: vibe.trim(),
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          consent: true,
        };

        const res = await fetch("/api/diagnosis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed");

        toast({
          title: "Verzonden ✅",
          description: "Binnen. Ik stuur je een voorstel of gerichte vragen per e-mail.",
        });

        setEventType("");
        setDate("");
        setGuests("");
        setLocation("");
        setBudget("");
        setDietary("");
        setVibe("");
        setName("");
        setEmail("");
        setPhone("");
        setConsent(false);
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
      eventType,
      date,
      guests,
      location,
      budget,
      dietary,
      vibe,
      name,
      email,
      phone,
      consent,
      toast,
    ]
  );

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <CardShell tone="warm">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="font-headline text-2xl md:text-3xl font-bold">Snel intake</h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              Genoeg info om direct een goed voorstel te maken. Kort, helder, zonder gedoe.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 rounded-full border border-border/70 bg-background/25 px-3 py-1.5 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            Gaat direct naar mijn inbox
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <FieldLabel n="1" label="Type event" required />
            <SelectField name="eventType" value={eventType} onChange={setEventType} options={CATERING_TYPE} />
          </div>

          <div>
            <FieldLabel n="2" label="Datum" required />
            <TextInput value={date} onChange={(e) => setDate(e.target.value)} placeholder="Bijv. 12 maart of ‘flexibel’" />
          </div>

          <div>
            <FieldLabel n="3" label="Aantal gasten" required />
            <TextInput value={guests} onChange={(e) => setGuests(e.target.value)} placeholder="Bijv. 12, 40, 80" />
          </div>

          <div>
            <FieldLabel n="4" label="Locatie" required />
            <TextInput value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Stad of adres (globaal)" />
          </div>

          <div>
            <FieldLabel label="Budget indicatie" />
            <SelectField name="budget" value={budget} onChange={setBudget} options={CATERING_BUDGET} />
          </div>

          <div>
            <FieldLabel label="Dieet of allergenen" />
            <TextInput value={dietary} onChange={(e) => setDietary(e.target.value)} placeholder="Bijv. vegetarisch, gluten, noten" />
          </div>

          <div className="md:col-span-2">
            <FieldLabel label="Vibe of keuken (optioneel)" />
            <TextInput value={vibe} onChange={(e) => setVibe(e.target.value)} placeholder="Bijv. Italian sharing, fine casual, seafood night" />
          </div>
        </div>
      </CardShell>

      <CardShell>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <FieldLabel label="Naam" required />
            <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Jouw naam" required />
          </div>
          <div>
            <FieldLabel label="E-mail" required />
            <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" required />
          </div>
          <div>
            <FieldLabel label="Telefoon" />
            <TextInput value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(optioneel)" />
          </div>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-border/70 bg-background/25 p-4">
          <PremiumCheckbox checked={consent} onChange={setConsent} />
          <div className="text-sm text-muted-foreground">
            Ik mag je mailen over deze aanvraag. Geen spam. Geen druk.
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted-foreground">
            Ik reageer persoonlijk met een voorstel of de laatste vragen die ik nodig heb.
          </div>

          <Button
            type="submit"
            size="lg"
            className={cn("w-full sm:w-auto font-semibold rounded-2xl", "shadow-[0_18px_60px_rgba(0,0,0,0.35)]")}
            disabled={loading}
          >
            {loading ? "Versturen…" : "Verstuur catering aanvraag"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardShell>
    </form>
  );
}