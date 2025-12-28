"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

const panel = "rounded-[34px] border border-border/35 bg-card/10 overflow-hidden";
const panelInner = "bg-gradient-to-b from-background/40 via-background/20 to-background/40";
const softGlow = "shadow-[0_0_90px_hsl(var(--primary)/0.12)]";

const inputBase =
  "w-full rounded-2xl border border-border/40 bg-background/25 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30";
const labelBase = "text-xs tracking-widest uppercase text-muted-foreground font-semibold";
const helpBase = "mt-2 text-xs text-muted-foreground";
const errorBase =
  "mt-3 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-foreground";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

function Chip({
  active,
  label,
  onClick,
  reducedMotion,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  reducedMotion: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-2xl border px-4 py-2 text-sm font-semibold text-left",
        reducedMotion ? "" : "transition-colors",
        active
          ? "border-primary/40 bg-primary/10 text-foreground"
          : "border-border/40 bg-background/20 text-muted-foreground hover:bg-background/30"
      )}
    >
      {label}
    </button>
  );
}

function ProgressBar({ step, steps }: { step: number; steps: number }) {
  const pct = Math.round(((step + 1) / steps) * 100);
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Stap {step + 1} van {steps}</span>
        <span>{pct}%</span>
      </div>
      <div className="mt-2 h-2 w-full rounded-full bg-background/25 border border-border/30 overflow-hidden">
        <div className="h-full bg-primary/40" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

type FormState = {
  // Stap 1: waarom + doel
  reasonNow: string;
  outcome90: string;
  successMetric: string;

  // Stap 2: business model + leaks
  revenueFocus: string[]; // max 2
  avgSpendBand: string;
  primaryAction: string;
  leaks: string[];
  biggestDoubt: string;

  // Context
  businessType: string;
  location: string;
  websiteUrl: string;
  timeline: string;
  assetsReady: string;
  budgetBand: string;

  // Contact
  name: string;
  email: string;
  phone: string;
  consent: boolean;

  // Anti spam
  honey: string;
};

const REASON_NOW: Option[] = [
  { value: "te-weinig-aanvragen", label: "Te weinig reserveringen of aanvragen" },
  { value: "nieuwe-zaak", label: "Nieuwe zaak of rebranding" },
  { value: "nieuwe-dienst", label: "Nieuwe dienst (catering, events, private dining)" },
  { value: "onprofessioneel", label: "Website voelt onprofessioneel" },
  { value: "slecht-vindbaar", label: "Slecht vindbaar op Google" },
  { value: "anders", label: "Anders" },
];

const OUTCOME_90: Option[] = [
  { value: "meer-reserveringen", label: "Meer reserveringen" },
  { value: "meer-aanvragen", label: "Meer aanvragen (catering, events)" },
  { value: "meer-telefoontjes", label: "Meer telefoontjes" },
  { value: "meer-menu-kliks", label: "Meer menu-bezoeken en doorkliks" },
  { value: "meer-vertrouwen", label: "Meer vertrouwen (reviews, uitstraling)" },
  { value: "anders", label: "Anders" },
];

const REVENUE_FOCUS: Option[] = [
  { value: "diner", label: "Dineren op locatie" },
  { value: "lunch-borrel", label: "Lunch of borrel" },
  { value: "afhalen-bezorging", label: "Afhalen of bezorging" },
  { value: "catering", label: "Catering" },
  { value: "private-dining", label: "Private dining" },
  { value: "events", label: "Events" },
  { value: "anders", label: "Anders" },
];

const AVG_SPEND: Option[] = [
  { value: "onder-25", label: "Onder €25" },
  { value: "25-45", label: "€25–€45" },
  { value: "45-75", label: "€45–€75" },
  { value: "75-plus", label: "€75+" },
  { value: "onbekend", label: "Weet ik niet" },
];

const PRIMARY_ACTION: Option[] = [
  { value: "reserveren", label: "Reserveren" },
  { value: "bellen", label: "Bellen" },
  { value: "offerte", label: "Offerte aanvragen" },
  { value: "menu", label: "Menu bekijken" },
  { value: "event", label: "Event datum checken" },
  { value: "route", label: "Route openen" },
];

const LEAKS: Option[] = [
  { value: "te-druk", label: "Te druk of onduidelijk" },
  { value: "aanbod-onduidelijk", label: "Bezoeker snapt niet wat we aanbieden" },
  { value: "cta-onduidelijk", label: "CTA is niet duidelijk of niet zichtbaar" },
  { value: "niet-mobiel", label: "Niet mobielvriendelijk" },
  { value: "traag", label: "Te traag" },
  { value: "geen-vertrouwen", label: "Geen vertrouwen (reviews, foto’s, verhaal)" },
  { value: "niet-vindbaar", label: "Niet vindbaar op Google" },
  { value: "reserveren-frictie", label: "Reserveren werkt niet lekker" },
  { value: "anders", label: "Anders" },
];

const BIGGEST_DOUBT: Option[] = [
  { value: "prijs-waarde", label: "Prijs of waarde" },
  { value: "kwaliteit-eten", label: "Kwaliteit van eten" },
  { value: "sfeer", label: "Sfeer of ervaring" },
  { value: "beschikbaarheid", label: "Beschikbaarheid" },
  { value: "locatie", label: "Locatie of parkeren" },
  { value: "allergenen", label: "Allergenen of dieet" },
  { value: "anders", label: "Anders" },
];

const BUSINESS_TYPE: Option[] = [
  { value: "restaurant", label: "Restaurant" },
  { value: "cafe", label: "Café" },
  { value: "lunchroom", label: "Lunchroom" },
  { value: "hotel", label: "Hotel" },
  { value: "catering", label: "Catering" },
  { value: "private-dining", label: "Private dining" },
  { value: "anders", label: "Anders" },
];

const TIMELINE: Option[] = [
  { value: "zo-snel-mogelijk", label: "Zo snel mogelijk" },
  { value: "2-4-weken", label: "2–4 weken" },
  { value: "1-2-maanden", label: "1–2 maanden" },
  { value: "geen-haast", label: "Geen haast" },
];

const ASSETS: Option[] = [
  { value: "ja", label: "Ja, alles" },
  { value: "deels", label: "Deels" },
  { value: "nee", label: "Nee, dat is juist het probleem" },
];

const BUDGET: Option[] = [
  { value: "1-2k", label: "€1–2k" },
  { value: "2-4k", label: "€2–4k" },
  { value: "4-8k", label: "€4–8k" },
  { value: "8k-plus", label: "€8k+" },
  { value: "eerst-advies", label: "Liever eerst advies" },
];

function prettyLabel(options: Option[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

export default function QuickScanForm() {
  const reducedMotion = usePrefersReducedMotion();
  const steps = 3;
  const [step, setStep] = React.useState(0);

  const [state, setState] = React.useState<FormState>({
    reasonNow: "",
    outcome90: "",
    successMetric: "",

    revenueFocus: [],
    avgSpendBand: "",
    primaryAction: "",
    leaks: [],
    biggestDoubt: "",

    businessType: "",
    location: "",
    websiteUrl: "",
    timeline: "",
    assetsReady: "",
    budgetBand: "",

    name: "",
    email: "",
    phone: "",
    consent: false,

    honey: "",
  });

  const [error, setError] = React.useState<string>("");
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const errorId = React.useId();

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function toggleMulti(key: "revenueFocus" | "leaks", value: string, max?: number) {
    setState((s) => {
      const current = new Set(s[key]);
      if (current.has(value)) current.delete(value);
      else {
        if (max && current.size >= max) return s;
        current.add(value);
      }
      return { ...s, [key]: Array.from(current) };
    });
  }

  function validateCurrentStep(): string {
    if (step === 0) {
      if (!state.reasonNow) return "Kies waarom je dit nu wilt doen.";
      if (!state.outcome90) return "Kies wat de website over 90 dagen moet opleveren.";
      if (!state.successMetric.trim()) return "Vul in hoe jij succes meet.";
      return "";
    }

    if (step === 1) {
      if (state.revenueFocus.length === 0) return "Kies waar je het meest aan verdient.";
      if (!state.primaryAction) return "Kies wat een bezoeker als eerste moet doen.";
      if (state.leaks.length === 0) return "Kies minstens één punt dat nu misgaat.";
      if (!state.timeline) return "Kies wanneer je live wilt.";
      return "";
    }

    if (step === 2) {
      if (!state.name.trim()) return "Vul je naam in.";
      if (!state.email.trim()) return "Vul je e-mailadres in.";
      if (!state.consent) return "Zet de toestemming aan, anders mogen we je scan niet sturen.";
      return "";
    }

    return "";
  }

  function next() {
    const msg = validateCurrentStep();
    if (msg) {
      setError(msg);
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, steps - 1));
  }

  function back() {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    const msg = validateCurrentStep();
    if (msg) {
      setError(msg);
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      const payload = {
        submittedAtIso: new Date().toISOString(),
        reasonNow: prettyLabel(REASON_NOW, state.reasonNow),
        outcome90: prettyLabel(OUTCOME_90, state.outcome90),
        successMetric: state.successMetric.trim(),

        revenueFocus: state.revenueFocus.map((v) => prettyLabel(REVENUE_FOCUS, v)),
        avgSpendBand: state.avgSpendBand ? prettyLabel(AVG_SPEND, state.avgSpendBand) : "",
        primaryAction: prettyLabel(PRIMARY_ACTION, state.primaryAction),
        leaks: state.leaks.map((v) => prettyLabel(LEAKS, v)),
        biggestDoubt: state.biggestDoubt ? prettyLabel(BIGGEST_DOUBT, state.biggestDoubt) : "",

        businessType: state.businessType ? prettyLabel(BUSINESS_TYPE, state.businessType) : "",
        location: state.location.trim(),
        websiteUrl: state.websiteUrl.trim(),
        timeline: prettyLabel(TIMELINE, state.timeline),
        assetsReady: state.assetsReady ? prettyLabel(ASSETS, state.assetsReady) : "",
        budgetBand: state.budgetBand ? prettyLabel(BUDGET, state.budgetBand) : "",

        name: state.name.trim(),
        email: state.email.trim(),
        phone: state.phone.trim(),

        consent: state.consent,
        honey: state.honey,
      };

      const res = await fetch("/api/quick-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.error || "Verzenden is mislukt.");
      }

      setSuccess(true);
    } catch (e: any) {
      setError(e?.message || "Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="quick-scan" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className={cn(panel, panelInner, "p-7 md:p-10", softGlow)}>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            {/* LEFT COPY */}
            <div>
              <p className="font-headline text-primary text-sm font-bold tracking-widest uppercase">
                Gratis quick scan
              </p>
              <h2 className="mt-3 font-headline text-3xl md:text-4xl font-bold tracking-tight">
                Vertel me wat je wilt bereiken.
                <span className="block text-muted-foreground">
                  Ik geef je 3 verbeterpunten en een prijsindicatie.
                </span>
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Ik werk first principles. Dus niet “mooier design”, maar: wat moet het opleveren, waar lekt het,
                en wat is de snelste route naar meer reserveringen of aanvragen.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-border/35 bg-background/20 p-5">
                  <div className={labelBase}>Output</div>
                  <div className="mt-2 font-headline text-xl font-bold">3 punten</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Concreet, scanbaar, direct toepasbaar.
                  </p>
                </div>
                <div className="rounded-3xl border border-border/35 bg-background/20 p-5">
                  <div className={labelBase}>Prijs</div>
                  <div className="mt-2 font-headline text-xl font-bold">Indicatie</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Eerlijk. Op basis van jouw doelen en constraints.
                  </p>
                </div>
                <div className="rounded-3xl border border-border/35 bg-background/20 p-5">
                  <div className={labelBase}>Snel</div>
                  <div className="mt-2 font-headline text-xl font-bold">24 uur</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Geen druk. Eerst waarde, dan pas een call.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="rounded-3xl border border-border/35 bg-background/20 p-6 md:p-7">
              {success ? (
                <div className="rounded-3xl border border-border/35 bg-background/25 p-6">
                  <div className="font-headline text-2xl font-bold">Binnen. Ik ga ‘m pakken.</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Je krijgt binnen 24 uur 3 verbeterpunten en een prijsindicatie in je mail.
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Tip: als je een link hebt naar je huidige site, reply die er even bij. Dan kan ik sneller doorpakken.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className={labelBase}>Quick scan intake</div>
                      <div className="mt-2 font-headline text-xl font-bold">
                        {step === 0 && "Waarom nu"}
                        {step === 1 && "Business + bottleneck"}
                        {step === 2 && "Contact"}
                      </div>
                    </div>
                  </div>

                  <ProgressBar step={step} steps={steps} />

                  {error ? (
                    <div id={errorId} role="alert" aria-live="polite" className={errorBase}>
                      {error}
                    </div>
                  ) : null}

                  <form
                    className="mt-6 space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (step < steps - 1) next();
                      else submit();
                    }}
                    aria-describedby={error ? errorId : undefined}
                  >
                    {/* Step 1 */}
                    {step === 0 ? (
                      <fieldset className="space-y-6">
                        <legend className="sr-only">Waarom nu</legend>

                        <div>
                          <div className={labelBase}>Waarom wil je dit nu doen</div>
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {REASON_NOW.map((o) => (
                              <Chip
                                key={o.value}
                                active={state.reasonNow === o.value}
                                label={o.label}
                                onClick={() => update("reasonNow", o.value)}
                                reducedMotion={reducedMotion}
                              />
                            ))}
                          </div>
                          <div className={helpBase}>Dit is de trigger. Hiermee pakken we de echte oorzaak.</div>
                        </div>

                        <div>
                          <div className={labelBase}>Wat moet de website over 90 dagen opleveren</div>
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {OUTCOME_90.map((o) => (
                              <Chip
                                key={o.value}
                                active={state.outcome90 === o.value}
                                label={o.label}
                                onClick={() => update("outcome90", o.value)}
                                reducedMotion={reducedMotion}
                              />
                            ))}
                          </div>
                          <div className={helpBase}>Eén primaire uitkomst. Dan wordt de site automatisch rustiger.</div>
                        </div>

                        <div>
                          <label className={labelBase} htmlFor="successMetric">
                            Hoe meet je succes
                          </label>
                          <input
                            id="successMetric"
                            className={cn(inputBase, "mt-3")}
                            placeholder="Bijv. 20 aanvragen per maand, 10 extra reserveringen per week"
                            value={state.successMetric}
                            onChange={(e) => update("successMetric", e.target.value)}
                          />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <div className={labelBase}>Type zaak (optioneel)</div>
                            <div className="mt-3 grid gap-2">
                              {BUSINESS_TYPE.map((o) => (
                                <Chip
                                  key={o.value}
                                  active={state.businessType === o.value}
                                  label={o.label}
                                  onClick={() => update("businessType", o.value)}
                                  reducedMotion={reducedMotion}
                                />
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className={labelBase} htmlFor="location">
                              Plaats of regio (optioneel)
                            </label>
                            <input
                              id="location"
                              className={cn(inputBase, "mt-3")}
                              placeholder="Bijv. Amersfoort, Utrecht, Zeeland"
                              value={state.location}
                              onChange={(e) => update("location", e.target.value)}
                            />
                          </div>
                        </div>
                      </fieldset>
                    ) : null}

                    {/* Step 2 */}
                    {step === 1 ? (
                      <fieldset className="space-y-6">
                        <legend className="sr-only">Business en bottleneck</legend>

                        <div>
                          <div className={labelBase}>Waar verdien je het meest aan (max 2)</div>
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {REVENUE_FOCUS.map((o) => (
                              <Chip
                                key={o.value}
                                active={state.revenueFocus.includes(o.value)}
                                label={o.label}
                                onClick={() => toggleMulti("revenueFocus", o.value, 2)}
                                reducedMotion={reducedMotion}
                              />
                            ))}
                          </div>
                          <div className={helpBase}>
                            Dit bepaalt welke pagina’s en CTA’s prioriteit krijgen.
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <div className={labelBase}>Gemiddelde besteding (optioneel)</div>
                            <div className="mt-3 grid gap-2">
                              {AVG_SPEND.map((o) => (
                                <Chip
                                  key={o.value}
                                  active={state.avgSpendBand === o.value}
                                  label={o.label}
                                  onClick={() => update("avgSpendBand", o.value)}
                                  reducedMotion={reducedMotion}
                                />
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className={labelBase}>Wat wil je dat een bezoeker als eerste doet</div>
                            <div className="mt-3 grid gap-2">
                              {PRIMARY_ACTION.map((o) => (
                                <Chip
                                  key={o.value}
                                  active={state.primaryAction === o.value}
                                  label={o.label}
                                  onClick={() => update("primaryAction", o.value)}
                                  reducedMotion={reducedMotion}
                                />
                              ))}
                            </div>
                            <div className={helpBase}>
                              Dit is je primaire CTA. Alles op de site moet dit makkelijker maken.
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className={labelBase}>Wat gaat er nu mis (kies minimaal 1)</div>
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {LEAKS.map((o) => (
                              <Chip
                                key={o.value}
                                active={state.leaks.includes(o.value)}
                                label={o.label}
                                onClick={() => toggleMulti("leaks", o.value)}
                                reducedMotion={reducedMotion}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <div className={labelBase}>Grootste twijfel van gasten (optioneel)</div>
                            <div className="mt-3 grid gap-2">
                              {BIGGEST_DOUBT.map((o) => (
                                <Chip
                                  key={o.value}
                                  active={state.biggestDoubt === o.value}
                                  label={o.label}
                                  onClick={() => update("biggestDoubt", o.value)}
                                  reducedMotion={reducedMotion}
                                />
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className={labelBase}>Wanneer wil je live</div>
                            <div className="mt-3 grid gap-2">
                              {TIMELINE.map((o) => (
                                <Chip
                                  key={o.value}
                                  active={state.timeline === o.value}
                                  label={o.label}
                                  onClick={() => update("timeline", o.value)}
                                  reducedMotion={reducedMotion}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className={labelBase} htmlFor="websiteUrl">
                              Huidige website (optioneel)
                            </label>
                            <input
                              id="websiteUrl"
                              className={cn(inputBase, "mt-3")}
                              placeholder="https://"
                              value={state.websiteUrl}
                              onChange={(e) => update("websiteUrl", e.target.value)}
                            />
                            <div className={helpBase}>
                              Als je dit invult, kan ik de quick scan veel scherper maken.
                            </div>
                          </div>

                          <div>
                            <div className={labelBase}>Foto’s en reviews klaar (optioneel)</div>
                            <div className="mt-3 grid gap-2">
                              {ASSETS.map((o) => (
                                <Chip
                                  key={o.value}
                                  active={state.assetsReady === o.value}
                                  label={o.label}
                                  onClick={() => update("assetsReady", o.value)}
                                  reducedMotion={reducedMotion}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className={labelBase}>Budget richting (optioneel)</div>
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {BUDGET.map((o) => (
                              <Chip
                                key={o.value}
                                active={state.budgetBand === o.value}
                                label={o.label}
                                onClick={() => update("budgetBand", o.value)}
                                reducedMotion={reducedMotion}
                              />
                            ))}
                          </div>
                          <div className={helpBase}>
                            Alleen zodat ik je een eerlijke prijsindicatie kan geven.
                          </div>
                        </div>
                      </fieldset>
                    ) : null}

                    {/* Step 3 */}
                    {step === 2 ? (
                      <fieldset className="space-y-6">
                        <legend className="sr-only">Contact</legend>

                        <div className="hidden">
                          {/* honeypot */}
                          <label htmlFor="honey">Website</label>
                          <input
                            id="honey"
                            value={state.honey}
                            onChange={(e) => update("honey", e.target.value)}
                          />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className={labelBase} htmlFor="name">
                              Naam
                            </label>
                            <input
                              id="name"
                              className={cn(inputBase, "mt-3")}
                              autoComplete="name"
                              value={state.name}
                              onChange={(e) => update("name", e.target.value)}
                            />
                          </div>

                          <div>
                            <label className={labelBase} htmlFor="email">
                              E-mail
                            </label>
                            <input
                              id="email"
                              className={cn(inputBase, "mt-3")}
                              autoComplete="email"
                              inputMode="email"
                              value={state.email}
                              onChange={(e) => update("email", e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <label className={labelBase} htmlFor="phone">
                            Telefoon (optioneel)
                          </label>
                          <input
                            id="phone"
                            className={cn(inputBase, "mt-3")}
                            autoComplete="tel"
                            inputMode="tel"
                            value={state.phone}
                            onChange={(e) => update("phone", e.target.value)}
                          />
                        </div>

                        <label className="flex items-start gap-3 rounded-3xl border border-border/35 bg-background/20 p-4">
                          <input
                            type="checkbox"
                            checked={state.consent}
                            onChange={(e) => update("consent", e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-border/50 bg-background/30"
                          />
                          <span className="text-sm text-muted-foreground">
                            Ik mag je mailen met de quick scan. Geen spam. Geen druk.
                          </span>
                        </label>

                        <p className="text-xs text-muted-foreground">
                          Door te versturen krijg je binnen 24 uur 3 verbeterpunten en een prijsindicatie.
                        </p>
                      </fieldset>
                    ) : null}

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={back}
                        disabled={step === 0 || submitting}
                        className={cn(
                          "rounded-2xl border px-4 py-3 text-sm font-semibold",
                          step === 0 || submitting
                            ? "border-border/30 bg-background/10 text-muted-foreground/70 cursor-not-allowed"
                            : "border-border/40 bg-background/20 text-muted-foreground hover:bg-background/30"
                        )}
                      >
                        Terug
                      </button>

                      {step < steps - 1 ? (
                        <button
                          type="submit"
                          disabled={submitting}
                          className={cn(
                            "rounded-2xl border border-primary/40 bg-primary/15 px-5 py-3 text-sm font-semibold text-foreground hover:bg-primary/20",
                            submitting ? "opacity-70 cursor-not-allowed" : ""
                          )}
                        >
                          Volgende
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={submit}
                          disabled={submitting}
                          className={cn(
                            "rounded-2xl border border-primary/40 bg-primary/15 px-5 py-3 text-sm font-semibold text-foreground hover:bg-primary/20",
                            submitting ? "opacity-70 cursor-not-allowed" : ""
                          )}
                        >
                          {submitting ? "Versturen..." : "Verstuur quick scan"}
                        </button>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
