# Keyla-REPORT

This repository contains the documentation and report for the KEYLA-TTT project, built with VitePress.

## 📖 About

This is the official documentation and report for the KEYLA-TTT project, developed for the SPE (Software Process Engineering) exam. The website is built using VitePress and deployed to GitHub Pages.

## 🚀 Local Development

### Prerequisites

- Node.js (version 18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/Keyla-REPORT.git
cd Keyla-REPORT
```

2. Install dependencies:
```bash
npm install
```

### Development Commands

- **Start development server**:
```bash
npm run docs:dev
```
This will start a local development server, typically at `http://localhost:5173`

- **Build for production**:
```bash
npm run docs:build
```
This creates a production build in the `docs/.vitepress/dist` directory

- **Preview production build**:
```bash
npm run docs:preview
```
This serves the production build locally for testing

## 📁 Project Structure

```
docs/
├── .vitepress/
│   └── config.mts          # VitePress configuration
├── Report/                  # Main report content
│   ├── Introduction.md
│   ├── Requirements.md
│   ├── Design.md
│   ├── Implementation.md
│   ├── Deployment.md
│   ├── DevOps.md
│   ├── Technologies.md
│   ├── Conclusion.md
│   └── Resources/           # Additional resources
└── index.md                # Homepage
```

## 🌐 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow:

- Triggers on pushes to the `main` branch
- Builds the VitePress site
- Deploys to GitHub Pages at `https://your-username.github.io/Keyla-REPORT/`

### Manual Deployment

If you need to deploy manually:

1. Build the site:
```bash
npm run docs:build
```

2. The built files will be in `docs/.vitepress/dist/`

## 📝 Available Scripts

- `npm run docs:dev` - Start development server
- `npm run docs:build` - Build for production
- `npm run docs:preview` - Preview production build

## 🔧 Configuration

The VitePress configuration is located in `docs/.vitepress/config.mts`. Key settings:

- **Base path**: `/Keyla-REPORT/` (for GitHub Pages deployment)
- **Title**: "KEYLA-TTT"
- **Navigation**: Home and Report sections
- **Sidebar**: Organized by report sections

## 📚 Report Sections

The documentation includes the following sections:

- **Introduction** - Project overview and objectives
- **Requirements** - Functional and non-functional requirements
- **Design** - System architecture and design decisions
- **Implementation** - Development process and code structure
- **Deployment** - Deployment strategy and configuration
- **DevOps** - CI/CD pipeline and infrastructure
- **Technologies** - Technology stack and tools used
- **Conclusion** - Project summary and lessons learned

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run docs:dev`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.