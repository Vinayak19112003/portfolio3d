import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextDecryption } from './TextDecryption';
import { NeuralBrain } from './NeuralBrain';

const roles = ["Logic Craftsman", "AI Explorer", "Digital Philosopher"];

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
      {/* 3D Background Layer */}
      <NeuralBrain />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl relative z-10"
      >
        <div className="font-mono text-[10px] md:text-sm text-lux tracking-[0.3em] uppercase mb-4 md:mb-6 flex items-center justify-center gap-3">
          <span className="w-4 md:w-8 h-[1px] bg-lux/50"></span>
          <span>Vinayak Deshmuk</span>
          <span className="w-4 md:w-8 h-[1px] bg-lux/50"></span>
        </div>

        <h1 className="font-serif text-3xl md:text-8xl text-mist leading-[1.2] md:leading-[1.1] mb-6 md:mb-8 font-light tracking-tight">
          Welcome to my <br />
          <span className="text-white text-glow">Laboratory of Thought</span>
        </h1>

        <div className="h-8 md:h-16 overflow-hidden mb-8 md:mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="font-mono text-sm md:text-2xl text-subtle"
            >
              I am a <span className="text-lux">{roles[index]}</span>.
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="font-serif text-lg md:text-2xl text-subtle italic max-w-2xl mx-auto leading-relaxed px-2"
        >
          <TextDecryption text="“I don’t just use AI — I explore its mind to restructure human logic.”" />
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-mono text-[8px] md:text-[10px] text-subtle uppercase tracking-widest">Scroll to Explore</span>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-lux to-transparent"></div>
      </motion.div>
    </section>
  );
};