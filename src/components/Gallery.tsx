'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, CheckCircle2, ShieldCheck, Car, Droplets } from 'lucide-react';
import Link from 'next/link';

const categories = [
  'All',
  'Ceramic Coating',
  'Paint Correction',
  'Interior Deep Clean',
  '4WD & Work Utes',
  'Pre-Sale Restorations'
] as const;

type Category = typeof categories[number];

const projectGallery = [
  {
    id: 1,
    title: 'Graphene Ceramic Coating on Ford Everest 4WD',
    location: 'Wangaratta, VIC',
    category: 'Ceramic Coating',
    tag: '3-Year 9H Ceramic Shield',
    desc: 'Full vehicle decontamination, single-stage gloss enhancement, and 2-layer graphene ceramic coating with intense water beading.'
  },
  {
    id: 2,
    title: 'Multi-Stage Paint Correction on Black HSV ClubSport',
    location: 'Glenrowan, VIC',
    category: 'Paint Correction',
    tag: '85% Swirl & Scratch Elimination',
    desc: 'Heavy rotary compounding followed by dual-action jewelling polish to completely remove heavy car wash swirl marks and micro-marring.'
  },
  {
    id: 3,
    title: 'Family Mazda CX-9 Interior Steam Extraction',
    location: 'Wangaratta, VIC',
    category: 'Interior Deep Clean',
    tag: '150°C Steam & Fabric Extraction',
    desc: 'Hot-water extraction of floor carpets, pet hair eradication, and deep leather cleaning with matte UV barrier protection.'
  },
  {
    id: 4,
    title: 'Regional Trade Hilux Dual-Cab Red Dust Revival',
    location: 'Milawa, VIC',
    category: '4WD & Work Utes',
    tag: 'Underbody & Engine Bay Clean',
    desc: 'Heavy red dust chemical wash, wheel arch degreasing, tray pressure steam, and complete cabin sanitisation.'
  },
  {
    id: 5,
    title: 'Pre-Sale Resale Package on Golf GTI',
    location: 'Oxley, VIC',
    category: 'Pre-Sale Restorations',
    tag: 'Showroom Resale Condition',
    desc: 'Engine bay dressing, headlight clarity restoration, fine gloss polish, and interior shampoo resulting in full price sale in 48 hours.'
  },
  {
    id: 6,
    title: 'Subaru Outback Dog Hair & Mud Extraction',
    location: 'Beechworth, VIC',
    category: 'Interior Deep Clean',
    tag: 'Specialist Pet Hair Removal',
    desc: 'Deep mechanical rubber brush pet hair extraction and upholstery shampoo removing all pet odors and mud stains.'
  },
];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const filteredProjects = selectedCategory === 'All'
    ? projectGallery
    : projectGallery.filter((p) => p.category === selectedCategory);

  return (
    <section className="pt-32 pb-16 bg-surface-50 text-surface-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 text-primary-800 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-primary-600" />
            Showroom Transformations
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-surface-900 tracking-tight">
            Vehicle Detailing Portfolio
          </h1>
          <p className="mt-4 text-base sm:text-lg text-surface-600 font-normal">
            Browse our completed automotive detailing projects across Wangaratta and North East Victoria. From mirror-gloss paint corrections to deep interior extractions.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-primary-500 text-surface-950 shadow-md'
                  : 'bg-white border border-surface-200 text-surface-700 hover:bg-surface-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl p-6 border border-surface-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary-50 text-primary-700">
                    {project.tag}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-surface-500">
                    <MapPin className="w-3.5 h-3.5 text-primary-500" />
                    <span>{project.location}</span>
                  </div>
                </div>

                <h3 className="text-lg font-black text-surface-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-surface-600 leading-relaxed mb-4">
                  {project.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-surface-100 flex items-center justify-between">
                <span className="text-xs font-bold text-primary-600">{project.category}</span>
                <Link
                  href="/quote"
                  className="text-xs font-bold text-surface-700 hover:text-primary-600 transition-colors"
                >
                  Book Similar Service &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
