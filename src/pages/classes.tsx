import { classes } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { ArrowRight, Monitor, Users, Lightbulb } from 'lucide-react';
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

const formatsMeta = [
  {
    icon: Monitor
  },
  {
    icon: Users
  },
  {
    icon: Lightbulb
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${site}/classes#page`,
  name: 'Alley 21 Classes & Workshops',
  url: `${site}/classes`,
  parentOrganization: { '@id': `${site}/#organization` },
  description: 'Training and educational programming from Alley 21 Enterprises — AI instruction, technology workshops, and practical skills sessions.',
};

export default function ClassesPage() {
  return (
    <>
      <Helmet>
        <title>Classes & Workshops — Alley 21 Enterprises</title>
        <meta name="description" content="Training and educational programming from Alley 21 Enterprises — AI and technology instruction, group workshops, and one-on-one sessions." />
        <link rel="canonical" href={`${site}/classes`} />
        <meta property="og:title" content="Classes & Workshops — Alley 21 Enterprises" />
        <meta property="og:description" content="AI instruction, technology workshops, and practical skills training." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/classes`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <main>
        {/* ── HERO ── */}
        <section className="relative py-32 md:py-48 bg-background overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none" />
          <div className="relative container mx-auto px-6">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
              <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                Alley 21 Enterprises
              </motion.p>
              <motion.div variants={fadeUp}>
                <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-foreground leading-none tracking-tight">
                  Classes &<br />
                  <span className="text-primary">Workshops</span>
                </h1>
              </motion.div>
              <motion.p variants={fadeUp} className="mt-6 text-xl text-muted-foreground max-w-lg">
                Training and educational programming — practical skills for real situations.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-background px-7 py-3 rounded-full text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors duration-200"
                >
                  Enquire about a session <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── FORMATS ── */}
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
                How it works
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-extrabold text-foreground">
                What's available
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-10"
            >
              {classes.formats.map((f, _airoIdx) => {
                const Icon = formatsMeta[_airoIdx].icon;
                return (
                  <motion.div key={f.title} variants={fadeUp} className="flex flex-col gap-4">
                    <Icon size={26} className="text-primary" />
                    <h3 className="font-heading text-xl font-bold text-foreground">{f.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── TOPICS PLACEHOLDER ── */}
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
                Topics
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-6">
                Current focus areas
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg">
                AI fundamentals and prompt engineering • Workflow automation for small business • Technology setup and system configuration • Creative process and studio practice. Sessions can be tailored to your situation — get in touch to discuss what you need.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
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
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Get started</p>
                <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                  Ready to learn<br />something useful?
                </h2>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-col gap-5 md:items-end">
                <p className="text-muted-foreground text-lg md:text-right max-w-sm">
                  Tell us what you want to learn and we'll figure out the best way to make it happen.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-background px-7 py-3 rounded-full text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors duration-200"
                >
                  Contact us <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
