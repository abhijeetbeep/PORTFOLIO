"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SkillBarProps {
  name: string;
  percentage: number;
  color: string;
}

/** Animated skill progress bar — fills on scroll */
export default function SkillBar({ name, percentage, color }: SkillBarProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white text-sm font-medium">{name}</span>
        <span className="text-text-secondary text-sm tabular-nums">
          {percentage}%
        </span>
      </div>
      <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 12px ${color}40`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}
