"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** 4 orbiting light orbs with emissive glow spheres */
export default function FloatingLights() {
  const group = useRef<THREE.Group>(null);

  const lights = [
    { color: "#8B5CF6", speed: 0.3, radius: 4, offset: 0, y: 1 },
    { color: "#3B82F6", speed: 0.2, radius: 5, offset: Math.PI / 2, y: -0.5 },
    { color: "#7C3AED", speed: 0.25, radius: 3.5, offset: Math.PI, y: 0.5 },
    { color: "#ffffff", speed: 0.15, radius: 4.5, offset: Math.PI * 1.5, y: -1 },
  ];

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();

    group.current.children.forEach((child, i) => {
      const light = lights[i];
      const angle = t * light.speed + light.offset;
      child.position.x = Math.cos(angle) * light.radius;
      child.position.z = Math.sin(angle) * light.radius;
      child.position.y = light.y + Math.sin(t * 0.5 + i) * 0.5;
    });
  });

  return (
    <group ref={group}>
      {lights.map((light, i) => (
        <group key={i}>
          <pointLight
            color={light.color}
            intensity={0.8}
            distance={8}
            decay={2}
          />
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial
              color={light.color}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
