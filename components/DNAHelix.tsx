import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const Helix = (props: any) => {
    const ref = useRef<THREE.Points>(null);

    // Double helix logic
    const [helixPositions] = useMemo(() => {
        const points = 200;
        const pos = new Float32Array(points * 3);
        for (let i = 0; i < points; i++) {
            const t = (i * 0.5);
            const radius = 1;
            // Interleave two strands
            const angle = i % 2 === 0 ? t : t + Math.PI;

            pos[i * 3] = Math.cos(angle) * radius; // x
            pos[i * 3 + 1] = (i * 0.1) - 10;         // y (height)
            pos[i * 3 + 2] = Math.sin(angle) * radius; // z
        }
        return [pos];
    }, []);

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <group {...props}>
            <Points ref={ref} positions={helixPositions} stride={3}>
                <PointMaterial transparent color="#6366f1" size={0.1} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
            </Points>
        </group>
    )
}

export const DNAHelix: React.FC = () => {
    return (
        <div className="absolute right-0 top-0 h-full w-1/3 z-0 pointer-events-none opacity-50 hidden md:block">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Helix rotation={[0, 0, Math.PI / 6]} />
                </Float>
            </Canvas>
        </div>
    );
}
