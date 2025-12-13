// @ts-nocheck
import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, TrackballControls } from '@react-three/drei';
import * as THREE from 'three';
import { useMobile } from '../hooks/useMobile';
import { useIsTouch } from '../hooks/useIsTouch';

function Word({ children, ...props }: any) {
    const color = new THREE.Color();
    const fontProps = { fontSize: 2.2, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false };
    const ref = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    // Random offset for independent floating
    const offset = useMemo(() => Math.random() * 100, []);

    const over = (e: any) => { e.stopPropagation(); setHovered(true); };
    const out = () => setHovered(false);

    // Change the mouse cursor on hover
    React.useEffect(() => {
        if (hovered) document.body.style.cursor = 'pointer';
        return () => { document.body.style.cursor = 'auto'; };
    }, [hovered]);

    // Tie component to the render-loop
    useFrame(({ camera, clock }) => {
        const t = clock.elapsedTime;
        if (ref.current) {
            // Make text face the camera
            ref.current.quaternion.copy(camera.quaternion);

            // Animate color
            (ref.current.material as any).color.lerp(color.set(hovered ? '#00ffff' : '#E5E5E5'), 0.1);

            // Animate Scale (Hover effect)
            const targetScale = hovered ? 1.4 : 1;
            ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

            // Independent Floating (Wobble)
            // ref.current.position.y += Math.sin(t + offset) * 0.005; // Careful, this drifts if not relative
            // better to just leave it fixed position-wise or use a parent group for float.
            // Let's stick to scale and color for now to preserve the sphere shape stability.
        }
    });

    return <Text ref={ref} onPointerOver={over} onPointerOut={out} onClick={() => console.log('clicked')} {...props} {...fontProps} children={children} />;
}

function Cloud({ count = 4, radius = 35, words }: { count?: number, radius?: number, words: string[] }) {
    const cloudRef = useRef<THREE.Group>(null);

    // Create a count x count random words with spherical distribution
    const cloudWords = useMemo(() => {
        const temp = [];
        const spherical = new THREE.Spherical();
        const phiSpan = Math.PI / (words.length + 1);
        const thetaSpan = (Math.PI * 2) / words.length;

        for (let i = 0; i < words.length; i++) {
            // Better Distribution: Fibonacci Sphere
            // This ensures "increasing the space" is mathematically optimal
            const phi = Math.acos(-1 + (2 * i) / words.length);
            const theta = Math.sqrt(words.length * Math.PI) * phi;

            spherical.set(radius, phi, theta);
            const pos = new THREE.Vector3().setFromSpherical(spherical);
            temp.push([pos, words[i]] as const);
        }
        return temp;
    }, [count, radius, words]);

    // Auto-Rotation Logic
    useFrame((state, delta) => {
        if (cloudRef.current) {
            // Slow rotation
            cloudRef.current.rotation.y += delta * 0.05;
            cloudRef.current.rotation.x += delta * 0.02;
        }
    });

    return (
        <group ref={cloudRef}>
            {cloudWords.map(([pos, word], index) => (
                <Word key={index} position={pos} children={word} />
            ))}
        </group>
    );
}

export const ThreeCloud: React.FC<{ words: string[] }> = ({ words }) => {
    // Mobile Check
    const isMobile = useMobile();
    const isTouch = useIsTouch();

    // Interactive only if NOT mobile AND NOT touch (even if desktop mode)
    const isInteractive = !isMobile && !isTouch;

    return (
        <div
            className={`w-full h-[600px] ${isInteractive ? 'cursor-move' : ''}`}
            style={{ touchAction: 'pan-y' }}
        >
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 50], fov: 75 }}
                style={isInteractive ? {} : { pointerEvents: 'none' }} // Lets touches pass through if not interactive
            >
                <fog attach="fog" args={['#050505', 20, 100]} />
                <Cloud words={words} radius={28} />
                {isInteractive && <TrackballControls noZoom />}
            </Canvas>
        </div>
    );
}
