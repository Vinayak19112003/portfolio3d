import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code2, Globe, Cpu, Terminal, Database, Layers, Workflow, LineChart, Network, Cloud, Lock } from 'lucide-react';

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
        title: "Frontend & Design",
        skills: [
            { name: "Next.js 14+", icon: <Globe size={18} /> },
            { name: "TypeScript", icon: <Code2 size={18} /> },
            { name: "Tailwind CSS", icon: <Layers size={18} /> },
            { name: "Framer Motion", icon: <Workflow size={18} /> }
        ]
    },
    {
        title: "Backend & Systems",
        skills: [
            { name: "Python / FastAPI", icon: <Terminal size={18} /> },
            { name: "Node.js / Express", icon: <Cpu size={18} /> },
            { name: "Supabase / SQL", icon: <Database size={18} /> },
            { name: "Redis / Caching", icon: <Layers size={18} /> }
        ]
    },
    {
        title: "AI & Machine Learning",
        skills: [
            { name: "XGBoost / LightGBM", icon: <Brain size={18} /> },
            { name: "LLM Integration (RAG)", icon: <Network size={18} /> },
            { name: "Vector Databases", icon: <Database size={18} /> },
            { name: "Pandas / NumPy", icon: <LineChart size={18} /> }
        ]
    },
    {
        title: "Trading & Automation",
        skills: [
            { name: "Algo Execution", icon: <LineChart size={18} /> },
            { name: "Smart Contracts", icon: <Code2 size={18} /> },
            { name: "Web3 Integration", icon: <Globe size={18} /> },
            { name: "Data Pipelines", icon: <Workflow size={18} /> }
        ]
    },
    {
        title: "Cloud & DevOps",
        skills: [
            { name: "AWS Infrastructure", icon: <Cloud size={18} /> },
            { name: "Docker / Containers", icon: <Layers size={18} /> },
            { name: "CI/CD Pipelines", icon: <Workflow size={18} /> },
            { name: "Security Best Practices", icon: <Lock size={18} /> }
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
                <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-lux mb-4">Tech Stack</h2>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-mist">
                    Production-grade <span className="text-white italic">engineering capability</span>.
                </h3>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
                {categories.map((cat, idx) => (
                    <motion.div
                        key={cat.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group"
                    >
                        {/* Category Header */}
                        <div className="flex items-center gap-2 mb-4 pl-2">
                            <div className="w-1 h-1 bg-lux rounded-full" />
                            <h4 className="font-mono text-[10px] uppercase tracking-wider text-subtle">{cat.title}</h4>
                        </div>

                        {/* List */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden hover:border-lux/20 transition-colors duration-500">
                            {cat.skills.map((skill) => (
                                <div
                                    key={skill.name}
                                    className="px-4 py-3 flex items-center gap-3 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors cursor-default group/item"
                                >
                                    <span className="text-white/40 group-hover/item:text-lux transition-colors">{skill.icon}</span>
                                    <span className="font-sans text-xs text-mist group-hover/item:text-white transition-colors">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
};
