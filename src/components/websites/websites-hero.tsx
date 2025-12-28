"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { WebsitesMode } from "./websites-types";
import { WEBSITE_MODES } from "./websites-types";
import anime from "animejs";

type WebsitesHeroProps = {
  mode: WebsitesMode;
  onModeChange: (mode: WebsitesMode) => void;
};

type CompareView = "before" | "after";

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

const panel = "rounded-[34px] border border-border/35 bg-card/10 overflow-hidden";
const panelInner = "bg-gradient-to-b from-background/40 via-background/20 to-background/40";
const softGlow = "shadow-[0_0_90px_hsl(var(--primary)/0.12)]";

const MODE_COPY: Record<
  WebsitesMode,
  {
    title: string;
    tagline: string;
    bullets: string[];
    proof: { label: string; value: string }[];
  }
> = {
  simple: {
    title: "Simple",
    tagline: "Rustig. Snel. Duidelijk. Perfect als je site nu vooral in de weg zit.",
    bullets: ["Heldere structuur", "Snelle laadtijd", "Eén duidelijke CTA per sectie"],
    proof: [
      { label: "Resultaat", value: "Meer aanvragen" },
      { label: "Focus", value: "Duidelijke flow" },
      { label: "Feel", value: "Rustig en strak" },
    ],
  },
  pro: {
    title: "Pro",
    tagline: "Premium layout + micro-feedback. Niet druk, wel duidelijk beter.",
    bullets: ["Sterkere hiërarchie", "Slimme sectie-opbouw", "Interacties als feedback, niet als decor"],
    proof: [
      { label: "Resultaat", value: "Hogere conversie" },
      { label: "Focus", value: "Sneller beslissen" },
      { label: "Feel", value: "Premium zonder poespas" },
    ],
  },
  custom: {
    title: "Custom",
    tagline: "Voor merken die echt willen opvallen, maar nog steeds rustig willen blijven.",
    bullets: ["Storytelling layout", "Merkgevoel in typografie en spacing", "Cinematic details met functie"],
    proof: [
      { label: "Resultaat", value: "Top vertrouwen" },
      { label: "Focus", value: "Beleving met richting" },
      { label: "Feel", value: "High-end afwerking" },
    ],
  },
};

const PREVIEW: Record<WebsitesMode, { before: string; after: string }> = {
  simple: {
    before: "/websites-demos/simple-before.webp",
    after: "/websites-demos/simple-after.webp",
  },
  pro: {
    before: "/websites-demos/pro-before.webp",
    after: "/websites-demos/pro-after.webp",
  },
  custom: {
    before: "/websites-demos/custom-before.webp",
    after: "/websites-demos/custom-after.webp",
  },
};

function SegmentedButton({
  active,
  children,
  onClick,
  reducedMotion,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  reducedMotion: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-xl border px-3 py-2 text-sm font-semibold",
        reducedMotion ? "" : "transition-colors",
        active
          ? "border-primary/40 bg-primary/10 text-foreground"
          : "border-border/40 bg-background/20 text-muted-foreground hover:bg-background/30"
      )}
    >
      {children}
    </button>
  );
}

function ProofPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/25 px-4 py-3">
      <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">{label}</div>
      <div className="mt-1 font-headline text-lg font-bold">{value}</div>
    </div>
  );
}

function PreviewCard({
  mode,
  view,
  setView,
  reducedMotion,
}: {
  mode: WebsitesMode;
  view: CompareView;
  setView: (v: CompareView) => void;
  reducedMotion: boolean;
}) {
  const srcBefore = PREVIEW[mode].before;
  const srcAfter = PREVIEW[mode].after;

  const fade = reducedMotion ? "" : "transition-opacity duration-300";
  const beforeOn = view === "before";
  const afterOn = view === "after";

  return (
    <div className={cn(panel, panelInner, "relative", softGlow)}>
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border/30 px-5 py-4">
        <div>
          <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">Voorbeeld</div>
          <div className="mt-1 font-headline text-base font-bold">
            {MODE_COPY[mode].title}{" "}
            <span className="text-muted-foreground font-semibold">({view === "before" ? "Before" : "After"})</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setView("before")}
            aria-pressed={beforeOn}
            className={cn(
              "rounded-xl border px-3 py-2 text-sm font-semibold",
              reducedMotion ? "" : "transition-colors",
              beforeOn
                ? "border-primary/40 bg-primary/10 text-foreground"
                : "border-border/40 bg-background/20 text-muted-foreground hover:bg-background/30"
            )}
          >
            Before
          </button>
          <button
            type="button"
            onClick={() => setView("after")}
            aria-pressed={afterOn}
            className={cn(
              "rounded-xl border px-3 py-2 text-sm font-semibold",
              reducedMotion ? "" : "transition-colors",
              afterOn
                ? "border-primary/40 bg-primary/10 text-foreground"
                : "border-border/40 bg-background/20 text-muted-foreground hover:bg-background/30"
            )}
          >
            After
          </button>
        </div>
      </div>

      {/* Image area */}
      <div className="relative p-5">
        <div className="relative overflow-hidden rounded-3xl border border-border/35 bg-background/15">
          {/* Blurred cover background (no cut-off feel) */}
          <div className="absolute inset-0">
            <Image
              src={srcBefore}
              alt=""
              aria-hidden="true"
              fill
              priority
              className={cn("object-cover blur-2xl scale-110 opacity-0", fade, beforeOn ? "opacity-35" : "opacity-0")}
            />
            <Image
              src={srcAfter}
              alt=""
              aria-hidden="true"
              fill
              priority
              className={cn("object-cover blur-2xl scale-110 opacity-0", fade, afterOn ? "opacity-35" : "opacity-0")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
          </div>

          {/* Foreground contain preview */}
          <div className="relative p-4">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={srcBefore}
                alt="Before website preview"
                fill
                sizes="(max-width: 1024px) 92vw, 520px"
                className={cn("object-contain opacity-0", fade, beforeOn ? "opacity-100" : "opacity-0")}
                priority
              />
              <Image
                src={srcAfter}
                alt="After website preview"
                fill
                sizes="(max-width: 1024px) 92vw, 520px"
                className={cn("object-contain opacity-0", fade, afterOn ? "opacity-100" : "opacity-0")}
                priority
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/65 to-transparent" />
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Klik Before en After. Je ziet hetzelfde verhaal, maar dan met rust, hiërarchie en een duidelijke CTA.
        </p>
      </div>
    </div>
  );
}

export default function WebsitesHero({ mode, onModeChange }: WebsitesHeroProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [view, setView] = React.useState<CompareView>("after");

  React.useEffect(() => {
    // Default altijd naar “After” als iemand van package wisselt (sales-first).
    setView("after");
  }, [mode]);

  const copy = MODE_COPY[mode];

  return (
    <section aria-label="Websites hero" className={cn(panel, panelInner, softGlow)}>
      <div className="grid gap-8 md:grid-cols-2">
        {/* LEFT */}
        <div className="relative p-7 md:p-10 lg:p-12">
          <div className="pointer-events-none absolute -top-10 -left-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

          <p className="font-headline text-primary text-sm font-bold tracking-widest uppercase">Hospitality websites</p>

          <h1 className="mt-3 font-headline text-3xl md:text-5xl font-bold tracking-tight">
            Horeca websites die reserveringen opleveren.
            <span className="block text-muted-foreground">Rustig. Duidelijk. Gemaakt als service.</span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
            Geen druk design. Geen trucjes. Wel een flow die gasten direct naar reserveren, bellen of aanvragen stuurt.
            Jij krijgt rust. Je klant krijgt duidelijkheid.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              href="#quick-scan"
              className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
            >
              Vraag gratis quick scan aan
            </Link>

            <Link
              href="#resultaat"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold")}
            >
              Bekijk het verschil
            </Link>
          </div>

          {/* MODE SWITCH */}
          <div className="mt-9">
            <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">Kies je niveau</div>

            <div className="mt-3 grid grid-cols-3 gap-2 max-w-md">
              {WEBSITE_MODES.map((m) => (
                <SegmentedButton
                  key={m}
                  active={mode === m}
                  reducedMotion={reducedMotion}
                  onClick={() => onModeChange(m)}
                >
                  {MODE_COPY[m].title}
                </SegmentedButton>
              ))}
            </div>

            <p className="mt-3 text-sm text-muted-foreground max-w-xl">{copy.tagline}</p>

            <ul className="mt-5 space-y-2 text-sm">
              {copy.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-foreground/90">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/80" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-3 max-w-md">
              {copy.proof.map((p) => (
                <ProofPill key={p.label} label={p.label} value={p.value} />
              ))}
            </div>

            <p className="mt-5 text-xs text-muted-foreground max-w-xl">
              Animatie is hier feedback: als je klikt, verandert de UI. Geen decor, alleen bewijs.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-7 md:p-10 lg:p-12">
          <PreviewCard mode={mode} view={view} setView={setView} reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}