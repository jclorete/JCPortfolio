"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampEffect = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-x-0 top-0 flex w-full flex-col items-center justify-start overflow-hidden pointer-events-none z-0",
        className
      )}
      style={{ height: "420px" }}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-start justify-center isolate">
        {/* Left beam */}
        <motion.div
          initial={{ opacity: 0.3, width: "10rem" }}
          animate={{ opacity: 1, width: "28rem" }}
          transition={{ delay: 0.2, duration: 1, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-48 w-[28rem] overflow-visible
            bg-gradient-conic from-[#E07A2F] via-transparent to-transparent
            [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-full left-0 h-36 bottom-0 z-20"
            style={{ background: "linear-gradient(to top, var(--bg), transparent)" }} />
          <div className="absolute w-36 h-full left-0 bottom-0 z-20"
            style={{ background: "linear-gradient(to right, var(--bg), transparent)" }} />
        </motion.div>

        {/* Right beam */}
        <motion.div
          initial={{ opacity: 0.3, width: "10rem" }}
          animate={{ opacity: 1, width: "28rem" }}
          transition={{ delay: 0.2, duration: 1, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-48 w-[28rem] overflow-visible
            bg-gradient-conic from-transparent via-transparent to-[#E07A2F]
            [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-36 h-full right-0 bottom-0 z-20"
            style={{ background: "linear-gradient(to left, var(--bg), transparent)" }} />
          <div className="absolute w-full right-0 h-36 bottom-0 z-20"
            style={{ background: "linear-gradient(to top, var(--bg), transparent)" }} />
        </motion.div>

        {/* Dark bleed at base */}
        <div className="absolute top-1/2 h-40 w-full translate-y-8 scale-x-150"
          style={{ background: "var(--bg)", filter: "blur(24px)" }} />

        {/* Large glow orb */}
        <div className="absolute inset-auto z-50 h-32 w-[26rem] -translate-y-1/2 rounded-full opacity-40"
          style={{ background: "#E07A2F", filter: "blur(40px)" }} />

        {/* Tight glow */}
        <motion.div
          initial={{ width: "6rem" }}
          animate={{ width: "14rem" }}
          transition={{ delay: 0.2, duration: 1, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-32 -translate-y-20 rounded-full"
          style={{ background: "#F08C42", filter: "blur(20px)" }}
        />

        {/* Horizontal light line */}
        <motion.div
          initial={{ width: "12rem" }}
          animate={{ width: "28rem" }}
          transition={{ delay: 0.2, duration: 1, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-px -translate-y-24"
          style={{ background: "#F59C52", boxShadow: "0 0 12px 2px #E07A2F" }}
        />

        {/* Bottom dark cover */}
        <div className="absolute inset-auto z-40 h-40 w-full -translate-y-48"
          style={{ background: "var(--bg)" }} />
      </div>
    </div>
  );
};
