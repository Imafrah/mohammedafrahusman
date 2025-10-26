
import React from 'react';
import { COMMANDS, AVAILABLE_THEMES, portfolioConfig, COFFEE_ART, JOKES } from '../constants';
import type { ThemeName, Project } from '../types';
import IdCard from '../components/IdCard';
import Resume from '../components/Resume';
import { getStats } from './analytics';

// SVG Icon Components
const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
    </svg>
);
const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
    </svg>
);
const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);


const renderLink = (text: string, href: string) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{text}</a>
);

// Helper function to assign an icon based on project details
const getProjectIcon = (project: Project): string => {
    const combinedText = `${project.name.toLowerCase()} ${project.description.toLowerCase()} ${project.tech.join(' ').toLowerCase()}`;
    if (combinedText.includes('iot') || combinedText.includes('esp32') || combinedText.includes('arduino') || combinedText.includes('sensor')) {
        return '🔧';
    }
    if (combinedText.includes('ai') || combinedText.includes('emotional mapping')) {
        return '🤖';
    }
    if (combinedText.includes('e-commerce') || combinedText.includes('sauce')) {
        return '🛒';
    }
    if (combinedText.includes('dashboard') || combinedText.includes('visualization')) {
        return '📊';
    }
    return '🚀';
};


export const processCommand = (command: string, setTheme: (theme: ThemeName) => void): React.ReactNode => {
    const [cmd, ...args] = command.toLowerCase().split(' ');

    switch (cmd) {
        case 'help':
            return (
                <div>
                    <p className="mb-2">Here are the available commands:</p>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1">
                        {Object.entries(COMMANDS).map(([key, value]) => (
                            <li key={key}>
                                <span className="text-green-400 w-24 inline-block">{key.padEnd(10, ' ')}</span>
                                <span className="text-gray-400">- {value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            );

        case 'about':
            return portfolioConfig.about;

        case 'experience':
            if (!portfolioConfig.experiences || portfolioConfig.experiences.length === 0) {
                return 'No work experience found.';
            }
            return (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-yellow-400 mb-4">Work Experience</h2>
                    {portfolioConfig.experiences.map((exp, index) => (
                        <div key={index} className="border-l-2 border-green-500 pl-4 py-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                                <span className="text-sm text-gray-400">{exp.company} | {exp.duration}</span>
                            </div>
                            <p className="text-gray-300 mt-1">{exp.description}</p>
                            {exp.skills && exp.skills.length > 0 && (
                                <div className="mt-2">
                                    <span className="text-sm text-gray-400">Skills: </span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {exp.skills.map((skill, i) => (
                                            <span key={i} className="bg-gray-700/50 text-cyan-300 text-xs font-medium px-2 py-0.5 rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            );

        case 'projects':
            return (
                <div>
                    {portfolioConfig.projects.map((p, i) => (
                        <div key={i} className="flex flex-col md:flex-row md:items-start gap-4 border border-gray-700 rounded-lg p-4 mb-4 bg-black/20 overflow-hidden group hover:border-green-500/50 transition-all duration-300">
                            {p.thumbnail && (
                                <div className="w-full md:w-40 flex-shrink-0 rounded-md overflow-hidden">
                                    <img 
                                        src={p.thumbnail} 
                                        alt={`${p.name} thumbnail`} 
                                        className="w-full h-32 md:h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiByeT0iMiIvPjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41Ii8+PHBvbHlsaW5lIHBvaW50cz0iMjEgMTUgMTYgMTAgNSAyMSIvPjwvc3ZnPg=='; // Image icon in base64
                                        }}
                                    />
                                </div>
                            )}
                            <div className="flex-grow flex flex-col">
                                <p className="font-bold text-yellow-400 mb-2 flex items-center text-lg">
                                    <span className="mr-2">{getProjectIcon(p)}</span>
                                    {p.name}
                                </p>
                                <p className="text-gray-300 text-sm flex-grow">{p.description}</p>
                                <div className="mt-3 mb-3 flex flex-wrap gap-2 items-center">
                                    <span className="font-semibold text-purple-400 text-sm">Tech:</span>
                                    {p.tech.map((tech, index) => (
                                        <span key={index} className="bg-gray-700/50 text-cyan-300 text-xs font-medium px-2 py-0.5 rounded-full">
                                            {tech.trim()}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-auto">
                                    {p.live && <>{renderLink('[Live Demo]', p.live)} </>}
                                    {renderLink('[GitHub]', p.repo)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
            
        case 'skills':
            return (
                <div>
                    {Object.entries(portfolioConfig.skills).map(([category, skills]) => (
                        <div key={category} className="mb-3">
                            <p className="font-bold text-cyan-400">{`// ${category}`}</p>
                            {skills.map((skill, index) => (
                                <p key={index} className="ml-4">
                                    <span className="text-gray-500">{index === skills.length - 1 ? '└──' : '├──'}</span> {skill}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            );

        case 'education':
            return (
                <div>
                    {portfolioConfig.education.split('\n').map((item, index) => {
                        const [degree, institution, dates, grade] = item.split(' | ');
                        return (
                            <div key={index} className="mb-3">
                                <p className="text-yellow-400 font-bold">
                                    <span className="text-gray-500 mr-2">◆</span>{degree}
                                </p>
                                <p className="ml-6 text-gray-300">{institution}</p>
                                <p className="ml-6 text-gray-400">{dates} <span className="text-green-400 font-semibold">| {grade}</span></p>
                            </div>
                        )
                    })}
                </div>
            );

        case 'achievements': {
            const { achievements, certifications } = portfolioConfig;
            const { technical } = certifications;
            return (
                <div>
                    <p className="font-bold mt-2 mb-2 text-yellow-400">🏅 Accomplishments & Awards:</p>
                    <ul className="list-none ml-4">
                        {achievements.map((a, i) => 
                            <li key={`ach-${i}`} className="mb-1">
                                <span className="text-gray-500 mr-2">-&gt;</span>{a}
                            </li>
                        )}
                    </ul>

                    <p className="font-bold mt-4 mb-2 text-yellow-400">📜 Technical Certifications:</p>
                    <ul className="list-none ml-4">
                        {technical.map((cert, i) => (
                            <li key={`tech-cert-${i}`} className="mb-1">
                                <span className="text-gray-500 mr-2">-&gt;</span>
                                <span className="text-green-300">{cert.name}</span>
                                {cert.issuer && <span className="text-gray-400"> - {cert.issuer}</span>}
                                {' '}
                                {renderLink('[Verify]', cert.url)}
                            </li>
                        ))}
                    </ul>

                    {certifications.industry && certifications.industry.length > 0 && (
                        <>
                            <p className="font-bold mt-4 mb-2 text-yellow-400">🏢 Industry Certifications & Recognitions:</p>
                            <ul className="list-none ml-4">
                                {certifications.industry.map((cert, i) => (
                                    <li key={`ind-cert-${i}`} className="mb-1">
                                        <span className="text-gray-500 mr-2">-&gt;</span>
                                        <span className="text-green-300">{cert.name}</span>
                                        {cert.issuer && <span className="text-gray-400"> - {cert.issuer}</span>}
                                        {' '}
                                        {cert.url && renderLink('[View]', cert.url)}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    
                    <p className="mt-6 text-gray-400 italic">For a complete list, please check my LinkedIn profile (run 'contact').</p>
                </div>
            );
        }
        
        case 'contact':
            return (
                <div>
                    <p>You can reach me via:</p>
                    <div className="flex flex-col space-y-3 mt-3 ml-4">
                        <a href={`mailto:${portfolioConfig.email}`} target="_blank" rel="noopener noreferrer" className="flex items-center group w-fit">
                            <MailIcon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-green-400 transition-colors" />
                            <span className="text-blue-400 group-hover:underline">{portfolioConfig.email}</span>
                        </a>
                        <a href={portfolioConfig.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center group w-fit">
                            <GitHubIcon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-white transition-colors" />
                            <span className="text-blue-400 group-hover:underline">GitHub Profile</span>
                        </a>
                        <a href={portfolioConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center group w-fit">
                            <LinkedInIcon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            <span className="text-blue-400 group-hover:underline">LinkedIn Profile</span>
                        </a>
                    </div>
                    <p className="mt-4">You can also send me a direct message by typing the 'message' command.</p>
                </div>
            );
        
        case 'resume':
            return <Resume />;

        case 'idcard':
            return <IdCard />;
        
        case 'stats': {
            const stats = getStats();
            if (!stats) {
                return "Analytics data not available. This is the first session!";
            }
            return (
                <div>
                    <pre className="text-yellow-400 text-center mb-2">
{`
╔═════════════════════════╗
║     VISITOR STATS       ║
╚═════════════════════════╝
`}
                    </pre>
                    <p><span className="text-cyan-400">Total Visitors:</span> {stats.totalVisitors}</p>
                    <p><span className="text-cyan-400">Visitors Today:</span> {stats.todayVisitors}</p>
                    <p><span className="text-cyan-400">Avg. Session:</span> {stats.avgSessionTime}</p>
                    <br/>
                    <p className="text-cyan-400">Top 5 Commands:</p>
                    {stats.popularCommands.length > 0 ? (
                        <ul className="list-none pl-4">
                            {stats.popularCommands.map(([cmd, count], i) => (
                                <li key={cmd}>
                                    <span className="text-gray-500">{i + 1}.</span> {cmd}
                                    <span className="text-gray-400"> ({count} uses)</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="pl-4">No commands used yet in this session.</p>
                    )}
                </div>
            );
        }
        
        // Easter eggs
        case 'sudo':
            return 'Permission denied. Nice try! 😄';
        
        case 'exit':
            return "You can't exit the matrix. Just kidding! Close the tab when you're done. 😉";
        
        case 'hack':
            return "Hacking the mainframe... 💻 Access granted! Just kidding, your data is safe.";

        case 'coffee':
            return <pre>{COFFEE_ART}</pre>;
        
        case 'joke':
            const randomIndex = Math.floor(Math.random() * JOKES.length);
            return JOKES[randomIndex];

        case 'theme':
            const themeName = args[0] as ThemeName;
            
            if (!themeName) {
                return (
                    <div>
                        <p>Usage: theme [name]</p>
                        <p>Available themes: {AVAILABLE_THEMES.join(', ')}</p>
                    </div>
                );
            }

            if (AVAILABLE_THEMES.includes(themeName)) {
                setTheme(themeName);
                return <p>Theme changed to <span className="capitalize">{themeName}</span>.</p>;
            }
            return `Invalid theme. Available themes: ${AVAILABLE_THEMES.join(', ')}.`;

        default:
            return `Command not found: '${command}'. Type 'help' for a list of commands.`;
    }
};
