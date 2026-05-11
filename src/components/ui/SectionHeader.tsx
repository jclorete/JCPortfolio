"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface SectionHeaderProps {
  kicker: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeader({
  kicker,
  title,
  description,
  center,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <motion.p
        variants={fadeUp}
        className="text-eyebrow mb-4"
        aria-label={`Section: ${kicker}`}
      >
        {kicker}
      </motion.p>
      <motion.h2 variants={fadeUp} className="text-heading text-white text-balance">
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="mt-4 text-base text-white/60 max-w-xl leading-relaxed"
          style={center ? { margin: "1rem auto 0" } : {}}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
