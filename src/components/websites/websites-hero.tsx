"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { WebsitesMode } from "./websites-types";
import { WEBSITE_MODES } from "./websites-types";
import { animate, createTimeline, stagger } from "animejs";
import { Badge } from "@/components/ui/badge";

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
    bullets: ["Heldere structuur", "Snelle laadtijd", "Eén duidelijke actieknop per sectie"],
    proof: [
      { label: "Resultaat", value: "Meer aanvragen" },
      { label: "Focus", value: "Duidelijke flow" },
      { label: "Gevoel", value: "Rustig en strak" },
    ],
  },
  pro: {
    title: "Pro",
    tagline: "Premium layout met kleine feedback momenten. Niet druk, wel duidelijk beter.",
    bullets: ["Sterkere hiërarchie", "Slimme sectie opbouw", "Interacties als feedback, niet als decor"],
    proof: [
      { label: "Resultaat", value: "Meer conversie" },
      { label: "Focus", value: "Sneller beslissen" },
      { label: "Gevoel", value: "Premium zonder poespas" },
    ],
  },
  custom: {
    title: "Custom",
    tagline: "Voor merken die willen opvallen, maar nog steeds rust willen houden.",
    bullets: ["Storytelling layout", "Merkgevoel in typografie en spacing", "High end details met functie"],
    proof: [
      { label: "Resultaat", value: "Max vertrouwen" },
      { label: "Focus", value: "Beleving met richting" },
      { label: "Gevoel", value: "High end afwerking" },
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

type PinId = "p1" | "p2" | "p3";

type Pin = {
  id: PinId;
  n: 1 | 2 | 3;
  title: string;
  body: string;
  // pin position (percent in image container)
  x: number;
  y: number;
  // highlight rect (percent in image container)
  rect: { x: number; y: number; w: number; h: number };
};

const PINS: Record<CompareView, Pin[]> = {
  before: [
    {
      id: "p1",
      n: 1,
      title: "Te veel ruis",
      body: "Bezoekers moeten zoeken. Ze haken af.",
      x: 18,
      y: 16,
      rect: { x: 8, y: 6, w: 58, h: 20 },
    },
    {
      id: "p2",
      n: 2,
      title: "Geen focus",
      body: "Alles is even belangrijk. Dus niets wint.",
      x: 78,
      y: 22,
      rect: { x: 64, y: 6, w: 30, h: 22 },
    },
    {
      id: "p3",
      n: 3,
      title: "Actieknop verstopt",
      body: "Reserveren staat niet op de juiste plek.",
      x: 22,
      y: 78,
      rect: { x: 52, y: 72, w: 40, h: 22 },
    },
  ],
  after: [
    {
      id: "p1",
      n: 1,
      title: "Rust in opbouw",
      body: "Ogen weten waar ze moeten kijken.",
      x: 18,
      y: 16,
      rect: { x: 10, y: 8, w: 55, h: 18 },
    },
    {
      id: "p2",
      n: 2,
      title: "Vertrouwen zichtbaar",
      body: "Reviews en bewijs staan op de juiste plek.",
      x: 78,
      y: 22,
      rect: { x: 60, y: 34, w: 34, h: 18 },
    },
    {
      id: "p3",
      n: 3,
      title: "Actieknop duidelijk",
      body: "Reserveren of aanvragen is één stap.",
      x: 22,
      y: 78,
      rect: { x: 60, y: 72, w: 34, h: 22 },
    },
  ],
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
        "w-full rounded-xl border px-3 py-2 text-sm font-semibold",
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

function PinDot({
  pin,
  active,
  onSelect,
  reducedMotion,
}: {
  pin: Pin;
  active: boolean;
  onSelect: (id: PinId) => void;
  reducedMotion: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={`Uitleg punt ${pin.n}: ${pin.title}`}
      aria-pressed={active}
      onClick={() => onSelect(pin.id)}
      className={cn(
        "absolute z-20 grid h-9 w-9 place-items-center rounded-full border text-sm font-bold",
        "bg-background/55 backdrop-blur",
        "shadow-[0_18px_60px_rgba(0,0,0,0.35)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsla(var(--primary)/0.45)]",
        reducedMotion ? "" : "transition-colors",
        active
          ? "border-primary/50 bg-primary/15 text-foreground"
          : "border-border/50 text-foreground/90 hover:bg-background/65"
      )}
      style={{
        left: `${pin.x}%`,
        top: `${pin.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {pin.n}
    </button>
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

  const pins = PINS[view];
  const [activePin, setActivePin] = React.useState<PinId>("p1");

  React.useEffect(() => {
    // bij wisselen van Voor/Na: altijd start bij punt 1 (rustig en voorspelbaar)
    setActivePin("p1");
  }, [view]);

  const pin = pins.find((p) => p.id === activePin) ?? pins[0];

  return (
    <div className={cn(panel, panelInner, "relative", softGlow)}>
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border/30 px-5 py-4">
        <div>
          <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">Voorbeeld</div>
          <div className="mt-1 font-headline text-base font-bold">
            {MODE_COPY[mode].title}{" "}
            <span className="text-muted-foreground font-semibold">({beforeOn ? "Voor" : "Na"})</span>
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
            Voor
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
            Na
          </button>
        </div>
      </div>

      {/* Image area */}
      <div className="relative p-5">
        <div className="relative overflow-hidden rounded-3xl border border-border/35 bg-background/15">
          {/* Blurred cover background */}
          <div className="absolute inset-0">
            <Image
              src={srcBefore}
              alt=""
              aria-hidden="true"
              fill
              priority
              className={cn(
                "object-cover blur-2xl scale-110 opacity-0",
                fade,
                beforeOn ? "opacity-35" : "opacity-0"
              )}
            />
            <Image
              src={srcAfter}
              alt=""
              aria-hidden="true"
              fill
              priority
              className={cn(
                "object-cover blur-2xl scale-110 opacity-0",
                fade,
                afterOn ? "opacity-35" : "opacity-0"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
          </div>

          {/* Foreground contain preview */}
          <div className="relative p-4">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={srcBefore}
                alt="Voorbeeld website: voor"
                fill
                sizes="(max-width: 1024px) 92vw, 520px"
                className={cn("object-contain opacity-0", fade, beforeOn ? "opacity-100" : "opacity-0")}
                priority
              />
              <Image
                src={srcAfter}
                alt="Voorbeeld website: na"
                fill
                sizes="(max-width: 1024px) 92vw, 520px"
                className={cn("object-contain opacity-0", fade, afterOn ? "opacity-100" : "opacity-0")}
                priority
              />

              {/* Pins (small, never blocking the view) */}
              {pins.map((p) => (
                <PinDot
                  key={p.id}
                  pin={p}
                  active={p.id === activePin}
                  onSelect={setActivePin}
                  reducedMotion={reducedMotion}
                />
              ))}

              {/* Highlight box (subtle proof, no clutter) */}
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute z-10 rounded-2xl border",
                  "border-[hsla(var(--primary)/0.55)] bg-[hsla(var(--primary)/0.08)]",
                  "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_18px_60px_rgba(0,0,0,0.25)]",
                  reducedMotion ? "" : "transition-all duration-300",
                  pin ? "opacity-100" : "opacity-0"
                )}
                style={{
                  left: `${pin.rect.x}%`,
                  top: `${pin.rect.y}%`,
                  width: `${pin.rect.w}%`,
                  height: `${pin.rect.h}%`,
                }}
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/65 to-transparent" />
            </div>
          </div>
        </div>

        {/* Minimal instruction (once, not repeated all over the page) */}
        <p className="mt-3 text-xs text-muted-foreground">
          Klik Voor en Na. Klik 1–3 voor uitleg.
        </p>

        {/* Explanation (below image, never blocking proof) */}
        <div className="mt-4 rounded-3xl border border-border/35 bg-background/20 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
                Wat verandert er
              </div>
              <div className="mt-1 font-headline text-base font-bold">
                {beforeOn ? "Waarom het nu niet werkt" : "Waarom dit beter werkt"}
              </div>
            </div>
            <Badge variant="outline" className="rounded-full">
              {beforeOn ? "Voor" : "Na"}
            </Badge>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {pins.map((p) => {
              const active = p.id === activePin;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActivePin(p.id)}
                  className={cn(
                    "rounded-2xl border p-3 text-left",
                    reducedMotion ? "" : "transition-colors",
                    active
                      ? "border-primary/50 bg-primary/10"
                      : "border-border/40 bg-background/10 hover:bg-background/20"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "grid h-7 w-7 place-items-center rounded-full border text-xs font-bold",
                        active
                          ? "border-primary/50 bg-primary/15 text-foreground"
                          : "border-border/50 bg-background/20 text-muted-foreground"
                      )}
                      aria-hidden="true"
                    >
                      {p.n}
                    </div>
                    <div className={cn("text-sm font-semibold", active ? "text-foreground" : "text-foreground/90")}>
                      {p.title}
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {p.body}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WebsitesHero({ mode, onModeChange }: WebsitesHeroProps) {
  const reducedMotion = usePrefersReducedMotion();

  // Default is bewust “Voor”
  const [view, setView] = React.useState<CompareView>("before");

  React.useEffect(() => {
    // Bij mode switch altijd terug naar “Voor”. Eerst pijn zien, dan verbetering.
    setView("before");
  }, [mode]);

  const copy = MODE_COPY[mode];

  return (
    <section aria-label="Horeca websites hero" className={cn(panel, panelInner, softGlow)}>
      <div className="grid gap-8 md:grid-cols-2">
        {/* LEFT */}
        <div className="relative p-7 md:p-10 lg:p-12">
          <div className="pointer-events-none absolute -top-10 -left-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

          <p className="font-headline text-primary text-sm font-bold tracking-widest uppercase">
            Horeca websites
          </p>

          <h1 className="mt-3 font-headline text-3xl md:text-5xl font-bold tracking-tight">
            Horeca websites die reserveringen opleveren.
            <span className="block text-muted-foreground">Rustig. Duidelijk. Gemaakt als service.</span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
            Geen druk design. Geen trucjes. Wel een flow die gasten direct naar reserveren, bellen of aanvragen stuurt.
            Jij krijgt rust. Je gast krijgt duidelijkheid.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              href="#quick-scan"
              className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
            >
              Vraag gratis quick scan aan
            </Link>
          </div>

          {/* MODE SWITCH */}
          <div className="mt-9">
            <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
              Kies je niveau
            </div>

            <div className="mt-3 max-w-md rounded-2xl border border-border/40 bg-background/20 p-2">
              <div className="grid grid-cols-3 gap-2">
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

            <div className="mt-6 grid gap-3 max-w-md sm:grid-cols-3">
              {copy.proof.map((p) => (
                <ProofPill key={p.label} label={p.label} value={p.value} />
              ))}
            </div>
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
