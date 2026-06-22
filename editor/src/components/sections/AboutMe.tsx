"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { personalData } from "@/data/personal";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

const getIcon = (iconName: string) => {
  if (iconName.startsWith("Fa")) {
    const Icon = (FaIcons as any)[iconName];
    if (Icon) return Icon;
  }
  if (iconName.startsWith("Si")) {
    const Icon = (SiIcons as any)[iconName];
    if (Icon) return Icon;
  }
  return FaIcons.FaQuestion; // fallback
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutMe() {
  return (
    <section id="about" className="section-padding bg-background-secondary/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="About Me"
          subtitle="The creative mind behind the lens"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Container */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full flex items-center justify-center"
          >
            {/* Background Card */}
            <div
              className="hidden lg:block w-full aspect-[3/4] rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl"
              style={{
                backgroundImage: "url('/aboutbg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Slight dark overlay for readability */}
              <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
            </div>

            {/* Profile Image (centered on desktop, moves above text on mobile) */}
            <div className="lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-10">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer transition-all duration-500"
              >
                {/* Blue glow effect around the profile image */}
                <div className="absolute -inset-4 rounded-full bg-blue-500/25 blur-2xl group-hover:bg-blue-500/45 transition duration-500" />
                
                {/* Circular Profile Image with Glassmorphism Border */}
                <div
                  className="relative w-[280px] h-[280px] rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm shadow-[0_0_40px_rgba(59,130,246,0.6)]"
                >
                  <img
                    src="/about.jpg"
                    alt="Abhijeet Profile"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
              </motion.div>
            </div>

            {/* Decorative frame */}
            <div className="hidden lg:block absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-accent/20 -z-10" />
          </motion.div>

          {/* Text content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp}>
              <h3 className="text-3xl font-bold font-[family-name:var(--font-heading)] gradient-text mb-2">
                {personalData.name}
              </h3>
              <p className="text-accent-light font-medium mb-6">
                {personalData.about.title}
              </p>
            </motion.div>

            {personalData.about.paragraphs.map((paragraph, idx) => (
              <motion.p
                key={idx}
                variants={fadeUp}
                className={`text-text-secondary leading-relaxed ${
                  idx === personalData.about.paragraphs.length - 1 ? "mb-8" : "mb-4"
                }`}
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Tools I Use */}
            <motion.div variants={fadeUp}>
              <h4 className="text-white font-semibold mb-4">Tools I Use</h4>
              <div className="grid grid-cols-4 gap-3">
                {personalData.about.tools.map((tool) => {
                  const IconComponent = getIcon(tool.icon);
                  return (
                    <div
                      key={tool.name}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 hover:bg-white/10 transition-all duration-300 group"
                    >
                      <IconComponent className="text-xl text-text-secondary group-hover:text-accent-light transition-colors" />
                      <span className="text-[10px] text-text-secondary text-center leading-tight">
                        {tool.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
