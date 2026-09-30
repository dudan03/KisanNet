import React, { useState } from 'react';
import {
  Satellite,
  Droplets,
  Calendar,
  Volume2,
  VolumeX,
  ShieldCheck,
  Leaf,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  RefreshCw,
  SunMedium,
  CloudRain,
  Share2,
} from 'lucide-react';
import { AdvisoryData, FarmerProfile, LanguageCode } from '../types';
import { translations } from '../data/translations';
import { sampleProfiles } from '../data/sampleData';
import { WeatherForecastWidget } from './WeatherForecastWidget';

interface AdvisorySectionProps {
  currentLanguage: LanguageCode;
  advisory: AdvisoryData;
  activeProfile: FarmerProfile;
  onSelectProfile: (profile: FarmerProfile) => void;
  lowDataMode: boolean;
  onRefreshAdvisory: () => void;
  isRefreshing: boolean;
}

export const AdvisorySection: React.FC<AdvisorySectionProps> = ({
  currentLanguage,
  advisory,
  activeProfile,
  onSelectProfile,
  lowDataMode,
  onRefreshAdvisory,
  isRefreshing,
}) => {
  const t = translations[currentLanguage];
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState<'today' | 'weather' | 'regenerative' | 'calendar' | 'satellite'>('today');

  // Handle SpeechSynthesis read-out-loud for the advisory
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
      return;
    }

    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis is not supported on this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const narrationText = `${advisory.farmerName}, ${advisory.crop} field advisory. Primary action today: ${advisory.primaryActionToday.title}. Explanation: ${advisory.primaryActionToday.explanation}. Key regenerative practice: ${advisory.regenerativeActions[0]?.title}.`;

    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.rate = 0.9;

    // Language mapping for utterance
    const langMap: Record<LanguageCode, string> = {
      hi: 'hi-IN',
      or: 'or-IN',
      ta: 'ta-IN',
      en: 'en-IN',
    };
    utterance.lang = langMap[currentLanguage] || 'en-IN';

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  return (
    <section id="advisory" className="py-12 sm:py-20 bg-stone-100/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <Satellite className="w-4 h-4 text-emerald-600" />
              <span>P0 Core Feature · Daily Plot-Level Agro-Advisory Engine</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-1 font-display">
              Triangulated Crop Advisory
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-2xl">
              Fuses Sentinel-2 NDVI vegetative vigor, Soil Health Card chemistry, and 7-day micro-weather into one daily actionable guidance.
            </p>
          </div>

          {/* Plot switcher & Audio playback */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick Plot Switcher */}
            <div className="flex items-center bg-white border border-stone-200 rounded-xl p-1 text-xs shadow-xs">
              <span className="text-stone-400 px-2 font-medium">Switch Plot:</span>
              {sampleProfiles.slice(0, 3).map((p) => {
                const isSelected = activeProfile.name === p.name;
                return (
                  <button
                    key={p.name}
                    onClick={() => onSelectProfile(p)}
                    className={`px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                      isSelected
                        ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                        : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                    }`}
                  >
                    {p.crop.split(' ')[0]} ({p.location.split(',')[0]})
                  </button>
                );
              })}
            </div>

            {/* Read Aloud Button */}
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                isPlayingAudio
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white text-emerald-800 border-stone-300 hover:bg-stone-50'
              }`}
              title="Listen to advisory audio narration"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4 text-amber-700" />
                  <span>{t.stopAudio}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-700" />
                  <span>{t.readAloud}</span>
                </>
              )}
            </button>

            {/* Refresh Live Satellite Sync */}
            <button
              onClick={onRefreshAdvisory}
              disabled={isRefreshing}
              className="p-2 bg-white text-stone-600 hover:text-emerald-700 border border-stone-200 rounded-xl shadow-xs transition-colors"
              title="Refresh satellite data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Current Plot Context Banner (Clean Unboxed Metadata) */}
        <div className="mt-6 p-4 rounded-xl bg-white border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-stone-900 text-sm">{activeProfile.name}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Plot: <strong className="text-stone-800">{activeProfile.location}</strong></span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Crop: <strong className="text-stone-800">{activeProfile.crop}</strong></span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Size: <strong className="text-stone-800">{activeProfile.plotSize}</strong></span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Stage: <strong className="text-stone-800">{activeProfile.stage}</strong></span>
          </div>

          <div className="flex items-center gap-2 font-mono-numbers text-[11px] text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>{advisory.confidenceScore}</span>
          </div>
        </div>

        {/* Advisory View Switcher Tabs (Segmented Control) */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl max-w-fit" role="tablist">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'today' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Today's Primary Action
          </button>
          <button
            onClick={() => setActiveTab('weather')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'weather' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5 text-blue-600" />
            <span>5-Day Weather Forecast</span>
          </button>
          <button
            onClick={() => setActiveTab('regenerative')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'regenerative' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>Regenerative Practices (P0)</span>
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'calendar' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>7-Day Calendar</span>
          </button>
          <button
            onClick={() => setActiveTab('satellite')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'satellite' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Satellite className="w-3.5 h-3.5 text-stone-700" />
            <span>Satellite & Soil Layers</span>
          </button>
        </div>

        {/* Tab 1: Today's Primary Action */}
        {activeTab === 'today' && (
          <div className="mt-6 space-y-6">
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Primary Action Card */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    {advisory.primaryActionToday.urgency}
                  </span>
                  <span className="text-xs text-stone-500">
                    Generated {advisory.generatedAt}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
                    {advisory.primaryActionToday.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-stone-700 leading-relaxed">
                    {advisory.primaryActionToday.explanation}
                  </p>
                </div>

                {/* Action Steps Checklist */}
                <div className="mt-6 pt-6 border-t border-stone-100">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
                    Step-by-Step Implementation Today
                  </h4>
                  <div className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Halt urea broadcasting immediately to prevent nitrogen leaching during expected 48-hour showers.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Install perforated AWD tube 15cm into the mud to monitor sub-surface ponding depth.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Apply 200L liquid Jeevamrit at irrigation inlet to activate native soil microbes.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Triangulation Signals Panel */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center justify-between">
                    <span>Satellite Vigor</span>
                    <span className="text-emerald-700 font-mono-numbers">NDVI 0.72</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden mb-2">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <p className="text-xs text-stone-600">
                    Vigorous vegetative canopy. Canopy density is high; avoid excessive vegetative growth stimulants.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center justify-between">
                    <span>Soil Health Card Sync</span>
                    <span className="text-stone-700 font-mono-numbers">pH 6.2 · OC 0.48%</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-stone-600">
                    <div className="flex justify-between">
                      <span>Organic Carbon (Target &gt;0.75%)</span>
                      <strong className="text-amber-700 font-mono-numbers">0.48% (Low)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Available Nitrogen</span>
                      <strong className="text-stone-800">Medium (240 kg/ha)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Phosphorus (Available)</span>
                      <strong className="text-amber-700">Low (14 kg/ha)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Potassium</span>
                      <strong className="text-emerald-700">High (290 kg/ha)</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2 flex items-center gap-1.5">
                    <CloudRain className="w-4 h-4 text-blue-600" />
                    <span>Weather Invariant Alert</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Rain risk peaks in 48-72h (12-18mm). Spraying pesticide now will waste money and cause aquatic toxicity in bunds.
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded 5-Day Weather Context Component */}
            <WeatherForecastWidget
              activeProfile={activeProfile}
              currentLanguage={currentLanguage}
              lowDataMode={lowDataMode}
            />
          </div>
        )}

        {/* Tab 2: 5-Day Weather Deep-Dive View */}
        {activeTab === 'weather' && (
          <div className="mt-6">
            <WeatherForecastWidget
              activeProfile={activeProfile}
              currentLanguage={currentLanguage}
              lowDataMode={lowDataMode}
            />
          </div>
        )}

        {/* Tab 2: Regenerative Practices (P0 requirement) */}
        {activeTab === 'regenerative' && (
          <div className="mt-6 space-y-4">
            <div className="bg-emerald-900 text-white rounded-2xl p-6">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                <Leaf className="w-4 h-4" />
                <span>P0 Core Mandate: Regenerative Recommendations</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mt-1 font-display">
                Restoring Living Soil & Cutting Input Costs
              </h3>
              <p className="text-sm text-emerald-100 mt-1 max-w-3xl">
                Every KisanNet advisory embeds biological solutions that reduce dependence on synthetic urea and diammonium phosphate (DAP) by at least 8-15%, building long-term climate resilience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {advisory.regenerativeActions.map((action, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
                      {action.type}
                    </div>
                    <h4 className="text-base font-bold text-stone-900 font-display">
                      {action.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {action.details}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-stone-100 text-xs font-medium text-emerald-800 bg-emerald-50 p-2.5 rounded-lg">
                    <strong>Impact:</strong> {action.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: 7-Day Agronomic Action Calendar */}
        {activeTab === 'calendar' && (
          <div className="mt-6 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-display">
                  7-Day Micro-Climate & Field Action Sequence
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Aligned with IMD rainfall trajectory and crop tillering phenology.
                </p>
              </div>
              <span className="text-xs font-medium text-stone-500">
                Plot: {activeProfile.location}
              </span>
            </div>

            <div className="divide-y divide-stone-100">
              {advisory.sevenDayCalendar.map((item, idx) => (
                <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50 transition-colors">
                  <div className="sm:w-1/4">
                    <span className="text-xs font-bold text-stone-900 block font-mono-numbers">
                      {item.day}
                    </span>
                    <span className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                      <SunMedium className="w-3.5 h-3.5 text-amber-600" />
                      {item.weather}
                    </span>
                  </div>
                  <div className="sm:w-3/4 text-xs sm:text-sm text-stone-800 font-medium">
                    {item.action}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Satellite & Soil Health Layers */}
        {activeTab === 'satellite' && (
          <div className="mt-6 grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-stone-900 font-display">
                  Sentinel-2 Multi-Spectral Raster Layer
                </h3>
                <span className="text-xs text-stone-500">
                  Band 4 & Band 8 (10m Resolution)
                </span>
              </div>

              {/* Satellite Visualization Box */}
              {lowDataMode ? (
                <div className="p-6 bg-stone-50 border border-stone-200 rounded-xl text-center">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
                    2G Low-Data Mode Active
                  </span>
                  <p className="text-xs text-stone-600 max-w-md mx-auto">
                    Heavy multi-spectral raster rendering paused to save data bandwidth. Vector telemetry indicates healthy vegetative vigor index: 0.72.
                  </p>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-stone-200 bg-stone-900 aspect-video flex items-center justify-center">
                  {/* Styled Simulated Satellite Raster Map */}
                  <svg className="w-full h-full object-cover" viewBox="0 0 600 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="600" height="340" fill="#1e293b"/>
                    {/* Agricultural cadastral plot boundaries */}
                    <polygon points="40,30 220,40 200,180 30,160" fill="#15803d" opacity="0.8" stroke="#ffffff" stroke-width="1.5"/>
                    <polygon points="230,40 450,20 440,160 210,180" fill="#16a34a" opacity="0.85" stroke="#ffffff" stroke-width="1.5"/>
                    <polygon points="460,20 580,10 570,170 450,160" fill="#22c55e" opacity="0.75" stroke="#ffffff" stroke-width="1.5"/>
                    <polygon points="30,170 200,190 190,320 20,310" fill="#ca8a04" opacity="0.7" stroke="#ffffff" stroke-width="1.5"/>
                    {/* Active Farm Plot highlight */}
                    <polygon points="210,190 440,170 430,320 190,320" fill="#047857" opacity="0.9" stroke="#facc15" stroke-width="3"/>
                    <text x="225" y="240" fill="#ffffff" font-size="12" font-family="sans-serif" font-weight="bold">Farmer Plot: Ramesh Pradhan</text>
                    <text x="225" y="260" fill="#facc15" font-size="11" font-family="sans-serif">NDVI: 0.72 · High Canopy Vigor</text>
                    <text x="225" y="280" fill="#e2e8f0" font-size="10" font-family="sans-serif">NDWI Soil Moisture: 0.44</text>
                    {/* Grid Lines */}
                    <line x1="0" y1="100" x2="600" y2="100" stroke="#ffffff" stroke-opacity="0.1" stroke-dasharray="4 4"/>
                    <line x1="0" y1="200" x2="600" y2="200" stroke="#ffffff" stroke-opacity="0.1" stroke-dasharray="4 4"/>
                    <line x1="300" y1="0" x2="300" y2="340" stroke="#ffffff" stroke-opacity="0.1" stroke-dasharray="4 4"/>
                  </svg>
                  <div className="absolute bottom-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded">
                    ESA Sentinel-2 MSI · Re-visit interval: 5 Days
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 font-display mb-3">
                Soil Chemistry Calibration
              </h3>
              <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                {advisory.satelliteInsights.soilHealthSummary}
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-100">
                  <div className="font-semibold text-stone-800">pH Index: 6.2</div>
                  <div className="text-stone-500 mt-0.5">Slightly acidic. Ideal for rice phosphorus uptake without liming.</div>
                </div>
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-100">
                  <div className="font-semibold text-stone-800">Organic Carbon: 0.48%</div>
                  <div className="text-amber-800 mt-0.5">Critical limit &lt;0.5%. Requires in-situ green manuring with Sesbania.</div>
                </div>
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-100">
                  <div className="font-semibold text-stone-800">Soil Moisture (NDWI): 0.44</div>
                  <div className="text-emerald-800 mt-0.5">Adequate moisture. AWD cycle safe to implement.</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
