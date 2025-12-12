import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Safety check for environment
        if (typeof window !== 'undefined' && window.matchMedia) {
            const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
            setIsVisible(isFinePointer);
        }

        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            // Move the outer ring
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
            }
            // Move the dot
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
            }
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target || !target.tagName) return;

            const isInteractive =
                target.closest('a') !== null ||
                target.closest('button') !== null ||
                target.closest('input') !== null ||
                target.closest('textarea') !== null ||
                target.closest('.cursor-pointer') !== null ||
                ['INPUT', 'TEXTAREA', 'SELECT', 'A', 'BUTTON'].includes(target.tagName);

            setIsHovering(!!isInteractive);
        };

        const onMouseDown = () => setIsClicking(true);
        const onMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', onMouseOver);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Outer Glow / Ring */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference will-change-transform"
                style={{
                    marginTop: '-24px',
                    marginLeft: '-24px',
                    transition: 'transform 0.1s ease-out',
                }}
            >
                <div
                    className={`
            border border-lux rounded-full transition-all duration-300 ease-out
            flex items-center justify-center
            ${isHovering ? 'w-16 h-16 bg-lux/10 border-lux/50' : 'w-12 h-12 border-lux/30'}
            ${isClicking ? 'scale-75' : 'scale-100'}
          `}
                >
                    {isHovering && (
                        <div className="w-full h-full rounded-full animate-ping opacity-20 bg-lux"></div>
                    )}
                </div>
            </div>

            {/* Center Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference will-change-transform"
                style={{
                    marginTop: '-4px',
                    marginLeft: '-4px',
                }}
            >
                <div className={`
            bg-lux rounded-full transition-all duration-300
            ${isHovering ? 'w-2 h-2' : 'w-2 h-2'}
        `} />
            </div>
        </>
    );
};