import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderNavLink = (text: string, target: string) => {
    if (isHomePage) {
      return (
        <button
          onClick={() => scrollToSection(target)}
          className="text-foreground/80 hover:text-foreground transition-colors"
        >
          {text}
        </button>
      );
    } else {
      return (
        <Link to={`/#${target}`} className="text-foreground/80 hover:text-foreground transition-colors">
          {text}
        </Link>
      );
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold gradient-text">PixelPerfect AI</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {renderNavLink("Features", "features")}
          {renderNavLink("How It Works", "how-it-works")}
          {renderNavLink("Pricing", "pricing")}
          <Link
            to="/contact"
            className={`text-foreground/80 hover:text-foreground transition-colors ${
              location.pathname === "/contact" ? "text-foreground font-medium" : ""
            }`}
          >
            Contact
          </Link>
          <Button 
            variant="default" 
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
            onClick={() => scrollToSection("pricing")}
          >
            Get Started
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-border md:hidden">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {renderNavLink("Features", "features")}
              {renderNavLink("How It Works", "how-it-works")}
              {renderNavLink("Pricing", "pricing")}
              <Link
                to="/contact"
                className={`text-foreground/80 hover:text-foreground transition-colors ${
                  location.pathname === "/contact" ? "text-foreground font-medium" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button 
                variant="default" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                onClick={() => {
                  scrollToSection("pricing");
                  setIsMenuOpen(false);
                }}
              >
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
