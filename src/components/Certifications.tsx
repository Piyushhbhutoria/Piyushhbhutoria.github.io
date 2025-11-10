import type { CertificationsProps } from "@/types";

const Certifications = ({ title, subtitle, certifications }: CertificationsProps) => {
  return (
    <section id="certifications" className="flex items-center justify-center py-20 px-4">
      <div className="container max-w-6xl">
        <div className="brutal-border bg-card p-8 md:p-12 brutal-shadow-lg">
          <h2 className="text-4xl md:text-5xl font-black mb-4">{title}</h2>
          <p className="text-xl mb-8 font-medium">{subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="brutal-border bg-background p-4 brutal-shadow-sm hover-lift"
              >
                <h3 className="font-bold mb-2">{cert.name}</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  Issued by: {cert.issuer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
