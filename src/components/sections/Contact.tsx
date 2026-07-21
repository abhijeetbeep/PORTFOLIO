"use client";

import { useState, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import CustomSelect from "@/components/ui/CustomSelect";
import { personalData } from "@/data/personal";
import { sendEmail } from "@/lib/emailjs";
import * as FaIcons from "react-icons/fa";

const getIcon = (iconName: string) => {
  const Icon = (FaIcons as any)[iconName];
  return Icon ? Icon : FaIcons.FaQuestion;
};

const projectTypeOptions = [
  { value: "Video Editing", label: "Video Editing" },
  { value: "Graphic Design", label: "Graphic Design" },
  { value: "Photo Editing", label: "Photo Editing" },
  { value: "Motion Graphics", label: "Motion Graphics" },
  { value: "Full Package", label: "Full Package" },
  { value: "Other", label: "Other" },
];

const budgetOptions = [
  { value: "Under $500", label: "Under $500" },
  { value: "$500 - $1,000", label: "$500 - $1,000" },
  { value: "$1,000 - $5,000", label: "$1,000 - $5,000" },
  { value: "$5,000+", label: "$5,000+" },
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
  const [mobileEnquiryOpen, setMobileEnquiryOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; value: string } }
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

  const enquiryForm = (
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
        <CustomSelect
          name="projectType"
          value={form.projectType}
          onChange={handleChange}
          placeholder="Project Type"
          options={projectTypeOptions}
        />
      </div>

      <CustomSelect
        name="budget"
        value={form.budget}
        onChange={handleChange}
        placeholder="Select Budget Range"
        options={budgetOptions}
      />

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
        className="w-full py-3.5 rounded-xl font-semibold text-white bg-linear-to-r from-accent-dark via-accent to-accent-light hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
          Message sent successfully!
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
  );

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
            {personalData.contact.infoList.map((info) => {
              const IconComponent = getIcon(info.icon);
              return (
                <a
                  key={info.label}
                  href={info.href}
                  target={"target" in info ? info.target : undefined}
                  rel={"rel" in info ? info.rel : undefined}
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent-light">
                    <IconComponent size={16} />
                  </div>
                  <span className="text-text-secondary text-sm">{info.label}</span>
                </a>
              );
            })}

            {/* WhatsApp Button */}
            <a
              href={personalData.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-green-600/10 border border-green-500/20 rounded-xl hover:bg-green-600/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                <FaIcons.FaWhatsapp size={18} />
              </div>
              <span className="text-green-300 text-sm font-medium">WhatsApp: {personalData.contact.phone}</span>
            </a>

            {/* Social links */}
            <div className="flex gap-3 pt-2">
              {personalData.contact.socialLinks
                .filter((social) => social.icon !== "FaWhatsapp")
                .map((social) => {
                  const IconComponent = getIcon(social.icon);
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent/20 hover:border-accent/30 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <IconComponent size={16} />
                    </a>
                  );
                })}
            </div>
          </motion.div>

          {/* Mobile enquiry card */}
          <motion.div
            className="lg:hidden mx-auto w-full max-w-md"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div
              onClick={() => setMobileEnquiryOpen((current) => !current)}
              whileTap={{ scale: 0.985 }}
              animate={{
                boxShadow: mobileEnquiryOpen
                  ? "0 0 0 1px rgba(96,165,250,0.32), 0 0 38px rgba(59,130,246,0.22)"
                  : "0 16px 40px rgba(0,0,0,0.32)",
                y: mobileEnquiryOpen ? -2 : 0,
              }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(13,14,20,0.82)] backdrop-blur-2xl px-4 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.32)]"
            >
              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-blue-400/20" />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-blue-500/10 via-transparent to-transparent opacity-70" />
              <div className="pointer-events-none absolute -top-3 left-5 h-3 w-3 rounded-full bg-blue-400/70 blur-[6px]" />
              <div className="pointer-events-none absolute right-6 top-6 h-2.5 w-2.5 rounded-full bg-blue-300/70 blur-[5px]" />
              <div className="pointer-events-none absolute bottom-5 left-8 h-2 w-2 rounded-full bg-sky-400/60 blur-xs" />

              <div className="relative z-10 flex items-center justify-between gap-4" onClick={(event) => event.stopPropagation()}>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-blue-300/80">Enquiry</p>
                  <p className="mt-1 text-sm text-text-secondary">Tap to expand the form</p>
                </div>
                <motion.button
                  type="button"
                  onClick={() => setMobileEnquiryOpen((current) => !current)}
                  whileTap={{ scale: 0.94 }}
                  whileHover={{ scale: 1.03 }}
                  className="relative flex items-center justify-center rounded-full border border-blue-400/20 bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(59,130,246,0.28)]"
                >
                  <span className="relative z-10">Enquiry</span>
                  <motion.span
                    className="pointer-events-none absolute inset-0 rounded-full bg-white/20 opacity-0"
                    whileTap={{ opacity: 0.25, scale: 1.35 }}
                    transition={{ duration: 0.35 }}
                  />
                </motion.button>
              </div>

              <AnimatePresence initial={false}>
                {mobileEnquiryOpen && (
                  <motion.div
                    key="mobile-enquiry-form"
                    initial={{ height: 0, opacity: 0, y: -12 }}
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -12 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="pt-4">
                      <div className="mb-4 h-px w-full bg-linear-to-r from-transparent via-blue-400/30 to-transparent" />
                      <div className="rounded-[20px] bg-white/5 border border-white/10 p-4 backdrop-blur-xl">
                        {enquiryForm}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Contact Form — right column */}
          <motion.div
            className="hidden md:block lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-6 md:p-8" hover={false}>
              {enquiryForm}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
