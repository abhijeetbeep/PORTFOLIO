"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";
import type { GraphicGalleryItem } from "@/lib/portfolio-gallery";

const graphicCategories = [
  { value: "all", label: "All" },
  { value: "posters", label: "Posters" },
  { value: "branding", label: "Branding" },
  { value: "invitation", label: "Invitation Cards" },
  { value: "thumbnail", label: "Thumbnails" },
  { value: "social-media", label: "Social Media" },
  { value: "marketing", label: "Marketing" },
  { value: "event", label: "Event Designs" },
  { value: "print", label: "Print Design" },
] as const;

interface GraphicDesignGalleryProps {
  items: GraphicGalleryItem[];
}

export default function GraphicDesignGallery({ items }: GraphicDesignGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GraphicGalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<(typeof graphicCategories)[number]["value"]>("all");

  const filteredItems = activeCategory === "all" ? items : items.filter((item) => item.category === activeCategory);

  return (
    <div>
      <div className="mb-7 overflow-x-auto pb-1">
        <div className="flex min-w-max items-center gap-2 rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-xl shadow-[0_14px_32px_rgba(0,0,0,0.2)]">
          {graphicCategories.map((category) => {
            const isActive = activeCategory === category.value;

            return (
              <button
                key={category.value}
                type="button"
                onClick={() => setActiveCategory(category.value)}
                className={`relative overflow-hidden rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white shadow-[0_10px_24px_rgba(59,130,246,0.28)]"
                    : "border border-white/10 bg-white/5 text-white/70 hover:border-blue-400/25 hover:bg-white/10 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="graphic-design-category-pill"
                    className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500 via-sky-500 to-indigo-500"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.button
              key={item.id}
              layout
              type="button"
              onClick={() => setSelectedImage(item)}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35, delay: (index % 6) * 0.04 }}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group mb-5 break-inside-avoid overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left shadow-[0_16px_36px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:border-blue-400/30 hover:shadow-[0_0_32px_rgba(59,130,246,0.2)]"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  width={item.width}
                  height={item.height}
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="mt-1 text-base font-semibold text-white">{item.title}</h3>
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {selectedImage && (
        <Lightbox
          isOpen
          onClose={() => setSelectedImage(null)}
          title={selectedImage.title}
          imgSrc={selectedImage.src}
          width={selectedImage.width}
          height={selectedImage.height}
        />
      )}
    </div>
  );
}