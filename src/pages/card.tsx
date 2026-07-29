import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import {
  Mail,
  MapPin,
  Globe,
  Instagram,
  Facebook,
  Download,
  Copy,
  Check,
  Share2,
  Phone,
  Sparkles,
  Shirt,
  Sparkle,
  Home as HomeIcon,
  Layers,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const cardData = {
  name: 'Stephanie Breeden',
  title: 'Owner',
  company: 'Alley 21 Enterprises',
  phone: 'TBD',
  email: 'sfbreeden@alley21enterprises.com',
  website: 'https://alley21enterprises.com',
  location: 'Bay County, Florida',
  instagram: 'https://www.instagram.com/alley21enterprises/',
  facebook: 'https://www.facebook.com/alley21enterprises/',
  socialHandle: '@alley21enterprises',
  specialties: [
    { label: 'Vintage fashion and treasures', icon: Shirt },
    { label: 'Furniture restoration', icon: HomeIcon },
    { label: 'Unique home accents', icon: Sparkles },
    { label: 'Curated collections', icon: Layers },
  ],
};

export default function CardPage() {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(cardData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cardData.name} — ${cardData.company}`,
          text: `Digital business card for ${cardData.name}, ${cardData.title} at ${cardData.company}`,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  const handleDownloadVCard = () => {
    const vCardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${cardData.name}`,
      `ORG:${cardData.company}`,
      `TITLE:${cardData.title}`,
      `EMAIL;TYPE=INTERNET,WORK:${cardData.email}`,
      `URL:${cardData.website}`,
      `ADR;TYPE=WORK:;;Bay County;FL;;;USA`,
      `NOTE:Specialties: Vintage fashion and treasures, Furniture restoration, Unique home accents, Curated collections. Social: ${cardData.socialHandle}`,
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Stephanie_Breeden_Alley21.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Helmet>
        <title>Digital Business Card — Stephanie Breeden | Alley 21 Enterprises</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="Digital Business Card for Stephanie Breeden, Owner of Alley 21 Enterprises — Vintage fashion, furniture restoration, home accents, and curated collections in Bay County, FL."
        />
      </Helmet>

      <div className="min-h-[90vh] py-12 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-background via-muted/40 to-background">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-xl overflow-hidden rounded-3xl border border-border/80 bg-card shadow-2xl backdrop-blur-md"
        >
          {/* Card Top Brand Banner */}
          <div className="relative bg-gradient-to-r from-[#2C221E] via-[#3A2D28] to-[#2C221E] px-8 py-10 text-center text-[#FFFDF5]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(198,168,125,0.25)_0%,transparent_70%)] pointer-events-none" />

            <Link to="/" className="inline-flex flex-col items-center group transition-transform hover:scale-105">
              <div className="flex items-baseline gap-2">
                <span className="font-script text-4xl sm:text-5xl text-[#FFFDF5] leading-none drop-shadow-md">
                  Alley
                </span>
                <span className="font-display text-4xl sm:text-5xl text-[#FFFDF5] leading-none drop-shadow-md">
                  21
                </span>
              </div>
              <p className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.4em] uppercase text-[#F4E4BA] mt-2 drop-shadow-sm">
                ENTERPRISES
              </p>
            </Link>
          </div>

          {/* Main Card Content Body */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Owner Info Header */}
            <div className="border-b border-border/60 pb-6 text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  {cardData.name}
                </h1>
                <p className="font-heading text-lg font-semibold text-primary mt-0.5">
                  {cardData.title}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-muted-foreground mt-2">
                  <MapPin size={14} className="text-primary shrink-0" />
                  <span>{cardData.location}</span>
                </div>
              </div>

              {/* Action Buttons Header */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleDownloadVCard}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md hover:bg-primary/90 transition-all hover:scale-105"
                  title="Save contact card to phone"
                >
                  <Download size={15} />
                  <span>Save Contact</span>
                </button>
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl border border-border bg-background text-foreground hover:bg-muted transition-all hover:scale-105"
                  title="Share digital card"
                >
                  {shared ? <Check size={16} className="text-emerald-500" /> : <Share2 size={16} />}
                </button>
              </div>
            </div>

            {/* Grid Layout: Contact & Social (Left) + Specialties (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Direct Contact Info */}
              <div className="space-y-4">
                <h2 className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                  Contact & Channels
                </h2>

                <div className="space-y-3 text-sm">
                  {/* Email */}
                  <div className="group flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/30 hover:border-primary/50 transition-colors">
                    <a
                      href={`mailto:${cardData.email}`}
                      className="flex items-center gap-3 text-foreground font-medium hover:text-primary transition-colors truncate mr-2"
                    >
                      <Mail size={16} className="text-primary shrink-0" />
                      <span className="truncate text-xs sm:text-sm">{cardData.email}</span>
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-background transition-colors shrink-0"
                      title="Copy email address"
                    >
                      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-muted/30 text-muted-foreground">
                    <Phone size={16} className="text-primary shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">Local phone: <strong className="text-foreground">{cardData.phone}</strong></span>
                  </div>

                  {/* Website */}
                  <a
                    href={cardData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-muted/30 text-foreground font-medium hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    <Globe size={16} className="text-primary shrink-0" />
                    <span className="text-xs sm:text-sm truncate">alley21enterprises.com</span>
                  </a>
                </div>

                {/* Social Media Links */}
                <div className="pt-2 space-y-2">
                  <a
                    href={cardData.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/30 hover:bg-primary/5 hover:border-primary/50 text-foreground transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Facebook size={18} className="text-[#1877F2] group-hover:scale-110 transition-transform" />
                      <span className="text-xs sm:text-sm font-semibold">Facebook</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">{cardData.socialHandle}</span>
                  </a>

                  <a
                    href={cardData.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/30 hover:bg-primary/5 hover:border-primary/50 text-foreground transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Instagram size={18} className="text-[#E4405F] group-hover:scale-110 transition-transform" />
                      <span className="text-xs sm:text-sm font-semibold">Instagram</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">{cardData.socialHandle}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Specialties & Offerings */}
              <div className="space-y-4">
                <h2 className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                  Specialties & Offerings
                </h2>

                <ul className="space-y-3">
                  {cardData.specialties.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <li
                        key={index}
                        className="flex items-center gap-3 p-3.5 rounded-xl border border-border/60 bg-muted/20 text-foreground"
                      >
                        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                          <Icon size={16} />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold leading-tight">
                          {item.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Bottom Footer Actions */}
            <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <p className="text-xs text-muted-foreground">
                Bay County, Florida · <Link to="/" className="text-primary hover:underline">Alley 21 Enterprises</Link>
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
              >
                <span>Send a message</span>
                <Sparkle size={12} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
