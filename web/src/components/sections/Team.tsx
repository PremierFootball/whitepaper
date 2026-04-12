'use client';

import { motion } from 'framer-motion';
import { useDict } from '@/providers/DictionaryProvider';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease },
  }),
};

export default function Team() {
  const dict = useDict();
  const t = dict.team;

  const COLS = [
    {
      emoji: '⚽',
      title: t.col1Title,
      description: t.col1Description,
      badges: [t.col1Badge1, t.col1Badge2, t.col1Badge3],
      badgeColor: 'bg-accent/10 border-accent/30 text-accent',
    },
    {
      emoji: '⛓️',
      title: t.col2Title,
      description: t.col2Description,
      badges: [t.col2Badge1],
      badgeColor: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    },
    {
      emoji: '🤝',
      title: t.col3Title,
      description: t.col3Description,
      badges: [t.col3Badge1, t.col3Badge2],
      badgeColor: 'bg-gold/10 border-gold/30 text-gold',
    },
  ];

  const ACCOUNTABILITY = [
    { icon: '🎙️', label: t.ama },
    { icon: '📊', label: t.quarterly },
    { icon: '✅', label: t.audit },
    { icon: '🔗', label: t.dashboard },
  ];

  return (
    <section id="team" className="py-24 bg-surface">
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

        {/* Team columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {COLS.map(({ emoji, title, description, badges, badgeColor }, i) => (
            <motion.div
              key={title}
              custom={i}
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-bg border border-border rounded-2xl p-7 flex flex-col"
            >
              <span className="text-3xl mb-5">{emoji}</span>
              <h3 className="text-base font-bold text-primary mb-3">{title}</h3>
              <p className="text-sm text-muted leading-relaxed flex-1 mb-5">{description}</p>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className={`text-[10px] border px-2 py-0.5 rounded-full font-semibold ${badgeColor}`}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Philosophy + Accountability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Philosophy */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-bg border border-border rounded-2xl p-7 flex items-center justify-center"
          >
            <blockquote className="text-xl sm:text-2xl font-black text-primary text-center leading-snug">
              {t.philosophy}
            </blockquote>
          </motion.div>

          {/* Accountability */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-bg border border-border rounded-2xl p-7"
          >
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-5">{t.accountabilityTitle}</h3>
            <div className="flex flex-col gap-3">
              {ACCOUNTABILITY.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-lg">{icon}</span>
                  <span className="text-sm text-primary">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
