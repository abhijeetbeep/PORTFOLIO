"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Lightbox from "@/components/ui/Lightbox";
import { cinematicShots } from "@/data/portfolio";
import { HiZoomIn } from "react-icons/hi";

const gradients = [
  "from-amber-600/25 to-orange-800/25",
  "from-blue-600/25 to-indigo-800/25",
  "from-emerald-600/25 to-teal-800/25",
  "from-rose-600/25 to-pink-800/25",
  "from-violet-600/25 to-purple-800/25",
  "from-cyan-600/25 to-sky-800/25",
  "from-fuchsia-600/25 to-rose-800/25",
  "from-lime-600/25 to-green-800/25",
];

const heightMap = { landscape: "h-48", portrait: "h-72", square: "h-56" };

export default function CinematicShots() {
  const [lightbox, setLightbox] = useState<{ open: boolean; title: string; gradient: string }>({
    open: false, title: "", gradient: "",
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
              className={`group relative overflow-hidden rounded-2xl border border-white/10 break-inside-avoid cursor-pointer ${
                heightMap[shot.aspectRatio]
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setLightbox({ open: true, title: shot.title, gradient: gradients[i % gradients.length] })}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} bg-background-secondary transition-transform duration-500 group-hover:scale-110`} />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
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
        onClose={() => setLightbox({ open: false, title: "", gradient: "" })}
        title={lightbox.title}
        gradient={lightbox.gradient}
      />
    </section>
  );
}
