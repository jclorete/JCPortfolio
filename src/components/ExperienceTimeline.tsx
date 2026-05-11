"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { experience } from "@/content/profile";

export default function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="section-divider py-24 md:py-32"
      aria-label="Experience"
    >
      <div className="max-w-layout mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={fadeUp} className="text-eyebrow mb-4">
            Experience
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-heading text-white mb-16">
            Where I&apos;ve worked.
          </motion.h2>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-0 top-2 bottom-0 w-px bg-white/5 hidden md:block"
              aria-hidden="true"
            />

            <motion.div variants={staggerContainer} className="flex flex-col gap-12">
              {experience.map((job, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="md:pl-10 relative"
                >
                  {/* Dot */}
                  <div
                    className="hidden md:block absolute left-0 top-1.5 w-2 h-2 rounded-full bg-accent -translate-x-[3px]"
                    aria-hidden="true"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 mb-4">
                    <div>
                      <h3 className="font-display font-bold text-xl text-white">
                        {job.company}
                      </h3>
                      <p className="text-sm font-body text-accent mt-0.5">
                        {job.role}
                        {job.mode && (
                          <span className="text-white/40 ml-2">· {job.mode}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {job.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-sm font-body text-white/55 leading-relaxed"
                      >
                        <span
                          className="mt-2 w-1 h-1 rounded-full bg-white/25 shrink-0"
                          aria-hidden="true"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
