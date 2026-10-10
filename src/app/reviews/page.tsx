import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ScrollingBackground } from '@/components/ScrollingBackground';
import { ApprovedReviews } from '@/components/ApprovedReviews';
import { ReviewSubmitForm } from '@/components/ReviewSubmitForm';
import { PreFooterCTAs } from '@/components/PreFooterCTAs';

export const metadata: Metadata = {
  title: 'Client Reviews & Detailing Testimonials | Wangaratta Car Cleaning',
  description: 'Read reviews and testimonials from Wangaratta vehicle owners and families who trust Wangaratta Car Cleaning for quality car detailing and ceramic coatings.',
  openGraph: {
    title: 'Client Reviews & Detailing Testimonials | Wangaratta Car Cleaning',
    description: 'Verified testimonials from local vehicle owners across Wangaratta and North East Victoria.',
    type: 'website',
  },
};

export default function ReviewsPage() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-primary-200 text-surface-900 transition-colors duration-500 overflow-x-hidden">
      <ScrollingBackground />
      <Header />
      <main className="relative z-10">
        <ApprovedReviews />
        <ReviewSubmitForm />
        <PreFooterCTAs />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
