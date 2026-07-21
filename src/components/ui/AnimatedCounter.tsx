"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  label: string;
  icon: ReactNode;
}

/** Counting animation from 0 to target on scroll */
export default function AnimatedCounter({
  target,
  suffix = "+",
  label,
  icon,
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-accent-light mb-3 flex justify-center">{icon}</div>
      <div className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-white tabular-nums">
        {count}
        <span className="text-accent-light">{suffix}</span>
      </div>
      <p className="text-text-secondary text-sm mt-2">{label}</p>
    </div>
  );
}
