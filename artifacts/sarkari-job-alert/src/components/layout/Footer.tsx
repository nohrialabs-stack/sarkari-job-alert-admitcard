import { Bell } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-secondary-foreground/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 inline-flex" data-testid="link-footer-logo">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
                <Bell className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Sarkari Job Alert
              </span>
            </Link>
            <p className="text-secondary-foreground/70 max-w-sm text-sm leading-relaxed">
              India's trusted companion for government job aspirants. We organize admit cards, exam dates, and mock tests so you can focus on preparation.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li>
                <Link href="/" className="hover:text-primary transition-colors" data-testid="footer-link-home">Home</Link>
              </li>
              <li>
                <Link href="/admit-cards" className="hover:text-primary transition-colors" data-testid="footer-link-admit-cards">Admit Cards</Link>
              </li>
              <li>
                <Link href="/mock-tests" className="hover:text-primary transition-colors" data-testid="footer-link-mock-tests">Mock Tests</Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Information</h4>
            <p className="text-sm text-secondary-foreground/70">
              Data aggregated for educational purposes. We strive for accuracy but users should verify details from official organization websites.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-secondary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-secondary-foreground/50">
          <p data-testid="text-copyright">© {currentYear} Sarkari Job Alert. All rights reserved.</p>
          <p data-testid="text-disclaimer">Disclaimer: Data compiled from FreeJobAlert and other public sources.</p>
        </div>
      </div>
    </footer>
  );
}
