"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { sendEmail } from "@/lib/emailjs";
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp,
  FaInstagram, FaLinkedin, FaYoutube,
} from "react-icons/fa";

const contactInfo = [
  { icon: FaPhone, label: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { icon: FaEnvelope, label: "hello@alexcarter.com", href: "mailto:hello@alexcarter.com" },
  { icon: FaMapMarkerAlt, label: "Los Angeles, CA", href: "#" },
];

const socialLinks = [
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
];

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-text-secondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-colors text-sm";

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", projectType: "", budget: "", message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [lastSent, setLastSent] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Spam: honeypot
    if (honeypot) return;

    // Rate limit: 30 seconds
    if (Date.now() - lastSent < 30000) {
      setStatus("error");
      return;
    }

    // Basic validation
    if (!form.name || !form.email || !form.message) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return;

    setStatus("sending");
    try {
      await sendEmail(form);
      setStatus("success");
      setLastSent(Date.now());
      setForm({ name: "", email: "", phone: "", projectType: "", budget: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Get In Touch"
          subtitle="Let's create something amazing together"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info — left column */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent-light">
                  <info.icon size={16} />
                </div>
                <span className="text-text-secondary text-sm">{info.label}</span>
              </a>
            ))}

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/15551234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-green-600/10 border border-green-500/20 rounded-xl hover:bg-green-600/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                <FaWhatsapp size={18} />
              </div>
              <span className="text-green-300 text-sm font-medium">Chat on WhatsApp</span>
            </a>

            {/* Social links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent/20 hover:border-accent/30 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form — right column */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-6 md:p-8" hover={false}>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot — hidden */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Project Type</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Photo Editing">Photo Editing</option>
                    <option value="Motion Graphics">Motion Graphics</option>
                    <option value="Full Package">Full Package</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select Budget Range</option>
                  <option value="Under $500">Under $500</option>
                  <option value="$500 - $1,000">$500 - $1,000</option>
                  <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                  <option value="$5,000+">$5,000+</option>
                </select>

                <textarea
                  name="message"
                  placeholder="Tell me about your project *"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-accent-dark via-accent to-accent-light hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>

                {/* Status notifications */}
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-sm text-center font-medium"
                  >
                    ✓ Message sent successfully! I&apos;ll get back to you soon.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm text-center font-medium"
                  >
                    ✕ Something went wrong. Please try again later.
                  </motion.p>
                )}
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
