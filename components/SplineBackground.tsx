import Spline from '@splinetool/react-spline';
import * as THREE from 'three';
import { useState } from 'react';

export default function SplineBackground() {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="fixed top-0 left-0 w-full h-full z-0 h-[100dvh] hidden md:block">
            {/* Overlay to catch interactions before load if needed */}
            {!isLoaded && <div className="absolute inset-0 z-10 bg-obsidian transition-opacity duration-1000 pointer-events-none" />}

            <Spline
                scene="https://prod.spline.design/CnEZmT-aO8xc2WdG/scene.splinecode"
                onLoad={(spline) => {
                    const app = spline as any;
                    setIsLoaded(true);

                    // --- STATE ---
                    let obj: any = null;
                    let camera: any = null;
                    let maxRetries = 20;

                    // --- INIT FUNCTION ---
                    function init() {
                        // 1. Find Camera
                        camera = app._camera || app.camera || app.findObjectByName('Camera') || app.findObjectByName('Main Camera');

                        // 2. Find Object Strategy
                        const possibleNames = ['Sphere', 'Ball', 'Fireball', 'Light', 'Object'];

                        // Strategy A: Direct name search
                        for (const name of possibleNames) {
                            if (!obj) obj = app.findObjectByName(name);
                        }

                        // Strategy B: Scene Traversal if still null
                        if (!obj && app._scene) {
                            const allChildNames: string[] = [];
                            app._scene.traverse((child: any) => {
                                if (child.name) allChildNames.push(child.name);
                            });
                            // Try to fuzzy match
                            const match = allChildNames.find(n => possibleNames.some(p => n.includes(p)));
                            if (match) obj = app.findObjectByName(match);
                        }

                        // Debug
                        console.log(`[Spline Init] Attempt ${21 - maxRetries}: Camera=${!!camera}, Obj=${obj?.name}`);

                        if (obj && camera) {
                            startAnimationLoop();
                        } else if (maxRetries > 0) {
                            maxRetries--;
                            setTimeout(init, 500); // Retry every 500ms
                        } else {
                            console.error("[Spline Error] Could not find object or camera after retries.");
                        }
                    }

                    // --- ANIMATION LOOP ---
                    function startAnimationLoop() {
                        let mouseX = 0, mouseY = 0;
                        let currentX = obj.position.x;
                        let currentY = obj.position.y;
                        const vec = new THREE.Vector3();
                        const pos = new THREE.Vector3();

                        window.addEventListener('mousemove', (e) => {
                            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
                        });

                        function animate() {
                            try {
                                if (camera?.isCamera) {
                                    const targetZ = obj.position.z;
                                    vec.set(mouseX, mouseY, 0.5);
                                    vec.unproject(camera);
                                    vec.sub(camera.position).normalize();
                                    const distance = (targetZ - camera.position.z) / vec.z;
                                    pos.copy(camera.position).add(vec.multiplyScalar(distance));

                                    // Smooth lerp
                                    currentX += (pos.x - currentX) * 0.15;
                                    currentY += (pos.y - currentY) * 0.15;
                                } else {
                                    // Fallback
                                    const moveScaleX = 350;
                                    const moveScaleY = 200;
                                    currentX += (mouseX * moveScaleX - currentX) * 0.15;
                                    currentY += (mouseY * moveScaleY - currentY) * 0.15;
                                }

                                obj.position.x = currentX;
                                obj.position.y = currentY;
                                requestAnimationFrame(animate);
                            } catch (err) {
                                // If error (e.g. obj destroyed), try to re-init instead of stopping
                                console.warn("Animation loop error, attempting re-init:", err);
                                setTimeout(init, 1000);
                            }
                        }
                        animate();
                    }

                    // Start
                    init();
                }}
            />
        </div>
    );
}
