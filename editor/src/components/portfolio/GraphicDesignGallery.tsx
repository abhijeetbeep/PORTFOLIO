"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";
import type { GraphicGalleryItem } from "@/lib/portfolio-gallery";

interface GraphicDesignGalleryProps {
  items: GraphicGalleryItem[];
}

export default function GraphicDesignGallery({ items }: GraphicDesignGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GraphicGalleryItem | null>(null);

  return (
    <div>
      <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setSelectedImage(item)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
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