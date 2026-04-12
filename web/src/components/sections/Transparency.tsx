'use client';

import { motion } from 'framer-motion';
import { Eye, Lock, XCircle } from 'lucide-react';
import { useDict } from '@/providers/DictionaryProvider';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease },
  }),
};

export default function Transparency() {
  const dict = useDict();
  const t = dict.transparency;

  const GOV_STEPS = [
    { gov: t.phase1Gov, trigger: t.phase1GovTrigger },
    { gov: t.phase2Gov, trigger: t.phase2GovTrigger },
    { gov: t.phase3Gov, trigger: t.phase3GovTrigger },
    { gov: t.phase4Gov, trigger: t.phase4GovTrigger },
  ];

  const BOUNDARIES = [t.boundary1, t.boundary2, t.boundary3, t.boundary4];

  return (
    <section className="py-24 bg-bg">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Multisig */}
          <motion.div
            custom={0}
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-surface border border-border rounded-2xl p-7"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                <Eye size={18} className="text-accent" />
              </div>
              <h3 className="text-base font-bold text-primary">{t.multisigTitle}</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-6">{t.multisigDescription}</p>

            <div className="bg-bg border border-border rounded-xl p-4 mb-0">
              <p className="text-xs font-semibold text-muted mb-2">{t.signers}</p>
              <p className="text-xs text-muted/70 font-mono leading-relaxed">{t.signersDetail}</p>
            </div>
          </motion.div>

          {/* Progressive governance */}
          <motion.div
            custom={1}
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-surface border border-border rounded-2xl p-7"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                <Lock size={18} className="text-gold" />
              </div>
              <h3 className="text-base font-bold text-primary">{t.governanceTitle}</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-5">{t.governanceDescription}</p>
            <div className="flex flex-col gap-3">
              {GOV_STEPS.map(({ gov, trigger }, i) => (
                <div key={gov} className="relative flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-black ${i < 2 ? 'border-accent text-accent' : 'border-border text-muted'}`}>
                      {i + 1}
                    </div>
                    {i < GOV_STEPS.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-1" style={{ minHeight: '24px' }} />
                    )}
                  </div>
                  <div className="pb-3">
                    <p className="text-xs font-semibold text-primary">{gov}</p>
                    <p className="text-xs text-muted/60">{trigger}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Boundaries */}
          <motion.div
            custom={2}
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-surface border border-border rounded-2xl p-7"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
                <XCircle size={18} className="text-red-400" />
              </div>
              <h3 className="text-base font-bold text-primary">{t.boundaryTitle}</h3>
            </div>
            <div className="flex flex-col gap-2.5 mb-5">
              {BOUNDARIES.map((b) => (
                <div key={b} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 flex-shrink-0" />
                  <span className="text-sm text-muted">{b}</span>
                </div>
              ))}
            </div>
            <div className="bg-bg border border-border rounded-xl p-4">
              <p className="text-xs text-muted/70 leading-relaxed italic">{t.boundaryNote}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
