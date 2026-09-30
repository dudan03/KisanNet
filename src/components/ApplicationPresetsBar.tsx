import React from 'react';
import { Sparkles, SlidersHorizontal, CheckCircle2, ChevronRight } from 'lucide-react';
import { ApplicationPreset } from '../types';
import { applicationPresets } from '../data/sampleData';

interface ApplicationPresetsBarProps {
  activePresetId: string;
  onSelectPreset: (preset: ApplicationPreset) => void;
  onOpenPresetsModal: () => void;
}

export const ApplicationPresetsBar: React.FC<ApplicationPresetsBarProps> = ({
  activePresetId,
  onSelectPreset,
  onOpenPresetsModal,
}) => {
  const activePreset = applicationPresets.find((p) => p.id === activePresetId) || applicationPresets[0];

  return (
    <div className="bg-emerald-950 text-white border-b border-emerald-900 py-2.5 px-4 shadow-inner text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Active preset label */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-400 text-stone-950 font-bold uppercase tracking-wider text-[10px]">
            <Sparkles className="w-3 h-3 text-stone-950" />
            <span>Preset</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-100">
            <span className="text-base">{activePreset.flag}</span>
            <strong className="text-white font-semibold">{activePreset.name}</strong>
            <span aria-hidden="true" className="text-emerald-600">·</span>
            <span className="text-emerald-300 hidden sm:inline">{activePreset.location.split(',')[0]}</span>
          </div>
        </div>

        {/* Center: Quick Preset Pills / Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
          {applicationPresets.slice(0, 5).map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white'
                }`}
                title={preset.scenarioHighlight}
              >
                <span>{preset.flag}</span>
                <span>{preset.name.split(' ')[0]} {preset.name.split(' ')[1] || ''}</span>
              </button>
            );
          })}
        </div>

        {/* Right: "View All Presets (8)" button */}
        <button
          onClick={onOpenPresetsModal}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 hover:text-white border border-emerald-700 font-semibold transition-all shrink-0 text-xs"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-300" />
          <span>All Presets ({applicationPresets.length})</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
        </button>
      </div>
    </div>
  );
};
