"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Search } from "lucide-react";

interface SearchHeroProps {
  onAskClick: () => void;
}

const SUGGESTED_QUERIES = [
  "Tell me about your inference optimization work",
  "How do you handle production ML at scale?",
  "What's your strongest technical achievement?",
  "Walk me through AgentForge",
];

export default function SearchHero({ onAskClick }: SearchHeroProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl flex flex-col items-center"
      >
        {/* Logo */}
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", damping: 12 }}
          className="text-7xl md:text-8xl font-light tracking-tight mb-2 select-none"
        >
          <span className="text-[#5b8def]">k</span>
          <span className="text-[#ea4335]">e</span>
          <span className="text-[#fbbc04]">e</span>
          <span className="text-[#5b8def]">r</span>
          <span className="text-[#34a853]">t</span>
          <span className="text-[#ea4335]">h</span>
          <span className="text-[#fbbc04]">i</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 text-sm mb-10 font-mono"
        >
          senior ml infrastructure engineer · ask me anything
        </motion.p>

        {/* The "search" bar — opens chat */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`relative w-full transition-all ${
            focused ? "scale-[1.01]" : "scale-100"
          }`}
        >
          <button
            onClick={onAskClick}
            onMouseEnter={() => setFocused(true)}
            onMouseLeave={() => setFocused(false)}
            className="w-full bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg shadow-sm rounded-full pl-14 pr-32 py-4 text-left text-gray-400 transition-all flex items-center group"
          >
            <Search className="absolute left-5 w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            <span className="text-base">Ask me about my work...</span>
            <span className="absolute right-3 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-accent-500 to-purple-500 text-white text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              ask AI
            </span>
          </button>
        </motion.div>

        {/* Suggested queries */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-xs text-gray-400 font-mono mr-2">try:</span>
          {SUGGESTED_QUERIES.map((q, i) => (
            <button
              key={i}
              onClick={onAskClick}
              className="text-xs px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              {q}
            </button>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-16 grid grid-cols-3 gap-8 md:gap-16"
        >
          <Stat number="5+" label="years experience" />
          <Stat number="2B+" label="inference requests/mo" />
          <Stat number="5" label="open-source projects" />
        </motion.div>
      </motion.div>

      {/* Down arrow hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.6 },
          y: { delay: 1.5, repeat: Infinity, duration: 1.8 },
        }}
        className="mt-12 text-gray-400 text-xs font-mono flex items-center gap-2"
      >
        scroll for projects
        <span className="text-base">↓</span>
      </motion.div>
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl md:text-3xl font-light text-gray-900">{number}</div>
      <div className="text-xs text-gray-500 font-mono mt-1">{label}</div>
    </div>
  );
}
