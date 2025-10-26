# Terminal Portfolio

A modern, interactive **terminal-style portfolio** built with **TypeScript** to showcase software development skills through an engaging command-line interface. This project combines creative web design with technical depth, presenting a unique alternative to traditional GUI-based portfolios.

**Live Demo:** [mohammedafrahusman.vercel.app](https://mohammedafrahusman.vercel.app)

---

## 🌟 Features

- **Interactive Terminal Interface** - Navigate through your portfolio using realistic terminal commands
- **TypeScript-Powered** - Type-safe, modern development with full TypeScript support
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Fast Performance** - Lightweight and optimized for quick loading times
- **Developer-Focused** - Resonates with technical audiences and stands out from traditional portfolios
- **Command-Based Navigation** - Type `help` to explore all available commands
- **Modern Build Tools** - Built with Vite for fast development and production builds

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **TypeScript** | Type-safe language for robust development |
| **HTML5** | Semantic markup structure |
| **CSS3** | Styling with modern CSS features |
| **Vite** | Lightning-fast build tool and development server |
| **Vercel** | Deployment and hosting platform |

---

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `about` | Learn more about the developer |
| `skills` | View technical skills and expertise |
| `projects` | Browse portfolio projects and work examples |
| `experience` | View work experience and background |
| `education` | Display education and certifications |
| `contact` | Get contact information and social links |
| `resume` | Download or view the full resume |
| `clear` | Clear the terminal screen |
| `help` | Display all available commands |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16.0.0 or higher
- **npm** (comes with Node.js) or **yarn**
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Imafrah/mohammedafrahusman.git
cd mohammedafrahusman
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

4. **Open in your browser:**

Navigate to `http://localhost:5173` (or the port shown in terminal)

---

## 📁 Project Structure

```
mohammedafrahusman/
├── src/
│   ├── components/          # Reusable React/TS components
│   │   ├── Terminal.tsx     # Main terminal component
│   │   ├── CommandHandler.ts # Command processing logic
│   │   └── ...
│   ├── styles/              # CSS stylesheets
│   │   ├── terminal.css     # Terminal styling
│   │   ├── theme.css        # Theme configurations
│   │   └── responsive.css   # Mobile responsiveness
│   ├── data/                # Static data
│   │   ├── projects.ts      # Project information
│   │   ├── skills.ts        # Skills data
│   │   └── contact.ts       # Contact information
│   ├── types/               # TypeScript type definitions
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── index.html               # HTML template
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
├── package.json             # Project dependencies
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

---

## 🎨 Customization

### Adding Commands

1. Open `src/components/CommandHandler.ts`
2. Add your new command to the command handler:

```typescript
case 'your-command':
  return handleYourCommand();
```

3. Implement the command function:

```typescript
function handleYourCommand(): string {
  return 'Your output here';
}
```

### Updating Portfolio Data

Edit the files in `src/data/`:

- **projects.ts** - Add/update your projects
- **skills.ts** - Update your technical skills
- **contact.ts** - Update contact information

### Styling

Terminal styling can be customized in `src/styles/terminal.css`:

```css
.terminal {
  background-color: #0a0e27;
  color: #00ff88;
  font-family: 'Courier New', monospace;
}
```

---

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run type-check

# Lint code (if configured)
npm run lint
```

---

## 🌐 Deployment

This project is deployed on **Vercel** for optimal performance. To deploy your own:

### Option 1: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via Git

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel automatically deploys on every push

### Environment Variables

No environment variables required for basic functionality. If adding API integrations:

1. Create `.env.local` file
2. Add your variables:

```
VITE_API_KEY=your_api_key_here
```

3. Access in code:

```typescript
const apiKey = import.meta.env.VITE_API_KEY;
```

---

## 🔒 Performance Optimization

- **Code Splitting** - Automatic with Vite
- **Tree Shaking** - Removes unused code automatically
- **Minification** - Production builds are fully optimized
- **Caching** - Vercel CDN caches static assets
- **Lighthouse Scores** - Optimized for 90+ performance rating

---

## 🎯 Future Enhancements

- [ ] Theme switcher (dark/light/matrix/cyberpunk modes)
- [ ] Blog command with markdown support
- [ ] GitHub integration to display live repositories
- [ ] Analytics tracking
- [ ] Command autocomplete
- [ ] Animation sequences
- [ ] Easter eggs and hidden commands
- [ ] Accessibility improvements (ARIA labels)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📝 License

This project is open source and available under the **MIT License**. See the LICENSE file for more information.

---

## 📧 Contact & Social Links

- **Email:** [your-email@example.com](mailto:your-email@example.com)
- **GitHub:** [@Imafrah](https://github.com/Imafrah)
- **LinkedIn:** [Your LinkedIn Profile]
- **Twitter:** [@YourTwitterHandle]
- **Portfolio:** [mohammedafrahusman.vercel.app](https://mohammedafrahusman.vercel.app)

---

## 🙏 Acknowledgments

Special thanks to:

- The TypeScript community for excellent documentation
- Vite for incredible build performance
- Vercel for seamless deployment
- Inspiration from other terminal portfolio projects

---

## 📞 Support

If you encounter any issues or have questions:

1. Check existing [GitHub Issues](https://github.com/Imafrah/mohammedafrahusman/issues)
2. Create a new issue with detailed description
3. Include error messages and steps to reproduce
4. Specify your environment (OS, Node version, browser)

---

**Last Updated:** October 2025

**Version:** 1.0.0

---

*Created with ❤️ by Mohammed Afrah Usman*
