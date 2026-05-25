"use client";

export default function Desk() {
  return (
    <group>
      {/* Desk top — warm wood */}
      <mesh receiveShadow castShadow position={[0, 0.99, 0.3]}>
        <boxGeometry args={[2.6, 0.04, 1.1]} />
        <meshStandardMaterial color="#3d2818" roughness={0.6} metalness={0.05} />
      </mesh>

      {/* Desk edge highlight */}
      <mesh position={[0, 1.005, 0.3]}>
        <boxGeometry args={[2.61, 0.001, 1.11]} />
        <meshBasicMaterial color="#5d3828" transparent opacity={0.3} />
      </mesh>

      {/* Left leg */}
      <mesh castShadow position={[-1.2, 0.5, 0.3]}>
        <boxGeometry args={[0.05, 1, 1.05]} />
        <meshStandardMaterial color="#2a1a10" roughness={0.7} />
      </mesh>

      {/* Right leg */}
      <mesh castShadow position={[1.2, 0.5, 0.3]}>
        <boxGeometry args={[0.05, 1, 1.05]} />
        <meshStandardMaterial color="#2a1a10" roughness={0.7} />
      </mesh>

      {/* Drawer */}
      <mesh castShadow position={[0.9, 0.7, 0.3]}>
        <boxGeometry args={[0.55, 0.5, 1.0]} />
        <meshStandardMaterial color="#322015" roughness={0.65} />
      </mesh>

      {/* Drawer handles */}
      <mesh position={[0.9, 0.85, 0.81]}>
        <boxGeometry args={[0.15, 0.02, 0.02]} />
        <meshStandardMaterial color="#5a4030" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.9, 0.6, 0.81]}>
        <boxGeometry args={[0.15, 0.02, 0.02]} />
        <meshStandardMaterial color="#5a4030" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}
