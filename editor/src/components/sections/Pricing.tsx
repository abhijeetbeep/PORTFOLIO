"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import PricingCard from "@/components/ui/PricingCard";
import { pricing } from "@/data/pricing";

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-background-secondary/50">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Pricing Plans"
          subtitle="Flexible packages tailored to your needs"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          {pricing.map((tier) => (
            <motion.div
              key={tier.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <PricingCard
                name={tier.name}
                price={tier.price}
                period={tier.period}
                features={tier.features}
                popular={tier.popular}
                cta={tier.cta}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
