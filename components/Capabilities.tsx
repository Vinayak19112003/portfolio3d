import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code2, Globe, Cpu, Terminal, Database, Layers, Workflow, LineChart, Network } from 'lucide-react';

interface Skill {
    name: string;
    icon: React.ReactNode;
}

interface Category {
    title: string;
    skills: Skill[];
}

const categories: Category[] = [
    {
        title: "AI & Data Science",
        skills: [
            { name: "XGBoost / LightGBM", icon: <Brain size={18} /> },
            { name: "Pandas / NumPy", icon: <Database size={18} /> },
            { name: "RAG Systems", icon: <Network size={18} /> },
            { name: "Prompt Eng.", icon: <Code2 size={18} /> }
        ]
    },
    {
        title: "Algo Trading & Web3",
        skills: [
            { name: "Pine Script", icon: <LineChart size={18} /> },
            { name: "Web3.py / Ethers", icon: <Globe size={18} /> },
            { name: "0x Protocol / Uniswap", icon: <Cpu size={18} /> },
            { name: "Solidity", icon: <Code2 size={18} /> }
        ]
    },
    {
        title: "Full Stack Engineering",
        skills: [
            { name: "Python / FastAPI", icon: <Terminal size={18} /> },
            { name: "Next.js / React", icon: <Globe size={18} /> },
            { name: "Node.js", icon: <Cpu size={18} /> },
            { name: "Tailwind CSS", icon: <Layers size={18} /> }
        ]
    },
    {
        title: "Infrastructure & Ops",
        skills: [
            { name: "AWS EC2 / Lambda", icon: <Network size={18} /> },
            { name: "Docker / CI/CD", icon: <Layers size={18} /> },
            { name: "WebSockets", icon: <Workflow size={18} /> },
            { name: "Selenium", icon: <Terminal size={18} /> }
        ]
    }
];

export const Capabilities: React.FC = () => {
    return (
        <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mb-10 sm:mb-16 md:mb-20 text-center max-w-2xl mx-auto"
            >
                <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-lux mb-4">The Toolkit</h2>
                <p className="font-serif text-xl sm:text-2xl md:text-4xl text-mist">
                    Architecting alpha with <span className="text-white italic">precision tools</span>.
                </p>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {categories.map((cat, idx) => (
                    <motion.div
                        key={cat.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group"
                    >
                        {/* Category Header */}
                        <div className="flex items-center gap-3 mb-6 pl-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-lux/50 group-hover:bg-lux group-hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all" />
                            <h3 className="font-mono text-xs uppercase tracking-widest text-subtle group-hover:text-mist transition-colors">{cat.title}</h3>
                        </div>

                        {/* List */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden hover:border-lux/20 transition-colors duration-500">
                            {cat.skills.map((skill) => (
                                <div
                                    key={skill.name}
                                    className="px-4 py-4 flex items-center gap-3 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors cursor-default group/item"
                                >
                                    <span className="text-white/40 group-hover/item:text-lux transition-colors">{skill.icon}</span>
                                    <span className="font-sans text-sm text-mist group-hover/item:text-white transition-colors">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
};
