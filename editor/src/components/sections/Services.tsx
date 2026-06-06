"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { services } from "@/data/services";
import { FaVideo, FaMagic, FaImage, FaPaintBrush, FaCamera, FaShareAlt } from "react-icons/fa";
import { ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  video: <FaVideo size={28} />,
  motion: <FaMagic size={28} />,
  thumbnail: <FaImage size={28} />,
  graphic: <FaPaintBrush size={28} />,
  photo: <FaCamera size={28} />,
  social: <FaShareAlt size={28} />,
};

export default function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Services"
          subtitle="Comprehensive creative solutions for your brand"
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <GlassCard className="p-6 h-full group">
                <div className="text-accent-light mb-4 group-hover:text-accent transition-colors">
                  {iconMap[service.icon]}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-accent-light transition-colors">
                  {service.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <ul className="space-y-1.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-text-secondary text-xs flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-accent-light" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
