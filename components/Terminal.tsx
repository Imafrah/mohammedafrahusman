import React from 'react';
import TypingAnimation from './TypingAnimation';
import { THEMES } from '../constants';
import type { HistoryItem, ThemeName, FormStep } from '../types';

interface TerminalProps {
    history: HistoryItem[];
    inputValue: string;
    theme: ThemeName;
    username: string;
    formStep: FormStep;
    inputRef: React.RefObject<HTMLInputElement>;
    terminalRef: React.RefObject<HTMLDivElement>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    focusInput: () => void;
}

const Terminal: React.FC<TerminalProps> = ({
    history,
    inputValue,
    theme,
    username,
    formStep,
    inputRef,
    terminalRef,
    handleInputChange,
    handleKeyDown,
    focusInput,
}) => {
    const currentTheme = THEMES[theme];
    const isCyberpunk = theme === 'cyberpunk';
    const prompt = `${username}@portfolio:~$`;

    // Define scrollbar colors based on the current theme for cross-browser compatibility
    const scrollbarTrackColor = theme === 'light' 
        ? 'rgba(0, 0, 0, 0.08)' 
        : 'rgba(255, 255, 255, 0.05)';
    const scrollbarThumbColor = currentTheme.scrollbarThumb || 'rgba(0,255,65,0.3)';
    const scrollbarThumbHoverColor = currentTheme.scrollbarThumb 
        ? `${currentTheme.scrollbarThumb}99` 
        : 'rgba(0,255,65,0.5)';

    const styles = `
        .scanline-overlay {
            background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 50%, transparent 50%);
            background-size: 100% 2px;
        }
        
        /* Custom Scrollbar Styles (for Firefox) */
        .scrollbar-styled {
            scrollbar-width: thin;
            scrollbar-color: ${scrollbarThumbColor} ${scrollbarTrackColor};
        }
        
        /* Custom Scrollbar Styles (for Webkit browsers) */
        .scrollbar-styled::-webkit-scrollbar {
            width: 8px;
        }
        .scrollbar-styled::-webkit-scrollbar-track {
            background: ${scrollbarTrackColor};
        }
        .scrollbar-styled::-webkit-scrollbar-thumb {
            background-color: ${scrollbarThumbColor};
            border-radius: 4px;
        }
        .scrollbar-styled::-webkit-scrollbar-thumb:hover {
             background-color: ${scrollbarThumbHoverColor};
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        .animate-blink {
            animation: blink 1s step-end infinite;
        }
        
        @keyframes fadeInSlideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-entry {
            animation: fadeInSlideDown 0.3s ease-out;
        }

        /* Cyberpunk Glitch Effect */
        @keyframes glitch-anim-1 {
            0% { clip-path: inset(3% 0 95% 0); } 5% { clip-path: inset(85% 0 1% 0); }
            10% { clip-path: inset(45% 0 45% 0); } 15% { clip-path: inset(90% 0 8% 0); }
            20% { clip-path: inset(25% 0 60% 0); } 25% { clip-path: inset(1% 0 90% 0); }
            30% { clip-path: inset(70% 0 20% 0); } 35% { clip-path: inset(99% 0 1% 0); }
            40% { clip-path: inset(30% 0 65% 0); } 45% { clip-path: inset(5% 0 80% 0); }
            50% { clip-path: inset(80% 0 5% 0); } 55% { clip-path: inset(20% 0 70% 0); }
            60% { clip-path: inset(60% 0 30% 0); } 65% { clip-path: inset(95% 0 3% 0); }
            70% { clip-path: inset(40% 0 50% 0); } 75% { clip-path: inset(10% 0 85% 0); }
            80% { clip-path: inset(50% 0 40% 0); } 85% { clip-path: inset(88% 0 2% 0); }
            90% { clip-path: inset(15% 0 75% 0); } 95% { clip-path: inset(75% 0 15% 0); }
            100% { clip-path: inset(55% 0 35% 0); }
        }
        @keyframes glitch-anim-2 {
            0% { clip-path: inset(95% 0 3% 0); } 10% { clip-path: inset(10% 0 80% 0); }
            20% { clip-path: inset(80% 0 5% 0); } 30% { clip-path: inset(25% 0 70% 0); }
            40% { clip-path: inset(50% 0 45% 0); } 50% { clip-path: inset(5% 0 90% 0); }
            60% { clip-path: inset(70% 0 20% 0); } 70% { clip-path: inset(90% 0 8% 0); }
            80% { clip-path: inset(40% 0 55% 0); } 90% { clip-path: inset(20% 0 75% 0); }
            100% { clip-path: inset(5% 0 90% 0); }
        }
        @keyframes glitch-main {
            0% { transform: none; } 2% { transform: translate(-2px, 2px) skew(-0.5deg); }
            4% { transform: none; } 6% { transform: translate(2px, -2px) skew(0.8deg); }
            8% { transform: none; } 48% { transform: none; }
            50% { transform: scale(1.02, 1.05) skew(0.3deg); }
            52% { transform: none; } 100% { transform: none; }
        }

        .glitch {
            position: relative;
            animation: glitch-main 4s infinite linear;
            text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #00ffff, 0 0 30px #00ffff;
        }
        .glitch::before, .glitch::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a041f; /* Hardcoded cyberpunk background */
            overflow: hidden;
        }
        .glitch::before {
            left: 2px;
            text-shadow: -1px 0 #00ffff;
            animation: glitch-anim-1 2s infinite linear alternate-reverse;
        }
        .glitch::after {
            left: -2px;
            text-shadow: -1px 0 #ff00ff, 1px 1px #00ffff;
            animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }
    `;

    return (
        <div 
            className={`w-full h-full flex flex-col relative ${currentTheme.background}`}
            onClick={focusInput}
        >
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none scanline-overlay z-10"></div>
            
            {/* Terminal Body */}
            <div 
                ref={terminalRef}
                className="flex-grow p-4 overflow-y-auto text-sm md:text-base scrollbar-styled scroll-smooth"
            >
                {history.map((item, index) => (
                    <div key={index} className="mb-2 animate-entry">
                         {item.command !== 'Welcome' && (
                             <div className="flex items-center">
                                <span 
                                    className={`${currentTheme.prompt} mr-2 ${isCyberpunk ? 'glitch' : ''}`}
                                    data-text={isCyberpunk ? prompt : undefined}
                                >
                                    {prompt}
                                </span>
                                <span className={`${currentTheme.text}`}>{item.command}</span>
                            </div>
                         )}
                        <div className={`${currentTheme.output}`}>
                            {typeof item.output === 'string' ? 
                                <TypingAnimation text={item.output} /> : 
                                item.output
                            }
                        </div>
                    </div>
                ))}

                {/* Input Line */}
                <div className="flex items-center">
                    {formStep === 'idle' ? (
                        <span 
                            className={`${currentTheme.prompt} mr-2 ${isCyberpunk ? 'glitch' : ''}`}
                            data-text={isCyberpunk ? prompt : undefined}
                        >
                            {prompt}
                        </span>
                    ) : (
                        <span className={`${currentTheme.prompt} mr-2`}>{'> '}</span>
                    )}
                    <span className={`${currentTheme.text} whitespace-pre`}>{inputValue}</span>
                    {!['sending', 'success', 'error'].includes(formStep) && (
                         <div className="animate-blink bg-green-400 w-2 h-4 inline-block"></div>
                    )}
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="absolute -left-[9999px]"
                        autoComplete="off"
                        autoFocus
                        disabled={formStep === 'sending'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Terminal;