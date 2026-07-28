import { ai_tech } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { ArrowRight, Zap, GitMerge, BarChart3, Cpu, Users, CheckCircle, BookOpen, Settings } from 'lucide-react';
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

const servicesMeta = [
  { icon: Cpu },
  { icon: Zap },
  { icon: GitMerge },
  { icon: BarChart3 },
  { icon: Settings },
  { icon: Users },
  { icon: CheckCircle },
  { icon: BookOpen },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${site}/ai-tech#service`,
  name: 'AI Consulting',
  provider: { '@id': `${site}/#organization` },
  url: `${site}/ai-tech`,
  description: 'AI integration, workflow automation, and technology consulting for small and medium businesses.',
};

export default function AiTechPage() {
  return (
    <>
      <Helmet>
        <title>AI Consulting — Alley 21 Enterprises</title>
        <meta name="description" content="Alley 21 provides practical AI and technology support designed around the real needs of small businesses and individuals. We help clients select useful tools, improve everyday processes, solve technical problems, and gain confidence using technology." />
        <link rel="canonical" href={`${site}/ai-tech`} />
        <meta property="og:title" content="AI Consulting — Alley 21 Enterprises" />
        <meta property="og:description" content="Alley 21 provides practical AI and technology support designed around the real needs of small businesses and individuals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/ai-tech`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/assets/images/ai-tech-hero.webp"
              alt="Desk with modern computer workstation and technology planning materials"
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
                Alley 21 Enterprises
              </motion.p>
              <motion.div variants={fadeUp}>
                <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-foreground leading-none tracking-tight max-w-3xl">AI Consulting</h1>
              </motion.div>
              <motion.p variants={fadeUp} className="mt-6 text-lg text-muted-foreground max-w-xl">
                Alley 21 provides practical AI and technology support designed around the real needs of small businesses and individuals.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8">
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 bg-primary text-background px-7 py-3 rounded-full text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors duration-200"
                >
                  See what we do <ArrowRight size={16} />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── INTRO BAND ── */}
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
                Technology should work for you — not the other way around.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed">
                We help clients select useful tools, improve everyday processes, solve technical problems, and gain confidence using technology. No unnecessary complexity. No vendor lock-in. Just practical results.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="mb-14"
            >
              <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">
                What we offer
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-extrabold text-foreground max-w-xl">
                Services
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {ai_tech.services.map((service, _airoIdx) => {
                const Icon = servicesMeta[_airoIdx].icon;

                return (
                  <motion.div
                    key={service.title}
                    variants={fadeUp}
                    className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors duration-300"
                  >
                    <Icon size={28} className="text-primary mb-5" />
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── CLASSES & WORKSHOPS ── */}
        <section className="py-24 bg-card border-t border-border">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="max-w-3xl"
            >
              <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                Training & Education
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-extrabold text-foreground mb-6">
                Classes & Workshops
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed mb-6">
                AI and technology instruction, practical skills training, and educational programming — available to individuals and organizations.
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted-foreground text-base leading-relaxed mb-8">
                Current focus areas: AI fundamentals and prompt engineering · Workflow automation for small business · Technology setup and system configuration · Creative process and studio practice. Sessions can be tailored to your situation.
              </motion.p>
              <motion.div variants={fadeUp}>
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

        {/* ── HOW IT WORKS ── */}
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
                The process
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-extrabold text-foreground">
                How it works
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              {[
                { step: '01', title: 'Discovery', desc: 'We learn your business, your pain points, and where technology can genuinely help.' },
                { step: '02', title: 'Strategy', desc: 'A clear, jargon-free roadmap — what to build, in what order, and why.' },
                { step: '03', title: 'Build', desc: 'We implement the solution, keeping you in the loop at every stage.' },
                { step: '04', title: 'Handover', desc: 'Full documentation, team training, and ongoing support so nothing falls over.' },
              ].map((item) => (
                <motion.div key={item.step} variants={fadeUp} className="relative">
                  <p className="font-heading text-6xl font-extrabold text-primary/20 mb-4 leading-none">{item.step}</p>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
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
              className="max-w-2xl mx-auto"
            >
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-extrabold text-foreground mb-6">
                Tell Us What You're Trying to Accomplish
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-10">
                Whether you need a website, want to automate a process, or just want to understand your options — let's talk.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-background px-8 py-4 rounded-full text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors duration-200"
                >
                  Get in touch <ArrowRight size={16} />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-full text-sm font-semibold hover:border-primary hover:text-primary transition-colors duration-200"
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
