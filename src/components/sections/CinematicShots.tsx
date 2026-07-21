"use client";

import { motion } from "framer-motion";
import { cinematicShots } from "@/data/portfolio";
import Link from "next/link";
import Image from "next/image";

const previewItems = cinematicShots.slice(0, 3);

export default function CinematicShots() {
  return (
    <section id="cinematic-shots" className="py-10 md:py-12 bg-background-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white mb-5 md:mb-6">
          Cinematic Shots
        </h2>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {previewItems.map((shot, i) => (
            <motion.div
              key={shot.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className="group relative aspect-square overflow-hidden rounded-[14px] border border-white/10 bg-transparent shadow-[0_14px_34px_rgba(0,0,0,0.28)] transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(59,130,246,0.22)]"
            >
              <Image
                src={shot.thumbnail}
                alt={shot.title}
                fill
                sizes="(max-width: 768px) 33vw, 20vw"
                className="object-cover transition-all duration-300"
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
          href="/cinematic-shots"
          className="mt-5 inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-blue-400/20 bg-linear-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(59,130,246,0.4)]"
        >
          View All Cinematic Shots →
        </Link>
      </div>
    </section>
  );
}
