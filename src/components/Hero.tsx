import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import type { HeroProps } from "@/types";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const MediumIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const Hero = ({ title, name, description, cta, social }: HeroProps) => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
      aria-label="About Piyushh Bhutoria"
    >
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden="true"
      />

      <div className="container max-w-6xl relative z-10">
        <div className="brutal-border bg-card p-8 md:p-12 lg:p-16 brutal-shadow-lg">
          <div className="space-y-6">
            <div className="inline-block brutal-border bg-primary px-4 py-2 brutal-shadow-sm">
              <p className="text-sm font-bold uppercase tracking-wider">{title}</p>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
              Hi, I'm{" "}
              <span
                className="inline-block brutal-border bg-accent text-accent-foreground px-3 py-1 brutal-shadow rotate-1"
                aria-label={name}
              >
                {name}
              </span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl max-w-2xl font-medium">
              {description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4" role="group" aria-label="Call to action buttons">
              <a href={cta.primary.href} aria-label={cta.primary.text}>
                <Button
                  size="lg"
                  className="brutal-border bg-primary text-primary-foreground brutal-shadow hover-lift font-bold"
                >
                  {cta.primary.text} <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>
              </a>

              <a href={cta.secondary.href} aria-label={cta.secondary.text}>
                <Button
                  size="lg"
                  variant="outline"
                  className="brutal-border bg-secondary text-secondary-foreground brutal-shadow hover-lift font-bold"
                >
                  {cta.secondary.text}
                </Button>
              </a>
            </div>

            <nav className="flex gap-4 pt-6" role="navigation" aria-label="Social media links">
              <a
                href={social.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-border bg-card p-3 brutal-shadow-sm hover-lift"
                aria-label="Visit Medium profile"
              >
                <MediumIcon className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Medium</span>
              </a>
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-border bg-card p-3 brutal-shadow-sm hover-lift"
                aria-label="Visit GitHub profile"
              >
                <Github className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-border bg-card p-3 brutal-shadow-sm hover-lift"
                aria-label="Visit LinkedIn profile"
              >
                <Linkedin className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href={social.email}
                className="brutal-border bg-card p-3 brutal-shadow-sm hover-lift"
                aria-label="Send email"
              >
                <Mail className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Email</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
