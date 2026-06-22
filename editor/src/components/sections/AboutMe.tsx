"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { personalData } from "@/data/personal";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import GalleryModal from "./GalleryModal";

const getIcon = (iconName: string) => {
  if (iconName.startsWith("Fa")) {
    const Icon = (FaIcons as any)[iconName];
    if (Icon) return Icon;
  }
  if (iconName.startsWith("Si")) {
    const Icon = (SiIcons as any)[iconName];
    if (Icon) return Icon;
  }
  return FaIcons.FaQuestion; // fallback
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface AboutMeProps {
  galleryImages?: Array<{ src: string; width: number; height: number }>;
}

export default function AboutMe({ galleryImages = [] }: AboutMeProps) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Parallax state for visual container
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ bgX: 0, bgY: 0, fgX: 0, fgY: 0 });

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    // Move button 30% towards the mouse cursor
    setCoords({ x: x * 0.3, y: y * 0.3 });
  };

  const handleButtonMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalize coordinates (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setParallax({
      bgX: x * -12, // Background moves slightly opposite
      bgY: y * -12,
      fgX: x * 15,   // Foreground moves with the mouse
      fgY: y * 15,
    });
  };

  const handleContainerMouseLeave = () => {
    setParallax({ bgX: 0, bgY: 0, fgX: 0, fgY: 0 });
  };

  return (
    <>
      <section id="about" className="section-padding bg-background-secondary/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="About Me"
            subtitle="The creative mind behind the lens"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual Container */}
            <motion.div
              ref={containerRef}
              onMouseMove={handleContainerMouseMove}
              onMouseLeave={handleContainerMouseLeave}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full flex flex-col lg:flex-row items-center justify-center cursor-pointer"
            >
              {/* Background Card */}
              <motion.div
                animate={{ x: parallax.bgX, y: parallax.bgY }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="hidden lg:block w-full aspect-[3/4] rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl bg-[#08080c]"
              >
                {/* Background image zoomed out (scale-82) and shifted upward (object-[center_0%]) */}
                <img
                  src="/aboutbg.webp"
                  alt="About Background Portrait"
                  className="w-full h-full object-cover object-[center_0%] scale-[0.82] select-none pointer-events-none"
                />
                {/* Slight dark overlay and vignette for readability and blending */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#08080c_100%)] opacity-80 z-10" />
              </motion.div>

              {/* Profile Image (centered on desktop, moves above text on mobile) */}
              <motion.div
                animate={{ 
                  x: parallax.fgX, 
                  y: parallax.fgY 
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="lg:absolute lg:top-[calc(50%+175px)] lg:-translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2 z-20 mt-6 lg:mt-0"
              >
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group cursor-pointer transition-all duration-500"
                >
                  {/* Blue glow effect around the profile image */}
                  <div className="absolute -inset-4 rounded-full bg-blue-500/25 blur-2xl group-hover:bg-blue-500/45 transition duration-500" />
                  
                  {/* Circular Profile Image with Glassmorphism Border */}
                  <div
                    className="relative w-[240px] h-[240px] lg:w-[260px] lg:h-[260px] rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm shadow-[0_0_40px_rgba(59,130,246,0.55)]"
                  >
                    <img
                      src="/about.webp"
                      alt="Abhijeet Profile"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Decorative frame */}
              <div className="hidden lg:block absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-accent/20 -z-10" />
            </motion.div>

            {/* Text content */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUp}>
                <h3 className="text-3xl font-bold font-[family-name:var(--font-heading)] gradient-text mb-2">
                  {personalData.name}
                </h3>
                <p className="text-accent-light font-medium mb-6">
                  {personalData.about.title}
                </p>
              </motion.div>

              {personalData.about.paragraphs.map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  variants={fadeUp}
                  className={`text-text-secondary leading-relaxed ${
                    idx === personalData.about.paragraphs.length - 1 ? "mb-8" : "mb-4"
                  }`}
                >
                  {paragraph}
                </motion.p>
              ))}

              {/* View My Gallery Premium Magnetic CTA Button */}
              <motion.div variants={fadeUp} className="mb-8 flex justify-start">
                <motion.button
                  ref={buttonRef}
                  onMouseMove={handleButtonMouseMove}
                  onMouseLeave={handleButtonMouseLeave}
                  onClick={() => setGalleryOpen(true)}
                  animate={{ x: coords.x, y: coords.y }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                  className="relative group px-8 py-3.5 rounded-full font-bold text-white tracking-wide bg-white/[0.03] border border-white/10 hover:border-blue-500/40 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="relative z-10 blue-text-glow flex items-center gap-2">
                    View My Gallery <span className="text-blue-400 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </span>
                </motion.button>
              </motion.div>

              {/* Tools I Use */}
              <motion.div variants={fadeUp}>
                <h4 className="text-white font-semibold mb-4">Tools I Use</h4>
                <div className="grid grid-cols-4 gap-3">
                  {personalData.about.tools.map((tool) => {
                    const IconComponent = getIcon(tool.icon);
                    return (
                      <div
                        key={tool.name}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 hover:bg-white/10 transition-all duration-300 group"
                      >
                        <IconComponent className="text-xl text-text-secondary group-hover:text-accent-light transition-colors" />
                        <span className="text-[10px] text-text-secondary text-center leading-tight">
                          {tool.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Expandable Gallery Modal */}
      <GalleryModal isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} images={galleryImages} />
    </>
  );
}
