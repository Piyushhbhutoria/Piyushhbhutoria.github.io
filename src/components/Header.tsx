import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import resumePdf from "@/content/resume.pdf";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"
        }`}
    >
      <nav className="brutal-border bg-card brutal-shadow mx-4">
        <div className="flex items-center justify-between p-4">
          <a href="#" className="text-2xl font-black hover:scale-105 transition-transform">
            PB
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-bold hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="brutal-border bg-background p-2 brutal-shadow-sm hover-lift"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <a href={resumePdf} download="Piyush_Bhutoria_Resume.pdf">
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
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden brutal-border border-t-4 bg-background p-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block font-bold hover:text-primary transition-colors py-2"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full brutal-border bg-background p-3 brutal-shadow-sm hover-lift flex items-center justify-center gap-2 font-bold"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-5 w-5" /> Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5" /> Dark Mode
                </>
              )}
            </button>
            <a href={resumePdf} download="Piyush_Bhutoria_Resume.pdf" onClick={() => setIsMenuOpen(false)}>
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
