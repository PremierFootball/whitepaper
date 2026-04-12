'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
import { Flame } from 'lucide-react';
import { useDict } from '@/providers/DictionaryProvider';
import { ROADMAP_PHASES } from '@/lib/data';

export default function Roadmap() {
  const dict = useDict();
  const t = dict.roadmap;

  return (
    <section id="roadmap" className="py-24 bg-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="inline-block text-xs font-mono text-accent border border-accent/30 px-3 py-1 rounded-full mb-4 bg-accent/5">
            {t.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-2">
            {t.headline} <span className="text-accent">{t.headlineAccent}</span>
          </h2>
          <h2 className="text-4xl sm:text-5xl font-black text-muted">{t.headlineSub}</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden sm:block" />

          <div className="flex flex-col gap-0">
            {ROADMAP_PHASES.map((phase, i) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.6, ease }}
                className="relative sm:pl-20 pb-10 last:pb-0"
              >
                {/* Phase number dot */}
                <div className="hidden sm:flex absolute left-0 top-1 w-12 h-12 rounded-full bg-surface border-2 border-border items-center justify-center flex-shrink-0 z-10">
                  <span className="text-sm font-black text-accent font-mono">{phase.id}</span>
                </div>

                <div className="bg-surface border border-border rounded-2xl p-6">
                  {/* Period + name */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-4">
                    <span className="text-xs font-mono text-muted">{phase.period}</span>
                    <span className="hidden sm:block text-border">·</span>
                    <h3 className="text-base font-bold text-primary">{phase.name}</h3>
                  </div>

                  {/* Milestones */}
                  <ul className="flex flex-col gap-1.5 mb-4">
                    {phase.milestones.map((m) => (
                      <li key={m} className="flex items-start gap-2 text-sm text-muted">
                        <span className="text-accent mt-0.5 flex-shrink-0">›</span>
                        {m}
                      </li>
                    ))}
                  </ul>

                  {/* Bottom row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-border/50">
                    {/* Milestone burn */}
                    {phase.burn ? (
                      <div className="flex items-center gap-2">
                        <Flame size={14} className="text-gold" />
                        <span className="text-xs font-bold text-gold">
                          {t.burnLabel}: {phase.burn.label} —{' '}
                          {(phase.burn.tokens / 1_000_000).toFixed(1)}M tokens
                        </span>
                      </div>
                    ) : (
                      <div />
                    )}

                    {/* Success criteria */}
                    <div className="text-xs text-muted/60 italic max-w-xs text-right hidden sm:block">
                      {phase.success}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 text-center text-lg sm:text-xl font-medium text-muted italic border-t border-border pt-10"
        >
          {t.quote}
        </motion.blockquote>
      </div>
    </section>
  );
}
