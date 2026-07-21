"use client";

import { personalData } from "@/data/personal";
import * as FaIcons from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

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

const getIcon = (iconName: string) => {
  const Icon = (FaIcons as any)[iconName];
  return Icon ? Icon : FaIcons.FaQuestion;
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-background-secondary border-t border-white/5">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent to-transparent" />

      <div className="md:hidden px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,0.28)] p-5">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-2xl font-bold font-heading gradient-text-accent">
              {personalData.logoText.split(" ")[0]}
            </span>
            <span className="text-sm text-text-secondary tracking-[0.2em] uppercase">
              {personalData.logoText.split(" ").slice(1).join(" ")}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
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

            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Services</h4>
              <ul className="space-y-2">
                {serviceLinks.map((service) => (
                  <li key={service}>
                    <span className="text-text-secondary text-sm">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/5">
            <h4 className="text-white font-semibold mb-3 text-sm">Get in Touch</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <a href={`mailto:${personalData.contact.email}`} className="hover:text-accent transition-colors">
                  {personalData.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${personalData.contact.phone}`} className="hover:text-accent transition-colors">
                  {personalData.contact.phone}
                </a>
              </li>
              <li>{personalData.contact.location}</li>
            </ul>
          </div>

          <div className="mt-5 pt-4 border-t border-white/5 flex flex-col items-center gap-4">
            <div className="flex gap-3">
              {personalData.contact.socialLinks.map((social) => {
                const IconComponent = getIcon(social.icon);
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent/20 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
                  >
                    <IconComponent size={14} />
                  </a>
                );
              })}
            </div>

            <p className="text-center text-text-secondary text-xs">
              © {new Date().getFullYear()} {personalData.logoText}. All rights reserved.
            </p>

            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent/20 transition-all duration-300"
              aria-label="Back to top"
            >
              <FaArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold font-heading gradient-text-accent">
                {personalData.logoText.split(" ")[0]}
              </span>
              <span className="text-sm text-text-secondary tracking-[0.2em] uppercase">
                {personalData.logoText.split(" ").slice(1).join(" ")}
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              {personalData.footerDescription}
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
              <li>
                <a href={`mailto:${personalData.contact.email}`} className="hover:text-accent transition-colors">
                  {personalData.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${personalData.contact.phone}`} className="hover:text-accent transition-colors">
                  {personalData.contact.phone}
                </a>
              </li>
              <li>{personalData.contact.location}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social icons */}
          <div className="flex gap-4">
            {personalData.contact.socialLinks.map((social) => {
              const IconComponent = getIcon(social.icon);
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent/20 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
                >
                  <IconComponent size={14} />
                </a>
              );
            })}
          </div>

          <p className="text-text-secondary text-xs">
            © {new Date().getFullYear()} {personalData.logoText}. All rights reserved.
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
      </div>
    </footer>
  );
}
