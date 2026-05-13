"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="section-divider py-8"
      aria-label="Site footer"
    >
      <div className="max-w-layout mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm font-body text-white/35">
          &copy; {year} Janperson Carl M. Lorete
        </p>
        <p className="text-sm font-body text-white/25">
          Built with Next.js &middot; Designed by Jaycie
        </p>
      </div>
    </motion.footer>
  );
}
