"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import { useTheme } from "next-themes";
import {
  X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2, BookOpen,
} from "lucide-react";

interface FlipbookViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfURL: string;
}

const Page = React.forwardRef<
  HTMLDivElement,
  { pageNumber: number; canvas: HTMLCanvasElement | null; isLoading: boolean }
>(({ pageNumber, canvas, isLoading }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvas && containerRef.current) {
      containerRef.current.innerHTML = "";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.objectFit = "contain";
      containerRef.current.appendChild(canvas);
    }
  }, [canvas]);

  return (
    <div ref={ref} style={{ width: "100%", height: "100%", background: "#fff" }}>
      <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#fafaf8" }}>
        {isLoading ? (
          <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, background: "#fff" }}>
            <Loader2 style={{ color: "#7c3aed", animation: "spin 1s linear infinite" }} size={28} />
            <span style={{ fontSize: "0.8rem", color: "#7c3aed", fontFamily: "inherit" }}>Page {pageNumber}</span>
          </div>
        ) : (
          <div ref={containerRef} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }} />
        )}
        <div style={{ position: "absolute", bottom: 8, right: 10, fontSize: "0.65rem", color: "#a78bfa", letterSpacing: "0.06em" }}>
          {pageNumber}
        </div>
      </div>
    </div>
  );
});
Page.displayName = "Page";

function getBookDimensions(isMobile: boolean) {
  if (typeof window === "undefined") return { width: 420, height: 580, portrait: false };
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (isMobile) {
    const w = Math.floor(vw - 44 * 2 - 12 * 2 - 8);
    const h = Math.floor(vh * 0.75);
    return { width: Math.max(w, 200), height: Math.max(h, 300), portrait: true };
  } else {
    const availableW = vw - 56 * 2 - 24 * 2;
    const w = Math.floor(Math.min(availableW / 2, 520));
    const h = Math.floor(Math.min(vh * 0.82, 720));
    return { width: Math.max(w, 300), height: Math.max(h, 400), portrait: false };
  }
}

export default function FlipbookViewer({ isOpen, onClose, pdfURL }: FlipbookViewerProps) {
  const [canvases, setCanvases] = useState<(HTMLCanvasElement | null)[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loadedPages, setLoadedPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [scale, setScale] = useState(1.4);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [bookDims, setBookDims] = useState({ width: 420, height: 580, portrait: false });
  const [dimsReady, setDimsReady] = useState(false);
  const flipBookRef = useRef<any>(null);
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setBookDims(getBookDimensions(mobile));
      setDimsReady(true);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const loadPdf = useCallback(async () => {
    if (!pdfURL) return;
    setIsLoadingPdf(true);
    setCanvases([]);
    setLoadedPages(0);
    setCurrentPage(0);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      const pdf = await pdfjsLib.getDocument(pdfURL).promise;
      const numPages = pdf.numPages;
      setTotalPages(numPages);
      const canvasArray: (HTMLCanvasElement | null)[] = new Array(numPages).fill(null);
      setCanvases([...canvasArray]);
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport }).promise;
        canvasArray[i - 1] = canvas;
        setCanvases([...canvasArray]);
        setLoadedPages(i);
      }
    } catch (err) {
      console.error("PDF load error:", err);
    } finally {
      setIsLoadingPdf(false);
    }
  }, [pdfURL, scale]);

  useEffect(() => { if (isOpen && pdfURL) loadPdf(); }, [isOpen, pdfURL]);
  useEffect(() => { if (isOpen && pdfURL && !isLoadingPdf) loadPdf(); }, [scale]);

  const handleFlip = (e: any) => setCurrentPage(e.data);
  const prevPage = () => flipBookRef.current?.pageFlip()?.flipPrev();
  const nextPage = () => flipBookRef.current?.pageFlip()?.flipNext();
  const handleZoomIn = () => setScale((s) => Math.min(s + 0.3, 2.5));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.3, 0.6));

  if (!isOpen) return null;

  const progress = totalPages > 0 ? (loadedPages / totalPages) * 100 : 0;
  const isReady = loadedPages === totalPages && totalPages > 0;
  const pageLabel = isReady
    ? isMobile
      ? `Page ${currentPage + 1} of ${totalPages}`
      : `Pages ${currentPage + 1}–${Math.min(currentPage + 2, totalPages)} of ${totalPages}`
    : "Loading…";

  // Theme-aware CSS values
  const bg          = dark ? "#0d1117" : "#ffffff";
  const dotColor    = dark ? "rgba(255,255,255,0.06)" : "#d1d5db";
  const barBg       = dark ? "rgba(15,23,36,0.95)"  : "rgba(255,255,255,0.95)";
  const barBorder   = dark ? "#1e2a3a"               : "#f3f4f6";
  const titleColor  = dark ? "#f1f5f9"               : "#111111";
  const btnBg       = dark ? "rgba(255,255,255,0.06)": "#ffffff";
  const btnBorder   = dark ? "rgba(255,255,255,0.12)": "#e5e7eb";
  const btnColor    = dark ? "#c4b5fd"               : "#374151";
  const btnHoverBg  = dark ? "rgba(167,139,250,0.15)": "#f5f3ff";
  const navBg       = dark ? "rgba(255,255,255,0.06)": "#ffffff";
  const labelColor  = dark ? "#94a3b8"               : "#6b7280";
  const loadingBg   = dark ? "rgba(13,17,23,0.95)"   : "rgba(255,255,255,0.95)";
  const iconBoxBg   = dark ? "rgba(255,255,255,0.05)": "#ffffff";
  const iconBoxBorder= dark ? "rgba(255,255,255,0.1)": "#e5e7eb";

  return (
    <>
      <style>{`
        @keyframes fb-spin     { to { transform: rotate(360deg); } }
        @keyframes fb-fadein   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fb-progress {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .fb-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background-color: ${bg};
          background-image: radial-gradient(circle, ${dotColor} 1px, transparent 1px);
          background-size: 24px 24px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-start;
          font-family: inherit; overflow: hidden;
          animation: fb-fadein 0.18s ease;
          transition: background-color 0.3s;
        }

        .fb-topbar {
          position: relative; z-index: 10; width: 100%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 28px;
          background: ${barBg};
          border-bottom: 1.5px solid ${barBorder};
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
        }
        .fb-title {
          display: flex; align-items: center; gap: 8px;
          font-size: 1.05rem; font-weight: 800;
          color: ${titleColor}; letter-spacing: -0.02em;
        }
        .fb-title-accent {
          background: linear-gradient(90deg, #e879a0 0%, #a855f7 50%, #f97316 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .fb-controls { display: flex; align-items: center; gap: 8px; }
        .fb-btn {
          background: ${btnBg}; border: 1.5px solid ${btnBorder};
          color: ${btnColor}; border-radius: 10px; padding: 7px 9px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .fb-btn:hover {
          background: ${btnHoverBg}; border-color: #a78bfa; color: #a855f7;
        }
        .fb-close { background: ${dark ? "rgba(239,68,68,0.1)" : "#fff1f2"}; border-color: ${dark ? "rgba(239,68,68,0.2)" : "#fecdd3"}; color: #f43f5e; }
        .fb-close:hover { background: ${dark ? "rgba(239,68,68,0.2)" : "#ffe4e6"}; border-color: #fb7185; color: #e11d48; }

        .fb-stage {
          flex: 1; position: relative; z-index: 10;
          width: 100%; display: flex; align-items: center; justify-content: center;
          padding: 20px 8px; gap: 10px; min-height: 0;
        }
        .fb-nav {
          background: ${navBg}; border: 1.5px solid ${btnBorder};
          color: #a855f7; border-radius: 50%; cursor: pointer; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s ease; width: 46px; height: 46px; min-width: 46px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .fb-nav:hover {
          background: ${btnHoverBg}; border-color: #a78bfa;
          box-shadow: 0 4px 16px rgba(124,58,237,0.2); transform: scale(1.07);
        }
        .fb-book-wrap {
          flex-shrink: 0; display: flex; align-items: center; justify-content: center;
          filter: drop-shadow(0 4px 20px rgba(0,0,0,${dark ? "0.5" : "0.12"})) drop-shadow(0 1px 4px rgba(0,0,0,0.06));
        }
        .fb-loading {
          position: absolute; inset: 0; z-index: 20;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 18px; background: ${loadingBg}; backdrop-filter: blur(6px);
          animation: fb-fadein 0.18s ease;
        }
        .fb-loading-icon {
          width: 70px; height: 70px; border-radius: 20px;
          background: ${iconBoxBg}; border: 1.5px solid ${iconBoxBorder};
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(124,58,237,0.12); color: #7c3aed;
        }
        .fb-loading-title {
          font-size: 1.4rem; font-weight: 800;
          letter-spacing: -0.03em; color: ${titleColor};
        }
        .fb-loading-title span {
          background: linear-gradient(90deg, #e879a0 0%, #a855f7 50%, #f97316 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .fb-loading-sub { font-size: 0.78rem; font-weight: 500; color: ${labelColor}; letter-spacing: 0.03em; }
        .fb-progress-track { width: 200px; height: 3px; background: ${dark ? "rgba(255,255,255,0.08)" : "#f3f4f6"}; border-radius: 999px; overflow: hidden; }
        .fb-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #e879a0, #a855f7, #f97316, #a855f7, #e879a0);
          background-size: 200% auto; border-radius: 999px;
          transition: width 0.35s ease; animation: fb-progress 1.8s linear infinite;
        }
        .fb-progress-label { font-size: 0.75rem; font-weight: 500; color: ${labelColor}; letter-spacing: 0.04em; }
        .fb-bottombar {
          position: relative; z-index: 10; width: 100%; flex-shrink: 0;
          padding: 11px 28px; display: flex; align-items: center; justify-content: space-between;
          background: ${barBg}; border-top: 1.5px solid ${barBorder};
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
        }
        .fb-page-label { font-size: 0.8rem; font-weight: 500; color: ${labelColor}; letter-spacing: 0.02em; }
        .fb-footer-brand {
          font-size: 0.8rem; font-weight: 800; letter-spacing: -0.01em;
          background: linear-gradient(90deg, #e879a0 0%, #a855f7 50%, #f97316 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        @media (max-width: 639px) {
          .fb-nav { width: 38px; height: 38px; min-width: 38px; }
          .fb-stage { padding: 10px 4px; gap: 4px; }
          .fb-topbar, .fb-bottombar { padding: 10px 14px; }
          .fb-title { font-size: 0.92rem; }
        }
      `}</style>

      <div className="fb-overlay">
        <div className="fb-topbar">
          <div className="fb-title">
            <BookOpen size={18} strokeWidth={2} style={{ color: "#a855f7" }} />
            Linit&nbsp;<span className="fb-title-accent">Magazine</span>
          </div>
          <div className="fb-controls">
            {!isMobile && (
              <>
                <button className="fb-btn" onClick={handleZoomOut} title="Zoom Out"><ZoomOut size={15} /></button>
                <button className="fb-btn" onClick={handleZoomIn} title="Zoom In"><ZoomIn size={15} /></button>
              </>
            )}
            <button className="fb-btn fb-close" onClick={onClose} title="Close"><X size={15} /></button>
          </div>
        </div>

        <div className="fb-stage">
          {!isReady && (
            <div className="fb-loading">
              <div className="fb-loading-icon"><BookOpen size={32} strokeWidth={1.5} /></div>
              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div className="fb-loading-title">
                  {totalPages === 0 ? <><span>Opening</span> magazine…</> : <><span>Rendering</span> pages…</>}
                </div>
                <div className="fb-loading-sub">GNU/Linux Users&apos; Group · NIT Durgapur</div>
              </div>
              {totalPages > 0 && (
                <>
                  <div className="fb-progress-track">
                    <div className="fb-progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="fb-progress-label">{loadedPages} / {totalPages} pages</div>
                </>
              )}
            </div>
          )}

          {isReady && dimsReady && (
            <>
              <button className="fb-nav" onClick={prevPage}><ChevronLeft size={20} strokeWidth={2.5} /></button>
              <div className="fb-book-wrap">
                <HTMLFlipBook
                  key={`${isMobile}-${bookDims.width}-${bookDims.height}`}
                  ref={flipBookRef}
                  width={bookDims.width}
                  height={bookDims.height}
                  size="fixed"
                  minWidth={160} maxWidth={560}
                  minHeight={220} maxHeight={760}
                  showCover={true}
                  flippingTime={600}
                  usePortrait={bookDims.portrait}
                  startPage={0}
                  drawShadow={true}
                  onFlip={handleFlip}
                  className="flipbook"
                  style={{}}
                  startZIndex={0}
                  autoSize={false}
                  maxShadowOpacity={0.6}
                  mobileScrollSupport={true}
                  clickEventForward={true}
                  useMouseEvents={true}
                  swipeDistance={20}
                  showPageCorners={!isMobile}
                  disableFlipByClick={false}
                >
                  {canvases.map((canvas, i) => (
                    <Page key={i} pageNumber={i + 1} canvas={canvas} isLoading={canvas === null} />
                  ))}
                </HTMLFlipBook>
              </div>
              <button className="fb-nav" onClick={nextPage}><ChevronRight size={20} strokeWidth={2.5} /></button>
            </>
          )}
        </div>

        <div className="fb-bottombar">
          <div className="fb-page-label">{pageLabel}</div>
          <div className="fb-footer-brand">Linit · NIT Durgapur</div>
        </div>
      </div>
    </>
  );
}