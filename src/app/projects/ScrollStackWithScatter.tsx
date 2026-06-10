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
   SCROLL TIMELINE  (all values in "scroll-pixels" — px the user has scrolled)
   Each group of 3 cards consumes GROUP_SCROLL px of scroll.
   Groups overlap slightly so group N+1 starts entering before group N fully exits.
───────────────────────────────────────────────────────────────────────────── */
const ENTER   = 500;   // px per card sliding in
const HOLD    = 400;   // px stack stays pinned
const SCATTER = 700;   // px for the scatter exit

const GROUP   = 3 * ENTER + HOLD + SCATTER;   // total px per group
const OVERLAP = 500;                           // overlap between consecutive groups

const gStart = (gi: number) => gi * (GROUP - OVERLAP);

/* ─────────────────────────────────────────────────────────────────────────────
   EASING
───────────────────────────────────────────────────────────────────────────── */
const clamp   = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const norm    = (x: number, a: number, b: number)   => clamp((x - a) / (b - a), 0, 1);
const eOut3   = (t: number) => 1 - (1 - t) ** 3;
const eIO3    = (t: number) => t < 0.5 ? 4*t**3 : 1 - (-2*t+2)**3/2;
const eIn4    = (t: number) => t ** 4;

/* ─────────────────────────────────────────────────────────────────────────────
   TRANSFORM CALCULATOR
   ci = stack layer index  (0 = bottom / first-in,  2 = top / last-in)
   Returns {x, y, scale, rotate, opacity}
───────────────────────────────────────────────────────────────────────────── */
function cardXform(
  gi: number, ci: number, scroll: number,
  vw: number, vh: number, navH: number,
  cardH: number, peekGap: number, scaleStep: number,
) {
  const avail  = vh - navH;          // whitespace height below navbar
  const local  = scroll - gStart(gi); // scroll progress within this group

  /* Where the card rests when stacked */
  const restY  = (2 - ci) * peekGap;
  const restSc = 1 - (2 - ci) * scaleStep;

  /* Off-screen start: just below the visible whitespace */
  const offY   = avail + cardH * 2;

  /* Phase boundaries */
  const entS = ci * ENTER,    entE = entS + ENTER;
  const holE = 3 * ENTER + HOLD;
  const scaE = holE + SCATTER;

  /* ── Not yet active ── */
  if (local < 0)     return { x:0, y:offY,  sc:0.85,   r:0,   o:0 };
  /* ── Fully gone ── */
  if (local >= scaE) return { x:0, y:-offY, sc:1,       r:0,   o:0 };
  /* ── Waiting to enter ── */
  if (local < entS)  return { x:0, y:offY,  sc:0.85,   r:0,   o:0 };

  /* ── ENTER ── */
  if (local < entE) {
    const t = eOut3(norm(local, entS, entE));
    return { x:0, y: offY + (restY - offY)*t, sc: 0.85 + (restSc-0.85)*t, r:0, o: Math.min(1, t*2.5) };
  }

  /* ── HOLD ── */
  if (local < holE) return { x:0, y:restY, sc:restSc, r:0, o:1 };

  /* ── SCATTER ── */
  const t  = eIO3(norm(local, holE, scaE));
  const tf = eIn4(norm(local, holE, scaE));
  const o  = clamp(1 - (t - 0.45) / 0.55, 0, 1);
  const sc = restSc * (1 + 0.05*t);

  if (ci === 2) return { x:0,          y: restY - (avail+cardH)*1.5*tf, sc, r:0,     o };
  if (ci === 1) return { x: vw*1.5*tf, y: restY - avail*0.3*tf,         sc, r:20*t,  o };
               return  { x:-vw*1.5*tf, y: restY - avail*0.3*tf,         sc, r:-20*t, o };
}

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

  /* Scroll-track height — computed client-side only */
  const [trackH, setTrackH] = useState(8000);
  useEffect(() => {
    if (groups.length === 0) { setTrackH(window.innerHeight * 3); return; }
    setTrackH(gStart(groups.length - 1) + GROUP + window.innerHeight * 1.5);
  }, [groups.length]);

  /* Refs */
  const trackRef   = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<Map<string, HTMLDivElement>>(new Map());
  const raf        = useRef(0);

  /* ── Paint loop ── */
  useEffect(() => {
    if (groups.length === 0) return;

    function paint() {
      const track   = trackRef.current;
      const overlay = overlayRef.current;
      if (!track || !overlay) return;

      const rect   = track.getBoundingClientRect();
      const vw     = window.innerWidth;
      const vh     = window.innerHeight;

      /* Is the track scrolled into view at all? */
      const active = rect.top < vh && rect.bottom > 0;
      overlay.style.visibility = active ? "visible" : "hidden";
      if (!active) return;

      /* scroll = how many px of the track have passed the viewport top.
         Negative when user hasn't reached the track yet. */
      const scroll = -rect.top;

      groups.forEach((group, gi) => {
        const n = group.cards.length;  // 1–3
        group.cards.forEach((_, cardIdx) => {
          const ci  = cardIdx + (3 - n);   // map to layer 0/1/2
          const key = `${gi}-${ci}`;
          const el  = cardRefs.current.get(key);
          if (!el) return;

          const { x, y, sc, r, o } = cardXform(
            gi, ci, scroll, vw, vh, navbarHeight, cardH, peekGap, scaleStep
          );

          el.style.transform     = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${r.toFixed(2)}deg) scale(${sc.toFixed(5)})`;
          el.style.opacity       = o.toFixed(4);
          el.style.zIndex        = String((groups.length - gi) * 10 + ci);
          el.style.pointerEvents = o > 0.3 && Math.abs(x) < vw * 0.35 ? "auto" : "none";
        });
      });
    }

    const onScroll = () => { cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(paint); };
    const onResize = () => { cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(paint); };

    paint(); // immediate first paint
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [groups, navbarHeight, cardH, peekGap, scaleStep]);

  /* ── Card anchor position ──
     Centre of whitespace below navbar = navbarH + (vh - navbarH)/2
     Subtract cardH/2 so card's visual centre hits that point exactly.     */
  const anchorTop = `calc(${navbarHeight}px + (100vh - ${navbarHeight}px) / 2 - ${cardH / 2}px)`;
  const cardWidth = `min(${cardW}px, calc(100vw - 32px))`;

  return (
    <>
      {/* ── SCROLL TRACK ──────────────────────────────────────────────────────
          Invisible div in normal document flow.
          Its height controls how many px of scroll the animation consumes.
          trackRef.getBoundingClientRect().top is the single source of truth
          for all animation progress calculations.
      ─────────────────────────────────────────────────────────────────────── */}
      <div ref={trackRef} style={{ width: "100%", height: trackH }} />

      {/* ── FIXED OVERLAY ─────────────────────────────────────────────────────
          position:fixed makes this immune to ancestor overflow:hidden/auto.
          visibility toggled by paint() — hidden when track is off-screen.
          zIndex:40 — above page, below modals (z-50+).
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        ref={overlayRef}
        style={{
          position  : "fixed",
          inset     : 0,
          zIndex    : 40,
          visibility: "hidden",       // paint() sets to visible
          pointerEvents: "none",
        }}
      >
        {/* Optional title / description slot */}
        {children && (
          <div style={{ position: "absolute", top: navbarHeight, left: 0, width: "100%", pointerEvents: "auto" }}>
            {children}
          </div>
        )}

        {/* ── CARD ANCHOR ────────────────────────────────────────────────────
            Pinned at the exact visual centre of the whitespace area.
            This div never moves. Only the cards' CSS transforms change.
        ─────────────────────────────────────────────────────────────────── */}
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
                    transform         : "translateY(200vh)",
                    willChange        : "transform, opacity",
                    transformOrigin   : "center center",
                    backfaceVisibility: "hidden",
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