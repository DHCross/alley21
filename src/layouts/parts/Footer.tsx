import { Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const categoryLinks = [
  { href: '/ai-tech', label: 'AI Consulting' },
  { href: '/vintage', label: 'Vintage Fashion and Treasures' },
  { href: '/self-discovery', label: 'Tools for Self-Discovery' },
];

const companyLinks = [
  { href: '/our-story', label: 'Our Story' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <Link to="/" className="mb-5 inline-block">
              <img
                src="/assets/images/alley21-round.png"
                alt="Alley 21 Enterprises"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Technology, craft, curation, and education under one roof.
            </p>
            <div className="mb-6 flex flex-col gap-2 text-sm text-muted-foreground">
              <span>[Local Alley 21 business number to be added.]</span>
            </div>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Alley 21 on Instagram"
                className="text-primary transition-colors hover:text-foreground"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/alley21enterprises/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Alley 21 on Facebook"
                className="text-primary transition-colors hover:text-foreground"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-primary">What We Do</p>
            <nav aria-label="Footer category links" className="flex flex-col gap-3">
              {categoryLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-primary">Company</p>
            <nav aria-label="Footer company links" className="flex flex-col gap-3">
              {companyLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-border pt-8">
          <p className="text-center text-xs tracking-wide text-muted-foreground">
            © 2026 Alley 21 Enterprises. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
