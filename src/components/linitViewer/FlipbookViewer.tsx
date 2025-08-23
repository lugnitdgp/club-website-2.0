"use client";

import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from "react-pageflip";
import { Button } from "@heroui/react";
import { X } from "lucide-react";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

interface FlipbookViewerProps {
    isOpen: boolean;
    onClose: () => void;
    pdfURL: string; 
}

const ASPECT_RATIO = 595 / 842; // width / height

function useScreenHeightWidth() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const Pages = React.forwardRef((props : any , ref : any) => {
    return (
        <div
            ref={ref}
            className="w-full h-full flex flex-col items-center justify-center bg-white"
            style={{ minHeight: "100%", minWidth: "100%" }}
        >
            {props.children}
            <p className="mt-2 text-center text-xs text-gray-500">Page number: {props.number}</p>
        </div>
    );
});

Pages.displayName = 'Pages';

const FlipbookViewer = ({
  isOpen,
  onClose,
  pdfURL ,
} : FlipbookViewerProps) => {
    console.log(pdfjs.version);
    // const [pdf, setPdf] = useState<PDFDocumentProxy>();
    const [numPages, setNumPages] = useState<number | null>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }
  

//   useEffect(() => {
//     if (!isOpen) return;

//     const loadPDF = async () => {
//       if (!pdfURL) return;

//       try {
//         const loadingTask = pdfjs.getDocument(pdfURL);
//         const pdf = await loadingTask.promise;
//         const numPages = pdf.numPages;
//         setNumPages(numPages);
//         setPdf(pdf);
//       } catch (error) {
//         console.error("Error loading PDF:", error);
//       }
//     };

//     loadPDF();
//   }, [isOpen, pdfURL]);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      if (isOpen) setCurrentPage(1);
    }, [isOpen, pdfURL]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
      document.addEventListener("fullscreenchange", handleFullscreenChange);
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }

    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [isOpen, onClose]);

    const { width: screenWidth, height: screenHeight } = useScreenHeightWidth();
    const pageHeight = screenHeight;
    const pageWidth = Math.round(pageHeight * ASPECT_RATIO);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <Button
        className="absolute top-6 right-8 text-black hover:text-red-400 z-50"
        onPress={onClose}
        size="md"
      >
        <X className="w-6 h-6" />
      </Button>

      <div className="w-full h-full flex items-center justify-center">
<Document
            file={pdfURL}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={<div className="text-white">Loading PDF...</div>}
          >
            {numPages && (
              <HTMLFlipBook
                width={pageWidth}
                height={pageHeight}
                size="stretch"
                minWidth={pageWidth}
                maxWidth={pageWidth}
                minHeight={pageHeight}
                maxHeight={pageHeight}
                drawShadow={true}
                flippingTime={800}
                showCover={true}
                useMouseEvents={true}
                usePortrait={true}
                startPage={currentPage - 1}
                mobileScrollSupport={true}
                clickEventForward={true}
                showPageCorners={true}
                style={{ width: pageWidth, height: pageHeight }}
                startZIndex={0}
                autoSize={true}
                maxShadowOpacity={0.5}
                swipeDistance={30}
                disableFlipByClick={false}
                className="rounded-none border-none bg-white"
                onFlip={(e: any) => setCurrentPage(e.data + 1)}
              >
                {Array.from({ length: numPages }, (_, idx) => (
                  <Pages key={idx} number={idx + 1}>
                    <Page
                      pageNumber={idx + 1}
                      width={pageWidth}
                      height={pageHeight}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      className="w-full h-full"
                    />
                  </Pages>
                ))}
              </HTMLFlipBook>
            )}
          </Document>
      </div>
    </div>
  );
};

export default FlipbookViewer;