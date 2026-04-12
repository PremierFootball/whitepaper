'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useDict } from '@/providers/DictionaryProvider';

const WHITEPAPER_URL = 'https://premierfootball.github.io/whitepaper/';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease },
  }),
};

export default function Hero() {
  const dict = useDict();
  const t = dict.hero;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle particle grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.floor(canvas.width / 60);
      const rows = Math.floor(canvas.height / 60);

      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const x = c * 60;
          const y = r * 60;
          const wave = Math.sin(t * 0.01 + c * 0.3 + r * 0.3) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 232, 122, ${wave * 0.15})`;
          ctx.fill();
        }
      }
      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const STATS = [
    { value: t.stat1Value, label: t.stat1Label },
    { value: t.stat2Value, label: t.stat2Label },
    { value: t.stat3Value, label: t.stat3Label },
    { value: t.stat4Value, label: t.stat4Label },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg">
      {/* Animated grid canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,232,122,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 border border-accent/30 text-accent text-xs font-mono px-3 py-1.5 rounded-full mb-8 bg-accent/5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Token Sale Open — Seed Round
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-4xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-2"
        >
          {t.line1}
        </motion.h1>
        <motion.h1
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-4xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight text-accent mb-8"
        >
          {t.line2}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-base sm:text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <a
            href={WHITEPAPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-border text-primary text-sm font-semibold px-6 py-3 rounded-md hover:border-accent/50 hover:text-accent transition-colors"
          >
            {t.cta1}
          </a>
          <a
            href="#invest"
            className="w-full sm:w-auto bg-accent text-bg text-sm font-bold px-6 py-3 rounded-md hover:bg-accent/90 transition-colors"
          >
            {t.cta2} →
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-border rounded-xl overflow-hidden bg-border"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="bg-surface px-4 py-5 flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-black text-accent font-mono mb-1">
                {value}
              </span>
              <span className="text-xs text-muted text-center">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
