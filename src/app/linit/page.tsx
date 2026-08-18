"use client";

import dynamic from 'next/dynamic';
import DataLoader from "@/components/loading/DataLoader";
import { useFetchLinitQuery } from "@/store/slices/linitSlice";
import React, { useState, useRef, useEffect } from "react";
import SectionTitle from "@/components/Title";

const FlipbookViewer = dynamic(() => import('@/components/linitViewer/FlipbookViewer'), { ssr: false });

// ── PDF Cover Thumbnail ───────────────────────────────────────────────────────
function PdfCover({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    async function render() {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "//cdnjs.cloudflare.com/ajax/libs/pdf.js/" + pdfjsLib.version + "/pdf.worker.min.js";
        const pdf = await pdfjsLib.getDocument(url).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.2 });
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        await page.render({ canvasContext: ctx, viewport }).promise;
        if (!cancelled) setReady(true);
      } catch (e) {
        console.error("PDF cover render error:", e);
      }
    }
    render();
    return () => { cancelled = true; };
  }, [url]);

  return (
    <div className="w-full h-full relative">
      {!ready && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: "linear-gradient(110deg, #e5e7eb 30%, #f3f4f6 50%, #e5e7eb 70%)",
            backgroundSize: "200% 100%",
          }}
        />
      )}
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: ready ? "block" : "none",
        }}
      />
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
function LinitPage() {
  const { data, isLoading, error } = useFetchLinitQuery({});
  const [isViewerOpen, setViewerOpen] = useState(false);
  const [pdf, setPdf] = useState("");

  return (
    <div className="min-h-screen w-full relative">
      {isLoading && <DataLoader text="Dusting off the shelves..." />}

      {error && (
        <div className="min-h-screen w-full flex items-center justify-center text-center">
          Error loading the Linit editions.
        </div>
      )}

      {!isLoading && !error && (!data || data.length === 0) && (
        <div className="min-h-screen w-full flex items-center justify-center text-center">
          No Linit edition found.
        </div>
      )}

      {!isLoading && !error && data && data.length > 0 && (
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

          {/* Header */}
          <div className="text-center mb-24">
            <SectionTitle
              title="Linit"
              description="GLUG NIT Durgapur • Yearly Magazine on Open Source"
            />
            <p className="text-base md:text-lg text-gray-400 dark:text-gray-400">
              Stories, research, and ideas from the open-source community
            </p>
          </div>

          {/* Book Cards — 2 per row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-24">
            {data.map((linit: any, i: number) => (
              <div key={linit.id} className="flex flex-col items-center gap-4 group">

                {/* Number + Book wrapper */}
                <div className="relative" style={{ width: "260px", height: "360px" }}>

                  {/* Ghost year — top-left, behind book */}
                  <span
                    className="absolute select-none leading-none z-0"
                    style={{
                      fontFamily: "'Georgia', serif",
                      fontSize: "5rem",
                      fontWeight: 900,
                      color: "transparent",
                      WebkitTextStroke: "2px #d1d5db",
                      top: "-4rem",
                      left: "-2rem",
                      lineHeight: 1,
                      pointerEvents: "none",
                    }}
                  >
                    {linit.year_edition}
                  </span>

                  {/* Book Cover */}
                  <div
                    className="absolute inset-0 cursor-pointer z-10"
                    style={{ perspective: "1200px" }}
                    onClick={() => {
                      setPdf(linit.document_url);
                      setViewerOpen(true);
                    }}
                  >
                    {/* Drop shadow */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 rounded-full blur-xl opacity-30 group-hover:opacity-55 transition-opacity duration-500"
                      style={{
                        width: "70%",
                        height: "20px",
                        background: "rgba(0,0,0,0.65)",
                        bottom: "-16px",
                      }}
                    />

                    {/* Book 3D body */}
                    <div
                      className="relative w-full h-full transition-all duration-500 group-hover:-translate-y-3"
                      style={{
                        borderRadius: "4px 12px 12px 4px",
                        overflow: "hidden",
                        boxShadow: [
                          "2px 0 0 #bbb",
                          "4px 0 0 #ccc",
                          "6px 0 0 #ddd",
                          "8px 8px 28px rgba(0,0,0,0.3)",
                          "0 2px 8px rgba(0,0,0,0.12)",
                          "inset 3px 0 8px rgba(0,0,0,0.2)",
                        ].join(", "),
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Spine shadow — left edge */}
                      <div
                        className="absolute left-0 top-0 h-full z-20 pointer-events-none"
                        style={{
                          width: "16px",
                          background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.12) 70%, transparent 100%)",
                        }}
                      />

                      {/* Sheen highlight */}
                      <div
                        className="absolute top-0 right-0 z-20 pointer-events-none opacity-35 group-hover:opacity-15 transition-opacity duration-500"
                        style={{
                          width: "45%",
                          height: "100%",
                          background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 65%)",
                        }}
                      />

                      {/* PDF first page as cover */}
                      <PdfCover url={linit.document_url} />

                      {/* Hover overlay with icons */}
                      <div className="absolute inset-0 z-30 bg-black/0 group-hover:bg-black/35 transition-all duration-300 flex items-center justify-center gap-4">

                        {/* Eye / View icon */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPdf(linit.document_url);
                            setViewerOpen(true);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30"
                          style={{ background: "rgba(255,255,255,0.15)" }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>

                        {/* Download icon */}
                        <a
                          href={linit.document_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          onClick={(e) => e.stopPropagation()}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30"
                          style={{ background: "rgba(255,255,255,0.15)", transitionDelay: "60ms" }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                          </svg>
                        </a>

                      </div>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mt-4">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">
                    {"Linit " + linit.year_edition}
                  </h2>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      <FlipbookViewer
        isOpen={isViewerOpen}
        onClose={() => setViewerOpen(false)}
        pdfURL={pdf}
      />
    </div>
  );
}

export default LinitPage;