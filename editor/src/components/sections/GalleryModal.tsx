"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilm, FaUsers, FaPalette, FaPlay, FaTimes, FaCamera } from "react-icons/fa";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GalleryModal({ isOpen, onClose }: GalleryModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // 3D Tilt Hook for Profile Card
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Relative mouse position from card center (-1 to 1)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Rotation values (max 15 degrees)
    setTilt({
      x: x * 20,
      y: -y * 20
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // 12 Floating particles around the card
  const particles = Array.from({ length: 12 });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-[#08080c]/90 backdrop-blur-2xl shadow-[0_0_50px_rgba(59,130,246,0.3)] overflow-hidden z-10 flex flex-col max-h-[90vh] md:max-h-[85vh]"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Ambient Lighting Blobs */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Floating Geometric Shapes */}
            <motion.div
              className="absolute top-10 right-10 w-16 h-16 border border-blue-500/5 rounded-full pointer-events-none"
              animate={{ y: [0, 15, 0], rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-20 left-10 w-12 h-12 border border-indigo-500/5 rounded-lg pointer-events-none"
              animate={{ y: [0, -10, 0], rotate: [45, 225, 45] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Animated Light Streak */}
            <motion.div
              className="absolute top-0 -left-[20%] w-[140%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -rotate-12 pointer-events-none"
              animate={{
                y: [-40, 500, -40],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-blue-500/30 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition duration-300 z-50 group cursor-pointer"
              aria-label="Close modal"
            >
              <FaTimes className="text-base transition-transform group-hover:rotate-90 duration-300" />
            </button>

            {/* Scrollable Modal Content */}
            <div className="p-6 md:p-10 overflow-y-auto flex-grow">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: 3D Interactive Profile Picture Showcase */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-6">
                  {/* Floating Particles Around Card */}
                  {particles.map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/40 blur-[0.5px] pointer-events-none"
                      style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: `${10 + Math.random() * 80}%`,
                      }}
                      animate={{
                        y: [0, -35 - Math.random() * 35, 0],
                        x: [0, (Math.random() - 0.5) * 35, 0],
                        scale: [0.6, 1.2, 0.6],
                        opacity: [0.2, 0.8, 0.2],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 1.5,
                      }}
                    />
                  ))}

                  {/* 3D Tilt Wrapper */}
                  <motion.div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={handleMouseLeave}
                    animate={{
                      rotateY: tilt.x,
                      rotateX: tilt.y,
                      scale: isHovered ? 1.02 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="relative w-[280px] h-[360px] md:w-[320px] md:h-[420px] rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-2xl p-4 cursor-grab active:cursor-grabbing group overflow-hidden flex items-center justify-center"
                  >
                    {/* Animated Border Glow inside Card */}
                    <div className="absolute inset-0 border border-blue-500/20 rounded-3xl opacity-50 group-hover:opacity-100 group-hover:border-blue-500/40 transition duration-500" />
                    
                    {/* Background Radial Light streak */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Image Container with Ambient Glow and Parallax depth */}
                    <div 
                      className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.3)] bg-black/20"
                      style={{ 
                        transform: isHovered ? "translateZ(30px)" : "translateZ(0px)",
                        transition: "transform 0.3s ease-out",
                        transformStyle: "preserve-3d"
                      }}
                    >
                      {/* Ambient Image Glow Backdrop */}
                      <div className="absolute -inset-2 bg-blue-500/15 blur-xl group-hover:bg-blue-500/25 transition duration-500 -z-10" />

                      {/* Continuous floating animated profile photo */}
                      <motion.div
                        className="w-full h-full"
                        animate={{
                          y: [0, -8, 0],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <img
                          src="/about.webp"
                          alt="Abhijeet Sarkar"
                          className="w-full h-full object-cover select-none scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      </motion.div>

                      {/* Overlay text detail with translation depth */}
                      <div 
                        className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/5 z-20"
                        style={{
                          transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
                          transition: "transform 0.3s ease-out"
                        }}
                      >
                        <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">Creator Profile</span>
                        <h4 className="text-white text-base font-bold mt-0.5">Abhijeet Sarkar</h4>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column: Name, Description & Statistics Grid */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                  {/* Name and Professional Badges */}
                  <div>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide font-[family-name:var(--font-heading)]">
                      Abhijeet Sarkar
                    </h3>
                    
                    {/* Role Badges */}
                    <div className="flex flex-wrap gap-2.5 mt-3">
                      <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center gap-1.5 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                        <FaPlay className="text-[9px]" /> Video Editor
                      </span>
                      <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center gap-1.5 shadow-[0_0_10px_rgba(168,85,247,0.1)]">
                        <FaPalette className="text-[9px]" /> Graphic Designer
                      </span>
                      <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                        <FaCamera className="text-[9px]" /> Creative Director
                      </span>
                    </div>
                  </div>

                  {/* Intro Text */}
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                    Hello! I'm a visual creator dedicated to designing immersive and compelling experiences. Through high-fidelity video editing, custom high-CTR graphic designs, and creative direction, I bridge the gap between creative visual storytelling and premium digital identity. Let's collaborate to elevate your brand value.
                  </p>

                  <div className="border-t border-white/5 pt-6">
                    <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Studio Statistics</h4>
                    
                    {/* Statistics Cards Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Projects Completed */}
                      <div className="relative p-4 rounded-2xl bg-white/[0.02] border border-white/5 shadow-md flex items-center space-x-3.5 group hover:border-blue-500/30 hover:bg-white/[0.04] transition duration-300 overflow-hidden">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition duration-300" />
                        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 group-hover:text-blue-300 transition duration-300">
                          <FaFilm className="text-lg" />
                        </div>
                        <div>
                          <div className="text-xl md:text-2xl font-extrabold text-white tracking-tight">300+</div>
                          <div className="text-[10px] md:text-xs text-text-secondary font-medium tracking-wide">Projects Completed</div>
                        </div>
                      </div>

                      {/* Clients Served */}
                      <div className="relative p-4 rounded-2xl bg-white/[0.02] border border-white/5 shadow-md flex items-center space-x-3.5 group hover:border-blue-500/30 hover:bg-white/[0.04] transition duration-300 overflow-hidden">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition duration-300" />
                        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 group-hover:text-blue-300 transition duration-300">
                          <FaUsers className="text-lg" />
                        </div>
                        <div>
                          <div className="text-xl md:text-2xl font-extrabold text-white tracking-tight">100+</div>
                          <div className="text-[10px] md:text-xs text-text-secondary font-medium tracking-wide">Clients Served</div>
                        </div>
                      </div>

                      {/* Creative Designs */}
                      <div className="relative p-4 rounded-2xl bg-white/[0.02] border border-white/5 shadow-md flex items-center space-x-3.5 group hover:border-purple-500/30 hover:bg-white/[0.04] transition duration-300 overflow-hidden">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition duration-300" />
                        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-110 group-hover:text-purple-300 transition duration-300">
                          <FaPalette className="text-lg" />
                        </div>
                        <div>
                          <div className="text-xl md:text-2xl font-extrabold text-white tracking-tight">150+</div>
                          <div className="text-[10px] md:text-xs text-text-secondary font-medium tracking-wide">Creative Designs</div>
                        </div>
                      </div>

                      {/* Videos Edited */}
                      <div className="relative p-4 rounded-2xl bg-white/[0.02] border border-white/5 shadow-md flex items-center space-x-3.5 group hover:border-purple-500/30 hover:bg-white/[0.04] transition duration-300 overflow-hidden">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition duration-300" />
                        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-110 group-hover:text-purple-300 transition duration-300">
                          <FaPlay className="text-lg" />
                        </div>
                        <div>
                          <div className="text-xl md:text-2xl font-extrabold text-white tracking-tight">200+</div>
                          <div className="text-[10px] md:text-xs text-text-secondary font-medium tracking-wide">Videos Edited</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
