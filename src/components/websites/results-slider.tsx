"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { WebsitesMode } from "./websites-types";

const cardBase = "rounded-3xl border border-border/35 bg-background/30 backdrop-blur";
const cardHover =
  "transition duration-300 hover:bg-background/40 hover:border-border/55 hover:shadow-[0_18px_70px_rgba(0,0,0,0.35)]";

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/25 px-4 py-3">
      <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
        {label}
      </div>
      <div className="mt-1 font-headline text-xl font-bold">{value}</div>
    </div>
  );
}

function FakeBeforeUI() {
  return (
    <div className="h-full w-full rounded-2xl border border-border/35 bg-background/20 p-5">
      <div className="h-5 w-40 rounded bg-muted/40" />
      <div className="mt-4 space-y-3">
        <div className="h-10 rounded bg-muted/30" />
        <div className="h-10 rounded bg-muted/30" />
        <div className="h-10 rounded bg-muted/30" />
      </div>
      <div className="mt-5 h-28 rounded bg-muted/20" />
      <div className="mt-4 flex gap-3">
        <div className="h-10 w-28 rounded bg-muted/35" />
        <div className="h-10 w-36 rounded bg-muted/25" />
      </div>
      <div className="mt-5 h-10 w-48 rounded bg-muted/20" />
    </div>
  );
}

function FakeAfterUI() {
  return (
    <div className="h-full w-full rounded-2xl border border-border/35 bg-background/25 p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-5 w-44 rounded bg-primary/25" />
          <div className="mt-2 h-4 w-72 rounded bg-muted/25" />
        </div>
        <div className="h-10 w-28 rounded-xl bg-primary/25" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="h-20 rounded-2xl bg-muted/20" />
        <div className="h-20 rounded-2xl bg-muted/20" />
        <div className="col-span-2 h-28 rounded-2xl bg-muted/15" />
      </div>

      <div className="mt-4 flex gap-3">
        <div className="h-10 w-32 rounded-xl bg-primary/20" />
        <div className="h-10 w-40 rounded-xl bg-muted/20" />
      </div>
    </div>
  );
}

function copyForMode(mode: WebsitesMode) {
  if (mode === "simple") {
    return {
      headline: "Van druk naar duidelijk",
      body: "Less is more. Heldere structuur, snelle laadtijd, geen ruis.",
      metrics: { speed: "Sneller", bookings: "Meer aanvragen", clarity: "Meer overzicht" },
    };
  }
  if (mode === "pro") {
    return {
      headline: "Van oké naar premium",
      body: "Micro-interactions en betere flow. Gasten snappen sneller waar ze moeten klikken.",
      metrics: { speed: "Sneller", bookings: "Hogere conversie", clarity: "Sterkere CTA’s" },
    };
  }
  return {
    headline: "Van website naar beleving",
    body: "Custom motion + merkgevoel. Voor brands die direct willen opvallen.",
    metrics: { speed: "Snel en strak", bookings: "Top conversie", clarity: "Cinematic flow" },
  };
}

export default function ResultsSlider({
  mode,
}: {
  mode: WebsitesMode;
}) {
  const [split, setSplit] = React.useState(52);
  const c = copyForMode(mode);

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Before vs after</h2>
          <p className="mt-3 text-base md:text-lg text-muted-foreground">
            {c.body}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <div className={cn(cardBase, "lg:col-span-3 p-6", cardHover)}>
            <div className="flex items-center justify-between">
              <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
                Slider
              </div>
              <div className="text-xs text-muted-foreground tabular-nums">{split}%</div>
            </div>

            <div className="mt-4 relative h-[320px] md:h-[360px] overflow-hidden rounded-3xl border border-border/35 bg-background/15">
              {/* AFTER base */}
              <div className="absolute inset-0 p-4">
                <FakeAfterUI />
              </div>

              {/* BEFORE overlay (clipped) */}
              <div className="absolute inset-0">
                <div
                  className="h-full overflow-hidden"
                  style={{ width: `${split}%` }}
                >
                  <div className="h-full p-4">
                    <FakeBeforeUI />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                className="absolute inset-y-0"
                style={{ left: `${split}%` }}
              >
                <div className="h-full w-px bg-border/60" />
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full border border-border/50 bg-background/60 backdrop-blur flex items-center justify-center">
                  <div className="h-4 w-4 rounded bg-primary/25" />
                </div>
              </div>

              {/* Labels */}
              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-border/40 bg-background/50 px-3 py-1 text-xs font-semibold text-muted-foreground">
                Before
              </div>
              <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-border/40 bg-background/50 px-3 py-1 text-xs font-semibold text-muted-foreground">
                After
              </div>
            </div>

            <input
              className="mt-5 w-full"
              type="range"
              min={10}
              max={90}
              value={split}
              onChange={(e) => setSplit(Number(e.target.value))}
              aria-label="Vergelijk before en after"
            />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className={cn(cardBase, "p-6", cardHover)}>
              <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
                Focus
              </div>
              <div className="mt-2 font-headline text-2xl font-bold">{c.headline}</div>
              <p className="mt-2 text-sm text-muted-foreground">
                We bouwen hospitality sites met dezelfde logica als service. Rust, snelheid, duidelijke keuzes.
              </p>
            </div>

            <div className="grid gap-3">
              <MetricPill label="Speed" value={c.metrics.speed} />
              <MetricPill label="Bookings" value={c.metrics.bookings} />
              <MetricPill label="Clarity" value={c.metrics.clarity} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
