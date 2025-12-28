"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { WebsitesMode } from "./websites-types";

const cardBase =
  "rounded-3xl border border-border/35 bg-background/30 backdrop-blur";
const cardHover =
  "transition duration-300 hover:bg-background/40 hover:border-border/55 hover:shadow-[0_18px_70px_rgba(0,0,0,0.35)]";

type Highlight = {
  title: string;
  desc: string;
  xPct: number; // 0-100
  yPct: number; // 0-100
};

type CompareAsset = {
  beforeSrc: string; // from /public
  afterSrc: string; // from /public
  beforeAlt: string;
  afterAlt: string;
  headline: string;
  body: string;
  metrics: { speed: string; bookings: string; clarity: string };
  highlights: Highlight[];
};

const ASSETS: Record<WebsitesMode, CompareAsset> = {
  simple: {
    beforeSrc: "/websites-demos/simple-before.webp",
    afterSrc: "/websites-demos/simple-after.webp",
    beforeAlt: "Before: onduidelijke horeca website met rommelige structuur",
    afterAlt: "After: snelle, duidelijke horeca website met heldere navigatie",
    headline: "Van druk naar duidelijk",
    body: "Less is more. Heldere structuur, snelle laadtijd, geen ruis.",
    metrics: { speed: "Sneller", bookings: "Meer aanvragen", clarity: "Meer overzicht" },
    highlights: [
      { title: "Heldere CTA", desc: "Boeken of bellen is direct zichtbaar.", xPct: 74, yPct: 22 },
      { title: "Logische secties", desc: "Menu, info, locatie in één flow.", xPct: 66, yPct: 52 },
      { title: "Snelheid", desc: "Minder rommel, sneller laden.", xPct: 80, yPct: 70 },
    ],
  },
  pro: {
    beforeSrc: "/websites-demos/pro-before.webp",
    afterSrc: "/websites-demos/pro-after.webp",
    beforeAlt: "Before: standaard horeca website zonder duidelijke hiërarchie",
    afterAlt: "After: premium horeca website met duidelijke flow en duidelijke CTA’s",
    headline: "Van oké naar premium",
    body: "Zelfde verhaal, maar beter gebouwd. Gasten snappen sneller waar ze moeten klikken.",
    metrics: { speed: "Sneller", bookings: "Hogere conversie", clarity: "Sterkere CTA’s" },
    highlights: [
      { title: "Hero met focus", desc: "Eén boodschap, één actie. Geen twijfel.", xPct: 72, yPct: 20 },
      { title: "Menu kaarten", desc: "Scanbare blokken, sneller kiezen.", xPct: 66, yPct: 54 },
      { title: "Reviews + trust", desc: "Social proof staat op de juiste plek.", xPct: 80, yPct: 72 },
    ],
  },
  custom: {
    beforeSrc: "/websites-demos/custom-before.webp",
    afterSrc: "/websites-demos/custom-after.webp",
    beforeAlt: "Before: generieke site zonder merkgevoel",
    afterAlt: "After: custom site met merkgevoel en high-end afwerking",
    headline: "Van website naar beleving",
    body: "Merkgevoel en ritme. Nog steeds rustig, maar duidelijk meer vertrouwen en kwaliteit.",
    metrics: { speed: "Snel en strak", bookings: "Top conversie", clarity: "Cinematic flow" },
    highlights: [
      { title: "Merkgevoel", desc: "Typo, spacing en ritme voelen als jouw zaak.", xPct: 70, yPct: 20 },
      { title: "Story sectie", desc: "Verhaal dat vertrouwen opbouwt.", xPct: 62, yPct: 55 },
      { title: "High-end details", desc: "Subtiele afwerking die keuzes begeleidt.", xPct: 82, yPct: 74 },
    ],
  },
};

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

function ToggleButton({
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

type CompareView = "before" | "after";

function Pin({
  index,
  h,
  visible,
  reducedMotion,
}: {
  index: number;
  h: Highlight;
  visible: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2",
        reducedMotion ? "" : "transition duration-300",
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}
      style={{ left: `${h.xPct}%`, top: `${h.yPct}%` }}
    >
      <div className="h-7 w-7 rounded-full border border-border/50 bg-background/70 backdrop-blur flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
        <span className="text-xs font-bold text-foreground">{index + 1}</span>
      </div>
    </div>
  );
}

export default function ResultsSlider({ mode }: { mode: WebsitesMode }) {
  const reducedMotion = usePrefersReducedMotion();
  const a = React.useMemo(() => ASSETS[mode], [mode]);

  const [view, setView] = React.useState<CompareView>("after");
  const [highlightsOn, setHighlightsOn] = React.useState(true);

  React.useEffect(() => {
    // Sales-first: als je van mode wisselt, laat altijd de “After” zien.
    setView("after");
    setHighlightsOn(true);
  }, [mode]);

  const fade = reducedMotion ? "" : "transition-opacity duration-300";
  const showPins = highlightsOn && view === "after";

  const activeSrc = view === "before" ? a.beforeSrc : a.afterSrc;
  const blurredSrc = activeSrc;

  return (
    <section id="resultaat" className="py-12 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">
          Dit is het verschil dat verkoopt
        </h2>
        <p className="mt-3 text-base md:text-lg text-muted-foreground">
          {a.body} Geen slider. Geen truc. Gewoon klikken en je ziet exact wat we beter maken.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        {/* PREVIEW */}
        <div className={cn(cardBase, "lg:col-span-3 p-6", cardHover)}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
                Before vs after
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Klik. Kijk. Snap het meteen.
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <SegmentedButton
                active={view === "before"}
                reducedMotion={reducedMotion}
                onClick={() => setView("before")}
              >
                Before
              </SegmentedButton>
              <SegmentedButton
                active={view === "after"}
                reducedMotion={reducedMotion}
                onClick={() => setView("after")}
              >
                After
              </SegmentedButton>

              <ToggleButton
                active={highlightsOn}
                reducedMotion={reducedMotion}
                onClick={() => setHighlightsOn((v) => !v)}
              >
                Highlights {highlightsOn ? "aan" : "uit"}
              </ToggleButton>
            </div>
          </div>

          <div className="mt-5 relative overflow-hidden rounded-3xl border border-border/35 bg-background/15">
            {/* Blurred cover fill background (no cut-off feel) */}
            <div className="absolute inset-0">
              <Image
                src={blurredSrc}
                alt=""
                aria-hidden="true"
                fill
                className={cn("object-cover blur-2xl scale-110 opacity-35")}
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
            </div>

            {/* Foreground contain preview */}
            <div className="relative p-4">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={a.beforeSrc}
                  alt={a.beforeAlt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 92vw"
                  className={cn("object-contain opacity-0", fade, view === "before" ? "opacity-100" : "opacity-0")}
                  priority={false}
                />
                <Image
                  src={a.afterSrc}
                  alt={a.afterAlt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 92vw"
                  className={cn("object-contain opacity-0", fade, view === "after" ? "opacity-100" : "opacity-0")}
                  priority={false}
                />

                {/* Pins (only in After + toggle on) */}
                {a.highlights.map((h, idx) => (
                  <Pin
                    key={h.title}
                    index={idx}
                    h={h}
                    visible={showPins}
                    reducedMotion={reducedMotion}
                  />
                ))}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/65 to-transparent" />
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="text-xs text-muted-foreground">
                  Status: <span className="font-semibold text-foreground/90">{view === "before" ? "Before" : "After"}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Highlights:{" "}
                  <span className="font-semibold text-foreground/90">
                    {highlightsOn ? "Aan" : "Uit"}
                  </span>
                </div>
              </div>
            </div>

            {/* Focus ring */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-0 focus-within:ring-2 focus-within:ring-primary/30" />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Animatie is hier alleen feedback: klik en de UI verandert. Geen decor.
          </p>
        </div>

        {/* RIGHT COPY */}
        <div className="lg:col-span-2 space-y-4">
          <div className={cn(cardBase, "p-6", cardHover)}>
            <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
              Wat verandert er echt
            </div>
            <div className="mt-2 font-headline text-2xl font-bold">
              {a.headline}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Dit is het punt: betere hiërarchie, rust en een flow die gasten richting actie duwt.
              Niet meer. Niet minder.
            </p>

            <div className="mt-4 grid gap-2">
              {a.highlights.map((h, idx) => (
                <div
                  key={h.title}
                  className={cn(
                    "rounded-2xl border border-border/40 bg-background/20 px-4 py-3",
                    showPins ? "" : "opacity-90"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
                      {idx + 1}. {h.title}
                    </div>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {h.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <MetricPill label="Speed" value={a.metrics.speed} />
            <MetricPill label="Conversie" value={a.metrics.bookings} />
            <MetricPill label="Duidelijkheid" value={a.metrics.clarity} />
          </div>
        </div>
      </div>
    </section>
  );
}
