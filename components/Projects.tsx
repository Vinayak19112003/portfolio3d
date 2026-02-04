import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

import { ProjectVideo } from './ProjectVideo';

interface CaseStudy {
    id: number;
    title: string;
    subtitle: string;
    problem: string;
    solution: string;
    outcome: string;
    tools: string[];
    image: string;
    video?: string;
    badge?: string;
}

const caseStudies: CaseStudy[] = [
    {
        id: 1,
        title: "Polymarket ML Trading System",
        subtitle: "Predictive Market Arbitrage Bot",
        problem: "Inefficiencies in prediction markets allowed for arbitrage, but manual execution was too slow to capture spreads.",
        solution: "Engineered a high-frequency trading bot using XGBoost to predict outcomes and Python/FastAPI for sub-second execution logic.",
        outcome: "Achieved verified 54% win rate with $650+ profit over 18,000+ automated trades.",
        tools: ["Python", "XGBoost", "FastAPI", "Next.js Dashboard"],
        badge: "AI TRADING",
        image: "https://images.unsplash.com/photo-1639322537228-ad7117a3a63b?q=80&w=1600&auto=format&fit=crop",
        video: "/videos/polymarket-demo.mp4"
    },
    {
        id: 2,
        title: "TradeZend SaaS Platform",
        subtitle: "AI-Powered Journaling for Traders",
        problem: "Traders struggle to analyze their psychological patterns from raw journal notes.",
        solution: "Built a full-stack SaaS using Next.js and Google Gemini AI to parse natural language notes into structured behavioral analytics.",
        outcome: "Deployed production SaaS with seamless AI parsing, helping traders identify emotional biases.",
        tools: ["Next.js 15", "Google Gemini AI", "Supabase", "Stripe"],
        badge: "PRODUCTION SAAS",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Mempool Sniper Bot",
        subtitle: "Ultra-Low Latency Execution",
        problem: "Profitable on-chain opportunities disappear in milliseconds due to MEV bots.",
        solution: "Developed a Rust/TypeScript sniper monitoring the mempool via WebSockets for <100ms reaction time.",
        outcome: "Successfully front-ran transactions with zero-block lag on 0x Protocol.",
        tools: ["TypeScript", "WebSockets", "AWS EC2", "0x Protocol"],
        badge: "INFRASTRUCTURE",
        image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1000&auto=format&fit=crop"
    }
];

export const Projects: React.FC = () => {
    return (
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10 space-y-32">

            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-lux mb-4">Case Studies</h2>
                <h3 className="font-serif text-3xl md:text-5xl text-mist">Engineering Real Results</h3>
            </motion.div>

            {/* CASE STUDIES LIST */}
            <div className="space-y-32">
                {caseStudies.map((study, idx) => (
                    <motion.div
                        key={study.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center group`}
                    >
                        {/* Visual */}
                        <div className="w-full lg:w-3/5">
                            {study.video ? (
                                <ProjectVideo
                                    src={study.video}
                                    alt={study.title}
                                    poster={study.image}
                                />
                            ) : (
                                <div className="aspect-video relative rounded-lg overflow-hidden border border-white/5 bg-charcoal group-hover:border-lux/20 transition-colors duration-500 shadow-2xl shadow-black/50">
                                    <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                                    {study.badge && (
                                        <div className="absolute top-4 left-4 z-20 bg-lux/90 text-black font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-sm shadow-lg shadow-lux/20">
                                            {study.badge}
                                        </div>
                                    )}
                                    <img src={study.image} alt={study.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="w-full lg:w-2/5 space-y-8">
                            <div>
                                <h3 className="font-serif text-3xl text-white mb-2 group-hover:text-lux transition-colors leading-tight">{study.title}</h3>
                                <p className="font-mono text-xs text-subtle uppercase tracking-wider">{study.subtitle}</p>
                            </div>

                            <div className="space-y-4 border-l-2 border-lux/20 pl-6">
                                <div>
                                    <h4 className="text-xs font-mono text-lux uppercase tracking-wider mb-1">The Problem</h4>
                                    <p className="text-sm text-mist/80 leading-relaxed">{study.problem}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-mono text-lux uppercase tracking-wider mb-1">The Solution</h4>
                                    <p className="text-sm text-mist/80 leading-relaxed">{study.solution}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-mono text-lux uppercase tracking-wider mb-1">The Outcome</h4>
                                    <p className="text-sm text-white leading-relaxed font-semibold">{study.outcome}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                                {study.tools.map(tool => (
                                    <span key={tool} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-white/60 border border-white/5">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center pt-16"
            >
                <a href="https://github.com/Vinayak19112003" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-mono text-xs uppercase tracking-widest transition-all hover:scale-105">
                    View More Code on GitHub <ExternalLink size={14} />
                </a>
            </motion.div>

        </section>
    );
};
