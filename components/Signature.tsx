import React from 'react';
import { motion } from 'framer-motion';

export const Signature: React.FC = () => {
  return (
    <footer className="py-32 px-6 bg-obsidian relative overflow-hidden flex flex-col items-center justify-center text-center border-t border-white/5 z-10">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-2xl mb-16"
      >
        <p className="font-serif text-2xl md:text-3xl text-mist leading-relaxed mb-12">
          “I don’t want AI to think like humans.<br />
          <span className="italic text-subtle">I want AI to help humans think better.</span>”
        </p>
        <div className="w-16 h-[1px] bg-white/20 mx-auto"></div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left bg-white/5 backdrop-blur-sm p-12 border border-white/10 rounded-xl">
            <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-subtle mb-4">Identity</h3>
                <p className="font-serif text-xl text-white">Vinayak Deshmuk</p>
                <p className="font-mono text-sm text-subtle mt-2">Logic Craftsman</p>
            </div>
            
            <div className="md:text-right">
               <h3 className="font-mono text-xs uppercase tracking-widest text-subtle mb-4">Connect</h3>
               <div className="flex flex-col md:items-end gap-2 font-mono text-sm text-mist underline underline-offset-4">
                  <a href="https://github.com/Vinayak19112003" target="_blank" rel="noopener noreferrer" className="hover:text-lux transition-colors">GitHub</a>
                  <a href="https://twitter.com/Vinayak191120" target="_blank" rel="noopener noreferrer" className="hover:text-lux transition-colors">X (Twitter)</a>
               </div>
            </div>
        </div>
      </motion.div>
      
      <div className="mt-24 font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">
         © {new Date().getFullYear()} · Designed in the Latent Space
      </div>
    </footer>
  );
};