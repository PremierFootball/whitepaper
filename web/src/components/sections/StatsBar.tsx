'use client';

import { motion } from 'framer-motion';
import { useDict } from '@/providers/DictionaryProvider';

export default function StatsBar() {
  const dict = useDict();
  const t = dict.statsbar;

  const STATS = [
    { label: t.seed, value: t.seedValue, sub: t.seedPrice, color: 'text-accent' },
    { label: t.private, value: t.privateValue, sub: t.privatePrice, color: 'text-accent' },
    { label: t.public, value: t.publicValue, sub: t.publicPrice, color: 'text-accent' },
    { label: t.fdv, value: t.fdvValue, sub: '', color: 'text-gold' },
  ];

  return (
    <section className="bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
          {STATS.map(({ label, value, sub, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="px-6 py-5 flex flex-col"
            >
              <span className="text-xs text-muted mb-1 uppercase tracking-wider">{label}</span>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-2xl font-black font-mono ${color}`}>{value}</span>
                {sub && <span className="text-xs text-muted/60 font-mono">{sub}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
