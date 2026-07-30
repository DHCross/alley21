import { contact } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

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
  '@type': 'ContactPage',
  '@id': `${site}/contact#webpage`,
  name: 'Contact — Alley 21 Enterprises',
  url: `${site}/contact`,
  isPartOf: { '@id': `${site}/#website` },
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [area, setArea] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Helmet>
        <title>Contact — Alley 21 Enterprises</title>
        <meta name="description" content="Get in touch with Alley 21 Enterprises. Tell us which area your enquiry relates to and we'll get back to you." />
        <link rel="canonical" href={`${site}/contact`} />
        <meta property="og:title" content="Contact — Alley 21 Enterprises" />
        <meta property="og:description" content="Get in touch with Alley 21 Enterprises." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/contact`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <main>
        <section className="py-32 md:py-48 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

              {/* Left — intro */}
              <motion.div initial="hidden" animate="visible" variants={stagger}>
                <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                  Alley 21 Enterprises
                </motion.p>
                <motion.div variants={fadeUp}>
                  <h1 className="font-heading text-5xl md:text-6xl font-extrabold text-foreground leading-none tracking-tight mb-6">
                    Get in<br />
                    <span className="text-primary">touch.</span>
                  </h1>
                </motion.div>
                <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-sm">
                  Tell us which area your enquiry relates to and we'll make sure it gets to the right place.
                </motion.p>
                <motion.p variants={fadeUp} className="mt-8 text-primary font-heading font-bold text-xl">
                  Making life simple.
                </motion.p>
              </motion.div>

              {/* Right — form */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
              >
                {submitted ? (
                  <motion.div
                    variants={fadeUp}
                    className="border border-border rounded-2xl p-10 bg-card text-center"
                  >
                    <h2 className="font-heading text-3xl font-extrabold text-foreground mb-4">Message received.</h2>
                    <p className="text-muted-foreground">We'll be in touch shortly.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    variants={stagger}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    {/* Area */}
                    <motion.div variants={fadeUp} className="flex flex-col gap-2">
                      <label htmlFor="area" className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                        What is your enquiry about?
                      </label>
                      <select
                        id="area"
                        name="area"
                        required
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                      >
                        <option value="" disabled>Select an area</option>
                        {contact.areas.map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </motion.div>

                    {/* Name */}
                    <motion.div variants={fadeUp} className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                        Your name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="[Your name]"
                        className="bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div variants={fadeUp} className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                        Email address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="[Your email]"
                        className="bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                      />
                    </motion.div>

                    {/* Message */}
                    <motion.div variants={fadeUp} className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us what you need..."
                        className="bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                      />
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-primary text-background px-8 py-3 rounded-full text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors duration-200"
                      >
                        Send message <ArrowRight size={16} />
                      </button>
                    </motion.div>
                  </motion.form>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
