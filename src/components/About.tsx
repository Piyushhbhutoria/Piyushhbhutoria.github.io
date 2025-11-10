import type { AboutProps } from "@/types";

const About = ({ title, highlightWord, paragraphs }: AboutProps) => {
  return (
    <section id="about" className="flex items-center justify-center py-20 px-4">
      <div className="container max-w-6xl">
        <div className="brutal-border bg-card p-8 md:p-12 brutal-shadow-lg">
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            {title}{" "}
            <span className="inline-block brutal-border bg-primary text-primary-foreground px-3 py-1 brutal-shadow rotate-1">
              {highlightWord}
            </span>{" "}
            Myself
          </h2>

          <div className="space-y-4 text-lg leading-relaxed">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className={paragraph.bold ? "font-bold" : ""}>
                {paragraph.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
