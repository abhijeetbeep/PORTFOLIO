"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { HiChevronDown } from "react-icons/hi";

/* Dynamic import — prevents SSR issues with Three.js */
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

export default function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  /* Stagger animation variants */
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.8 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene mouse={mouse} />
      </div>

      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[1] bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-accent/10 text-accent-light border border-accent/20 mb-6">
              ✦ Creative Professional
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-heading)] leading-[0.95] mb-4"
          >
            <span className="gradient-text">Alex Carter</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-text-secondary font-medium mb-6"
          >
            Video Editor{" "}
            <span className="text-accent">|</span> Motion Designer{" "}
            <span className="text-accent">|</span> Graphic Designer
          </motion.p>

          {/* Intro */}
          <motion.p
            variants={item}
            className="text-text-secondary leading-relaxed mb-8 max-w-lg"
          >
            Transforming raw footage into cinematic masterpieces and creative
            visions into stunning visual experiences. Let&apos;s bring your story to
            life.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("#video-editing")}
              className="px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-accent-dark via-accent to-accent-light hover:shadow-lg hover:shadow-accent/30 hover:scale-105 transition-all duration-300"
            >
              View Portfolio
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="px-8 py-3.5 rounded-xl font-semibold glass glass-hover text-white"
            >
              Hire Me
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-text-secondary text-xs tracking-widest uppercase">
          Scroll
        </span>
        <HiChevronDown className="text-accent-light text-xl animate-bounce-slow" />
      </motion.div>
    </section>
  );
}
