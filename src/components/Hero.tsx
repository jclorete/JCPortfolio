"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, staggerContainer } from "@/lib/motion";
import Button from "@/components/ui/Button";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { LampEffect } from "@/components/ui/lamp";

export default function Hero() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Animated SVG path background */}
      <BackgroundPaths />

      {/* Lamp light beam from top */}
      <LampEffect />

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
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center pt-8 lg:pt-0">

          {/* Left — Photo */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-last lg:order-first select-none cursor-pointer"
            style={{
              height: "clamp(320px, 60vw, 680px)",
              maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 72%, transparent 100%), linear-gradient(to top, transparent 0%, black 22%, black 100%)",
              maskComposite: "intersect",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 72%, transparent 100%), linear-gradient(to top, transparent 0%, black 22%, black 100%)",
              WebkitMaskComposite: "source-in",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={() => setHovered(true)}
            onTouchEnd={() => setHovered(false)}
            aria-hidden="true"
          >
            {/* Default photo — drifts upward as it exits (head lifting) */}
            <Image
              src="/assets/Untitled-3.png"
              alt="Jaycie"
              fill
              className="object-contain object-bottom"
              style={{
                opacity: hovered ? 0 : 1,
                transform: hovered
                  ? "translateY(-40px) scale(1.02)"
                  : "translateY(0px) scale(1)",
                filter: hovered ? "blur(6px)" : "blur(0px)",
                willChange: "opacity, transform, filter",
                transition: [
                  "opacity 0.9s cubic-bezier(0.76,0,0.24,1)",
                  "transform 0.9s cubic-bezier(0.76,0,0.24,1)",
                  "filter 0.4s cubic-bezier(0.76,0,0.24,1) 0.1s",
                ].join(", "),
              }}
              priority
            />
            {/* Hover photo — rises up into position (head settling after lift) */}
            <Image
              src="/assets/photo2-sized.png"
              alt="Jaycie"
              fill
              className="object-contain object-bottom"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered
                  ? "translateY(0px) scale(1)"
                  : "translateY(35px) scale(0.99)",
                filter: hovered ? "blur(0px)" : "blur(6px)",
                willChange: "opacity, transform, filter",
                transition: [
                  "opacity 0.9s cubic-bezier(0.76,0,0.24,1)",
                  "transform 0.9s cubic-bezier(0.76,0,0.24,1)",
                  "filter 0.4s cubic-bezier(0.76,0,0.24,1) 0.15s",
                ].join(", "),
              }}
              priority
            />
          </motion.div>

          {/* Right — Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col order-first lg:order-last"
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
        <div className="w-px h-12 bg-gradient-to-b from-black/20 dark:from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
