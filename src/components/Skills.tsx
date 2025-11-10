import type { SkillCardProps, SkillIconType, SkillsProps } from "@/types";
import { Award, Code2, Database, Wrench } from "lucide-react";

const SkillCard = ({ icon, title, items, color }: SkillCardProps) => {
  const bgColor = color === "primary" ? "bg-primary" : color === "secondary" ? "bg-secondary" : "bg-accent";

  return (
    <div className="brutal-border bg-card brutal-shadow hover-lift h-full">
      <div className={`${bgColor} p-4 brutal-border border-b-4 flex items-center gap-3`}>
        {icon}
        <h3 className="text-xl font-black">{title}</h3>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {items.map((item, idx) => (
            <span
              key={idx}
              className="brutal-border bg-background px-3 py-1 brutal-shadow-sm font-bold text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const getIcon = (iconType: SkillIconType, className: string) => {
  switch (iconType) {
    case "code2":
      return <Code2 className={className} />;
    case "wrench":
      return <Wrench className={className} />;
    case "database":
      return <Database className={className} />;
    case "award":
      return <Award className={className} />;
  }
};

const Skills = ({ title, iconType, skillCategories }: SkillsProps) => {
  return (
    <section id="skills" className="flex items-center justify-center py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="brutal-border bg-primary p-4 brutal-shadow">
            {getIcon(iconType, "h-8 w-8")}
          </div>
          <h2 className="text-4xl md:text-5xl font-black">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, idx) => (
            <SkillCard
              key={idx}
              icon={getIcon(category.iconType, "h-6 w-6")}
              title={category.title}
              items={category.items}
              color={category.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
