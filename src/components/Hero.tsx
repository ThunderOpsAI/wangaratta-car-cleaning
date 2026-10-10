'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles,
  Car,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  Droplets,
  Gauge,
  Sun
} from 'lucide-react';
import Link from 'next/link';

const DETAILING_HIGHLIGHTS = [
  {
    id: 'ceramic-coating',
    name: 'Ceramic Paint Protection',
    shortName: 'Ceramic Coating',
    icon: ShieldCheck,
    category: 'Ultimate Paint Shield',
    headline: 'High-Gloss Ceramic & Graphene Coating',
    description: 'Ultra-hydrophobic nano-ceramic shield bonding molecularly to your vehicle paint. Repels North East red dust, tree sap, road grime, bird lime, and harmful UV rays with up to 3 years guaranteed protection.',
    specs: {
      durability: '9H Hardness Graphene / SiO2 Ceramic Shield',
      finish: 'Mirror Reflection with Intense Contact Angle Hydrophobics',
      warranty: 'Long-Life Paint Protection Warranty',
    },
    badge: 'Flagship Protection',
  },
  {
    id: 'paint-correction',
    name: 'Multi-Stage Paint Correction',
    shortName: 'Paint Correction',
    icon: Sparkles,
    category: 'Flawless Paint Finish',
    headline: 'Swirl Mark Removal & Precision Machine Polish',
    description: 'Dual-action rotary and orbital machine polishing erasing spider-web swirls, scrub scratches, water etching, and oxidation to reveal deep, crystalline paint clarity and optical depth.',
    specs: {
      defectRemoval: '75% to 90%+ Swirl & Scratch Elimination',
      technology: 'Dual-Action Random Orbital & Micro-Abrasive Compounds',
      clarity: 'True Mirror Showroom Reflection on All Paint Types',
    },
    badge: 'Showroom Shine',
  },
  {
    id: 'interior-steam',
    name: 'Interior Deep Clean & Steam Extraction',
    shortName: 'Interior Steam Clean',
    icon: Droplets,
    category: 'Sanitised Cabin Rejuvenation',
    headline: 'High-Heat Steam Extraction & Allergen Sanitisation',
    description: 'Commercial-grade 150°C dry steam extraction dissolving embedded mud, stubborn stains, food spills, milk spills, and pet dander. Restores leather suppleness and leaves a non-greasy matte factory finish.',
    specs: {
      sanitisation: '150°C Bacteria, Mould & Odour Neutralisation',
      fabricCare: 'Hot-Water Extraction Shampoo for Carpets & Seats',
      finishing: 'UV-Resistant Satin Conditioner for Trims & Consoles',
    },
    badge: 'Family & Pet Sanitised',
  },
  {
    id: 'mobile-fleet',
    name: 'Mobile Detailing & Fleet Cleanse',
    shortName: 'Mobile Service',
    icon: Car,
    category: 'Convenience at Your Door',
    headline: 'Fully Equipped Mobile Detailing Van Across Wangaratta',
    description: 'We bring onboard deionised spot-free water, whisper-quiet power generators, and professional detailing rigs direct to your driveway, farm, or workplace throughout the Wangaratta district.',
    specs: {
      waterSystem: '100% Spot-Free Deionised Pure Rinse Water',
      coverage: 'Wangaratta, Glenrowan, Oxley, Milawa & District',
      versatility: 'Sedans, SUVs, Dual-Cab 4WDs, Caravans & Farm Utes',
    },
    badge: 'We Come To You',
  },
];

export function Hero() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeHighlight = DETAILING_HIGHLIGHTS[selectedIdx];
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const phoneNumber = '0479 107 101';
  const cleanPhone = '0479107101';

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setSelectedIdx((prev) => (prev + 1) % DETAILING_HIGHLIGHTS.length);
    }, 6000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    startTimer();
  };

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute -top-24 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/15 text-primary-400 border border-primary-500/30 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Wangaratta’s Premier Detailing Specialists
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-800 text-surface-300 border border-surface-700 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-primary-400" />
            Mobile Van &amp; Dedicated Studio
          </div>
        </div>

        {/* Main Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-surface-900 tracking-tight leading-[1.08]">
              Precision Auto Detailing, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-sky-500 bg-clip-text text-transparent">
                Paint Correction &amp; Ceramic Shield
              </span>
            </h1>

            <p className="text-base sm:text-lg text-surface-600 leading-relaxed max-w-2xl font-normal">
              From family SUV interior sanitisation and pet hair extraction to multi-stage machine polish and 3-year ceramic paint protection, Wangaratta Car Cleaning delivers mirror gloss and lasting showroom protection across Wangaratta &amp; North East Victoria.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/quote"
                className="flex items-center justify-center gap-2.5 px-7 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-surface-950 font-black rounded-2xl text-base shadow-xl shadow-primary-500/25 transition-all hover:scale-103"
              >
                <span>Book a Detail</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/#estimator"
                className="flex items-center justify-center gap-2.5 px-6 py-4 bg-surface-900 hover:bg-surface-800 text-white font-bold rounded-2xl text-base transition-all border border-surface-700 shadow-md"
              >
                <Gauge className="w-5 h-5 text-primary-400" />
                <span>Instant Estimate</span>
              </Link>

              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-center gap-2 px-5 py-4 bg-white hover:bg-surface-100 text-surface-900 font-bold rounded-2xl text-base transition-all border border-surface-200 shadow-sm"
              >
                <Phone className="w-4 h-4 text-primary-600" />
                <span>{phoneNumber}</span>
              </a>
            </div>

            {/* Micro Trust points */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-surface-200 text-xs text-surface-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0" />
                <span>Spot-Free Deionised Wash</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0" />
                <span>150°C Interior Steam</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0" />
                <span>Ceramic Certified Techs</span>
              </div>
            </div>
          </div>

          {/* Interactive Feature Card Showcase */}
          <div className="lg:col-span-5">
            <div className="bg-surface-950 text-white rounded-3xl p-6 sm:p-8 border border-surface-800 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 border border-primary-500/30">
                  {activeHighlight.badge}
                </span>
                <span className="text-xs text-surface-400">{activeHighlight.category}</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHighlight.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-black text-white leading-tight">
                    {activeHighlight.headline}
                  </h3>
                  <p className="text-sm text-surface-300 leading-relaxed">
                    {activeHighlight.description}
                  </p>

                  <div className="space-y-2.5 pt-2 border-t border-surface-800/80">
                    {Object.entries(activeHighlight.specs).map(([key, val]) => (
                      <div key={key} className="flex items-start gap-2 text-xs text-surface-300">
                        <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                        <span>{val}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Selector Tabs */}
              <div className="grid grid-cols-2 gap-2 mt-6 pt-5 border-t border-surface-800">
                {DETAILING_HIGHLIGHTS.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = idx === selectedIdx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(idx)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl text-left text-xs transition-all ${
                        isActive
                          ? 'bg-primary-500 text-surface-950 font-bold shadow-md shadow-primary-500/30'
                          : 'bg-surface-900 text-surface-400 hover:text-white hover:bg-surface-850'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.shortName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
