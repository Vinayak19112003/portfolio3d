import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- Native Warp Tunnel (No Post-Processing) ---
const WarpTunnel = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 1200; // Reduced for Mobile Performance

  // Responsive Tunnel Logic
  // Reduced radius in generation loop (5-25) handles mobile better than huge 10-50 range
  // const { viewport } = useThree(); // Not strictly needed if we use safe fixed bounds

  // Generate particles in a tube/tunnel
  const [dummy] = useState(() => new THREE.Object3D());
  const [positions, speeds] = useMemo(() => {
    const pos = [];
    const spd = [];
    for (let i = 0; i < count; i++) {
      // Dynamic radius based on viewport isn't easy in useMemo (runs once).
      // Instead, we'll use a normalized radius here and scale it in useFrame or just pick a "Safe" mobile radius.
      // Better: Use a fixed small radius that works for both, or standard "normalized" coordinates.
      // Let's stick to a slightly smaller fixed radius but narrower distribution.

      const r = 5 + Math.random() * 20; // Reduced radius (was 10-50). Now 5-25. fits mobile better.
      const theta = Math.random() * Math.PI * 2;
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      const z = (Math.random() - 0.5) * 200;

      pos.push(new THREE.Vector3(x, y, z));
      spd.push(Math.random() + 0.2);
    }
    return [pos, spd];
  }, []);

  useFrame((state) => {
    const scrollY = window.scrollY;
    // Warp factor: 1 (normal) to 5 (hyperspace)
    const warpFactor = 1 + (scrollY * 0.005);

    if (meshRef.current) {
      // Rotate tunnel
      meshRef.current.rotation.z -= 0.001 * warpFactor;

      // Update instances
      for (let i = 0; i < count; i++) {
        const t = state.clock.getElapsedTime();
        // Move stars towards camera (+z)
        const zPos = (positions[i].z + (t * speeds[i] * 10 * warpFactor)) % 200 - 100;

        // Stretch logic: Scale Z based on warpFactor
        dummy.position.set(positions[i].x, positions[i].y, zPos);
        dummy.rotation.x = Math.PI / 2; // Orient along Z

        // Stretch length with speed
        const scaleZ = Math.max(1, warpFactor * 5 * speeds[i]);
        dummy.scale.set(1, scaleZ, 1);

        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* Thinner, longer cylinders for laser look */}
      <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
      <meshBasicMaterial
        color="#818cf8" // Indigo/Violet glow
        toneMapped={false}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending} // NATIVE GLOW EFFECT
      />
    </instancedMesh>
  );
}

export const Background: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-[100dvh] z-0 pointer-events-none">
      {/* Darker background for contrast */}
      <div className="absolute inset-0 bg-black" />

      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: false }}>
        {/* Native Fog for depth fading - prevents pop-in/out */}
        <fogExp2 attach="fog" args={['#000000', 0.02]} />

        <WarpTunnel />

        {/* No Post Processing - Pure Geometry */}
      </Canvas>
    </div>
  );
};