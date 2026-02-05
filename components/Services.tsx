import React from 'react';
import { motion } from 'framer-motion';
import { Server, Bot, LineChart, CheckCircle2, ArrowRight } from 'lucide-react';

const services = [
    {
        title: "AI Full-Stack SaaS",
        description: "End-to-end web applications with modern architecture, secure backends, and seamless AI integration.",
        icon: <Server className="text-lux" size={24} />,
        features: ["Modern Frontend Architecture", "Scalable Backend Systems", "AI Integrations", "Production Deployment"]
    },
    {
        title: "Intelligent Automation",
        description: "Custom bots and workflows to automate repetitive tasks, scrape data, and optimize business processes.",
        icon: <Bot className="text-lux" size={24} />,
        features: ["Workflow Automation", "Data Scraping Pipelines", "Scheduled Execution", "Process Optimization"]
    },
    {
        title: "Algorithmic Trading",
        description: "High-performance infrastructure for data-driven trading, backtesting, and real-time execution.",
        icon: <LineChart className="text-lux" size={24} />,
        features: ["Strategy Backtesting", "Execution Algorithms", "Real-time Dashboards", "Performance Analytics"]
    }
];

export const Services: React.FC = () => {
    return (
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-lux mb-4">Core Competencies</h2>
                <h3 className="font-serif text-3xl md:text-5xl text-mist max-w-2xl mx-auto">
                    Transforming complex problems into <span className="text-white">intelligent software</span>.
                </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/[0.02] border border-white/5 p-8 rounded-lg hover:bg-white/[0.04] hover:border-lux/20 transition-all group"
                    >
                        <div className="mb-6 p-4 bg-white/5 rounded-full w-fit group-hover:bg-lux/10 transition-colors">
                            {service.icon}
                        </div>

                        <h4 className="font-serif text-xl text-white mb-3 group-hover:text-lux transition-colors">
                            {service.title}
                        </h4>

                        <p className="text-sm text-subtle leading-relaxed mb-6 border-b border-white/5 pb-6 min-h-[80px]">
                            {service.description}
                        </p>

                        <ul className="space-y-3">
                            {service.features.map(feature => (
                                <li key={feature} className="flex items-center gap-3 text-xs font-mono text-mist/80">
                                    <CheckCircle2 size={12} className="text-lux/70" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-16 text-center"
            >
                <p className="text-sm text-subtle font-mono mb-4">Need a custom solution?</p>
                <a href="mailto:vinayak19112003@gmail.com" className="inline-flex items-center gap-2 text-lux hover:text-white transition-colors text-sm uppercase tracking-widest border-b border-lux/30 pb-1 hover:border-white">
                    Discuss Your Project <ArrowRight size={14} />
                </a>
            </motion.div>
        </section>
    );
};
