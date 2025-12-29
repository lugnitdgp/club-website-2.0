"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import dynamic from "next/dynamic";

interface FlipbookViewerProps {
    isOpen: boolean;
    onClose: () => void;
    pdfURL: string; 
}

const FlipbookViewer = ({ isOpen, onClose, pdfURL }: FlipbookViewerProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isOpen) {
        onClose();
      }
    };

    if (isOpen && mounted) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(() => {
          // Fullscreen failed, just continue
        });
      }
      document.addEventListener("fullscreenchange", handleFullscreenChange);
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {
          // Exit fullscreen failed
        });
      }
    }

    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [isOpen, onClose, mounted]);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-6 right-8 text-white hover:text-red-400 z-50 p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="w-full h-full flex items-center justify-center p-8">
        <iframe
          src={pdfURL}
          className="w-full h-full border-none rounded-lg"
          title="PDF Viewer"
        />
      </div>
    </div>
  );
};

export default FlipbookViewer;
