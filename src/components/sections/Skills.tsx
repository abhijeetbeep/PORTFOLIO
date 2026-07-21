"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillBar from "@/components/ui/SkillBar";
import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Mastering the tools of creative storytelling"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 },
              }}
            >
              <SkillBar
                name={skill.name}
                percentage={skill.percentage}
                color={skill.color}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
