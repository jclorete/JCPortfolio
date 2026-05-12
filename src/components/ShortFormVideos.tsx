"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";

const driveThumbUrl = (id: string) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w800`;

const VIDEOS = [
  { id: "1xDvs5W6TGn4AldrZnhNQriT2IjyALALG", title: "Short Form Edit 01", category: "SHORT FORM" },
  { id: "1VxZZmTzRpNF4optIdqMaQ3j01bafk81a", title: "Short Form Edit 02", category: "SHORT FORM" },
  { id: "1833zRzYavIlYFbUL0e6m51GQYoam-r4M", title: "Short Form Edit 03", category: "SHORT FORM" },
  { id: "1zEodM8JwTA7YYIudtg2Feie9OvYHibb9", title: "Short Form Edit 04", category: "SHORT FORM" },
  { id: "1eYYBvqIN1S3oobeyzbACZ15kmaHUNbYt", title: "Short Form Edit 05", category: "SHORT FORM" },
  { id: "1Wr4TWSI66zRCWN5CPWJYuk-ay54Q96VF", title: "Short Form Edit 06", category: "SHORT FORM" },
  { id: "1qjVIsIgmTs7oFNgAZpCTsiXdnT9a_kf1", title: "Short Form Edit 07", category: "SHORT FORM" },
  { id: "1XBRzcl9gxTn53ha0ImT6qhhPjHTgfGYm", title: "Short Form Edit 08", category: "SHORT FORM" },
  { id: "12PeJHHolGzy05lr8wQMu0fZsyFnP_l8-", title: "Short Form Edit 09", category: "SHORT FORM" },
  { id: "1h4rOoQmE02H9VfzZDP3TH_3jCJiX08S4", title: "Short Form Edit 10", category: "SHORT FORM" },
  { id: "1pK3mTZxQK-3wHwiG8MrEC7RUlNZwfnsi", title: "Short Form Edit 11", category: "SHORT FORM" },
  { id: "1vIHKXKL2HBh6fikVNsckTL1A5UtUIYIU", title: "Short Form Edit 12", category: "SHORT FORM" },
  { id: "1fNQEJNThYSRS7_KjvDMFM59jy5h1wllF", title: "Short Form Edit 13", category: "SHORT FORM" },
];

const drivePreviewUrl = (id: string) =>
  `https://drive.google.com/file/d/${id}/preview`;

const CARD_W = 300;   // px — center card width
const SPREAD = 310;   // px — horizontal offset per step

const OFFSETS: Record<number, { x: number; scale: number; opacity: number; z: number; blur: number }> = {
  [-2]: { x: -SPREAD * 1.75, scale: 0.62, opacity: 0.25, z: 1,  blur: 3 },
  [-1]: { x: -SPREAD,        scale: 0.82, opacity: 0.60, z: 5,  blur: 0 },
  [0]:  { x: 0,              scale: 1,    opacity: 1,    z: 10, blur: 0 },
  [1]:  { x: SPREAD,         scale: 0.82, opacity: 0.60, z: 5,  blur: 0 },
  [2]:  { x: SPREAD * 1.75,  scale: 0.62, opacity: 0.25, z: 1,  blur: 3 },
};

export default function ShortFormVideos() {
  const [current, setCurrent] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const total = VIDEOS.length;

  const prev = useCallback(() => {
    setPlayingIndex(null);
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setPlayingIndex(null);
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const goTo = useCallback((i: number) => {
    setPlayingIndex(null);
    setCurrent(i);
  }, []);

  return (
    <section
      id="reels"
      className="section-divider py-24 md:py-32 overflow-hidden"
      aria-label="Short Form Reels"
    >
      <div className="max-w-layout mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex items-start justify-between mb-16"
        >
          <div className="flex items-start gap-5">
            <motion.span
              variants={fadeUp}
              className="text-accent font-body text-sm font-bold tracking-widest pt-3"
            >
              02
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-heading text-white"
            >
              Short Form<br />Reels / Ads
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-body text-white/35 tracking-[0.18em] uppercase text-right leading-relaxed hidden lg:block mt-2"
          >
            Social Media &<br />Advertising Content
          </motion.p>
        </motion.div>
      </div>

      {/* Fan carousel — full width so cards bleed off edges */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex items-center justify-center"
        style={{ height: 580 }}
      >
        {/* Prev arrow */}
        <button
          onClick={prev}
          className="absolute left-4 md:left-10 z-20 w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all text-2xl leading-none"
          aria-label="Previous"
        >
          ‹
        </button>

        {/* Cards */}
        {VIDEOS.map((vid, i) => {
          const offset = ((i - current + total) % total);
          const normalised = offset > total / 2 ? offset - total : offset;
          const style = OFFSETS[normalised] ?? null;
          if (!style) return null;

          const isCenter = normalised === 0;
          const isPlaying = playingIndex === i;

          return (
            <div
              key={vid.id + i}
              className="absolute rounded-2xl overflow-hidden shadow-card transition-all duration-500"
              style={{
                width: CARD_W,
                aspectRatio: "9/16",
                transform: `translateX(${style.x}px) scale(${style.scale})`,
                opacity: style.opacity,
                zIndex: style.z,
                filter: style.blur ? `blur(${style.blur}px)` : undefined,
                cursor: isCenter ? "default" : "pointer",
              }}
              onClick={() => !isCenter && goTo(i)}
            >
              {!isPlaying ? (
                <>
                  <img
                    src={driveThumbUrl(vid.id)}
                    alt={vid.title}
                    className="w-full h-full object-cover"
                  />
                  {isCenter && (
                    <>
                      {/* Play button */}
                      <button
                        onClick={() => setPlayingIndex(i)}
                        className="absolute inset-0 flex items-center justify-center group"
                        aria-label="Play video"
                      >
                        <span className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white/25 group-hover:scale-105 transition-all duration-200">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </button>
                      {/* Label overlay */}
                      <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                        <p className="text-[10px] font-body text-accent tracking-[0.2em] uppercase mb-1">
                          {vid.category}
                        </p>
                        <p className="text-white font-display font-bold text-lg leading-tight">
                          {vid.title}
                        </p>
                      </div>
                    </>
                  )}
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
          );
        })}

        {/* Next arrow */}
        <button
          onClick={next}
          className="absolute right-4 md:right-10 z-20 w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all text-2xl leading-none"
          aria-label="Next"
        >
          ›
        </button>
      </motion.div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-10">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              borderRadius: 999,
              background: i === current ? "var(--accent)" : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
