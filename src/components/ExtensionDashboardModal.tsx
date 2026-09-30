import React, { useState } from 'react';
import {
  X,
  LayoutDashboard,
  Filter,
  Search,
  Radio,
  Send,
  AlertTriangle,
  CheckCircle2,
  Users,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { extensionClusters } from '../data/sampleData';

interface ExtensionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExtensionDashboardModal: React.FC<ExtensionModalProps> = ({ isOpen, onClose }) => {
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<'All' | 'High' | 'Moderate' | 'Low'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [broadcastText, setBroadcastText] = useState(
    'KisanNet Emergency Broadcast: Stem borer spore trap counts rising in Padampur & Bargarh clusters. Apply 5% Neem Seed Extract. Avoid chemical sprays ahead of Day 3 rainfall.'
  );
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  if (!isOpen) return null;

  const filteredClusters = extensionClusters.filter((cluster) => {
    const matchesRisk = selectedRiskFilter === 'All' || cluster.riskLevel === selectedRiskFilter;
    const matchesSearch =
      cluster.block.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cluster.primaryCrop.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      setBroadcastSuccess(true);
      setTimeout(() => setBroadcastSuccess(false), 4000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl max-w-5xl w-full border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <LayoutDashboard className="w-4 h-4" />
              <span>P1 Feature · Extension Worker & FPO Portal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mt-1 font-display">
              Regional Agricultural Risk & Farmer Registry
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Real-time monitoring across 95 villages, 18,450 smallholders, and automated mass emergency broadcast gateway.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Aggregation Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
              <div className="text-xs font-semibold text-stone-500">Farmers Monitored</div>
              <div className="text-2xl font-bold text-stone-900 font-mono-numbers mt-1">18,450</div>
              <div className="text-[11px] text-emerald-700 mt-0.5">Across 4 Agricultural Blocks</div>
            </div>
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
              <div className="text-xs font-semibold text-stone-500">Villages Covered</div>
              <div className="text-2xl font-bold text-stone-900 font-mono-numbers mt-1">95</div>
              <div className="text-[11px] text-stone-500 mt-0.5">Odisha Eastern Agro Zone</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="text-xs font-semibold text-amber-800">High Risk Clusters</div>
              <div className="text-2xl font-bold text-amber-900 font-mono-numbers mt-1">1 Block</div>
              <div className="text-[11px] text-amber-700 mt-0.5">Padampur (Whitefly & Drought)</div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="text-xs font-semibold text-emerald-800">SMS Delivery SLA</div>
              <div className="text-2xl font-bold text-emerald-900 font-mono-numbers mt-1">98.4%</div>
              <div className="text-[11px] text-emerald-700 mt-0.5">Under 4.2 Minutes average</div>
            </div>
          </div>

          {/* Regional Risk Heatmap Cards */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-display">
                  Village Cluster Risk Heatmap
                </h3>
                <p className="text-xs text-stone-500">
                  Triangulated from field scout trap counts, Sentinel-2 moisture index, and Soil Health Cards.
                </p>
              </div>

              {/* Filter controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs">
                  {(['All', 'High', 'Moderate', 'Low'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedRiskFilter(lvl)}
                      className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                        selectedRiskFilter === lvl
                          ? 'bg-white text-stone-900 shadow-xs font-semibold'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredClusters.map((cluster) => {
                const isHigh = cluster.riskLevel === 'High';
                const isModerate = cluster.riskLevel === 'Moderate';

                return (
                  <div
                    key={cluster.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isHigh
                        ? 'bg-red-50/50 border-red-300'
                        : isModerate
                        ? 'bg-amber-50/40 border-amber-300'
                        : 'bg-emerald-50/30 border-emerald-200'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                      <div>
                        <span className="text-sm font-bold text-stone-900">{cluster.block}</span>
                        <div className="text-xs text-stone-500">{cluster.villageCount} villages · {cluster.farmers.toLocaleString()} farmers</div>
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                          isHigh
                            ? 'bg-red-200 text-red-900'
                            : isModerate
                            ? 'bg-amber-200 text-amber-900'
                            : 'bg-emerald-200 text-emerald-900'
                        }`}
                      >
                        {cluster.riskLevel} Risk
                      </span>
                    </div>

                    <div className="mt-3 text-xs text-stone-700 leading-relaxed">
                      <strong>Risk Trigger:</strong> {cluster.alertReason}
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-200/60 grid grid-cols-3 gap-2 text-[11px] text-stone-600">
                      <div>
                        <span className="text-stone-400 block">Primary Crop</span>
                        <span className="font-semibold text-stone-800">{cluster.primaryCrop.split(' ')[0]}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block">Soil Health</span>
                        <span className="font-semibold text-stone-800">{cluster.soilHealthIndex.split(' ')[0]}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block">SMS Gateway</span>
                        <span className="font-semibold text-emerald-700 font-mono-numbers">{cluster.smsDeliveryRate}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mass Broadcast Emergency Composer */}
          <div className="bg-stone-900 text-white rounded-2xl p-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Mass SMS & IVR Emergency Dispatcher</span>
            </div>
            <h3 className="text-lg font-bold font-display">
              Broadcast Localized Advisory to Registered Farmers
            </h3>
            <p className="text-xs text-stone-400 mt-1 max-w-2xl">
              Sends an urgent advisory via both 2G SMS and automated regional-language IVR voice call.
            </p>

            <form onSubmit={handleBroadcast} className="mt-4 space-y-4">
              <textarea
                value={broadcastText}
                onChange={(e) => setBroadcastText(e.target.value)}
                rows={3}
                required
                className="w-full bg-stone-950 border border-stone-700 rounded-xl p-3 text-xs sm:text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
              ></textarea>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-stone-400">
                  Target Recipient Pool: <strong className="text-white">18,450 registered mobile numbers</strong>
                </div>

                <button
                  type="submit"
                  disabled={isBroadcasting}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>{isBroadcasting ? 'Dispatching over Carrier Gateway...' : 'Broadcast to 18,450 Farmers'}</span>
                </button>
              </div>

              {broadcastSuccess && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Broadcast transmitted successfully! 18,450 SMS dispatches queued with 98.4% predicted delivery within 3 minutes.
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
