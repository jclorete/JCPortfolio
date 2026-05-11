"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { stats } from "@/content/profile";

export default function Stats() {
  return (
    <section className="section-divider" aria-label="Key statistics">
      <div className="max-w-layout mx-auto px-6 py-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-lg overflow-hidden"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.value}
              variants={fadeUp}
              className="bg-bg px-6 py-8 flex flex-col gap-1"
            >
              <span className="font-display font-bold text-4xl text-white">
                {stat.value}
              </span>
              <span className="text-sm font-body text-white/50 leading-snug">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
