import { insight } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const site = 'https://alley21enterprises.com';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${site}/insight#webpage`,
  name: 'Alley 21 Insight — Personal Development and Interpretive Tools',
  url: `${site}/insight`,
  isPartOf: { '@id': `${site}/#website` },
  about: { '@id': `${site}/#organization` },
};

export default function InsightPage() {
  return (
    <>
      <Helmet>
        <title>Alley 21 Insight — Personal Development Tools</title>
        <meta name="description" content="Alley 21 Insight is the home of personal development and interpretive tools — including Raven and The Woven Map." />
        <link rel="canonical" href={`${site}/insight`} />
        <meta property="og:title" content="Alley 21 Insight — Alley 21 Enterprises" />
        <meta property="og:description" content="Personal development and interpretive tools. Home of Raven and The Woven Map." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/insight`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-[65vh] flex items-end overflow-hidden bg-background">
          <div className="absolute inset-0">
            <img
              src="/airo-assets/images/pages/self-discovery/hero"
              alt="Alley 21 Insight"
              className="w-full h-full object-cover object-center opacity-40"
              loading="eager"
              fetchPriority="high"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          </div>
          <div className="relative container mx-auto px-6 pb-20 pt-48">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                Alley 21 Enterprises
              </motion.p>
              <motion.div variants={fadeUp}>
                <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-foreground leading-none tracking-tight max-w-3xl">
                  Alley 21<br />
                  <span className="text-primary">Insight</span>
                </h1>
              </motion.div>
              <motion.p variants={fadeUp} className="mt-6 text-xl text-muted-foreground max-w-lg font-light italic">
                Personal development and interpretive tools.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="max-w-3xl"
            >
              <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-6">
                What this is
              </motion.p>
              <motion.p variants={fadeUp} className="font-heading text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-8">
                Alley 21 Insight is the interpretive and personal development arm of the enterprise — frameworks, tools, and experiences designed to help people understand themselves with more precision and less noise.
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl">
                Raven is a narrative interpretation engine — a way to examine your own patterns through structured reflection. The Woven Map is its companion framework: a dynamic, evolving record of what you discover. Both are in active development.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── PRODUCTS ── */}
        <section className="py-24 bg-card border-y border-border">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="mb-14"
            >
              <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">
                Products & frameworks
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-extrabold text-foreground">
                What's inside
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {insight.products.map((product) => (
                <motion.div
                  key={product.name}
                  variants={fadeUp}
                  className="border border-border rounded-2xl p-10 bg-background hover:border-primary/40 transition-colors duration-300"
                >
                  <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">{product.status}</p>
                  <h3 className="font-heading text-3xl font-extrabold text-foreground mb-4">{product.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
                </motion.div>
              ))}
            </motion.div>
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
              className="max-w-xl mx-auto"
            >
              <motion.h2 variants={fadeUp} className="font-heading text-4xl font-extrabold text-foreground mb-6">
                Want to know when these are ready?
              </motion.h2>
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-background px-7 py-3 rounded-full text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors duration-200"
                >
                  Get in touch <ArrowRight size={16} />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 border border-border text-foreground px-7 py-3 rounded-full text-sm font-semibold hover:border-primary hover:text-primary transition-colors duration-200"
                >
                  Back to Alley 21
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
