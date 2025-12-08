import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DNAHelix } from './DNAHelix';

const quotes = [
  "“I don’t use AI to finish tasks. I use AI to expand imagination.”",
  "“Prompt engineering is not command-writing. It is precise thinking.”",
  "“I don’t want AI to replace intelligence. I want AI to help humans understand intelligence.”",
  "“If AI can think with us, maybe thinking itself is a structure we can design.”"
];

export const PhilosophyQuotes: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-40 px-6 flex justify-center items-center relative overflow-hidden z-10">
      <DNAHelix />
      <div className="relative z-10 max-w-4xl text-center h-40 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 1 }}
            className="font-serif text-2xl md:text-4xl italic text-mist/90 leading-relaxed"
          >
            {quotes[currentIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
};