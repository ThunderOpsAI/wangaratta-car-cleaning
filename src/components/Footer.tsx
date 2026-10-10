'use client';

import { Mail, MapPin, Phone, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const phoneNumber = '0479 107 101';
  const cleanPhone = '0479107101';
  const email = 'wangarattacarcleaning@gmail.com';

  const handlePhoneClick = () => {
    try {
      fetch('/api/leads/call-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent: 'footer_call_link',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }),
      }).catch((err) => console.error('Call click tracking error:', err));
    } catch {
      // Best-effort tracking
    }
  };

  const serviceAreas = [
    'Wangaratta VIC 3677',
    'Glenrowan',
    'Oxley',
    'Milawa',
    'Beechworth',
    'Everton',
    'Eldorado',
    'Tarrawingee',
    'Myrtleford',
    'North East Victoria',
  ];

  return (
    <footer className="bg-surface-950 text-surface-300 border-t border-surface-800 pt-16 pb-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* Brand Bio */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary-500 text-surface-950 flex items-center justify-center font-black">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-black text-white block leading-none">
                    Wangaratta <span className="text-primary-400">Car Cleaning</span>
                  </span>
                  <span className="text-[10px] text-surface-400 uppercase tracking-widest font-semibold block mt-0.5">
                    Auto Detailing Specialists
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-xs text-surface-400 leading-relaxed font-normal">
              Premier automotive detailing, multi-stage machine paint correction, interior hot-water steam sanitisation, and long-life ceramic paint protection across Wangaratta and North East Victoria.
            </p>
            <div className="flex items-center gap-2 text-xs text-primary-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Fully Insured • Spot-Free Mobile Van &amp; Studio</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">
              Detailing Services
            </h4>
            <ul className="space-y-2.5 text-xs text-surface-400">
              <li>
                <Link href="/#services" className="hover:text-primary-400 transition-colors">
                  Interior Deep Clean &amp; Steam Extraction
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-primary-400 transition-colors">
                  Multi-Stage Paint Correction &amp; Polish
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-primary-400 transition-colors">
                  Signature Ceramic Paint Coating
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-primary-400 transition-colors">
                  Pre-Sale Resale Value Detailing
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-primary-400 transition-colors">
                  Work Ute &amp; Fleet Red Dust Cleanse
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-primary-400 transition-colors">
                  Headlight Clarity Restoration
                </Link>
              </li>
            </ul>
          </div>

          {/* Regional Service Areas */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">
              Service Locations
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-surface-400">
              {serviceAreas.map((area, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-primary-500 shrink-0" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-surface-500 mt-3">
              Studio drop-off available in Wangaratta or fully equipped mobile detailing direct to your driveway or workplace.
            </p>
          </div>

          {/* Direct Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">
              Contact &amp; Hours
            </h4>
            <a
              href={`tel:${cleanPhone}`}
              onClick={handlePhoneClick}
              className="flex items-center gap-2.5 text-sm font-bold text-white hover:text-primary-400 transition-colors"
            >
              <Phone className="w-4 h-4 text-primary-500" />
              <span>{phoneNumber}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2.5 text-xs text-surface-400 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-primary-500" />
              <span>{email}</span>
            </a>
            <div className="flex items-start gap-2.5 text-xs text-surface-400 pt-2">
              <Clock className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
              <div>
                <p>Monday - Friday: 7:30 AM – 5:30 PM</p>
                <p>Saturday: 8:00 AM – 2:00 PM</p>
                <p className="text-surface-500">Sunday: By Appointment</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Cleansed Bar */}
        <div className="pt-8 border-t border-surface-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-surface-500">
          <div>
            &copy; {new Date().getFullYear()} Wangaratta Car Cleaning. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs text-surface-400">
            <Link href="/quote" className="hover:text-primary-400 transition-colors">
              Book a Detail
            </Link>
            <span>•</span>
            <Link href="/gallery" className="hover:text-primary-400 transition-colors">
              Gallery
            </Link>
            <span>•</span>
            <Link href="/reviews" className="hover:text-primary-400 transition-colors">
              Reviews
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
