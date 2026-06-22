"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpandAlt } from "react-icons/fa";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images?: Array<{ src: string; width: number; height: number }>;
}

// ──────────────────────────────────────────────────────────────────────
// Pre-computed spatial layout: each image gets unique placement in the
// 3D canvas. Coordinates are in percent of the container's width/height.
// z = depth in px (higher = closer to viewer, parallax factor).
// rotate = subtle static tilt in degrees.
// ──────────────────────────────────────────────────────────────────────
const CARD_PLACEMENTS = [
  { x: 2,   y: 2,   z: 30,  rotate: -2.5, w: 22 },
  { x: 28,  y: 0,   z: 50,  rotate: 1.8,  w: 20 },
  { x: 54,  y: 3,   z: 20,  rotate: -1.2, w: 23 },
  { x: 78,  y: 1,   z: 40,  rotate: 2.2,  w: 20 },
  { x: 5,   y: 28,  z: 55,  rotate: 1.5,  w: 21 },
  { x: 30,  y: 26,  z: 15,  rotate: -2.0, w: 22 },
  { x: 55,  y: 30,  z: 45,  rotate: 0.8,  w: 20 },
  { x: 77,  y: 25,  z: 35,  rotate: -1.8, w: 21 },
  { x: 1,   y: 52,  z: 25,  rotate: 2.3,  w: 23 },
  { x: 27,  y: 55,  z: 50,  rotate: -0.5, w: 20 },
  { x: 52,  y: 53,  z: 35,  rotate: 1.2,  w: 22 },
  { x: 76,  y: 50,  z: 18,  rotate: -2.8, w: 21 },
  { x: 4,   y: 76,  z: 42,  rotate: -1.5, w: 22 },
  { x: 28,  y: 78,  z: 28,  rotate: 2.0,  w: 21 },
  { x: 53,  y: 75,  z: 55,  rotate: -0.8, w: 20 },
  { x: 77,  y: 77,  z: 32,  rotate: 1.6,  w: 22 },
  { x: 15,  y: 96,  z: 20,  rotate: -1.0, w: 21 },
  { x: 60,  y: 97,  z: 45,  rotate: 2.5,  w: 20 },
];

// Ambient floating particle config
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  duration: 12 + Math.random() * 16,
  delay: Math.random() * 8,
  opacity: 0.15 + Math.random() * 0.25,
}));

export default function GalleryModal({ isOpen, onClose, images = [] }: GalleryModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 }); // normalised 0-1
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Detect mobile breakpoint ──
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ── Lock body scroll when open ──
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ── Mouse tracking for parallax ──
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, [isMobile]);

  // ── Lightbox navigation ──
  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex === null || images.length === 0) return;
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev! - 1));
  }, [activeImageIndex, images]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex === null || images.length === 0) return;
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev! + 1));
  }, [activeImageIndex, images]);

  // ── Keyboard nav ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (activeImageIndex !== null) {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "Escape") setActiveImageIndex(null);
      } else {
        if (e.key === "Escape") onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeImageIndex, handlePrev, handleNext, onClose]);

  // ── Parallax calculations ──
  // Normalise mouse to -0.5...0.5
  const mx = mousePos.x - 0.5;
  const my = mousePos.y - 0.5;

  // Compute card placements based on number of images
  const placements = useMemo(() => {
    return images.map((_, i) => CARD_PLACEMENTS[i % CARD_PLACEMENTS.length]);
  }, [images]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* ── Backdrop ── */}
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* ── Main Modal Container ── */}
          <motion.div
            className="relative w-[95vw] max-w-[1600px] h-[92vh] md:h-[88vh] rounded-3xl border border-white/10 bg-[#05060b]/95 backdrop-blur-2xl shadow-[0_0_60px_rgba(59,130,246,0.25),_0_0_120px_rgba(59,130,246,0.08)] overflow-hidden z-10 flex flex-col"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 200 }}
          >
            {/* ── Ambient glow orbs ── */}
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[200px] pointer-events-none" />

            {/* ── Floating particles ── */}
            {PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full bg-blue-400 pointer-events-none"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  opacity: 0,
                }}
                animate={{
                  y: [0, -40, 0, 40, 0],
                  x: [0, 15, 0, -15, 0],
                  opacity: [0, p.opacity, p.opacity, p.opacity, 0],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* ── Header ── */}
            <div className="px-6 py-5 md:px-8 md:py-6 flex items-center justify-between border-b border-white/[0.06] relative z-20 bg-[#05060b]/60 backdrop-blur-sm">
              <h2 className="text-xl md:text-2xl font-extrabold tracking-wider uppercase bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                Creative Gallery
              </h2>
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-blue-500/30 transition duration-300 group cursor-pointer"
                aria-label="Close Gallery"
              >
                <FaTimes className="text-sm transition-transform group-hover:rotate-90 duration-300" />
              </button>
            </div>

            {/* ── 3D Gallery Canvas ── */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              className="flex-grow relative z-10 overflow-hidden"
            >
              {images.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/40">
                  <p className="text-lg">No gallery images found.</p>
                </div>
              ) : isMobile ? (
                /* ────────────── MOBILE: Swipeable Carousel ────────────── */
                <div className="w-full h-full flex items-center overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none px-6 gap-5 py-8">
                  {images.map((img, i) => {
                    const floatDuration = 7 + (i * 1.7) % 6;
                    const floatDelay = (i * 0.5) % 3;
                    return (
                      <motion.div
                        key={img.src}
                        className="flex-shrink-0 snap-center w-[75vw] max-w-[320px] relative"
                        animate={{ y: [0, -8, 0, 8, 0] }}
                        transition={{
                          duration: floatDuration,
                          delay: floatDelay,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div
                          className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-2.5 shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:border-blue-500/40 transition-all duration-300 cursor-pointer overflow-hidden group"
                          onClick={() => setActiveImageIndex(i)}
                        >
                          <div className="relative w-full rounded-xl overflow-hidden bg-black/30 flex items-center justify-center">
                            <Image
                              src={img.src}
                              alt={`Gallery ${i + 1}`}
                              width={img.width}
                              height={img.height}
                              className="w-full h-auto object-contain pointer-events-none rounded-xl"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="p-3 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-400 backdrop-blur-md">
                                <FaExpandAlt className="text-sm" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                /* ────────────── DESKTOP: 3D Spatial Canvas ────────────── */
                <div
                  className="w-full relative overflow-y-auto overflow-x-hidden custom-scrollbar"
                  style={{
                    perspective: "1200px",
                    perspectiveOrigin: "50% 50%",
                    height: "100%",
                  }}
                >
                  {/* Scrollable inner canvas — tall enough for all cards */}
                  <div
                    className="relative w-full"
                    style={{
                      transformStyle: "preserve-3d",
                      minHeight: "140%",
                    }}
                  >
                    {images.map((img, i) => {
                      const p = placements[i];
                      const parallaxStrength = p.z * 0.35;
                      const px = mx * parallaxStrength;
                      const py = my * parallaxStrength;
                      const floatDuration = 8 + (i * 1.3) % 7;
                      const floatDelay = (i * 0.6) % 4;

                      return (
                        <motion.div
                          key={img.src}
                          className="absolute cursor-pointer"
                          style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: `${p.w}%`,
                            zIndex: Math.round(p.z),
                            transform: `translate3d(${px}px, ${py}px, ${p.z}px) rotate(${p.rotate}deg)`,
                            transition: "transform 0.15s ease-out",
                          }}
                          animate={{ y: [0, -14, 0, 14, 0] }}
                          transition={{
                            duration: floatDuration,
                            delay: floatDelay,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          whileHover={{
                            scale: 1.06,
                            zIndex: 100,
                            transition: { duration: 0.3 },
                          }}
                          onClick={() => setActiveImageIndex(i)}
                        >
                          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md p-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.3),_0_0_15px_rgba(59,130,246,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.4),_0_0_30px_rgba(59,130,246,0.2)] hover:border-blue-500/30 transition-all duration-300 overflow-hidden group relative">
                            {/* Shine sweep */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-10 pointer-events-none" />

                            <div className="relative w-full rounded-xl overflow-hidden bg-black/25 flex items-center justify-center">
                              <Image
                                src={img.src}
                                alt={`Gallery ${i + 1}`}
                                width={img.width}
                                height={img.height}
                                className="w-full h-auto object-contain pointer-events-none rounded-xl"
                                loading="lazy"
                              />
                              {/* Hover expand icon */}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                                <motion.div
                                  className="p-3 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-400 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                                  whileHover={{ scale: 1.15 }}
                                >
                                  <FaExpandAlt className="text-sm" />
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* ── Bottom reflective gradient ── */}
                  <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#05060b] via-[#05060b]/60 to-transparent pointer-events-none z-30" />
                </div>
              )}
            </div>
          </motion.div>

          {/* ────────────── Lightbox Overlay ────────────── */}
          <AnimatePresence>
            {activeImageIndex !== null && (
              <motion.div
                className="fixed inset-0 z-[2500] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveImageIndex(null)}
              >
                {/* Top bar */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-50">
                  <span className="text-white/60 text-sm font-medium tracking-wide">
                    {activeImageIndex + 1} / {images.length}
                  </span>
                  <button
                    onClick={() => setActiveImageIndex(null)}
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-blue-500/30 transition duration-300 cursor-pointer"
                  >
                    <FaTimes className="text-base" />
                  </button>
                </div>

                {/* Prev */}
                <button
                  onClick={handlePrev}
                  className="absolute left-6 p-4 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-blue-500/30 shadow-lg transition duration-300 z-50 cursor-pointer"
                  aria-label="Previous image"
                >
                  <FaChevronLeft className="text-base" />
                </button>

                {/* Image */}
                <motion.div
                  key={activeImageIndex}
                  className="relative max-w-[85vw] max-h-[80vh] w-full h-full flex items-center justify-center p-4 z-40 select-none pointer-events-none"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 250 }}
                >
                  <Image
                    src={images[activeImageIndex].src}
                    alt="Enlarged Gallery Artwork"
                    fill
                    sizes="85vw"
                    className="object-contain pointer-events-none"
                    priority
                  />
                </motion.div>

                {/* Next */}
                <button
                  onClick={handleNext}
                  className="absolute right-6 p-4 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-blue-500/30 shadow-lg transition duration-300 z-50 cursor-pointer"
                  aria-label="Next image"
                >
                  <FaChevronRight className="text-base" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
