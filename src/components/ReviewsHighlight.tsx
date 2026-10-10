'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ArrowRight, MessageSquareQuote, ShieldCheck, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReviewItem {
  id: string;
  customerName: string;
  starRating: number;
  reviewText: string;
  projectType: string | null;
  location?: string | null;
  createdAt: string;
}

export function ReviewsHighlight() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (data.reviews && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      })
      .catch((err) => {
        console.error('Failed to load reviews highlight:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading || reviews.length === 0) {
    return null;
  }

  const displayedReviews = reviews.slice(0, 4);

  return (
    <section className="py-20 relative z-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-primary-100 text-primary-800 text-xs font-black tracking-widest uppercase mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-primary-700" />
              Verified Local Car Owner Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900">
              Trusted Across Wangaratta &amp; North East Victoria
            </h2>
            <p className="mt-2 text-base text-surface-600 font-normal">
              Read real feedback from vehicle owners, 4WD enthusiasts, and regional families who trust our detailing craft.
            </p>
          </div>

          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            <span>View All Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-surface-50 rounded-2xl p-6 border border-surface-200/80 shadow-sm flex flex-col justify-between hover:border-primary-300 transition-colors"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rev.starRating ? 'fill-amber-400 text-amber-400' : 'text-surface-300'}`}
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-surface-700 leading-relaxed italic mb-4">
                  &ldquo;{rev.reviewText}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-surface-200/60">
                <div className="font-bold text-xs text-surface-900">{rev.customerName}</div>
                <div className="flex items-center justify-between text-[11px] text-surface-500 mt-0.5">
                  <span>{rev.projectType || 'Auto Detail'}</span>
                  {rev.location && <span>{rev.location}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
