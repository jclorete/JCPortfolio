"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { ThemeSwitch } from "@/components/ui/theme-switch-button";

const navItems = ["About", "Work", "Services", "Experience", "Contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-layout mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          aria-label="Jaycie — home"
        >
          <div
            className="relative flex-shrink-0 rounded-full flex items-center justify-center"
            style={{ width: 48, height: 48 }}
          >
            <div className="relative w-9 h-9">
              <Image
                src="/assets/logo-icon.png"
                alt="JC logo mark"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <span
            style={{
              fontFamily: "Tahoma, 'Trebuchet MS', Arial, sans-serif",
              fontWeight: "bold",
              fontSize: "19px",
              color: "var(--text-primary)",
              letterSpacing: "0.01em",
            }}
          >
            Jay<span style={{ color: "#E07A2F" }}>Cie</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-sm font-body font-medium text-white/60 hover:text-white transition-colors group"
            >
              {item}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </nav>

        {/* CTA + Theme toggle */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex items-center gap-3"
        >
          <ThemeSwitch />
          <Button
            href="mailto:jclorete09@gmail.com"
            variant="primary"
            className="text-sm py-2 px-5"
          >
            Get in touch
          </Button>
        </motion.div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeSwitch />
          <button
            className="flex flex-col gap-1.5 p-2 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -12, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-surface1 border-t border-white/5 px-6 py-4 flex flex-col gap-4 overflow-hidden"
            aria-label="Mobile navigation"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-base font-body font-medium text-white/70 hover:text-white transition-colors py-1"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <Button
                href="mailto:jclorete09@gmail.com"
                variant="primary"
                className="mt-2 w-full justify-center"
              >
                Get in touch
              </Button>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
