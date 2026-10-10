'use client';

import Link from 'next/link';
import { ArrowRight, Calculator, CalendarCheck, Phone, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function PreFooterCTAs() {
  const phoneNumber = '0479 107 101';
  const cleanPhone = '0479107101';

  return (
    <section className="py-14 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Instant Detailing Estimator */}
          <Link href="/#estimator" className="group block">
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="h-full p-8 sm:p-10 rounded-3xl bg-surface-950 text-white border border-surface-800 shadow-2xl hover:border-primary-500/60 transition-all flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <Calculator className="w-32 h-32 text-primary-400" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-500/20 text-primary-400 border border-primary-500/40 text-xs font-black uppercase tracking-wider mb-4">
                  <Calculator className="w-3.5 h-3.5" />
                  Live Detailing Estimator
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-primary-400 transition-colors">
                  Instant Package Calculator
                </h3>
                <p className="mt-3 text-sm text-surface-300 font-normal leading-relaxed">
                  Select your vehicle size (Sedan, SUV, 4WD/Ute) and detailing tier (Interior Deep Clean, Paint Correction, Full Ceramic) for instant live pricing and completion times.
                </p>
              </div>

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-primary-400 group-hover:text-primary-300">
                <span>Launch Price Calculator</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>
          </Link>

          {/* Card 2: Book a Detail */}
          <Link href="/quote" className="group block">
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="h-full p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 text-surface-950 shadow-2xl hover:shadow-primary-500/30 transition-all flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-15 group-hover:opacity-25 transition-opacity pointer-events-none text-surface-950">
                <CalendarCheck className="w-32 h-32" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-surface-950/20 text-surface-950 border border-surface-950/20 text-xs font-black uppercase tracking-wider mb-4">
                  <CalendarCheck className="w-3.5 h-3.5 text-surface-950" />
                  Fast Booking Confirmation
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-surface-950">
                  Book a Detail Today
                </h3>
                <p className="mt-3 text-sm text-surface-900 font-medium leading-relaxed">
                  Reserve your appointment online or call us directly at <strong>{phoneNumber}</strong> for same-week mobile service across Wangaratta &amp; North East VIC.
                </p>
              </div>

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-black text-surface-950 group-hover:translate-x-1 transition-transform">
                <span>Book Your Vehicle Detail</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          </Link>

        </div>
      </div>
    </section>
  );
}
