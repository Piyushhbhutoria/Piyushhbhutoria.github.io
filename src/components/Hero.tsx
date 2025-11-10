import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import type { HeroProps } from "@/types";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const Hero = ({ title, name, description, cta, social }: HeroProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      <div className="container max-w-6xl relative z-10">
        <div className="brutal-border bg-card p-8 md:p-12 lg:p-16 brutal-shadow-lg">
          <div className="space-y-6">
            <div className="inline-block brutal-border bg-primary px-4 py-2 brutal-shadow-sm">
              <p className="text-sm font-bold uppercase tracking-wider">{title}</p>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
              Hi, I'm{" "}
              <span className="inline-block brutal-border bg-accent text-accent-foreground px-3 py-1 brutal-shadow rotate-1">
                {name}
              </span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl max-w-2xl font-medium">
              {description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href={cta.primary.href}>
                <Button
                  size="lg"
                  className="brutal-border bg-primary text-primary-foreground brutal-shadow hover-lift font-bold"
                >
                  {cta.primary.text} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>

              <a href={cta.secondary.href}>
                <Button
                  size="lg"
                  variant="outline"
                  className="brutal-border bg-secondary text-secondary-foreground brutal-shadow hover-lift font-bold"
                >
                  {cta.secondary.text}
                </Button>
              </a>
            </div>

            <div className="flex gap-4 pt-6">
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-border bg-card p-3 brutal-shadow-sm hover-lift"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-border bg-card p-3 brutal-shadow-sm hover-lift"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href={social.email}
                className="brutal-border bg-card p-3 brutal-shadow-sm hover-lift"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
