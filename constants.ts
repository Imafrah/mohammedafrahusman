
import type { Project, SkillCategory, Themes, ThemeName, Certification, Experience } from './types';

interface PortfolioConfig {
    name: string;
    username: string;
    // NOTE: To update the name in the ASCII art, you'll need to edit it manually below.
    title: string;
    email: string;
    avatar: string;
    resumeUrl: string;
    socials: {
        github: string;
        linkedin: string;
    };
    about: string;
    education: string;
    achievements: string[];
    certifications: {
        technical: Certification[];
        industry: Certification[];
    };
    skills: SkillCategory;
    projects: Project[];
    experiences: Experience[];
}

// NOTE: Add your EmailJS credentials here to enable the 'message' command.
// You can get these from your EmailJS account dashboard.
export const emailjsConfig = {
    serviceId: 'service_72k1ld6', // Replace with your EmailJS Service ID
    templateId: 'template_z977mbk', // Replace with your EmailJS Template ID
    publicKey: 'OFQO7WCajfOnlEDLi' // Replace with your EmailJS Public Key
};

export const portfolioConfig: PortfolioConfig = {
    name: "Mohammed Afrah Usman",
    username: "imafrah",
    title: "Computer Science Student | Full-Stack Developer",
    email: "imafrah03@gmail.com",
    avatar: '/Profile.jpeg',
    resumeUrl: '/Mohammed_Afrah_Usman_resume.pdf', // Direct path to resume in public folder
    socials: {
        github: "https://github.com/Imafrah",
        linkedin: "https://www.linkedin.com/in/mohammed-afrah-usman-6bb087294/",
    },
    about: "Driven by curiosity and creativity, I'm a Computer Science student passionate about crafting seamless web experiences and AI powered solutions.Proficient in JavaScript, React, and Python, I transform ideas into interactive, real world applications.I thrive on tackling tough coding challenges and excelling in fast paced hackathon environments.Collaborative and detail-oriented, I'm committed to continuous learning and innovation.My mission is to build technology that inspires, connects, and makes an impact.",
    education: "B.E in Computer Science and Engineering | Manglore Institute of Technology And Engineering | 2023 - 2027 | CGPA: 8.5/10\nPre University College (PCMC) | Saint Mary's Syrian PU College | 2021 - 2023 | Percentage: 93% /100",
    achievements: [
        "🏆 Google Cloud Arcade Facilitator (Champions Tier), Jul-Dec 2024: Recognized for completing hands-on labs and earning 78 Arcade Points.",
        "🏆 Hack Heist 2.0: Top 7 Ranked (Mangalore Institute of Technology)",
        "☁️ Google Cloud Arcade: Earned 78 points, demonstrating cloud proficiency.",
        "💻 Competitive Programming: Solved 50+ problems on platforms like LeetCode and HackerRank.",
        "🎤 Tech Speaker: Presented on CSPRNG algorithms and Cloudflare encryption.",
        "🚀 SIH Hackathon : Our team was shortlisted for the national level Smart India Hackathon (SIH) after excelling in the internal SIH hackathon competition."
    ],
    certifications: {
        technical: [
            { name: 'Postman API Fundamentals Student Expert', issuer: 'Postman', url: 'https://badgr.com/public/assertions/vMp5QwdiS3CSiip684pu_A' },
            { name: 'UiPath Academy Automation Explorer Training', issuer: 'UiPath', url: 'https://credentials.uipath.com/0f19b966-a42d-46dd-8c7e-115217a0c2f5#acc.xsU6HKIF' },
            { name: 'Figma Essential for User Interface and User Experience UI UX ', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-a0c94401-bbaf-4e79-a867-770c90e19172/' },
            { name: 'OpenCV Bootcamp', issuer: 'OpenCV University', url: 'https://courses.opencv.org/certificates/52dc7abe8fc54773900d5d20cdd1f153' },
        ],
        industry: [
            { name: 'Selected as a LetsUpgrade Ambassador, promoting learning and technology engagement within the community.', url: 'https://letsupgrade.in/user/imafrah03886' },
        ]
    },
    skills: {
        "Languages": ["JavaScript (Advanced)", "TypeScript (Advanced)", "Python (Intermediate)", "Java (Advanced)", "C (Beginner)"],
        "Frontend": ["React.js (Advanced)", "HTML5/CSS3 (Advanced)", "Tailwind CSS (Advanced)", "Figma (Intermediate)"],
        "Backend & Tools": ["Node.js (Intermediate)", "Firebase (Advanced)", "Supabase (Intermediate)", "MongoDB (Beginner)", "MySQL (Intermediate)", "Git/GitHub (Advanced)", "Google Cloud (Intermediate)", "Vercel (Advanced)"],
        "Hardware & IoT": ["Arduino (Intermediate)", "ESP32 (Intermediate)", "Sensor Integration (Intermediate)"],
        "Productivity & Collaboration": ["Notion (Advanced)", "Jira (Intermediate)"],
    },
    experiences: [
        {
            role: "Web Development Intern",
            company: "Suvidha Foundation",
            duration: "Oct 2025 - Nov 2025",
            description: "Working on Web-based Natural Language Processing and Natural Language Generation research tasks, focusing on clean implementation, documentation, and originality under mentor guidance.",
            skills: ["Web Development", "NLP", "Research", "Documentation"]
        }
    ],
    projects: [
        {
            name: "Imchef E-commerce Website",
            tech: ["React", "EmailJS", "Tailwind CSS", "Vercel"],
            description: "Full-featured e-commerce platform with order confirmation.",
            live: "https://imchef.vercel.app/",
            repo: "https://github.com/Imafrah/Imchef",
            thumbnail: new URL('./public/imchef-thumbnail.png', import.meta.url).href,
        },
        {
            name: "Virtual AirBoard",
            tech: ["Python", "OpenCV", "MediaPipe", "NumPy", "python-dotenv", "Google Gemini API", "GitHub"],
            description: "AirBoard is an AI-powered touchless whiteboard that enables seamless drawing, writing, and interaction through real-time hand gestures and intelligent virtual controls.",
            live: "https://drive.google.com/file/d/1hh5XJyJQvB7Sji-sXvyqSpeBt-LquMPo/view?usp=sharing",
            repo: "https://github.com/Imafrah/Virtual_Board",
            thumbnail: new URL('./public/Virtual_Air_Board.png', import.meta.url).href,
        },
        {
            name: "Lazarev",
            tech: ["HTML5 ", "CSS3 ", "JavaScript", "GSAP"],
            description: "This project is a frontend recreation of the Lazarev Agency website, built purely with HTML, CSS, and JavaScript.The goal was to replicate its modern design, smooth animations, and interactive user experience as a practice project to improve my frontend development skills.",
            live: "https://imafrah.github.io/LAZAREV/",
            repo: "https://github.com/Imafrah/LAZAREV",
            thumbnail: new URL('./public/lazarev-thumbnail.png', import.meta.url).href,
        },
        {
            name: "Bookit",
            tech: ["React.js", "Tailwind CSS", "Vite", "TypeScript", "Node.js", "Express.js", "MySQL", "Git", "Vercel + Render"],
            description: "BookIt is a full-stack adventure booking platform that lets users discover curated experiences, check real-time availability, apply promo codes, and book seamlessly through a cloud deployed web app.",
            live: "https://bookit-sable-seven.vercel.app/",
            repo: "https://github.com/Imafrah/Bookit",
            thumbnail: new URL('./public/Bookit.png', import.meta.url).href,
        },
        {
            name: "Family Golf",
            tech: ["HTML5 ", "CSS3 ", "JavaScript", "GSAP"],
            description: "Practice recreating real-world website designs.",
            live: "https://imafrah.github.io/Family-Golf/",
            repo: "https://github.com/Imafrah/Family-Golf",
            thumbnail: new URL('./public/family-golf-thumbnail.png', import.meta.url).href,
        },
        {
            name: "Duolingo Inspired Language Learning App",
            tech: ["Figma", "Notion", "Adobe XD"],
            description: "This was more than just a UI/UX exercise it was a lesson in how design can change behavior.",
            live: "https://www.figma.com/proto/mfI7uKiczgOu624sNs24pI/Duolingo-Prototype-Lesson?node-id=0-1&t=28EpJtgR3HpgSm30-1",
            repo: "https://www.figma.com/community/file/1455151900701304952/duolingo-clone-app",
            thumbnail: new URL('./public/duolingo-thumbnail.jpg', import.meta.url).href,
        },
        {
            name: "Currency Converter 💱",
            tech: ["HTML", "CSS", "JavaScript", "API"],
            description: "A simple web app that allows users to convert between different currencies using real time exchange rates.",
            live: "https://imafrah.github.io/Projects/Courrency/",
            repo: "https://github.com/Imafrah/Projects/tree/main/Courrency",
            thumbnail: new URL('./public/currency-converter-thumbnail.png', import.meta.url).href,
        },
        {
            name: "To-Do List 📋",
            tech: ["HTML", "CSS", "JavaScript"],
            description: "A sleek and interactive to-do list app that helps users organize their daily tasks.",
            live: "https://imafrah.github.io/Projects/To-do-List/",
            repo: "https://github.com/Imafrah/Projects/tree/main/To-do-List",
            thumbnail: new URL('./public/todo-list-thumbnail.png', import.meta.url).href,
        },
    ],
};

export const ASCII_ART = `
███╗   ███╗ ██████╗ ██╗  ██╗ █████╗ ███╗   ███╗███╗   ███╗███████╗██████╗ 
████╗ ████║██╔═══██╗██║  ██║██╔══██╗████╗ ████║████╗ ████║██╔════╝██╔══██╗
██╔████╔██║██║   ██║███████║███████║██╔████╔██║██╔████╔██║█████╗  ██║  ██║
██║╚██╔╝██║██║   ██║██╔══██║██╔══██║██║╚██╔╝██║██║╚██╔╝██║██╔══╝  ██║  ██║
██║ ╚═╝ ██║╚██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║██║ ╚═╝ ██║███████╗██████╔╝
╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ╚═╝╚══════╝╚═════╝ 
                                                                          
 █████╗ ███████╗██████╗  █████╗ ██╗  ██╗                                  
██╔══██╗██╔════╝██╔══██╗██╔══██╗██║  ██║                                  
███████║█████╗  ██████╔╝███████║███████║                                  
██╔══██║██╔══╝  ██╔══██╗██╔══██║██╔══██║                                  
██║  ██║██║     ██║  ██║██║  ██║██║  ██║                                  
╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝                                  
                                                                          
██╗   ██╗███████╗███╗   ███╗ █████╗ ███╗   ██╗                            
██║   ██║██╔════╝████╗ ████║██╔══██╗████╗  ██║                            
██║   ██║███████╗██╔████╔██║███████║██╔██╗ ██║                            
██║   ██║╚════██║██║╚██╔╝██║██╔══██║██║╚██╗██║                            
╚██████╔╝███████║██║ ╚═╝ ██║██║  ██║██║ ╚████║                            
 ╚═════╝ ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝                            

`;

export const COFFEE_ART = `
          ( (
         ) )
      .........
      |       |]
      \\       /
       \`-----'
`;

export const JOKES = [
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "I would tell you a UDP joke, but you might not get it.",
    "There are 10 types of people in the world: those who understand binary, and those who don't.",
    "Why was the JavaScript developer sad? Because he didn't Node how to Express himself.",
    "What's the object-oriented way to become wealthy? Inheritance."
];

export const WELCOME_MESSAGES = [
    "Welcome to my interactive terminal portfolio!",
    "Type 'help' to see the full list of available commands."
];

export const COMMANDS: { [key: string]: string } = {
    help: "Display all available commands",
    about: "Learn more about me",
    experience: "View my professional experience",
    projects: "View my recent projects",
    skills: "See my technical skills",
    education: "My academic background",
    achievements: "My accomplishments and certifications",
    contact: "Find ways to connect with me",
    resume: "Display my resume summary & download link",
    message: "Send me a message directly from the terminal",
    idcard: "Display an interactive 3D ID card",
    stats: "View visitor and usage statistics",
    theme: "Switch color themes (e.g., 'theme matrix')",
    clear: "Clear the terminal screen",
    // Easter eggs
    sudo: "Request admin privileges",
    exit: "Exit the terminal session",
    hack: "Simulate a security breach",
    coffee: "Request a virtual coffee break",
    joke: "Get a random programmer joke",
};

export const THEMES: Themes = {
    matrix: {
        background: 'bg-[#0D1117]',
        prompt: 'text-[#00FF41]',
        text: 'text-white',
        output: 'text-white',
        scrollbarThumb: '#00A32E',
        border: 'border-green-900/50',
    },
    ubuntu: {
        background: 'bg-[#2C001E]',
        prompt: 'text-[#F67422]',
        text: 'text-white',
        output: 'text-white',
        scrollbarThumb: '#F67422',
        border: 'border-orange-800/50',
    },
    dracula: {
        background: 'bg-[#282a36]',
        prompt: 'text-[#bd93f9]',
        text: 'text-[#f8f8f2]',
        output: 'text-[#f8f82]',
        scrollbarThumb: '#bd93f9',
        border: 'border-purple-800/50',
    },
    solarized: {
        background: 'bg-[#002b36]',
        prompt: 'text-[#268bd2]',
        text: 'text-[#839496]',
        output: 'text-[#93a1a1]',
        scrollbarThumb: '#268bd2',
        border: 'border-blue-800/50',
    },
    nord: {
        background: 'bg-[#2E3440]',
        prompt: 'text-[#88C0D0]',
        text: 'text-[#E5E9F0]',
        output: 'text-[#D8DEE9]',
        scrollbarThumb: '#88C0D0',
        border: 'border-cyan-800/50',
    },
    gruvbox: {
        background: 'bg-[#282828]',
        prompt: 'text-[#fabd2f]',
        text: 'text-[#ebdbb2]',
        output: 'text-[#d5c4a1]',
        scrollbarThumb: '#fabd2f',
        border: 'border-yellow-800/50',
    },
    cyberpunk: {
        background: 'bg-[#0a041f]',
        prompt: 'text-[#ff00ff]',
        text: 'text-[#00ffff]',
        output: 'text-[#00ffff]',
        scrollbarThumb: '#00ffff',
        border: 'border-fuchsia-800/50',
    },
    light: {
        background: 'bg-white border border-gray-200',
        prompt: 'text-blue-700 font-medium',
        text: 'text-gray-900',
        output: 'text-gray-800',
        scrollbarThumb: '#4b5563',
        border: 'border-gray-300',
    }
};

export const AVAILABLE_THEMES: ThemeName[] = ['matrix', 'ubuntu', 'dracula', 'solarized', 'nord', 'gruvbox', 'cyberpunk', 'light'];
