"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import ParticleField from "./ParticleField";
import FloatingLights from "./FloatingLights";
import Portrait3D from "./Portrait3D";

interface HeroSceneProps {
  mouse: { x: number; y: number };
}

/** Main 3D canvas for the hero section */
export default function HeroScene({ mouse }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      {/* Fog for depth */}
      <fog attach="fog" args={["#0a0a0f", 5, 18]} />

      {/* Ambient light */}
      <ambientLight intensity={0.15} />

      <Suspense fallback={null}>
        <ParticleField />
        <FloatingLights />
        <Portrait3D mouse={mouse} />
      </Suspense>
    </Canvas>
  );
}
