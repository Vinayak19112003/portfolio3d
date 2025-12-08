import React from 'react';
import { motion } from 'framer-motion';

export const LogicFlow: React.FC = () => {
  const steps = [
    { title: "Chaos", sub: "Raw Inputs" },
    { title: "Structure", sub: "Logic Mapping" },
    { title: "Synthesis", sub: "AI Processing" },
    { title: "Clarity", sub: "Solution" }
  ];

  return (
    <div className="w-full py-12 md:py-20 relative">
      {/* Horizontal Line (Desktop) */}
      <svg className="absolute top-1/2 left-0 w-full h-20 -translate-y-1/2 z-0 hidden md:block overflow-visible">
        <motion.path
            d="M 0 40 L 100% 40"
            fill="transparent"
            strokeWidth="1"
            stroke="#333"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Vertical Line (Mobile) */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10 -translate-x-1/2 md:hidden z-0"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex flex-col items-center text-center group cursor-pointer bg-obsidian py-4 md:py-0 md:bg-transparent"
          >
            
            {/* Node Point */}
            <div className="w-6 h-6 rounded-full bg-obsidian border border-lux/50 mb-4 md:mb-6 relative z-10 group-hover:scale-125 transition-transform duration-300 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
              <div className="w-2 h-2 bg-lux rounded-full"></div>
              <div className="absolute inset-0 bg-lux rounded-full animate-ping opacity-20"></div>
            </div>
            
            <h3 className="font-mono text-sm uppercase tracking-widest text-mist bg-obsidian px-3 relative z-10 border border-white/5 rounded-full mb-2">
              {step.title}
            </h3>
            <p className="font-serif text-sm italic text-subtle opacity-50 group-hover:opacity-100 transition-opacity duration-300">
              {step.sub}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};