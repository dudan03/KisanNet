import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Target,
  Users2,
  Layers,
  Cpu,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export const PrdSummarySection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section id="prd" className="py-12 sm:py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Product Requirements Document (PRD v1.0) Summary</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1 font-display">
                KisanNet Specification & Acceptance Compliance
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                Owner: Dudan Technology · Theme: BRICS Cooperation · Digital Public Good Architecture
              </p>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-100 transition-colors self-start sm:self-auto"
            >
              <span>{isOpen ? 'Collapse PRD' : 'Expand PRD'}</span>
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {isOpen && (
            <div className="mt-6 space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
              {/* Problem vs Goals */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-5 border border-stone-200">
                  <div className="flex items-center gap-2 font-bold text-stone-900 text-sm mb-2">
                    <Target className="w-4 h-4 text-red-600" />
                    <span>The Problem</span>
                  </div>
                  <ul className="space-y-2 text-stone-600 text-xs">
                    <li>• Smallholders lack access to satellite indices, soil analytics, or micro-weather.</li>
                    <li>• Leads to crop failure, lower farm income, and depleted soil organic carbon.</li>
                    <li>• Low literacy, 2G feature phones, and poor connectivity make app-only tools fail.</li>
                    <li>• Absence of shared digital infrastructure between BRICS nations for climate-resilient farming.</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-5 border border-stone-200">
                  <div className="flex items-center gap-2 font-bold text-stone-900 text-sm mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Goals & Acceptance Criteria</span>
                  </div>
                  <ul className="space-y-2 text-stone-600 text-xs">
                    <li>• <strong>Onboarding:</strong> Register plot & crop in under 2 minutes (web/SMS).</li>
                    <li>• <strong>Advisory:</strong> Daily plot-level guidance with confidence score + regenerative action.</li>
                    <li>• <strong>Voice:</strong> Hindi, Odia, Tamil, English spoken replies &lt;5s on 3G.</li>
                    <li>• <strong>SMS:</strong> 95% delivery within 5 minutes of event trigger on basic phones.</li>
                    <li>• <strong>Disease AI:</strong> &gt;85% Top-3 diagnostic accuracy with non-toxic bio remedies.</li>
                  </ul>
                </div>
              </div>

              {/* Core Feature Matrix */}
              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                <div className="p-4 bg-stone-100/70 border-b border-stone-200 font-bold text-stone-900 text-xs sm:text-sm">
                  Core Features & Status
                </div>
                <div className="divide-y divide-stone-100 text-xs">
                  {[
                    { priority: 'P0', feature: 'Farmer Onboarding', desc: 'Register location, crop, plot size and language in <2 mins', status: 'Live & Tested' },
                    { priority: 'P0', feature: 'Advisory Engine', desc: 'Sentinel-2 NDVI, soil pH/NPK/carbon, and 7-day weather triangulation', status: 'Live & Tested' },
                    { priority: 'P0', feature: 'Regenerative Recommendations', desc: 'Crop rotation, straw mulching, green manure, bio-inputs & AWD water savings', status: 'Live & Tested' },
                    { priority: 'P0', feature: 'Multilingual Voice Assistant', desc: 'Speech-to-text, Gemini 3.8 Flash, and speech synthesis in HI, OR, TA, EN', status: 'Live & Tested' },
                    { priority: 'P0', feature: 'Automatic SMS Alerts', desc: 'Event-triggered rain, pest, and heat messages with two-way SMS terminal', status: 'Live & Tested' },
                    { priority: 'P1', feature: 'Crop Disease Diagnosis', desc: 'Symptom checker + photo upload with top-3 accuracy & bio-treatments', status: 'Live & Tested' },
                    { priority: 'P1', feature: 'Responsive PWA & Low-Data Mode', desc: 'Works across phone, tablet, and desktop with 2G low-data mode', status: 'Live & Tested' },
                    { priority: 'P1', feature: 'Extension Dashboard', desc: 'Regional risk heatmaps, farmer list, and mass advisory broadcast simulator', status: 'Live & Tested' },
                    { priority: 'P2', feature: 'BRICS Model Hub', desc: 'Shared model registry, federated learning nodes, and open GeoJSON schemas', status: 'Live & Tested' },
                  ].map((row, idx) => (
                    <div key={idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-stone-50">
                      <div className="flex items-center gap-2 sm:w-1/4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.priority === 'P0' ? 'bg-red-100 text-red-800' : row.priority === 'P1' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                          {row.priority}
                        </span>
                        <strong className="text-stone-900">{row.feature}</strong>
                      </div>
                      <div className="sm:w-1/2 text-stone-600">{row.desc}</div>
                      <div className="sm:w-1/4 sm:text-right flex items-center sm:justify-end gap-1.5 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{row.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Metrics */}
              <div className="p-4 bg-emerald-950 text-emerald-100 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="font-bold text-white text-sm block">Key Success Metrics Target</span>
                  <span>10% yield improvement · 8% input cost reduction · 95% SMS delivery rate</span>
                </div>
                <div className="text-amber-300 font-mono font-semibold">
                  Open Digital Public Good · Apache 2.0
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
