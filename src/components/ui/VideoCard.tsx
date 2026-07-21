"use client";

import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

interface VideoCardProps {
  title: string;
  thumbnail: string;
  category: string;
  description: string;
  client: string;
  videoUrl?: string;
  aspectRatio?: "portrait" | "landscape";
  onClick?: () => void;
}

/** Premium video portfolio card with play overlay and hover effects */
export default function VideoCard({
  title,
  thumbnail,
  category,
  description,
  client,
  videoUrl,
  aspectRatio,
  onClick,
}: VideoCardProps) {
  const isPortrait = aspectRatio === "portrait" || category === "reels";

  return (
    <motion.div
      onClick={onClick}
      className={`group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden 
        transition-all duration-300 cursor-pointer hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]`}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Video Thumbnail Wrapper */}
      <div className={`relative ${isPortrait ? "aspect-[9/16]" : "aspect-video"} overflow-hidden bg-background-secondary`}>
        <img
          src={thumbnail}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Dark overlay to increase text readability and hover depth */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
          <motion.div 
            className="w-16 h-16 rounded-full bg-blue-500/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-blue-500/40 border border-blue-400/40"
            whileHover={{ scale: 1.15, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <FaPlay className="text-white ml-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" size={18} />
          </motion.div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/50 backdrop-blur-md text-white/95 border border-white/5 capitalize tracking-wide">
            {category === "shortform" ? "Short Form" : category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 border-t border-white/5">
        <h3 className="text-white font-bold text-lg mb-1.5 group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-text-secondary text-sm mb-3.5 line-clamp-2 leading-relaxed">
          {description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-blue-400/90 text-xs font-semibold tracking-wider uppercase">
            Client: {client}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
