"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
import Image from "next/image";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  gradient?: string;
  imgSrc?: string;
  width?: number;
  height?: number;
}

/** Full-screen lightbox preview overlay */
export default function Lightbox({ isOpen, onClose, title, gradient, imgSrc, width, height }: LightboxProps) {
  /* Keyboard support */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <HiX size={20} />
          </button>

          {/* Content */}
          <motion.div
            className="relative z-10 max-w-4xl w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Image display or gradient placeholder */}
            {imgSrc ? (
              <div className="relative flex items-center justify-center rounded-2xl overflow-hidden border border-white/10 bg-black/50 w-full max-h-[75vh]">
                <Image
                  src={imgSrc}
                  alt={title || "Preview"}
                  width={width || 1200}
                  height={height || 800}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl"
                  loading="lazy"
                />
              </div>
            ) : (
              <div
                className={`aspect-video rounded-2xl bg-gradient-to-br ${
                  gradient || "from-accent/20 to-accent-dark/20"
                } bg-background-secondary border border-white/10`}
              />
            )}
            {title && (
              <p className="text-center text-white font-medium mt-4">
                {title}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
