import { furniture } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Sparkles, RefreshCw, Heart } from 'lucide-react';
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

const valuesMeta = [
  {
    icon: Sparkles
  },
  {
    icon: RefreshCw
  },
  {
    icon: Heart
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${site}/furniture#service`,
  name: 'Creative Solutions — Furniture Refinishing',
  provider: { '@id': `${site}/#organization` },
  url: `${site}/furniture`,
  description: 'Furniture refinishing and transformation. Locally sourced pieces restored and reimagined by Alley 21 Enterprises.',
};

export default function FurniturePage() {
  return (
    <>
      <Helmet>
        <title>Creative Solutions — Alley 21 Enterprises</title>
        <meta name="description" content="Furniture refinishing and transformation. Locally sourced pieces restored, painted, and reimagined. Find current inventory on Facebook Marketplace." />
        <link rel="canonical" href={`${site}/furniture`} />
        <meta property="og:title" content="Creative Solutions — Alley 21 Enterprises" />
        <meta property="og:description" content="Furniture refinishing and transformation. Locally sourced pieces restored and reimagined." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/furniture`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-[75vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/airo-assets/images/pages/furniture/hero"
              alt="Furniture refinishing workshop"
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/5" />
          </div>
          <div className="relative container mx-auto px-6 pb-20 pt-48">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                Alley 21 Enterprises
              </motion.p>
              <motion.div variants={fadeUp}>
                <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-foreground leading-none tracking-tight max-w-3xl">
                  Creative<br />
                  <span className="text-primary">Solutions</span>
                </h1>
              </motion.div>
              <motion.p variants={fadeUp} className="mt-6 text-xl text-muted-foreground max-w-lg font-light italic">
                Furniture refinishing and transformation.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://www.facebook.com/alley21enterprises/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-background px-7 py-3 rounded-full text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors duration-200"
                >
                  View current pieces on Facebook Marketplace <ExternalLink size={15} />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── VALUES BAND ── */}
        <section className="bg-card border-y border-border py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              {furniture.values.map((v, _airoIdx) => {
                const Icon = valuesMeta[_airoIdx].icon;
                return (
                  <motion.div key={v.title} variants={fadeUp} className="flex flex-col gap-4">
                    <Icon size={26} className="text-primary" />
                    <h3 className="font-heading text-xl font-bold text-foreground">{v.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <motion.div variants={fadeUp}>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">The approach</p>
                <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground mb-10">
                  From overlooked<br />to useful again.
                </h2>
                <div className="flex flex-col gap-8">
                  {furniture.process.map((item) => (
                    <div key={item.step} className="flex gap-6">
                      <p className="font-heading text-3xl font-extrabold text-primary/30 leading-none shrink-0 w-10">{item.step}</p>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-foreground mb-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="relative h-[500px] rounded-2xl overflow-hidden">
                <img
                  src="/airo-assets/images/pages/furniture/process"
                  alt="Furniture restoration in progress"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── MARKETPLACE CTA ── */}
        <section className="py-24 bg-card border-t border-border">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeUp}>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Find current inventory</p>
                <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                  Pieces are listed<br />on Facebook Marketplace.
                </h2>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-col gap-5 md:items-end">
                <p className="text-muted-foreground text-lg md:text-right max-w-sm">
                  Inventory changes as pieces are completed. The most current selection is always on Facebook Marketplace.
                </p>
                <div className="flex flex-wrap gap-4 md:justify-end">
                  <a
                    href="https://www.facebook.com/alley21enterprises/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-background px-7 py-3 rounded-full text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors duration-200"
                  >
                    Facebook Marketplace <ExternalLink size={15} />
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 border border-border text-foreground px-7 py-3 rounded-full text-sm font-semibold hover:border-primary hover:text-primary transition-colors duration-200"
                  >
                    Ask about a piece <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
