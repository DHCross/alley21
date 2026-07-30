import { about } from 'virtual:content';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Helmet } from '@dr.pogodin/react-helmet';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const site = 'https://alley21enterprises.com';
const url = `${site}/our-story`;
const title = 'Our Story — Alley 21 Enterprises';
const description = 'Alley 21 Enterprises is rooted in Bay County. We bring together practical technology support, vintage fashion and treasures, and tools for self-discovery.';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${url}#webpage`,
  name: title,
  url,
  isPartOf: { '@id': `${site}/#website` },
  about: { '@id': `${site}/#organization` },
};

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main>

        {/* ── INTRO ── */}
        <section className="py-28 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-3xl"
            >
              <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-6">
                Our Story
              </motion.p>
              <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-6xl font-extrabold text-foreground leading-tight mb-8">
                Our Story
              </motion.h1>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed mb-6">
                Alley 21 Enterprises is rooted in Bay County. We bring together practical technology support, vintage fashion and treasures, and tools for self-discovery — each path distinct, each one purposeful.
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed mb-6 italic text-foreground/60">
                [Add the founders' connection to Bay County.]
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed mb-6 italic text-foreground/60">
                [Add the story of how Alley 21 began.]
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed">
                Rather than divide those pursuits into unrelated brands, Alley 21 gives them a shared home. Each part of the company serves a different purpose, but all follow the same basic method:
              </motion.p>
              <motion.p variants={fadeUp} className="mt-6 font-heading text-xl font-bold text-foreground">
                Look closely, think clearly, make deliberately, and build for real life.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── WHAT WE DO ── */}
        <section className="py-24 bg-card border-y border-border">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                What we do
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-extrabold text-foreground mb-14">
                Three paths.<br />One enterprise.
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {about.channels.map((ch, index) => (
                  <motion.div key={ch.href} variants={fadeUp} className="flex flex-col gap-3">
                    <Link
                      to={index === 0 ? '/ai-tech' : index === 1 ? '/vintage' : '/self-discovery'}
                      className="group inline-flex items-center gap-2 font-heading text-xl font-bold text-foreground hover:text-primary transition-colors"
                    >
                      {ch.label}
                      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <p className="text-muted-foreground text-sm leading-relaxed">{ch.body}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── HOW WE WORK ── */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                How we work
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-extrabold text-foreground mb-14">
                The common thread.
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
                {about.principles.map((p) => (
                  <motion.div key={p.heading} variants={fadeUp} className="flex flex-col gap-3">
                    <h3 className="font-heading text-lg font-bold text-foreground">{p.heading}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{p.body}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── BUILT TO EVOLVE ── */}
        <section className="py-28 bg-card border-t border-border">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="max-w-3xl"
            >
              <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-6">
                Built to evolve
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-8">
                The form may change.<br />The standard does not.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed mb-10">
                Alley 21 will continue to develop new services, collections, tools, and ideas as the work grows. The form may change. The standard does not.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-background px-7 py-3 rounded-full text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors duration-200"
                >
                  Get in touch <ArrowRight size={16} />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 border border-border text-foreground px-7 py-3 rounded-full text-sm font-bold tracking-wide hover:border-primary hover:text-primary transition-colors duration-200"
                >
                  Explore the enterprise
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>
    </>
  );
}
