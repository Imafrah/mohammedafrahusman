import React from 'react';
import { portfolioConfig } from '../constants';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-3">
        <p className="text-blue-600 dark:text-cyan-400 font-bold mb-1">
            <span className="text-gray-600 dark:text-gray-400">#</span> {title}
        </p>
        <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 text-gray-800 dark:text-white/90">
            {children}
        </div>
    </div>
);

const Resume: React.FC = () => {
    const handleDownload = async () => {
        try {
            // Direct path to the resume in the public folder
            const resumePath = '/Mohammed_Afrah_Usman_resume.pdf';
            
            // Fetch the file as a blob
            const response = await fetch(resumePath);
            if (!response.ok) {
                throw new Error('Failed to fetch resume');
            }
            
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            
            // Create a temporary link
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'Mohammed_Afrah_Usman_Resume.pdf';
            link.target = '_blank'; // Open in a new tab if download fails
            
            // Append to body, click, and clean up
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(blobUrl);
            }, 100);
            
        } catch (error) {
            console.error('Error downloading resume:', error);
            alert('Failed to download resume. You can also download it directly from here: /Mohammed_Afrah_Usman_resume.pdf');
        }
    };

    return (
        <div className="p-2 text-gray-800 dark:text-gray-200">
            <pre className="text-green-400 text-center mb-4">
{`
╔══════════════════════════════════════════╗
║              RESUME SUMMARY              ║
╚══════════════════════════════════════════╝
`}
            </pre>

            <Section title="Education">
                <div className="whitespace-pre-line">{portfolioConfig.education}</div>
            </Section>

            <Section title="Top Projects">
                <ul className="list-none">
                    {portfolioConfig.projects.slice(0, 3).map((project, index) => (
                        <li key={index} className="mb-1">
                            <span className="text-purple-600 dark:text-purple-400 font-medium">{project.name}</span>
                            <span className="text-gray-700 dark:text-gray-300"> - {project.description}</span>
                        </li>
                    ))}
                </ul>
            </Section>

            <Section title="Achievements">
                <ul className="list-disc list-inside">
                    {portfolioConfig.achievements.slice(0, 3).map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                    ))}
                </ul>
            </Section>

            <div 
                onClick={handleDownload} 
                className="mt-6 p-2 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-md inline-block cursor-pointer hover:bg-blue-100 dark:hover:bg-green-900/50 transition-colors duration-200"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleDownload(); }}
                aria-label="Download full resume"
            >
                <span className="text-green-600 dark:text-green-400">{portfolioConfig.username}@portfolio:~$</span>
                <span className="text-gray-800 dark:text-white ml-2 animate-pulse">./download_resume.pdf</span>
            </div>
        </div>
    );
};

export default Resume;