import React, { useEffect } from 'react';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { Projects } from './components/Projects';
import { PhilosophyQuotes } from './components/PhilosophyQuotes';
import { Capabilities } from './components/Capabilities';
import { ReflectionTerminal } from './components/ReflectionTerminal';
import { ResearchDirections } from './components/ResearchDirections';
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

            <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
                <span className="font-serif italic text-xl text-white pointer-events-auto cursor-none mix-blend-difference">VD.</span>
                <span className="font-mono text-xs text-white/50 pointer-events-auto cursor-none mix-blend-difference">AI & Trading Systems</span>
            </nav>

            <Hero />

            <div className="relative z-10">
                <Manifesto />
                <Projects />
                <PhilosophyQuotes />
                <Capabilities />
                <ReflectionTerminal />
                <ResearchDirections />
            </div>

            <Signature />
        </main>
    );
};

export default App;
