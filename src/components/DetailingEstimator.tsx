'use client';

import React, { useState } from 'react';
import { Sparkles, Car, ShieldCheck, CheckCircle2, ArrowRight, Phone, Clock, Plus, Zap } from 'lucide-react';
import Link from 'next/link';

export interface DetailingEstimatorProps {
  onApplyToQuote?: (specs: {
    vehicleSize: string;
    tier: string;
    addOns: string[];
    totalPrice: number;
    duration: string;
  }) => void;
  showApplyButton?: boolean;
}

export const VEHICLE_SIZES = [
  {
    id: 'sedan-hatch',
    name: 'Sedan / Hatch',
    description: 'Compact cars, sedans, coupes & standard hatchbacks',
    multiplier: 1.0,
    icon: '🚗',
  },
  {
    id: 'suv-wagon',
    name: 'SUV / Wagon',
    description: 'Mid-size crossovers, station wagons & 5-seater SUVs',
    multiplier: 1.25,
    icon: '🚙',
  },
  {
    id: '4wd-ute',
    name: '4WD / Dual-Cab Ute',
    description: 'Full-size 4x4s, dual-cab utes, 7-seater SUVs & vans',
    multiplier: 1.45,
    icon: '🛻',
  },
];

export const DETAILING_TIERS = [
  {
    id: 'interior-deep-clean',
    name: 'Interior Deep Clean',
    tagline: 'Steam Sanitised & Fabric Extraction',
    basePrice: 180,
    duration: '2.5 - 3.5 Hours',
    badge: 'Popular Family Refresh',
    features: [
      'High-pressure hot steam extraction of carpets & upholstery',
      'Leather deep cleaning, conditioning & UV matte protection',
      'Full dashboard, console, air vent & trim sanitisation',
      'Interior glass streak-free clean & deodorising neutraliser',
      'Door jambs, boot lining & spare wheel recess degreased',
    ],
  },
  {
    id: 'exterior-paint-correction',
    name: 'Exterior Paint Correction & Shine',
    tagline: 'Swirl Mark Removal & Gloss Machine Polish',
    basePrice: 260,
    duration: '3.5 - 5 Hours',
    badge: 'Showroom Gloss',
    features: [
      'Snow foam pre-soak & two-bucket scratch-free hand wash',
      'Iron fallout chemical decontam & clay bar glass & paint',
      'Dual-action machine polish removing 70-85% of swirls & scratches',
      'High-gloss synthetic sealant providing 6-month UV protection',
      'Wheels deep cleaned, iron removed & satin tyre dressing',
    ],
  },
  {
    id: 'full-signature-ceramic',
    name: 'Full Signature Detail & Ceramic Protection',
    tagline: 'Ultimate Interior & Multi-Stage Exterior Ceramic Shield',
    basePrice: 490,
    duration: '6 - 8 Hours (Full Day)',
    badge: 'Flagship Protection',
    features: [
      'Complete Interior Deep Clean with steam extraction & sanitising',
      'Multi-stage machine cut & high-clarity finishing polish',
      'Graphene / SiO2 Ceramic Paint Coating (up to 3 years protection)',
      'Windscreen hydrophobic glass rain repellent coating',
      'Engine bay detail, plastic trim UV restoration & wheel face ceramic',
    ],
  },
];

export const ADD_ONS = [
  { id: 'engine-bay', name: 'Engine Bay Steam Degrease & Dressing', price: 65 },
  { id: 'pet-hair', name: 'Heavy Pet Hair / Red Dust Extraction', price: 55 },
  { id: 'headlight-restore', name: 'Headlight Oxidation & Clarity Restoration', price: 75 },
  { id: 'leather-guard', name: 'Fabric Hydrophobic Shield / Leather Ceramic Guard', price: 85 },
];

export function DetailingEstimator({ onApplyToQuote, showApplyButton = true }: DetailingEstimatorProps) {
  const [selectedSizeId, setSelectedSizeId] = useState('sedan-hatch');
  const [selectedTierId, setSelectedTierId] = useState('full-signature-ceramic');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const selectedSize = VEHICLE_SIZES.find((s) => s.id === selectedSizeId) || VEHICLE_SIZES[0];
  const selectedTier = DETAILING_TIERS.find((t) => t.id === selectedTierId) || DETAILING_TIERS[2];

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate pricing
  const baseTierPrice = Math.round(selectedTier.basePrice * selectedSize.multiplier);
  const addOnsTotal = selectedAddOns.reduce((sum, id) => {
    const item = ADD_ONS.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);
  const totalEstimatedPrice = baseTierPrice + addOnsTotal;

  const quoteUrl = `/quote?size=${encodeURIComponent(selectedSize.name)}&tier=${encodeURIComponent(selectedTier.name)}&price=${totalEstimatedPrice}&addons=${encodeURIComponent(selectedAddOns.join(','))}`;

  return (
    <section id="estimator" className="py-20 bg-surface-900 text-surface-100 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/20 text-primary-400 border border-primary-500/30 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Live Detailing Package &amp; Price Calculator
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Select Your Package &amp; Vehicle Size
          </h2>
          <p className="mt-4 text-base sm:text-lg text-surface-300">
            Transparent pricing for Wangaratta and North East Victoria. Choose your vehicle category, detailing tier, and optional treatments for an immediate live estimate.
          </p>
        </div>

        {/* Step 1: Vehicle Size Selector */}
        <div className="mb-12">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary-400 mb-4 flex items-center gap-2">
            <Car className="w-4 h-4" /> Step 1: Select Your Vehicle Category
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {VEHICLE_SIZES.map((size) => {
              const active = size.id === selectedSizeId;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setSelectedSizeId(size.id)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-200 relative ${
                    active
                      ? 'bg-primary-500/15 border-primary-400 text-white shadow-lg shadow-primary-500/10 ring-2 ring-primary-500/50'
                      : 'bg-surface-950/70 border-surface-800 text-surface-300 hover:border-surface-700 hover:bg-surface-950'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{size.icon}</span>
                    {active && <CheckCircle2 className="w-5 h-5 text-primary-400" />}
                  </div>
                  <div className="font-extrabold text-lg text-white">{size.name}</div>
                  <div className="text-xs text-surface-400 mt-1">{size.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Detailing Tiers */}
        <div className="mb-12">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary-400 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Step 2: Choose Your Detailing Tier
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {DETAILING_TIERS.map((tier) => {
              const active = tier.id === selectedTierId;
              const tierCalculatedPrice = Math.round(tier.basePrice * selectedSize.multiplier);

              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`cursor-pointer rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between relative ${
                    active
                      ? 'bg-gradient-to-b from-surface-900 to-surface-950 border-primary-500 shadow-2xl shadow-primary-500/20 ring-2 ring-primary-500'
                      : 'bg-surface-950/60 border-surface-800 hover:border-surface-700 hover:bg-surface-950/90'
                  }`}
                >
                  {/* Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary-500/20 text-primary-400 border border-primary-500/30">
                      {tier.badge}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-surface-400">
                      <Clock className="w-3.5 h-3.5 text-primary-400" />
                      {tier.duration}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl sm:text-2xl font-black text-white">{tier.name}</h4>
                    <p className="text-xs text-surface-400 mt-1 mb-5">{tier.tagline}</p>

                    <div className="mb-6 pb-6 border-b border-surface-800/80">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-black text-primary-400">${tierCalculatedPrice}</span>
                        <span className="text-xs text-surface-400 font-medium">for {selectedSize.name}</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-surface-300">
                          <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTierId(tier.id);
                    }}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm text-center transition-all ${
                      active
                        ? 'bg-primary-500 hover:bg-primary-400 text-surface-950 shadow-md shadow-primary-500/30'
                        : 'bg-surface-800 hover:bg-surface-700 text-surface-200'
                    }`}
                  >
                    {active ? 'Selected Package' : 'Select Package'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Optional Add-Ons */}
        <div className="mb-14">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary-400 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Step 3: Optional Add-On Treatments
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADD_ONS.map((addon) => {
              const active = selectedAddOns.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  type="button"
                  onClick={() => toggleAddOn(addon.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    active
                      ? 'bg-primary-500/15 border-primary-400 text-white shadow-md shadow-primary-500/10'
                      : 'bg-surface-950/60 border-surface-800 text-surface-300 hover:border-surface-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white">{addon.name}</span>
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-black ${
                        active ? 'bg-primary-500 text-surface-950' : 'border border-surface-700 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                  </div>
                  <div className="text-primary-400 font-extrabold text-base mt-2">+${addon.price}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Estimate Summary & CTA Box */}
        <div className="bg-gradient-to-r from-surface-950 via-surface-900 to-surface-950 border border-primary-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-xs font-black uppercase tracking-widest text-primary-400">
                Live Package Estimate
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {selectedTier.name}
              </h3>
              <p className="text-sm text-surface-300">
                Vehicle: <strong className="text-white">{selectedSize.name}</strong> • Time Est: <strong className="text-white">{selectedTier.duration}</strong>
                {selectedAddOns.length > 0 && ` • ${selectedAddOns.length} Add-on(s)`}
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs text-surface-400 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-primary-400" />
                <span>100% Satisfaction Guarantee • Fully Insured • Wangaratta Studio &amp; Mobile Service</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="text-center lg:text-right">
                <div className="text-xs text-surface-400 uppercase font-black tracking-wider">Estimated Total</div>
                <div className="text-4xl sm:text-5xl font-black text-primary-400 tracking-tight">
                  ${totalEstimatedPrice}
                </div>
                <div className="text-[11px] text-surface-400">GST inclusive • No hidden fees</div>
              </div>

              {showApplyButton && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={quoteUrl}
                    className="flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-surface-950 font-black rounded-2xl text-base shadow-lg shadow-primary-500/25 transition-all hover:scale-103"
                  >
                    <span>Book This Detail</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <a
                    href="tel:0479107101"
                    className="flex items-center justify-center gap-2 px-5 py-4 bg-surface-800 hover:bg-surface-700 text-white font-bold rounded-2xl text-sm transition-all border border-surface-700"
                  >
                    <Phone className="w-4 h-4 text-primary-400" />
                    <span>Call 0479 107 101</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
