"use client";

import { FaInstagram, FaLinkedin, FaYoutube, FaTwitter, FaArrowUp } from "react-icons/fa";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Portfolio", href: "#video-editing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  "Video Editing",
  "Motion Graphics",
  "Graphic Design",
  "Photo Retouching",
];

const socials = [
  { icon: FaInstagram, href: "https://instagram.com" },
  { icon: FaLinkedin, href: "https://linkedin.com" },
  { icon: FaYoutube, href: "https://youtube.com" },
  { icon: FaTwitter, href: "https://twitter.com" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-background-secondary border-t border-white/5">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold font-[family-name:var(--font-heading)] gradient-text-accent">
                AC
              </span>
              <span className="text-sm text-text-secondary tracking-[0.2em] uppercase">
                Studio
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Crafting cinematic visual experiences that elevate brands and
              captivate audiences worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-accent-light transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <span className="text-text-secondary text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>hello@alexcarter.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Los Angeles, CA</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social icons */}
          <div className="flex gap-4">
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent/20 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
              >
                <social.icon size={14} />
              </a>
            ))}
          </div>

          <p className="text-text-secondary text-xs">
            © {new Date().getFullYear()} Alex Carter Studio. All rights reserved.
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent/20 transition-all duration-300"
            aria-label="Back to top"
          >
            <FaArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
