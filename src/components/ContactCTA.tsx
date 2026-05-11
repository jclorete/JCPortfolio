"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import Button from "@/components/ui/Button";

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="section-divider py-28 md:py-40 relative overflow-hidden"
      aria-label="Contact"
    >
      {/* Accent glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(224,122,47,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-layout mx-auto px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center gap-6"
        >
          <motion.p variants={fadeUp} className="text-eyebrow">
            Let&apos;s build
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-heading text-white max-w-2xl text-balance"
          >
            Have a project? Let&apos;s make it look unmissable.
          </motion.h2>
          <motion.div variants={fadeUp}>
            <Button
              href="mailto:jclorete09@gmail.com?subject=Project%20inquiry%20for%20Jaycie"
              variant="primary"
              className="text-base px-8 py-4"
            >
              Email jclorete09@gmail.com
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
