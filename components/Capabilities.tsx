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
    <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mb-12 text-center"
      >
        <h2 className="font-mono text-xs uppercase tracking-widest text-subtle mb-2">Capabilities</h2>
        <p className="font-serif italic text-mist opacity-60">My Toolkit.</p>
      </motion.div>

      <div className="flex justify-center items-center -mt-10">
        <ThreeCloud words={caps} />
      </div>
    </section>
  );
};