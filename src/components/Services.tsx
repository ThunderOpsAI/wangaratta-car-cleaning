'use client';

import { Sparkles, ShieldCheck, Check, Clock, Droplets, Sun, Car, Brush, Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    name: 'Interior Deep Clean & Steam Sanitisation',
    category: 'Cabin Hygiene & Extraction',
    description: 'High-temperature commercial steam extraction of floor carpets, seats, and boot lining. Dissolves ground-in stains, pet hair, spilled drinks, and bacteria, restoring interior surfaces to factory freshness.',
    icon: Droplets,
    tag: '150°C Steam Extraction',
    specs: [
      'Hot-water shampoo & stain extraction',
      'Leather cleaned, nourished & matte conditioned',
      'High-pressure air purging of vents & seams',
      'Antibacterial deodorising mist treatment'
    ]
  },
  {
    name: 'Multi-Stage Paint Correction & Polish',
    category: 'Optical Depth & Swirl Elimination',
    description: 'Precision dual-action machine polishing removes micro-marring, spider-web swirl marks, oxidation, and bird lime etching. Restores deep mirror gloss and optical clarity to tired or weathered paintwork.',
    icon: Sparkles,
    tag: '75% - 90%+ Swirl Removal',
    specs: [
      'Clay bar decontamination & chemical iron fallout removal',
      'Heavy cutting stage for deep scratches & orange peel',
      'Refining jewelling polish for maximum depth of shine',
      'Paint thickness gauge verified safe cutting'
    ]
  },
  {
    name: 'Signature Ceramic Coating Protection',
    category: 'Permanent Nano-Shield',
    description: 'Professional-grade Graphene and SiO2 ceramic coating creates a resilient molecular barrier against UV rays, acid rain, bird droppings, and regional red dust. Provides extreme hydrophobic self-cleaning properties.',
    icon: ShieldCheck,
    tag: 'Up to 3-Year Paint Shield',
    specs: [
      '9H pencil hardness scratch & chemical resistance',
      'Intense water beading & self-cleaning effect',
      'UV blocking to prevent clear coat fading & oxidation',
      'Includes windscreen glass & wheel face protection'
    ]
  },
  {
    name: 'Pre-Sale Presentation Detailing',
    category: 'Maximum Resale Value',
    description: 'Comprehensive top-to-bottom detail specifically formulated to maximise private sale price or dealership trade-in appraisal. Typical clients report receiving $1,500 - $3,000+ extra on sale value.',
    icon: Award,
    tag: 'High ROI on Resale',
    specs: [
      'Complete interior steam extraction & trim rejuvenation',
      'Exterior machine gloss enhancement & stone chip touch-up',
      'Engine bay steam degrease & factory dressing',
      'High-clarity windscreen & headlight polish'
    ]
  },
  {
    name: 'Work Ute, 4WD & Fleet Cleanse',
    category: 'Heavy-Duty Regional Cleaning',
    description: 'Specialised decontamination for regional trades, farm vehicles, and commercial utes hammered by North East red clay, gravel roads, and livestock mud. Underbody flush and heavy cabin vacuuming.',
    icon: Car,
    tag: 'Tough Red Dust Removal',
    specs: [
      'Chassis & underbody mud removal flush',
      'Heavy-duty industrial vacuum for red dirt & gravel',
      'Tray & tub liner high-pressure steam degrease',
      'Fleet discount packages for local Wangaratta businesses'
    ]
  },
  {
    name: 'Headlight Clarity & Trim UV Restoration',
    category: 'Safety & Aesthetic Rejuvenation',
    description: 'Multi-stage wet sanding and chemical restoration of yellowed, cloudy, oxidized polycarbonate headlight lenses, followed by a UV-blocking sealant. Restores night visibility and roadworthy compliance.',
    icon: Sun,
    tag: 'Roadworthy Compliant',
    specs: [
      '3-stage wet-sanding to eliminate oxidation',
      'High-speed rotary clarity compound buffing',
      'UV-blocking polymer sealant preventing yellowing',
      'Faded exterior black plastics conditioned & UV sealed'
    ]
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-surface-50 text-surface-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 text-primary-800 text-xs font-black uppercase tracking-wider mb-3">
            <Brush className="w-3.5 h-3.5 text-primary-600" />
            Complete Auto Detailing Solutions
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-surface-900 tracking-tight">
            Craftsmanship Detailing Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-surface-600 font-normal">
            Whether your daily driver needs a revitalising interior shampoo or your performance vehicle demands multi-stage paint correction and ceramic protection, our Wangaratta studio and mobile service delivers unmatched results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 border border-surface-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-surface-950 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface-100 text-surface-700">
                      {service.tag}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-1">
                    {service.category}
                  </span>
                  <h3 className="text-xl font-black text-surface-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-surface-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-surface-100 mb-6">
                    {service.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs text-surface-700 font-medium">
                        <Check className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/#estimator"
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs text-center bg-surface-100 hover:bg-primary-500 hover:text-surface-950 text-surface-800 transition-colors block"
                >
                  Calculate Price for this Service
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
