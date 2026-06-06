"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import FilterTabs from "@/components/ui/FilterTabs";
import VideoCard from "@/components/ui/VideoCard";
import { videoPortfolio } from "@/data/portfolio";

const categories = ["All", "Reels", "YouTube", "Commercial", "Cinematic", "Short Form"];

const categoryMap: Record<string, string> = {
  "All": "all",
  "Reels": "reels",
  "YouTube": "youtube",
  "Commercial": "commercial",
  "Cinematic": "cinematic",
  "Short Form": "shortform",
};

export default function VideoPortfolio() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? videoPortfolio
      : videoPortfolio.filter((v) => v.category === categoryMap[active]);

  return (
    <section id="video-editing" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Video Editing Portfolio"
          subtitle="Showcasing cinematic storytelling and creative edits"
        />

        <FilterTabs
          categories={categories}
          activeCategory={active}
          onSelect={setActive}
        />

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((video, i) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <VideoCard
                  title={video.title}
                  thumbnail={video.thumbnail}
                  category={video.category}
                  description={video.description}
                  client={video.client}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
