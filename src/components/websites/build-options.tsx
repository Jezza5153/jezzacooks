"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { WebsitesMode } from "./websites-types";
import { WEBSITE_MODES } from "./websites-types";

const cardBase =
  "rounded-3xl border border-border/35 bg-background/30 backdrop-blur";

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

const MODE_LABEL: Record<WebsitesMode, string> = {
  simple: "Simple",
  pro: "Pro",
  custom: "Custom",
};

const features: Record<WebsitesMode, { headline: string; bullets: string[] }> = {
  simple: {
    headline: "Snel live. Clean en betrouwbaar.",
    bullets: [
      "Heldere structuur met 1 duidelijke CTA per sectie",
      "Performance en basis SEO strak",
      "Perfect voor starters of een snelle upgrade",
    ],
  },
  pro: {
    headline: "Premium feel zonder ruis.",
    bullets: [
      "Sterkere hiërarchie en betere sectie-flow",
      "Micro-feedback op hover en states, geen circus",
      "Meer vertrouwen door betere copy en social proof",
    ],
  },
  custom: {
    headline: "Custom merkgevoel met high-end afwerking.",
    bullets: [
      "Storytelling layout met ritme en rust",
      "Unieke componenten die jouw merk dragen",
      "Details met functie, niet alleen mooi",
    ],
  },
};

function ModeChip({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        active
          ? "border-primary/40 bg-primary/10 text-foreground"
          : "border-border/40 bg-background/20 text-muted-foreground"
      )}
    >
      {children}
    </div>
  );
}

export default function BuildOptions({
  mode,
  onModeChange,
}: {
  mode: WebsitesMode;
  onModeChange: (m: WebsitesMode) => void;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const groupLabelId = React.useId();
  const groupDescId = React.useId();

  const cardHover = reducedMotion
    ? ""
    : "transition duration-300 hover:bg-background/40 hover:border-border/55 hover:shadow-[0_18px_70px_rgba(0,0,0,0.35)]";

  function move(delta: number) {
    const idx = WEBSITE_MODES.indexOf(mode);
    const next = (idx + delta + WEBSITE_MODES.length) % WEBSITE_MODES.length;
    onModeChange(WEBSITE_MODES[next]);
  }

  return (
    <section className="border-t border-border/60 bg-card/10 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            id={groupLabelId}
            className="font-headline text-3xl font-bold md:text-4xl"
          >
            Pakketten
          </h2>
          <p
            id={groupDescId}
            className="mt-3 text-base text-muted-foreground md:text-lg"
          >
            Zelfde basis. Andere afwerking. Klik en je ziet meteen wat het doet.
          </p>
        </div>

        <div
          className="mt-10 grid gap-6 md:grid-cols-3"
          role="radiogroup"
          aria-labelledby={groupLabelId}
          aria-describedby={groupDescId}
        >
          {WEBSITE_MODES.map((m) => {
            const active = m === mode;
            const f = features[m];

            return (
              <button
                key={m}
                type="button"
                onClick={() => onModeChange(m)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                    e.preventDefault();
                    move(1);
                  }
                  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    e.preventDefault();
                    move(-1);
                  }
                }}
                className={cn(
                  cardBase,
                  cardHover,
                  "p-7 text-left focus:outline-none focus:ring-2 focus:ring-primary/30",
                  active ? "border-primary/45 bg-primary/5" : "border-border/35"
                )}
                role="radio"
                aria-checked={active}
                aria-pressed={active}
              >
                <div className="flex items-center justify-between">
                  <ModeChip active={active}>{MODE_LABEL[m]}</ModeChip>
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      active ? "bg-primary" : "bg-muted-foreground/40"
                    )}
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-4 font-headline text-2xl font-bold">
                  {f.headline}
                </div>

                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary/55"
                        aria-hidden="true"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl border border-border/35 bg-background/20 p-4">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Sfeer
                  </div>
                  <div
                    className="mt-3 grid grid-cols-3 gap-2"
                    aria-hidden="true"
                  >
                    <div
                      className={cn(
                        "h-10 rounded-xl",
                        active ? "bg-primary/20" : "bg-muted/25"
                      )}
                    />
                    <div
                      className={cn(
                        "h-10 rounded-xl",
                        active ? "bg-muted/25" : "bg-muted/20"
                      )}
                    />
                    <div
                      className={cn(
                        "h-10 rounded-xl",
                        active ? "bg-muted/25" : "bg-muted/20"
                      )}
                    />
                  </div>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  Interactie is hier feedback: je klikt en de UI verandert. Geen decor.
                </p>
              </button>
            );
          })}
        </div>

        <div className={cn(cardBase, cardHover, "mt-10 p-7")}>
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Reality check
          </div>
          <div className="mt-2 font-headline text-2xl font-bold">
            Rust is omzet, geen luxe
          </div>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Hospitality sites moeten snel, helder en logisch zijn. Interactie is alleen premium als
            het de flow beter maakt. Daarom bouwen we eerst structuur en vertrouwen, en pas daarna
            voegen we details toe die echt waarde hebben.
          </p>
        </div>
      </div>
    </section>
  );
}
