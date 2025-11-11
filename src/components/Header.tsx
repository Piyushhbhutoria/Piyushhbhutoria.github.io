import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import resumePdf from "@/content/resume.pdf";
import useScrollSpy from "@/hooks/use-scroll-spy";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  const navItems = [
    { label: "About", href: "#about", id: "about" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Contact", href: "#contact", id: "contact" }
  ];

  const activeSection = useScrollSpy(navItems.map(item => item.id));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"
        }`}
      role="banner"
    >
      <nav className="brutal-border bg-card brutal-shadow mx-4" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between p-4">
          <a
            href="#"
            className="text-2xl font-black hover:scale-105 transition-transform"
            aria-label="Piyushh Bhutoria - Home"
          >
            PB
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6" role="list">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-bold transition-colors ${activeSection === item.id ? "text-accent" : "hover:text-primary"
                  }`}
                role="listitem"
                aria-label={`Navigate to ${item.label} section`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="brutal-border bg-background p-2 brutal-shadow-sm hover-lift"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Switch to light mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Switch to dark mode</span>
                </>
              )}
            </button>
            <a
              href={resumePdf}
              download="Piyush_Bhutoria_Resume.pdf"
              aria-label="Download resume"
            >
              <Button
                size="sm"
                className="brutal-border bg-primary text-primary-foreground brutal-shadow-sm hover-lift font-bold"
              >
                Hire Me
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden brutal-border bg-primary p-2 brutal-shadow-sm"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <>
                <X className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Close menu</span>
              </>
            ) : (
              <>
                <Menu className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Open menu</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden brutal-border border-t-4 bg-background p-4 space-y-3"
            role="menu"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block font-bold transition-colors py-2 ${activeSection === item.id ? "text-primary" : "hover:text-primary"
                  }`}
                role="menuitem"
                aria-label={`Navigate to ${item.label} section`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full brutal-border bg-background p-3 brutal-shadow-sm hover-lift flex items-center justify-center gap-2 font-bold"
              role="menuitem"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-5 w-5" aria-hidden="true" /> Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5" aria-hidden="true" /> Dark Mode
                </>
              )}
            </button>
            <a
              href={resumePdf}
              download="Piyush_Bhutoria_Resume.pdf"
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              aria-label="Download resume"
            >
              <Button
                size="sm"
                className="w-full brutal-border bg-primary text-primary-foreground brutal-shadow-sm font-bold"
              >
                Hire Me
              </Button>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
