"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

/** Reusable glassmorphism card */
export default function GlassCard({
  children,
  className = "",
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl ${
        hover
          ? "hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
          : ""
      } ${className}`}
      whileHover={hover ? { scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
