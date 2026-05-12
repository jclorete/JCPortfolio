"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, staggerContainer } from "@/lib/motion";
import Button from "@/components/ui/Button";
import { BackgroundPaths } from "@/components/ui/background-paths";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Animated SVG path background */}
      <BackgroundPaths />

      {/* Ambient glow — centered behind photo */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 45% 70% at 28% 55%, rgba(224,122,47,0.18) 0%, transparent 68%)",
        }}
      />

      {/* Centered 2-column layout */}
      <div className="relative z-10 w-full max-w-layout mx-auto px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">

          {/* Left — Photo */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block pointer-events-none select-none"
            style={{ height: "78vh", maxHeight: "680px" }}
            aria-hidden="true"
          >
            <Image
              src="/assets/jaycie.png"
              alt="Jaycie"
              fill
              className="object-contain object-bottom"
              priority
            />
            {/* Right-edge fade */}
            <div
              className="absolute inset-y-0 right-0 w-24 z-10"
              style={{ background: "linear-gradient(to left, #0B1218 0%, transparent 100%)" }}
            />
            {/* Bottom fade */}
            <div
              className="absolute bottom-0 left-0 right-0 z-10"
              style={{
                height: "40%",
                background:
                  "linear-gradient(to top, #0B1218 0%, #0B1218 15%, rgba(11,18,24,0.85) 35%, rgba(11,18,24,0.5) 55%, rgba(11,18,24,0.15) 78%, transparent 100%)",
              }}
            />
          </motion.div>

          {/* Right — Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.p variants={fadeUp} className="text-eyebrow mb-6">
              Multimedia · Design · Motion
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-white mb-6 font-display font-extrabold leading-[1.05]"
              style={{ fontSize: "clamp(36px, 4vw, 56px)", letterSpacing: "-0.03em" }}
            >
              Editing moments
              <br />
              into{" "}
              <span className="text-accent">experiences.</span>
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
