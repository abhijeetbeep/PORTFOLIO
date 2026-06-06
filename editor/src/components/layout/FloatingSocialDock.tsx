"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp } from "react-icons/fa";

const socials = [
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  { icon: FaWhatsapp, href: "https://wa.me/15551234567", label: "WhatsApp" },
];

export default function FloatingSocialDock() {
  return (
    <motion.div
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      {socials.map((social, i) => (
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
          <social.icon size={16} />
        </motion.a>
      ))}

      {/* Decorative line below icons */}
      <div className="w-px h-20 bg-gradient-to-b from-white/20 to-transparent mx-auto mt-2" />
    </motion.div>
  );
}
