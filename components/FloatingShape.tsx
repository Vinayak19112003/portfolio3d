import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedShape = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            // Optional: Animation logic if needed
        }
    });

    return (
        <>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh ref={meshRef} scale={2}>
                    <icosahedronGeometry args={[1, 0]} />
                    <MeshDistortMaterial
                        color="#4F4F4F"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0.2}
                        metalness={0.8}
                        wireframe={true}
                    />
                </mesh>
                {/* Inner solid core for contrast */}
                <mesh scale={1.8}>
                    <icosahedronGeometry args={[1, 0]} />
                    <MeshDistortMaterial
                        color="#000000"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        opacity={0.1}
                        transparent
                    />
                </mesh>
            </Float>

            <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={1024}
                    mixBlur={1}
                    mixStrength={40}
                    roughness={1}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#050505"
                    metalness={0.5}
                    mirror={0}
                />
            </mesh>
        </>
    );
};

export const FloatingShape: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <AnimatedShape />
            </Canvas>
        </div>
    );
};
