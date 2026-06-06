"use client";

import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

interface VideoCardProps {
  title: string;
  thumbnail: string;
  category: string;
  description: string;
  client: string;
}

/* Gradient placeholders keyed by category */
const gradients: Record<string, string> = {
  reels: "from-pink-600/30 to-purple-600/30",
  youtube: "from-red-600/30 to-orange-600/30",
  commercial: "from-blue-600/30 to-cyan-600/30",
  cinematic: "from-amber-600/30 to-yellow-600/30",
  shortform: "from-green-600/30 to-teal-600/30",
};

/** Premium video portfolio card with play overlay */
export default function VideoCard({
  title,
  category,
  description,
  client,
}: VideoCardProps) {
  const grad = gradients[category] || "from-accent/30 to-accent-dark/30";

  return (
    <motion.div
      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
      whileHover={{ y: -4 }}
    >
      {/* Thumbnail placeholder */}
      <div className="relative aspect-video overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${grad} bg-background-secondary`}
        />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-accent/80 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-accent/30">
            <FaPlay className="text-white ml-1" size={16} />
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/40 backdrop-blur-sm text-white/90 capitalize">
            {category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold mb-1 group-hover:text-accent-light transition-colors">
          {title}
        </h3>
        <p className="text-text-secondary text-sm mb-2 line-clamp-2">
          {description}
        </p>
        <p className="text-accent-light text-xs font-medium">{client}</p>
      </div>
    </motion.div>
  );
}
