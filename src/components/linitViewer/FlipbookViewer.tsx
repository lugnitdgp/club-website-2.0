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

// ─── Types ────────────────────────────────────────────────────────────────────
interface FlipbookViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfURL: string;
}

// ─── Single Page Component ────────────────────────────────────────────────────
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
    <div ref={ref} className="page-wrapper">
      <div className="page-inner">
        {isLoading ? (
          <div className="page-loading">
            <Loader2 className="animate-spin text-purple-400" size={32} />
            <span className="page-num">Page {pageNumber}</span>
          </div>
        ) : (
          <div ref={containerRef} className="page-canvas-container" />
        )}
        <div className="page-number">{pageNumber}</div>
        {/* Paper texture overlay */}
        <div className="page-texture" />
      </div>
    </div>
  );
});
Page.displayName = "Page";

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FlipbookViewer({
  isOpen,
  onClose,
  pdfURL,
}: FlipbookViewerProps) {
  const [canvases, setCanvases] = useState<(HTMLCanvasElement | null)[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loadedPages, setLoadedPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const flipBookRef = useRef<any>(null);

  // Load PDF using pdfjs-dist
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

      // Render pages progressively
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

  const handleFlip = (e: any) => setCurrentPage(e.data);
  const prevPage = () => flipBookRef.current?.pageFlip()?.flipPrev();
  const nextPage = () => flipBookRef.current?.pageFlip()?.flipNext();

  const handleZoomIn = () => {
    setScale((s) => Math.min(s + 0.3, 2.5));
  };
  const handleZoomOut = () => {
    setScale((s) => Math.max(s - 0.3, 0.6));
  };

  // Re-render on scale change
  useEffect(() => {
    if (isOpen && pdfURL && !isLoadingPdf) loadPdf();
  }, [scale]);

  if (!isOpen) return null;

  const progress = totalPages > 0 ? (loadedPages / totalPages) * 100 : 0;
  const isReady = loadedPages === totalPages && totalPages > 0;

  return (
    <>
      {/* Styles */}
      <style>{`
        .flipbook-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: radial-gradient(ellipse at center, #1a0a2e 0%, #0d0618 60%, #050208 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Georgia', serif;
          overflow: hidden;
        }

        /* Ambient particles */
        .flipbook-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(1px 1px at 20% 30%, rgba(167,139,250,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 70%, rgba(167,139,250,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 50% 50%, rgba(139,92,246,0.2) 0%, transparent 100%),
            radial-gradient(1px 1px at 10% 80%, rgba(196,181,253,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 20%, rgba(167,139,250,0.2) 0%, transparent 100%);
          pointer-events: none;
        }

        .flipbook-topbar {
          position: relative;
          z-index: 10;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-bottom: 1px solid rgba(167,139,250,0.15);
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(10px);
        }

        .flipbook-title {
          color: #e9d5ff;
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-shadow: 0 0 20px rgba(167,139,250,0.5);
        }

        .flipbook-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ctrl-btn {
          background: rgba(167,139,250,0.1);
          border: 1px solid rgba(167,139,250,0.2);
          color: #c4b5fd;
          border-radius: 8px;
          padding: 8px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ctrl-btn:hover {
          background: rgba(167,139,250,0.25);
          border-color: rgba(167,139,250,0.5);
          color: #ede9fe;
          box-shadow: 0 0 12px rgba(167,139,250,0.3);
        }

        .close-btn {
          background: rgba(239,68,68,0.1);
          border-color: rgba(239,68,68,0.2);
          color: #fca5a5;
        }

        .close-btn:hover {
          background: rgba(239,68,68,0.25);
          border-color: rgba(239,68,68,0.5);
          color: #fee2e2;
          box-shadow: 0 0 12px rgba(239,68,68,0.3);
        }

        .flipbook-stage {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 10;
          width: 100%;
          padding: 20px;
          gap: 16px;
        }

        .nav-btn {
          background: rgba(167,139,250,0.12);
          border: 1px solid rgba(167,139,250,0.25);
          color: #c4b5fd;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.25s;
        }

        .nav-btn:hover {
          background: rgba(167,139,250,0.3);
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(167,139,250,0.4);
        }

        /* Drop shadow on book */
        .flipbook-wrapper {
          filter: drop-shadow(0 30px 60px rgba(0,0,0,0.8)) drop-shadow(0 0 40px rgba(139,92,246,0.15));
          flex-shrink: 0;
        }

        /* Page styles */
        .page-wrapper {
          width: 100%;
          height: 100%;
          background: #fff;
        }

        .page-inner {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          background: #fafaf8;
        }

        .page-canvas-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .page-canvas-container canvas {
          max-width: 100%;
          max-height: 100%;
        }

        .page-loading {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: #f5f3ff;
        }

        .page-num {
          font-size: 0.85rem;
          color: #7c3aed;
        }

        .page-number {
          position: absolute;
          bottom: 10px;
          right: 14px;
          font-size: 0.7rem;
          color: #9ca3af;
          font-family: 'Georgia', serif;
        }

        .page-texture {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.4;
        }

        .flipbook-bottombar {
          position: relative;
          z-index: 10;
          width: 100%;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          border-top: 1px solid rgba(167,139,250,0.15);
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(10px);
        }

        .page-indicator {
          color: #c4b5fd;
          font-size: 0.9rem;
          letter-spacing: 0.08em;
          min-width: 120px;
          text-align: center;
        }

        /* Loading overlay */
        .loading-overlay {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          background: rgba(13, 6, 24, 0.92);
          backdrop-filter: blur(8px);
        }

        .loading-icon {
          color: #a78bfa;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.95); }
        }

        .loading-text {
          color: #e9d5ff;
          font-size: 1rem;
          letter-spacing: 0.1em;
        }

        .progress-bar-track {
          width: 220px;
          height: 3px;
          background: rgba(167,139,250,0.2);
          border-radius: 999px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #7c3aed, #a78bfa);
          border-radius: 999px;
          transition: width 0.3s ease;
          box-shadow: 0 0 8px rgba(167,139,250,0.6);
        }

        .progress-label {
          color: #9ca3af;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
        }

        /* Mobile responsive */
        @media (max-width: 640px) {
          .nav-btn { width: 36px; height: 36px; }
          .flipbook-stage { padding: 10px 6px; gap: 8px; }
          .flipbook-topbar { padding: 12px 16px; }
        }
      `}</style>

      <div className="flipbook-overlay">
        {/* Top Bar */}
        <div className="flipbook-topbar">
          <div className="flipbook-title">
            <BookOpen size={16} style={{ display: "inline", marginRight: 8, verticalAlign: "middle" }} />
            Linit Magazine
          </div>
          <div className="flipbook-controls">
            <button className="ctrl-btn" onClick={handleZoomOut} title="Zoom Out">
              <ZoomOut size={16} />
            </button>
            <button className="ctrl-btn" onClick={handleZoomIn} title="Zoom In">
              <ZoomIn size={16} />
            </button>
            <button className="ctrl-btn close-btn" onClick={onClose} title="Close">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Stage */}
        <div className="flipbook-stage">
          {/* Loading overlay */}
          {!isReady && (
            <div className="loading-overlay">
              <BookOpen size={48} className="loading-icon" />
              <div className="loading-text">
                {totalPages === 0 ? "Opening magazine…" : `Rendering pages…`}
              </div>
              {totalPages > 0 && (
                <>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="progress-label">{loadedPages} / {totalPages} pages</div>
                </>
              )}
            </div>
          )}

          {isReady && (
            <>
              <button className="nav-btn" onClick={prevPage}>
                <ChevronLeft size={22} />
              </button>

              <div className="flipbook-wrapper">
                <HTMLFlipBook
                  ref={flipBookRef}
                  width={Math.min(380, (window.innerWidth - 160) / 2)}
                  height={Math.min(540, (window.innerHeight - 160))}
                  size="fixed"
                  minWidth={200}
                  maxWidth={500}
                  minHeight={280}
                  maxHeight={700}
                  showCover={true}
                  flippingTime={700}
                  usePortrait={false}
                  startPage={0}
                  drawShadow={true}
                  onFlip={handleFlip}
                  className="flipbook"
                  style={{}}
                  startZIndex={0}
                  autoSize={false}
                  maxShadowOpacity={0.5}
                  mobileScrollSupport={true}
                  clickEventForward={true}
                  useMouseEvents={true}
                  swipeDistance={30}
                  showPageCorners={true}
                  disableFlipByClick={false}
                >
                  {canvases.map((canvas, i) => (
                    <Page
                      key={i}
                      pageNumber={i + 1}
                      canvas={canvas}
                      isLoading={canvas === null}
                    />
                  ))}
                </HTMLFlipBook>
              </div>

              <button className="nav-btn" onClick={nextPage}>
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="flipbook-bottombar">
          <div className="page-indicator">
            {isReady
              ? `Page ${currentPage + 1} – ${Math.min(currentPage + 2, totalPages)} of ${totalPages}`
              : "Loading…"}
          </div>
        </div>
      </div>
    </>
  );
}