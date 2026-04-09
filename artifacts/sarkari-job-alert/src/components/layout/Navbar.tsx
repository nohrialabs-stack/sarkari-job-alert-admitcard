import { Link, useLocation } from "wouter";
import { Search, Bell, BookOpen, Menu, X, FileText } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const navLinks = [
    { path: "/", label: "Home", icon: Bell },
    { path: "/admit-cards", label: "Admit Cards", icon: FileText },
    { path: "/mock-tests", label: "Mock Tests", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" data-testid="link-home-logo">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg shadow-sm group-hover:bg-primary/90 transition-colors">
            <Bell className="h-5 w-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-secondary">
            Sarkari Job<span className="text-primary"> Alert</span>
          </span>
        </Link>

        {/* Desktop Nav */}
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

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:bg-muted rounded-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
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
          </nav>
        </div>
      )}
    </header>
  );
}
