"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Lightbox from "@/components/ui/Lightbox";
import { photographs } from "@/data/portfolio";
import { HiZoomIn } from "react-icons/hi";

const gradients = [
  "from-rose-600/20 to-amber-700/20",
  "from-slate-600/20 to-zinc-700/20",
  "from-emerald-600/20 to-lime-700/20",
  "from-sky-600/20 to-indigo-700/20",
  "from-violet-600/20 to-fuchsia-700/20",
  "from-orange-600/20 to-red-700/20",
  "from-teal-600/20 to-cyan-700/20",
  "from-pink-600/20 to-rose-700/20",
  "from-amber-600/20 to-yellow-700/20",
  "from-blue-600/20 to-indigo-700/20",
];

export default function Photography() {
  const [lightbox, setLightbox] = useState<{ open: boolean; title: string; gradient: string }>({
    open: false, title: "", gradient: "",
  });

  return (
    <section id="photography" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Photography"
          subtitle="Through the lens of creativity"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photographs.map((photo, i) => (
            <motion.div
              key={photo.id}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 cursor-pointer ${
                photo.span ? "sm:col-span-2 h-64" : "h-56"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setLightbox({ open: true, title: photo.title, gradient: gradients[i % gradients.length] })}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} bg-background-secondary transition-transform duration-500 group-hover:scale-110`} />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 w-full flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium text-sm">{photo.title}</p>
                    <p className="text-white/60 text-xs capitalize">{photo.category}</p>
                  </div>
                  <HiZoomIn className="text-white/60 text-lg" />
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
