import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Shape = ({ type, color }: { type: 'icosahedron' | 'octahedron', color: string }) => {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.x += delta * 0.5;
            ref.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
            <mesh ref={ref} scale={2}>
                {type === 'icosahedron' ? (
                    <icosahedronGeometry args={[1, 0]} />
                ) : (
                    <octahedronGeometry args={[1, 0]} />
                )}
                <meshStandardMaterial
                    color={color}
                    wireframe={true}
                    transparent
                    opacity={0.3}
                />
            </mesh>
            {/* Glossy inner core */}
            <mesh scale={1.5}>
                {type === 'icosahedron' ? (
                    <icosahedronGeometry args={[1, 0]} />
                ) : (
                    <octahedronGeometry args={[1, 0]} />
                )}
                <MeshDistortMaterial
                    color={color}
                    speed={2}
                    distort={0.3}
                    transparent
                    opacity={0.1}
                    roughness={0}
                />
            </mesh>
        </Float>
    );
};

export const PlatonicSolids: React.FC<{ type: 'icosahedron' | 'octahedron', color?: string }> = ({ type, color = "#6366f1" }) => {
    return (
        <div className="w-16 h-16 md:w-24 md:h-24 absolute -left-4 -top-6 md:-left-8 md:-top-8 pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Shape type={type} color={color} />
            </Canvas>
        </div>
    );
};
