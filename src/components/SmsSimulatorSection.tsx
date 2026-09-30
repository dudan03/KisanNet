import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  CloudRain,
  Flame,
  Bug,
  CheckCircle2,
  PhoneCall,
  Clock,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { LanguageCode, SmsMessage } from '../types';
import { translations } from '../data/translations';

interface SmsSimulatorProps {
  currentLanguage: LanguageCode;
}

export const SmsSimulatorSection: React.FC<SmsSimulatorProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];
  const [messages, setMessages] = useState<SmsMessage[]>([
    {
      id: 'sms-1',
      sender: 'network',
      text:
        currentLanguage === 'hi'
          ? 'किसाननेट मौसम अलर्ट: आपके ब्लॉक में 48 घंटे में हल्की बारिश (12-18mm) का अनुमान। यूरिया का छिड़काव रोकें। मेड़ों से पानी निकासी का प्रबंध करें। जैविक नुस्खे के लिए 2 भेजें।'
          : currentLanguage === 'or'
          ? 'କିସାନନେଟ୍ ପାଣିପାଗ ସତର୍କତା: ଆପଣଙ୍କ ବ୍ଲକରେ ୪୮ ଘଣ୍ଟା ମଧ୍ୟରେ ବର୍ଷା (୧୨-୧୮ମିମି) ହେବାର ସମ୍ଭାବନା। ୟୁରିଆ ପ୍ରୟୋଗ ବନ୍ଦ ରଖନ୍ତୁ। ଜଳ ନିଷ୍କାସନ ପଥ ସଫା କରନ୍ତୁ। ଜୈବିକ ଔଷଧ ପାଇଁ ୨ ପଠାନ୍ତୁ।'
          : currentLanguage === 'ta'
          ? 'கிசான்நெட் எச்சரிக்கை: அடுத்த 48 மணி நேரத்தில் மழை வாய்ப்பு. ரசாயன உரங்களைத் தவிர்க்கவும். வடிகால் வசதி செய்க. இயற்கை மருந்து முறைக்கு 2 என அனுப்பவும்.'
          : 'KisanNet IMD Alert: Light rain (12-18mm) expected in 48h. Halt urea broadcasting to prevent leaching. Clear drainage canals. Reply 1 for 7-day rain forecast, 2 for Bio-pest recipe.',
      time: '06:15 AM',
      type: 'rain',
    },
  ]);

  const [inputCommand, setInputCommand] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Trigger simulated emergency alert
  const handleTriggerAlert = (type: 'rain' | 'pest' | 'heat' | 'bio') => {
    let alertText = '';
    if (type === 'rain') {
      alertText =
        'KisanNet IMD Flash: Heavy downpour (35mm) forecast within 36 hours. Open drainage bunds immediately. Harvest mature pulses. Reply 1 for detailed radar tracking.';
    } else if (type === 'pest') {
      alertText =
        'KisanNet Pest Alert: Yellow stem borer crossed economic threshold in neighboring village cluster. Spray 5% Neem Seed Kernel Extract (NSKE) tomorrow morning. Reply 2 for formulation.';
    } else if (type === 'heat') {
      alertText =
        'KisanNet Heat Stress: Temperatures to hit 39°C. Retain 4-inch straw mulch to stop root scorching. Irrigate during night hours only. Reply 4 for voice advisory.';
    } else {
      alertText =
        'KisanNet Bio-Window: Low wind speed (6 km/h) and moderate humidity today make it the perfect window for liquid Jeevamrit spray (200L/acre). Reply 2 for ingredients.';
    }

    const newAlert: SmsMessage = {
      id: `alert-${Date.now()}`,
      sender: 'network',
      text: alertText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: type === 'bio' ? 'general' : type,
    };

    setMessages((prev) => [...prev, newAlert]);
  };

  // Reply to SMS
  const handleSendSms = async (customCommand?: string) => {
    const cmd = customCommand || inputCommand;
    if (!cmd.trim() || isSending) return;

    const userSms: SmsMessage = {
      id: `usr-${Date.now()}`,
      sender: 'farmer',
      text: cmd,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userSms]);
    setInputCommand('');
    setIsSending(true);

    try {
      const res = await fetch('/api/sms/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command: cmd,
          language: currentLanguage,
        }),
      });

      const data = await res.json();
      const carrierReply: SmsMessage = {
        id: `reply-${Date.now()}`,
        sender: 'network',
        text: data.text,
        time: data.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'general',
      };

      setMessages((prev) => [...prev, carrierReply]);
    } catch {
      const fallbackReply: SmsMessage = {
        id: `fallback-${Date.now()}`,
        sender: 'network',
        text: 'KisanNet: Option received. Detailed micro-advice will be sent shortly. Reply 0 to return to main menu.',
        time: 'Now',
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="sms" className="py-12 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pb-8 border-b border-stone-200 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-amber-700" />
              <span>P0 Core Feature · Automated SMS & Feature Phone Gateway</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-1 font-display">
              Zero-Internet SMS & IVR Fallback
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-2xl">
              {t.smsDemoSubtitle} Farmers with basic $10 feature phones can receive weather warnings, ask questions by two-way SMS, or request automated voice callbacks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-numbers text-stone-600 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
              Telecom SLA: <strong>95% Delivered &lt;5 Mins</strong>
            </span>
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Event Triggers & Two-way Commands Explanation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3">
                Simulate Triggered Push Alerts
              </h3>
              <p className="text-xs text-stone-600 mb-4">
                Click any automated event trigger to see how the system broadcasts critical warnings instantly to registered farmers:
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleTriggerAlert('rain')}
                  className="p-3 text-left bg-white hover:bg-blue-50 border border-stone-200 hover:border-blue-400 rounded-xl transition-all shadow-xs"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                    <CloudRain className="w-4 h-4 text-blue-600" />
                    <span>Rain Invariant</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">35mm downpour alert</div>
                </button>

                <button
                  onClick={() => handleTriggerAlert('pest')}
                  className="p-3 text-left bg-white hover:bg-red-50 border border-stone-200 hover:border-red-400 rounded-xl transition-all shadow-xs"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-red-900">
                    <Bug className="w-4 h-4 text-red-600" />
                    <span>Pest Outbreak</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">Stem borer threshold alert</div>
                </button>

                <button
                  onClick={() => handleTriggerAlert('heat')}
                  className="p-3 text-left bg-white hover:bg-amber-50 border border-stone-200 hover:border-amber-400 rounded-xl transition-all shadow-xs"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <Flame className="w-4 h-4 text-amber-600" />
                    <span>Heat Stress</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">39°C drought alert</div>
                </button>

                <button
                  onClick={() => handleTriggerAlert('bio')}
                  className="p-3 text-left bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-400 rounded-xl transition-all shadow-xs"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Bio-Spray Window</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">Optimal humidity window</div>
                </button>
              </div>
            </div>

            {/* Quick 2-Way Number Commands */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3">
                Two-Way Interactive SMS Menu
              </h3>
              <p className="text-xs text-stone-600 mb-3">
                Farmers can reply with numbers 1 to 4 on their keypad:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: '1', title: 'Reply 1', desc: 'Rain & 7-Day Forecast' },
                  { key: '2', title: 'Reply 2', desc: 'Organic Bio-Pest Recipe' },
                  { key: '3', title: 'Reply 3', desc: 'APMC Mandi MSP Price' },
                  { key: '4', title: 'Reply 4', desc: 'Voice IVR Callback' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleSendSms(item.key)}
                    className="p-2.5 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl text-left transition-colors shadow-xs"
                  >
                    <div className="text-xs font-bold text-stone-900 font-mono">{item.title}</div>
                    <div className="text-[11px] text-stone-500">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Physical Feature Phone Mockup */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-md bg-stone-900 rounded-[36px] p-5 shadow-2xl border-4 border-stone-800 text-stone-100 relative">
              {/* Phone Speaker & Camera notch */}
              <div className="w-20 h-4 bg-stone-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-1.5 bg-stone-700 rounded-full"></div>
              </div>

              {/* Phone Screen Area */}
              <div className="bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden flex flex-col h-[460px]">
                {/* Screen Status Bar */}
                <div className="bg-stone-900 px-4 py-2 flex items-center justify-between text-[11px] text-stone-400 font-mono border-b border-stone-800">
                  <span>BSNL / Jio 2G</span>
                  <span>KisanNet Shortcode: 51969</span>
                  <span>98%</span>
                </div>

                {/* SMS Thread */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {messages.map((sms) => {
                    const isNetwork = sms.sender === 'network';
                    return (
                      <div
                        key={sms.id}
                        className={`flex flex-col ${isNetwork ? 'items-start' : 'items-end'}`}
                      >
                        <div
                          className={`max-w-[90%] p-3 rounded-xl text-xs leading-relaxed ${
                            isNetwork
                              ? 'bg-stone-800 text-stone-100 border border-stone-700'
                              : 'bg-emerald-700 text-white'
                          }`}
                        >
                          <p className="whitespace-pre-line">{sms.text}</p>
                          <div className="mt-1 text-[10px] text-stone-400 text-right">
                            {sms.time}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {isSending && (
                    <div className="text-xs text-stone-500 italic flex items-center gap-1.5">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Transmitting SMS via National Gateway...</span>
                    </div>
                  )}
                </div>

                {/* Simulated Phone SMS Input Bar */}
                <div className="p-3 bg-stone-900 border-t border-stone-800 flex items-center gap-2">
                  <input
                    type="text"
                    value={inputCommand}
                    onChange={(e) => setInputCommand(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendSms()}
                    placeholder="Type 1, 2, 3, 4 or message..."
                    className="flex-1 bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={() => handleSendSms()}
                    disabled={!inputCommand.trim() || isSending}
                    className="p-2 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-lg transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Physical Keypad aesthetic dots */}
              <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-around text-stone-600 text-xs">
                <span>SIM 1 (Active)</span>
                <span className="w-10 h-1 bg-stone-700 rounded-full"></span>
                <span>Toll-Free 1800-KISAN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
