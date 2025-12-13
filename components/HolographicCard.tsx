import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMobile } from '../hooks/useMobile';
import { useIsTouch } from '../hooks/useIsTouch';

interface HolographicCardProps {
    children: React.ReactNode;
    className?: string;
    transparent?: boolean;
}

export const HolographicCard: React.FC<HolographicCardProps> = ({ children, className = "", transparent = false }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isMobile = useMobile();
    const isTouch = useIsTouch();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    // Tilt logic
    // Dividing by a larger number reduces the intensity
    const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
    const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

    // Force zero rotation on mobile OR touch (Desktop Mode) to prevent glitching
    const finalRotateX = (isMobile || isTouch) ? 0 : rotateX;
    const finalRotateY = (isMobile || isTouch) ? 0 : rotateY;

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                rotateX: finalRotateX,
                rotateY: finalRotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative transition-all duration-200 ease-out group ${className}`}
        >
            {/* 3D Content Container */}
            <div
                className="relative z-10"
                style={{
                    transform: "translateZ(20px)",
                }}
            >
                {children}
            </div>

            {/* Glass/Holographic Background */}
            {!transparent && (
                <div
                    className="absolute inset-0 z-0 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]"
                    style={{
                        transform: "translateZ(0px)",
                    }}
                />
            )}

            {/* Glare Effect */}
            {!transparent && (
                <motion.div
                    className="absolute inset-0 z-20 pointer-events-none rounded-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                    style={{
                        background: useTransform(
                            mouseX,
                            [-300, 300],
                            [
                                "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)",
                                "linear-gradient(to right, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)"
                            ]
                        ),
                    }}
                />
            )}
        </motion.div>
    );
};
