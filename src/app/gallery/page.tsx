import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Gallery } from '@/components/Gallery';
import { BeforeAfterSection } from '@/components/BeforeAfterSection';
import { PreFooterCTAs } from '@/components/PreFooterCTAs';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ScrollingBackground } from '@/components/ScrollingBackground';

export const metadata: Metadata = {
  title: 'Detailing Portfolio & Before/After Gallery | Wangaratta Car Cleaning',
  description: 'View our auto detailing transformations, multi-stage paint correction results, interior steam clean restorations, and ceramic coating gloss across Wangaratta & North East Victoria.',
  openGraph: {
    title: 'Detailing Portfolio & Transformations | Wangaratta Car Cleaning',
    description: 'Explore finished paint corrections, stain extractions, and ceramic coatings across Wangaratta, Glenrowan, Milawa, and Beechworth.',
    type: 'website',
  },
};

export default function GalleryPage() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-primary-200 text-surface-900 transition-colors duration-500 overflow-x-hidden">
      <ScrollingBackground />
      <Header />
      <main className="relative z-10">
        <Gallery />
        <BeforeAfterSection />
        <PreFooterCTAs />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
