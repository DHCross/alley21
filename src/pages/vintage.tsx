import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Search, Star, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collections } from 'virtual:content';

const site = 'https://alley21enterprises.com';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const categorySlots = [
  '/assets/images/vintage-category-fashion.webp',
  '/assets/images/vintage-category-art.webp',
  '/assets/images/vintage-category-accessories.webp',
  '/assets/images/vintage-category-collectibles.webp',
];

const pillarIcons = [Search, Star, Package];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  '@id': `${site}/vintage#store`,
  name: 'Vintage Fashion and Treasures — Alley 21 Enterprises',
  url: `${site}/vintage`,
  description: 'Alley 21 brings together vintage fashion, distinctive collections, restored and refreshed pieces, and unexpected treasures selected for their character, usefulness, or beauty.',
  provider: { '@id': `${site}/#organization` },
};

export default function VintagePage() {
  return (
    <>
      <Helmet>
        <title>Vintage Fashion and Treasures — Alley 21 Enterprises</title>
        <meta name="description" content="Alley 21 brings together vintage fashion, distinctive collections, restored and refreshed pieces, and unexpected treasures selected for their character, usefulness, or beauty." />
        <link rel="canonical" href={`${site}/vintage`} />
        <meta property="og:title" content="Vintage Fashion and Treasures — Alley 21 Enterprises" />
        <meta property="og:description" content="Alley 21 brings together vintage fashion, distinctive collections, restored and refreshed pieces, and unexpected treasures selected for their character, usefulness, or beauty." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/vintage`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-[80vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/assets/images/vintage-hero.webp"
              alt="Warmly lit shop setting arranged with curated vintage collections"
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
          </div>
          <div className="relative container mx-auto px-6 pb-20 pt-48">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                {collections.hero.eyebrow}
              </motion.p>
              <motion.div variants={fadeUp}>
                <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-foreground leading-none tracking-tight max-w-4xl">
                  {collections.hero.heading}<br />
                  <span className="text-primary">{collections.hero.headingAccent}</span>
                </h1>
              </motion.div>
              <motion.p variants={fadeUp} className="mt-6 text-lg text-muted-foreground max-w-xl">
                {collections.hero.subheading}
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#categories"
                  className="inline-flex items-center gap-2 bg-primary text-background px-7 py-3 rounded-full text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors duration-200"
                >
                  <span>{collections.hero.ctaPrimary}</span> <ArrowRight size={16} />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border border-border text-foreground px-7 py-3 rounded-full text-sm font-semibold hover:border-primary hover:text-primary transition-colors duration-200"
                >
                  <span>{collections.hero.ctaSecondary}</span> <ArrowRight size={15} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── MANIFESTO BAND ── */}
        <section className="bg-card border-y border-border py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-6">
                {collections.manifesto.heading}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed">
                {collections.manifesto.body}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section id="categories" className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="mb-14"
            >
              <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">
                {collections.categoriesEyebrow}
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-extrabold text-foreground">
                {collections.categoriesHeading}
              </motion.h2>
            </motion.div>

            {/* Asymmetric bento grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Fashion — large */}
              <motion.div variants={fadeUp} className="md:row-span-2">
                <div className="group relative h-full min-h-[520px] overflow-hidden rounded-2xl bg-card">
                  <img
                    src={categorySlots[0]}
                    alt="Rack of curated vintage clothing and garments in a shop setting"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={700}
                    height={800}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="font-heading text-3xl font-extrabold text-foreground mb-3">{collections.categories[0].label}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{collections.categories[0].description}</p>
                  </div>
                </div>
              </motion.div>

              {/* Art */}
              <motion.div variants={fadeUp}>
                <div className="group relative h-64 overflow-hidden rounded-2xl bg-card">
                  <img
                    src={categorySlots[1]}
                    alt="Framed antique artwork and prints displayed on a wall"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={700}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{collections.categories[1].label}</h3>
                    <p className="text-muted-foreground text-sm">{collections.categories[1].description}</p>
                  </div>
                </div>
              </motion.div>

              {/* Accessories */}
              <motion.div variants={fadeUp}>
                <div className="group relative h-64 overflow-hidden rounded-2xl bg-card">
                  <img
                    src={categorySlots[2]}
                    alt="Collection of vintage leather accessories, bags, and jewelry"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={700}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{collections.categories[2].label}</h3>
                    <p className="text-muted-foreground text-sm">{collections.categories[2].description}</p>
                  </div>
                </div>
              </motion.div>

              {/* Collectibles — full width */}
              <motion.div variants={fadeUp} className="md:col-span-2">
                <div className="group relative h-56 overflow-hidden rounded-2xl bg-card">
                  <img
                    src={categorySlots[3]}
                    alt="Shelved collection of vintage curiosities and antique porcelain"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={1400}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{collections.categories[3].label}</h3>
                    <p className="text-muted-foreground text-sm max-w-lg">{collections.categories[3].description}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── FURNITURE RESTORATION ── */}
        <section className="py-16 bg-background border-t border-border">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeUp}>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Furniture restoration</p>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-6">
                  From overlooked<br />to useful again.
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-4">
                  Locally sourced furniture pieces are restored, painted, and reimagined — each one handled directly and described honestly.
                </p>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  Current inventory is listed on Facebook Marketplace. Reach out to ask about a specific piece or restoration service.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.facebook.com/alley21enterprises/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 rounded-full text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors duration-200"
                  >
                    View on Facebook Marketplace <ExternalLink size={15} />
                  </a>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="relative h-[400px] rounded-2xl overflow-hidden">
                <img
                  src="/assets/images/furniture-process.webp"
                  alt="Hands sanding and refinishing a wooden furniture piece in a workshop"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── PILLARS ── */}
        <section className="py-24 bg-card border-t border-border">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="mb-14"
            >
              <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">
                {collections.pillarsEyebrow}
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-extrabold text-foreground">
                {collections.pillarsHeading}
              </motion.h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-10"
            >
              {collections.pillars.map((p, i) => {
                const Icon = pillarIcons[i];
                return (
                  <motion.div key={p.title} variants={fadeUp} className="flex flex-col gap-4">
                    <Icon size={26} className="text-primary" />
                    <h3 className="font-heading text-xl font-bold text-foreground">{p.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── SOURCING IMAGE BREAK ── */}
        <section className="relative h-72 overflow-hidden">
          <img
            src="/assets/images/vintage-sourcing.webp"
            alt="Hands examining vintage goods at an antique market stall"
            className="w-full h-full object-cover object-center"
            loading="lazy"
            width={1920}
            height={500}
          />
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center pointer-events-none">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-heading text-3xl md:text-5xl font-extrabold text-foreground text-center px-6"
            >
              <span>{collections.imagePullQuote}</span><br />
              <span className="text-primary">{collections.imagePullQuoteAccent}</span>
            </motion.p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 bg-background border-t border-border">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="max-w-2xl mx-auto"
            >
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-extrabold text-foreground mb-6">
                {collections.ctaHeading}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-10">
                {collections.ctaBody}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-background px-8 py-4 rounded-full text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors duration-200"
                >
                  <span>{collections.ctaPrimary}</span> <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-full text-sm font-semibold hover:border-primary hover:text-primary transition-colors duration-200"
                >
                  <span>{collections.ctaSecondary}</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
