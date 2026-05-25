"use client";

import { useMemo } from "react";

export default function Bookshelf() {
  // Generate books with varied colors and heights
  const books = useMemo(() => {
    const bookColors = [
      "#3d4f7a", "#7a3d3d", "#3d7a4f", "#7a5a3d",
      "#5a3d7a", "#3d7a7a", "#7a3d6a", "#4f3d7a",
      "#7a6a3d", "#3d5a7a",
    ];
    const arr = [];
    let x = -0.95;
    for (let i = 0; i < 18; i++) {
      const width = 0.06 + Math.random() * 0.04;
      const height = 0.5 + Math.random() * 0.25;
      arr.push({
        x: x + width / 2,
        width,
        height,
        color: bookColors[i % bookColors.length],
        tilt: Math.random() > 0.85 ? 0.15 : 0,
        key: i,
      });
      x += width + 0.005;
    }
    return arr;
  }, []);

  return (
    <group position={[-4.5, 0, -1]} rotation={[0, Math.PI / 2.5, 0]}>
      {/* Shelf back panel */}
      <mesh receiveShadow position={[0, 2, -0.18]}>
        <boxGeometry args={[2, 4, 0.02]} />
        <meshStandardMaterial color="#2a1f1a" roughness={0.8} />
      </mesh>

      {/* Shelves */}
      {[0.5, 1.3, 2.1, 2.9, 3.7].map((y, i) => (
        <mesh key={`shelf-${i}`} receiveShadow castShadow position={[0, y, 0]}>
          <boxGeometry args={[2, 0.04, 0.35]} />
          <meshStandardMaterial color="#3d2818" roughness={0.7} />
        </mesh>
      ))}

      {/* Side panels */}
      <mesh castShadow position={[-1, 2, 0]}>
        <boxGeometry args={[0.04, 4, 0.4]} />
        <meshStandardMaterial color="#2a1f1a" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[1, 2, 0]}>
        <boxGeometry args={[0.04, 4, 0.4]} />
        <meshStandardMaterial color="#2a1f1a" roughness={0.8} />
      </mesh>

      {/* Books on shelves */}
      {[1.7, 2.5, 3.3].map((y, shelfIdx) =>
        books.slice(shelfIdx * 6, shelfIdx * 6 + 6).map((book) => (
          <group key={`shelf-${shelfIdx}-book-${book.key}`}>
            <mesh
              castShadow
              position={[book.x, y + book.height / 2, 0]}
              rotation={[0, 0, book.tilt]}
            >
              <boxGeometry args={[book.width, book.height, 0.18]} />
              <meshStandardMaterial color={book.color} roughness={0.6} />
            </mesh>
          </group>
        ))
      )}

      {/* A small plant on top shelf */}
      <group position={[0.6, 4, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.07, 0.06, 0.1, 16]} />
          <meshStandardMaterial color="#5a3a25" />
        </mesh>
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <mesh
              key={`tiny-plant-${i}`}
              position={[Math.cos(angle) * 0.05, 0.15, Math.sin(angle) * 0.05]}
              rotation={[0.3, angle, 0]}
            >
              <coneGeometry args={[0.03, 0.12, 4]} />
              <meshStandardMaterial color="#3a6a3a" />
            </mesh>
          );
        })}
      </group>

      {/* Decorative object on second shelf */}
      <mesh castShadow position={[0.7, 1.55, 0]}>
        <boxGeometry args={[0.15, 0.2, 0.15]} />
        <meshStandardMaterial color="#5b8def" emissive="#5b8def" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}
