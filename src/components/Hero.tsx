"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import Button from "@/components/ui/Button";
import { drivePreviewUrl } from "@/lib/drive";

const HERO_REEL_ID = "1q5OaWXbmaLRaIXnZxXEj6_tWCINydnTa";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(224,122,47,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-layout mx-auto px-6 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-center">
          {/* Text content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.p variants={fadeUp} className="text-eyebrow mb-6">
              Multimedia · Design · Motion
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-display-xl text-white mb-6 whitespace-pre-line"
            >
              {"Visuals that move.\nStories that convert."}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-subhead text-white/60 leading-relaxed mb-10 max-w-lg"
            >
              I help brands, creators, and agencies turn raw ideas and footage
              into scroll-stopping content — across graphic design, video
              editing, and motion.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button href="#work" variant="primary">
                See the work
              </Button>
              <Button href="#work" variant="ghost">
                Watch reel
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10">
              <a
                href="mailto:jclorete09@gmail.com"
                className="text-sm font-body text-white/40 hover:text-accent transition-colors"
              >
                jclorete09@gmail.com
              </a>
            </motion.div>
          </motion.div>

          {/* Floating video chip */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center"
          >
            <div
              className="relative rounded-[22px] overflow-hidden border border-white/10"
              style={{
                width: "220px",
                aspectRatio: "9/16",
                boxShadow:
                  "0 0 0 1px rgba(224,122,47,0.20), 0 40px 80px -20px rgba(0,0,0,0.8)",
              }}
            >
              <iframe
                src={drivePreviewUrl(HERO_REEL_ID)}
                allow="autoplay; encrypted-media"
                allowFullScreen
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full border-0"
                title="Featured reel"
                loading="lazy"
              />
              {/* Pause autoplay button for a11y */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-end">
                <span
                  className="text-[10px] font-body text-white/50 bg-black/40 px-2 py-1 rounded-full"
                  aria-live="polite"
                >
                  Reel preview
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[11px] font-body text-white/30 uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
