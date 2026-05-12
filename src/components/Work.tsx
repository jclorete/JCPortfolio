"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { projectCategories, categoryChips } from "@/content/projects";

const driveThumbUrl = (id: string) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
const drivePreviewUrl = (id: string) =>
  `https://drive.google.com/file/d/${id}/preview`;

const CARD_W_PORTRAIT  = 280;
const CARD_W_LANDSCAPE = 420;
const SPREAD_PORTRAIT  = 290;
const SPREAD_LANDSCAPE = 440;

const OFFSETS = [
  { x: -1.75, scale: 0.60, opacity: 0.2, z: 1, blur: 4 },
  { x: -1,    scale: 0.82, opacity: 0.55, z: 5, blur: 0 },
  { x: 0,     scale: 1,    opacity: 1,    z: 10, blur: 0 },
  { x: 1,     scale: 0.82, opacity: 0.55, z: 5, blur: 0 },
  { x: 1.75,  scale: 0.60, opacity: 0.2, z: 1, blur: 4 },
];

function CategoryCarousel({ categoryKey }: { categoryKey: string }) {
  const cat = categoryKey === "All"
    ? projectCategories["ads"]
    : Object.values(projectCategories).find((c) => c.label === categoryKey)
      ?? projectCategories["ads"];

  const videos = cat.items;
  const isPortrait  = cat.aspect === "9:16";
  const isLandscape = cat.aspect === "16:9";
  const cardW  = isPortrait ? CARD_W_PORTRAIT : CARD_W_LANDSCAPE;
  const spread = isPortrait ? SPREAD_PORTRAIT : SPREAD_LANDSCAPE;
  const aspectRatio = cat.aspect === "9:16" ? "9/16"
    : cat.aspect === "16:9" ? "16/9"
    : cat.aspect === "1:1"  ? "1/1"
    : "4/5";
  const cardH = isPortrait ? 500 : isLandscape ? 240 : 300;

  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState<number | null>(null);
  const total = videos.length;

  const prev = useCallback(() => { setPlaying(null); setCurrent((c) => (c - 1 + total) % total); }, [total]);
  const next = useCallback(() => { setPlaying(null); setCurrent((c) => (c + 1) % total); }, [total]);
  const goTo = useCallback((i: number) => { setPlaying(null); setCurrent(i); }, []);

  // Reset on category change
  useEffect(() => { setCurrent(0); setPlaying(null); }, [categoryKey]);

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-white/50 dark:text-white/50 font-body text-base">
          More work coming soon — email for full samples.
        </p>
        <a href="mailto:jclorete09@gmail.com" className="mt-4 text-sm text-accent hover:underline font-body">
          jclorete09@gmail.com
        </a>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Carousel */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: cardH + 80 }}
      >
        <button
          onClick={prev}
          className="absolute left-4 md:left-10 z-20 w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all text-2xl leading-none"
          aria-label="Previous"
        >‹</button>

        {videos.map((vid, i) => {
          const raw    = ((i - current + total) % total);
          const offset = raw > total / 2 ? raw - total : raw;
          if (Math.abs(offset) > 2) return null;
          const o = OFFSETS[offset + 2];

          return (
            <div
              key={vid.id}
              className="absolute rounded-2xl overflow-hidden shadow-card transition-all duration-500"
              style={{
                width: cardW,
                aspectRatio,
                transform: `translateX(${o.x * spread}px) scale(${o.scale})`,
                opacity: o.opacity,
                zIndex: o.z,
                filter: o.blur ? `blur(${o.blur}px)` : undefined,
                cursor: offset !== 0 ? "pointer" : "default",
              }}
              onClick={() => offset !== 0 && goTo(i)}
            >
              {playing !== i ? (
                <>
                  <img
                    src={driveThumbUrl(vid.drive_id)}
                    alt={vid.title}
                    className="w-full h-full object-cover"
                  />
                  {offset === 0 && (
                    <>
                      <button
                        onClick={() => setPlaying(i)}
                        className="absolute inset-0 flex items-center justify-center group"
                        aria-label="Play video"
                      >
                        <span className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white/25 group-hover:scale-105 transition-all duration-200">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                        <p className="text-[10px] font-body text-accent tracking-[0.2em] uppercase mb-1">{cat.label}</p>
                        <p className="text-white font-display font-bold text-lg leading-tight">{vid.title}</p>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <iframe
                  src={drivePreviewUrl(vid.drive_id)}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-full border-0"
                  title={vid.title}
                />
              )}
            </div>
          );
        })}

        <button
          onClick={next}
          className="absolute right-4 md:right-10 z-20 w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all text-2xl leading-none"
          aria-label="Next"
        >›</button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              borderRadius: 999,
              background: i === current ? "var(--accent)" : "rgba(128,128,128,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Work() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <section id="work" className="section-divider py-24 md:py-32 overflow-hidden" aria-label="Selected work">
      <div className="max-w-layout mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <motion.p variants={fadeUp} className="text-eyebrow mb-4">
            Selected work
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-heading text-white mb-8">
            Creative work that delivers.
          </motion.h2>

          {/* Category tabs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {categoryChips.map((chip) => (
              <button
                key={chip}
                onClick={() => setActiveCategory(chip)}
                className="px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200"
                style={{
                  background: activeCategory === chip ? "var(--accent)" : "rgba(128,128,128,0.12)",
                  color: activeCategory === chip ? "#fff" : "var(--text-primary)",
                  border: activeCategory === chip ? "none" : "1px solid rgba(128,128,128,0.2)",
                }}
              >
                {chip}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Carousel — full width bleed */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <CategoryCarousel categoryKey={activeCategory} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
