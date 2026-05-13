"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { services } from "@/content/services";

export default function Services() {
  return (
    <section
      id="services"
      className="section-divider py-24 md:py-32"
      aria-label="Services"
    >
      <div className="max-w-layout mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={fadeUp} className="text-eyebrow mb-4">
            Services
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-heading text-white mb-12">
            What I can build for you.
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-lg overflow-hidden"
          >
            {services.map((s) => (
              <motion.div
                key={s.n}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
                className="bg-bg p-8 flex flex-col gap-4 group hover:bg-surface1 transition-colors duration-200"
              >
                <span className="text-eyebrow text-white/20 group-hover:text-accent transition-colors">
                  {s.n}
                </span>
                <h3 className="font-display font-bold text-lg text-white">
                  {s.title}
                </h3>
                <p className="text-sm font-body text-white/50 leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
