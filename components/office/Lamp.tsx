"use client";

export default function Lamp() {
  return (
    <group position={[-1.0, 1.005, 0]}>
      {/* Base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.12, 0.14, 0.025, 32]} />
        <meshStandardMaterial color="#2a2a30" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Vertical arm */}
      <mesh castShadow position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.6, 16]} />
        <meshStandardMaterial color="#2a2a30" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Joint */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial color="#1a1a25" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Angled arm */}
      <mesh castShadow position={[0.15, 0.7, 0.15]} rotation={[0.4, 0.6, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.4, 16]} />
        <meshStandardMaterial color="#2a2a30" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Lamp head */}
      <mesh castShadow position={[0.32, 0.85, 0.3]} rotation={[0.5, 0.4, 0]}>
        <coneGeometry args={[0.1, 0.18, 32, 1, true]} />
        <meshStandardMaterial
          color="#2a2a30"
          metalness={0.7}
          roughness={0.3}
          side={2}
          emissive="#ffd89b"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Inner glow of lamp */}
      <mesh position={[0.32, 0.78, 0.32]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#ffd89b" />
      </mesh>
    </group>
  );
}
