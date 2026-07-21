"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { personalData } from "@/data/personal";
import * as FaIcons from "react-icons/fa";

const getIcon = (iconName: string) => {
  const Icon = (FaIcons as any)[iconName];
  return Icon ? Icon : FaIcons.FaQuestion;
};

export default function Pricing() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="section-padding bg-background-secondary/50">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading
          title="Let's Discuss Your Project"
          subtitle="Every project is unique. Contact me to receive a customized quote based on your requirements, timeline, and creative goals."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 md:mb-12 items-stretch"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {personalData.pricing.map((feature, i) => {
            const IconComponent = getIcon(feature.icon);
            return (
              <motion.div
                key={i}
                className="h-full"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <GlassCard
                  className="relative h-full overflow-hidden rounded-[20px] border border-white/10 bg-white/5 p-4 sm:p-5 md:p-5 lg:p-5 flex flex-col items-center justify-center text-center group will-change-transform"
                  hover={false}
                >
                  {/* Accent glow on hover */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-b from-blue-500/10 via-transparent to-transparent opacity-0"
                    animate={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.35 }}
                  />

                  <motion.div
                    className="absolute inset-0 rounded-[20px] border border-blue-400/0"
                    initial={false}
                    whileHover={{ borderColor: "rgba(96, 165, 250, 0.35)" }}
                    transition={{ duration: 0.35 }}
                  />
                  
                  {/* Icon wrapper */}
                  <motion.div
                    className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400 shadow-[0_0_18px_rgba(59,130,246,0.12)]"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                  >
                    <IconComponent size={22} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="relative z-10 text-lg sm:text-xl font-bold text-white font-heading">
                    {feature.title}
                  </h3>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Area */}
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button
            onClick={scrollToContact}
            className="px-10 py-4 rounded-xl font-bold text-white bg-linear-to-r from-blue-600 via-indigo-600 to-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 border border-blue-400/20 mb-4 cursor-pointer"
          >
            Contact For More Details
          </button>
          
          <p className="text-text-secondary/70 text-xs sm:text-sm max-w-md">
            Contact me directly on WhatsApp or through the contact form for a custom quotation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
