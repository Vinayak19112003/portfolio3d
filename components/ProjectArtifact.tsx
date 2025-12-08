import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- Shapes ---

const LogicArtifact = () => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((_state, delta) => { if (ref.current) { ref.current.rotation.x += delta * 0.2; ref.current.rotation.y += delta * 0.4; } });
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={ref} scale={1.8}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color="#6366f1" wireframe transparent opacity={0.4} />
            </mesh>
            <mesh scale={1.2}>
                <icosahedronGeometry args={[1, 0]} />
                <MeshDistortMaterial color="#ffffff" speed={3} distort={0.4} transparent opacity={0.1} />
            </mesh>
        </Float>
    );
};

const StructureArtifact = () => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((_state, delta) => { if (ref.current) { ref.current.rotation.y += delta * 0.3; } });
    return (
        <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={ref} scale={1.5}>
                <boxGeometry args={[1.5, 1.5, 1.5]} />
                <meshStandardMaterial color="#a855f7" wireframe transparent opacity={0.3} />
            </mesh>
            <mesh scale={1}>
                <boxGeometry args={[1, 1, 1]} />
                <MeshDistortMaterial color="#ffffff" speed={1} distort={0.2} transparent opacity={0.1} />
            </mesh>
        </Float>
    );
};

const NetworkArtifact = () => {
    const ref = useRef<THREE.Points>(null);
    const positions = React.useMemo(() => {
        const count = 300;
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);
            pos[i * 3] = Math.sin(theta) * Math.cos(phi) * 1.5;
            pos[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * 1.5;
            pos[i * 3 + 2] = Math.cos(theta) * 1.5;
        }
        return pos;
    }, []);

    useFrame((_state, delta) => { if (ref.current) { ref.current.rotation.y -= delta * 0.2; } });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3}>
                <PointMaterial transparent color="#10b981" size={0.05} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>
    );
};

const FlowArtifact = () => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((_state, delta) => { if (ref.current) { ref.current.rotation.x += delta * 0.5; ref.current.rotation.y += delta * 0.5; } });
    return (
        <Float speed={3} rotationIntensity={1.5} floatIntensity={1}>
            <mesh ref={ref} scale={1.2}>
                <torusGeometry args={[1, 0.3, 16, 100]} />
                <MeshDistortMaterial color="#f59e0b" speed={4} distort={0.3} wireframe transparent opacity={0.4} />
            </mesh>
        </Float>
    );
};

const ProcessArtifact = () => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((_state, delta) => { if (ref.current) { ref.current.rotation.z -= delta * 0.5; } });
    return (
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
            <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} scale={1.2} >
                <cylinderGeometry args={[1, 1, 0.5, 32]} />
                <meshStandardMaterial color="#ef4444" wireframe transparent opacity={0.3} />
            </mesh>
        </Float>
    );
};


// --- Main Component ---

export const ProjectArtifact: React.FC<{ type: string }> = ({ type }) => {
    const renderArtifact = () => {
        switch (type) {
            case "System Logic": return <LogicArtifact />;
            case "Engineering": return <StructureArtifact />;
            case "Social Simulation": return <NetworkArtifact />;
            case "Economy": return <FlowArtifact />;
            case "Automation": return <ProcessArtifact />;
            default: return <LogicArtifact />;
        }
    }

    return (
        <div className="absolute inset-0 bg-black/80">
            <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                {renderArtifact()}
            </Canvas>
        </div>
    );
};
