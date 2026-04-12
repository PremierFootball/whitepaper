'use client';

import { motion } from 'framer-motion';
import { Trophy, Building2, Flame } from 'lucide-react';
import { useDict } from '@/providers/DictionaryProvider';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease },
  }),
};

export default function Opportunity() {
  const dict = useDict();
  const t = dict.opportunity;

  const CARDS = [
    {
      icon: Trophy,
      title: t.card1Title,
      description: t.card1Description,
      stat: t.card1Stat,
      statLabel: t.card1StatLabel,
      accentColor: 'from-accent/10 to-transparent border-accent/20',
      iconColor: 'text-accent',
    },
    {
      icon: Building2,
      title: t.card2Title,
      description: t.card2Description,
      stat: t.card2Stat,
      statLabel: t.card2StatLabel,
      accentColor: 'from-blue-500/10 to-transparent border-blue-500/20',
      iconColor: 'text-blue-400',
    },
    {
      icon: Flame,
      title: t.card3Title,
      description: t.card3Description,
      stat: t.card3Stat,
      statLabel: t.card3StatLabel,
      accentColor: 'from-gold/10 to-transparent border-gold/20',
      iconColor: 'text-gold',
    },
  ];

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h2 className="text-4xl sm:text-5xl font-black leading-tight">
            {t.headline} <span className="text-accent">{t.headlineAccent}</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CARDS.map(({ icon: Icon, title, description, stat, statLabel, accentColor, iconColor }, i) => (
            <motion.div
              key={title}
              custom={i}
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className={`relative rounded-2xl border bg-gradient-to-br ${accentColor} bg-surface p-7 flex flex-col overflow-hidden`}
            >
              {/* Icon */}
              <div className={`mb-5 ${iconColor}`}>
                <Icon size={28} strokeWidth={1.5} />
              </div>

              <h3 className="text-lg font-bold text-primary mb-3">{title}</h3>
              <p className="text-sm text-muted leading-relaxed flex-1 mb-6">{description}</p>

              {/* Stat */}
              <div className="pt-4 border-t border-border/50">
                <p className={`text-xl font-black font-mono mb-0.5 ${iconColor}`}>{stat}</p>
                <p className="text-xs text-muted">{statLabel}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
