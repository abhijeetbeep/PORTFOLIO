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
  "All": "all", "Posters": "posters", "Thumbnails": "thumbnails",
  "Social Media": "social-media", "Branding": "branding",
};

export default function GraphicDesign() {
  const [active, setActive] = useState("All");
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; width: number; height: number } | null>(null);

  const filtered =
    active === "All"
      ? graphicDesigns
      : graphicDesigns.filter((d) => d.category === categoryMap[active]);

  return (
    <section id="graphic-design" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Graphic Design"
          subtitle="Creative designs that make brands stand out"
        />

        <FilterTabs categories={categories} activeCategory={active} onSelect={setActive} />

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((design, i) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="group break-inside-avoid mb-6"
                style={{ perspective: "1000px" }}
              >
                <div 
                  onClick={() => setSelectedImage({ src: design.thumbnail, title: design.title, width: design.width, height: design.height })}
                  className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-accent/10 group-hover:[transform:rotateY(2deg)_rotateX(2deg)] cursor-pointer"
                >
                  <div className="relative overflow-hidden bg-background-secondary w-full">
                    <Image
                      src={design.thumbnail}
                      alt={design.title}
                      width={design.width}
                      height={design.height}
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center p-4">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                        <p className="text-white text-sm">{design.description}</p>
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/40 backdrop-blur-sm text-white/90 capitalize">
                        {design.category.replace("-", " ")}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-white font-semibold text-sm group-hover:text-accent-light transition-colors">
                      {design.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
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
