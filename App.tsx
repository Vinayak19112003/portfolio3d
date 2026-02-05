import React, { useEffect } from 'react';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Capabilities } from './components/Capabilities';
import { Engagement } from './components/Engagement';
import { Signature } from './components/Signature';
import SplineBackground from './components/SplineBackground';

const App: React.FC = () => {
    // Force scroll to top on page load/refresh
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="w-full min-h-screen bg-obsidian text-mist selection:bg-lux selection:text-white cursor-none">
            <SplineBackground />

            <nav className="fixed top-0 left-0 w-full px-4 py-4 md:p-6 flex justify-between items-center z-50 pointer-events-none bg-gradient-to-b from-obsidian/80 to-transparent">
                <span className="font-serif italic text-lg md:text-xl text-white pointer-events-auto cursor-none mix-blend-difference">VD.</span>
                <span className="hidden sm:block font-mono text-xs text-white/50 pointer-events-auto cursor-none mix-blend-difference">Automation & SaaS</span>
            </nav>

            <Hero />

            <div className="relative z-10">
                <Services />
                <Projects />
                <Capabilities />
                <Engagement />
            </div>

            <Signature />
        </main>
    );
};

export default App;
