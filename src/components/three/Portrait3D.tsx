"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface Portrait3DProps {
  mouse: { x: number; y: number };
}

/** 3D floating portrait placeholder with parallax mouse-follow */
export default function Portrait3D({ mouse }: Portrait3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;

    // Normalize mouse to -1..1 range
    const mx = (mouse.x / window.innerWidth) * 2 - 1;
    const my = -(mouse.y / window.innerHeight) * 2 + 1;

    // Smooth parallax rotation toward mouse
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mx * 0.15,
      0.05
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      my * 0.1,
      0.05
    );

    // Glow ring follows
    if (ringRef.current) {
      ringRef.current.rotation.y = meshRef.current.rotation.y;
      ringRef.current.rotation.x = meshRef.current.rotation.x;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <group position={[1.5, 0, 0]}>
        {/* Portrait placeholder — gradient rectangle */}
        <mesh ref={meshRef}>
          <planeGeometry args={[2.2, 2.8]} />
          <meshStandardMaterial
            color="#1a1a2e"
            emissive="#8B5CF6"
            emissiveIntensity={0.08}
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>

        {/* Inner decorative element — silhouette hint */}
        <mesh position={[0, 0, 0.01]}>
          <circleGeometry args={[0.7, 32]} />
          <meshStandardMaterial
            color="#12121a"
            emissive="#A78BFA"
            emissiveIntensity={0.1}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Glowing border ring */}
        <mesh ref={ringRef} position={[0, 0, -0.02]}>
          <ringGeometry args={[1.45, 1.5, 64]} />
          <meshBasicMaterial
            color="#8B5CF6"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Outer glow ring */}
        <mesh position={[0, 0, -0.03]}>
          <ringGeometry args={[1.5, 1.7, 64]} />
          <meshBasicMaterial
            color="#8B5CF6"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}
