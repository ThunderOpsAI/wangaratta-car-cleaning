'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, ShieldCheck, Droplets, Sun, Car } from 'lucide-react';
import Link from 'next/link';

const COMPARISON_SETS = [
  {
    id: 'paint-correction-comp',
    title: 'Paint Correction: Swirl Marks & Buffer Trails to Flawless Mirror Reflection',
    subtitle: 'Dual-action machine cut compound eliminates micro-scratches and spider-web wash swirls, followed by refining polish and protective sealant.',
    beforeTitle: 'Swirled & Weathered Clear Coat',
    beforeDesc: 'Heavy spider-webbing from automatic car washes, surface oxidation, and dull grey reflections.',
    afterTitle: 'Flawless Crystalline Mirror Polish',
    afterDesc: 'Deep, crisp optical clarity with 85%+ defects eradicated and high-solids hydrophobic sealant applied.',
    milestones: [
      { step: '01', title: 'Chemical Decon', desc: 'Iron fallout dissolved & clay bar decontamination.' },
      { step: '02', title: 'Paint Depth Check', desc: 'Digital gauge verification of clear coat thickness.' },
      { step: '03', title: 'Dual-Action Cut', desc: 'Micro-abrasive compound levelling clear coat defects.' },
      { step: '04', title: 'Jewelling Polish', desc: 'Ultra-fine foam pad producing deep liquid mirror gloss.' },
    ]
  },
  {
    id: 'interior-steam-comp',
    title: 'Interior Extraction: Stained Family Cabin to 150°C Steam Sanitised Freshness',
    subtitle: 'Extracting years of embedded red dust, stubborn coffee stains, muddy footprints, and pet odors with zero harsh chemical residue.',
    beforeTitle: 'Stained & Mud-Caked Upholstery',
    beforeDesc: 'Embedded North East red clay, milk spills, sticky residues, and dust trapped in fabric fibres.',
    afterTitle: 'Sanitised & Extracted Fabric',
    afterDesc: 'High-heat 150°C steam extraction neutralises 99.9% of bacteria with quick-drying hot-water rinse.',
    milestones: [
      { step: '01', title: 'Air Purge & Vac', desc: 'Tornador pneumatic blast removes hidden grit from seams.' },
      { step: '02', title: 'Enzyme Treatment', desc: 'Organic stain break-down of milk, food, and mud.' },
      { step: '03', title: '150°C Steam Rinse', desc: 'Commercial extraction drawing out deep-set soil.' },
      { step: '04', title: 'Matte UV Protection', desc: 'Anti-static, non-greasy satin dressing on dash & trims.' },
    ]
  },
  {
    id: 'headlight-comp',
    title: 'Headlight Restoration: Opaque Yellow Oxidation to Crystal Clear Night Vision',
    subtitle: 'Restoring dangerous, foggy polycarbonate lenses to crystal-clear factory transparency with UV-blocking polymer sealant.',
    beforeTitle: 'Foggy, Yellowed Polycarbonate',
    beforeDesc: 'Severe UV degradation causing beam scattering, diminished night vision, and roadworthy inspection failure.',
    afterTitle: 'Crystal Clear Sealed Lenses',
    afterDesc: 'Full optical clarity restored with 3-year UV blocking acrylic clear coat preventing re-yellowing.',
    milestones: [
      { step: '01', title: 'Masking & Prep', desc: 'Surrounding paint taped with precision automotive border.' },
      { step: '02', title: 'Wet Sanding', desc: 'Graduated 800 to 3000 grit sand removing burnt UV layer.' },
      { step: '03', title: 'Rotary Buffing', desc: 'Specialist plastic clarity polish removes sanding hazing.' },
      { step: '04', title: 'UV Clear Shield', desc: 'Ceramic/polymer seal locking in lens optical transparency.' },
    ]
  }
];

export function BeforeAfterSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeSet = COMPARISON_SETS[activeIdx];

  return (
    <section className="py-20 bg-surface-900 text-surface-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/20 text-primary-400 border border-primary-500/30 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Detailing Transformations &amp; Process
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            See the Quality Difference
          </h2>
          <p className="mt-4 text-base sm:text-lg text-surface-300">
            Compare before-and-after conditions across paint correction, interior steam extraction, and headlight restoration.
          </p>
        </div>

        {/* Set Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {COMPARISON_SETS.map((set, idx) => (
            <button
              key={set.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                idx === activeIdx
                  ? 'bg-primary-500 text-surface-950 shadow-lg shadow-primary-500/20 font-black'
                  : 'bg-surface-800 text-surface-300 hover:bg-surface-750 hover:text-white'
              }`}
            >
              {set.title.split(':')[0]}
            </button>
          ))}
        </div>

        {/* Transformation Showcase Card */}
        <div className="bg-surface-950 rounded-3xl p-6 sm:p-10 border border-surface-800 shadow-2xl">
          <div className="max-w-3xl mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              {activeSet.title}
            </h3>
            <p className="text-sm text-surface-400">
              {activeSet.subtitle}
            </p>
          </div>

          {/* Before & After Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-surface-900 rounded-2xl p-6 border border-red-500/30 relative">
              <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-black uppercase mb-3">
                Condition Before
              </span>
              <h4 className="text-lg font-bold text-white mb-2">{activeSet.beforeTitle}</h4>
              <p className="text-xs sm:text-sm text-surface-400">{activeSet.beforeDesc}</p>
            </div>

            <div className="bg-surface-900 rounded-2xl p-6 border border-emerald-500/40 relative">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black uppercase mb-3">
                Condition After
              </span>
              <h4 className="text-lg font-bold text-white mb-2">{activeSet.afterTitle}</h4>
              <p className="text-xs sm:text-sm text-surface-400">{activeSet.afterDesc}</p>
            </div>
          </div>

          {/* 4-Step Process Milestones */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-primary-400 mb-4">
              Our 4-Step Craft Process
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeSet.milestones.map((m, idx) => (
                <div key={idx} className="bg-surface-900/60 rounded-xl p-4 border border-surface-800">
                  <span className="text-primary-400 text-xs font-black block mb-1">{m.step}</span>
                  <div className="text-white text-sm font-bold mb-1">{m.title}</div>
                  <div className="text-surface-400 text-xs">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-surface-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary-400" />
              <span>Professional Equipment • Safe on Modern Clear Coats &amp; Fine Leather</span>
            </div>
            <Link
              href="/quote"
              className="px-6 py-3 bg-primary-500 hover:bg-primary-400 text-surface-950 font-bold rounded-xl text-xs transition-all shadow-md"
            >
              Book This Transformation &rarr;
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
