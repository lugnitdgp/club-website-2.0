"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MediaItemType {
  id: number;
  type: string;
  title: string;
  desc: string;
  url: string;
  bg: string;
  span: string;
  user: {
    name: string;
    username: string;
    profile_image: string;
    profile_image_90: string;
  };
  organization: {
    name: string;
    username: string;
    profile_image: string;
    profile_image_90: string;
  } | null;
}

// ─── MediaItem ────────────────────────────────────────────────────────────────
const MediaItem = ({
  item,
  className,
  onClick,
}: {
  item: MediaItemType;
  className?: string;
  onClick?: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => setIsInView(e.isIntersecting)),
      { root: null, rootMargin: "50px", threshold: 0.1 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => { if (videoRef.current) observer.unobserve(videoRef.current); };
  }, []);

  useEffect(() => {
    let alive = true;
    const play = async () => {
      if (!videoRef.current || !isInView || !alive) return;
      try {
        if (videoRef.current.readyState >= 3) {
          setIsBuffering(false);
          await videoRef.current.play();
        } else {
          setIsBuffering(true);
          await new Promise<void>((res) => {
            if (videoRef.current) videoRef.current.oncanplay = () => res();
          });
          if (alive) { setIsBuffering(false); await videoRef.current?.play(); }
        }
      } catch (err) { console.warn("Video playback failed:", err); }
    };
    if (isInView) play();
    else videoRef.current?.pause();
    return () => {
      alive = false;
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute("src");
        videoRef.current.load();
      }
    };
  }, [isInView]);

  if (item.type === "video") {
    return (
      <div className={`${className} relative overflow-hidden`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onClick={onClick}
          playsInline muted loop preload="auto"
          style={{ opacity: isBuffering ? 0.8 : 1, transition: "opacity 0.2s" }}
        >
          <source src={item.url} type="video/mp4" />
        </video>
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={item.bg}
      alt={item.title}
      className={`${className} object-cover cursor-pointer`}
      onClick={onClick}
      loading="lazy"
      decoding="async"
    />
  );
};

// ─── GalleryModal ─────────────────────────────────────────────────────────────
interface GalleryModalProps {
  selectedItem: MediaItemType;
  onClose: () => void;
  onSelectItem: (item: MediaItemType) => void;
  mediaItems: MediaItemType[];
}

const GalleryModal = ({ selectedItem, onClose, onSelectItem, mediaItems }: GalleryModalProps) => {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [dockPos, setDockPos] = useState({ x: 0, y: 0 });

  // Trigger enter animation one frame after mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => onClose(), 220);
  }, [closing, onClose]);

  const shown = visible && !closing;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          backgroundColor: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          opacity: shown ? 1 : 0,
          transition: "opacity 0.2s ease",
          cursor: "pointer",
          pointerEvents: closing ? "none" : "auto",
        }}
      />

      {/* Media card */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          opacity: shown ? 1 : 0,
          transform: shown ? "scale(1)" : "scale(0.96)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          pointerEvents: closing ? "none" : "auto",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ position: "relative", width: "100%", maxWidth: "56rem", aspectRatio: "16/9" }}
          className="rounded-2xl overflow-hidden shadow-2xl bg-gray-900"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItem.id}
              className="w-full h-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <MediaItem
                item={selectedItem}
                className="w-full h-full"
                onClick={() => window.open(selectedItem.url, "_blank")}
              />
            </motion.div>
          </AnimatePresence>

          {/* Info overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/70 to-transparent"
            style={{ pointerEvents: "none" }}
          >
            <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
              {selectedItem.title}
            </h3>
            {selectedItem.desc && (
              <p className="text-white/80 text-sm mt-1">{selectedItem.desc}</p>
            )}
            <div className="flex items-center mt-3">
              <img
                src={selectedItem.user.profile_image_90}
                alt={selectedItem.user.name}
                className="w-7 h-7 rounded-full mr-2"
              />
              <div>
                <p className="text-white text-sm font-medium">{selectedItem.user.name}</p>
                <p className="text-white/70 text-xs">@{selectedItem.user.username}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 10000,
          opacity: shown ? 1 : 0,
          transition: "opacity 0.2s ease",
          pointerEvents: closing ? "none" : "auto",
        }}
        className="p-2.5 rounded-full bg-white/20 text-white hover:bg-white/35
                   backdrop-blur-sm border border-white/20 shadow-lg transition-colors duration-150"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Draggable thumbnail dock */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.08}
        onDragEnd={(_, info) =>
          setDockPos((p) => ({ x: p.x + info.offset.x, y: p.y + info.offset.y }))
        }
        style={{
          position: "fixed",
          zIndex: 10000,
          left: "50%",
          bottom: "1.5rem",
          x: `calc(-50% + ${dockPos.x}px)`,
          y: dockPos.y,
          opacity: shown ? 1 : 0,
          transition: "opacity 0.2s ease",
          pointerEvents: closing ? "none" : "auto",
          touchAction: "none",
        }}
        className="rounded-xl bg-sky-400/20 backdrop-blur-xl border border-blue-400/30 shadow-lg cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center -space-x-2 px-3 py-2">
          {mediaItems.map((item, index) => {
            const isActive = selectedItem.id === item.id;
            return (
              <motion.div
                key={item.id}
                onClick={(e) => { e.stopPropagation(); onSelectItem(item); }}
                style={{ zIndex: isActive ? 30 : mediaItems.length - index }}
                className={`relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex-shrink-0
                  rounded-lg overflow-hidden cursor-pointer
                  ${isActive ? "ring-2 ring-white/70 shadow-lg" : "hover:ring-2 hover:ring-white/30"}`}
                initial={{ rotate: index % 2 === 0 ? -15 : 15 }}
                animate={{
                  scale: isActive ? 1.2 : 1,
                  rotate: isActive ? 0 : index % 2 === 0 ? -15 : 15,
                  y: isActive ? -8 : 0,
                }}
                whileHover={{ scale: 1.3, rotate: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <MediaItem item={item} className="w-full h-full" onClick={() => onSelectItem(item)} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </>,
    document.body
  );
};

// ─── InteractiveBentoBlogs ────────────────────────────────────────────────────
interface InteractiveBentoBlogsProps {
  mediaItems: MediaItemType[];
  title: string;
  description: string;
}

const InteractiveBentoBlogs: React.FC<InteractiveBentoBlogsProps> = ({
  mediaItems,
  title,
  description,
}) => {
  const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
  const [items, setItems] = useState(mediaItems);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="mx-auto px-4 py-8 w-full">
      {(title || description) && (
        <div className="mb-8 text-center">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent
                       bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
                       dark:from-white dark:via-gray-200 dark:to-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {description}
          </motion.p>
        </div>
      )}

      {/* Grid always stays mounted */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[60px]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className={`relative overflow-hidden rounded-xl cursor-move ${item.span}`}
            onClick={() => !isDragging && setSelectedItem(item)}
            variants={{
              hidden: { y: 50, scale: 0.9, opacity: 0 },
              visible: {
                y: 0, scale: 1, opacity: 1,
                transition: { type: "spring", stiffness: 350, damping: 25, delay: index * 0.05 },
              },
            }}
            whileHover={{ scale: 1.02 }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info) => {
              setIsDragging(false);
              const dist = info.offset.x + info.offset.y;
              if (Math.abs(dist) > 50) {
                const next = [...items];
                const [dragged] = next.splice(index, 1);
                const target = dist > 0
                  ? Math.min(index + 1, items.length - 1)
                  : Math.max(index - 1, 0);
                next.splice(target, 0, dragged);
                setItems(next);
              }
            }}
          >
            <MediaItem
              item={item}
              className="absolute inset-0 w-full h-full"
              onClick={() => !isDragging && setSelectedItem(item)}
            />
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4">
                <h3 className="relative text-white text-xs sm:text-sm md:text-base font-medium line-clamp-1">
                  {item.title}
                </h3>
                <p className="relative text-white/70 text-[10px] sm:text-xs md:text-sm mt-0.5 line-clamp-2">
                  {item.desc}
                </p>
                <div className="flex items-center mt-2 relative z-10">
                  <img
                    src={item.user.profile_image_90}
                    alt={item.user.name}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-white text-sm font-medium">{item.user.name}</p>
                    <p className="text-white/70 text-xs">@{item.user.username}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Portal modal — mounts only when item is selected, handles its own enter/exit */}
      {selectedItem && (
        <GalleryModal
          selectedItem={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSelectItem={(item) => setSelectedItem(item)}
          mediaItems={items}
        />
      )}
    </div>
  );
};

export default InteractiveBentoBlogs;