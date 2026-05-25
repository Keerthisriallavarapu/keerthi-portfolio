"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface PlantProps {
  position?: [number, number, number];
  scale?: number;
}

export default function Plant({ position = [0, 0, 0], scale = 1 }: PlantProps) {
  // Generate leaves once with deterministic randomness
  const leaves = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2 + Math.random() * 0.3;
      const radius = 0.15 + Math.random() * 0.35;
      const height = 0.6 + Math.random() * 0.7;
      const tilt = Math.random() * 0.6 - 0.3;
      const size = 0.25 + Math.random() * 0.2;
      arr.push({ angle, radius, height, tilt, size, key: i });
    }
    return arr;
  }, []);

  return (
    <group position={position} scale={scale}>
      {/* Pot */}
      <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.28, 0.22, 0.4, 32]} />
        <meshStandardMaterial color="#3a2520" roughness={0.8} />
      </mesh>

      {/* Pot rim */}
      <mesh position={[0, 0.4, 0]}>
        <torusGeometry args={[0.28, 0.02, 8, 32]} />
        <meshStandardMaterial color="#4a3025" roughness={0.7} />
      </mesh>

      {/* Soil */}
      <mesh position={[0, 0.39, 0]}>
        <cylinderGeometry args={[0.27, 0.27, 0.02, 32]} />
        <meshStandardMaterial color="#1a0e08" roughness={1} />
      </mesh>

      {/* Stem */}
      <mesh castShadow position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.015, 0.025, 0.4, 8]} />
        <meshStandardMaterial color="#2a3a1a" roughness={0.9} />
      </mesh>

      {/* Leaves */}
      {leaves.map((leaf) => (
        <mesh
          key={leaf.key}
          castShadow
          position={[
            Math.cos(leaf.angle) * leaf.radius,
            leaf.height,
            Math.sin(leaf.angle) * leaf.radius,
          ]}
          rotation={[leaf.tilt, leaf.angle, 0]}
        >
          <coneGeometry args={[leaf.size * 0.4, leaf.size, 5]} />
          <meshStandardMaterial
            color="#2d5a2d"
            roughness={0.7}
            metalness={0}
            side={2}
          />
        </mesh>
      ))}
    </group>
  );
}
