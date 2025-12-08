import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshReflectorMaterial, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';

const BrainParticles = ({ count = 200 }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const linesRef = useRef<any>(null);

    const [particles, lines] = useMemo(() => {
        const tempParticles = [];
        const tempLines = [];
        const radius = 2; // Brain radius

        for (let i = 0; i < count; i++) {
            // Create random points inside a sphere
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const r = Math.cbrt(Math.random()) * radius;

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            tempParticles.push(new THREE.Vector3(x, y, z));
        }

        // Connect nearby particles to form synapses
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dist = tempParticles[i].distanceTo(tempParticles[j]);
                if (dist < 0.8) { // Connection threshold
                    tempLines.push(tempParticles[i]);
                    tempLines.push(tempParticles[j]);
                }
            }
        }

        return [tempParticles, tempLines];
    }, [count]);


    useFrame((_state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y -= delta * 0.1;
        }
        if (linesRef.current) {
            linesRef.current.rotation.y -= delta * 0.1;
        }
    })

    return (
        <group>
            {/* Neurons */}
            <Instances range={count} ref={meshRef}>
                <sphereGeometry args={[0.03]} />
                <meshStandardMaterial color="#6366f1" emissive="#4f46e5" emissiveIntensity={2} toneMapped={false} />
                {particles.map((pos, i) => (
                    <Instance key={i} position={pos} />
                ))}
            </Instances>

            {/* Synapses (Lines) */}
            {/* Using simple Line segments for performance, wrapped in a group for rotation */}
            <group ref={linesRef}>
                {/* Note: Drei's Line is good for single thick lines, but for thousands of segments, 
                 native THREE.LineSegments is cleaner, but harder to manage in declarative React without a custom buffer.
                 Let's use a simplified approach: render a subset of lines or use a single geometry.
                 Actually, simpler: use a ref to a BufferGeometry for lines.
             */}
                <lineSegments>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={lines.length}
                            array={new Float32Array(lines.flatMap(v => [v.x, v.y, v.z]))}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color="#6366f1" transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
                </lineSegments>
            </group>
        </group>
    );
};


export const NeuralBrain: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 6] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <BrainParticles count={300} />

                    {/* Outer Glow Shell */}
                    <mesh scale={2.2}>
                        <sphereGeometry args={[1, 32, 32]} />
                        <meshBasicMaterial color="#6366f1" transparent opacity={0.05} wireframe />
                    </mesh>
                </Float>

                {/* Reflective Floor */}
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
            </Canvas>
        </div>
    );
};
