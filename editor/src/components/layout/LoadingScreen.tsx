"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ──────────────────────────────────────────────────────────────────
// Type definitions for client-generated particles
// ──────────────────────────────────────────────────────────────────
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  driftY1: number; // pre-computed random animation offset
  driftY2: number;
}

interface Spark {
  id: number;
  angle: number;
  distance: number;
  size: number;
  duration: number;
  delay: number;
  cx: number; // pre-computed cos(angle) * distance
  cy: number; // pre-computed sin(angle) * distance
}

const LOGO_LETTERS = "ABHIZT".split("");
const SUBTITLE_TEXT = "Creative Editor • Designer • Developer";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [showFinalFlash, setShowFinalFlash] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [sparks, setSparks] = useState<Spark[]>([]);

  // ── Generate particles & sparks client-side only ──
  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1.5 + Math.random() * 3.5,
        duration: 10 + Math.random() * 18,
        delay: Math.random() * 6,
        opacity: 0.12 + Math.random() * 0.28,
        driftY1: -30 - Math.random() * 30,
        driftY2: 30 + Math.random() * 20,
      }))
    );
    setSparks(
      Array.from({ length: 12 }, (_, i) => {
        const angle = (360 / 12) * i;
        const distance = 80 + Math.random() * 60;
        const rad = (angle * Math.PI) / 180;
        return {
          id: i,
          angle,
          distance,
          size: 2 + Math.random() * 2.5,
          duration: 3 + Math.random() * 4,
          delay: Math.random() * 3,
          cx: Math.cos(rad) * distance,
          cy: Math.sin(rad) * distance,
        };
      })
    );
  }, []);

  // ── Smooth progress counter ──
  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const totalDuration = 2800; // ms to reach 100%

    // Easing: starts fast, slows in the middle, accelerates at end
    const easeProgress = (t: number) => {
      if (t < 0.7) return t * 1.2;             // fast start
      if (t < 0.9) return 0.84 + (t - 0.7) * 0.5; // slower middle
      return 0.94 + (t - 0.9) * 0.6;           // finish
    };

    const animate = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const rawT = Math.min(elapsed / totalDuration, 1);
      const p = Math.min(Math.round(easeProgress(rawT) * 100), 100);
      setProgress(p);

      if (rawT < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // ── Typing effect for subtitle ──
  useEffect(() => {
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setTypedChars((prev) => {
          if (prev >= SUBTITLE_TEXT.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 45);
      return () => clearInterval(interval);
    }, 1200); // start typing after logo animates in

    return () => clearTimeout(startDelay);
  }, []);

  // ── Trigger final flash and exit ──
  useEffect(() => {
    if (progress >= 100) {
      const flashTimer = setTimeout(() => setShowFinalFlash(true), 200);
      const exitTimer = setTimeout(() => setIsLoading(false), 900);
      return () => {
        clearTimeout(flashTimer);
        clearTimeout(exitTimer);
      };
    }
  }, [progress]);

  // Render particles from client-generated state (no Math.random in JSX)
  const particleElements = particles.map((p) => (
    <motion.div
      key={p.id}
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.size,
        height: p.size,
        background:
          p.id % 3 === 0
            ? "rgba(59,130,246,0.8)"
            : p.id % 3 === 1
            ? "rgba(139,92,246,0.7)"
            : "rgba(34,211,238,0.7)",
      }}
      initial={{ opacity: 0 }}
      animate={{
        y: [0, p.driftY1, 0, p.driftY2, 0],
        x: [0, 10, 0, -10, 0],
        opacity: [0, p.opacity, p.opacity * 0.7, p.opacity, 0],
      }}
      transition={{
        duration: p.duration,
        delay: p.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  ));

  const sparkElements = sparks.map((s) => (
    <motion.div
      key={`spark-${s.id}`}
      className="absolute rounded-full pointer-events-none"
      style={{
        width: s.size,
        height: s.size,
        background: "rgba(59,130,246,0.9)",
        boxShadow: "0 0 6px rgba(59,130,246,0.8), 0 0 12px rgba(59,130,246,0.4)",
        left: "50%",
        top: "50%",
      }}
      animate={{
        x: [0, s.cx * 0.3, s.cx, s.cx * 0.5, 0],
        y: [0, s.cy * 0.3, s.cy, s.cy * 0.5, 0],
        opacity: [0, 0.9, 0.4, 0.8, 0],
        scale: [0.5, 1.2, 0.8, 1, 0.5],
      }}
      transition={{
        duration: s.duration,
        delay: s.delay + 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  ));

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#050508" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* ── Deep background gradient ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(59,130,246,0.06) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)",
            }}
          />

          {/* ── Soft light rays ── */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: "200%",
              height: "200%",
              left: "-50%",
              top: "-50%",
              background:
                "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(59,130,246,0.03) 30deg, transparent 60deg, rgba(139,92,246,0.02) 120deg, transparent 150deg, rgba(34,211,238,0.03) 210deg, transparent 240deg, rgba(59,130,246,0.02) 300deg, transparent 360deg)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />

          {/* ── Floating ambient glow orbs ── */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{
              x: [-100, 100, -50, 80, -100],
              y: [-50, 80, -100, 50, -50],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
            animate={{
              x: [80, -120, 60, -80, 80],
              y: [60, -60, 100, -40, 60],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
            animate={{
              x: [-60, 90, -90, 40, -60],
              y: [80, -80, 30, -60, 80],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ── Floating particles ── */}
          {particleElements}

          {/* ── Central logo area ── */}
          <div className="relative flex flex-col items-center z-10">
            {/* Spark particles orbiting the logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {sparkElements}
            </div>

            {/* ── Logo: "ABHIZT" — letter-by-letter reveal with animated gradient ── */}
            <div className="relative flex items-center gap-0">
              {LOGO_LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold font-[family-name:var(--font-heading)] select-none"
                  style={{
                    background:
                      "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6, #8b5cf6)",
                    backgroundSize: "300% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "loading-gradient-flow 4s linear infinite",
                    filter: showFinalFlash ? "brightness(2.5)" : "brightness(1)",
                    transition: "filter 0.5s ease",
                  }}
                  initial={{ opacity: 0, scale: 0.75, filter: "blur(12px)", y: 15 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    y: 0,
                  }}
                  transition={{
                    delay: 0.15 + i * 0.1,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 120,
                    damping: 14,
                  }}
                >
                  {letter}
                </motion.span>
              ))}

              {/* ── Light sweep across logo ── */}
              <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{ mixBlendMode: "overlay" }}
              >
                <motion.div
                  className="absolute top-0 h-full"
                  style={{
                    width: "40%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), rgba(255,255,255,0.25), rgba(255,255,255,0.15), transparent)",
                  }}
                  animate={{ left: ["-40%", "140%"] }}
                  transition={{
                    duration: 2.5,
                    delay: 1.5,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>

            {/* Logo glow underneath */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                width: "120%",
                height: "60%",
                top: "20%",
                left: "-10%",
                background:
                  "radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)",
                filter: "blur(30px)",
              }}
              animate={{
                opacity: showFinalFlash ? [1, 2, 0.8] : [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: showFinalFlash ? 0.6 : 3,
                repeat: showFinalFlash ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />

            {/* ── "STUDIO" tag ── */}
            <motion.p
              className="text-xs sm:text-sm tracking-[0.5em] uppercase mt-4 font-light"
              style={{
                color: "rgba(148,163,184,0.7)",
                textShadow: "0 0 20px rgba(59,130,246,0.3)",
              }}
              initial={{ opacity: 0, y: 8, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.5em" }}
              transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
            >
              STUDIO
            </motion.p>

            {/* ── Subtitle with typing effect ── */}
            <motion.div
              className="mt-6 h-6 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span
                className="text-xs sm:text-sm tracking-widest font-light"
                style={{ color: "rgba(148,163,184,0.5)" }}
              >
                {SUBTITLE_TEXT.slice(0, typedChars)}
                {typedChars < SUBTITLE_TEXT.length && (
                  <motion.span
                    className="inline-block ml-0.5"
                    style={{
                      width: "1px",
                      height: "1em",
                      background: "rgba(59,130,246,0.7)",
                      boxShadow: "0 0 4px rgba(59,130,246,0.5)",
                      verticalAlign: "middle",
                    }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </span>
            </motion.div>
          </div>

          {/* ── Loading bar ── */}
          <motion.div
            className="mt-12 relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {/* Glassmorphism bar container */}
            <div
              className="w-56 sm:w-64 h-[5px] rounded-full overflow-hidden relative"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "inset 0 0 8px rgba(0,0,0,0.3)",
              }}
            >
              {/* Animated fill */}
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)",
                  backgroundSize: "300% 100%",
                  animation: "loading-gradient-flow 3s linear infinite",
                  boxShadow:
                    "0 0 12px rgba(59,130,246,0.6), 0 0 24px rgba(139,92,246,0.3)",
                  transition: "width 0.15s ease-out",
                }}
              />
              {/* Shimmer pass on the bar */}
              <motion.div
                className="absolute top-0 h-full pointer-events-none"
                style={{
                  width: "30%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                }}
                animate={{ left: ["-30%", "130%"] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Percentage counter */}
            <motion.span
              className="mt-3 text-xs tabular-nums font-medium tracking-wider"
              style={{
                color: "rgba(148,163,184,0.45)",
                textShadow:
                  progress >= 100 ? "0 0 15px rgba(59,130,246,0.6)" : "none",
                transition: "text-shadow 0.4s ease",
              }}
            >
              {progress}%
            </motion.span>
          </motion.div>

          {/* ── Final flash overlay when 100% ── */}
          <AnimatePresence>
            {showFinalFlash && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-50"
                style={{
                  background:
                    "radial-gradient(circle at 50% 45%, rgba(59,130,246,0.25) 0%, transparent 60%)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
