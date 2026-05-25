"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import OfficeScene from "./OfficeScene";
import CameraRig from "./CameraRig";

interface OfficeProps {
  onEnterMonitor: () => void;
  isZooming: boolean;
}

export default function Office({ onEnterMonitor, isZooming }: OfficeProps) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-ink-950 to-[#1a1530]">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 1.8, 6], fov: 50 }}
      >
        <Suspense fallback={null}>
          <CameraRig isZooming={isZooming} hasInteracted={hasInteracted} />

          <ambientLight intensity={0.25} color="#b8c4ff" />

          {/* Warm desk lamp light */}
          <pointLight
            position={[-1.8, 2.5, 1]}
            intensity={3}
            color="#ffd89b"
            distance={6}
            decay={2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {/* Cool monitor glow */}
          <pointLight
            position={[0, 1.5, 0.5]}
            intensity={2}
            color="#5b8def"
            distance={3.5}
            decay={2}
          />

          {/* Soft ceiling fill from window */}
          <directionalLight
            position={[5, 4, 2]}
            intensity={0.4}
            color="#a0c8ff"
          />

          <OfficeScene onMonitorClick={onEnterMonitor} />

          <Environment preset="apartment" background={false} />

          <fog attach="fog" args={["#0a0a18", 8, 20]} />

          {/* Manually controlled camera; OrbitControls disabled during zoom */}
          {!isZooming && (
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={3.5}
              maxDistance={9}
              minPolarAngle={Math.PI / 3.5}
              maxPolarAngle={Math.PI / 2.1}
              minAzimuthAngle={-Math.PI / 3}
              maxAzimuthAngle={Math.PI / 3}
              target={[0, 1.2, 0]}
              onStart={() => setHasInteracted(true)}
            />
          )}
        </Suspense>
      </Canvas>

      {/* UI overlays */}
      <AnimatePresence>
        {!isZooming && (
          <motion.div
            className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-light text-white/90 tracking-wide">
              Welcome to{" "}
              <span className="text-gradient font-medium">Keerthi's Office</span>
            </h1>
            <p className="text-white/50 text-sm mt-2 font-mono">
              click the monitor to enter
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHint && !isZooming && !hasInteracted && (
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40 text-xs font-mono pointer-events-none flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span>drag to look around · scroll to zoom</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isZooming && (
          <motion.button
            onClick={onEnterMonitor}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 right-8 px-5 py-2.5 glass text-white/80 hover:text-white text-sm font-mono rounded-full hover:bg-white/10 transition-all"
          >
            skip intro →
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
