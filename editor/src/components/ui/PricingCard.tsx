"use client";

import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

interface PricingCardProps {
  name: string;
  price: number;
  period: string;
  features: string[];
  popular: boolean;
  cta: string;
}

/** Premium pricing card with popular highlight */
export default function PricingCard({
  name,
  price,
  period,
  features,
  popular,
  cta,
}: PricingCardProps) {
  return (
    <motion.div
      className={`relative bg-white/5 backdrop-blur-xl border rounded-2xl p-8 flex flex-col ${
        popular
          ? "border-accent/50 shadow-lg shadow-accent/20 scale-105"
          : "border-white/10"
      }`}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-accent-dark to-accent text-white shadow-lg shadow-accent/30">
            Most Popular
          </span>
        </div>
      )}

      {/* Name */}
      <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>

      {/* Price */}
      <div className="mb-6">
        <span className="text-4xl font-bold font-[family-name:var(--font-heading)] text-white">
          <span className="text-lg text-text-secondary">$</span>
          {price}
        </span>
        <span className="text-text-secondary text-sm ml-1">/ {period}</span>
      </div>

      {/* Features */}
      <ul className="flex-1 space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <FaCheck className="text-green-400 mt-0.5 shrink-0" size={12} />
            <span className="text-text-secondary">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
          popular
            ? "bg-gradient-to-r from-accent-dark via-accent to-accent-light text-white hover:shadow-lg hover:shadow-accent/30"
            : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
        }`}
      >
        {cta}
      </button>
    </motion.div>
  );
}
