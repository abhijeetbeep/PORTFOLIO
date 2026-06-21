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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          {personalData.pricing.map((feature, i) => {
            const IconComponent = getIcon(feature.icon);
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <GlassCard className="p-8 h-full flex flex-col items-center text-center group relative overflow-hidden" hover={true}>
                  {/* Accent glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon wrapper */}
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-110 group-hover:text-blue-300 transition-all duration-300 mb-6">
                    <IconComponent size={24} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-heading)]">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
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
            className="px-10 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 border border-blue-400/20 mb-4 cursor-pointer"
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
