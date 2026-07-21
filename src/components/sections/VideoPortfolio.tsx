"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import FilterTabs from "@/components/ui/FilterTabs";
import VideoCard from "@/components/ui/VideoCard";
import VideoPlayerModal from "@/components/ui/VideoPlayerModal";
import { videoPortfolio } from "@/data/portfolio";
import { reelsData } from "@/data/reels";

const categories = ["All", "Reels", "YouTube", "Commercial"];

const categoryMap: Record<string, string> = {
  "All": "all",
  "Reels": "reels",
  "YouTube": "youtube",
  "Commercial": "commercial",
};

export default function VideoPortfolio() {
  const [active, setActive] = useState("All");
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [selectedVideoAspect, setSelectedVideoAspect] = useState<"portrait" | "landscape">("landscape");

  // Dynamically map and combine data
  const mappedReels = reelsData.map((reel) => ({
    id: reel.id,
    title: reel.title,
    category: "reels" as const,
    thumbnail: "/videos/thumbnail.webp",
    description: reel.description,
    client: reel.client,
    videoUrl: reel.videoUrl,
    aspectRatio: "portrait" as const,
  }));

  const allVideos = [...videoPortfolio, ...mappedReels];

  const filtered = (
    active === "All"
      ? allVideos
      : allVideos.filter((v) => v.category === categoryMap[active])
  ).filter((v) => !!v.videoUrl);

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

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((video, i) => (
              <motion.div
                key={video.id}
                className="break-inside-avoid mb-6"
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
                  videoUrl={video.videoUrl}
                  aspectRatio={video.aspectRatio}
                  onClick={() => {
                    if (video.videoUrl) {
                      setSelectedVideoUrl(video.videoUrl);
                      setSelectedVideoAspect(video.aspectRatio || (video.category === "reels" ? "portrait" : "landscape"));
                    }
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Custom Video Player Modal */}
      <VideoPlayerModal
        isOpen={selectedVideoUrl !== null}
        onClose={() => setSelectedVideoUrl(null)}
        videoUrl={selectedVideoUrl || ""}
        aspectRatio={selectedVideoAspect}
      />
    </section>
  );
}
