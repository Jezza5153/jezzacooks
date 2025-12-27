// src/components/websites/websites-hero.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import anime from "animejs";

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

  // Scrub UI
  const [scrub, setScrub] = React.useState(0);
  const [isScrubbing, setIsScrubbing] = React.useState(false);

  const sceneRef = React.useRef<HeroSceneHandle | null>(null);

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
                        // If user is scrubbing, keep it instant and stable
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
              // Only sync slider while user is not manually dragging
              if (!isScrubbing) setScrub(pct);
            }}
          />

          {/* left-to-right blend so the scene melts into the panel */}
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
      const root = rootRef.current;
      if (!root) return;

      const chef = root.querySelectorAll<SVGPathElement>(".chef-path");
      const laptopOuter = root.querySelector<SVGGElement>(".laptop-outer");
      const laptopTilt = root.querySelector<SVGGElement>(".laptop-tilt");
      const blocks = root.querySelectorAll<SVGRectElement>(".ui-block");
      const cursor = root.querySelector<SVGCircleElement>(".cursor-dot");

      anime.set(chef, { strokeDashoffset: 1200, opacity: 1 });
      anime.set(laptopOuter, { opacity: 0, translateX: 30, translateY: 10, scale: 0.98 });
      anime.set(laptopTilt, { rotate: 0, translateX: 0, translateY: 0 });
      anime.set(blocks, { opacity: 0, translateY: 8 });
      anime.set(cursor, { opacity: 0, translateX: 0, translateY: 0 });
    }, []);

    const applyMode = React.useCallback(
      (mode: Mode, instant = false) => {
        const root = rootRef.current;
        if (!root) return;

        currentMode.current = mode;
        tiltEnabledRef.current = mode === "custom" && !reducedMotion;

        const b = (name: string) =>
          root.querySelector<SVGRectElement>(`.ui-block[data-b="${name}"]`);

        const targets = [
          b("topbar"),
          b("hero"),
          b("cta"),
          b("card1"),
          b("card2"),
          b("card3"),
          b("code1"),
          b("code2"),
          b("code3"),
        ].filter(Boolean) as SVGRectElement[];

        const cfg: Record<Mode, Record<string, { x: number; y: number; width: number; height: number; opacity: number }>> =
          {
            simple: {
              topbar: { x: 110, y: 84, width: 320, height: 18, opacity: 1 },
              hero: { x: 110, y: 112, width: 320, height: 70, opacity: 1 },
              cta: { x: 110, y: 190, width: 140, height: 20, opacity: 1 },
              card1: { x: 110, y: 222, width: 320, height: 42, opacity: 1 },
              card2: { x: 110, y: 272, width: 320, height: 42, opacity: 1 },
              card3: { x: 110, y: 322, width: 320, height: 42, opacity: 1 },
              code1: { x: 110, y: 380, width: 250, height: 10, opacity: 0.4 },
              code2: { x: 110, y: 396, width: 220, height: 10, opacity: 0.25 },
              code3: { x: 110, y: 412, width: 200, height: 10, opacity: 0.15 },
            },
            pro: {
              topbar: { x: 104, y: 78, width: 332, height: 18, opacity: 1 },
              hero: { x: 104, y: 108, width: 332, height: 78, opacity: 1 },
              cta: { x: 104, y: 194, width: 160, height: 22, opacity: 1 },
              card1: { x: 104, y: 230, width: 158, height: 56, opacity: 1 },
              card2: { x: 278, y: 230, width: 158, height: 56, opacity: 1 },
              card3: { x: 104, y: 292, width: 332, height: 56, opacity: 1 },
              code1: { x: 104, y: 368, width: 290, height: 10, opacity: 0.55 },
              code2: { x: 104, y: 384, width: 260, height: 10, opacity: 0.35 },
              code3: { x: 104, y: 400, width: 240, height: 10, opacity: 0.2 },
            },
            custom: {
              topbar: { x: 98, y: 74, width: 344, height: 18, opacity: 1 },
              hero: { x: 98, y: 104, width: 344, height: 84, opacity: 1 },
              cta: { x: 98, y: 196, width: 176, height: 24, opacity: 1 },
              card1: { x: 98, y: 236, width: 110, height: 66, opacity: 1 },
              card2: { x: 220, y: 236, width: 110, height: 66, opacity: 1 },
              card3: { x: 332, y: 236, width: 110, height: 66, opacity: 1 },
              code1: { x: 98, y: 326, width: 300, height: 10, opacity: 0.65 },
              code2: { x: 98, y: 342, width: 280, height: 10, opacity: 0.45 },
              code3: { x: 98, y: 358, width: 260, height: 10, opacity: 0.3 },
            },
          };

        const next = cfg[mode];

        targets.forEach((el) => {
          const name = el.dataset.b || "";
          const v = next[name];
          if (!v) return;

          if (instant || reducedMotion) {
            el.setAttribute("x", String(v.x));
            el.setAttribute("y", String(v.y));
            el.setAttribute("width", String(v.width));
            el.setAttribute("height", String(v.height));
            el.style.opacity = String(v.opacity);
            el.style.transform = "translateY(0px)";
            return;
          }

          anime({
            targets: el,
            duration: 520,
            easing: "easeOutCubic",
            opacity: v.opacity,
            translateY: [8, 0],
            x: v.x,
            y: v.y,
            width: v.width,
            height: v.height,
          });
        });
      },
      [reducedMotion]
    );

    const buildTimeline = React.useCallback(() => {
      const root = rootRef.current;
      if (!root) return null;

      const chef = root.querySelectorAll<SVGPathElement>(".chef-path");
      const laptopOuter = root.querySelector<SVGGElement>(".laptop-outer");
      const blocks = root.querySelectorAll<SVGRectElement>(".ui-block");
      const cursor = root.querySelector<SVGCircleElement>(".cursor-dot");

      const tl = anime.timeline({
        autoplay: false,
        update: () => {
          const t = tlRef.current;
          if (!t || !onProgress) return;

          const now = performance.now();
          if (now - lastProgressSync.current < 50) return; // throttle
          lastProgressSync.current = now;

          const pct = Math.round((t.progress || 0));
          onProgress(pct);
        },
      });

      tl.add({
        targets: chef,
        strokeDashoffset: [1200, 0],
        duration: 1200,
        easing: "easeOutQuart",
        delay: anime.stagger(120),
      })
        .add(
          {
            targets: laptopOuter,
            opacity: [0, 1],
            translateX: [30, 0],
            translateY: [10, 0],
            scale: [0.98, 1],
            duration: 700,
            easing: "easeOutCubic",
          },
          "-=420"
        )
        .add(
          {
            targets: blocks,
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 520,
            delay: anime.stagger(80),
            easing: "easeOutCubic",
          },
          "-=240"
        )
        .add(
          {
            targets: cursor,
            opacity: [0, 1],
            duration: 240,
            easing: "linear",
          },
          "-=320"
        )
        .add(
          {
            targets: cursor,
            translateX: [0, 140],
            translateY: [0, 12],
            duration: 820,
            easing: "easeInOutSine",
          },
          "-=80"
        )
        .add({
          targets: cursor,
          opacity: [1, 0],
          duration: 180,
          easing: "linear",
        });

      return tl;
    }, [onProgress]);

    const replay = React.useCallback(() => {
      const root = rootRef.current;
      if (!root) return;

      if (reducedMotion) {
        setInitial();
        const chef = root.querySelectorAll<SVGPathElement>(".chef-path");
        const laptopOuter = root.querySelector<SVGGElement>(".laptop-outer");
        const laptopTilt = root.querySelector<SVGGElement>(".laptop-tilt");
        const blocks = root.querySelectorAll<SVGRectElement>(".ui-block");
        const cursor = root.querySelector<SVGCircleElement>(".cursor-dot");

        anime.set(chef, { strokeDashoffset: 0, opacity: 1 });
        anime.set(laptopOuter, { opacity: 1, translateX: 0, translateY: 0, scale: 1 });
        anime.set(laptopTilt, { rotate: 0, translateX: 0, translateY: 0 });
        anime.set(blocks, { opacity: 1, translateY: 0 });
        anime.set(cursor, { opacity: 0 });

        applyMode(currentMode.current, true);
        onProgress?.(100);
        return;
      }

      setInitial();
      applyMode(currentMode.current, true);

      tlRef.current?.pause();
      tlRef.current = buildTimeline();
      tlRef.current?.play();

      // after intro, polish mode shape
      setTimeout(() => applyMode(currentMode.current, false), 260);
    }, [applyMode, buildTimeline, onProgress, reducedMotion, setInitial]);

    const pause = React.useCallback(() => {
      tlRef.current?.pause();
    }, []);

    const play = React.useCallback(() => {
      if (reducedMotion) return;
      if (!tlRef.current) return;
      tlRef.current.play();
    }, [reducedMotion]);

    const seek = React.useCallback(
      (pct: number) => {
        const t = tlRef.current;
        if (!t) return;
        t.pause();
        const clamped = Math.max(0, Math.min(100, pct));
        const ms = (t.duration * clamped) / 100;
        t.seek(ms);
        onProgress?.(Math.round(clamped));
        applyMode(currentMode.current, true);
      },
      [applyMode, onProgress]
    );

    // Tilt (Custom only), on the inner laptop group so timeline transforms stay clean
    const installTilt = React.useCallback(() => {
      const root = rootRef.current;
      if (!root) return;

      const laptopTilt = root.querySelector<SVGGElement>(".laptop-tilt");
      if (!laptopTilt) return;

      let lastX = 0;
      let lastY = 0;

      const apply = () => {
        rafRef.current = null;
        if (!tiltEnabledRef.current) return;

        const rect = laptopTilt.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = (lastX - cx) / rect.width; // -0.5 to 0.5-ish
        const dy = (lastY - cy) / rect.height;

        const rot = dx * 3.5; // degrees
        const tx = dx * 10; // px
        const ty = dy * 6;

        // Smoothly set via anime for a premium feel
        anime.remove(laptopTilt);
        anime({
          targets: laptopTilt,
          duration: 180,
          easing: "easeOutCubic",
          rotate: rot,
          translateX: tx,
          translateY: ty,
        });
      };

      const onMove = (e: PointerEvent) => {
        if (!tiltEnabledRef.current) return;
        lastX = e.clientX;
        lastY = e.clientY;
        if (rafRef.current) return;
        rafRef.current = window.requestAnimationFrame(apply);
      };

      const onLeave = () => {
        if (!laptopTilt) return;
        anime.remove(laptopTilt);
        anime({
          targets: laptopTilt,
          duration: 260,
          easing: "easeOutCubic",
          rotate: 0,
          translateX: 0,
          translateY: 0,
        });
      };

      root.addEventListener("pointermove", onMove, { passive: true });
      root.addEventListener("pointerleave", onLeave, { passive: true });

      return () => {
        root.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerleave", onLeave);
        if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      };
    }, []);

    React.useImperativeHandle(ref, () => ({
      replay,
      setMode: (m: Mode, instant = false) => applyMode(m, instant),
      seek,
      pause,
      play,
    }));

    React.useEffect(() => {
      // init timeline once
      setInitial();
      applyMode(currentMode.current, true);
      tlRef.current = buildTimeline();
      tlRef.current?.play();

      const cleanupTilt = installTilt();

      return () => {
        tlRef.current?.pause();
        cleanupTilt?.();
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
          {/* ambient glow */}
          <defs>
            <radialGradient id="glow" cx="70%" cy="40%" r="60%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
              <stop offset="55%" stopColor="hsl(var(--primary))" stopOpacity="0.06" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="900" height="700" fill="url(#glow)" />

          {/* CHEF line art */}
          <g transform="translate(90,170)">
            <path
              className="chef-path"
              d="M110 20 C140 0, 190 0, 205 28 C230 10, 260 30, 250 60 C270 70, 270 110, 238 120
                 C240 160, 210 190, 175 190 C140 190, 110 160, 112 120
                 C80 110, 80 70, 105 60 C95 32, 125 10, 150 28
                 C158 24, 170 24, 175 28"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray: 1200, strokeDashoffset: 1200 }}
            />
            <path
              className="chef-path"
              d="M175 190 C175 250, 155 280, 125 305 C105 322, 92 340, 92 365
                 M175 190 C175 250, 195 280, 225 305 C245 322, 258 340, 258 365"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray: 1200, strokeDashoffset: 1200 }}
            />
            <path
              className="chef-path"
              d="M135 255 C155 270, 195 270, 215 255"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="5"
              strokeLinecap="round"
              style={{ strokeDasharray: 1200, strokeDashoffset: 1200 }}
            />
          </g>

          {/* LAPTOP OUTER (timeline transforms) */}
          <g className="laptop-outer" transform="translate(350,140)">
            {/* LAPTOP TILT (hover transforms) */}
            <g
              className="laptop-tilt"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              {/* screen frame */}
              <rect
                x="60"
                y="40"
                width="520"
                height="420"
                rx="26"
                fill="hsl(var(--card))"
                opacity="0.85"
              />
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

              {/* screen UI blocks */}
              <rect className="ui-block" data-b="topbar" x={104} y={78} width={332} height={18} rx="9" fill="hsl(var(--primary))" opacity="0.9" />
              <rect className="ui-block" data-b="hero" x={104} y={108} width={332} height={78} rx="16" fill="hsl(var(--foreground))" opacity="0.08" />
              <rect className="ui-block" data-b="cta" x={104} y={194} width={160} height={22} rx="11" fill="hsl(var(--primary))" opacity="0.75" />

              <rect className="ui-block" data-b="card1" x={104} y={230} width={158} height={56} rx="16" fill="hsl(var(--foreground))" opacity="0.07" />
              <rect className="ui-block" data-b="card2" x={278} y={230} width={158} height={56} rx="16" fill="hsl(var(--foreground))" opacity="0.07" />
              <rect className="ui-block" data-b="card3" x={104} y={292} width={332} height={56} rx="16" fill="hsl(var(--foreground))" opacity="0.06" />

              <rect className="ui-block" data-b="code1" x={104} y={368} width={290} height={10} rx="5" fill="hsl(var(--primary))" opacity="0.22" />
              <rect className="ui-block" data-b="code2" x={104} y={384} width={260} height={10} rx="5" fill="hsl(var(--primary))" opacity="0.14" />
              <rect className="ui-block" data-b="code3" x={104} y={400} width={240} height={10} rx="5" fill="hsl(var(--primary))" opacity="0.08" />

              {/* cursor */}
              <circle className="cursor-dot" cx="150" cy="212" r="5" fill="hsl(var(--foreground))" opacity="0" />

              {/* base */}
              <path
                d="M10 480 H630 C650 480, 665 495, 665 512 C665 532, 650 545, 630 545 H10
                   C-10 545, -25 532, -25 512 C-25 495, -10 480, 10 480 Z"
                fill="hsl(var(--card))"
                opacity="0.8"
              />
              <rect x="255" y="492" width="130" height="14" rx="7" fill="hsl(var(--border))" opacity="0.35" />
            </g>
          </g>

          {/* subtle noise lines */}
          <g opacity="0.10">
            {Array.from({ length: 14 }).map((_, i) => (
              <rect
                key={i}
                x={520 + i * 12}
                y={80 + i * 24}
                width={220 - i * 8}
                height="3"
                rx="2"
                fill="hsl(var(--foreground))"
              />
            ))}
          </g>
        </svg>
      </div>
    );
  }
);
