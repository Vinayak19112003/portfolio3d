import React from 'react';
import { motion } from 'framer-motion';
import { ThreeCloud } from './ThreeCloud';

export const Capabilities: React.FC = () => {
  const caps = [
    "Thinking fast using AI",
    "System design & Logic architecture",
    "Prompt engineering",
    "n8n automations",
    "Selenium / Playwright",
    "Data visualization",
    "Rapid Prototyping"
  ];

  return (
    <section className="py-24 relative z-10 w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mb-12 text-center max-w-4xl mx-auto px-6"
      >
        <h2 className="font-mono text-xs uppercase tracking-widest text-subtle mb-2">Capabilities</h2>
        <p className="font-serif italic text-mist opacity-60">My Toolkit.</p>
      </motion.div>

      <div className="w-full flex justify-center items-center -mt-10">
        <ThreeCloud words={caps} />
      </div>
    </section>
  );
};