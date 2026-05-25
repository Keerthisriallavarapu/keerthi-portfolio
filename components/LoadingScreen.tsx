"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="absolute inset-0 bg-ink-950 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="text-5xl font-light text-shimmer tracking-wider">
          keerthi
        </div>
        <div className="flex items-center gap-2 text-white/40 text-sm font-mono">
          <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
          <span>loading workspace…</span>
        </div>
        <div className="w-48 h-px bg-white/10 mt-4 overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-500 to-purple-400"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
