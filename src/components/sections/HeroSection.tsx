"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { HiChevronDown } from "react-icons/hi";
import { personalData } from "@/data/personal";

/* Dynamic import — prevents SSR issues with Three.js */
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

// ──────────────────────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────────────────────
const ANIMATED_ROLES = [
  { emoji: "🎬", text: "Video Editor" },
  { emoji: "🎨", text: "Graphic Designer" },
  { emoji: "✨", text: "Motion Designer" },
  { emoji: "🚀", text: "Creative Director" },
  { emoji: "📸", text: "Photographer" },
];

// Split name into first/last for proper line breaks
const FIRST_NAME = "Abhijeet";
const LAST_NAME = "Sarkar";
const FIRST_LETTERS = FIRST_NAME.split("");
const LAST_LETTERS = LAST_NAME.split("");
const TOTAL_NAME_LETTERS = FIRST_LETTERS.length + LAST_LETTERS.length;

const DESCRIPTION_TEXT = personalData.heroDescription;

// ──────────────────────────────────────────────────────────────
// Particle type
// ──────────────────────────────────────────────────────────────
interface HeroParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  driftY: number;
}

// ──────────────────────────────────────────────────────────────
// Animation timeline (in seconds from page load)
// ──────────────────────────────────────────────────────────────
const TIMING = {
  badge: 0.6,
  nameStart: 0.8,
  nameLetterGap: 0.05,
  // nameEnd ≈ 0.8 + (14 letters × 0.05) = ~1.5s
  roleStart: 1.7,
  // descStart is dynamic — triggered after first role finishes typing
  descTypingSpeed: 20, // ms per character
  // buttons appear after description is fully typed
};

export default function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<HeroParticle[]>([]);

  // ── Role typewriter state ──
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleCharIndex, setRoleCharIndex] = useState(0);
  const [isRoleDeleting, setIsRoleDeleting] = useState(false);
  const [roleDisplayText, setRoleDisplayText] = useState("");
  const [firstRoleTyped, setFirstRoleTyped] = useState(false);

  // ── Description typewriter state ──
  const [descCharIndex, setDescCharIndex] = useState(0);
  const [descStarted, setDescStarted] = useState(false);
  const [descComplete, setDescComplete] = useState(false);

  // ── Buttons visible ──
  const [showButtons, setShowButtons] = useState(false);

  // ── Generate particles client-side only ──
  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1.5 + Math.random() * 3,
        duration: 12 + Math.random() * 16,
        delay: Math.random() * 5,
        opacity: 0.08 + Math.random() * 0.15,
        driftY: -20 - Math.random() * 30,
      }))
    );
  }, []);

  // ── Mouse tracking ──
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
      const cx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const cy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setCoords({ x: cx, y: cy });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ── Role typewriter effect ──
  useEffect(() => {
    const currentRole = ANIMATED_ROLES[roleIndex].text;
    const typingSpeed = isRoleDeleting ? 40 : 80;
    const pauseAfterType = 2000;

    const timeout = setTimeout(() => {
      if (!isRoleDeleting) {
        if (roleCharIndex < currentRole.length) {
          setRoleCharIndex((prev) => prev + 1);
          setRoleDisplayText(currentRole.slice(0, roleCharIndex + 1));
        } else {
          // First role fully typed → trigger description
          if (!firstRoleTyped) setFirstRoleTyped(true);
          setTimeout(() => setIsRoleDeleting(true), pauseAfterType);
        }
      } else {
        if (roleCharIndex > 0) {
          setRoleCharIndex((prev) => prev - 1);
          setRoleDisplayText(currentRole.slice(0, roleCharIndex - 1));
        } else {
          setIsRoleDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ANIMATED_ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [roleCharIndex, isRoleDeleting, roleIndex, firstRoleTyped]);

  // ── Start description typing after first role is fully typed ──
  useEffect(() => {
    if (firstRoleTyped && !descStarted) {
      const delay = setTimeout(() => setDescStarted(true), 300);
      return () => clearTimeout(delay);
    }
  }, [firstRoleTyped, descStarted]);

  // ── Description typewriter effect ──
  useEffect(() => {
    if (!descStarted || descComplete) return;

    if (descCharIndex < DESCRIPTION_TEXT.length) {
      const timeout = setTimeout(() => {
        setDescCharIndex((prev) => prev + 1);
      }, TIMING.descTypingSpeed);
      return () => clearTimeout(timeout);
    } else {
      setDescComplete(true);
    }
  }, [descStarted, descCharIndex, descComplete]);

  // ── Show buttons after description completes ──
  useEffect(() => {
    if (descComplete) {
      const timer = setTimeout(() => setShowButtons(true), 200);
      return () => clearTimeout(timer);
    }
  }, [descComplete]);

  const scrollTo = useCallback((id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // ── Parallax values ──
  const parallaxX = coords.x * 20;
  const parallaxY = coords.y * 20;
  const rotateX = -coords.y * 15;
  const rotateY = coords.x * 15;
  const contentParX = coords.x * 8;
  const contentParY = coords.y * 6;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene mouse={mouse} />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[1] bg-gradient-to-t from-background to-transparent" />

      {/* ── Floating particles ── */}
      {particles.map((p) => (
        <motion.div
          key={`hero-p-${p.id}`}
          className="absolute rounded-full pointer-events-none z-[2]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              p.id % 3 === 0
                ? "rgba(59,130,246,0.6)"
                : p.id % 3 === 1
                ? "rgba(139,92,246,0.5)"
                : "rgba(34,211,238,0.5)",
          }}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, p.driftY, 0, -p.driftY * 0.6, 0],
            x: [0, 8, 0, -8, 0],
            opacity: [0, p.opacity, p.opacity * 0.6, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── Moving blue gradient glow ── */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
          left: "20%",
          top: "30%",
        }}
        animate={{
          x: [-80, 80, -40, 60, -80],
          y: [-40, 60, -80, 40, -40],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content — with subtle mouse parallax */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full"
        style={{
          transform: `translate(${contentParX}px, ${contentParY}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          {/* Left Column: Text */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: TIMING.badge, duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-accent/10 text-accent-light border border-accent/20 mb-6">
                ✦ Creative Professional
              </span>
            </motion.div>

            {/* ── ISSUE 1 FIX: Name on two proper lines ── */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-heading)] leading-[1.05] mb-4">
              {/* First name: Abhijeet */}
              <span className="block">
                {FIRST_LETTERS.map((letter, i) => (
                  <motion.span
                    key={`fn-${i}`}
                    className="inline-block gradient-text"
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)", scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                    transition={{
                      delay: TIMING.nameStart + i * TIMING.nameLetterGap,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              {/* Last name: Sarkar */}
              <span className="block">
                {LAST_LETTERS.map((letter, i) => (
                  <motion.span
                    key={`ln-${i}`}
                    className="inline-block gradient-text"
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)", scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                    transition={{
                      delay:
                        TIMING.nameStart +
                        (FIRST_LETTERS.length + i) * TIMING.nameLetterGap,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* ── Role Typewriter ── */}
            <motion.div
              className="text-lg sm:text-xl font-medium mb-6 min-h-[2rem] flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: TIMING.roleStart, duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  className="text-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {ANIMATED_ROLES[roleIndex].emoji}
                </motion.span>
              </AnimatePresence>
              <span
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "loading-gradient-flow 5s linear infinite",
                }}
              >
                {roleDisplayText}
              </span>
              <motion.span
                className="inline-block w-[2px] h-6 rounded-full flex-shrink-0"
                style={{
                  background: "rgba(59,130,246,0.8)",
                  boxShadow: "0 0 6px rgba(59,130,246,0.5)",
                }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              />
            </motion.div>

            {/* ── ISSUE 2 FIX: Description with typewriter effect ── */}
            {/* Reserve space with min-height to prevent layout shift */}
            <div className="min-h-[4.5rem] sm:min-h-[4rem] mb-8 max-w-lg">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: descStarted ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-text-secondary leading-relaxed">
                  {DESCRIPTION_TEXT.slice(0, descCharIndex)}
                  {descStarted && !descComplete && (
                    <motion.span
                      className="inline-block w-[2px] h-[1em] rounded-full ml-0.5 align-middle"
                      style={{
                        background: "rgba(59,130,246,0.7)",
                        boxShadow: "0 0 4px rgba(59,130,246,0.4)",
                      }}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                    />
                  )}
                </span>
              </motion.div>
            </div>

            {/* ── ISSUE 3 FIX: Buttons appear after description completes ── */}
            <div className="min-h-[3.5rem] flex flex-wrap gap-4">
              <AnimatePresence>
                {showButtons && (
                  <>
                    <motion.button
                      onClick={() => scrollTo("#video-editing")}
                      className="px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-accent-dark via-accent to-accent-light hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 cursor-pointer relative overflow-hidden group"
                      initial={{ opacity: 0, y: 25, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100,
                        damping: 14,
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                      <span className="relative z-10">View Portfolio</span>
                    </motion.button>

                    <motion.button
                      onClick={() => scrollTo("#contact")}
                      className="px-8 py-3.5 rounded-xl font-semibold glass glass-hover text-white cursor-pointer relative overflow-hidden group"
                      initial={{ opacity: 0, y: 25, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: 0.15,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100,
                        damping: 14,
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                      <span className="relative z-10">Enquiry</span>
                    </motion.button>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Profile Image */}
          <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.9,
                duration: 0.8,
                type: "spring",
                stiffness: 80,
                damping: 15,
              }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full flex items-center justify-center cursor-pointer group"
              style={{
                x: parallaxX,
                y: parallaxY,
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
            >
              {/* Floating bob */}
              <motion.div
                className="w-full h-full"
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Background Glow Ring 1 */}
                <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-[spin_12s_linear_infinite] scale-105" />
                {/* Background Glow Ring 2 */}
                <div className="absolute inset-0 rounded-full border border-dashed border-indigo-500/10 animate-[spin_24s_linear_infinite_reverse] scale-110" />

                {/* Glowing blue back-shadow */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 opacity-20 blur-2xl group-hover:opacity-40 group-hover:scale-105 transition-all duration-500" />

                {/* Image Frame */}
                <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 backdrop-blur-md p-3 bg-white/5 shadow-[0_0_30px_rgba(59,130,246,0.25)] group-hover:shadow-[0_0_50px_rgba(59,130,246,0.45)] group-hover:scale-105 transition-all duration-500 flex items-center justify-center">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={personalData.profileImage}
                      alt={personalData.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 240px, (max-width: 1024px) 320px, 384px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.6 }}
      >
        <span
          className="text-[10px] tracking-[0.25em] uppercase font-medium"
          style={{ color: "rgba(148,163,184,0.5)" }}
        >
          Scroll Down
        </span>
        <motion.div
          className="relative flex flex-col items-center"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute w-8 h-8 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
              filter: "blur(6px)",
            }}
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <HiChevronDown
            className="text-2xl relative z-10"
            style={{
              color: "rgba(96,165,250,0.7)",
              filter: "drop-shadow(0 0 4px rgba(59,130,246,0.4))",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
