import React from 'react';
import { motion } from 'framer-motion';
import { ProjectArtifact } from './ProjectArtifact';

interface Experiment {
  id: number;
  title: string;
  description: string;
  type: string;
  image: string;
}

const experiments: Experiment[] = [
  {
    id: 1,
    type: "System Logic",
    title: "The Trading Journal",
    description: "Using AI to find behavioral patterns in financial data, treating money as a language.",
    // Dark abstract obsidian background with flowing lines/data
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: 2,
    type: "Engineering",
    title: "Tekla MCP Structure",
    description: "Can AI understand architectural constraints? A test in structural logic.",
    image: "https://images.unsplash.com/photo-1524230659092-07f99a75c013?q=80&w=1000&auto=format&fit=crop" // Structural Geometry
  },
  {
    id: 3,
    type: "Social Simulation",
    title: "The Turing Test on X",
    description: "Automating social existence to see if AI can mimic human 'clout' mechanics.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop" // AI Silhouette
  },
  {
    id: 4,
    type: "Economy",
    title: "Web3 Value Flow",
    description: "Designing token economies by simulating 1,000 years of transactions in minutes.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop" // Blockchain Network
  },
  {
    id: 5,
    type: "Automation",
    title: "Zero-Code Systems",
    description: "Building complex n8n workflows where logic replaces syntax entirely.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" // Circuit/Logic
  }
];

export const ThoughtExperiments: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mb-16 border-b border-white/10 pb-4 flex justify-between items-end"
      >
        <h2 className="font-mono text-xs uppercase tracking-widest text-lux">Experiments in Thought</h2>
        <span className="font-serif italic text-subtle text-sm hidden md:block">Logic in motion.</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
        {experiments.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative rounded-xl overflow-hidden bg-charcoal border border-white/5 hover:border-lux/30 transition-all duration-500 hover:shadow-2xl hover:shadow-lux/10 preserve-3d hover:rotate-y-2 hover:rotate-x-2"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Image Header - Enforced 16:9 Aspect Ratio */}
            <div className="w-full aspect-video overflow-hidden relative border-b border-white/5 bg-black">
              <ProjectArtifact type={exp.type} />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-50 pointer-events-none" />

              {/* Floating ID */}
              <div className="absolute top-4 right-4 z-20 font-mono text-[10px] text-white/50 bg-black/50 backdrop-blur-md px-2 py-1 rounded border border-white/10 group-hover:text-lux group-hover:border-lux/30 transition-colors">
                EXP_0{exp.id}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 relative -mt-12 z-20">
              <div className="font-mono text-[10px] text-lux/80 uppercase mb-3 tracking-wider flex items-center gap-2">
                <span className="w-1 h-1 bg-lux rounded-full animate-pulse"></span>
                {exp.type}
              </div>

              <h3 className="font-serif text-2xl text-mist mb-3 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                {exp.title}
              </h3>

              <p className="font-sans text-sm text-subtle leading-relaxed group-hover:text-mist/80 transition-colors duration-300 line-clamp-3">
                {exp.description}
              </p>

              <div className="mt-6 w-full h-[1px] bg-white/5 group-hover:bg-lux/20 transition-colors duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-lux/50 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};