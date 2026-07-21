"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Animated particle field — 1500 floating particles */
export default function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors, count } = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random positions in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 8 + Math.random() * 6;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Mix of white and violet particles
      const isViolet = Math.random() > 0.7;
      colors[i * 3] = isViolet ? 0.55 : 0.9;
      colors[i * 3 + 1] = isViolet ? 0.36 : 0.9;
      colors[i * 3 + 2] = isViolet ? 0.96 : 0.95;
    }

    return { positions, colors, count };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    // Slow rotation
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x += delta * 0.01;

    // Drift particles upward
    const posArray = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += delta * 0.05;
      // Reset if too high
      if (posArray[i * 3 + 1] > 12) {
        posArray[i * 3 + 1] = -12;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
