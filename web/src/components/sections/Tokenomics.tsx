'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useDict } from '@/providers/DictionaryProvider';
import { TOKEN_DISTRIBUTION, ROUNDS, MILESTONE_BURNS } from '@/lib/data';

// Burns enriched with roadmap phase context
const MILESTONE_BURNS_WITH_PHASES = [
  { ...MILESTONE_BURNS[0], phase: 'Phase 2', period: 'Q3 2026–Q2 2027' },
  { ...MILESTONE_BURNS[3], phase: 'Phase 3', period: 'Q3–Q4 2027' },
  { ...MILESTONE_BURNS[1], phase: 'Phase 4', period: '2028–2029' },
  { ...MILESTONE_BURNS[2], phase: 'Phase 5', period: '2030+' },
  { ...MILESTONE_BURNS[4], phase: 'Phase 5', period: '2030+' },
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

function fmtTokens(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  return n.toLocaleString();
}

export default function Tokenomics() {
  const dict = useDict();
  const t = dict.tokenomics;

  const DIST_LABELS: Record<string, string> = {
    forsale: t.forsale,
    team: t.team,
    ecosystem: t.ecosystem,
    advisors: t.advisors,
    reserve: t.reserve,
    community: t.community,
  };

  const ROUND_LABELS: Record<string, string> = {
    seed: t.seed,
    private: t.private,
    public: t.public,
  };

  const ROUND_INVESTORS: Record<string, string> = {
    seed: t.seedInvestors,
    private: t.privateInvestors,
    public: t.publicInvestors,
  };

  return (
    <section id="tokenomics" className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
          <span className="inline-block text-xs font-mono text-accent border border-accent/30 px-3 py-1 rounded-full mb-4 bg-accent/5">
            {t.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight">
            {t.headline} <span className="text-accent">{t.headlineAccent}</span>
          </h2>
        </motion.div>

        {/* Distribution + Funding Rounds */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Distribution */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-surface border border-border rounded-2xl p-7"
          >
            <h3 className="text-lg font-bold text-primary mb-6">{t.distributionTitle}</h3>
            <div className="relative w-full max-w-xs mx-auto mb-6">
              <Image
                src="/token_distribution.png"
                alt="Token Distribution"
                width={400}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {TOKEN_DISTRIBUTION.map(({ id, pct, color }) => (
                <div key={id} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-xs text-muted">{DIST_LABELS[id]}</span>
                  <span className="text-xs font-bold text-primary ml-auto">{pct}%</span>
                </div>
              ))}
            </div>

            {/* TGE stats */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-border">
              <div className="text-center">
                <p className="text-base font-black text-accent font-mono">{t.tgeValue}</p>
                <p className="text-xs text-muted mt-0.5">{t.tgeLabel}</p>
              </div>
              <div className="text-center">
                <p className="text-base font-black text-gold font-mono">{t.fdvValue}</p>
                <p className="text-xs text-muted mt-0.5">{t.fdvLabel}</p>
              </div>
              <div className="text-center">
                <p className="text-base font-black text-primary font-mono">{t.marketCapValue}</p>
                <p className="text-xs text-muted mt-0.5">{t.marketCapLabel}</p>
              </div>
            </div>
          </motion.div>

          {/* Funding Rounds */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-surface border border-border rounded-2xl p-7"
          >
            <h3 className="text-lg font-bold text-primary mb-6">{t.roundsTitle}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs text-muted font-medium pb-3">{t.round}</th>
                    <th className="text-right text-xs text-muted font-medium pb-3">{t.tokens}</th>
                    <th className="text-right text-xs text-muted font-medium pb-3">{t.price}</th>
                    <th className="text-right text-xs text-muted font-medium pb-3">{t.raise}</th>
                  </tr>
                </thead>
                <tbody>
                  {ROUNDS.map((round, i) => (
                    <tr
                      key={round.id}
                      className={`border-b border-border/50 ${i === 0 ? 'bg-accent/5' : ''}`}
                    >
                      <td className="py-3.5 pr-2">
                        <div className="font-semibold text-primary">{ROUND_LABELS[round.id]}</div>
                        <div className="text-xs text-muted mt-0.5">{ROUND_INVESTORS[round.id]}</div>
                      </td>
                      <td className="text-right py-3.5 font-mono text-primary">
                        {fmtTokens(round.tokens)}
                        <span className="text-xs text-muted ml-1">({round.pct}%)</span>
                      </td>
                      <td className="text-right py-3.5 font-mono font-bold text-accent">
                        ${round.price.toFixed(2)}
                      </td>
                      <td className="text-right py-3.5 font-mono text-primary">
                        {fmt(round.raise)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Vesting */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-primary mb-3">{t.vestingTitle}</h4>
              <div className="relative w-full">
                <Image
                  src="/vesting_schedule.png"
                  alt="Vesting Schedule"
                  width={600}
                  height={300}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Buyback & Burn */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-surface border border-border rounded-2xl p-7"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <Flame size={16} className="text-gold" />
              </div>
              <h3 className="text-lg font-bold text-primary">{t.buybackTitle}</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed">{t.buybackDescription}</p>

            {/* Flow */}
            <div className="mt-6 flex items-center gap-2 flex-wrap">
              {['Net Revenue', '→', '20–30% Pool', '→', 'Buy on DEX', '→', '🔥 Burn'].map((step, i) => (
                <span
                  key={i}
                  className={
                    step === '→'
                      ? 'text-muted text-sm'
                      : step.includes('🔥')
                      ? 'bg-gold/10 border border-gold/30 text-gold text-xs px-2.5 py-1 rounded-full font-mono'
                      : 'bg-border text-primary text-xs px-2.5 py-1 rounded-full font-mono'
                  }
                >
                  {step}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Milestone burns — redesigned */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-surface border border-border rounded-2xl p-7 flex flex-col gap-6"
          >
            <div>
              <h3 className="text-lg font-bold text-primary mb-1">{t.milestoneTitle}</h3>
              <p className="text-sm text-muted">{t.milestoneDescription}</p>
            </div>

            {/* Why it matters */}
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
              <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">{t.milestoneWhyTitle}</p>
              <p className="text-sm text-primary font-medium leading-relaxed">{t.milestoneWhyBody}</p>
            </div>

            {/* How it works — 3 steps */}
            <div className="bg-bg border border-border rounded-xl p-4">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">{t.milestoneMechanism}</p>
              <div className="flex items-start gap-0 flex-wrap">
                {[
                  { n: '1', label: t.milestoneStep1 },
                  { n: '2', label: t.milestoneStep2 },
                  { n: '3', label: t.milestoneStep3 },
                ].map(({ n, label }, i, arr) => (
                  <div key={n} className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-black flex items-center justify-center flex-shrink-0">
                        {n}
                      </span>
                      <span className="text-xs text-primary font-medium">{label}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <span className="text-muted/40 text-xs px-1.5">→</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted/60 mt-3 leading-relaxed">{t.milestoneNote}</p>
            </div>

            {/* Burns table with phase + running total */}
            <div>
              <div className="flex flex-col gap-0">
                {MILESTONE_BURNS_WITH_PHASES.map(({ event, tokens, phase, period }, i) => {
                  const cumulative = MILESTONE_BURNS_WITH_PHASES
                    .slice(0, i + 1)
                    .reduce((s, b) => s + b.tokens, 0);
                  return (
                    <div
                      key={event}
                      className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 py-3 border-b border-border/40 last:border-b-0"
                    >
                      <div>
                        <p className="text-sm text-primary font-medium">{event}</p>
                        <p className="text-xs text-muted/60 font-mono">{phase} · {period}</p>
                      </div>
                      <div className="text-right flex flex-col items-end justify-center">
                        <span className="text-sm font-black font-mono text-gold">
                          🔥 {fmtTokens(tokens)}
                        </span>
                        <span className="text-xs text-muted/50 font-mono">
                          {(cumulative / 1_000_000).toFixed(1)}M total burned
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="mt-4 bg-gold/5 border border-gold/20 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-primary">{t.milestoneTotalLabel}</p>
                  <p className="text-xs text-muted">{t.milestoneTotalSub}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black font-mono text-gold">🔥 6M</p>
                  <p className="text-xs text-muted font-mono">6% of supply</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
