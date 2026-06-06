"use client";

import { useRef, useState, useCallback } from "react";

interface BeforeAfterSliderProps {
  title: string;
  beforeLabel?: string;
  afterLabel?: string;
}

/** Interactive before/after comparison slider */
export default function BeforeAfterSlider({
  title,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPosition(percent);
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) updatePosition(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative aspect-video rounded-xl overflow-hidden select-none border border-white/10"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* After (full background) */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent-dark/15 to-purple-900/20 bg-background-secondary" />

        {/* Before (clipped) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-700/40 via-gray-800/30 to-zinc-900/40 bg-background-tertiary"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />

        {/* Labels */}
        <span className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium bg-black/50 text-white/80">
          {beforeLabel}
        </span>
        <span className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium bg-black/50 text-white/80">
          {afterLabel}
        </span>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-10"
          style={{ left: `${position}%` }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-3 bg-gray-400 rounded-full" />
              <div className="w-0.5 h-3 bg-gray-400 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <p className="text-white font-medium text-sm">{title}</p>
    </div>
  );
}
