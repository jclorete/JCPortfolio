"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { ownerProfile } from "@/content/profile";

export default function About() {
  return (
    <section
      id="about"
      className="section-divider py-24 md:py-32"
      aria-label="About"
    >
      <div className="max-w-layout mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* Left: prose */}
          <div>
            <motion.p variants={fadeUp} className="text-eyebrow mb-4">
              About
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-heading text-white mb-6">
              Your creative partner across design, motion, and story.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base font-body text-white/60 leading-relaxed"
            >
              {ownerProfile.bio}
            </motion.p>
          </div>

          {/* Right: bento highlights */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 gap-3"
          >
            {ownerProfile.aboutHighlights.map((h) => (
              <motion.div
                key={h.value}
                variants={fadeUp}
                className="bg-surface1 border border-white/5 rounded-lg p-5 flex flex-col gap-1 shadow-card"
              >
                <span className="font-display font-bold text-xl text-white">
                  {h.value}
                </span>
                <span className="text-sm font-body text-white/50 leading-snug">
                  {h.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
