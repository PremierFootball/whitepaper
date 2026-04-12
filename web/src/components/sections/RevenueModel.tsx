'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDict } from '@/providers/DictionaryProvider';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease },
  }),
};

export default function RevenueModel() {
  const dict = useDict();
  const t = dict.revenue;

  const SOURCES = [
    { emoji: '⚽', title: t.transfersTitle, desc: t.transfersDesc, highlight: '$300K–$15M+' },
    { emoji: '🎓', title: t.trainingTitle, desc: t.trainingDesc, highlight: '5% perpetual' },
    { emoji: '📈', title: t.sellonTitle, desc: t.sellonDesc, highlight: '10–30% share' },
    { emoji: '📺', title: t.tvTitle, desc: t.tvDesc, highlight: '~$2M/yr Div A' },
    { emoji: '🏆', title: t.conmebolTitle, desc: t.conmebolDesc, highlight: '$250K–$3M+' },
  ];

  const TIMELINE = [
    { period: t.year12, label: t.year12Label, detail: t.year12Detail, active: false },
    { period: t.year24, label: t.year24Label, detail: t.year24Detail, active: false },
    { period: t.year46, label: t.year46Label, detail: t.year46Detail, active: true },
  ];

  return (
    <section id="revenue" className="py-24 bg-surface">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue sources */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-5">{t.sourcesTitle}</h3>
            <div className="flex flex-col gap-4">
              {SOURCES.map(({ emoji, title, desc, highlight }, i) => (
                <motion.div
                  key={title}
                  custom={i}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="bg-bg border border-border rounded-xl p-5 flex gap-4"
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5">{emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h4 className="text-sm font-bold text-primary">{title}</h4>
                      <span className="text-xs font-black font-mono text-accent whitespace-nowrap">{highlight}</span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column: timeline + use of funds */}
          <div className="flex flex-col gap-6">
            {/* Revenue timeline */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-bg border border-border rounded-2xl p-6"
            >
              <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-5">{t.timelineTitle}</h3>
              <div className="flex flex-col gap-0">
                {TIMELINE.map(({ period, label, detail, active }, i) => (
                  <div key={period} className="relative flex gap-4">
                    {/* Line */}
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 mt-1 ${active ? 'bg-accent border-accent' : 'bg-transparent border-border'}`} />
                      {i < TIMELINE.length - 1 && (
                        <div className="w-px flex-1 bg-border mt-1 mb-1" style={{ minHeight: '40px' }} />
                      )}
                    </div>
                    <div className={`pb-6 ${i === TIMELINE.length - 1 ? 'pb-0' : ''}`}>
                      <p className="text-xs font-mono text-muted mb-0.5">{period}</p>
                      <p className={`text-sm font-bold mb-1 ${active ? 'text-accent' : 'text-primary'}`}>{label}</p>
                      <p className="text-xs text-muted leading-relaxed">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Use of funds */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-bg border border-border rounded-2xl p-6"
            >
              <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">{t.fundsTitle}</h3>
              <Image
                src="/use_of_funds.png"
                alt="Use of Funds"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
