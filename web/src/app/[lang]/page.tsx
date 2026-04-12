import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from '@/lib/dictionaries';
import { DictionaryProvider } from '@/providers/DictionaryProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import StatsBar from '@/components/sections/StatsBar';
import Vision from '@/components/sections/Vision';
import Opportunity from '@/components/sections/Opportunity';
import Tokenomics from '@/components/sections/Tokenomics';
import RevenueModel from '@/components/sections/RevenueModel';
import Roadmap from '@/components/sections/Roadmap';
import Team from '@/components/sections/Team';
import Transparency from '@/components/sections/Transparency';
import InvestCTA from '@/components/sections/InvestCTA';

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <DictionaryProvider dict={dict}>
      <Navbar lang={lang} />
      <main>
        <Hero />
        <StatsBar />
        <Vision />
        <Opportunity />
        <Tokenomics />
        <RevenueModel />
        <Roadmap />
        <Team />
        <Transparency />
        <InvestCTA />
      </main>
      <Footer lang={lang} />
    </DictionaryProvider>
  );
}
