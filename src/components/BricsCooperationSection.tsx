import React, { useState } from 'react';
import {
  Globe2,
  Cpu,
  ShieldCheck,
  Code2,
  Copy,
  Check,
  Layers,
  Database,
  Lock,
  Share2,
} from 'lucide-react';
import { bricsNodes } from '../data/sampleData';
import { LanguageCode } from '../types';
import { translations } from '../data/translations';

interface BricsCooperationProps {
  currentLanguage: LanguageCode;
}

export const BricsCooperationSection: React.FC<BricsCooperationProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];
  const [selectedNode, setSelectedNode] = useState(bricsNodes[0]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [viewSchema, setViewSchema] = useState<'model' | 'geojson' | 'api'>('model');

  const openApiSample = `{
  "openapi": "3.1.0",
  "info": {
    "title": "BRICS AgriN Interoperable Agro-Advisory API",
    "version": "1.0.4",
    "description": "Standardized data exchange format across BRICS National Agricultural Research Systems (NARS)"
  },
  "paths": {
    "/v1/advisory/plot": {
      "post": {
        "summary": "Generate triangulated daily advisory",
        "parameters": [
          { "name": "X-Node-ID", "in": "header", "required": true, "example": "IN-DEL-01" },
          { "name": "X-Data-Consent-Token", "in": "header", "required": true }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "plot_boundary_geojson": { "type": "object" },
                  "soil_health_card": { "type": "object" },
                  "crop_variety": { "type": "string" },
                  "satellite_ndvi_band": { "type": "number", "example": 0.72 }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

  const geoJsonSample = `{
  "type": "FeatureCollection",
  "properties": {
    "standard": "GeoJSON-Agri-v1",
    "federatedRound": 42,
    "privacyCompliance": "ISO/IEC 27701 & National Residency"
  },
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[83.618, 21.328], [83.622, 21.329], [83.621, 21.324], [83.618, 21.328]]]
      },
      "properties": {
        "plotId": "IN-OD-BAR-092",
        "crop": "Paddy",
        "ndvi": 0.72,
        "soilOrganicCarbon": 0.48,
        "recommendedBioInput": "Jeevamrit 200L/Acre"
      }
    }
  ]
}`;

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="brics" className="py-12 sm:py-20 bg-stone-100/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-8 border-b border-stone-200 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <Globe2 className="w-4 h-4 text-emerald-600" />
              <span>P2 Core Feature · BRICS AgriN Cooperation & Model Hub</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-1 font-display">
              Federated AI & Data Sovereignty
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-2xl">
              Cooperative digital public good infrastructure enabling Brazil, Russia, India, China, and South Africa to share agronomy models and satellite weights while guaranteeing 100% data residency within national borders.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-numbers text-stone-600 bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-xs">
              Federated Learning: <strong>Round 42 (ε = 0.85)</strong>
            </span>
          </div>
        </div>

        {/* Member Country Nodes Grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {bricsNodes.map((node) => {
            const isSelected = selectedNode.country === node.country;
            return (
              <button
                key={node.country}
                onClick={() => setSelectedNode(node)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-600/20'
                    : 'bg-white/80 border-stone-200 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-2xl mb-2">
                  <span>{node.flag}</span>
                  <span className="text-[10px] font-mono text-stone-400 font-semibold">{node.nodeId}</span>
                </div>
                <div className="text-sm font-bold text-stone-900">{node.country}</div>
                <div className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">{node.institution}</div>
                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-700 font-semibold font-mono-numbers">{node.accuracyScore}</span>
                  <span className="text-stone-400">{node.activeFarmers} farmers</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Node Details & Model Registry */}
        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-start">
          {/* Node Spec Sheet */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedNode.flag}</span>
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-display">
                    {selectedNode.country} National Node
                  </h3>
                  <div className="text-xs text-stone-500">{selectedNode.status}</div>
                </div>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 bg-stone-100 rounded text-stone-700">
                {selectedNode.nodeId}
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <span className="text-stone-400 text-xs uppercase font-semibold block">Host Institution</span>
                <span className="font-semibold text-stone-800">{selectedNode.institution}</span>
              </div>

              <div>
                <span className="text-stone-400 text-xs uppercase font-semibold block">Shared Open Model</span>
                <span className="font-semibold text-emerald-800">{selectedNode.sharedModel}</span>
              </div>

              <div>
                <span className="text-stone-400 text-xs uppercase font-semibold block">Data Residency Compliance</span>
                <div className="flex items-center gap-1.5 mt-0.5 text-stone-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{selectedNode.dataResidency}</span>
                </div>
              </div>

              <div>
                <span className="text-stone-400 text-xs uppercase font-semibold block">Federated Model Precision</span>
                <div className="text-xl font-bold font-mono-numbers text-stone-900 mt-0.5">
                  {selectedNode.accuracyScore}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 bg-stone-50 p-3.5 rounded-xl text-xs text-stone-600">
              <div className="flex items-center gap-1.5 font-semibold text-stone-800 mb-1">
                <Lock className="w-3.5 h-3.5 text-emerald-700" />
                <span>Zero Raw Data Transfer Guarantee</span>
              </div>
              Only decentralized mathematical weight gradients (differential privacy ε=0.85) are communicated over the secure BRICS API gateway. Farmer identifying records never leave national servers.
            </div>
          </div>

          {/* Open Schema & Developer Spec Viewer */}
          <div className="lg:col-span-7 bg-stone-900 text-stone-100 rounded-2xl border border-stone-800 p-5 sm:p-6 shadow-xl flex flex-col h-[460px]">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Open Public Good Standards
                </span>
              </div>

              {/* Schema Switcher */}
              <div className="flex items-center gap-1 bg-stone-800 p-1 rounded-lg text-xs font-mono">
                <button
                  onClick={() => setViewSchema('model')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    viewSchema === 'model' ? 'bg-emerald-700 text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Model Registry
                </button>
                <button
                  onClick={() => setViewSchema('geojson')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    viewSchema === 'geojson' ? 'bg-emerald-700 text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  GeoJSON-Agri
                </button>
                <button
                  onClick={() => setViewSchema('api')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    viewSchema === 'api' ? 'bg-emerald-700 text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  OpenAPI 3.1
                </button>
              </div>

              <button
                onClick={() =>
                  handleCopyCode(
                    viewSchema === 'api' ? openApiSample : viewSchema === 'geojson' ? geoJsonSample : JSON.stringify(selectedNode, null, 2)
                  )
                }
                className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
                title="Copy schema JSON"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <pre className="flex-1 overflow-auto text-xs text-emerald-300 font-mono p-3 leading-relaxed">
              {viewSchema === 'api'
                ? openApiSample
                : viewSchema === 'geojson'
                ? geoJsonSample
                : JSON.stringify(
                    {
                      nodeMetadata: selectedNode,
                      protocol: 'ADAPT / FAO AgroVoc v3',
                      federatedProtocol: 'PySyft Federated Aggregation',
                      licence: 'Apache 2.0 Digital Public Good',
                    },
                    null,
                    2
                  )}
            </pre>

            <div className="pt-3 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between font-mono">
              <span>Standard: FAO AgroVoc & ISO/IEC 27701</span>
              <span className="text-emerald-400">Open Public Good v1.0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
