import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-secondary-foreground/10">
      {/* App Download Banner */}
      <div className="bg-gradient-to-r from-[#1a2e5a] to-[#0f1f45] border-b border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src="/app-icon.png"
                alt="Sarkari Job Alerts App"
                className="h-16 w-16 rounded-2xl shadow-lg shrink-0"
              />
              <div>
                <h3 className="font-display font-bold text-white text-xl">Get the App</h3>
                <p className="text-secondary-foreground/70 text-sm mt-0.5 max-w-xs">
                  Download <strong className="text-white">Sarkari Job Alerts</strong> for instant notifications on new admit cards, results & job openings — before anyone else.
                </p>
              </div>
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.sarkarialert"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
              data-testid="link-download-app-footer"
            >
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                className="h-14"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 inline-flex" data-testid="link-footer-logo">
              <img
                src="/app-icon.png"
                alt="Sarkari Job Alerts"
                className="h-9 w-9 rounded-xl"
              />
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Sarkari Job <span className="text-primary">Alert</span>
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
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.sarkarialert"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-app"
                >
                  Download App ↗
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white">Information</h4>
            <p className="text-sm text-secondary-foreground/70">
              Data aggregated for educational purposes. Always verify details from official organization websites before applying or downloading.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-secondary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-secondary-foreground/50">
          <p data-testid="text-copyright">© {currentYear} Sarkari Job Alert. All rights reserved.</p>
          <p data-testid="text-disclaimer">Disclaimer: Data compiled from official government sources. Verify before use.</p>
        </div>
      </div>
    </footer>
  );
}
