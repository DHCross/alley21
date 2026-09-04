import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { VINTAGE_AND_FURNITURE_LABEL } from '@/lib/commerce';

const mainNavItems = [
  { href: '/ai-tech', label: 'AI Consulting' },
  { href: '/vintage', label: VINTAGE_AND_FURNITURE_LABEL },
  { href: '/self-discovery', label: 'Tools for Self-Discovery' },
];

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-transparent">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <Link
            to="/"
            className="flex shrink-0 items-center"
            aria-label="Alley 21 Enterprises — Home"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img
              src="/airo-assets/images/logo/alley21-transparent"
              alt="Alley 21 Enterprises"
              className="h-10 w-auto object-contain"
            />
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white/80 transition-colors hover:text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute right-6 top-20 min-w-[260px] rounded-xl border border-border bg-background/95 py-4 shadow-xl backdrop-blur-md">
            <nav aria-label="Main navigation" className="flex flex-col">
              {!isHome && (
                <Link
                  to="/"
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              )}
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-colors hover:text-primary hover:bg-muted ${
                    location.pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-border pt-2">
                <Link
                  to="/our-story"
                  className={`px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-colors hover:text-primary hover:bg-muted ${
                    location.pathname === '/our-story' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Our Story
                </Link>
                <Link
                  to="/contact"
                  className={`px-8 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors hover:text-primary hover:bg-muted ${
                    location.pathname === '/contact' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
