import React from 'react';
import { motion } from 'framer-motion';

interface ResearchItem {
  topic: string;
  status: string;
}

const research: ResearchItem[] = [
  { topic: "Multi-agent AI thinking", status: "Exploring" },
  { topic: "Can AI think without language?", status: "Deep Dive" },
  { topic: "AI + Web3 value structures", status: "Conceptual" },
  { topic: "Real-time AI data dashboards", status: "Prototyping" },
  { topic: "AI + engineering automation (Tekla)", status: "Active" }
];

export const ResearchDirections: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mb-16 border-b border-white/10 pb-4"
      >
        <h2 className="font-mono text-xs uppercase tracking-widest text-subtle">Future Vision</h2>
      </motion.div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-4 font-mono text-xs uppercase text-subtle tracking-wider w-3/4">Topic</th>
              <th className="py-4 font-mono text-xs uppercase text-subtle tracking-wider w-1/4 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {research.map((item, index) => (
              <motion.tr 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group border-b border-white/5 hover:bg-white/5 transition-colors duration-300"
              >
                 <td className="py-6 font-serif text-xl text-mist italic group-hover:text-lux transition-colors pl-2">
                    {item.topic}
                 </td>
                 <td className="py-6 font-mono text-xs text-subtle text-right uppercase tracking-widest pr-2">
                    {item.status}
                 </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};