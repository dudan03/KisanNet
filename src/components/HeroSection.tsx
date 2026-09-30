import React from 'react';
import { ArrowRight, Mic, MessageSquare, Satellite, ShieldCheck, HeartHandshake, Sparkles, MapPin, Activity } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../data/translations';

interface HeroSectionProps {
  currentLanguage: LanguageCode;
  onOpenOnboarding: () => void;
  onJumpToVoice: () => void;
  onJumpToAdvisory: () => void;
  onJumpToSms: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLanguage,
  onOpenOnboarding,
  onJumpToVoice,
  onJumpToAdvisory,
  onJumpToSms,
}) => {
  const t = translations[currentLanguage];

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-stone-50 to-stone-50 pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-stone-200">
      {/* Subtle organic background contour lines */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission, Typography & Direct Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean editorial meta kicker (Zero-pill discipline: unboxed text with bullet separators) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-900 tracking-wide uppercase">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <HeartHandshake className="w-4 h-4 text-emerald-600" />
                BRICS AgriN Cooperative
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-stone-600">Digital Public Good</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-amber-800 font-medium">India Host Pilot</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.1] font-display">
              {t.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
              {t.heroSubheadline}
            </p>

            {/* Quick Action Matrix for Farmers & Extension Workers */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenOnboarding}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm sm:text-base font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-xl shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                <span>{t.onboardCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onJumpToVoice}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm sm:text-base font-medium text-stone-800 bg-white hover:bg-stone-50 active:bg-stone-100 border border-stone-300 rounded-xl shadow-xs transition-colors"
              >
                <Mic className="w-4 h-4 text-emerald-600" />
                <span>Ask Voice Sahayak</span>
              </button>

              <button
                onClick={onJumpToSms}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm sm:text-base font-medium text-stone-800 bg-white hover:bg-stone-50 active:bg-stone-100 border border-stone-300 rounded-xl shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-amber-700" />
                <span>SMS & Feature Phone</span>
              </button>
            </div>

            {/* Credibility & Core Metrics Row (Clean unboxed tabular data) */}
            <div className="pt-6 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-stone-700">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-stone-900 font-mono-numbers">
                  95%+
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  SMS Alert Delivery &lt;5m
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-stone-900 font-mono-numbers">
                  4
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Languages: HI, OR, TA, EN
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-stone-900 font-mono-numbers">
                  10%
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Yield Gain Pilot Target
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-stone-900 font-mono-numbers">
                  100%
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Regenerative Focus
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Triangulation Architecture Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-lg shadow-stone-200/40 p-6 sm:p-7 relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                    Plot-Level Triangulation Engine
                  </div>
                  <div className="text-base font-bold text-stone-900">
                    Live Agro-Advisory Pipeline
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>Sentinel-2 Synced</span>
                </div>
              </div>

              {/* Data Ingestion Layers */}
              <div className="space-y-4 my-5 text-sm">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Satellite className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900 text-xs sm:text-sm">
                      1. Sentinel-2 Satellite Multi-Spectral Data
                    </div>
                    <p className="text-xs text-stone-600 mt-0.5">
                      NDVI vegetation index (0.72) and NDWI root-zone moisture map every 5 days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900 text-xs sm:text-sm">
                      2. Soil Health Card & Micro-Nutrients
                    </div>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Soil pH (6.2), NPK balance, and Organic Carbon (0.48%) mapped to village block.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900 text-xs sm:text-sm">
                      3. IMD 7-Day Micro-Climate Forecast
                    </div>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Hour-by-hour rain probability, wind speed, spray windows, and humidity stress.
                    </p>
                  </div>
                </div>
              </div>

              {/* Output Preview */}
              <div className="bg-emerald-950 text-white rounded-xl p-4 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-emerald-300 font-semibold mb-1 text-[11px] uppercase tracking-wider">
                  <span>Today's Actionable Output</span>
                  <span className="text-amber-400">94% Confidence</span>
                </div>
                <p className="text-emerald-100 font-medium leading-snug">
                  "Light rain arriving in 48 hours. Stop chemical urea top-dressing. Clear field bunds and apply liquid Jeevamrit (200L/acre) with irrigation water."
                </p>
                <div className="mt-3 pt-3 border-t border-emerald-800/80 flex items-center justify-between text-[11px] text-emerald-300">
                  <span>Dispatched via: Odia Voice & SMS</span>
                  <button onClick={onJumpToAdvisory} className="underline hover:text-white font-medium">
                    Inspect Full Advisory →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
