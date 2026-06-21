"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

interface PhotoEditingProps {
  dynamicEdits?: Array<{
    id: string;
    title: string;
    description?: string;
    before: string;
    after: string;
    width: number;
    height: number;
  }>;
}

export default function PhotoEditing({ dynamicEdits = [] }: PhotoEditingProps) {
  return (
    <section id="photo-editing" className="section-padding bg-background-secondary/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Photo Editing"
          subtitle="Transforming raw captures into visual masterpieces"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dynamicEdits.map((edit, i) => (
            <motion.div
              key={edit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-4 h-full flex flex-col">
                <BeforeAfterSlider 
                  title={edit.title} 
                  description={edit.description}
                  beforeImage={edit.before}
                  afterImage={edit.after}
                  width={edit.width}
                  height={edit.height}
                />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
