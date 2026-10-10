'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, ShieldCheck, MapPin, Sparkles, Car, Calendar } from 'lucide-react';
import { VEHICLE_SIZES, DETAILING_TIERS, ADD_ONS } from './DetailingEstimator';

function QuoteFormContent() {
  const searchParams = useSearchParams();
  const phoneNumber = '0479 107 101';
  const cleanPhone = '0479107101';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleSize: 'Sedan / Hatch',
    detailingTier: 'Full Signature Detail & Ceramic Protection',
    serviceLocation: 'Mobile Van Service (At Your Home / Workplace)',
    addOns: [] as string[],
    preferredDate: '',
    estimatedPrice: 490,
    address: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Prefill from search parameters if user arrived from the DetailingEstimator
  useEffect(() => {
    if (!searchParams) return;
    const size = searchParams.get('size');
    const tier = searchParams.get('tier');
    const price = searchParams.get('price');
    const addons = searchParams.get('addons');

    setFormData((prev) => ({
      ...prev,
      vehicleSize: size || prev.vehicleSize,
      detailingTier: tier || prev.detailingTier,
      estimatedPrice: price ? Number(price) : prev.estimatedPrice,
      addOns: addons ? addons.split(',').filter(Boolean) : prev.addOns,
    }));
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (addonId: string) => {
    setFormData((prev) => {
      const exists = prev.addOns.includes(addonId);
      const updated = exists ? prev.addOns.filter((id) => id !== addonId) : [...prev.addOns, addonId];
      return { ...prev, addOns: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.firstName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please enter your First Name, Email, and Phone number.');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          vehicleMake: formData.vehicleMake,
          vehicleModel: formData.vehicleModel,
          vehicleSize: formData.vehicleSize,
          detailingTier: formData.detailingTier,
          estimatedPrice: formData.estimatedPrice,
          serviceLocation: `${formData.serviceLocation} - ${formData.address}`,
          addOns: formData.addOns.join(', '),
          preferredDate: formData.preferredDate,
          message: formData.message,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to submit booking request. Please try again.');
      }

      setStatus('success');
    } catch (err: any) {
      console.error('Booking submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please call 0479 107 101 directly.');
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-surface-50 text-surface-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 text-primary-800 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-primary-600" />
            Book Your Detailing Experience
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-surface-900 tracking-tight">
            Vehicle Detailing Booking &amp; Quote
          </h1>
          <p className="mt-4 text-base text-surface-600 font-normal">
            Fill in your vehicle details and selected package below. We will confirm your appointment date and time within 2 hours. Need immediate service? Call <strong className="text-surface-900">{phoneNumber}</strong>.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-surface-900">
              Booking Request Received!
            </h2>
            <p className="text-surface-600 max-w-lg mx-auto">
              Thank you, <strong>{formData.firstName}</strong>. Our detailing technician will review your vehicle details and contact you via phone or SMS shortly to confirm your booking time.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-500 hover:bg-primary-400 text-surface-950 font-bold rounded-xl text-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Technician: {phoneNumber}</span>
              </a>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="px-6 py-3.5 bg-surface-100 hover:bg-surface-200 text-surface-800 font-bold rounded-xl text-sm transition-all"
              >
                Submit Another Vehicle
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-surface-200 shadow-xl space-y-8">
            {status === 'error' && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Step 1: Vehicle Information */}
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-primary-600 mb-4 flex items-center gap-2">
                <Car className="w-4 h-4" /> Step 1: Vehicle Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Make</label>
                  <input
                    type="text"
                    name="vehicleMake"
                    value={formData.vehicleMake}
                    onChange={handleChange}
                    placeholder="e.g. Toyota, Ford, BMW"
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Model</label>
                  <input
                    type="text"
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    placeholder="e.g. Hilux, Everest, CX-5"
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Vehicle Category</label>
                  <select
                    name="vehicleSize"
                    value={formData.vehicleSize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                  >
                    {VEHICLE_SIZES.map((size) => (
                      <option key={size.id} value={size.name}>{size.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Package Selection */}
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-primary-600 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Step 2: Detailing Tier &amp; Add-Ons
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Detailing Package</label>
                  <select
                    name="detailingTier"
                    value={formData.detailingTier}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                  >
                    {DETAILING_TIERS.map((tier) => (
                      <option key={tier.id} value={tier.name}>{tier.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Service Format</label>
                  <select
                    name="serviceLocation"
                    value={formData.serviceLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                  >
                    <option value="Mobile Van Service (At Your Home / Workplace)">Mobile Van Service (At Your Home / Workplace)</option>
                    <option value="Wangaratta Studio Drop-off">Wangaratta Studio Drop-off</option>
                  </select>
                </div>
              </div>

              {/* Optional Add-Ons */}
              <div className="mt-4 pt-4 border-t border-surface-100">
                <label className="block text-xs font-bold text-surface-700 uppercase mb-2">Optional Treatments</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ADD_ONS.map((addon) => {
                    const checked = formData.addOns.includes(addon.id);
                    return (
                      <label
                        key={addon.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                          checked ? 'bg-primary-50 border-primary-400 font-bold text-primary-900' : 'bg-surface-50 border-surface-200 text-surface-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleCheckboxChange(addon.id)}
                          className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
                        />
                        <span>{addon.name} (+${addon.price})</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Preferred Date & Location */}
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-primary-600 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Step 3: Date &amp; Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Preferred Date</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Service Address / Suburb</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. 12 Rowan St, Wangaratta"
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Contact Information */}
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-primary-600 mb-4">
                Step 4: Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="04xx xxx xxx"
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Special Notes or Specific Stains/Scratches</label>
                <textarea
                  rows={3}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about pet hair, milk stains, swirl marks, or desired booking time..."
                  className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-surface-100">
              <div className="flex items-center gap-2 text-xs text-surface-500">
                <ShieldCheck className="w-4 h-4 text-primary-600" />
                <span>Zero Obligation • Instant Booking Confirmation</span>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-surface-950 font-black rounded-xl text-base shadow-lg shadow-primary-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Confirm Detailing Booking</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </section>
  );
}

export function QuoteForm() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading booking engine...</div>}>
      <QuoteFormContent />
    </Suspense>
  );
}
