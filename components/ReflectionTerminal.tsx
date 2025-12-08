import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal, Loader2, Sparkles } from 'lucide-react';
import { getPhilosophicalReflection } from '../services/geminiService';
import { motion } from 'framer-motion';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export const ReflectionTerminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setLoading(true);
    setHistory(prev => [...prev, { role: 'user', content: userMsg }]);

    try {
      const response = await getPhilosophicalReflection(userMsg);
      setHistory(prev => [...prev, { role: 'ai', content: response }]);
    } catch (err) {
      setHistory(prev => [...prev, { role: 'ai', content: "The thought stream was interrupted." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, loading]);

  return (
    <section className="py-32 px-4 md:px-12 flex flex-col items-center relative z-10">
        
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-12 text-center"
      >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lux/20 bg-lux/5 mb-4">
            <Sparkles size={12} className="text-lux" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-lux">Gemini Core Active</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-mist mb-4">Interactive Reflection</h2>
          <p className="font-mono text-sm text-subtle">A dialogue with the machine mind.</p>
      </motion.div>

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl glass-panel rounded-lg shadow-2xl overflow-hidden flex flex-col h-[600px] border border-white/10"
      >
          {/* Terminal Header */}
          <div className="bg-black/50 px-4 py-3 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>
            <span className="font-mono text-[10px] text-subtle uppercase tracking-widest">neural_link_v2.sh</span>
          </div>

          {/* Terminal Body */}
          <div 
              className="flex-1 p-6 overflow-y-auto font-mono text-sm md:text-base space-y-6 scroll-smooth bg-black/80"
              ref={scrollRef}
          >
            {history.length === 0 && (
              <div className="text-subtle/40 select-none flex flex-col gap-2">
                <p>{">"} System: Online</p>
                <p>{">"} Philosophy Module: Loaded</p>
                <p>{">"} Instructions: Ask a question about logic, life, or AI.</p>
              </div>
            )}

            {history.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-lg ${msg.role === 'user' ? 'bg-lux/10 border border-lux/20 text-mist' : 'bg-white/5 border border-white/10 text-subtle'}`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="text-lux flex items-center gap-2 px-4 py-2">
                  <Terminal size={14} className="animate-pulse" />
                  <span className="text-xs animate-pulse">Analyzing logic structure...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="bg-black/90 p-4 border-t border-white/10 flex gap-4 items-center">
            <span className="text-lux font-mono">{">"}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Input query for analysis..."
              className="flex-1 bg-transparent border-none outline-none text-mist font-mono placeholder-white/20 text-sm"
              autoFocus
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="text-subtle hover:text-lux disabled:opacity-30 transition-colors"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            </button>
          </form>
        </motion.div>
    </section>
  );
};