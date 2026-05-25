"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Monitor from "./Monitor";
import Desk from "./Desk";
import Chair from "./Chair";
import Lamp from "./Lamp";
import Plant from "./Plant";
import Bookshelf from "./Bookshelf";
import Window from "./Window";
import Particles from "./Particles";

interface OfficeSceneProps {
  onMonitorClick: () => void;
}

export default function OfficeScene({ onMonitorClick }: OfficeSceneProps) {
  return (
    <group>
      {/* Floor — warm wooden tone */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#2a1f1a"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Subtle floor pattern lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh
          key={`floor-line-${i}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.001, -5 + i * 1.1]}
        >
          <planeGeometry args={[20, 0.02]} />
          <meshBasicMaterial color="#1a0f0a" transparent opacity={0.5} />
        </mesh>
      ))}

      {/* Back wall */}
      <mesh receiveShadow position={[0, 3, -3]}>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color="#1f1a2e" roughness={0.95} metalness={0} />
      </mesh>

      {/* Side walls */}
      <mesh receiveShadow rotation={[0, Math.PI / 2, 0]} position={[-8, 3, 0]}>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#15101f" roughness={0.95} />
      </mesh>
      <mesh receiveShadow rotation={[0, -Math.PI / 2, 0]} position={[8, 3, 0]}>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#15101f" roughness={0.95} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0a0814" roughness={1} />
      </mesh>

      {/* Desk */}
      <Desk />

      {/* Monitor — the focal point */}
      <Monitor onClick={onMonitorClick} />

      {/* Chair */}
      <Chair />

      {/* Desk lamp */}
      <Lamp />

      {/* Plant in corner */}
      <Plant position={[-3.5, 0, -1.5]} />
      <Plant position={[3.2, 0, -1.8]} scale={0.85} />

      {/* Bookshelf on side wall */}
      <Bookshelf />

      {/* Window with city skyline glow */}
      <Window />

      {/* Coffee mug on desk */}
      <CoffeeMug />

      {/* Notebook on desk */}
      <Notebook />

      {/* Keyboard */}
      <Keyboard />

      {/* Mouse */}
      <Mouse />

      {/* Floating particles for atmosphere */}
      <Particles />

      {/* Picture frame on wall */}
      <PictureFrame />
    </group>
  );
}

function CoffeeMug() {
  return (
    <group position={[0.8, 1.05, 0.3]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.07, 0.14, 32]} />
        <meshStandardMaterial color="#f5f5f0" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.1, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.04, 0.012, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#f5f5f0" roughness={0.4} />
      </mesh>
      {/* Coffee surface */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.005, 32]} />
        <meshStandardMaterial color="#3d2817" roughness={0.3} />
      </mesh>
      {/* Steam (subtle) */}
      <mesh position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.04} />
      </mesh>
    </group>
  );
}

function Notebook() {
  return (
    <group position={[-0.9, 1.005, 0.4]} rotation={[0, 0.3, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.3, 0.015, 0.4]} />
        <meshStandardMaterial color="#1a3050" roughness={0.6} />
      </mesh>
      {/* Spine accent */}
      <mesh position={[-0.155, 0, 0]}>
        <boxGeometry args={[0.005, 0.018, 0.4]} />
        <meshStandardMaterial color="#0a1a30" />
      </mesh>
    </group>
  );
}

function Keyboard() {
  return (
    <group position={[0, 1.005, 0.6]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.85, 0.025, 0.25]} />
        <meshStandardMaterial color="#1a1a1f" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Subtle key rows hint */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 14 }).map((_, col) => (
          <mesh
            key={`key-${row}-${col}`}
            position={[
              -0.39 + col * 0.06,
              1.018 + 0.003,
              0.51 + row * 0.045,
            ]}
          >
            <boxGeometry args={[0.05, 0.005, 0.035]} />
            <meshStandardMaterial color="#2a2a30" roughness={0.5} />
          </mesh>
        ))
      )}
    </group>
  );
}

function Mouse() {
  return (
    <group position={[0.6, 1.015, 0.65]}>
      <mesh castShadow>
        <boxGeometry args={[0.06, 0.025, 0.1]} />
        <meshStandardMaterial color="#1a1a1f" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  );
}

function PictureFrame() {
  return (
    <group position={[-2.2, 3.2, -2.95]}>
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.6, 0.04]} />
        <meshStandardMaterial color="#2a2030" roughness={0.7} />
      </mesh>
      {/* "Image" — abstract gradient */}
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[0.82, 0.52]} />
        <meshBasicMaterial color="#5b8def" />
      </mesh>
      <mesh position={[0, -0.1, 0.026]}>
        <planeGeometry args={[0.82, 0.32]} />
        <meshBasicMaterial color="#c084fc" />
      </mesh>
      <mesh position={[0, -0.2, 0.027]}>
        <planeGeometry args={[0.82, 0.12]} />
        <meshBasicMaterial color="#f472b6" />
      </mesh>
    </group>
  );
}
