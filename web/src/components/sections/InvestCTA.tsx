'use client';

import { motion } from 'framer-motion';
import { useDict } from '@/providers/DictionaryProvider';
import { ROUNDS } from '@/lib/data';

const WHITEPAPER_URL = 'https://premierfootball.github.io/whitepaper/';

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

function fmtTokens(n: number) {
  return `${(n / 1_000_000).toFixed(0)}M`;
}

export default function InvestCTA() {
  const dict = useDict();
  const t = dict.cta;

  const ROUND_NAMES: Record<string, string> = {
    seed: t.seed,
    private: t.private,
    public: t.public,
  };

  const STATUS_LABELS: Record<string, string> = {
    open: t.statusOpen,
    upcoming: t.statusUpcoming,
  };

  return (
    <section id="invest" className="py-24 bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-6xl font-black leading-tight mb-4">
            {t.headline}{' '}
            <span className="text-accent">{t.headlineAccent}</span>
          </h2>
          <p className="text-base text-muted">{t.subheadline}</p>
        </motion.div>

        {/* Round cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {ROUNDS.map((round, i) => {
            const isOpen = round.status === 'open';
            return (
              <motion.div
                key={round.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className={`relative rounded-2xl border p-6 ${
                  isOpen
                    ? 'bg-accent/5 border-accent/40'
                    : 'bg-bg border-border'
                }`}
              >
                {isOpen && (
                  <div className="absolute top-4 right-4">
                    <span className="flex items-center gap-1 bg-accent text-bg text-xs font-bold px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-bg animate-pulse" />
                      {STATUS_LABELS[round.status]}
                    </span>
                  </div>
                )}
                {!isOpen && (
                  <div className="absolute top-4 right-4">
                    <span className="text-xs text-muted border border-border px-2 py-0.5 rounded-full">
                      {STATUS_LABELS[round.status]}
                    </span>
                  </div>
                )}

                <h3 className="text-base font-bold text-primary mb-5">{ROUND_NAMES[round.id]}</h3>

                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted">{t.priceLabel}</span>
                    <span className="text-sm font-black font-mono text-accent">${round.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted">{t.allocationLabel}</span>
                    <span className="text-sm font-bold font-mono text-primary">{fmtTokens(round.tokens)} ({round.pct}%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted">{t.raiseLabel}</span>
                    <span className="text-sm font-bold font-mono text-primary">{fmt(round.raise)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-border/50">
                    <span className="text-xs text-muted">{t.softCapDeadlineLabel}</span>
                    <span className="text-xs font-mono text-muted/70">{round.deadline}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Soft cap protection */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-accent/5 border border-accent/20 rounded-2xl p-6 mb-6"
        >
          <p className="text-sm font-bold text-primary mb-2">{t.softCapTitle}</p>
          <p className="text-sm text-muted leading-relaxed mb-2">{t.softCapBody}</p>
          <p className="text-xs text-muted/50 italic">{t.softCapNote}</p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <a
            href={WHITEPAPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-border text-primary text-sm font-semibold px-6 py-3 rounded-md hover:border-accent/50 hover:text-accent transition-colors text-center"
          >
            {t.cta1}
          </a>
          <a
            href="mailto:team@premierfootball.io"
            className="w-full sm:w-auto bg-accent text-bg text-sm font-bold px-6 py-3 rounded-md hover:bg-accent/90 transition-colors text-center"
          >
            {t.cta2} →
          </a>
        </motion.div>

        {/* Legal notes */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col gap-2 text-center"
        >
          <p className="text-xs text-muted/60">{t.kycNote}</p>
          <p className="text-xs text-muted/40">{t.restrictedNote}</p>
        </motion.div>
      </div>
    </section>
  );
}
