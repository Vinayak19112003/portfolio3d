// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useSpring, animated, config } from '@react-spring/three';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

// --- Neural Artifact Model ---
// A Platonic Solid (Dodecahedron) representing refined thought and AI complexity.
const NeuralArtifact = ({ position, rotation, rollRotation }) => {
    const innerGroupRef = useRef();

    // Idle Pulse
    useFrame((state) => {
        if (innerGroupRef.current) {
            // Subtle hover/breathe
            // innerGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
        }
    });

    return (
        <animated.group position={position} rotation={rotation} scale={[0.4, 0.4, 0.4]}>
            {/* Rolling Axis Wrapper */}
            <animated.group rotation-x={rollRotation} ref={innerGroupRef}>

                {/* Core Crystal (Philosophy) */}
                <mesh>
                    <dodecahedronGeometry args={[1, 0]} />
                    {/* Dark glass look */}
                    <meshPhysicalMaterial
                        color="#1e1b4b" // Dark Indigo
                        roughness={0.1}
                        metalness={0.9}
                        transmission={0.2} // Slight glass
                        thickness={1}
                        emissive="#312e81"
                        emissiveIntensity={0.5}
                    />
                </mesh>

                {/* Wireframe Neural Cage (AI) */}
                <mesh scale={[1.05, 1.05, 1.05]}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshStandardMaterial
                        color="#00ffff"
                        wireframe
                        transparent
                        opacity={0.3}
                        emissive="#00ffff"
                        emissiveIntensity={2}
                    />
                </mesh>

                {/* Inner Data Core (Glowing point) */}
                <mesh scale={[0.3, 0.3, 0.3]}>
                    <octahedronGeometry args={[1, 0]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>

            </animated.group>
        </animated.group>
    );
};

const Scene = () => {
    const { viewport } = useThree();
    const [rotation, setRotation] = useState([0, 0, 0]);

    // Spring physics for Position (Movement)
    const [posSpring, posApi] = useSpring(() => ({
        position: [0, -viewport.height / 2 + 1, 0],
        config: { mass: 2, tension: 120, friction: 30 }
    }));

    // Spring physics for Rolling (Tumbling)
    const [rollSpring, rollApi] = useSpring(() => ({
        rollRotation: 0,
        config: { mass: 2, tension: 100, friction: 30 }
    }));

    useEffect(() => {
        const handleClick = (e) => {
            // 1. Target
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;

            const worldX = (x * viewport.width) / 2;
            const worldY = (y * viewport.height) / 2;
            const newPos = [worldX, worldY, 0];

            // 2. Face
            const currentPos = posSpring.position.get();
            const deltaX = worldX - currentPos[0];
            const deltaY = worldY - currentPos[1];

            const rotationY = Math.atan2(deltaX, deltaY);
            // Dodecahedron looks cool from any angle, but rotation aligns the roll direction
            setRotation([0, -rotationY, 0]);

            // 3. Move & Roll
            const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            // Speed adjustments
            const duration = dist * 25;

            posApi.start({
                position: newPos,
                config: { duration: duration }
            });

            // Tumble calculations
            // Radius approx 0.4. 
            const rotations = (dist / 0.8) * (Math.PI * 2);
            rollApi.start({
                rollRotation: rollSpring.rollRotation.get() + rotations,
                config: { duration: duration }
            });
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [viewport, posApi, rollApi, posSpring.position, rollSpring.rollRotation]);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#4f46e5" />
            <pointLight position={[-10, -5, 5]} intensity={2} color="#00ffff" />

            <NeuralArtifact
                position={posSpring.position}
                rotation={rotation}
                rollRotation={rollSpring.rollRotation}
            />
        </>
    );
};

export const CatCompanion = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
            <Canvas orthographic camera={{ zoom: 40, position: [0, 0, 100] }}>
                <Scene />
            </Canvas>
        </div>
    );
};
