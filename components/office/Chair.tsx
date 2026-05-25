"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Chair() {
  const chairRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (chairRef.current) {
      // Very subtle idle rotation as if just left
      chairRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.04 + 0.1;
    }
  });

  return (
    <group ref={chairRef} position={[0, 0, 1.4]}>
      {/* Seat */}
      <mesh castShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[0.55, 0.08, 0.5]} />
        <meshStandardMaterial color="#1a1a25" roughness={0.6} />
      </mesh>

      {/* Backrest */}
      <mesh castShadow position={[0, 0.95, -0.22]}>
        <boxGeometry args={[0.5, 0.7, 0.06]} />
        <meshStandardMaterial color="#1a1a25" roughness={0.6} />
      </mesh>

      {/* Backrest curve hint - thinner top section */}
      <mesh castShadow position={[0, 1.25, -0.2]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[0.48, 0.18, 0.05]} />
        <meshStandardMaterial color="#1a1a25" roughness={0.6} />
      </mesh>

      {/* Armrests */}
      <mesh castShadow position={[-0.28, 0.7, 0]}>
        <boxGeometry args={[0.04, 0.3, 0.4]} />
        <meshStandardMaterial color="#2a2a35" roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0.28, 0.7, 0]}>
        <boxGeometry args={[0.04, 0.3, 0.4]} />
        <meshStandardMaterial color="#2a2a35" roughness={0.5} />
      </mesh>

      {/* Central pillar */}
      <mesh castShadow position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 16]} />
        <meshStandardMaterial color="#3a3a45" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Base star */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <group key={i} rotation={[0, angle, 0]}>
            <mesh castShadow position={[0, 0.08, 0.25]}>
              <boxGeometry args={[0.04, 0.04, 0.4]} />
              <meshStandardMaterial color="#2a2a35" metalness={0.6} roughness={0.4} />
            </mesh>
            {/* Wheel */}
            <mesh castShadow position={[0, 0.04, 0.4]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshStandardMaterial color="#1a1a20" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
