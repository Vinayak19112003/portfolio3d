import React from 'react';
import { motion } from 'framer-motion';
import { LogicFlow } from './LogicFlow';
import { PlatonicSolids } from './PlatonicSolids';
import { HolographicCard } from './HolographicCard';

export const Manifesto: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/5 relative z-10">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-24">

        {/* Column 1 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 md:space-y-6"
        >
          <HolographicCard className="p-8 h-full rounded-xl">
            <h2 className="font-mono text-xs uppercase tracking-widest text-subtle border-b border-white/10 pb-2 inline-block relative overflow-visible">
              <PlatonicSolids type="icosahedron" color="#6366f1" />
              <span className="relative z-10">Identity</span>
            </h2>
            <p className="font-serif text-lg md:text-xl text-mist leading-relaxed mt-4">
              I don’t use AI to just write code. I use AI to <span className="italic text-lux">think</span>.
              My work is not about syntax; it is about the architecture of ideas.
            </p>
          </HolographicCard>
        </motion.div>

        {/* Column 2 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 md:space-y-6"
        >
          <HolographicCard className="p-8 h-full rounded-xl">
            <h2 className="font-mono text-xs uppercase tracking-widest text-subtle border-b border-white/10 pb-2 inline-block relative overflow-visible">
              <PlatonicSolids type="octahedron" color="#ffffff" />
              <span className="relative z-10">Philosophy</span>
            </h2>
            <p className="font-serif text-lg md:text-xl text-mist leading-relaxed mt-4">
              Intelligence is structural. If we can map the structure of a problem, we can solve it with machine speed.
              Code is just the translation layer.
            </p>
          </HolographicCard>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12"
      >
        <div className="space-y-8 md:space-y-12 text-center md:text-left">
          <h2 className="font-mono text-xs uppercase tracking-widest text-subtle border-b border-white/10 pb-2 inline-block mb-4">
            The Process
          </h2>
          <LogicFlow />
        </div>
      </motion.div>
    </section>
  );
};