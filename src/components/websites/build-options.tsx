"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { WebsitesMode } from "./websites-types";
import { WEBSITE_MODES } from "./websites-types";

const cardBase = "rounded-3xl border border-border/35 bg-background/30 backdrop-blur";
const cardHover =
  "transition duration-300 hover:bg-background/40 hover:border-border/55 hover:shadow-[0_18px_70px_rgba(0,0,0,0.35)]";

const features: Record<WebsitesMode, { headline: string; bullets: string[] }> = {
  simple: {
    headline: "Snel live. Clean en betrouwbaar.",
    bullets: [
      "Snel design, helder menu, duidelijke CTA",
      "SEO basics goed, laadtijd strak",
      "Perfect voor starters of tweede locatie",
    ],
  },
  pro: {
    headline: "Premium feel zonder circus.",
    bullets: [
      "Micro-interactions op scroll en hover",
      "Sterke sectie-opbouw met duidelijke flow",
      "Meer conversie door betere hiërarchie",
    ],
  },
  custom: {
    headline: "Volledig merkgevoel en motion.",
    bullets: [
      "Cinematic details die je merk dragen",
      "Unieke componenten en storytelling",
      "Voor brands die willen opvallen in hun regio",
    ],
  },
};

function ModeChip({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        active ? "border-primary/40 bg-primary/10 text-foreground" : "border-border/40 bg-background/20 text-muted-foreground"
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
  return (
    <section className="py-12 md:py-20 border-t border-border/60 bg-card/10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Build options</h2>
          <p className="mt-3 text-base md:text-lg text-muted-foreground">
            Zelfde basis. Andere beleving. Klik en zie hoe de page mee verandert.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {WEBSITE_MODES.map((m) => {
            const active = m === mode;
            const f = features[m];

            return (
              <button
                key={m}
                type="button"
                onClick={() => onModeChange(m)}
                className={cn(
                  cardBase,
                  cardHover,
                  "text-left p-7 focus:outline-none focus:ring-2 focus:ring-primary/30",
                  active ? "border-primary/45 bg-primary/5" : "border-border/35"
                )}
                aria-pressed={active}
              >
                <div className="flex items-center justify-between">
                  <ModeChip active={active}>{m.toUpperCase()}</ModeChip>
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      active ? "bg-primary" : "bg-muted-foreground/40"
                    )}
                  />
                </div>

                <div className="mt-4 font-headline text-2xl font-bold">
                  {f.headline}
                </div>

                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary/55 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl border border-border/35 bg-background/20 p-4">
                  <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
                    Preview vibe
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div className={cn("h-10 rounded-xl", active ? "bg-primary/20" : "bg-muted/25")} />
                    <div className={cn("h-10 rounded-xl", active ? "bg-muted/25" : "bg-muted/20")} />
                    <div className={cn("h-10 rounded-xl", active ? "bg-muted/25" : "bg-muted/20")} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className={cn(cardBase, "mt-10 p-7", cardHover)}>
          <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
            Reality check
          </div>
          <div className="mt-2 font-headline text-2xl font-bold">
            Endless possibilities, maar wel met structuur
          </div>
          <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
            Hospitality sites moeten snel, helder en logisch zijn. Motion is alleen premium als het de flow beter maakt.
            Daarom bouwen we eerst de basis, en daarna voegen we details toe waar ze echt waarde hebben.
          </p>
        </div>
      </div>
    </section>
  );
}
