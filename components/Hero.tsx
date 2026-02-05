import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextDecryption } from './TextDecryption';
import { HolographicCard } from './HolographicCard';
import { ArrowRight } from 'lucide-react';

const roles = ["AI Engineer", "Algo Trader", "Full Stack Dev"];

export const Hero: React.FC = () => {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="min-h-[100dvh] flex flex-col justify-center items-center px-4 md:px-6 relative overflow-hidden">

            <HolographicCard className="p-0" transparent>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-5xl relative z-10"
                >
                    <div className="font-mono text-[10px] md:text-sm text-lux tracking-[0.3em] uppercase mb-4 md:mb-6 flex items-center justify-center gap-3">
                        <span className="w-4 md:w-8 h-[1px] bg-lux/50"></span>
                        <span>Vinayak Deshmuk</span>
                        <span className="w-4 md:w-8 h-[1px] bg-lux/50"></span>
                    </div>

                    <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl text-mist leading-tight mb-6 sm:mb-8 font-light tracking-tight">
                        AI Full-Stack Developer <span className="text-white/30 hidden sm:inline">|</span> <br className="sm:hidden" />
                        <span className="text-white text-glow">Automation & SaaS</span>
                    </h1>

                    <div className="h-8 md:h-12 overflow-hidden mb-4 sm:mb-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "circOut" }}
                                className="font-mono text-xs sm:text-sm md:text-xl text-subtle"
                            >
                                I am an <span className="text-lux">{roles[index]}</span>.
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="font-serif text-sm sm:text-lg md:text-2xl text-subtle italic max-w-3xl mx-auto leading-relaxed px-2 mb-6 sm:mb-10"
                    >
                        <TextDecryption text="Affordable, high-quality solutions built for real business impact." />
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto"
                    >
                        <button onClick={() => window.scrollTo(0, window.innerHeight)} className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-lux/10 hover:bg-lux/20 text-lux border border-lux/30 rounded-full font-mono text-[10px] sm:text-xs uppercase tracking-widest transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center justify-center gap-2">
                            View Projects <ArrowRight size={14} />
                        </button>
                        <a href="mailto:vinayak19112003@gmail.com" className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-mono text-[10px] sm:text-xs uppercase tracking-widest transition-all hover:scale-105 flex items-center justify-center gap-2">
                            Contact / Hire Me
                        </a>
                    </motion.div>

                </motion.div>
            </HolographicCard>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            >
                <span className="font-mono text-[8px] md:text-[10px] text-subtle uppercase tracking-widest">Scroll to Deploy</span>
                <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-lux to-transparent"></div>
            </motion.div>
        </section>
    );
};
