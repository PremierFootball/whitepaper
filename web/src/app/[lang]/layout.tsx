import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://premierfootball.io'),
  title: 'Premier Football Growth — Tokenized Football Club',
  description:
    'The first tokenized professional football club built to compete in CONMEBOL. Football is the asset. Crypto is the rail.',
  openGraph: {
    title: 'Premier Football Growth',
    description: 'Football is the asset. Crypto is the rail.',
    images: ['/logo.png'],
  },
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }, { lang: 'pt' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang} className={inter.variable}>
      <body className="bg-bg text-primary antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
