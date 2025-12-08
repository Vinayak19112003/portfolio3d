import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, TrackballControls } from '@react-three/drei';
import * as THREE from 'three';

function Word({ children, ...props }: any) {
    const color = new THREE.Color();
    const fontProps = { fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false };
    const ref = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    const over = (e: any) => { e.stopPropagation(); setHovered(true); };
    const out = () => setHovered(false);

    // Change the mouse cursor on hover
    React.useEffect(() => {
        if (hovered) document.body.style.cursor = 'pointer';
        return () => { document.body.style.cursor = 'auto'; };
    }, [hovered]);

    // Tie component to the render-loop
    useFrame(({ camera }) => {
        // Make text face the camera
        if (ref.current) {
            ref.current.quaternion.copy(camera.quaternion);
            // Animate color
            (ref.current.material as any).color.lerp(color.set(hovered ? '#6366f1' : '#E5E5E5'), 0.1);
        }
    });

    return <Text ref={ref} onPointerOver={over} onPointerOut={out} onClick={() => console.log('clicked')} {...props} {...fontProps} children={children} />;
}

function Cloud({ count = 4, radius = 20, words }: { count?: number, radius?: number, words: string[] }) {
    // Create a count x count random words with spherical distribution
    const cloudWords = useMemo(() => {
        const temp = [];
        const spherical = new THREE.Spherical();

        for (let i = 0; i < words.length; i++) {
            // Distribute on sphere surface
            // Using Golden Spiral for even distribution would be better but simple random/linear is okay for small sets
            // Let's use specific coordinates to ensure they are spread out
            const phi = Math.acos(-1 + (2 * i) / words.length);
            const theta = Math.sqrt(words.length * Math.PI) * phi;

            spherical.set(radius, phi, theta);
            const pos = new THREE.Vector3().setFromSpherical(spherical);
            temp.push([pos, words[i]] as const);
        }
        return temp;
    }, [count, radius, words]);

    return (
        <>
            {cloudWords.map(([pos, word], index) => (
                <Word key={index} position={pos} children={word} />
            ))}
        </>
    );
}

export const ThreeCloud: React.FC<{ words: string[] }> = ({ words }) => {
    return (
        <div className="w-full h-[400px] cursor-move">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
                <fog attach="fog" args={['#202025', 0, 80]} />
                <Cloud words={words} />
                <TrackballControls noZoom />
            </Canvas>
        </div>
    );
}
