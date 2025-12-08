import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

const StarField = (props: any) => {
    const ref = useRef<any>();

    // Generate random positions for stars in a sphere/cube
    const [sphere] = useMemo(() => {
        // Generate 5000 stars
        const positions = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            // Random spread
            positions[i * 3] = (Math.random() - 0.5) * 30;     // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30; // z
        }
        return [positions];
    }, []);

    useFrame((_state, delta: number) => {
        if (ref.current) {
            // Rotation speed increases with scroll
            const scrollSpeed = window.scrollY * 0.0005;
            ref.current.rotation.x -= (delta / 10) + scrollSpeed;
            ref.current.rotation.y -= (delta / 15) + scrollSpeed;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

export const ThreeBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <StarField />
            </Canvas>
        </div>
    );
};
