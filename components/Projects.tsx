import React from 'react';
import { motion } from 'framer-motion';
import { Star, Github, TrendingUp, Zap } from 'lucide-react';

// --- Types ---
interface Project {
    id: number;
    title: string;
    subtitle: string;
    tags: string[];
    description?: string;
    highlights?: string[];
    stars?: number;
    image?: string;
    badge?: string;
}

// --- Data ---
const heroProjects: Project[] = [
    {
        id: 1,
        title: "Polymarket ML Trading Bot",
        subtitle: "RSI-Based Mean Reversion System",
        tags: ["Python", "FastAPI", "XGBoost", "Next.js"],
        stars: 5,
        description: "Verified profitable trading system based on 2 years of backtest data. Features a Python backend for signal processing and a Next.js dashboard for real-time monitoring.",
        highlights: ["54% Win Rate", "$650+ PnL Verified", "18,837 Trades Executed"],
        badge: "PRODUCTION ML",
        image: "https://images.unsplash.com/photo-1639322537228-ad7117a3a63b?q=80&w=1600&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "TradeZend SaaS",
        subtitle: "AI-Powered Journal for Traders",
        tags: ["Next.js 15", "Google Gemini", "Supabase", "Stripe"],
        stars: 5,
        description: "Production SaaS app helping traders analyze behavior. Uses Gemini AI to parse natural language trade notes and convert them into structured analytics.",
        highlights: ["Live Production Use", "Gemini AI Import", "PDF Reports"],
        badge: "ACTIVE SAAS",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Ultra-Fast Copy Trading Bot",
        subtitle: "Blockchain Mempool Sniper",
        tags: ["TypeScript", "0x Protocol", "AWS EC2", "WebSockets"],
        stars: 5,
        description: "High-frequency copy trading bot designed for sub-second execution. Monitors pending transactions in the mempool to front-run or copy target wallets immediately.",
        highlights: ["<100ms Latency", "AWS Deployed", "Zero-Block Lag"],
        badge: "HFT SYSTEM",
        image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1000&auto=format&fit=crop"
    }
];

const featuredProjects: Project[] = [
    {
        id: 4,
        title: "Quant Pine Script Strategy",
        subtitle: "TradingView Algo",
        tags: ["Pine Script", "Quant Finance"],
        stars: 4,
        highlights: ["60% Accuracy", "200+ Backtests"],
        image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "SpeedDex Arbitrage",
        subtitle: "DEX WebSocket Scanner",
        tags: ["Node.js", "Web3.js", "Uniswap"],
        stars: 4,
        highlights: ["Cross-DEX Arb", "Real-time Exec"],
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 6,
        title: "AWS Algo Infrastructure",
        subtitle: "Cloud Trading Setup",
        tags: ["AWS EC2", "Docker", "Nginx"],
        stars: 3,
        highlights: ["99.9% Uptime", "Auto-Scaling"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
    }
];

const additionalProjects: Project[] = [
    { id: 7, title: "Social Media Automation", subtitle: "Python Selenium Bot", tags: ["Automation", "Python"], stars: 3 },
    { id: 8, title: "Interactive 3D Portfolio", subtitle: "Three.js & Spline", tags: ["WebGL", "React"], stars: 3 },
    { id: 9, title: "Tax Calculator Tool", subtitle: "Utility Web App", tags: ["JavaScript", "Logic"], stars: 2 },
];

// --- Components ---
const StarRating = ({ count }: { count: number }) => (
    <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} className={i < count ? "fill-lux text-lux" : "fill-none text-white/20"} />
        ))}
    </div>
);

export const Projects: React.FC = () => {
    return (
        <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative z-10 space-y-16 sm:space-y-24 md:space-y-32">

            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-lux mb-4">Selected Works</h2>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-5xl text-mist">Engineering Alpha</h3>
            </motion.div>

            {/* HERO PROJECTS (TIER 1) */}
            <div className="space-y-12 sm:space-y-16 md:space-y-24">
                {heroProjects.map((project, idx) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-6 sm:gap-8 lg:gap-12 items-center group`}
                    >
                        {/* Visual */}
                        <div className="w-full lg:w-3/5 aspect-video relative rounded-lg overflow-hidden border border-white/5 bg-charcoal group-hover:border-lux/20 transition-colors duration-500 shadow-2xl shadow-black/50">
                            <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                            {project.badge && (
                                <div className="absolute top-4 left-4 z-20 bg-lux/90 text-black font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-sm shadow-lg shadow-lux/20">
                                    {project.badge}
                                </div>
                            )}
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                        </div>

                        {/* Info */}
                        <div className="w-full lg:w-2/5 space-y-4 sm:space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-xs text-lux/80">0{project.id} — FEATURED</span>
                                <StarRating count={project.stars || 5} />
                            </div>

                            <div>
                                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl text-white mb-2 group-hover:text-lux transition-colors leading-tight">{project.title}</h3>
                                <p className="font-mono text-xs text-subtle uppercase tracking-wider">{project.subtitle}</p>
                            </div>

                            <p className="text-mist/80 leading-relaxed text-sm border-l-2 border-lux/20 pl-4">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-white/60 border border-white/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-4 flex flex-col gap-2">
                                {/* Highlights */}
                                <div className="flex flex-col gap-2 text-xs font-mono text-lux">
                                    {project.highlights?.map(h => (
                                        <span key={h} className="flex items-center gap-2 bg-lux/5 py-2 px-3 rounded border border-lux/10 w-fit">
                                            <TrendingUp size={12} className="text-lux" /> {h}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* FEATURED GRID (TIER 2) */}
            <div>
                <div className="mb-12 border-b border-white/10 pb-4 flex justify-between items-end">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-white/50">Systems & Algorithms</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {featuredProjects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-charcoal/50 border border-white/5 rounded-lg overflow-hidden hover:border-lux/30 transition-all group"
                        >
                            <div className="h-40 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent z-10" />
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            <div className="p-6 relative z-20 -mt-10">
                                <div className="flex justify-between items-start mb-4">
                                    <StarRating count={project.stars || 3} />
                                    <div className="p-2 bg-black rounded-full border border-white/10"><Github size={14} className="text-white" /></div>
                                </div>

                                <h3 className="font-serif text-lg text-white mb-1 group-hover:text-lux transition-colors">{project.title}</h3>
                                <p className="text-[10px] font-mono text-subtle mb-4 uppercase">{project.subtitle}</p>

                                <ul className="text-xs text-mist/60 space-y-2 mb-4">
                                    {project.highlights?.map(h => <li key={h} className="flex items-center gap-2"><Zap size={10} className="text-lux/50" /> {h}</li>)}
                                </ul>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-[10px] text-white/40 font-mono">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ADDITIONAL LIST (TIER 3) */}
            <div className="max-w-4xl mx-auto">
                <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-8 border-b border-white/10 pb-2">Explorations & Utilities</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {additionalProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="p-4 border border-white/5 rounded bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex flex-col justify-between h-32 group"
                        >
                            <div>
                                <h4 className="font-serif text-white text-sm mb-1 group-hover:text-lux transition-colors">{project.title}</h4>
                                <p className="text-xs text-subtle font-mono">{project.subtitle}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-white/5 rounded text-white/30">{tag}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    );
};
