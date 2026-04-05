"use client";

import dynamic from 'next/dynamic';
import DataLoader from "@/components/loading/DataLoader";
import { useFetchLinitQuery } from "@/store/slices/linitSlice";
import React, { useState, useEffect, useRef } from "react";
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
      {/* Shimmer placeholder while loading */}
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
          <div className="grid grid-cols-2 gap-x-16 gap-y-24">
            {data.map((linit: any, i: number) => (
              <div key={linit.id} className="flex flex-col items-center gap-4 group">

                {/* Number + Book wrapper */}
                <div className="relative" style={{ width: "260px", height: "360px" }}>

                  {/* Ghost number — top-left, behind book */}
                  <span
                    className="absolute select-none leading-none z-0"
                    style={{
                      fontFamily: "'Georgia', serif",
                      fontSize: "8rem",
                      fontWeight: 900,
                      color: "transparent",
                      WebkitTextStroke: "2px #d1d5db",
                      top: "-5rem",
                      left: "-2rem",
                      lineHeight: 1,
                      pointerEvents: "none",
                    }}
                  >
                    {i + 1}
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

                      {/* Hover read overlay */}
                      <div className="absolute inset-0 z-30 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <span
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-white text-xs font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full backdrop-blur-sm"
                          style={{ background: "rgba(0,0,0,0.45)" }}
                        >
                          Read
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title + meta */}
                <div className="text-center flex flex-col gap-0.5 mt-4">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">
                    {"Linit " + linit.year_edition}
                  </h2>
                  <p className="text-xs text-gray-400 dark:text-gray-500 tracking-wide">
                    {(linit.pages || 68) + " pages"}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setPdf(linit.document_url);
                      setViewerOpen(true);
                    }}
                    className="px-5 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    View
                  </button>
                  <a
                    href={linit.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="px-5 py-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 text-center"
                  >
                    Download
                  </a>
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