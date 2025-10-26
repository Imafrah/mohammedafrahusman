import React, { useState, useEffect } from 'react';
import Terminal from './components/Terminal';
import IdCard from './components/IdCard';
import { useTerminal } from './hooks/useTerminal';
import { portfolioConfig, THEMES } from './constants';
import { initAnalytics, trackSessionEnd } from './utils/analytics';
import type { ThemeName } from './types';

// SVG Icon components
const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);


const App: React.FC = () => {
    const [isBooting, setIsBooting] = useState(true);
    const terminalControls = useTerminal();
    const { theme, setTheme } = terminalControls;
    const [lastDarkTheme, setLastDarkTheme] = useState<ThemeName>('matrix');

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Initialize analytics on first load
        initAnalytics();

        // Update document title and meta tags
        document.title = `${portfolioConfig.name} | Terminal Portfolio`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', `Welcome to the interactive terminal portfolio of ${portfolioConfig.name}. Type 'help' to explore skills, projects, and experience.`);
        }
        
        const bootTimer = setTimeout(() => setIsBooting(false), 500); // Faster boot
        const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);
        
        // Add session tracking for when the user leaves
        const handleBeforeUnload = () => {
            trackSessionEnd();
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            clearTimeout(bootTimer);
            clearInterval(clockTimer);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // Effect to update body background color when theme changes
    useEffect(() => {
        const themeBgClass = THEMES[theme].background;
        document.body.className = themeBgClass;
    }, [theme]);

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme(lastDarkTheme);
        } else {
            setLastDarkTheme(theme);
            setTheme('light');
        }
    };

    const formattedTime = currentTime.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });
    
    const currentTheme = THEMES[theme];
    const headerBorder = currentTheme.border || 'border-transparent';
    const footerBorder = currentTheme.border || 'border-transparent';
    const terminalBorder = currentTheme.border || 'border-transparent';

    return (
        <div className={`min-h-screen flex flex-col font-mono ${currentTheme.text}`}>
            {/* Header */}
            <header className={`flex-shrink-0 px-4 py-2 border-b ${headerBorder} flex items-center justify-between`}>
                <div>
                    <h1 className={`text-xl font-bold ${currentTheme.prompt}`}>{portfolioConfig.name}</h1>
                    <p className="text-sm text-gray-400">{portfolioConfig.title}</p>
                </div>
                 <button 
                    onClick={toggleTheme}
                    className={`p-2 rounded-full transition-colors duration-200 ${theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-white/10'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent ${theme === 'light' ? 'focus:ring-gray-500' : 'focus:ring-white'}`}
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' 
                        ? <MoonIcon className="h-5 w-5 text-gray-800" /> 
                        : <SunIcon className="h-5 w-5 text-yellow-300" />
                    }
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-y-auto lg:overflow-hidden">
                {/* Left Panel - ID Card */}
                <div className="flex flex-col items-center justify-center lg:flex-1 lg:justify-start lg:pt-16 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gray-700/50 hidden lg:block"></div>
                     <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4 h-6 bg-gray-600 rounded-b-md shadow-inner hidden lg:block"></div>
                    <IdCard />
                </div>

                {/* Right Panel - Terminal */}
                <div className={`flex-1 lg:flex-[2] w-full border ${terminalBorder} min-h-[60vh] lg:min-h-0`}>
                    { isBooting ? <BootScreen /> : <Terminal {...terminalControls} username={portfolioConfig.username} /> }
                </div>
            </main>

            {/* Footer */}
            <footer className={`flex-shrink-0 px-4 py-1 border-t ${footerBorder} flex justify-between items-center text-xs ${currentTheme.prompt}`}>
                <div className="flex items-center">
                    <span className={currentTheme.prompt}>{`${portfolioConfig.username}@portfolio:~$`}</span>
                </div>
                <p>{formattedTime}</p>
            </footer>
        </div>
    );
};

const BootScreen: React.FC = () => (
    <div className="text-green-400 text-lg p-4 animate-pulse h-full flex flex-col justify-center items-center">
        <p>Booting Portfolio OS...</p>
        <p>Loading modules... [OK]</p>
    </div>
);

export default App;