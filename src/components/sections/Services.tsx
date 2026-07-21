"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { services } from "@/data/services";
import {
  FaVideo,
  FaMagic,
  FaImage,
  FaPaintBrush,
  FaCamera,
  FaShareAlt,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
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
  const [activeServiceId, setActiveServiceId] = useState<number | null>(null);

  const toggleService = (serviceId: number) => {
    setActiveServiceId((current) => (current === serviceId ? null : serviceId));
  };

  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Services"
          subtitle="Comprehensive creative solutions for your brand"
        />

        <div className="md:hidden space-y-4">
          {services.map((service) => {
            const isOpen = activeServiceId === service.id;

            return (
              <motion.div
                key={service.id}
                layout
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  layout
                  onClick={() => toggleService(service.id)}
                  whileHover={{ scale: 1.01 }}
                  animate={{ scale: isOpen ? 1.02 : 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative min-h-50 overflow-hidden rounded-3xl border p-5 text-left transition-all duration-500 ${
                    isOpen
                      ? "bg-[rgba(15,15,20,0.92)] border-blue-400/30 shadow-[0_0_30px_rgba(59,130,246,0.28)] backdrop-blur-[22px]"
                      : "bg-[rgba(15,15,20,0.72)] border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.28)]"
                  }`}
                >
                  {isOpen && (
                    <motion.div
                      layoutId={`service-glow-${service.id}`}
                      className="absolute inset-0 rounded-3xl border border-blue-400/20 bg-linear-to-br from-blue-500/10 via-transparent to-transparent"
                      transition={{ duration: 0.5 }}
                    />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      <motion.div
                        animate={{ scale: isOpen ? 1.08 : 1 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className={`shrink-0 rounded-2xl border p-3 transition-all duration-500 ${
                          isOpen
                            ? "bg-blue-500/15 border-blue-400/30 text-blue-300"
                            : "bg-white/5 border-white/10 text-accent-light"
                        }`}
                      >
                        {iconMap[service.icon]}
                      </motion.div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-white font-semibold text-lg leading-tight mb-2">
                          {service.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                          {service.description}
                        </p>
                      </div>

                      <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="mt-1 rounded-full border border-white/10 bg-white/5 p-2 text-blue-300"
                        aria-hidden="true"
                      >
                        {isOpen ? <FaMinus size={12} /> : <FaPlus size={12} />}
                      </motion.div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-blue-300/90">
                        Tap to Explore
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="mobile-service-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <motion.ul
                            className="mt-5 space-y-2.5"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                              collapsed: {},
                              open: {
                                transition: {
                                  staggerChildren: 0.1,
                                  delayChildren: 0.05,
                                },
                              },
                            }}
                          >
                            {service.features.map((feature) => (
                              <motion.li
                                key={feature}
                                variants={{
                                  collapsed: { opacity: 0, y: 10 },
                                  open: { opacity: 1, y: 0 },
                                }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-2 text-sm text-text-secondary"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                                {feature}
                              </motion.li>
                            ))}
                          </motion.ul>

                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-5 inline-flex items-center justify-center rounded-full border border-blue-400/25 bg-linear-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                            onClick={(event) => event.stopPropagation()}
                          >
                            Learn More
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
