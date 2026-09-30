import React from 'react';
import { Sprout, Globe2, PhoneCall, ShieldCheck, HeartHandshake, ExternalLink } from 'lucide-react';
import { LanguageCode } from '../types';

interface FooterProps {
  currentLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLanguage, onSelectLanguage }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                KisanNet · AgriN
              </span>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              An interoperable digital agriculture public good inspired by the BRICS AgriN initiative. Delivering plot-level satellite advisories, regenerative practices, crop disease AI, regional voice, and SMS alerts to smallholder farmers.
            </p>
            <div className="flex items-center gap-3 text-stone-400 text-xs pt-1">
              <span>Owner: Dudan Technology</span>
              <span aria-hidden="true">·</span>
              <span>Licence: Apache 2.0</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3 font-display">
              Core Modules
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#advisory" className="hover:text-emerald-400 transition-colors">
                  Daily Plot Advisory
                </a>
              </li>
              <li>
                <a href="#disease" className="hover:text-emerald-400 transition-colors">
                  Crop Disease Diagnosis
                </a>
              </li>
              <li>
                <a href="#voice" className="hover:text-emerald-400 transition-colors">
                  Regional Voice Sahayak
                </a>
              </li>
              <li>
                <a href="#sms" className="hover:text-emerald-400 transition-colors">
                  SMS & Feature Phone
                </a>
              </li>
              <li>
                <a href="#brics" className="hover:text-emerald-400 transition-colors">
                  BRICS Model Hub
                </a>
              </li>
              <li>
                <a href="#prd" className="hover:text-emerald-400 transition-colors">
                  PRD Specifications
                </a>
              </li>
            </ul>
          </div>

          {/* BRICS Member Institutions */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3 font-display">
              National Nodes
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>🇮🇳 ICAR & Digital Agri Mission (India)</li>
              <li>🇧🇷 EMBRAPA (Brazil)</li>
              <li>🇨🇳 CAAS (China)</li>
              <li>🇿🇦 ARC (South Africa)</li>
              <li>🇷🇺 Vavilov Institute (Russia)</li>
            </ul>
          </div>

          {/* Farmer Helpline & Accessibility */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3 font-display">
              Farmer Helpline & Support
            </h4>
            <div className="space-y-3 text-stone-400">
              <div className="flex items-start gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Toll-Free Kisan Call Center</strong>
                  <span>1800-180-1551 / 1800-KISAN</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Accessibility Standard</strong>
                  <span>WCAG 2.1 AA Compliant · High Contrast</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-xs">
          <div>
            © 2026 KisanNet Digital Agriculture Network. Developed as an Open Digital Public Good.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onSelectLanguage('en')} className="hover:text-white">English</button>
            <button onClick={() => onSelectLanguage('hi')} className="hover:text-white">हिन्दी</button>
            <button onClick={() => onSelectLanguage('or')} className="hover:text-white">ଓଡ଼ିଆ</button>
            <button onClick={() => onSelectLanguage('ta')} className="hover:text-white">தமிழ்</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
