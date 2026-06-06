"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import FilterTabs from "@/components/ui/FilterTabs";
import { graphicDesigns } from "@/data/portfolio";

const categories = ["All", "Posters", "Thumbnails", "Social Media", "Branding"];
const categoryMap: Record<string, string> = {
  "All": "all", "Posters": "posters", "Thumbnails": "thumbnails",
  "Social Media": "social-media", "Branding": "branding",
};

const gradients = [
  "from-pink-500/25 to-rose-700/25",
  "from-indigo-500/25 to-blue-700/25",
  "from-emerald-500/25 to-green-700/25",
  "from-amber-500/25 to-orange-700/25",
  "from-purple-500/25 to-violet-700/25",
  "from-cyan-500/25 to-teal-700/25",
];

export default function GraphicDesign() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? graphicDesigns
      : graphicDesigns.filter((d) => d.category === categoryMap[active]);

  return (
    <section id="graphic-design" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Graphic Design"
          subtitle="Creative designs that make brands stand out"
        />

        <FilterTabs categories={categories} activeCategory={active} onSelect={setActive} />

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((design, i) => (
              <motion.div
                key={design.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="group"
                style={{ perspective: "1000px" }}
              >
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-accent/10 group-hover:[transform:rotateY(2deg)_rotateX(2deg)]">
                  {/* Thumbnail placeholder */}
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} bg-background-secondary`} />
                    <div className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%)",
                        backgroundSize: "30px 30px",
                      }}
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center p-4">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                        <p className="text-white text-sm">{design.description}</p>
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/40 backdrop-blur-sm text-white/90 capitalize">
                        {design.category.replace("-", " ")}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-white font-semibold text-sm group-hover:text-accent-light transition-colors">
                      {design.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
