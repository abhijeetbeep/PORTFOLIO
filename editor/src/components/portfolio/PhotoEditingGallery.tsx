"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import GlassCard from "@/components/ui/GlassCard";
import type { PhotoGalleryItem } from "@/lib/portfolio-gallery";

interface PhotoEditingGalleryProps {
  items: Extract<PhotoGalleryItem, { type: "comparison" }>[];
}

function ComparisonModal({
  item,
  onClose,
}: {
  item: Extract<PhotoGalleryItem, { type: "comparison" }>;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" onClick={onClose} />

        <motion.div
          className="relative z-10 w-[95vw] max-w-6xl rounded-3xl border border-white/10 bg-[#05060b]/95 p-4 md:p-6 shadow-[0_0_60px_rgba(59,130,246,0.25)]"
          initial={{ scale: 0.94, opacity: 0, y: 18 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 18 }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-blue-300/80">Fullscreen Preview</p>
              <h3 className="mt-2 text-xl md:text-2xl font-bold text-white">{item.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
            >
              Close
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-3 md:p-4">
            <BeforeAfterSlider
              title={item.title}
              beforeImage={item.before}
              afterImage={item.after}
              width={item.width}
              height={item.height}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function PhotoEditingGallery({ items }: PhotoEditingGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<PhotoGalleryItem | null>(null);

  return (
    <div>
      <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
              className="mb-5 break-inside-avoid"
            >
              <GlassCard className="overflow-hidden p-3 sm:p-4 bg-white/5 border border-white/10" hover={false}>
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="group w-full text-left"
                >
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_16px_40px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-[1.01]">
                    <BeforeAfterSlider
                      title={item.title}
                      beforeImage={item.before}
                      afterImage={item.after}
                      width={item.width}
                      height={item.height}
                    />
                  </div>
                </button>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {selectedItem?.type === "comparison" && (
        <ComparisonModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}