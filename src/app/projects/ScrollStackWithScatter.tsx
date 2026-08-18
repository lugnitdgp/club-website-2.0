"use client";

import React, { useEffect, useRef, useState } from "react";

export interface CardGroup {
  cards: React.ReactNode[];
}

interface Props {
  groups:        CardGroup[];
  children?:     React.ReactNode;
  cardW?:        number;
  cardH?:        number;
  scaleStep?:    number;
  peekGap?:      number;
  navbarHeight?: number;
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCROLL TIMELINE
   Mobile gets compressed distances so a normal thumb-swipe drives the full
   animation. Desktop keeps the original spacious feel.
───────────────────────────────────────────────────────────────────────────── */
function getTimings(mobile: boolean) {
  if (mobile) {
    const ENTER   = 260;
    const HOLD    = 180;
    const SCATTER = 340;
    const GROUP   = 3 * ENTER + HOLD + SCATTER;
    const OVERLAP = 240;
    return { ENTER, HOLD, SCATTER, GROUP, OVERLAP };
  }
  const ENTER   = 500;
  const HOLD    = 400;
  const SCATTER = 700;
  const GROUP   = 3 * ENTER + HOLD + SCATTER;
  const OVERLAP = 500;
  return { ENTER, HOLD, SCATTER, GROUP, OVERLAP };
}

const gStart = (gi: number, GROUP: number, OVERLAP: number) =>
  gi * (GROUP - OVERLAP);

/* ─────────────────────────────────────────────────────────────────────────────
   EASING
───────────────────────────────────────────────────────────────────────────── */
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const norm  = (x: number, a: number, b: number)   => clamp((x - a) / (b - a), 0, 1);
const eOut3 = (t: number) => 1 - (1 - t) ** 3;
const eIO3  = (t: number) => t < 0.5 ? 4*t**3 : 1 - (-2*t+2)**3/2;
const eIn4  = (t: number) => t ** 4;

/* ─────────────────────────────────────────────────────────────────────────────
   TRANSFORM CALCULATOR
───────────────────────────────────────────────────────────────────────────── */
function cardXform(
  gi: number, ci: number, scroll: number,
  vw: number, vh: number, navH: number,
  cardH: number, peekGap: number, scaleStep: number,
  timings: ReturnType<typeof getTimings>,
) {
  const { ENTER, HOLD, SCATTER, GROUP, OVERLAP } = timings;
  const avail  = vh - navH;
  const local  = scroll - gStart(gi, GROUP, OVERLAP);

  const restY  = (2 - ci) * peekGap;
  const restSc = 1 - (2 - ci) * scaleStep;
  const offY   = avail + cardH * 2;

  const entS = ci * ENTER,    entE = entS + ENTER;
  const holE = 3 * ENTER + HOLD;
  const scaE = holE + SCATTER;

  if (local < 0)     return { x:0, y:offY,  sc:0.85, r:0,   o:0 };
  if (local >= scaE) return { x:0, y:-offY, sc:1,    r:0,   o:0 };
  if (local < entS)  return { x:0, y:offY,  sc:0.85, r:0,   o:0 };

  if (local < entE) {
    const t = eOut3(norm(local, entS, entE));
    return { x:0, y: offY + (restY - offY)*t, sc: 0.85 + (restSc-0.85)*t, r:0, o: Math.min(1, t*2.5) };
  }

  if (local < holE) return { x:0, y:restY, sc:restSc, r:0, o:1 };

  const t  = eIO3(norm(local, holE, scaE));
  const tf = eIn4(norm(local, holE, scaE));
  const o  = clamp(1 - (t - 0.45) / 0.55, 0, 1);
  const sc = restSc * (1 + 0.05*t);

  if (ci === 2) return { x:0,          y: restY - (avail+cardH)*1.5*tf, sc, r:0,     o };
  if (ci === 1) return { x: vw*1.5*tf, y: restY - avail*0.3*tf,         sc, r:20*t,  o };
               return  { x:-vw*1.5*tf, y: restY - avail*0.3*tf,         sc, r:-20*t, o };
}

/* ─────────────────────────────────────────────────────────────────────────────
   LERP — smooth follower so animation glides between sparse mobile events
───────────────────────────────────────────────────────────────────────────── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function ScrollStackWithScatter({
  groups       = [],
  children,
  cardW        = 960,
  cardH        = 180,
  scaleStep    = 0.03,
  peekGap      = 12,
  navbarHeight = 64,
}: Props) {

  const [trackH, setTrackH] = useState(8000);

  /* Detect mobile once on mount */
  const isMobileRef = useRef(false);

  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;

    if (groups.length === 0) { setTrackH(window.innerHeight * 3); return; }

    const timings = getTimings(isMobileRef.current);
    const { GROUP, OVERLAP } = timings;
    setTrackH(
      gStart(groups.length - 1, GROUP, OVERLAP) + GROUP + window.innerHeight * 1.5
    );
  }, [groups.length]);

  const trackRef   = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<Map<string, HTMLDivElement>>(new Map());
  const raf        = useRef(0);

  /* Smoothed scroll value — lerp target chases native scrollY */
  const smoothScrollRef = useRef(0);
  const targetScrollRef = useRef(0);

  useEffect(() => {
    if (groups.length === 0) return;

    /* On mobile use lerp smoothing; on desktop snap immediately (already smooth) */
    const mobile  = isMobileRef.current;
    /* Lerp speed: 1 = instant snap, lower = more lag/smoothness.
       0.18 gives a ~50ms ease-out feel on 60 fps; on slower mobile GPUs
       we bump it slightly so the animation doesn't lag behind the finger. */
    const LERP_K  = mobile ? 0.22 : 1;

    function paint(timestamp: number) {
      const track   = trackRef.current;
      const overlay = overlayRef.current;
      if (!track || !overlay) return;

      const rect   = track.getBoundingClientRect();
      const vw     = window.innerWidth;
      const vh     = window.innerHeight;

      /* Update lerp target from native scroll */
      targetScrollRef.current = -rect.top;

      /* Lerp the smooth value toward target */
      smoothScrollRef.current = lerp(
        smoothScrollRef.current,
        targetScrollRef.current,
        LERP_K,
      );

      /* Keep looping on mobile until we've caught up */
      const diff = Math.abs(targetScrollRef.current - smoothScrollRef.current);
      if (mobile && diff > 0.3) {
        raf.current = requestAnimationFrame(paint);
      }

      const scroll = smoothScrollRef.current;

      const active = rect.top < vh && rect.bottom > 0;
      overlay.style.visibility = active ? "visible" : "hidden";
      if (!active) return;

      const timings = getTimings(mobile);
      const { GROUP, OVERLAP } = timings;

      groups.forEach((group, gi) => {
        const n = group.cards.length;
        group.cards.forEach((_, cardIdx) => {
          const ci  = cardIdx + (3 - n);
          const key = `${gi}-${ci}`;
          const el  = cardRefs.current.get(key);
          if (!el) return;

          const { x, y, sc, r, o } = cardXform(
            gi, ci, scroll, vw, vh, navbarHeight, cardH, peekGap, scaleStep, timings,
          );

          el.style.transform  = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${r.toFixed(2)}deg) scale(${sc.toFixed(5)})`;
          el.style.opacity    = o.toFixed(4);
          el.style.zIndex     = String((groups.length - gi) * 10 + ci);
          el.style.pointerEvents = o > 0.3 && Math.abs(x) < vw * 0.35 ? "auto" : "none";
        });
      });
    }

    /* On scroll: always kick off one RAF.
       On mobile the RAF loop self-continues until smooth catches up. */
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(paint);
    };
    const onResize = () => {
      isMobileRef.current = window.innerWidth < 768;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(paint);
    };

    /* Immediate first paint */
    smoothScrollRef.current = -(trackRef.current?.getBoundingClientRect().top ?? 0);
    targetScrollRef.current = smoothScrollRef.current;
    raf.current = requestAnimationFrame(paint);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    /* Touch events: just call paint — the lerp does the smoothing */
    window.addEventListener("touchmove", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("resize",    onResize);
      window.removeEventListener("touchmove", onScroll);
    };
  }, [groups, navbarHeight, cardH, peekGap, scaleStep]);

  const anchorTop = `calc(${navbarHeight}px + (100vh - ${navbarHeight}px) / 2 - ${cardH / 2}px)`;
  const cardWidth = `min(${cardW}px, calc(100vw - 32px))`;

  return (
    <>
      <div ref={trackRef} style={{ width: "100%", height: trackH }} />

      <div
        ref={overlayRef}
        style={{
          position     : "fixed",
          inset        : 0,
          zIndex       : 40,
          visibility   : "hidden",
          pointerEvents: "none",
          /* Promote the overlay to its own compositor layer so card
             transforms never trigger a main-thread layout on mobile */
          willChange   : "transform",
        }}
      >
        {children && (
          <div style={{ position: "absolute", top: navbarHeight, left: 0, width: "100%", pointerEvents: "auto" }}>
            {children}
          </div>
        )}

        <div
          style={{
            position : "absolute",
            top      : anchorTop,
            left     : "50%",
            transform: "translateX(-50%)",
            width    : cardWidth,
            height   : cardH,
          }}
        >
          {groups.map((group, gi) => {
            const n = group.cards.length;
            return group.cards.map((card, cardIdx) => {
              const ci  = cardIdx + (3 - n);
              const key = `${gi}-${ci}`;
              return (
                <div
                  key={key}
                  ref={el => { if (el) cardRefs.current.set(key, el); else cardRefs.current.delete(key); }}
                  style={{
                    position          : "absolute",
                    inset             : 0,
                    opacity           : 0,
                    transform         : "translate3d(0,200vh,0)",
                    willChange        : "transform, opacity",
                    transformOrigin   : "center center",
                    backfaceVisibility: "hidden",
                    /* Isolate each card into its own layer — prevents
                       the browser from re-compositing siblings on every
                       frame, which is the main cause of jank on mobile */
                    isolation         : "isolate",
                    pointerEvents     : "none",
                  }}
                >
                  {card}
                </div>
              );
            });
          })}
        </div>
      </div>
    </>
  );
}