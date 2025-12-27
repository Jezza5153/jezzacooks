
"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { animate, createTimeline, stagger, set } from "animejs";

type Mode = "simple" | "pro" | "custom";

const panel = "rounded-[34px] border border-border/35 bg-card/10 overflow-hidden";
const panelInner = "bg-gradient-to-b from-background/40 via-background/20 to-background/40";
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

export default function WebsitesHero() {
  const [mode, setMode] = React.useState<Mode>("pro");
  const reducedMotion = usePrefersReducedMotion();
  const sceneRef = React.useRef<HeroSceneHandle | null>(null);

  // Scrub UI
  const [scrub, setScrub] = React.useState(0);
  const [isScrubbing, setIsScrubbing] = React.useState(false);

  React.useEffect(() => {
    sceneRef.current?.setMode(mode, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <span className="block text-muted-foreground">Clear. Fast. Consistent.</span>
            </h1>

            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Kies een style en zie live hoe jouw website wordt opgebouwd. Van clean en strak tot
              custom en cinematic.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "font-semibold")}>
                Plan een call
              </Link>
              <Link
                href="/results"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold")}
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
                      aria-pressed={active}
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

              <p className="mt-3 text-sm text-muted-foreground max-w-xl">{modeCopy[mode].desc}</p>

              {/* SCRUB */}
              <div className="mt-6 max-w-md">
                <div className="flex items-center justify-between">
                  <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
                    Timeline scrub
                  </div>
                  <div className="text-xs text-muted-foreground tabular-nums">{scrub}%</div>
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
                  className={cn("mt-3 w-full", reducedMotion ? "opacity-50" : "opacity-100")}
                />

                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsScrubbing(false);
                      setScrub(0);
                      sceneRef.current?.replay();
                    }}
                    className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}
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
                    className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}
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
                    className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}
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

const HeroScene = React.forwardRef<HeroSceneHandle, HeroSceneProps>(function HeroScene(
  { reducedMotion, onProgress },
  ref
) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  type Timeline = ReturnType<typeof createTimeline>;
  const tlRef = React.useRef<Timeline | null>(null);

  const modeRef = React.useRef<Mode>("pro");
  const pctRef = React.useRef(0);

  const tiltCleanupRef = React.useRef<null | (() => void)>(null);
  const tiltRafRef = React.useRef<number | null>(null);

  const throttleRef = React.useRef(0);

  const getEls = React.useCallback(() => {
    const root = rootRef.current;
    if (!root) return null;

    const chef = root.querySelector<SVGGElement>('[data-anim="chef"]');
    const laptopWrap = root.querySelector<SVGGElement>('[data-anim="laptopWrap"]');
    const laptopTilt = root.querySelector<SVGGElement>('[data-anim="laptopTilt"]');
    const lines = root.querySelectorAll<SVGRectElement>('[data-anim="line"]');
    const cursor = root.querySelector<SVGRectElement>('[data-anim="cursor"]');
    const glow = root.querySelector<SVGRectElement>('[data-anim="screenGlow"]');

    if (!chef || !laptopWrap || !laptopTilt) return null;

    return { chef, laptopWrap, laptopTilt, lines, cursor, glow };
  }, []);

  const cleanupTilt = React.useCallback(() => {
    if (tiltCleanupRef.current) {
      tiltCleanupRef.current();
      tiltCleanupRef.current = null;
    }
    if (tiltRafRef.current) {
      cancelAnimationFrame(tiltRafRef.current);
      tiltRafRef.current = null;
    }
  }, []);

  const enableTilt = React.useCallback(() => {
    cleanupTilt();
    const root = rootRef.current;
    const els = getEls();
    if (!root || !els) return;

    const { laptopTilt } = els;

    // Ensure CSS transforms behave on SVG <g>
    laptopTilt.style.transformBox = "fill-box";
    laptopTilt.style.transformOrigin = "center";

    let targetRX = 0;
    let targetRY = 0;
    let currentRX = 0;
    let currentRY = 0;

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Only react mostly on the right half (keeps it feeling intentional)
      const weight = Math.max(0, Math.min(1, (x - 0.45) / 0.55));

      const ry = (x - 0.75) * 10 * weight; // degrees
      const rx = -(y - 0.5) * 8 * weight;

      targetRX = rx;
      targetRY = ry;

      if (tiltRafRef.current) return;
      tiltRafRef.current = requestAnimationFrame(() => {
        tiltRafRef.current = null;

        // Smooth
        currentRX = currentRX + (targetRX - currentRX) * 0.14;
        currentRY = currentRY + (targetRY - currentRY) * 0.14;

        laptopTilt.style.transform = `rotate(${currentRY}deg)`;
        // Rotate only (2D) to avoid browser SVG 3D inconsistencies.
      });
    };

    const onLeave = () => {
      targetRX = 0;
      targetRY = 0;
      if (tiltRafRef.current) return;

      tiltRafRef.current = requestAnimationFrame(() => {
        tiltRafRef.current = null;
        currentRX = 0;
        currentRY = 0;
        laptopTilt.style.transform = "rotate(0deg)";
      });
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);

    tiltCleanupRef.current = () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      laptopTilt.style.transform = "rotate(0deg)";
    };
  }, [cleanupTilt, getEls]);

  const buildTimeline = React.useCallback(
    (mode: Mode) => {
      const els = getEls();
      if (!els) return null;

      const { chef, laptopWrap, lines, cursor, glow } = els;

      // Reset scene deterministically
      set(chef, { opacity: 0, translateX: -46 });
      set(laptopWrap, { opacity: 0, translateY: 18 });
      set(lines, { opacity: 0, translateY: 10 });
      if (cursor) set(cursor, { opacity: 0 });
      if (glow) set(glow, { opacity: 0 });

      const timings =
        mode === "simple"
          ? { chef: 520, laptop: 440, lines: 320, stagger: 55 }
          : mode === "pro"
          ? { chef: 650, laptop: 520, lines: 420, stagger: 70 }
          : { chef: 720, laptop: 560, lines: 460, stagger: 80 };

      const tl = createTimeline({
        autoplay: false,
        onUpdate: (self) => {
          const now = performance.now();
          if (now - throttleRef.current < 50) return;
          throttleRef.current = now;

          const duration = Math.max(1, self.duration || 1);
          const pct = Math.round((self.currentTime / duration) * 100);
          const clamped = Math.max(0, Math.min(100, pct));

          pctRef.current = clamped;
          onProgress?.(clamped);
        },
      });

      tl.add({
        target: chef,
        opacity: 1,
        translateX: 0,
        duration: timings.chef,
        ease: mode === "simple" ? "outQuad" : "outExpo",
      });

      tl.add(
        {
          target: laptopWrap,
          opacity: 1,
          translateY: 0,
          duration: timings.laptop,
          ease: "outQuad",
        },
        "-=240"
      );

      tl.add(
        {
          target: lines,
          opacity: 1,
          translateY: 0,
          delay: stagger(timings.stagger),
          duration: timings.lines,
          ease: "outQuad",
        },
        "-=170"
      );

      // Pro and Custom: cursor blink + subtle glow pulse
      if (mode !== "simple") {
        if (cursor) {
          tl.add(
            { target: cursor, opacity: 1, duration: 1, ease: "linear" },
            "-=280"
          )
            .add({ target: cursor, opacity: 0.15, duration: 180, ease: "inOutQuad" })
            .add({ target: cursor, opacity: 1, duration: 160, ease: "inOutQuad" })
            .add({ target: cursor, opacity: 0.2, duration: 220, ease: "inOutQuad" });
        }

        if (glow) {
          tl.add(
            { target: glow, opacity: 1, duration: 260, ease: "outQuad" },
            "-=520"
          ).add({ target: glow, opacity: 0, duration: 520, ease: "outQuad" });
        }
      }

      // Make sure the first frame is applied immediately
      tl.seek(0);

      if (reducedMotion) {
        tl.seek(tl.duration);
        tl.pause();
        onProgress?.(100);
      }

      return tl;
    },
    [getEls, onProgress, reducedMotion]
  );

  const setMode = React.useCallback(
    (next: Mode, instant = false) => {
      modeRef.current = next;

      cleanupTilt();
      if (next === "custom" && !reducedMotion) enableTilt();

      // rebuild timeline
      tlRef.current?.pause();
      tlRef.current = buildTimeline(next);

      const t = tlRef.current;
      if (!t) return;

      if (reducedMotion) return;

      if (instant) {
        const pct = pctRef.current;
        const time = t.duration * (Math.max(0, Math.min(100, pct)) / 100);
        t.seek(time);
        t.pause();
        onProgress?.(Math.round(pct));
        return;
      }

      pctRef.current = 0;
      onProgress?.(0);
      t.seek(0);
      t.play();
    },
    [buildTimeline, cleanupTilt, enableTilt, onProgress, reducedMotion]
  );

  const replay = React.useCallback(() => {
    const t = tlRef.current;
    if (!t) return;
    pctRef.current = 0;
    onProgress?.(0);
    t.seek(0);
    t.play();
  }, [onProgress]);

  const pause = React.useCallback(() => {
    tlRef.current?.pause();
  }, []);

  const play = React.useCallback(() => {
    if (reducedMotion) return;
    tlRef.current?.play();
  }, [reducedMotion]);

  const seekPct = React.useCallback(
    (pct: number) => {
      const t = tlRef.current;
      if (!t) return;

      const clamped = Math.max(0, Math.min(100, pct));
      const time = t.duration * (clamped / 100);

      pctRef.current = clamped;

      t.pause();
      t.seek(time);

      onProgress?.(Math.round(clamped));
    },
    [onProgress]
  );

  React.useImperativeHandle(ref, () => ({
    replay,
    setMode,
    seek: seekPct,
    pause,
    play,
  }));

  React.useEffect(() => {
    // init
    tlRef.current = buildTimeline(modeRef.current);
    if (!reducedMotion) tlRef.current?.play();

    if (modeRef.current === "custom" && !reducedMotion) enableTilt();

    return () => {
      tlRef.current?.pause();
      cleanupTilt();
    };
  }, [buildTimeline, cleanupTilt, enableTilt, reducedMotion]);

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

        <rect x={0} y={0} width={900} height={700} fill="url(#glow)" />

        {/* CHEF */}
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

        {/* LAPTOP WRAP (Anime transforms) */}
        <g data-anim="laptopWrap" opacity="0" transform="translate(350,140)">
          {/* LAPTOP TILT (CSS transform only) */}
          <g data-anim="laptopTilt">
            <rect x="60" y="40" width="520" height="420" rx="26" fill="hsl(var(--card))" opacity="0.85" />
            <rect
              x="76"
              y="56"
              width="488"
              height="388"
              rx="18"
              fill="hsl(var(--background))"
              opacity="0.65"
              stroke="hsl(var(--border))"
              strokeOpacity="0.35"
            />

            {/* Subtle screen glow pulse (Pro/Custom) */}
            <rect
              data-anim="screenGlow"
              x="76"
              y="56"
              width="488"
              height="388"
              rx="18"
              fill="hsl(var(--primary))"
              opacity="0"
            />

            {/* Fake layout blocks */}
            <rect data-anim="line" x="104" y="78" width="332" height="18" rx="9" fill="hsl(var(--primary))" opacity="0" />
            <rect data-anim="line" x="104" y="108" width="332" height="78" rx="16" fill="hsl(var(--foreground))" opacity="0" />
            <rect data-anim="line" x="104" y="194" width="160" height="22" rx="11" fill="hsl(var(--primary))" opacity="0" />
            <rect data-anim="line" x="104" y="230" width="158" height="56" rx="16" fill="hsl(var(--foreground))" opacity="0" />
            <rect data-anim="line" x="278" y="230" width="158" height="56" rx="16" fill="hsl(var(--foreground))" opacity="0" />
            <rect data-anim="line"x="104" y="292" width="332" height="56" rx="16" fill="hsl(var(--foreground))" opacity="0" />

            {/* Cursor */}
            <rect data-anim="cursor" x="455" y="112" width="10" height="20" rx="4" fill="hsl(var(--primary))" opacity="0" />
          </g>
        </g>
      </svg>
    </div>
  );
});
HeroScene.displayName = "HeroScene";
