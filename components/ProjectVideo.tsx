import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ProjectVideoProps {
    src: string;
    alt: string;
    poster?: string;
}

export const ProjectVideo: React.FC<ProjectVideoProps> = ({ src, alt, poster }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [error, setError] = useState(false);

    const handleMouseEnter = () => {
        if (videoRef.current && !error) {
            videoRef.current.play().catch(e => console.warn("Video play failed:", e));
            setIsPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current && !error) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    if (error) {
        return (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-charcoal group">
                <img src={poster} alt={alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <p className="text-xs font-mono text-red-400">Video source not found</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-charcoal group cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                src={src}
                className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ${isPlaying ? 'opacity-100' : 'opacity-90'}`}
                muted
                loop
                playsInline
                poster={poster}
                aria-label={alt}
                onError={() => setError(true)}
            />



            {/* Aesthetic Border Glow */}
            <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none group-hover:border-lux/30 transition-colors duration-500" />

            {/* Scanline Effect (Optional, subtle) */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
        </motion.div>
    );
};
