"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, staggerContainer } from "@/lib/motion";
import Button from "@/components/ui/Button";

const tools = [
  {
    id: "ae",
    label: "Ae",
    color: "#9999FF",
    bg: "rgba(12,12,60,0.82)",
    glow: "rgba(153,153,255,0.3)",
    pos: { top: "12%", right: "26%" },
    delay: 0,
    amp: 10,
  },
  {
    id: "pr",
    label: "Pr",
    color: "#EA77FF",
    bg: "rgba(28,8,55,0.82)",
    glow: "rgba(234,119,255,0.3)",
    pos: { top: "8%", right: "4%" },
    delay: 0.25,
    amp: 8,
  },
  {
    id: "ps",
    label: "Ps",
    color: "#31A8FF",
    bg: "rgba(0,14,40,0.82)",
    glow: "rgba(49,168,255,0.3)",
    pos: { top: "54%", left: "2%" },
    delay: 0.5,
    amp: 12,
  },
  {
    id: "ai",
    label: "Ai",
    color: "#FF9A00",
    bg: "rgba(24,8,0,0.82)",
    glow: "rgba(255,154,0,0.3)",
    pos: { top: "48%", right: "3%" },
    delay: 0.75,
    amp: 9,
  },
  {
    id: "figma",
    label: "Fg",
    color: "#F24E1E",
    bg: "rgba(24,10,5,0.82)",
    glow: "rgba(242,78,30,0.3)",
    pos: { bottom: "20%", right: "5%" },
    delay: 1.0,
    amp: 11,
  },
  {
    id: "claude",
    label: "✦",
    color: "#E07A2F",
    bg: "rgba(24,10,0,0.82)",
    glow: "rgba(224,122,47,0.3)",
    pos: { bottom: "24%", left: "4%" },
    delay: 0.6,
    amp: 8,
  },
];

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

      {/* Portrait + floating badges */}
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
        {/* Left-edge fade */}
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

        {/* Floating tool badges */}
        {tools.map((tool) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, scale: 0.4, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              delay: 0.9 + tool.delay,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 14,
            }}
            style={{ position: "absolute", ...tool.pos, zIndex: 20 }}
          >
            <motion.div
              animate={{ y: [0, -tool.amp, 0] }}
              transition={{
                duration: 2.8 + tool.delay * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: tool.delay * 0.3,
              }}
              style={{
                width: 66,
                height: 66,
                background: tool.bg,
                border: `1px solid ${tool.glow}`,
                borderRadius: 18,
                backdropFilter: "blur(10px)",
                boxShadow: `0 8px 28px rgba(0,0,0,0.5), 0 0 18px ${tool.glow}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: tool.color,
                  fontWeight: 800,
                  fontSize: tool.id === "claude" ? 26 : 22,
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: -0.5,
                  textShadow: `0 0 12px ${tool.glow}`,
                }}
              >
                {tool.label}
              </span>
            </motion.div>
          </motion.div>
        ))}
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
