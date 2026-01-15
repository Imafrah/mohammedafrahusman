import React, { useRef, useEffect, useState } from 'react';
import { portfolioConfig } from '../constants';

// Inform TypeScript about the global VanillaTilt variable from the script tag
declare var VanillaTilt: any;

// SVG Icon Components
const GitHubIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
    </svg>
);
const LinkedInIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
    </svg>
);


const IdCard: React.FC = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(prevState => !prevState);
    };

<<<<<<< HEAD
    // Use the avatar from portfolioConfig
=======
    // Placeholder SVG Logo (Terminal Icon)
>>>>>>> 6d3b2bd2be86bb3a824d8e58140c8a9d8085ed68
    const logoSvg = portfolioConfig.avatar;

    useEffect(() => {
        const tiltElement = cardRef.current;
        if (!tiltElement) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!tiltElement) return;
            const rect = tiltElement.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            tiltElement.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            tiltElement.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        };
        
        document.addEventListener('mousemove', handleMouseMove);

        VanillaTilt.init(tiltElement, {
            reverse: false,
            max: 12,
            startX: 0,
            startY: 0,
            perspective: 1000,
            scale: 1.04,
            speed: 600,
            transition: true,
            axis: null,
            reset: true,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            glare: true,
            "max-glare": 0.15,
            "glare-prerender": false,
            gyroscope: true,
            gyroscopeMinAngleX: -45,
            gyroscopeMaxAngleX: 45,
            gyroscopeMinAngleY: -45,
            gyroscopeMaxAngleY: 45
        });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if ((tiltElement as any).vanillaTilt) {
                (tiltElement as any).vanillaTilt.destroy();
            }
        };
    }, []);

    const [titleLine1, titleLine2] = portfolioConfig.title.split('|').map(t => t.trim());

    return (
        <div 
            className="card-container" 
            tabIndex={0} 
            aria-label="Interactive 3D portfolio card, click to flip"
            onClick={handleFlip}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleFlip(); }}
        >
            <div ref={cardRef} className="tilt-card">
                <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                    
                    {/* Card Front */}
                    <div className="card-face card-front">
                        <div className="card-lighting"></div>
                        <div className="card-content">
                            <div className="lanyard-hole"></div>
                            <header className="card-header">
                                <img src={logoSvg} alt="Logo" className="logo" />
                                <span className="username">{portfolioConfig.username}</span>
                            </header>
                            <div className="card-photo-container">
                                <img src={portfolioConfig.avatar} alt={`Headshot of ${portfolioConfig.name}`} className="card-photo" />
                            </div>
                            <main className="card-main-content">
                                <h1 className="name">{portfolioConfig.name}</h1>
                                <p className="title">{titleLine1}</p>
                                <p className="title">{titleLine2}</p>
                            </main>
                            <footer className="card-footer">
                                <span className="card-badge">[Click to Flip]</span>
                            </footer>
                        </div>
                    </div>

                    {/* Card Back */}
                    <div className="card-face card-back">
                        <div className="card-lighting"></div>
                         <div className="card-back-content">
                            <h2 className="card-back-title">Details</h2>
                            <div className="skills-section">
                                <div className="skills-grid">
                                    <span className="skill-badge">React.js</span>
                                    <span className="skill-badge">Node.js</span>
                                    <span className="skill-badge">Java</span>
                                    <span className="skill-badge">Google Cloud</span>
                                </div>
                            </div>
                            <div className="socials-section">
                                <a href={portfolioConfig.socials.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub Profile">
                                    <GitHubIcon />
                                </a>
                                <a href={portfolioConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn Profile">
                                    <LinkedInIcon />
                                </a>
                            </div>
                            <div className="card-back-photo-container">
                                <img 
                                    src={portfolioConfig.avatar} 
                                    alt={`Avatar of ${portfolioConfig.name}`} 
                                    className="card-back-photo" 
                                    onError={(e) => {
                                        // Fallback to a default avatar if the image fails to load
                                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzk0LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNHptMCAyYy0yLjY3IDAtOCAxLjMzLTggNHYyaDE2di0yYzAtMi42Ny01LjMzLTQtOC00eiIvPjwvc3ZnPg==';
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                .card-container {
                    perspective: 1000px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    outline: none;
                    cursor: pointer;
                }
                .card-container:focus-visible .tilt-card {
                    box-shadow: 0 0 0 2px #0D1117, 0 0 0 4px #00FF41;
                }

                .tilt-card {
                    width: 350px;
                    height: 500px;
                    position: relative;
                    transform-style: preserve-3d;
                    transition: transform 600ms cubic-bezier(.03,.98,.52,.99), box-shadow 600ms cubic-bezier(.03,.98,.52,.99);
                    will-change: transform;
                }
                .card-container:hover .tilt-card {
                    box-shadow: 0 25px 60px rgba(0, 255, 65, 0.25);
                }

                .card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transition: transform 0.6s ease-in-out;
                    transform-style: preserve-3d;
                }
                .card-inner.is-flipped {
                    transform: rotateY(180deg);
                }

                .card-face {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    
                    background: #0a0a0a;
                    border-radius: 16px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    background-image: repeating-linear-gradient(
                        0deg,
                        rgba(255, 255, 255, 0.03),
                        rgba(255, 255, 255, 0.03) 1px,
                        transparent 1px,
                        transparent 4px
                    );
                }

                .card-back {
                    transform: rotateY(180deg);
                }

                .card-lighting {
                    position: absolute;
                    inset: 0;
                    border-radius: inherit;
                    background: radial-gradient(circle 400px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.12), transparent 50%);
                    opacity: 0;
                    transition: opacity 600ms cubic-bezier(.03,.98,.52,.99);
                    pointer-events: none;
                    z-index: 1;
                }
                 @media (pointer: fine) {
                    .card-container:hover .card-lighting {
                        opacity: 1;
                    }
                 }

                .card-content, .card-back-content {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    z-index: 2;
                }
                .card-back-content {
                    justify-content: space-around;
                }

                .lanyard-hole {
                    position: absolute;
                    top: 15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 12px;
                    height: 12px;
                    background: #fff;
                    border-radius: 50%;
                }
                
                .card-header {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 60px;
                }
                .logo { width: 32px; height: 32px; transform: translateZ(40px); border-radius: 50%; object-fit: cover; }
                .username { font-family: 'Fira Code', monospace; font-size: 12px; color: #666666; }

                .card-photo-container {
                    width: 220px;
                    height: 220px;
                    border-radius: 12px;
                    margin-top: 20px;
                    box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
                    transform: translateZ(30px);
                    /* For fallback */
                    display: grid;
                    place-items: center;
                    overflow: hidden;
                    background: #1a1a1a;
                    text-align: center;
                    color: #999;
                    font-family: 'Fira Code', monospace;
                }
                .card-photo {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 12px;
                    border: 2px solid rgba(255, 255, 255, 0.08);
                    filter: grayscale(100%);
                    transform: scale(1);
                    transition: filter 600ms cubic-bezier(.03,.98,.52,.99), transform 600ms cubic-bezier(.03,.98,.52,.99);
                     /* When image fails to load, inherit container's text color */
                    color: inherit;
                    background: transparent; /* so container bg shows through */
                }
                .card-container:hover .card-photo {
                    filter: grayscale(0%);
                    transform: scale(1.02);
                }

                .card-main-content { text-align: center; margin-top: 24px; }
                .name { font-family: 'Inter', sans-serif; font-size: 28px; font-weight: 700; color: #FFFFFF; transform: translateZ(20px); }
                .title { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; color: #888888; margin: 0; line-height: 1.5; transform: translateZ(15px); }

                .card-footer { position: absolute; bottom: 16px; right: 16px; }
                .card-badge {
                    font-family: 'Fira Code', monospace;
                    font-size: 10px;
                    text-transform: uppercase;
                    color: #00FF41;
                    letter-spacing: 0.5px;
                    transform: translateZ(10px);
                }
                
                /* Back Content Styles */
                .card-back-title {
                    font-family: 'Inter', sans-serif;
                    font-weight: 700;
                    font-size: 24px;
                    color: #FFFFFF;
                    border-bottom: 1px solid #00FF41;
                    padding-bottom: 5px;
                    margin-bottom: 15px;
                    transform: translateZ(30px);
                }

                .skills-section {
                    width: 100%;
                    text-align: center;
                    transform: translateZ(20px);
                }
                .skills-grid {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 8px;
                }
                .skill-badge {
                    background: rgba(255, 255, 255, 0.1);
                    color: #00FF41;
                    padding: 4px 10px;
                    border-radius: 12px;
                    font-size: 12px;
                    font-family: 'Fira Code', monospace;
                }

                .socials-section {
                    display: flex;
                    gap: 20px;
                    transform: translateZ(40px);
                }
                .social-link {
                    color: #FFFFFF;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                .social-link:hover { color: #00FF41; }
                .social-link svg { transition: transform 0.3s ease; }
                .social-link:hover svg { transform: scale(1.1); }
                
                .card-back-photo-container {
                    transform: translateZ(25px);
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    display: grid;
                    place-items: center;
                    background: #1a1a1a;
                    text-align: center;
                    color: #999;
                    font-size: 10px;
                    font-family: 'Fira Code', monospace;
                    overflow: hidden;
                    border: 2px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 0 15px rgba(0, 255, 65, 0.3);
                }
                .card-back-photo {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                    color: inherit;
                    background: transparent;
                }


                @media (max-width: 1024px) {
                    .tilt-card { width: 320px; height: 460px; }
                    .card-photo-container { width: 180px; height: 180px; }
                    .name { font-size: 24px; }
                    .title { font-size: 14px; }
                }
                @media (max-width: 768px) {
                    .tilt-card { width: 280px; height: 400px; }
                    .card-photo-container { width: 150px; height: 150px; margin-top: 10px; }
                    .name { font-size: 20px; }
                    .title { font-size: 12px; }
                    .card-badge { font-size: 8px; }
                    .card-lighting { display: none; }
                }

                @media (prefers-reduced-motion: reduce) {
                    .tilt-card, .card-container:hover .tilt-card, .card-photo, .card-container:hover .card-photo, .card-lighting, .card-inner, .social-link svg {
                        transition: none;
                        transform: none !important;
                    }
                    .card-inner.is-flipped { transform: none !important; } /* Stay on front for reduced motion */
                    .card-container:hover .tilt-card { box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
                    .card-container:hover .card-photo { filter: grayscale(0%); }
                }
            `}</style>
        </div>
    );
};

export default IdCard;
