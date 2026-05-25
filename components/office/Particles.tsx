"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = Math.random() * 5 + 0.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const positions = (meshRef.current.geometry.attributes.position as THREE.BufferAttribute);
      const t = state.clock.elapsedTime;
      for (let i = 0; i < count; i++) {
        const y = positions.getY(i) + 0.002;
        positions.setY(i, y > 5.5 ? 0.5 : y);

        const x = positions.getX(i) + Math.sin(t + i) * 0.001;
        positions.setX(i, x);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffd89b"
        size={0.02}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
