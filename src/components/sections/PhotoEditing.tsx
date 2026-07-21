"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { photoEdits } from "@/data/portfolio";

const previewItems = photoEdits.slice(0, 3);

export default function PhotoEditing() {
  return (
    <section id="photo-editing" className="py-10 md:py-12 bg-background-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white mb-5 md:mb-6">
          Photo Editing
        </h2>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {previewItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className="group relative aspect-square overflow-hidden rounded-[14px] border border-white/10 bg-transparent shadow-[0_14px_34px_rgba(0,0,0,0.28)] transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(59,130,246,0.22)]"
            >
              <Image
                src={item.after}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 33vw, 20vw"
                className="object-cover opacity-100 transition-all duration-300 group-hover:scale-[1.04]"
                style={{
                  filter: "none",
                  backdropFilter: "none",
                  opacity: 1,
                  transform: "none",
                }}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        <Link
          href="/photo-editing"
          className="mt-5 inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-blue-400/20 bg-linear-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(59,130,246,0.4)]"
        >
          View All Photo Editing Projects →
        </Link>
      </div>
    </section>
  );
}
