"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";
import type { GraphicGalleryItem } from "@/lib/portfolio-gallery";

interface GraphicDesignGalleryProps {
  items: GraphicGalleryItem[];
}

function toReadableHeading(category: string) {
  const labelMap: Record<string, string> = {
    posters: "Promotion Posters",
    marketing: "Marketing Designs",
    invitation: "Invitation Cards",
    thumbnail: "YouTube Thumbnails",
    "social-media": "Social Media Designs",
    branding: "Brand Identity",
    event: "Event Posters",
  };

  return labelMap[category] ?? category.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

export default function GraphicDesignGallery({ items }: GraphicDesignGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GraphicGalleryItem | null>(null);
  const galleryTopRef = useRef<HTMLDivElement | null>(null);

  const categorySections = useMemo(
    () =>
      Array.from(
        items.reduce((sections, item) => {
          const section = sections.get(item.category) ?? [];
          section.push(item);
          sections.set(item.category, section);
          return sections;
        }, new Map<string, GraphicGalleryItem[]>()),
      ).map(([category, categoryItems]) => ({
        category,
        label: toReadableHeading(category),
        items: categoryItems,
      })),
    [items],
  );

  const scrollToCategory = (category: string) => {
    const target = document.getElementById(`graphic-category-${category}`);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    galleryTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    galleryTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={galleryTopRef}>
      <div className="mb-7 overflow-x-auto pb-1">
        <div className="flex min-w-max items-center gap-2 rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-xl shadow-[0_14px_32px_rgba(0,0,0,0.2)]">
          <button
            type="button"
            onClick={scrollToTop}
            className="relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white/70 transition-all duration-300 hover:border-blue-400/25 hover:bg-white/10 hover:text-white"
          >
            All
          </button>

          {categorySections.map((section) => (
            <button
              key={section.category}
              type="button"
              onClick={() => scrollToCategory(section.category)}
              className="relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white/70 transition-all duration-300 hover:border-blue-400/25 hover:bg-white/10 hover:text-white"
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {categorySections.map((section, sectionIndex) => (
          <motion.section
            key={section.category}
            id={`graphic-category-${section.category}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: sectionIndex * 0.05 }}
            className={sectionIndex === 0 ? undefined : "mt-10"}
          >
            <h2 className="mb-4 text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
              {section.label}
            </h2>

            <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
              {section.items.map((item, index) => (
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
            </div>
          </motion.section>
        ))}
      </AnimatePresence>

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