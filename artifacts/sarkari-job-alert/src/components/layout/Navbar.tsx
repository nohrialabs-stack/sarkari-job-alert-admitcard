import { Link, useLocation } from "wouter";
import { BookOpen, Menu, X, FileText, Bell, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => location === path;

  const navLinks = [
    { path: "/", label: "Home", icon: Bell },
    { path: "/admit-cards", label: "Admit Cards", icon: FileText },
    { path: "/mock-tests", label: "Mock Tests", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group" data-testid="link-home-logo">
          <img
            src="/app-icon.png"
            alt="Sarkari Job Alerts"
            className="h-9 w-9 rounded-xl shadow-sm group-hover:opacity-90 transition-opacity"
          />
          <span className="font-display font-bold text-xl tracking-tight text-secondary dark:text-white">
            Sarkari Job<span className="text-primary"> Alert</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.path) ? "text-primary" : "text-muted-foreground"
              }`}
              data-testid={`nav-link-${link.label.toLowerCase().replace(" ", "-")}`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <a
            href="https://play.google.com/store/apps/details?id=com.sarkarialert"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-secondary text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-secondary/90 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.3.17.64.24.99.24.5 0 .99-.15 1.4-.43l11.61-6.71-3.11-3.11-10.89 10zM.44 1.38C.17 1.79 0 2.31 0 2.9v18.2c0 .59.17 1.11.44 1.52l.08.08 10.2-10.2v-.24L.52 1.3l-.08.08zM19.37 8.31l-2.87-1.66-3.42 3.42 3.42 3.42 2.88-1.66c.82-.47.82-1.24-.01-1.72v.2zM4.17.43L15.78 7.14l-3.11 3.11L1.58.14C1.99-.14 2.69-.05 4.17.43z"/>
            </svg>
            Get App
          </a>

          <button
            className="md:hidden p-2 text-muted-foreground hover:bg-muted rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-muted-foreground"
                }`}
                data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(" ", "-")}`}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            ))}
            <a
              href="https://play.google.com/store/apps/details?id=com.sarkarialert"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-md text-sm font-semibold bg-secondary text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.64.24.99.24.5 0 .99-.15 1.4-.43l11.61-6.71-3.11-3.11-10.89 10zM.44 1.38C.17 1.79 0 2.31 0 2.9v18.2c0 .59.17 1.11.44 1.52l.08.08 10.2-10.2v-.24L.52 1.3l-.08.08zM19.37 8.31l-2.87-1.66-3.42 3.42 3.42 3.42 2.88-1.66c.82-.47.82-1.24-.01-1.72v.2zM4.17.43L15.78 7.14l-3.11 3.11L1.58.14C1.99-.14 2.69-.05 4.17.43z"/>
              </svg>
              Download App on Play Store
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
