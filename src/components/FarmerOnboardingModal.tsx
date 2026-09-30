import React, { useState } from 'react';
import { X, Sprout, CheckCircle2, MapPin, Globe, Phone, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { FarmerProfile, LanguageCode } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: FarmerProfile) => void;
  currentLanguage: LanguageCode;
}

export const FarmerOnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  currentLanguage,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 94371 ');
  const [language, setLanguage] = useState<LanguageCode>(currentLanguage);
  const [location, setLocation] = useState('Bargarh, Odisha, India');
  const [crop, setCrop] = useState('Rice (Paddy)');
  const [plotSize, setPlotSize] = useState('2.0 Acres');
  const [sowingDate, setSowingDate] = useState('2026-06-25');
  const [useDefaultSoil, setUseDefaultSoil] = useState(true);
  const [pH, setPH] = useState(6.2);
  const [organicCarbon, setOrganicCarbon] = useState('0.48%');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const newProfile: FarmerProfile = {
        name: name || 'Kisan Bandhu',
        phone: phone || '+91 98000 00000',
        language,
        location,
        crop,
        plotSize,
        sowingDate,
        stage: 'Vegetative to Panicle Initiation',
        soilData: {
          pH: pH || 6.2,
          nitrogen: 'Medium (240 kg/ha)',
          phosphorus: 'Low (14 kg/ha)',
          potassium: 'High (280 kg/ha)',
          organicCarbon: organicCarbon || '0.48%',
        },
      };
      onComplete(newProfile);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-emerald-800 text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
              <Sprout className="w-4 h-4" />
              <span>P0 Rapid Onboarding · Completed &lt; 2 Minutes</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mt-1 font-display">
              Register Farmer Plot
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1">
              Connect your field to Sentinel-2 satellite alerts, soil health analysis & regional voice advice.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white p-1 rounded-lg hover:bg-emerald-700/50 transition-colors"
            aria-label="Close onboarding modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps Tracker */}
        <div className="bg-stone-50 px-6 py-3 border-b border-stone-200 flex items-center justify-between text-xs font-medium text-stone-600">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`flex items-center gap-1.5 ${step === 1 ? 'text-emerald-800 font-bold' : ''}`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-emerald-700 text-white' : 'bg-stone-200'}`}>1</span>
            <span>Identity & Language</span>
          </button>
          <span className="text-stone-300">→</span>
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`flex items-center gap-1.5 ${step === 2 ? 'text-emerald-800 font-bold' : ''}`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-emerald-700 text-white' : 'bg-stone-200'}`}>2</span>
            <span>Plot & Crop</span>
          </button>
          <span className="text-stone-300">→</span>
          <button
            type="button"
            onClick={() => setStep(3)}
            className={`flex items-center gap-1.5 ${step === 3 ? 'text-emerald-800 font-bold' : ''}`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-emerald-700 text-white' : 'bg-stone-200'}`}>3</span>
            <span>Soil Health</span>
          </button>
        </div>

        {/* Step Content */}
        <form onSubmit={handleFinish} className="p-6 space-y-5">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                  Preferred Language for Voice & SMS
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { code: 'hi' as LanguageCode, label: 'हिन्दी (Hindi)' },
                    { code: 'or' as LanguageCode, label: 'ଓଡ଼ିଆ (Odia)' },
                    { code: 'ta' as LanguageCode, label: 'தமிழ் (Tamil)' },
                    { code: 'en' as LanguageCode, label: 'English' },
                  ].map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => setLanguage(item.code)}
                      className={`p-2.5 text-left rounded-xl border text-sm font-medium transition-all ${
                        language === item.code
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold'
                          : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                  Farmer Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Pradhan"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                  Mobile Number (For Automatic 5-Min SMS & Voice IVR)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 94371 XXXXX"
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Alerts are free and delivered even on 2G feature phones without internet.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span>Continue to Plot Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                  Plot Location (Block, District & State)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bargarh, Odisha, India"
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                    Primary Crop
                  </label>
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  >
                    <option value="Rice (Paddy)">Rice (Paddy)</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Mustard">Mustard</option>
                    <option value="Maize">Maize</option>
                    <option value="Soybean">Soybean</option>
                    <option value="Tomato">Tomato / Vegetables</option>
                    <option value="Millets (Ragi/Bajra)">Millets (Ragi / Bajra)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                    Plot Size
                  </label>
                  <input
                    type="text"
                    value={plotSize}
                    onChange={(e) => setPlotSize(e.target.value)}
                    placeholder="e.g. 2.0 Acres"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                  Sowing / Transplanting Date
                </label>
                <input
                  type="date"
                  value={sowingDate}
                  onChange={(e) => setSowingDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-xl text-sm transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-2/3 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span>Continue to Soil Data</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Soil Health Card Triangulation</span>
                  <p className="mt-0.5 text-amber-800">
                    If you don't have your Soil Health Card handy, KisanNet automatically uses ICAR regional block averages.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="defaultSoil"
                  checked={useDefaultSoil}
                  onChange={(e) => setUseDefaultSoil(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <label htmlFor="defaultSoil" className="text-xs font-medium text-stone-800">
                  Use Regional Agronomy Averages (pH: 6.2, OC: 0.48%)
                </label>
              </div>

              {!useDefaultSoil && (
                <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Soil pH
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={pH}
                      onChange={(e) => setPH(parseFloat(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Organic Carbon (OC %)
                    </label>
                    <input
                      type="text"
                      value={organicCarbon}
                      onChange={(e) => setOrganicCarbon(e.target.value)}
                      placeholder="e.g. 0.50%"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300"
                    />
                  </div>
                </div>
              )}

              <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Protected under BRICS National Data Residency Protocol (MeitY compliant).</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-xl text-sm transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSubmitting ? 'Registering...' : 'Complete & Generate Advisory'}</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
