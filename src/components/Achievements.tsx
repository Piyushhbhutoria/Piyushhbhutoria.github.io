import type { AchievementsProps } from "@/types";
import { Trophy } from "lucide-react";

const Achievements = ({ title, achievements }: AchievementsProps) => {
  return (
    <section id="achievements" className="flex items-center justify-center py-20 px-4 bg-muted/30">
      <div className="container max-w-5xl">
        <div className="brutal-border bg-card p-8 md:p-12 brutal-shadow-lg">
          <div className="flex items-center gap-4 mb-8">
            <Trophy className="h-12 w-12" />
            <h2 className="text-4xl md:text-5xl font-black">{title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="brutal-border bg-background brutal-shadow-sm hover-lift"
              >
                <div className={`${idx % 3 === 0 ? "bg-primary" : idx % 3 === 1 ? "bg-secondary" : "bg-accent"} p-3 brutal-border border-b-4 flex items-center justify-center`}>
                  <span className="font-black text-2xl">{achievement.year}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-black mb-2">{achievement.name}</h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {achievement.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
