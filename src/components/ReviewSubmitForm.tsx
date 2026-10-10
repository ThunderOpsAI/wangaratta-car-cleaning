'use client';

import { useState } from 'react';
import { Star, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';

const PROJECT_TYPES = [
  'Full Signature Detail & Ceramic Protection',
  'Exterior Paint Correction & Shine',
  'Interior Deep Clean & Steam Sanitisation',
  'Pre-Sale Resale Value Detailing',
  'Work Ute & Fleet Red Dust Cleanse',
  'Headlight Clarity & Trim UV Restoration',
  'Other Detailing Treatment',
];

export function ReviewSubmitForm() {
  const [customerName, setCustomerName] = useState('');
  const [location, setLocation] = useState('');
  const [starRating, setStarRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [projectType, setProjectType] = useState('');
  const [reviewText, setReviewText] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (customerName.trim().length < 2) {
      setError('Please provide your name (at least 2 characters).');
      return;
    }

    if (reviewText.trim().length < 10) {
      setError('Please provide a review with at least 10 characters.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim(),
          location: location.trim() || undefined,
          starRating,
          projectType: projectType || undefined,
          reviewText: reviewText.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Submit review error:', err);
      setError(err.message || 'An error occurred while submitting your review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-surface-50 border-t border-surface-200">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-surface-200 shadow-xl">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-primary-600 block mb-1">
              Feedback Matters
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-surface-900">
              Leave a Customer Review
            </h2>
            <p className="text-xs sm:text-sm text-surface-600 mt-2">
              Had your car cleaned, polished, or ceramic coated by Wangaratta Car Cleaning? We would love to hear your experience!
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-surface-900">Thank You for Your Feedback!</h3>
              <p className="text-sm text-surface-600 max-w-md mx-auto">
                Your review has been successfully submitted and verified. Thank you for supporting our local Wangaratta detailing business!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Star Rating */}
              <div className="text-center pb-2">
                <label className="block text-xs font-bold text-surface-700 uppercase mb-2">Rating</label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setStarRating(star)}
                      className="p-1 text-2xl transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          (hoverRating || starRating) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-surface-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. John S."
                    className="w-full px-4 py-2.5 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Town / Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Wangaratta, Milawa"
                    className="w-full px-4 py-2.5 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Service Performed</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                >
                  <option value="">Select Detailing Service</option>
                  {PROJECT_TYPES.map((type, idx) => (
                    <option key={idx} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Review Comments *</label>
                <textarea
                  required
                  rows={4}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us about the vehicle transformation, interior steam clean, or shine..."
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-primary-500 hover:bg-primary-400 text-surface-950 font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing Review...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Review</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
