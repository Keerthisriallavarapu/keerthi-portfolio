"use client";

import { useMemo } from "react";

export default function Window() {
  // Procedural city skyline
  const buildings = useMemo(() => {
    const arr = [];
    let x = -2;
    while (x < 2) {
      const width = 0.15 + Math.random() * 0.3;
      const height = 0.5 + Math.random() * 1.4;
      const color = Math.random() > 0.5 ? "#0a0e2a" : "#0d1230";
      arr.push({ x: x + width / 2, width, height, color, key: x });
      x += width + 0.02;
    }
    return arr;
  }, []);

  // Window lights in buildings
  const lights = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 60; i++) {
      arr.push({
        x: -2 + Math.random() * 4,
        y: 0.3 + Math.random() * 1.4,
        on: Math.random() > 0.3,
        color: Math.random() > 0.7 ? "#5b8def" : "#ffd89b",
        key: i,
      });
    }
    return arr;
  }, []);

  return (
    <group position={[5.95, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Window frame */}
      <mesh>
        <boxGeometry args={[3, 2, 0.08]} />
        <meshStandardMaterial color="#1a1a25" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Glass — emissive for night-time glow */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[2.85, 1.85]} />
        <meshStandardMaterial
          color="#0a0e2a"
          emissive="#1a2a4a"
          emissiveIntensity={0.5}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Sky gradient (top portion) */}
      <mesh position={[0, 0.6, 0.046]}>
        <planeGeometry args={[2.85, 0.7]} />
        <meshBasicMaterial color="#1a1530" transparent opacity={0.6} />
      </mesh>

      {/* Moon */}
      <mesh position={[0.8, 0.7, 0.047]}>
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial color="#f5f0e0" />
      </mesh>

      {/* City skyline silhouette */}
      {buildings.map((b) => (
        <mesh
          key={b.key}
          position={[b.x, -0.5 + b.height / 2, 0.047]}
        >
          <planeGeometry args={[b.width, b.height]} />
          <meshBasicMaterial color={b.color} />
        </mesh>
      ))}

      {/* Window lights */}
      {lights.filter((l) => l.on).map((l) => (
        <mesh key={l.key} position={[l.x, l.y - 0.4, 0.048]}>
          <planeGeometry args={[0.015, 0.025]} />
          <meshBasicMaterial color={l.color} />
        </mesh>
      ))}

      {/* Window dividers (cross pattern) */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[2.85, 0.02, 0.005]} />
        <meshStandardMaterial color="#1a1a25" />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.02, 1.85, 0.005]} />
        <meshStandardMaterial color="#1a1a25" />
      </mesh>

      {/* Window sill */}
      <mesh position={[0, -1.05, 0.1]}>
        <boxGeometry args={[3.1, 0.06, 0.2]} />
        <meshStandardMaterial color="#3d2818" roughness={0.6} />
      </mesh>
    </group>
  );
}
