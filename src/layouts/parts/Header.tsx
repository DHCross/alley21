import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const mainNavItems = [
  { href: '/ai-tech', label: 'AI Consulting' },
  { href: '/self-discovery', label: 'Tools for Self-Discovery' },
  { href: '/vintage', label: 'Vintage Fashion and Treasures' },
  { href: '/our-story', label: 'Our Story' },
];

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-transparent">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <Link
            to="/"
            className="flex items-center px-3.5 py-2 rounded-xl bg-black/45 backdrop-blur-md border border-white/20 shadow-xl group transition-all hover:bg-black/65 hover:scale-105"
            aria-label="Alley 21 Enterprises — Home"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex flex-col items-start leading-none">
              <div className="flex items-baseline gap-1">
                <span className="font-script text-2xl sm:text-3xl text-[#FFFDF5] leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  Alley
                </span>
                <span className="font-display text-2xl sm:text-3xl text-[#FFFDF5] leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  21
                </span>
              </div>
              <span className="font-cinzel text-[8px] sm:text-[9.5px] font-bold tracking-[0.35em] uppercase text-[#F4E4BA] drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)] mt-0.5">
                ENTERPRISES
              </span>
            </div>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/20 text-white/90 shadow-xl transition-all hover:bg-black/65 hover:text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute right-6 top-20 min-w-[260px] rounded-xl border border-border bg-background/95 py-4 shadow-xl backdrop-blur-md">
            <nav aria-label="Main navigation" className="flex flex-col">
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
