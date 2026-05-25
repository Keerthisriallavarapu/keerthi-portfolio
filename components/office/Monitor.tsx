"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";

interface MonitorProps {
  onClick: () => void;
}

export default function Monitor({ onClick }: MonitorProps) {
  const screenRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (screenRef.current) {
      // Subtle pulsing emissive intensity to simulate active screen
      const t = state.clock.elapsedTime;
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.2 + Math.sin(t * 1.5) * 0.15 + (hovered ? 0.4 : 0);
    }

    if (glowRef.current && hovered) {
      const t = state.clock.elapsedTime;
      glowRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.04);
    }
  });

  return (
    <group position={[0, 1.6, -0.2]}>
      {/* Monitor stand */}
      <mesh position={[0, -0.55, 0.15]} castShadow>
        <boxGeometry args={[0.08, 0.4, 0.06]} />
        <meshStandardMaterial color="#1a1a1f" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, -0.75, 0.15]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.025, 32]} />
        <meshStandardMaterial color="#1a1a1f" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Monitor bezel */}
      <mesh castShadow position={[0, 0, -0.02]}>
        <boxGeometry args={[1.6, 0.95, 0.06]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Brand strip below */}
      <mesh position={[0, -0.45, 0.015]}>
        <boxGeometry args={[0.4, 0.04, 0.005]} />
        <meshStandardMaterial color="#1a1a25" roughness={0.5} />
      </mesh>

      {/* The screen — the glowing rectangle */}
      <mesh
        ref={screenRef}
        position={[0, 0, 0.015]}
        onClick={onClick}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        <planeGeometry args={[1.5, 0.85]} />
        <meshStandardMaterial
          color="#0a1a3e"
          emissive="#3b82f6"
          emissiveIntensity={1.2}
          roughness={0.1}
        />
      </mesh>

      {/* Screen content — fake terminal/code text */}
      <Text
        position={[-0.62, 0.32, 0.018]}
        fontSize={0.035}
        color="#5b8def"
        anchorX="left"
        anchorY="top"
      >
        {`$ welcome to keerthi.dev`}
      </Text>
      <Text
        position={[-0.62, 0.26, 0.018]}
        fontSize={0.03}
        color="#a8b8e0"
        anchorX="left"
        anchorY="top"
      >
        {`> initializing portfolio…`}
      </Text>
      <Text
        position={[-0.62, 0.20, 0.018]}
        fontSize={0.03}
        color="#a8b8e0"
        anchorX="left"
        anchorY="top"
      >
        {`> loaded 5 projects`}
      </Text>
      <Text
        position={[-0.62, 0.14, 0.018]}
        fontSize={0.03}
        color="#a8b8e0"
        anchorX="left"
        anchorY="top"
      >
        {`> AI assistant: ready`}
      </Text>
      <Text
        position={[0, -0.1, 0.018]}
        fontSize={0.07}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.002}
        outlineColor="#000"
      >
        click to enter
      </Text>
      <Text
        position={[0, -0.25, 0.018]}
        fontSize={0.04}
        color="#5b8def"
        anchorX="center"
        anchorY="middle"
      >
        keerthi.google
      </Text>

      {/* Outline / glow when hovered */}
      <mesh
        ref={glowRef}
        position={[0, 0, -0.05]}
      >
        <planeGeometry args={[1.7, 1.05]} />
        <meshBasicMaterial
          color="#5b8def"
          transparent
          opacity={hovered ? 0.4 : 0}
        />
      </mesh>

      {/* Cursor blinking line */}
      <BlinkingCursor />

      {/* Hover label */}
      {hovered && (
        <Text
          position={[0, 0.6, 0.1]}
          fontSize={0.06}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.003}
          outlineColor="#0a0a18"
        >
          → enter portfolio
        </Text>
      )}
    </group>
  );
}

function BlinkingCursor() {
  const cursorRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (cursorRef.current) {
      const t = state.clock.elapsedTime;
      cursorRef.current.visible = Math.sin(t * 4) > 0;
    }
  });

  return (
    <mesh ref={cursorRef} position={[-0.4, 0.08, 0.018]}>
      <planeGeometry args={[0.015, 0.04]} />
      <meshBasicMaterial color="#5b8def" />
    </mesh>
  );
}
