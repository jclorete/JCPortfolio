"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { driveThumbUrl, drivePreviewUrl } from "@/lib/drive";

const VIDEOS = [
  {
    id: "1SbBktEaFIU1iJaNJpAkJYj89OcrCABTL",
    title: "Long Form Edit 01",
    category: "LONG FORM VIDEO",
  },
  {
    id: "1Rhvo7SkhJVG4vQnfkPiv9Pz_fY2vWiyn",
    title: "Long Form Edit 02",
    category: "LONG FORM VIDEO",
  },
  {
    id: "1fEAGHzYqfFelNLiOydNci-SpNZKhzc7C",
    title: "Long Form Edit 03",
    category: "LONG FORM VIDEO",
  },
  {
    id: "1gCoz0My41HwSvq51JgM6MR6nXy9US-zY",
    title: "Long Form Edit 04",
    category: "LONG FORM VIDEO",
  },
  {
    id: "19p6m1hsm6dHsnCXWvdWsLQoRxUDOy-Lm",
    title: "Long Form Edit 05",
    category: "LONG FORM VIDEO",
  },
];

export default function LongFormVideos() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  const total = VIDEOS.length;
  const prev = () => { setActive((a) => (a - 1 + total) % total); setPlaying(false); };
  const next = () => { setActive((a) => (a + 1) % total); setPlaying(false); };
  const vid = VIDEOS[active];

  return (
    <section
      className="section-divider py-24 md:py-32 overflow-hidden"
      aria-label="Long Form Videos"
    >
      <div className="max-w-layout mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex items-start justify-between mb-14"
        >
          <div className="flex items-start gap-5">
            <motion.span
              variants={fadeUp}
              className="text-accent font-body text-sm font-bold tracking-widest pt-3"
            >
              01
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-heading text-white"
            >
              Long Form Videos
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-body text-white/35 tracking-[0.18em] uppercase text-right leading-relaxed hidden lg:block mt-2"
          >
            Long-form &<br />Narrative edits
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center gap-5"
        >
          {/* Prev */}
          <button
            onClick={prev}
            disabled={total <= 1}
            className="flex-shrink-0 w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all disabled:opacity-20 text-2xl leading-none"
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Card */}
          <div
            className="flex-1 relative rounded-2xl overflow-hidden bg-surface1 shadow-card"
            style={{ aspectRatio: "16/9" }}
          >
            {!playing ? (
              <>
                <img
                  src={driveThumbUrl(vid.id)}
                  alt={vid.title}
                  className="w-full h-full object-cover"
                />
                {/* Play button */}
                <button
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group"
                  aria-label="Play video"
                >
                  <span className="w-[72px] h-[72px] rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white/25 group-hover:scale-105 transition-all duration-200">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
                {/* Bottom overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-5 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                  <p className="text-[10px] font-body text-accent tracking-[0.2em] uppercase mb-1">
                    {vid.category}
                  </p>
                  <p className="text-white font-display font-bold text-xl">
                    {vid.title}
                  </p>
                </div>
              </>
            ) : (
              <iframe
                src={drivePreviewUrl(vid.id)}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full border-0"
                title={vid.title}
              />
            )}
          </div>

          {/* Next */}
          <button
            onClick={next}
            disabled={total <= 1}
            className="flex-shrink-0 w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all disabled:opacity-20 text-2xl leading-none"
            aria-label="Next"
          >
            ›
          </button>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-7">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setPlaying(false); }}
              className={`h-[6px] rounded-full transition-all duration-300 ${
                i === active ? "bg-white w-6" : "bg-white/25 w-[6px]"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
