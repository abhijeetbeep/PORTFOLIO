"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { personalData } from "@/data/personal";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Video Editing", href: "#video-editing" },
  { label: "Graphic Design", href: "#graphic-design" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  /* Track active section via IntersectionObserver */
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className="fixed top-5 left-1/2 z-[1000] w-[calc(100%-32px)] md:w-max max-w-7xl bg-[#0f0f14]/85 backdrop-blur-[20px] border border-white/8 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.4)] px-4 py-2 sm:px-6 sm:py-2.5"
        initial={{ y: -120, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between gap-4 md:gap-8 h-10 md:h-11">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="text-lg md:text-xl font-bold font-[family-name:var(--font-heading)] tracking-[0.15em] uppercase flex items-center">
              <span className="blue-gradient-text blue-text-glow mr-1.5">{personalData.logoText.split(" ")[0]}</span>
              <span className="text-white tracking-[0.1em]">{personalData.logoText.split(" ").slice(1).join(" ")}</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${
                  activeSection === link.href.replace("#", "")
                    ? "text-white z-10"
                    : "text-text-secondary hover:text-white hover:-translate-y-0.5 hover:[text-shadow:0_0_8px_rgba(59,130,246,0.5)]"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {activeSection === link.href.replace("#", "") && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)] border border-blue-400/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right Section: CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            {/* CTA Button */}
            <button
              onClick={() => scrollTo("#contact")}
              className="hidden md:flex items-center justify-center px-5 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-blue-400/20"
            >
              Hire Me
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white p-2 hover:text-blue-400 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[1040]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-72 bg-[#0f0f14]/90 backdrop-blur-[25px] border-l border-white/8 z-[1050] p-6 pt-24 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col justify-between"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Close Button inside drawer */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-6 right-6 text-white p-2 hover:text-blue-400 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <HiX size={24} />
              </button>

              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={`text-left px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 cursor-pointer ${
                      activeSection === link.href.replace("#", "")
                        ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                        : "text-text-secondary hover:bg-white/5 hover:text-white"
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              {/* Mobile CTA Button */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
              >
                <button
                  onClick={() => scrollTo("#contact")}
                  className="w-full flex items-center justify-center py-3 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] active:scale-98 transition-all duration-300 cursor-pointer border border-blue-400/20"
                >
                  Hire Me
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
