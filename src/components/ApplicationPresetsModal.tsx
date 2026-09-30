import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  Globe2,
  Users,
  Layers,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  LayoutDashboard,
  Sprout,
  Filter,
} from 'lucide-react';
import { ApplicationPreset } from '../types';
import { applicationPresets } from '../data/sampleData';

interface ApplicationPresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePresetId: string;
  onSelectPreset: (preset: ApplicationPreset) => void;
}

export const ApplicationPresetsModal: React.FC<ApplicationPresetsModalProps> = ({
  isOpen,
  onClose,
  activePresetId,
  onSelectPreset,
}) => {
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('All');

  if (!isOpen) return null;

  const roles = ['All', 'Smallholder Farmer', 'Extension Worker / FPO', 'National Node Admin'];

  const filteredPresets = applicationPresets.filter((preset) => {
    if (selectedRoleFilter === 'All') return true;
    return preset.role === selectedRoleFilter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-white p-6 sm:p-7 relative overflow-hidden">
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>One-Click Application Presets · PRD Personas & Test Scenarios</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 font-display">
                Choose an Application Preset
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl">
                Experience KisanNet from different farmer personas, crops, regional languages, and BRICS national nodes. Each preset loads plot telemetry, localized voice prompts, and simulated carrier alerts.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-emerald-200 hover:text-white p-1.5 rounded-xl hover:bg-emerald-800/80 transition-colors"
              aria-label="Close presets modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Filter Tabs */}
          <div className="mt-6 flex flex-wrap items-center gap-1.5 p-1 bg-emerald-950/50 rounded-xl max-w-fit border border-emerald-700/50 text-xs">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRoleFilter(r)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedRoleFilter === r
                    ? 'bg-white text-emerald-950 font-bold shadow-xs'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Presets Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-stone-50">
          <div className="grid md:grid-cols-2 gap-4">
            {filteredPresets.map((preset) => {
              const isActive = activePresetId === preset.id;

              return (
                <div
                  key={preset.id}
                  onClick={() => {
                    onSelectPreset(preset);
                    onClose();
                  }}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                    isActive
                      ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-600/25'
                      : 'bg-white border-stone-200 hover:border-emerald-500 hover:shadow-xs'
                  }`}
                >
                  <div>
                    {/* Top flag and role */}
                    <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{preset.flag}</span>
                        <div>
                          <span className="text-xs font-bold text-stone-900 block font-display">
                            {preset.name}
                          </span>
                          <span className="text-[11px] text-stone-500 block">
                            {preset.location} · {preset.crop}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {preset.language.toUpperCase()}
                      </span>
                    </div>

                    {/* Scenario Highlight */}
                    <p className="mt-3 text-xs text-stone-700 leading-relaxed">
                      {preset.scenarioHighlight}
                    </p>

                    {/* Primary Action */}
                    <div className="mt-3 p-2.5 rounded-xl bg-stone-50 border border-stone-100 text-[11px] text-stone-600">
                      <strong className="text-stone-900 block mb-0.5">Key Agronomic Action:</strong>
                      <span>{preset.primaryAction}</span>
                    </div>
                  </div>

                  {/* Bottom selection button */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-stone-400 font-medium">
                      Role: {preset.role}
                    </span>
                    <button
                      type="button"
                      className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                        isActive
                          ? 'bg-emerald-700 text-white'
                          : 'bg-stone-100 text-stone-800 hover:bg-emerald-50 hover:text-emerald-800'
                      }`}
                    >
                      {isActive ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Active Preset</span>
                        </>
                      ) : (
                        <>
                          <span>Load Preset</span>
                          <ArrowRight className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-white p-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>All 8 presets comply with BRICS AgriN PRD v1.0 specifications and data residency rules.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
