"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { personalData } from "@/data/personal";
import * as FaIcons from "react-icons/fa";

const getIcon = (iconName: string) => {
  const Icon = (FaIcons as any)[iconName];
  return Icon ? <Icon size={24} /> : null;
};

export default function Statistics() {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          {personalData.stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <GlassCard className="h-full" hover={false}>
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  label={stat.label}
                  icon={getIcon(stat.icon)}
                />
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
