import { GraduationCap } from "lucide-react";
import type { EducationProps, ThemeColor } from "@/types";

const getColorClass = (color: ThemeColor) => {
  return color === "primary" ? "bg-primary" : color === "secondary" ? "bg-secondary" : "bg-accent";
};

const Education = ({ title, education }: EducationProps) => {
  return (
    <section className="flex items-center justify-center py-20 px-4">
      <div className="container max-w-4xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="brutal-border bg-secondary p-4 brutal-shadow">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black">{title}</h2>
        </div>

        {education.map((edu, idx) => (
          <div key={idx} className="brutal-border bg-card brutal-shadow-lg hover-lift mb-6">
            <div className={`${getColorClass(edu.color)} p-6 brutal-border border-b-4`}>
              <h3 className="text-2xl font-black">{edu.institution}</h3>
              <p className="text-lg font-bold mt-1">{edu.location}</p>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-xl font-bold">{edu.degree}</p>
                  <p className="font-medium text-muted-foreground">{edu.duration}</p>
                </div>
                <div className="brutal-border bg-accent px-6 py-3 brutal-shadow-sm">
                  <p className="text-2xl font-black">{edu.cgpa}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
