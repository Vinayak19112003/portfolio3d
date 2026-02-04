import React from 'react';

interface HolographicCardProps {
    children: React.ReactNode;
    className?: string;
    transparent?: boolean;
}

export const HolographicCard: React.FC<HolographicCardProps> = ({
    children,
    className = '',
    transparent = false
}) => {
    return (
        <div
            className={`
        relative rounded-xl p-8
        ${transparent ? 'bg-transparent' : 'bg-white/5 backdrop-blur-md border border-white/10'}
        ${className}
      `}
        >
            {children}
        </div>
    );
};
