"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import FilterTabs from "@/components/ui/FilterTabs";
import { graphicDesigns } from "@/data/portfolio";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";

const categories = ["All", "Posters", "Thumbnails", "Social Media", "Branding"];
const categoryMap: Record<string, string> = {
  "All": "all",
  "Posters": "posters",
  "Thumbnails": "thumbnails",
  "Social Media": "social-media",
  "Branding": "branding",
};

interface CardProps {
  design: typeof graphicDesigns[0];
  index: number;
  onClick: () => void;
}

function GraphicDesignCard({ design, index, onClick }: CardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Subtle 3D tilt (max 5 degrees)
    const tiltX = -(y / (rect.height / 2)) * 5;
    const tiltY = (x / (rect.width / 2)) * 5;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1], // easeOutExpo
            delay: (index % 4) * 0.1, // staggered entrance delay
          },
        },
      }}
      className="break-inside-avoid mb-6"
    >
      {/* Floating Animation Wrapper (different speeds based on index) */}
      <motion.div
        animate={{
          y: [0, -4 - (index % 3) * 2, 0],
        }}
        transition={{
          duration: 5 + (index % 3) * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: (index * 0.2) % 1.5,
        }}
      >
        {/* Interactive Tilt and Premium Hover Effects */}
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
          className="relative bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden cursor-pointer shadow-xl select-none"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? -10 : 0}px) scale(${isHovered ? 1.05 : 1})`,
            transition: isHovered
              ? "transform 0.1s ease-out, box-shadow 0.4s ease, border-color 0.4s ease"
              : "transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
            boxShadow: isHovered
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(59, 130, 246, 0.5)"
              : "0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 0 0px rgba(59, 130, 246, 0)",
            borderColor: isHovered ? "rgba(59, 130, 246, 0.4)" : "rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="relative overflow-hidden bg-background-secondary w-full">
            <Image
              src={design.thumbnail}
              alt={design.title}
              width={design.width}
              height={design.height}
              className="w-full h-auto object-contain transition-transform duration-500"
              style={{
                transform: isHovered ? "scale(1.03)" : "scale(1)",
              }}
              loading="lazy"
            />

            {/* Hover overlay with fade-in and scale-in */}
            <div
              className="absolute inset-0 transition-colors duration-400 flex items-center justify-center p-6"
              style={{
                backgroundColor: isHovered ? "rgba(0, 0, 0, 0.65)" : "rgba(0, 0, 0, 0)",
              }}
            >
              <div
                className="transition-all duration-400 text-center"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateY(0) scale(1)" : "translateY(15px) scale(0.95)",
                }}
              >
                <p className="text-white text-xs sm:text-sm font-medium tracking-wide leading-relaxed drop-shadow-md">
                  {design.description}
                </p>
              </div>
            </div>

            {/* Category badge */}
            <div className="absolute top-3 left-3 z-10">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md capitalize transition-all duration-400"
                style={{
                  backgroundColor: isHovered ? "rgba(59, 130, 246, 0.85)" : "rgba(0, 0, 0, 0.55)",
                  color: "#ffffff",
                  boxShadow: isHovered ? "0 0 12px rgba(59, 130, 246, 0.4)" : "none",
                }}
              >
                {design.category.replace("-", " ")}
              </span>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-t from-background-secondary to-transparent">
            <h3
              className="font-bold text-sm tracking-wide transition-colors duration-400"
              style={{
                color: isHovered ? "#93c5fd" : "#f3f4f6",
              }}
            >
              {design.title}
            </h3>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GraphicDesign() {
  const [active, setActive] = useState("All");
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; width: number; height: number } | null>(null);

  const filtered =
    active === "All"
      ? graphicDesigns
      : graphicDesigns.filter((d) => d.category === categoryMap[active]);

  return (
    <section id="graphic-design" className="section-padding relative overflow-hidden">
      {/* Subtle Animated Background Glows & Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -50, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-blue-600/10 blur-[130px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -60, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[15%] right-[-10%] w-[450px] h-[450px] rounded-full bg-indigo-500/5 blur-[150px]"
        />

        {/* Lightweight particle effect with deterministic properties to prevent hydration mismatches */}
        {Array.from({ length: 16 }).map((_, idx) => {
          const size = ((idx * 7) % 3) + 2; // 2px to 4px
          const startX = (idx * 29) % 100; // 0 to 100 %
          const startY = (idx * 43) % 100; // 0 to 100 %
          const duration = 20 + ((idx * 17) % 25); // 20s to 45s
          const delay = (idx * 4) % 12; // 0 to 12s
          const driftX = (idx % 2 === 0 ? 10 : -10);

          return (
            <motion.div
              key={idx}
              initial={{ x: `${startX}vw`, y: `${startY}vh`, opacity: 0.05 }}
              animate={{
                y: [`${startY}vh`, `${startY - 15}vh`, `${startY - 35}vh`],
                x: [
                  `${startX}vw`,
                  `${startX + driftX / 2}vw`,
                  `${startX + driftX}vw`
                ],
                opacity: [0.05, 0.35, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay,
              }}
              className="absolute rounded-full bg-blue-400/20"
              style={{
                width: size,
                height: size,
                filter: "blur(0.5px)",
              }}
            />
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Graphic Design"
          subtitle="Creative designs that make brands stand out"
        />

        <FilterTabs categories={categories} activeCategory={active} onSelect={setActive} />

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((design, i) => (
              <GraphicDesignCard
                key={design.id}
                design={design}
                index={i}
                onClick={() =>
                  setSelectedImage({
                    src: design.thumbnail,
                    title: design.title,
                    width: design.width,
                    height: design.height,
                  })
                }
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Lightbox
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        title={selectedImage?.title}
        imgSrc={selectedImage?.src}
        width={selectedImage?.width}
        height={selectedImage?.height}
      />
    </section>
  );
}
