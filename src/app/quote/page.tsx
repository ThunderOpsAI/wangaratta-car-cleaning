import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { QuoteForm } from '@/components/QuoteForm';
import { DetailingEstimator } from '@/components/DetailingEstimator';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ScrollingBackground } from '@/components/ScrollingBackground';

export const metadata: Metadata = {
  title: 'Book a Detail & Live Package Calculator | Wangaratta Car Cleaning',
  description: 'Book your auto detail online or calculate your detailing package price for sedans, SUVs, and 4WDs in Wangaratta & North East Victoria.',
  openGraph: {
    title: 'Book a Detail & Live Price Estimate | Wangaratta Car Cleaning',
    description: 'Instant vehicle detailing estimates and easy booking across Wangaratta, Glenrowan, Oxley, Milawa, Beechworth.',
    type: 'website',
  },
};

export default function QuotePage() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-primary-200 text-surface-900 transition-colors duration-500 overflow-x-hidden">
      <ScrollingBackground />
      <Header />
      <main className="relative z-10 pt-4">
        <QuoteForm />
        <div className="border-t border-surface-200">
          <DetailingEstimator />
        </div>
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
