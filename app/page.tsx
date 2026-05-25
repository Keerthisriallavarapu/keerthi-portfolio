"use client";

import { useState, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";

// Three.js is heavy — load it client-only with a loading fallback
const Office = dynamic(() => import("@/components/office/Office"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});
const Desktop = dynamic(() => import("@/components/desktop/Desktop"), {
  ssr: false,
});

type Stage = "loading" | "office" | "transitioning" | "desktop";

export default function Home() {
  const [stage, setStage] = useState<Stage>("office");

  const handleEnterMonitor = useCallback(() => {
    setStage("transitioning");
    // Cinematic zoom into monitor — short enough not to annoy
    setTimeout(() => setStage("desktop"), 1500);
  }, []);

  const handleExitToOffice = useCallback(() => {
    setStage("office");
  }, []);

  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-ink-950">
      {/* Office (always mounted to preserve state) */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: stage === "desktop" ? 0 : 1,
          pointerEvents: stage === "desktop" ? "none" : "auto",
          zIndex: stage === "desktop" ? 0 : 10,
        }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <Office
            onEnterMonitor={handleEnterMonitor}
            isZooming={stage === "transitioning"}
          />
        </Suspense>
      </div>

      {/* White flash during transition */}
      <AnimatePresence>
        {stage === "transitioning" && (
          <motion.div
            className="absolute inset-0 bg-white pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.4] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, times: [0, 0.5, 1] }}
            style={{ zIndex: 20 }}
          />
        )}
      </AnimatePresence>

      {/* Desktop */}
      <AnimatePresence>
        {stage === "desktop" && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
            style={{ zIndex: 15 }}
          >
            <Desktop onExitToOffice={handleExitToOffice} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
