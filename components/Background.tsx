// @ts-nocheck
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Instance, Instances, Text } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

// --- Neural Network (AI Theme) ---
// A complex network of glowing nodes and connections
const NeuralNetwork = ({ count = 300, connectionDistance = 3.5 }) => {
  // Mobile optimization: Reduce count if screen is small
  const isMobile = useMemo(() => {
    if (typeof window !== 'undefined') return window.innerWidth < 768;
    return false;
  }, []);

  const finalCount = isMobile ? count / 6 : count; // 50 particles on mobile (Super lightweight)
  const finalDist = isMobile ? connectionDistance * 2 : connectionDistance; // Increase dist to keep connections visible

  const meshRef = useRef(null);
  const linesRef = useRef(null);
  // ...

  // Generate random neurons
  const [particles, linesGeometry] = useMemo(() => {
    const tempParticles = [];
    const tempLines = [];

    // Spread particles in a wide volume
    for (let i = 0; i < finalCount; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 30;
      tempParticles.push(new THREE.Vector3(x, y, z));
    }

    // STATIC CONNECTIONS (Performance Optimization)
    // Calculating dynamic connections N^2 every frame is too heavy for JS.
    // We pre-calculate connections between nearby neighbors once.
    for (let i = 0; i < finalCount; i++) {
      for (let j = i + 1; j < finalCount; j++) {
        const dist = tempParticles[i].distanceTo(tempParticles[j]);
        if (dist < finalDist) {
          tempLines.push(tempParticles[i]);
          tempLines.push(tempParticles[j]);
        }
      }
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(tempLines);
    return [tempParticles, geometry];
  }, [finalCount, finalDist]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Gentle rotation of the entire brain/universe
    if (meshRef.current) meshRef.current.rotation.y = t * 0.05;
    if (linesRef.current) linesRef.current.rotation.y = t * 0.05;
  });

  return (
    <group>
      {/* Neurons */}
      <Instances range={finalCount} ref={meshRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2} // Bloom booster
          toneMapped={false}
          transparent opacity={0.8}
        />
        {particles.map((pos, i) => (
          <Instance key={i} position={pos} />
        ))}
      </Instances>

      {/* Synapses */}
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial
          color="#6366f1" // Indigo
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// --- Sacred Geometry (Philosophy Theme) ---
// Floating geometric shapes representing structured thought
const FloatingGeometry = () => {
  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        {/* Large Wireframe Icosahedron */}
        <mesh position={[10, 5, -10]} rotation={[0, 0, Math.PI / 4]}>
          <icosahedronGeometry args={[4, 0]} />
          <meshBasicMaterial color="#4f46e5" wireframe transparent opacity={0.05} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1}>
        {/* Octahedron */}
        <mesh position={[-8, -5, -8]}>
          <octahedronGeometry args={[3, 0]} />
          <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.05} />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Dodecahedron-ish (Icosahedron detail 1) */}
        <mesh position={[0, 8, -15]}>
          <icosahedronGeometry args={[2, 1]} />
          <meshBasicMaterial color="#cyan" wireframe transparent opacity={0.03} />
        </mesh>
      </Float>
    </group>
  )
}

// --- Flying Skills Text ---
const skills = [
  "React", "TypeScript", "Node.js", "AI Engineering", "Three.js",
  "System Design", "Prompt Engineering", "Philosophy", "Logic",
  "Python", "Next.js", "Tailwind"
];

const FloatingSkills = () => {
  return (
    <group>
      {skills.map((skill, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={1}>
          <SkillText text={skill} index={i} total={skills.length} />
        </Float>
      ))}
    </group>
  );
}

const SkillText = ({ text, index, total }: { text: string, index: number, total: number }) => {
  // Distribute spirally or randomly
  const pos = useMemo(() => {
    const theta = (index / total) * Math.PI * 2 * 2; // 2 loops
    const r = 5 + Math.random() * 5;
    const x = r * Math.cos(theta);
    const y = (Math.random() - 0.5) * 10;
    const z = -5 - (Math.random() * 20); // Deep in the scene
    return new THREE.Vector3(x, y, z);
  }, [index, total]);

  // Animate opacity or color
  const ref = useRef(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.lookAt(state.camera.position);
    }
  })

  return (
    <Text
      ref={ref}
      position={pos}
      fontSize={0.4}
      font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
      color="#a5b4fc" // Soft indigo
      anchorX="center"
      anchorY="middle"
      fillOpacity={0.15}
    >
      {text}
    </Text>
  )
}

// --- Camera Logic ---
const CameraRig = () => {
  useFrame((state) => {
    const scrollY = window.scrollY;

    // Move camera forward on scroll (Entering the mind)
    const targetZ = 10 - (scrollY * 0.01);

    // Smooth lerp
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.1);

    // Mouse parallax (subtle)
    const mouseX = state.mouse.x * 0.5;
    const mouseY = state.mouse.y * 0.5;
    state.camera.position.x += (mouseX - state.camera.position.x) * 0.05;
    state.camera.position.y += (mouseY - state.camera.position.y) * 0.05;

    state.camera.lookAt(0, 0, -20);
  })
  return null;
}

export const Background: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-[100dvh] z-0 pointer-events-none bg-obsidian">
      <div className="absolute inset-0 bg-black" />

      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: false, alpha: false, stencil: false, depth: false }}>
        <color attach="background" args={['#000000']} />

        <CameraRig />
        <NeuralNetwork />
        <FloatingGeometry />
        <FloatingSkills />

        {/* Ambient glow */}
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#a5b4fc" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />

        {/* Post Processing temporarily disabled due to black screen issues */}
        {/* <EffectComposer disableNormalPass> */}
        {/* <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.4} /> */}
        {/* <Noise opacity={0.02} /> */}
        {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
        {/* </EffectComposer> */}
      </Canvas>
    </div>
  );
};