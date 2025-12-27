"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { createTimeline, stagger } from "animejs";

type Mode = "simple" | "pro" | "custom";

const panel =
  "rounded-[34px] border border-border/35 bg-card/10 overflow-hidden";
const panelInner =
  "bg-gradient-to-b from-background/40 via-background/20 to-background/40";
const softGlow = "shadow-[0_0_90px_hsl(var(--primary)/0.12)]";

const modeCopy: Record<Mode, { title: string; desc: string }> = {
  simple: {
    title: "Simple",
    desc: "Clean, snel, duidelijk. Perfect als je wil dat het gewoon werkt.",
  },
  pro: {
    title: "Pro",
    desc: "Meer micro-interactions. Scroll reveals. Net dat extra premium gevoel.",
  },
  custom: {
    title: "Custom",
    desc: "Cinematic details. Unieke motion. Voor merken die willen opvallen.",
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

export default function WebsitesHero() {
  const [mode, setMode] = React.useState<Mode>("pro");
  const reducedMotion = usePrefersReducedMotion();
  const sceneRef = React.useRef<HeroSceneHandle | null>(null);

  // Scrub UI
  const [scrub, setScrub] = React.useState(0);
  const [isScrubbing, setIsScrubbing] = React.useState(false);

  React.useEffect(() => {
    sceneRef.current?.setMode(mode, true);
  }, [mode]);

  React.useEffect(() => {
    if (!isScrubbing) return;
    sceneRef.current?.pause();
  }, [isScrubbing]);

  return (
    <div className={cn(panel, panelInner, softGlow)}>
      <div className="grid md:grid-cols-2">
        {/* LEFT */}
        <div className="relative p-7 md:p-10 lg:p-12">
          <div className="pointer-events-none absolute -top-10 -left-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative">
            <p className="font-headline text-primary text-sm font-bold tracking-widest uppercase">
              Hospitality websites
            </p>

            <h1 className="mt-3 font-headline text-3xl md:text-5xl font-bold tracking-tight">
              Built like service.
              <span className="block text-muted-foreground">
                Clear. Fast. Consistent.
              </span>
            </h1>

            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Kies een style en zie live hoe jouw website wordt opgebouwd.
              Van clean en strak tot custom en cinematic.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
              >
                Plan een call
              </Link>
              <Link
                href="/results"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "font-semibold"
                )}
              >
                Bekijk voorbeelden
              </Link>
            </div>

            {/* MODE SWITCH */}
            <div className="mt-8">
              <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
                Kies een style
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 max-w-md">
                {(["simple", "pro", "custom"] as Mode[]).map((m) => {
                  const active = mode === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setMode(m);
                        if (isScrubbing) {
                          sceneRef.current?.setMode(m, true);
                        }
                      }}
                      className={cn(
                        "rounded-xl border px-3 py-2 text-sm font-semibold transition",
                        active
                          ? "border-primary/40 bg-primary/10 text-foreground"
                          : "border-border/40 bg-background/20 text-muted-foreground hover:bg-background/30"
                      )}
                    >
                      {modeCopy[m].title}
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 text-sm text-muted-foreground max-w-xl">
                {modeCopy[mode].desc}
              </p>

              {/* SCRUB */}
              <div className="mt-6 max-w-md">
                <div className="flex items-center justify-between">
                  <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
                    Timeline scrub
                  </div>
                  <div className="text-xs text-muted-foreground tabular-nums">
                    {scrub}%
                  </div>
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={scrub}
                  disabled={reducedMotion}
                  aria-label="Scrub de animatie"
                  onPointerDown={() => setIsScrubbing(true)}
                  onPointerUp={() => setIsScrubbing(false)}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setScrub(v);
                    sceneRef.current?.seek(v);
                  }}
                  className={cn(
                    "mt-3 w-full",
                    reducedMotion ? "opacity-50" : "opacity-100"
                  )}
                />

                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsScrubbing(false);
                      setScrub(0);
                      sceneRef.current?.replay();
                    }}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-xl"
                    )}
                    disabled={reducedMotion}
                    title={reducedMotion ? "Reduced motion staat aan" : "Replay"}
                  >
                    Replay
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsScrubbing(false);
                      sceneRef.current?.play();
                    }}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-xl"
                    )}
                    disabled={reducedMotion}
                  >
                    Play
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsScrubbing(true);
                      sceneRef.current?.pause();
                    }}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-xl"
                    )}
                    disabled={reducedMotion}
                  >
                    Pause
                  </button>
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  Tip: Custom heeft hover tilt op de laptop. Subtiel, premium.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative min-h-[360px] md:min-h-[560px]">
          <HeroScene
            ref={sceneRef}
            reducedMotion={reducedMotion}
            onProgress={(pct) => {
              if (!isScrubbing) setScrub(pct);
            }}
          />

          <div className="pointer-events-none absolute inset-y-0 left-0 w-[52%] bg-gradient-to-r from-background/95 via-background/55 to-transparent md:from-background/80" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
}

type HeroSceneHandle = {
  replay: () => void;
  setMode: (mode: Mode, instant?: boolean) => void;
  seek: (pct: number) => void;
  pause: () => void;
  play: () => void;
};

type HeroSceneProps = {
  reducedMotion: boolean;
  onProgress?: (pct: number) => void;
};

const HeroScene = React.forwardRef<HeroSceneHandle, HeroSceneProps>(
  function HeroScene({ reducedMotion, onProgress }, ref) {
    const rootRef = React.useRef<HTMLDivElement | null>(null);

    const tlRef = React.useRef<anime.AnimeTimelineInstance | null>(null);
    const currentMode = React.useRef<Mode>("pro");

    const tiltEnabledRef = React.useRef(false);
    const rafRef = React.useRef<number | null>(null);

    const lastProgressSync = React.useRef(0);

    const setInitial = React.useCallback(() => {
      // Dummy function, logic handled in buildTimeline now
    }, []);

    const applyMode = React.useCallback(
      (mode: Mode, instant = false) => {
        // Dummy function, logic handled in buildTimeline now
      },
      [reducedMotion]
    );

    const buildTimeline = React.useCallback(() => {
      const root = rootRef.current;
      if (!root) return null;

      const chef = root.querySelector<SVGPathElement>('[data-anim="chef"]');
      const laptop = root.querySelector<SVGGElement>('[data-anim="laptop"]');
      const lines = root.querySelectorAll<SVGRectElement>('[data-anim="line"]');

      if (!chef || !laptop) return null;

      const tl = createTimeline({
        autoplay: false,
        update: (anim) => {
          const now = performance.now();
          if (now - lastProgressSync.current < 50) return; // throttle
          lastProgressSync.current = now;
          onProgress?.(Math.round(anim.progress));
        },
      });

      tl.add({
        targets: chef,
        translateX: [-40, 0],
        opacity: [0, 1],
        duration: 650,
        easing: "easeOutExpo",
      })
        .add(
          {
            targets: laptop,
            translateY: [16, 0],
            opacity: [0, 1],
            duration: 550,
            easing: "easeOutQuad",
          },
          "-=250"
        )
        .add(
          {
            targets: lines,
            translateY: [10, 0],
            opacity: [0, 1],
            delay: stagger(70),
            duration: 420,
            easing: "easeOutQuad",
          },
          "-=150"
        );

      return tl;
    }, [onProgress]);

    const replay = React.useCallback(() => {
        tlRef.current?.seek(0);
        tlRef.current?.play();
    }, []);

    const pause = React.useCallback(() => {
      tlRef.current?.pause();
    }, []);

    const play = React.useCallback(() => {
      tlRef.current?.play();
    }, []);

    const seek = React.useCallback(
      (pct: number) => {
        const t = tlRef.current;
        if (!t) return;
        t.pause();
        const clamped = Math.max(0, Math.min(100, pct));
        t.seek(t.duration * (clamped / 100));
        onProgress?.(Math.round(clamped));
      },
      [onProgress]
    );

    React.useImperativeHandle(ref, () => ({
      replay,
      setMode: (m: Mode, instant = false) => applyMode(m, instant),
      seek,
      pause,
      play,
    }));

    React.useEffect(() => {
      tlRef.current = buildTimeline();
      tlRef.current?.play();

      return () => {
        tlRef.current?.pause();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div ref={rootRef} className="absolute inset-0">
        <svg
          viewBox="0 0 900 700"
          className="h-full w-full"
          role="img"
          aria-label="Chef bouwt een website op een laptop"
        >
          <defs>
            <radialGradient id="glow" cx="70%" cy="40%" r="60%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
              <stop offset="55%" stopColor="hsl(var(--primary))" stopOpacity="0.06" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="900" height="700" fill="url(#glow)" />
          
          <g data-anim="chef" opacity="0">
             <path
              d="M110 20 C140 0, 190 0, 205 28 C230 10, 260 30, 250 60 C270 70, 270 110, 238 120
                 C240 160, 210 190, 175 190 C140 190, 110 160, 112 120
                 C80 110, 80 70, 105 60 C95 32, 125 10, 150 28
                 C158 24, 170 24, 175 28"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M175 190 C175 250, 155 280, 125 305 C105 322, 92 340, 92 365
                 M175 190 C175 250, 195 280, 225 305 C245 322, 258 340, 258 365"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          <g data-anim="laptop" opacity="0" transform="translate(350,140)">
              <rect x="60" y="40" width="520" height="420" rx="26" fill="hsl(var(--card))" opacity="0.85" />
              <rect x="76" y="56" width="488" height="388" rx="18" fill="hsl(var(--background))" opacity="0.65" stroke="hsl(var(--border))" strokeOpacity="0.35" />
              <g data-anim="line" opacity="0"><rect x={104} y={78} width={332} height={18} rx="9" fill="hsl(var(--primary))" opacity="0.9" /></g>
              <g data-anim="line" opacity="0"><rect x={104} y={108} width={332} height={78} rx="16" fill="hsl(var(--foreground))" opacity="0.08" /></g>
              <g data-anim="line" opacity="0"><rect x={104} y={194} width={160} height={22} rx="11" fill="hsl(var(--primary))" opacity="0.75" /></g>
              <g data-anim="line" opacity="0"><rect x={104} y={230} width={158} height={56} rx="16" fill="hsl(var(--foreground))" opacity="0.07" /></g>
              <g data-anim="line" opacity="0"><rect x={278} y={230} width={158} height={56} rx="16" fill="hsl(var(--foreground))" opacity="0.07" /></g>
              <g data-anim="line" opacity="0"><rect x={104} y={292} width={332} height={56} rx="16" fill="hsl(var(--foreground))" opacity="0.06" /></g>
          </g>
        </svg>
      </div>
    );
  }
);