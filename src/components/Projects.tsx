import { Button } from "@/components/ui/button";
import type { ProjectsProps } from "@/types";
import { ExternalLink, Github } from "lucide-react";

const Projects = ({ title, subtitle, projects }: ProjectsProps) => {
  return (
    <section id="projects" className="flex items-center justify-center py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl">
        <div className="brutal-border bg-card p-4 sm:p-8 md:p-12 brutal-shadow-lg">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-4">{title}</h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-12 font-medium">{subtitle}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="brutal-border bg-background brutal-shadow hover-lift"
              >
                {project.imageUrl && (
                  <div className="w-full h-48 sm:h-64 overflow-hidden brutal-border border-b-4">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className={`${project.color} p-3 sm:p-4 brutal-border border-b-4`}>
                  <h3 className="text-xl sm:text-2xl font-black">{project.title}</h3>
                </div>

                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <p className="font-medium text-sm sm:text-base">{project.description}</p>

                  <div className="brutal-border bg-muted p-2 sm:p-3">
                    <p className="text-xs sm:text-sm font-bold">{project.tech}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {project.links.map((link, linkIdx) => (
                      <a
                        key={linkIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="brutal-border brutal-shadow-sm hover-lift font-bold"
                        >
                          {link.type === "demo" ? (
                            <>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Live Demo
                            </>
                          ) : (
                            <>
                              <Github className="h-4 w-4 mr-2" />
                              GitHub
                            </>
                          )}
                        </Button>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
