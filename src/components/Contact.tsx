import { Button } from "@/components/ui/button";
import type { ContactIconType, ContactProps, SocialIconType } from "@/types";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const getContactIcon = (iconType: ContactIconType, className: string) => {
  switch (iconType) {
    case "mail":
      return <Mail className={className} />;
    case "phone":
      return <Phone className={className} />;
    case "mappin":
      return <MapPin className={className} />;
  }
};

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

const getSocialIcon = (iconType: SocialIconType, className: string) => {
  switch (iconType) {
    case "github":
      return <Github className={className} />;
    case "linkedin":
      return <Linkedin className={className} />;
    case "medium":
      return <MediumIcon className={className} />;
  }
};

const Contact = ({ title, socialTitle, contactItems, socialLinks, ctaEmail }: ContactProps) => {
  return (
    <section id="contact" className="flex items-center justify-center py-20 px-4 bg-muted/30">
      <div className="container max-w-5xl">
        <div className="brutal-border bg-card p-8 md:p-12 brutal-shadow-lg">
          <h2 className="text-4xl md:text-5xl font-black mb-8">{title}</h2>

          {/* Do not show contact items for now */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {contactItems.map((item, idx) => (
              <div key={idx} className="brutal-border bg-background brutal-shadow-sm hover-lift">
                <div className={`${item.color} p-3 brutal-border border-b-4 flex items-center justify-center`}>
                  {getContactIcon(item.iconType, "h-6 w-6")}
                </div>
                <div className="p-4 text-center">
                  <p className="font-bold text-sm mb-1">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-medium text-sm hover:underline break-all"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-medium text-sm">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div> */}

          <div className="space-y-6">
            <h3 className="text-2xl font-black">{socialTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-border bg-background brutal-shadow hover-lift"
                >
                  <div className={`${link.color} p-4 flex items-center justify-center gap-4`}>
                    {getSocialIcon(link.iconType, "h-6 w-6")}
                    <span className="font-black">{link.label}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <a href={ctaEmail}>
              <Button
                size="lg"
                className="brutal-border bg-accent text-accent-foreground brutal-shadow hover-lift font-black text-lg px-8"
              >
                Send Me an Email <Mail className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
