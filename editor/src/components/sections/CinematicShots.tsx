"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Lightbox from "@/components/ui/Lightbox";
import { cinematicShots } from "@/data/portfolio";
import { HiZoomIn } from "react-icons/hi";
import Image from "next/image";

const heightMap = { landscape: "h-48", portrait: "h-72", square: "h-56" };

export default function CinematicShots() {
  const [lightbox, setLightbox] = useState<{ open: boolean; title: string; imgSrc: string }>({
    open: false, title: "", imgSrc: "",
  });

  return (
    <section className="section-padding bg-background-secondary/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Cinematic Shots"
          subtitle="Capturing moments with cinematic precision"
        />

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {cinematicShots.map((shot, i) => (
            <motion.div
              key={shot.id}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 break-inside-avoid cursor-pointer transition-all duration-500 ease-in-out hover:scale-105 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:border-blue-500/30 ${
                heightMap[shot.aspectRatio]
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setLightbox({ open: true, title: shot.title, imgSrc: shot.thumbnail })}
            >
              <Image
                src={shot.thumbnail}
                alt={shot.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <HiZoomIn className="text-white text-2xl mx-auto mb-2" />
                  <p className="text-white font-medium text-sm">{shot.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        isOpen={lightbox.open}
        onClose={() => setLightbox({ open: false, title: "", imgSrc: "" })}
        title={lightbox.title}
        imgSrc={lightbox.imgSrc}
      />
    </section>
  );
}
