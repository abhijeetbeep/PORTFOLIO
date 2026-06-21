"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { HiChevronDown } from "react-icons/hi";
import { personalData } from "@/data/personal";

/* Dynamic import — prevents SSR issues with Three.js */
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

export default function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [coords, setCoords] = useState({ x: 0, y: 0 });

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

  const parallaxX = coords.x * 20;
  const parallaxY = coords.y * 20;
  const rotateX = -coords.y * 15;
  const rotateY = coords.x * 15;

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          {/* Left Column: Text */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1">
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
              <span className="gradient-text">{personalData.name}</span>
            </motion.h1>

            {/* Title */}
            <motion.p
              variants={item}
              className="text-lg sm:text-xl text-text-secondary font-medium mb-6"
            >
              {personalData.roles.map((role, idx) => (
                <span key={role}>
                  {role} {idx < personalData.roles.length - 1 && <span className="text-accent">| </span>}
                </span>
              ))}
            </motion.p>

            {/* Intro */}
            <motion.p
              variants={item}
              className="text-text-secondary leading-relaxed mb-8 max-w-lg"
            >
              {personalData.heroDescription}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("#video-editing")}
                className="px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-accent-dark via-accent to-accent-light hover:shadow-lg hover:shadow-accent/30 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                View Portfolio
              </button>
              <button
                onClick={() => scrollTo("#contact")}
                className="px-8 py-3.5 rounded-xl font-semibold glass glass-hover text-white cursor-pointer"
              >
                Hire Me
              </button>
            </motion.div>
          </div>

          {/* Right Column: Profile Image */}
          <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
            <motion.div
              variants={item}
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full flex items-center justify-center cursor-pointer group"
              style={{
                x: parallaxX,
                y: parallaxY,
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
              animate={{
                y: [0, -12, 0],
              }}
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

              {/* Image Frame with premium glass border */}
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
          </div>
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
