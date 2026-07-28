import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { home } from 'virtual:content';

const channelImages = [
  '/assets/images/a-small-business-owner-s-desk-in-warm-af-Un1vJf.webp',
  '/assets/images/home-channel-vintage.webp',
  '/assets/images/an-open-journal-on-a-wooden-desk-with-ha-JU8Qob.webp',
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const site = 'https://alley21enterprises.com';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${site}/#website`,
        name: 'Alley 21 Enterprises',
        url: `${site}/`,
      },
      {
        '@type': 'Organization',
        '@id': `${site}/#organization`,
        name: 'Alley 21 Enterprises',
        url: `${site}/`,
        description: 'Practical AI and technology support, vintage fashion and treasures, and tools for self-discovery.',
      },
      {
        '@type': 'WebPage',
        '@id': `${site}/#webpage`,
        url: `${site}/`,
        name: 'Alley 21 Enterprises — Making life simple.',
        isPartOf: { '@id': `${site}/#website` },
        about: { '@id': `${site}/#organization` },
        datePublished: '2026-06-24',
        dateModified: '2026-07-18',
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Alley 21 Enterprises — Making life simple.</title>
        <meta
          name="description"
          content="Practical AI and technology support, vintage fashion and treasures, and tools for self-discovery."
        />
        <link rel="canonical" href={`${site}/`} />
        <meta property="og:title" content="Alley 21 Enterprises — Making life simple." />
        <meta property="og:description" content="Practical AI and technology support, vintage fashion and treasures, and tools for self-discovery." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - 80px)' }}>
        <img
          src="/assets/images/home-hero-background.webp"
          alt="Alley 21 sunlit tree-lined path with wooden fences and vintage street sign"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          width={1920}
          height={1080}
        />
        {/* Center Vignette Radial Gradient for Legibility */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.05)_60%,rgba(0,0,0,0.45)_100%)] pointer-events-none" />

        {/* Centered Road Perspective Typography Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 md:pb-16 text-center pointer-events-none px-4">
          <h1 className="sr-only">Alley 21 Enterprises — Making life simple.</h1>

          {/* Alley 21 Logo Type Matched to Brand Image Tilted Along Dirt Road Surface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, rotateX: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 24 }}
            transition={{ duration: 1, ease: 'easeOut' as const }}
            style={{ perspective: '600px', transformStyle: 'preserve-3d' }}
            className="flex flex-col items-center mb-2"
          >
            <div
              style={{ transform: 'rotateX(24deg)', transformOrigin: 'bottom center' }}
              className="flex flex-col items-center"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-script text-5xl md:text-7xl lg:text-8xl text-[#FFFDF5] leading-none drop-shadow-[0_6px_22px_rgba(0,0,0,0.98)]">
                  Alley
                </span>
                <span className="font-display text-5xl md:text-7xl lg:text-8xl text-[#FFFDF5] leading-none drop-shadow-[0_6px_22px_rgba(0,0,0,0.98)]">
                  21
                </span>
              </div>
              <p className="font-cinzel text-xs md:text-base lg:text-xl font-bold tracking-[0.45em] uppercase text-[#F4E4BA] mt-2 drop-shadow-[0_4px_14px_rgba(0,0,0,0.98)]">
                ENTERPRISES
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── QUICK NAV PILLS ── */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-heading text-xl md:text-2xl font-bold text-foreground shrink-0"
            >
              {home.nav.exploreLabel}
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="flex flex-wrap items-center gap-3"
            >
              {home.channels.map((channel) => (
                <motion.div key={channel.id} variants={fadeUp}>
                  <Link
                    to={channel.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all duration-200"
                  >
                    <span>{channel.navLabel}</span>
                    <ArrowRight size={13} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CHANNELS BENTO GRID ── */}
      <section id="channels" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-14"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">
              {home.sectionLabel}
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-extrabold text-foreground">
              {home.sectionHeading}
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* AI Consulting — full width */}
            <motion.div variants={fadeUp} className="md:col-span-2">
              <Link
                to={home.channels[0].href}
                className="group relative block h-[400px] overflow-hidden rounded-2xl bg-card"
              >
                <img
                  src={channelImages[0]}
                  alt="Desk with laptop and notepad in warm afternoon natural light"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={1200}
                  height={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 p-10">
                  <h3 className="font-heading text-4xl font-extrabold text-foreground mb-1">{home.channels[0].label}</h3>
                  <p className="text-primary text-sm font-semibold mb-3">{home.channels[0].tagline}</p>
                  <p className="text-muted-foreground text-sm mb-5 max-w-lg">{home.channels[0].description}</p>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary group-hover:gap-4 transition-all duration-300">
                    <span>{home.channels[0].cta}</span> <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Vintage Fashion and Treasures */}
            <motion.div variants={fadeUp}>
              <Link to={home.channels[1].href} className="group relative block h-72 overflow-hidden rounded-2xl bg-card">
                <img src={channelImages[1]} alt="Curated arrangement of vintage objects and collectibles on a wooden tabletop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width={600} height={400} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 p-7">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-1">{home.channels[1].label}</h3>
                  <p className="text-primary text-xs font-semibold mb-3">{home.channels[1].tagline}</p>
                  <p className="text-muted-foreground text-sm mb-4">{home.channels[1].description}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-primary group-hover:gap-3 transition-all duration-300">
                    <span>{home.channels[1].cta}</span> <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Tools for Self-Discovery */}
            <motion.div variants={fadeUp}>
              <Link to={home.channels[2].href} className="group relative block h-72 overflow-hidden rounded-2xl bg-card">
                <img src={channelImages[2]} alt="Open journal with handwritten notes and reflection cards on a wooden desk" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width={600} height={400} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 p-7">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-1">{home.channels[2].label}</h3>
                  <p className="text-primary text-xs font-semibold mb-3">{home.channels[2].tagline}</p>
                  <p className="text-muted-foreground text-sm mb-4">{home.channels[2].description}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-primary group-hover:gap-3 transition-all duration-300">
                    <span>{home.channels[2].cta}</span> <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── MISSION BAND ── */}
      <section className="py-28 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-8">
              {home.mission.eyebrow}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-8"
            >
              {home.mission.heading}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl">
              {home.mission.body}
            </motion.p>
            <motion.p variants={fadeUp} className="mt-6 text-primary text-xl font-heading font-bold">
              {home.mission.tagline}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                {home.cta.eyebrow}
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                {home.cta.heading}
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} className="flex flex-col gap-4 md:items-end">
              <p className="text-muted-foreground text-lg md:text-right max-w-sm">
                {home.cta.body}
              </p>
              <div className="flex flex-wrap gap-4 md:justify-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-background px-7 py-3 rounded-full text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors duration-200"
                >
                  <span>{home.cta.primaryLabel}</span> <ArrowRight size={16} />
                </Link>
                <Link
                  to="/our-story"
                  className="inline-flex items-center gap-2 border border-border text-foreground px-7 py-3 rounded-full text-sm font-bold tracking-wide hover:border-primary hover:text-primary transition-colors duration-200"
                >
                  <span>{home.cta.secondaryLabel}</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
