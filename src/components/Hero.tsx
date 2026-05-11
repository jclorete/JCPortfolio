"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, staggerContainer } from "@/lib/motion";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 75% 50%, rgba(224,122,47,0.13) 0%, transparent 70%)",
        }}
      />

      {/* Large portrait — right side, full height */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 bottom-0 top-0 hidden lg:block pointer-events-none select-none"
        style={{ width: "52%" }}
        aria-hidden="true"
      >
        {/* Orange center glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(224,122,47,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Left-edge fade so figure bleeds into dark bg */}
        <div
          className="absolute inset-y-0 left-0 w-48 z-10"
          style={{
            background: "linear-gradient(to right, #0B1218 0%, transparent 100%)",
          }}
        />
        <Image
          src="/assets/jaycie.png"
          alt="Jaycie"
          fill
          className="object-contain object-center"
          priority
        />
      </motion.div>

      {/* Text — left column */}
      <div className="relative z-10 max-w-layout mx-auto px-6 pt-32 pb-20 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-lg"
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
            className="text-subhead text-white/60 leading-relaxed mb-10"
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
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
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
