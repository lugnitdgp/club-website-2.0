"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Code, Link2, Folder } from "lucide-react";
import { motion } from "motion/react";

import DataLoader from "@/components/loading/DataLoader";
import { useFetchProjectsQuery } from "@/store/slices/projectsSlice";
import { Modal, ModalBody, ModalContent, useModal } from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import ScrollStackWithScatter, { CardGroup } from "./ScrollStackWithScatter";
import DecryptedText from "@/components/DecryptedText";
import TrueFocus from "@/components/TrueFocus";

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────────────────── */
function stripHtml(html: string) {
  return (html ?? "").replace(/<[^>]*>/g, "");
}

function trim(text: string, max: number) {
  const s = stripHtml(text);
  return s.length <= max ? s : s.slice(0, max) + "…";
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROJECT CARD  — full-bleed image, glass overlay at bottom
───────────────────────────────────────────────────────────────────────────── */
interface CardProps { project: any; onOpen: () => void; }

function ProjectCard({ project, onOpen }: CardProps) {
  return (
    <div
      onClick={onOpen}
      className="
        relative w-full h-full
        rounded-2xl overflow-hidden
        border border-emerald-500/20 dark:border-emerald-500/15
        shadow-[0_0_0_1px_rgba(16,185,129,0.06),0_4px_32px_rgba(16,185,129,0.10)]
        dark:shadow-[0_0_0_1px_rgba(16,185,129,0.10),0_4px_40px_rgba(16,185,129,0.16)]
        hover:border-emerald-400/50 dark:hover:border-emerald-400/40
        hover:shadow-[0_0_0_1px_rgba(16,185,129,0.20),0_8px_56px_rgba(16,185,129,0.40),0_0_80px_rgba(16,185,129,0.15)]
        dark:hover:shadow-[0_0_0_1px_rgba(16,185,129,0.25),0_8px_64px_rgba(16,185,129,0.50),0_0_100px_rgba(16,185,129,0.20)]
        transition-all duration-500
        cursor-pointer group
        pointer-events-auto
        bg-zinc-950
      "
      style={{
        /* Subtle chromatic-aberration outline on hover — handled via CSS group */
      }}
    >
      {/* ── Image container with creative treatment ──────────────────────── */}
      {project.image_link ? (
        <div className="absolute inset-0 overflow-hidden">
          {/*
            TWO-LAYER image technique:
            1. Blurred, slightly zoomed BG layer fills gaps and hides stretch artifacts
            2. Sharp top layer is object-contain with padding so it never distorts
            Both layers gain a subtle parallax scale on group-hover
          */}

          {/* Layer 1 — blurred atmospheric fill (hides any letterboxing gaps) */}
          <Image
            src={project.image_link}
            alt=""
            aria-hidden="true"
            fill
            className="
              object-cover scale-110
              blur-xl brightness-50 saturate-150
              transition-transform duration-700 group-hover:scale-125
            "
            sizes="(max-width: 768px) 100vw, 80vw"
          />

          {/* Layer 2 — crisp focal image, contained so it's never stretched */}
          <Image
            src={project.image_link}
            alt={project.title}
            fill
            className="
              object-contain
              transition-transform duration-700 group-hover:scale-105
              drop-shadow-[0_4px_32px_rgba(0,0,0,0.7)]
            "
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>
      ) : (
        /* Fallback: dark gradient with folder icon */
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex items-center justify-center">
          <Folder className="w-16 h-16 text-emerald-500/20" />
        </div>
      )}

      {/* Gradient scrim — darkens bottom so glass overlay is legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* ── Shine sweep — slides across on hover ─────────────────────────── */}
      <div
        className="
          absolute inset-0 pointer-events-none z-[2]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "
        style={{
          background:
            "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.13) 50%, rgba(255,255,255,0.07) 60%, transparent 80%)",
          backgroundSize: "200% 100%",
          animation: "none",
        }}
      />

      {/* ── Emerald rim-light on hover ────────────────────────────────────── */}
      <div
        className="
          absolute inset-0 rounded-2xl pointer-events-none z-[3]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        "
        style={{
          boxShadow: "inset 0 0 0 1.5px rgba(52,211,153,0.35), inset 0 0 40px rgba(16,185,129,0.08)",
        }}
      />

      {/* Top-right subtle glow chip */}
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.7)] opacity-70 group-hover:opacity-100 group-hover:shadow-[0_0_14px_4px_rgba(52,211,153,0.9)] transition-all duration-300 z-[4]" />

      {/* ── Glass overlay — bottom ────────────────────────────────────────── */}
      <div
        className="
          absolute bottom-0 left-0 right-0
          px-4 pt-3 pb-4
          flex flex-col gap-2.5
          backdrop-blur-md
          bg-white/8 dark:bg-black/30
          border-t border-white/10 dark:border-white/8
          translate-y-0
          z-[5]
        "
        style={{ WebkitBackdropFilter: "blur(12px)" }}
      >
        {/* Title */}
        <h3 className="
          font-semibold text-sm sm:text-base
          text-white
          truncate
          group-hover:text-emerald-300
          transition-colors duration-200
          drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]
        ">
          {project.title}
        </h3>

        {/* Description — 2 lines max */}
        <p className="
          text-[11px] sm:text-xs
          text-white/60
          leading-relaxed line-clamp-2
          drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]
        ">
          {trim(project.description_markdown, 140)}
        </p>

        {/* Action buttons */}
        <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
          {project.gitlink && (
            <Link href={project.gitlink} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="
                  h-7 px-2.5 text-[10px] sm:text-xs rounded-lg gap-1
                  bg-white/10 hover:bg-white/20
                  border border-white/20 hover:border-emerald-400/50
                  text-white hover:text-emerald-300
                  backdrop-blur-sm
                  transition-all duration-200
                "
              >
                <Code className="w-3 h-3" /> Code
              </Button>
            </Link>
          )}
          {project.hosted_link && (
            <Link href={project.hosted_link} target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                className="
                  h-7 px-2.5 text-[10px] sm:text-xs rounded-lg gap-1
                  bg-emerald-500/80 hover:bg-emerald-400/90
                  border border-emerald-400/40
                  text-white
                  shadow-[0_0_12px_rgba(16,185,129,0.4)] hover:shadow-[0_0_20px_rgba(16,185,129,0.65)]
                  backdrop-blur-sm
                  transition-all duration-200
                "
              >
                <Link2 className="w-3 h-3" /> Demo
              </Button>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpen}
            className="
              h-7 px-2.5 text-[10px] sm:text-xs rounded-lg ml-auto
              text-white/50 hover:text-emerald-300
              hover:bg-white/10
              transition-colors duration-200
            "
          >
            Details →
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MODAL CONTENT  — DecryptedText title + body scroll lock
───────────────────────────────────────────────────────────────────────────── */
function ProjectModal({ project }: { project: any }) {
  const { open } = useModal();

  // Prevent body scroll while modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <ModalContent className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col gap-5 p-3 sm:p-6">

        {/* Title with DecryptedText */}
        <h2 className="text-xl sm:text-3xl font-bold text-center text-zinc-900 dark:text-white">
          <DecryptedText
            text={project.title}
            animateOn="view"
            sequential
            revealDirection="center"
            speed={38}
            maxIterations={10}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
            className="text-zinc-900 dark:text-white"
            encryptedClassName="text-emerald-500/55 dark:text-emerald-400/45"
          />
        </h2>

        {project.image_link ? (
          /* Modal image: same two-layer technique, no stretch */
          <div className="relative w-full h-48 sm:h-72 rounded-xl overflow-hidden shadow-[0_0_28px_rgba(16,185,129,0.15)]">
            {/* Blurred BG fill */}
            <Image
              src={project.image_link}
              alt=""
              aria-hidden="true"
              fill
              className="object-cover scale-110 blur-lg brightness-50 saturate-150"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
            {/* Sharp contained image */}
            <Image
              src={project.image_link}
              alt={project.title}
              fill
              className="object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
        ) : (
          <div className="w-full h-48 sm:h-72 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-emerald-500/20 flex items-center justify-center">
            <Folder className="w-10 h-10 text-emerald-400/40" />
          </div>
        )}

        <div>
          <h3 className="font-semibold text-sm text-zinc-600 dark:text-zinc-300 mb-2">
            <DecryptedText
              text="Description"
              animateOn="view"
              sequential
              revealDirection="start"
              speed={30}
              maxIterations={8}
              className="text-zinc-600 dark:text-zinc-300"
              encryptedClassName="text-emerald-500/45 dark:text-emerald-400/35"
            />
          </h3>
          <div
            className="
              prose prose-sm dark:prose-invert max-w-none
              overflow-y-auto max-h-[30vh]
              text-zinc-600 dark:text-zinc-400
              pr-1
            "
            dangerouslySetInnerHTML={{ __html: project.description_markdown }}
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          {project.gitlink && (
            <Link href={project.gitlink} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button
                variant="outline"
                className="w-full gap-2 rounded-xl h-10 border-zinc-300 dark:border-zinc-700 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Code size={16} /> View on GitHub
              </Button>
            </Link>
          )}
          {project.hosted_link && (
            <Link href={project.hosted_link} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button
                className="
                  w-full gap-2 rounded-xl h-10
                  bg-emerald-600 hover:bg-emerald-500
                  text-white border-0
                  shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_32px_rgba(16,185,129,0.65)]
                  transition-all duration-200
                "
              >
                <Link2 size={16} /> Live Demo
              </Button>
            </Link>
          )}
        </div>
      </div>
    </ModalContent>
  );
}

/* Wrapper: pulls setOpen from animated-modal context */
function CardWithModal({ project }: { project: any }) {
  const { setOpen } = useModal();
  return <ProjectCard project={project} onOpen={() => setOpen(true)} />;
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION HEADER  — TrueFocus for "Our Projects"
   Fades out + slides up as the user scrolls down (cards approaching),
   fades back in when scrolled back toward the top.
───────────────────────────────────────────────────────────────────────────── */
function SectionHeader() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // The scroll container is window (ScrollStackWithScatter uses the page scroll).
    // We watch window.scrollY: as soon as the user starts scrolling we begin fading.
    // Fully gone by ~180 px of scroll; fully back at 0 px.
    const FADE_START = 20;   // px of scroll before fade begins
    const FADE_END   = 200;  // px of scroll where opacity reaches 0

    function onScroll() {
      const y = window.scrollY;
      // progress: 0 at FADE_START, 1 at FADE_END
      const progress = Math.min(1, Math.max(0, (y - FADE_START) / (FADE_END - FADE_START)));
      el!.style.opacity      = String(1 - progress);
      el!.style.transform    = `translateY(${-progress * 28}px)`;
      // Disable pointer events once mostly faded so cards underneath are reachable
      el!.style.pointerEvents = progress > 0.6 ? "none" : "";
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount in case page is already scrolled
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative select-none flex flex-col"
      style={{
        minHeight: "100vh",
        transition: "opacity 0.05s linear, transform 0.05s linear",
      }}
    >
      {/* ── Centred hero content ──────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
        style={{ paddingTop: 96 /* clear navbar */ }}
      >
        {/* Eyebrow */}
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] font-semibold text-emerald-500 mb-5">
          Open source
        </p>

        {/* TrueFocus heading */}
        <div className="pointer-events-auto mb-6">
          <TrueFocus
            sentence="Our Projects"
            manualMode={false}
            blurAmount={4}
            borderColor="#10b981"
            glowColor="rgba(16,185,129,0.55)"
            animationDuration={0.6}
            pauseBetweenAnimations={1.2}
          />
        </div>

        {/* Tagline — two-line, staggered fade-in */}
        <p
          className="max-w-sm sm:max-w-md text-sm sm:text-base font-medium leading-relaxed"
          style={{
            color: "rgba(16,185,129,0.55)",
            animation: "hero-fade-up 0.9s 0.2s ease-out both",
          }}
        >
          Where ideas become code.
        </p>
        <p
          className="max-w-sm sm:max-w-md text-xs sm:text-sm leading-relaxed mt-1"
          style={{
            color: "var(--tw-prose-body, rgba(113,113,122,0.85))",
            animation: "hero-fade-up 0.9s 0.45s ease-out both",
          }}
        >
          Explore what we've built — and jump in to build what comes next.
        </p>

        {/* Subtle horizontal rule */}
        <div
          className="mt-8"
          style={{
            width: 40,
            height: 1,
            background: "rgba(16,185,129,0.3)",
            animation: "hero-fade-up 0.9s 0.6s ease-out both",
          }}
        />
      </div>

      {/* ── Scroll indicator — pinned to bottom of the hero ──────────────── */}
      <div
        className="flex flex-col items-center gap-4 pb-10 pointer-events-none"
        style={{ animation: "hero-fade-up 1s 0.8s ease-out both" }}
      >
        {/* Label */}
        <p
          className="text-[10px] uppercase tracking-[0.28em] font-semibold"
          style={{ color: "rgba(16,185,129,0.65)" }}
        >
          Scroll to explore
        </p>

        {/* Mouse shell */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: 44, height: 64 }}
        >
          {/* Three ripple rings */}
          {([0, 0.45, 0.9] as number[]).map((delay, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                width: 44 + i * 18,
                height: 44 + i * 18,
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                border: "1px solid rgba(16,185,129,0.30)",
                animation: `scroll-ripple 2.6s ${delay}s ease-out infinite`,
                opacity: 0,
              }}
            />
          ))}

          {/* Mouse outline */}
          <span
            className="relative z-10"
            style={{
              display: "block",
              width: 36,
              height: 56,
              borderRadius: 20,
              border: "2px solid rgba(16,185,129,0.8)",
            }}
          >
            {/* Glowing dot */}
            <span
              className="absolute left-1/2 rounded-full"
              style={{
                width: 6,
                height: 6,
                background: "#34d399",
                transform: "translateX(-50%)",
                top: 8,
                animation: "scroll-dot 2s ease-in-out infinite",
                boxShadow: "0 0 10px 2px rgba(52,211,153,0.7)",
              }}
            />
          </span>
        </div>

        {/* Chevron cascade */}
        <div className="flex flex-col items-center" style={{ gap: 4 }}>
          {([0, 0.2, 0.4] as number[]).map((delay, i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 14,
                height: 14,
                borderLeft: "2px solid rgba(16,185,129,0.5)",
                borderBottom: "2px solid rgba(16,185,129,0.5)",
                transform: "rotate(-45deg)",
                animation: `scroll-chevron 2s ${delay}s ease-in-out infinite`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scroll-dot {
          0%   { top: 8px;  opacity: 1; }
          55%  { top: 34px; opacity: 0.15; }
          56%  { top: 8px;  opacity: 0; }
          80%  { top: 8px;  opacity: 1; }
          100% { top: 8px;  opacity: 1; }
        }
        @keyframes scroll-ripple {
          0%   { transform: translate(-50%,-50%) scale(0.55); opacity: 0.65; }
          100% { transform: translate(-50%,-50%) scale(2.5);  opacity: 0; }
        }
        @keyframes scroll-chevron {
          0%   { opacity: 0;   transform: rotate(-45deg) translateY(-5px); }
          45%  { opacity: 1;   transform: rotate(-45deg) translateY(0px);  }
          85%  { opacity: 0;   transform: rotate(-45deg) translateY(5px);  }
          100% { opacity: 0;   transform: rotate(-45deg) translateY(5px);  }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function ProjectPage() {
  const { data, isLoading, error } = useFetchProjectsQuery({});

  if (isLoading) return <DataLoader text="Loading Projects…" />;

  if (error)
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <p className="text-red-500 font-semibold">Error loading projects.</p>
      </div>
    );

  if (!data?.length)
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <p className="text-neutral-500 font-semibold">No projects found.</p>
      </div>
    );

  /* Group into batches of 3 */
  const cardGroups: CardGroup[] = [];
  for (let i = 0; i < data.length; i += 3) {
    const chunk = data.slice(i, i + 3);
    const cards = chunk.map((project: any) => (
      <Modal key={project.id}>
        <CardWithModal project={project} />
        <ModalBody>
          <ProjectModal project={project} />
        </ModalBody>
      </Modal>
    ));
    cardGroups.push({ cards });
  }

  return (
    <ScrollStackWithScatter
      groups={cardGroups}
      cardW={1200}
      cardH={330}
      peekGap={12}
      scaleStep={0.035}
      navbarHeight={96}
    >
      <SectionHeader />
    </ScrollStackWithScatter>
  );
}