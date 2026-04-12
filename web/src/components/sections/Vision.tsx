'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDict } from '@/providers/DictionaryProvider';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Vision() {
  const dict = useDict();
  const t = dict.vision;

  const STATS = [
    { value: t.stat1, label: t.stat1Label, sub: t.stat1Sub },
    { value: t.stat2, label: t.stat2Label, sub: t.stat2Sub },
    { value: t.stat3, label: t.stat3Label, sub: t.stat3Sub },
  ];

  return (
    <section id="vision" className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="inline-block text-xs font-mono text-accent border border-accent/30 px-3 py-1 rounded-full mb-4 bg-accent/5">
            {t.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-2">
            {t.headline} <span className="text-accent">{t.headlineAccent}</span>
          </h2>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-muted mb-6">
            {t.headlineSub}
          </h2>
          <p className="text-base text-muted max-w-xl leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        {/* Before / After images */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14"
        >
          {/* Before */}
          <div className="relative rounded-xl overflow-hidden border border-border group">
            <div className="relative aspect-[4/3]">
              <Image
                src="/land.png"
                alt="Land today"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <span className="bg-bg/80 backdrop-blur-sm border border-border text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                {t.beforeLabel}
              </span>
            </div>
          </div>

          {/* After */}
          <div className="relative rounded-xl overflow-hidden border border-accent/30 group">
            <div className="relative aspect-[4/3]">
              <Image
                src="/land_after.jpg"
                alt="Sports city render"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <span className="bg-accent/20 backdrop-blur-sm border border-accent/40 text-accent text-xs font-semibold px-3 py-1.5 rounded-full">
                {t.afterLabel}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {STATS.map(({ value, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="bg-surface border border-border rounded-xl p-6"
            >
              <p className="text-2xl font-black text-accent font-mono mb-1">{value}</p>
              <p className="text-sm text-primary font-medium mb-0.5">{label}</p>
              <p className="text-xs text-muted">{sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
