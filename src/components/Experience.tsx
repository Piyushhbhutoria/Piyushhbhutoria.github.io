import type { ExperienceItemProps, ExperienceProps } from "@/types";
import { Briefcase } from "lucide-react";

const ExperienceItem = ({
  company,
  role,
  duration,
  location,
  description,
  techStack,
  color
}: ExperienceItemProps) => {
  const bgColor = color === "primary" ? "bg-primary" : color === "secondary" ? "bg-secondary" : "bg-accent";

  return (
    <div className="brutal-border bg-card brutal-shadow hover-lift mb-8">
      <div className={`${bgColor} p-4 brutal-border border-b-4`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h3 className="text-2xl font-black">{company}</h3>
            <p className="text-lg font-bold">{role}</p>
          </div>
          <div className="text-left md:text-right">
            <p className="font-bold">{duration}</p>
            <p className="font-medium">{location}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <ul className="space-y-2">
          {description.map((item, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="text-accent font-bold mt-1">▸</span>
              <span className="font-medium" dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>

        <div className="pt-4">
          <p className="font-bold text-sm mb-2">TECH STACK</p>
          <p className="font-medium text-muted-foreground">{techStack}</p>
        </div>
      </div>
    </div>
  );
};

const Experience = ({ title, experiences }: ExperienceProps) => {
  return (
    <section id="experience" className="flex items-center justify-center py-20 px-4">
      <div className="container max-w-6xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="brutal-border bg-accent p-4 brutal-shadow">
            <Briefcase className="h-8 w-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black">{title}</h2>
        </div>

        <div className="space-y-0">
          {experiences.map((exp, idx) => (
            <ExperienceItem key={idx} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
