"use client";

import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface CameraRigProps {
  isZooming: boolean;
  hasInteracted: boolean;
}

export default function CameraRig({ isZooming, hasInteracted }: CameraRigProps) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 1.8, 6));
  const targetLook = useRef(new THREE.Vector3(0, 1.2, 0));
  const startTime = useRef<number | null>(null);
  const initialPos = useRef(new THREE.Vector3());
  const initialQuat = useRef(new THREE.Quaternion());

  // Set initial camera position on mount; gentle entry animation
  useEffect(() => {
    camera.position.set(0, 3, 9);
    camera.lookAt(0, 1.2, 0);
  }, [camera]);

  useEffect(() => {
    if (isZooming) {
      startTime.current = performance.now();
      initialPos.current.copy(camera.position);
      initialQuat.current.copy(camera.quaternion);
    } else {
      startTime.current = null;
    }
  }, [isZooming, camera]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (isZooming && startTime.current !== null) {
      const elapsed = (performance.now() - startTime.current) / 1500; // 1.5s zoom
      const eased = easeInOutCubic(Math.min(elapsed, 1));

      // Target: just in front of monitor screen
      const monitorPos = new THREE.Vector3(0, 1.55, 0.45);
      camera.position.lerpVectors(initialPos.current, monitorPos, eased);

      // Look at center of monitor
      const lookTarget = new THREE.Vector3(0, 1.55, 0);
      const tmpCam = new THREE.Object3D();
      tmpCam.position.copy(camera.position);
      tmpCam.lookAt(lookTarget);
      camera.quaternion.slerpQuaternions(initialQuat.current, tmpCam.quaternion, eased);

      return;
    }

    // Subtle floating motion if user hasn't taken control
    if (!hasInteracted) {
      const ease = Math.min(t / 2, 1);
      const angle = Math.sin(t * 0.2) * 0.15;
      const targetX = Math.sin(angle) * 6;
      const targetZ = Math.cos(angle) * 6;
      const targetY = 1.8 + Math.sin(t * 0.3) * 0.1;

      // Gentle settle to default view
      const settleX = THREE.MathUtils.lerp(0, targetX, ease);
      const settleZ = THREE.MathUtils.lerp(9, targetZ, ease);
      const settleY = THREE.MathUtils.lerp(3, targetY, ease);

      camera.position.lerp(new THREE.Vector3(settleX, settleY, settleZ), 0.02);
      camera.lookAt(0, 1.2, 0);
    }
  });

  return null;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
