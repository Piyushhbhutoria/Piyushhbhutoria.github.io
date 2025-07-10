# Piyushh's Portfolio Website

A modern, responsive portfolio website built with Hugo and a custom theme featuring smooth animations and a projects showcase.

## Features

### 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly navigation
- Smooth scrolling navigation

### 🎨 Modern UI/UX

- Clean, minimalist design
- Smooth animations and hover effects
- AOS (Animate On Scroll) integration
- Modern typography with Inter font
- Gradient backgrounds and shadows

### 🚀 Projects Section

- Showcase of personal projects
- GitHub and live demo links
- Technology stack display
- Responsive grid layout
- Hover effects with project details

### 🔄 Enhanced Navigation

- Fixed header with scroll effects
- Smooth scroll to sections
- Active link highlighting
- Scroll-to-top button

## Structure

```
.
├── config.toml              # Hugo configuration
├── data/
│   ├── index.yml           # Main content data
│   └── contact.yml         # Contact information
├── themes/imidiotic/
│   ├── layouts/
│   │   ├── index.html      # Main page template
│   │   └── partials/       # Reusable components
│   └── static/
│       ├── css/            # Compiled CSS
│       ├── scss/           # Source SCSS files
│       └── js/             # JavaScript files
└── static/                 # Static assets
```

## Getting Started

### Prerequisites

- Hugo (v0.100+)
- Node.js (for SCSS compilation)

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Run Hugo: `hugo server`
4. Open <http://localhost:1313>

### Building for Production

```bash
hugo --environment development --destination docs --cleanDestinationDir
```

## Customization

### Adding Projects

Edit `data/index.yml` and add new projects to the `projects.items` array:

```yaml
projects:
  items:
    - name: "Project Name"
      description: "Project description"
      technologies: "Tech stack"
      link: "https://live-demo.com"
      github: "https://github.com/user/repo"
      image: "img/projects/project.jpg"
```

### Modifying Theme Colors

Edit `themes/imidiotic/static/scss/_theme.scss` to customize colors:

```scss
/* Primary brand color */
#4458dc

/* Secondary colors */
#6c757d
```

### Adding Sections

1. Add data to `data/index.yml`
2. Create template in `themes/imidiotic/layouts/index.html`
3. Add navigation link in `config.toml`

## Theme Features

### Animations

- Fade-in animations on scroll
- Hover effects on cards and buttons
- Smooth scrolling navigation
- Loading animations

### SEO Optimized

- Meta tags for social sharing
- Structured data markup
- Optimized images
- Fast loading times

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

- Email: <piyush.bhutoria98@gmail.com>
- LinkedIn: [piyushh-bhutoria](https://www.linkedin.com/in/piyushh-bhutoria)
- GitHub: [Piyushhbhutoria](https://github.com/Piyushhbhutoria)
