import React from 'react';
import { Sprout, Globe2, Wifi, WifiOff, Volume2, ShieldCheck, PhoneCall, LayoutDashboard } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  lowDataMode: boolean;
  onToggleLowData: () => void;
  isOffline: boolean;
  onOpenOnboarding: () => void;
  onOpenExtensionModal: () => void;
  onOpenVoiceModal: () => void;
  onOpenPresetsModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  lowDataMode,
  onToggleLowData,
  isOffline,
  onOpenOnboarding,
  onOpenExtensionModal,
  onOpenVoiceModal,
  onOpenPresetsModal,
}) => {
  const t = translations[currentLanguage];

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top BRICS Public Good banner */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-medium tracking-wide">BRICS AgriN Cooperative Initiative</span>
            <span aria-hidden="true" className="text-emerald-400">·</span>
            <span className="text-emerald-200">Digital Public Good for Climate-Resilient Agriculture</span>
          </div>
          <div className="flex items-center gap-3 text-emerald-200 text-[11px]">
            <span>🇧🇷 Brazil</span>
            <span>🇷🇺 Russia</span>
            <span className="font-semibold text-amber-300">🇮🇳 India (Host)</span>
            <span>🇨🇳 China</span>
            <span>🇿🇦 South Africa</span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <a href="#hero" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg p-1">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-sm shadow-emerald-900/10 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 font-display">
                    KisanNet
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                    AgriN
                  </span>
                </div>
                <p className="text-xs text-stone-500 hidden sm:block">
                  Digital Agriculture Network · BRICS
                </p>
              </div>
            </a>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600" aria-label="Main Navigation">
            <a href="#advisory" className="hover:text-emerald-700 transition-colors py-1">
              Plot Advisory
            </a>
            <a href="#disease" className="hover:text-emerald-700 transition-colors py-1">
              Disease AI
            </a>
            <a href="#voice" className="hover:text-emerald-700 transition-colors py-1 flex items-center gap-1.5 text-emerald-700 font-semibold">
              <Volume2 className="w-4 h-4 text-emerald-600" />
              Voice Sahayak
            </a>
            <a href="#sms" className="hover:text-emerald-700 transition-colors py-1">
              SMS Gateway
            </a>
            <a href="#brics" className="hover:text-emerald-700 transition-colors py-1">
              BRICS Hub
            </a>
            <a href="#prd" className="hover:text-emerald-700 transition-colors py-1 text-stone-400">
              PRD Specs
            </a>
          </nav>

          {/* Right Action Cluster: Language Switcher, 2G Mode, Extension Portal & Onboarding */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector (Segmented control) */}
            <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200" role="group" aria-label="Language Selector">
              {languages.map((lang) => {
                const isActive = currentLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`px-2 sm:px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                      isActive
                        ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                    title={lang.label}
                  >
                    {lang.native}
                  </button>
                );
              })}
            </div>

            {/* 2G Low-Data Mode Toggle */}
            <button
              onClick={onToggleLowData}
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                lowDataMode
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
              title="Toggle low bandwidth mode for 2G/3G mobile connections"
            >
              {lowDataMode ? <WifiOff className="w-3.5 h-3.5 text-amber-700" /> : <Wifi className="w-3.5 h-3.5 text-emerald-700" />}
              <span>{lowDataMode ? '2G Mode ON' : '2G Mode'}</span>
            </button>

            {/* Application Presets Quick Trigger */}
            <button
              onClick={onOpenPresetsModal}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-all"
              title="Switch Application Presets & Demo Personas"
            >
              <span className="text-sm leading-none">⚡</span>
              <span className="hidden sm:inline">Presets</span>
            </button>

            {/* Extension Worker Portal Button */}
            <button
              onClick={onOpenExtensionModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition-colors"
              title="Extension Worker & Regional Risk Heatmap"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-stone-600" />
              <span>Extension FPO</span>
            </button>

            {/* Primary Farmer Onboard CTA */}
            <button
              onClick={onOpenOnboarding}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-lg shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <Sprout className="w-4 h-4" />
              <span className="whitespace-nowrap">{t.onboardCta}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
