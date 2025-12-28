"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { WebsitesMode } from "./websites-types";
import { WEBSITE_MODES } from "./websites-types";

const cardBase =
  "relative rounded-3xl border border-border/35 bg-background/20 backdrop-blur";
const cardFocus =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsla(var(--primary)/0.45)]";

const MODE_LABEL: Record<WebsitesMode, { pill: string; title: string; sub: string }> = {
  simple: {
    pill: "Simple",
    title: "Snel live. Strak en betrouwbaar.",
    sub: "Voor als je vooral duidelijkheid wil, zonder gedoe.",
  },
  pro: {
    pill: "Pro",
    title: "Premium gevoel, zonder ruis.",
    sub: "Voor restaurants die meer vertrouwen en meer aanvragen willen.",
  },
  custom: {
    pill: "Custom",
    title: "Merkgevoel met high-end afwerking.",
    sub: "Voor merken die echt willen opvallen, maar wel rustig willen blijven.",
  },
};

const FEATURES: Record<WebsitesMode, string[]> = {
  simple: [
    "Structuur die mensen snappen in 5 seconden",
    "Reserveren, bellen of aanvragen staat altijd duidelijk",
    "Snel op mobiel en goed vindbaar in Google",
  ],
  pro: [
    "Sterkere volgorde, bezoekers besluiten sneller",
    "Meer vertrouwen door betere opbouw met reviews en locatie",
    "Knoppen en kaarten voelen echt af door duidelijke feedback",
  ],
  custom: [
    "Unieke opbouw die jouw verhaal draagt en toch rustig blijft",
    "Details met functie: focus, ritme en duidelijke keuzes",
    "Meer merkherkenning zonder dat je site druk wordt",
  ],
};

const ALWAYS_INCLUDED = [
  "Mobiel eerst, daarna desktop",
  "Duidelijke actieknoppen per sectie",
  "Snelle laadtijd en nette basis",
  "Contact werkt en je ziet wat het oplevert",
] as const;

const CTA_COPY: Record<WebsitesMode, { primary: string; secondary: string; valueLine: string }> = {
  simple: {
    primary: "Start gratis quick scan (Simple)",
    secondary: "Vraag offerte (Simple)",
    valueLine: "Je krijgt snel helderheid of Simple al genoeg is.",
  },
  pro: {
    primary: "Start gratis quick scan (Pro)",
    secondary: "Vraag offerte (Pro)",
    valueLine: "Je krijgt duidelijk welke verbeteringen het meeste aanvragen opleveren.",
  },
  custom: {
    primary: "Start gratis quick scan (Custom)",
    secondary: "Vraag offerte (Custom)",
    valueLine: "Je krijgt richting op merkgevoel, structuur en wat het echt moet opleveren.",
  },
};

function Pill({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        active
          ? "border-primary/45 bg-primary/10 text-foreground"
          : "border-border/40 bg-background/20 text-muted-foreground"
      )}
    >
      {children}
    </div>
  );
}

function Dot({ active }: { active: boolean }) {
  return (
    <div
      className={cn("h-2 w-2 rounded-full", active ? "bg-primary" : "bg-muted-foreground/35")}
      aria-hidden="true"
    />
  );
}

export default function BuildOptions({
  mode,
  onModeChange,
}: {
  mode: WebsitesMode;
  onModeChange: (m: WebsitesMode) => void;
}) {
  const groupLabelId = React.useId();
  const groupDescId = React.useId();

  const refs = React.useRef<Record<string, HTMLButtonElement | null>>({});

  function focusMode(next: WebsitesMode) {
    requestAnimationFrame(() => {
      refs.current[next]?.focus();
    });
  }

  function setModeAndFocus(next: WebsitesMode) {
    onModeChange(next);
    focusMode(next);
  }

  function nextMode(delta: number) {
    const idx = WEBSITE_MODES.indexOf(mode);
    const next = (idx + delta + WEBSITE_MODES.length) % WEBSITE_MODES.length;
    return WEBSITE_MODES[next];
  }

  const label = MODE_LABEL[mode];
  const cta = CTA_COPY[mode];

  // We geven de keuze mee in de URL. Later kan je /free-diagnosis dit gebruiken om de juiste diagnose te tonen.
  const primaryHref = `/free-diagnosis?service=websites&package=${mode}`;
  const secondaryHref = `/contact?service=websites&package=${mode}`;

  return (
    <section className="border-t border-border/60 bg-card/10 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 id={groupLabelId} className="font-headline text-3xl font-bold md:text-5xl">
            Pakketten
          </h2>
          <p id={groupDescId} className="mt-3 text-base text-muted-foreground md:text-lg">
            Kies wat je nu nodig hebt. Het voorbeeld bovenaan verandert direct mee.
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
            const l = MODE_LABEL[m];

            return (
              <button
                key={m}
                ref={(el) => {
                  refs.current[m] = el;
                }}
                type="button"
                onClick={() => onModeChange(m)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                    e.preventDefault();
                    setModeAndFocus(nextMode(1));
                  }
                  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    e.preventDefault();
                    setModeAndFocus(nextMode(-1));
                  }
                  if (e.key === "Home") {
                    e.preventDefault();
                    setModeAndFocus(WEBSITE_MODES[0]);
                  }
                  if (e.key === "End") {
                    e.preventDefault();
                    setModeAndFocus(WEBSITE_MODES[WEBSITE_MODES.length - 1]);
                  }
                }}
                className={cn(
                  cardBase,
                  cardFocus,
                  "p-7 text-left",
                  active ? "border-primary/45 bg-primary/5" : "hover:bg-background/25"
                )}
                role="radio"
                aria-checked={active}
                tabIndex={active ? 0 : -1}
              >
                <div className="flex items-center justify-between gap-3">
                  <Pill active={active}>{l.pill}</Pill>
                  <div className="flex items-center gap-2">
                    {active ? (
                      <span className="grid h-6 w-6 place-items-center rounded-full border border-primary/35 bg-primary/10">
                        <Check className="h-4 w-4 text-primary" />
                      </span>
                    ) : null}
                    <Dot active={active} />
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="font-headline text-2xl font-bold md:text-3xl">{l.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{l.sub}</p>
                </div>

                <ul className="mt-5 space-y-3">
                  {FEATURES[m].map((text) => (
                    <li key={text} className="flex items-start gap-3 text-sm text-foreground/90">
                      <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-md border border-border/45 bg-background/25">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </span>
                      <span className="leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {/* Action block: this is the point of clicking */}
        <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-border/35 bg-background/15 p-6 md:p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div aria-live="polite">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Jouw keuze
              </div>
              <div className="mt-2 font-headline text-xl font-bold md:text-2xl">
                {label.pill}: {label.title}
              </div>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                {cta.valueLine}
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 md:w-auto md:min-w-[280px]">
              <Link
                href={primaryHref}
                className={cn(buttonVariants({ size: "lg" }), "font-semibold rounded-2xl w-full justify-center")}
              >
                {cta.primary}
              </Link>
              <Link
                href={secondaryHref}
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "font-semibold rounded-2xl w-full justify-center"
                )}
              >
                {cta.secondary}
              </Link>
            </div>
          </div>

          <div className="mt-6 border-t border-border/35 pt-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Altijd inbegrepen
            </div>
            <div className="mt-2 font-headline text-xl font-bold md:text-2xl">
              De basis is altijd strak. Alleen de afwerking verandert.
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ALWAYS_INCLUDED.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border/35 bg-background/15 p-4 text-sm text-muted-foreground"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-md border border-border/45 bg-background/25">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Optional: keep this short, not salesy */}
        <div className="mx-auto mt-6 max-w-5xl text-center text-sm text-muted-foreground">
          Je kiest hierboven. Daarna kun je meteen starten. Geen gedoe.
        </div>
      </div>
    </section>
  );
}
