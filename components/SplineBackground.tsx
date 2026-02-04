import Spline from '@splinetool/react-spline';
import * as THREE from 'three';

export default function SplineBackground() {
    return (
        <div className="fixed top-0 left-0 w-full h-full z-0 h-[100dvh]">
            <Spline
                scene="https://prod.spline.design/CnEZmT-aO8xc2WdG/scene.splinecode"
                onLoad={(spline) => {
                    const app = spline as any;

                    // 1. Find Camera
                    const camera = app._camera || app.camera || app.findObjectByName('Camera') || app.findObjectByName('Main Camera');

                    // 2. Find Target Object
                    const allObjects: string[] = [];
                    function traverse(obj: any) {
                        if (obj.name) allObjects.push(obj.name);
                        if (obj.children) obj.children.forEach(traverse);
                    }
                    if (app._scene) traverse(app._scene);

                    const possibleNames = ['Sphere', 'Ball', 'Fireball', 'Light', 'Object'];
                    const targetName = allObjects.find(name => possibleNames.some(p => name.includes(p))) || 'Sphere';
                    const obj = spline.findObjectByName(targetName);

                    if (!obj) return;

                    // Setup Animation Loop
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
                            if (camera && camera.isCamera) {
                                const targetZ = obj!.position.z;

                                vec.set(mouseX, mouseY, 0.5);
                                vec.unproject(camera);
                                vec.sub(camera.position).normalize();

                                const distance = (targetZ - camera.position.z) / vec.z;
                                pos.copy(camera.position).add(vec.multiplyScalar(distance));

                                currentX += (pos.x - currentX) * 0.3;
                                currentY += (pos.y - currentY) * 0.3;

                            } else {
                                const moveScaleX = 350;
                                const moveScaleY = 200;

                                const targetX = mouseX * moveScaleX;
                                const targetY = mouseY * moveScaleY;

                                currentX += (targetX - currentX) * 0.3;
                                currentY += (targetY - currentY) * 0.3;
                            }

                            obj!.position.x = currentX;
                            obj!.position.y = currentY;

                        } catch (err) {
                            console.error("Animation error:", err);
                            return;
                        }
                        requestAnimationFrame(animate);
                    }
                    requestAnimationFrame(animate);
                }}
            />
        </div>
    );
}
