"use client";

import { motion } from "framer-motion";
import { personalData } from "@/data/personal";
import * as FaIcons from "react-icons/fa";

const getIcon = (iconName: string) => {
  const Icon = (FaIcons as any)[iconName];
  return Icon ? Icon : FaIcons.FaQuestion;
};

export default function FloatingSocialDock() {
  return (
    <motion.div
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      {personalData.contact.socialLinks.map((social, i) => {
        const IconComponent = getIcon(social.icon);
        return (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-white hover:shadow-lg hover:shadow-accent/30 transition-all duration-300"
            whileHover={{ scale: 1.2 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + i * 0.1 }}
          >
            <IconComponent size={16} />
          </motion.a>
        );
      })}

      {/* Decorative line below icons */}
      <div className="w-px h-20 bg-gradient-to-b from-white/20 to-transparent mx-auto mt-2" />
    </motion.div>
  );
}
