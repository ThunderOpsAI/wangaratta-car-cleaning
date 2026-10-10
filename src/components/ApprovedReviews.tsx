'use client';

import { useState, useEffect } from 'react';
import { Star, MessageSquareQuote, ThumbsUp, MapPin, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReviewItem {
  id: string;
  customerName: string;
  location?: string | null;
  starRating: number;
  reviewText: string;
  projectType: string | null;
  createdAt: string;
}

export function ApprovedReviews() {
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
        console.error('Failed to load approved reviews:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const averageRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.starRating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <section className="pt-32 pb-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-primary-100 text-primary-800 text-xs font-black tracking-widest uppercase mb-4 border border-primary-300">
            <ThumbsUp className="w-3.5 h-3.5 text-primary-700" />
            Verified Customer Reviews &amp; Testimonials
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-surface-900 tracking-tight">
            Client Reviews &amp; Detailing Testimonials
          </h1>
          <p className="mt-4 text-base sm:text-lg text-surface-600 font-normal leading-relaxed">
            Real feedback from local vehicle owners, 4WD drivers, and families across Wangaratta and North East Victoria who trust Wangaratta Car Cleaning with their pride and joy.
          </p>

          {reviews.length > 0 && (
            <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-2xl border border-surface-200 shadow-md">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-surface-800">
                {averageRating} / 5.0 Rating Across All Verified Reviews
              </span>
            </div>
          )}
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-surface-200 shadow-sm flex flex-col justify-between"
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
                <p className="text-sm text-surface-700 leading-relaxed italic mb-4">
                  &ldquo;{rev.reviewText}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-surface-100 flex items-center justify-between text-xs text-surface-500">
                <div>
                  <span className="font-bold text-surface-900 block">{rev.customerName}</span>
                  <span>{rev.projectType}</span>
                </div>
                {rev.location && (
                  <div className="flex items-center gap-1 text-surface-400">
                    <MapPin className="w-3 h-3" />
                    <span>{rev.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
