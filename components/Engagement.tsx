import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, ShieldCheck, Zap, Mail } from 'lucide-react';

const valueProps = [
    {
        title: "Affordable Excellence",
        description: "High-quality engineering without the agency markup. Lean, efficient, and direct.",
        icon: <Zap size={20} className="text-lux" />
    },
    {
        title: "Flexible Engagement",
        description: "Project-based, hourly, or retainer. Adapted to your startup's specific needs.",
        icon: <Handshake size={20} className="text-lux" />
    },
    {
        title: "Long-Term Reliability",
        description: "Clean code and documentation. I build systems that are easy to maintain and scale.",
        icon: <ShieldCheck size={20} className="text-lux" />
    }
];

export const Engagement: React.FC = () => {
    return (
        <section className="py-20 md:py-32 px-6 max-w-5xl mx-auto relative z-10">

            {/* Value Props Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 border-t border-b border-white/10 py-12">
                {valueProps.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="space-y-4"
                    >
                        <div className="bg-white/5 w-10 h-10 rounded-full flex items-center justify-center border border-white/10">
                            {item.icon}
                        </div>
                        <h4 className="font-serif text-lg text-white">{item.title}</h4>
                        <p className="text-sm text-subtle leading-relaxed">{item.description}</p>
                    </motion.div>
                ))}
            </div>

            {/* Main CTA */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-lux/10 to-transparent border border-lux/20 rounded-2xl p-8 md:p-16 text-center relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-lux/5 blur-3xl rounded-full transform -translate-y-1/2" />

                <div className="relative z-10">
                    <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
                        Ready to build something <span className="text-lux italic">real</span>?
                    </h2>
                    <p className="text-mist text-lg mb-10 max-w-2xl mx-auto">
                        Let’s discuss your project. I’m currently accepting new clients for Q1 2026.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="mailto:vinayak@example.com"
                            className="px-8 py-4 bg-lux hover:bg-lux/90 text-white font-mono text-xs uppercase tracking-widest rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] flex items-center gap-3"
                        >
                            <Mail size={16} /> Contact Me
                        </a>
                        <button
                            onClick={() => window.scrollTo(0, 0)}
                            className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white font-mono text-xs uppercase tracking-widest rounded-full transition-all hover:scale-105"
                        >
                            View Work Again
                        </button>
                    </div>
                </div>
            </motion.div>

        </section>
    );
};
