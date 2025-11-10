# Piyushh's Portfolio Website

A modern, responsive portfolio website built with Astro, React, and Tailwind CSS featuring smooth animations, dark mode support, and a comprehensive showcase of projects, experience, and achievements.

## Features

### 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly navigation
- Smooth scrolling navigation

### 🎨 Modern UI/UX

- Clean, minimalist design
- Dark mode support with theme switching
- Smooth animations and hover effects
- Modern typography
- Radix UI components for accessibility
- Tailwind CSS for styling

### 🚀 Sections

- **Hero**: Introduction with CTA buttons
- **About**: Personal background and highlights
- **Experience**: Work history with tech stacks
- **Projects**: Showcase with live demos and GitHub links
- **Skills**: Categorized technical skills
- **Certifications**: Professional certifications
- **Achievements**: Notable accomplishments
- **Education**: Academic background
- **Contact**: Contact information and social links

### 🔄 Enhanced Navigation

- Fixed header with scroll effects
- Smooth scroll to sections
- Active link highlighting
- Theme toggle (dark/light mode)

## Tech Stack

- **Framework**: [Astro](https://astro.build/) v5.15.1
- **UI Library**: React 19.2.0
- **Styling**: Tailwind CSS 4.1.16
- **Components**: Radix UI primitives
- **Content**: Astro Content Collections (MDX)
- **Language**: TypeScript
- **Icons**: Lucide React

## Project Structure

```
.
├── astro.config.mjs          # Astro configuration
├── package.json              # Dependencies and scripts
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── public/                   # Static assets
│   ├── favicon.ico
│   └── robots.txt
└── src/
    ├── components/           # React components
    │   ├── About.tsx
    │   ├── Achievements.tsx
    │   ├── Certifications.tsx
    │   ├── Contact.tsx
    │   ├── Education.tsx
    │   ├── Experience.tsx
    │   ├── Footer.tsx
    │   ├── Header.tsx
    │   ├── Hero.tsx
    │   ├── Index.tsx
    │   ├── Projects.tsx
    │   ├── Skills.tsx
    │   ├── theme-provider.tsx
    │   └── ui/               # Radix UI components
    ├── content/              # Content collections
    │   ├── config.ts         # Content collection schemas
    │   ├── projects/         # Project images
    │   └── site/             # MDX content files
    │       ├── about.md
    │       ├── achievements.md
    │       ├── certifications.md
    │       ├── contact.md
    │       ├── education.md
    │       ├── experience.md
    │       ├── hero.md
    │       ├── projects.md
    │       └── skills.md
    ├── pages/
    │   └── index.astro       # Main page entry point
    ├── types/
    │   └── index.ts          # TypeScript type definitions
    └── lib/
        └── utils.ts          # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Building for Production

```bash
npm run build
```

The built site will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Customization

### Updating Content

Content is managed through Astro Content Collections in the `src/content/site/` directory. Each section has its own MDX file:

- `hero.md` - Hero section content
- `about.md` - About section content
- `experience.md` - Work experience entries
- `projects.md` - Project showcase
- `skills.md` - Skills and technologies
- `certifications.md` - Professional certifications
- `achievements.md` - Achievements and awards
- `education.md` - Educational background
- `contact.md` - Contact information

### Adding Projects

Edit `src/content/site/projects.md` and add new projects to the `projects` array:

```yaml
projects:
  - title: "Project Name"
    description: "Project description"
    tech: "Tech stack"
    file: "project-image.png"  # Place image in src/content/projects/
    links:
      - type: "demo"
        url: "https://live-demo.com"
      - type: "github"
        url: "https://github.com/user/repo"
    color: "#hex-color"
```

### Modifying Theme Colors

Edit `tailwind.config.ts` to customize the color scheme and theme variables.

### Adding New Sections

1. Create a new component in `src/components/`
2. Add content file in `src/content/site/`
3. Import and add the component to `src/components/Index.tsx`
4. Update the Header navigation if needed

## Deployment

This site is configured for GitHub Pages deployment. The build process outputs static files that can be deployed to any static hosting service.

### GitHub Pages

The site automatically deploys via GitHub Actions (see `.github/workflows/pages.yml`).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.
