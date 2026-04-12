'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useDict } from '@/providers/DictionaryProvider';

const NAV_LINKS = [
  { key: 'vision',     href: '#vision' },
  { key: 'tokenomics', href: '#tokenomics' },
  { key: 'revenue',    href: '#revenue' },
  { key: 'roadmap',    href: '#roadmap' },
  { key: 'team',       href: '#team' },
] as const;

export default function Navbar({ lang }: { lang: string }) {
  const dict = useDict();
  const t = dict.nav;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const allLangs = ['en', 'es', 'pt'] as const;
  const otherLangs = allLangs.filter((l) => l !== lang);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="PFG"
            width={32}
            height={32}
            className="rounded-sm"
          />
          <span className="font-bold text-sm tracking-widest text-primary uppercase">
            Premier Football Growth
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              {t[key as keyof typeof t]}
            </a>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          {/* Lang toggle */}
          <div className="flex items-center gap-1">
            {otherLangs.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                className="text-xs font-mono text-muted hover:text-accent border border-border px-2 py-1 rounded transition-colors"
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>

          <a
            href="#invest"
            className="text-sm font-semibold bg-accent text-bg px-4 py-2 rounded-md hover:bg-accent/90 transition-colors"
          >
            {t.investNow}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-muted hover:text-primary p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface border-b border-border px-4 pb-4 pt-2 flex flex-col gap-3">
          {NAV_LINKS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="text-sm text-muted hover:text-primary py-1"
              onClick={() => setOpen(false)}
            >
              {t[key as keyof typeof t]}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            <div className="flex gap-1">
              {otherLangs.map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  className="text-xs font-mono text-muted border border-border px-2 py-1 rounded"
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
            <a
              href="#invest"
              className="text-sm font-semibold bg-accent text-bg px-4 py-2 rounded-md"
              onClick={() => setOpen(false)}
            >
              {t.investNow}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
