"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Loader2,
  BookOpen,
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
          <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, background: "#f5f3ff" }}>
            <Loader2 style={{ color: "#7c3aed", animation: "spin 1s linear infinite" }} size={28} />
            <span style={{ fontSize: "0.8rem", color: "#7c3aed" }}>Page {pageNumber}</span>
          </div>
        ) : (
          <div ref={containerRef} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }} />
        )}
        <div style={{ position: "absolute", bottom: 8, right: 10, fontSize: "0.65rem", color: "#9ca3af", fontFamily: "Georgia, serif" }}>
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
    // Single page: use almost full screen
    const navBtnWidth = 44;
    const sidePadding = 12;
    const w = Math.floor(vw - navBtnWidth * 2 - sidePadding * 2 - 8);
    const h = Math.floor(vh * 0.75);
    return { width: Math.max(w, 200), height: Math.max(h, 300), portrait: true };
  } else {
    // Two-page spread: bigger on desktop
    const navBtnWidth = 56;
    const sidePadding = 24;
    const availableW = vw - navBtnWidth * 2 - sidePadding * 2;
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

  useEffect(() => {
    if (isOpen && pdfURL) loadPdf();
  }, [isOpen, pdfURL]);

  useEffect(() => {
    if (isOpen && pdfURL && !isLoadingPdf) loadPdf();
  }, [scale]);

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

  return (
    <>
      <style>{`
        @keyframes fb-spin { to { transform: rotate(360deg); } }
        @keyframes fb-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.95); }
        }
        .fb-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: radial-gradient(ellipse at center, #1a0a2e 0%, #0d0618 60%, #050208 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-start;
          font-family: Georgia, serif; overflow: hidden;
        }
        .fb-overlay::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background-image:
            radial-gradient(1px 1px at 20% 30%, rgba(167,139,250,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 70%, rgba(167,139,250,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 50% 50%, rgba(139,92,246,0.2) 0%, transparent 100%),
            radial-gradient(1px 1px at 10% 80%, rgba(196,181,253,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 20%, rgba(167,139,250,0.2) 0%, transparent 100%);
        }
        .fb-topbar {
          position: relative; z-index: 10; width: 100%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 20px;
          border-bottom: 1px solid rgba(167,139,250,0.15);
          background: rgba(255,255,255,0.03); backdrop-filter: blur(10px);
        }
        .fb-title {
          color: #e9d5ff; font-size: 1rem; font-weight: 600;
          letter-spacing: 0.05em; text-shadow: 0 0 20px rgba(167,139,250,0.5);
          display: flex; align-items: center; gap: 8px;
        }
        .fb-controls { display: flex; align-items: center; gap: 6px; }
        .fb-btn {
          background: rgba(167,139,250,0.1); border: 1px solid rgba(167,139,250,0.2);
          color: #c4b5fd; border-radius: 8px; padding: 7px; cursor: pointer;
          transition: all 0.2s; display: flex; align-items: center; justify-content: center;
        }
        .fb-btn:hover {
          background: rgba(167,139,250,0.25); border-color: rgba(167,139,250,0.5);
          color: #ede9fe; box-shadow: 0 0 12px rgba(167,139,250,0.3);
        }
        .fb-close {
          background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.2); color: #fca5a5;
        }
        .fb-close:hover {
          background: rgba(239,68,68,0.25); border-color: rgba(239,68,68,0.5);
          color: #fee2e2; box-shadow: 0 0 12px rgba(239,68,68,0.3);
        }
        .fb-stage {
          flex: 1; position: relative; z-index: 10;
          width: 100%; display: flex; align-items: center; justify-content: center;
          padding: 16px 8px; gap: 8px; min-height: 0;
        }
        .fb-nav {
          background: rgba(167,139,250,0.12); border: 1px solid rgba(167,139,250,0.25);
          color: #c4b5fd; border-radius: 50%; cursor: pointer; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.25s; width: 44px; height: 44px; min-width: 44px;
        }
        .fb-nav:hover {
          background: rgba(167,139,250,0.3); transform: scale(1.1);
          box-shadow: 0 0 20px rgba(167,139,250,0.4);
        }
        .fb-book-wrap {
          flex-shrink: 0; display: flex; align-items: center; justify-content: center;
          filter: drop-shadow(0 24px 48px rgba(0,0,0,0.85)) drop-shadow(0 0 32px rgba(139,92,246,0.18));
        }
        .fb-loading {
          position: absolute; inset: 0; z-index: 20;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 20px; background: rgba(13,6,24,0.93); backdrop-filter: blur(8px);
        }
        .fb-loading-icon { color: #a78bfa; animation: fb-pulse 2s ease-in-out infinite; }
        .fb-loading-text { color: #e9d5ff; font-size: 1rem; letter-spacing: 0.1em; }
        .fb-progress-track {
          width: 200px; height: 3px; background: rgba(167,139,250,0.2);
          border-radius: 999px; overflow: hidden;
        }
        .fb-progress-fill {
          height: 100%; background: linear-gradient(90deg, #7c3aed, #a78bfa);
          border-radius: 999px; transition: width 0.3s ease;
          box-shadow: 0 0 8px rgba(167,139,250,0.6);
        }
        .fb-progress-label { color: #9ca3af; font-size: 0.8rem; letter-spacing: 0.05em; }
        .fb-bottombar {
          position: relative; z-index: 10; width: 100%; flex-shrink: 0;
          padding: 10px 20px; display: flex; align-items: center; justify-content: center;
          border-top: 1px solid rgba(167,139,250,0.15);
          background: rgba(255,255,255,0.03); backdrop-filter: blur(10px);
        }
        .fb-page-label { color: #c4b5fd; font-size: 0.85rem; letter-spacing: 0.06em; }

        @media (max-width: 639px) {
          .fb-nav { width: 36px; height: 36px; min-width: 36px; }
          .fb-stage { padding: 10px 4px; gap: 4px; }
          .fb-topbar { padding: 10px 12px; }
        }
      `}</style>

      <div className="fb-overlay">
        {/* Top Bar */}
        <div className="fb-topbar">
          <div className="fb-title">
            <BookOpen size={15} />
            Linit Magazine
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

        {/* Stage */}
        <div className="fb-stage">
          {!isReady && (
            <div className="fb-loading">
              <BookOpen size={44} className="fb-loading-icon" />
              <div className="fb-loading-text">
                {totalPages === 0 ? "Opening magazine…" : "Rendering pages…"}
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
              <button className="fb-nav" onClick={prevPage}><ChevronLeft size={20} /></button>

              <div className="fb-book-wrap">
                <HTMLFlipBook
                  key={`${isMobile}-${bookDims.width}-${bookDims.height}`}
                  ref={flipBookRef}
                  width={bookDims.width}
                  height={bookDims.height}
                  size="fixed"
                  minWidth={160}
                  maxWidth={560}
                  minHeight={220}
                  maxHeight={760}
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

              <button className="fb-nav" onClick={nextPage}><ChevronRight size={20} /></button>
            </>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="fb-bottombar">
          <div className="fb-page-label">{pageLabel}</div>
        </div>
      </div>
    </>
  );
}