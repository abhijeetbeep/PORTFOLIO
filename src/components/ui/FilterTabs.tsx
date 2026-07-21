"use client";

import { motion } from "framer-motion";

interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

/** Horizontal scrollable category filter pills */
export default function FilterTabs({
  categories,
  activeCategory,
  onSelect,
}: FilterTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === cat
              ? "text-white"
              : "text-text-secondary hover:text-white bg-white/5 hover:bg-white/10"
          }`}
        >
          {activeCategory === cat && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-accent rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{cat}</span>
        </button>
      ))}
    </div>
  );
}
