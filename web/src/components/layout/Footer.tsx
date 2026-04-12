'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useDict } from '@/providers/DictionaryProvider';

const WHITEPAPER_URL = 'https://premierfootball.github.io/whitepaper/';
const GITHUB_URL = 'https://github.com/premierfootball';

export default function Footer({ lang }: { lang: string }) {
  const dict = useDict();
  const t = dict.footer;
  const allLangs = ['en', 'es', 'pt'] as const;
  const otherLangs = allLangs.filter((l) => l !== lang);
  const langLabels: Record<string, string> = {
    en: 'English', es: 'Español', pt: 'Português',
  };

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <Image src="/logo.png" alt="PFG" width={28} height={28} className="rounded-sm" />
              <span className="font-bold text-sm tracking-widest text-primary uppercase">PFG</span>
            </div>
            <p className="text-sm text-muted leading-relaxed italic">{t.tagline}</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <a
              href={WHITEPAPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              {t.whitepaper} ↗
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              {t.github} ↗
            </a>
            <span className="text-sm text-muted/60">
              {t.contract} <span className="text-muted/40">{t.contractNote}</span>
            </span>
            {otherLangs.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                className="text-sm text-muted hover:text-accent transition-colors mt-1"
              >
                {langLabels[l]}
              </Link>
            ))}
          </div>

          {/* Disclaimer */}
          <div>
            <p className="text-xs text-muted/60 leading-relaxed">{t.disclaimer}</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted/40">© {new Date().getFullYear()} {t.rights}</p>
        </div>
      </div>
    </footer>
  );
}
