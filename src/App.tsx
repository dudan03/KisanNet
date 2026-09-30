import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ApplicationPresetsBar } from './components/ApplicationPresetsBar';
import { ApplicationPresetsModal } from './components/ApplicationPresetsModal';
import { HeroSection } from './components/HeroSection';
import { AdvisorySection } from './components/AdvisorySection';
import { DiseaseCheckerSection } from './components/DiseaseCheckerSection';
import { VoiceAssistantSection } from './components/VoiceAssistantSection';
import { SmsSimulatorSection } from './components/SmsSimulatorSection';
import { BricsCooperationSection } from './components/BricsCooperationSection';
import { PrdSummarySection } from './components/PrdSummarySection';
import { Footer } from './components/Footer';
import { FarmerOnboardingModal } from './components/FarmerOnboardingModal';
import { ExtensionDashboardModal } from './components/ExtensionDashboardModal';
import { FarmerProfile, LanguageCode, AdvisoryData, ApplicationPreset } from './types';
import { sampleProfiles, sampleAdvisories, applicationPresets } from './data/sampleData';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('or');
  const [activeProfile, setActiveProfile] = useState<FarmerProfile>(sampleProfiles[0]);
  const [advisory, setAdvisory] = useState<AdvisoryData>(sampleAdvisories['Rice (Paddy)']);
  const [lowDataMode, setLowDataMode] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isExtensionModalOpen, setIsExtensionModalOpen] = useState<boolean>(false);
  const [isPresetsModalOpen, setIsPresetsModalOpen] = useState<boolean>(false);
  const [activePresetId, setActivePresetId] = useState<string>('preset-odia-paddy');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Monitor online / offline network state for PWA resilience
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Save recent advisory to localStorage for offline cache
    try {
      localStorage.setItem('kisannet_advisory_cache', JSON.stringify(advisory));
    } catch {}

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [advisory]);

  // Handle Preset Switching
  const handleSelectPreset = (preset: ApplicationPreset) => {
    setActivePresetId(preset.id);
    setActiveProfile(preset.profile);
    setCurrentLanguage(preset.language);
    setAdvisory(preset.advisory);

    if (preset.lowDataMode !== undefined) {
      setLowDataMode(preset.lowDataMode);
    }

    setToastMessage(`Loaded Preset: ${preset.name} (${preset.flag})`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);

    if (preset.targetView === 'extension') {
      setIsExtensionModalOpen(true);
    } else if (preset.targetView) {
      const targetElementId = preset.targetView;
      setTimeout(() => {
        document.getElementById(targetElementId)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  // Handle Profile Switch
  const handleSelectProfile = (profile: FarmerProfile) => {
    setActiveProfile(profile);
    const matchedAdvisory = sampleAdvisories[profile.crop] || sampleAdvisories['Rice (Paddy)'];
    setAdvisory({
      ...matchedAdvisory,
      farmerName: profile.name,
      plotLocation: profile.location,
      crop: profile.crop,
      stage: profile.stage,
    });
  };

  // Handle Onboarding Completion
  const handleOnboardingComplete = (newProfile: FarmerProfile) => {
    setActiveProfile(newProfile);
    setCurrentLanguage(newProfile.language);
    // Generate tailored advisory
    const baseAdvisory = sampleAdvisories[newProfile.crop] || sampleAdvisories['Rice (Paddy)'];
    setAdvisory({
      ...baseAdvisory,
      farmerName: newProfile.name,
      plotLocation: newProfile.location,
      crop: newProfile.crop,
      stage: newProfile.stage,
      advisoryId: `ADV-REG-${Date.now().toString().slice(-5)}`,
      generatedAt: 'Just Now (Fresh Satellite Sync)',
    });
    setToastMessage(`Plot Registered for ${newProfile.name}`);
    setTimeout(() => setToastMessage(null), 3500);

    // Smooth scroll down to the advisory section
    setTimeout(() => {
      document.getElementById('advisory')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  // Refresh Advisory with Live Calculation
  const handleRefreshAdvisory = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/advisory/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmerName: activeProfile.name,
          plotLocation: activeProfile.location,
          plotSize: activeProfile.plotSize,
          crop: activeProfile.crop,
          stage: activeProfile.stage,
          soilData: activeProfile.soilData,
        }),
      });
      const data = await res.json();
      setAdvisory(data);
    } catch {
      // Fallback
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-900 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-stone-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200 text-xs sm:text-sm">
          <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <strong className="block font-semibold">Application Preset Applied</strong>
            <span className="text-stone-300 text-xs">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Offline Alert Ribbon if disconnected */}
      {isOffline && (
        <div className="bg-amber-600 text-white text-xs py-2 px-4 text-center font-medium sticky top-0 z-50 shadow-sm flex items-center justify-center gap-2">
          <span>⚠️ Offline Mode Active · Displaying cached plot advisories and local ruleset</span>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        lowDataMode={lowDataMode}
        onToggleLowData={() => setLowDataMode((prev) => !prev)}
        isOffline={isOffline}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onOpenExtensionModal={() => setIsExtensionModalOpen(true)}
        onOpenVoiceModal={() => {
          document.getElementById('voice')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenPresetsModal={() => setIsPresetsModalOpen(true)}
      />

      {/* Application Presets Quick Switch Toolbar */}
      <ApplicationPresetsBar
        activePresetId={activePresetId}
        onSelectPreset={handleSelectPreset}
        onOpenPresetsModal={() => setIsPresetsModalOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          currentLanguage={currentLanguage}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
          onJumpToVoice={() => {
            document.getElementById('voice')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onJumpToAdvisory={() => {
            document.getElementById('advisory')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onJumpToSms={() => {
            document.getElementById('sms')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. P0: Plot-Level Advisory Engine with Satellite & Soil Triangulation */}
        <AdvisorySection
          currentLanguage={currentLanguage}
          advisory={advisory}
          activeProfile={activeProfile}
          onSelectProfile={handleSelectProfile}
          lowDataMode={lowDataMode}
          onRefreshAdvisory={handleRefreshAdvisory}
          isRefreshing={isRefreshing}
        />

        {/* 3. P1: AI Crop Disease Diagnostic Tool */}
        <DiseaseCheckerSection currentLanguage={currentLanguage} />

        {/* 4. P0: Regional Multilingual Voice Assistant (Gemini 3.8 Flash) */}
        <VoiceAssistantSection currentLanguage={currentLanguage} />

        {/* 5. P0: Automated SMS Alerts & Feature Phone Simulator */}
        <SmsSimulatorSection currentLanguage={currentLanguage} />

        {/* 6. P2: BRICS Cooperation & Shared Model Hub */}
        <BricsCooperationSection currentLanguage={currentLanguage} />

        {/* 7. Product Requirements & Compliance Breakdown */}
        <PrdSummarySection />
      </main>

      {/* Footer */}
      <Footer
        currentLanguage={currentLanguage}
        onSelectLanguage={setCurrentLanguage}
      />

      {/* Modals */}
      <ApplicationPresetsModal
        isOpen={isPresetsModalOpen}
        onClose={() => setIsPresetsModalOpen(false)}
        activePresetId={activePresetId}
        onSelectPreset={handleSelectPreset}
      />

      <FarmerOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
        currentLanguage={currentLanguage}
      />

      <ExtensionDashboardModal
        isOpen={isExtensionModalOpen}
        onClose={() => setIsExtensionModalOpen(false)}
      />
    </div>
  );
}
