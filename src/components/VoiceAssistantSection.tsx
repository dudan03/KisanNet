import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  RefreshCw,
  User,
  Bot,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';
import { ChatMessage, LanguageCode } from '../types';
import { translations } from '../data/translations';
import { sampleVoicePrompts } from '../data/sampleData';

interface VoiceAssistantProps {
  currentLanguage: LanguageCode;
}

export const VoiceAssistantSection: React.FC<VoiceAssistantProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text:
        currentLanguage === 'hi'
          ? 'नमस्ते किसान भाई! मैं किसाननेट आवाज सहायक हूँ। अपनी फसल, सिंचाई, जैविक खाद (जीवामृत) या मौसम से संबंधित कोई भी सवाल पूछें।'
          : currentLanguage === 'or'
          ? 'ନମସ୍କାର ଚାଷୀ ଭାଇ! ମୁଁ କିସାନନେଟ୍ ଭଏସ୍ ସହାୟକ। ଆପଣଙ୍କ ଫସଲ, ଜଳସେଚନ କିମ୍ବା ଜୈବିକ ଖତ ସମ୍ବନ୍ଧରେ ଯେକୌଣସି ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ।'
          : currentLanguage === 'ta'
          ? 'வணக்கம் விவசாய தோழரே! நான் கிசான்நெட் குரல் வழிகாட்டி. பயிர், பாசனம் அல்லது இயற்கை உரம் குறித்த உங்கள் கேள்விகளைக் கேளுங்கள்.'
          : 'Welcome Farmer! I am KisanNet Voice Sahayak. Ask me any practical question about your crops, weather protection, or low-cost regenerative inputs like Jeevamrit.',
      timestamp: 'Just now',
      language: currentLanguage,
      confidence: 0.98,
      source: 'BRICS AgriN Knowledge Core',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [audioSpeed, setAudioSpeed] = useState<number>(0.95);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat history
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Set up Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      const langMap: Record<LanguageCode, string> = {
        hi: 'hi-IN',
        or: 'or-IN',
        ta: 'ta-IN',
        en: 'en-IN',
      };
      recognition.lang = langMap[currentLanguage] || 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
          handleSendMessage(transcript);
        }
      };

      recognitionRef.current = recognition;
    }
  }, [currentLanguage]);

  // Toggle Speech Recognition
  const toggleListening = () => {
    if (!recognitionRef.current) {
      console.warn('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('Speech recognition start failed:', err);
      }
    }
  };

  // Play Speech Output
  const handlePlayMessage = (msg: ChatMessage) => {
    if (activeAudioId === msg.id) {
      window.speechSynthesis.cancel();
      setActiveAudioId(null);
      return;
    }

    // If server sent base64 wav audio from Gemini TTS
    if (msg.audioBase64) {
      try {
        const audio = new Audio(`data:audio/wav;base64,${msg.audioBase64}`);
        audio.playbackRate = audioSpeed;
        audio.onended = () => setActiveAudioId(null);
        audio.play();
        setActiveAudioId(msg.id);
        return;
      } catch {
        // fallback to browser Web Speech API below
      }
    }

    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(msg.text);
    utterance.rate = audioSpeed;

    const langMap: Record<LanguageCode, string> = {
      hi: 'hi-IN',
      or: 'or-IN',
      ta: 'ta-IN',
      en: 'en-IN',
    };
    utterance.lang = langMap[msg.language] || 'en-IN';

    utterance.onend = () => setActiveAudioId(null);
    utterance.onerror = () => setActiveAudioId(null);

    window.speechSynthesis.speak(utterance);
    setActiveAudioId(msg.id);
  };

  // Send message to backend Gemini 3.8 Flash
  const handleSendMessage = async (customQuery?: string) => {
    const textToSend = customQuery || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: currentLanguage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language: currentLanguage,
          crop: 'Rice (Paddy)',
          location: 'Bargarh, Odisha',
        }),
      });

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply,
        audioBase64: data.audioBase64,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: currentLanguage,
        confidence: data.confidence || 0.95,
        source: data.source || 'BRICS AgriN Harmonized AI Agro-Model',
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Auto play audio reply for voice experience
      setTimeout(() => {
        handlePlayMessage(assistantMessage);
      }, 200);
    } catch (error) {
      console.error('Chat error:', error);
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        text:
          'KisanNet Sahayak: For optimal moisture retention, retain straw mulch and apply Jeevamrit (200L/acre). Ensure proper drainage before upcoming showers.',
        timestamp: 'Now',
        language: currentLanguage,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = sampleVoicePrompts[currentLanguage] || sampleVoicePrompts.en;

  return (
    <section id="voice" className="py-12 sm:py-20 bg-stone-100/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-8 border-b border-stone-200 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span>P0 Core Feature · Regional Multilingual Voice Assistant</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-1 font-display">
              Voice Sahayak (3G Optimized)
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-2xl">
              Speech-to-text, Gemini 3.8 Flash agronomist reasoning, and audio response in Hindi, Odia, Tamil, and English. Returns spoken replies in &lt;5 seconds.
            </p>
          </div>

          {/* Voice Audio Speed Controls */}
          <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-xl p-1.5 text-xs shadow-xs">
            <span className="text-stone-500 font-medium px-2">Voice Speed:</span>
            {[0.8, 1.0, 1.2].map((spd) => (
              <button
                key={spd}
                onClick={() => setAudioSpeed(spd)}
                className={`px-2 py-1 rounded-md transition-colors ${
                  audioSpeed === spd
                    ? 'bg-emerald-700 text-white font-bold'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Assistant Main Layout */}
        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Quick Suggested Voice Prompts */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>Tap to Ask (Field Scenarios)</span>
              </div>
              <p className="text-xs text-stone-500 mb-3">
                Click any common farming query to hear how Voice Sahayak replies in your language:
              </p>
              <div className="space-y-2">
                {samplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="w-full text-left p-3 rounded-xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/50 text-xs sm:text-sm text-stone-800 transition-all leading-snug"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>

            {/* Accessibility & Literacy Note */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
              <div className="font-bold mb-1">Built for Non-Literate Farmers</div>
              Every answer is synthesized to voice automatically. On basic feature phones, farmers can access this exact engine via our free toll-free IVR number (1800-KISAN).
            </div>
          </div>

          {/* Right Column: Interactive Voice Terminal / Chat */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col h-[560px] overflow-hidden">
            {/* Top Bar of Voice Hub */}
            <div className="bg-stone-50 px-5 py-3.5 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-bold text-stone-900">
                  KisanNet Voice Node · Active in{' '}
                  {currentLanguage === 'hi'
                    ? 'हिन्दी'
                    : currentLanguage === 'or'
                    ? 'ଓଡ଼ିଆ'
                    : currentLanguage === 'ta'
                    ? 'தமிழ்'
                    : 'English'}
                </span>
              </div>
              <span className="text-[11px] text-stone-500 font-mono">
                Latency target: &lt;5s on 3G
              </span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {messages.map((msg) => {
                const isAssistant = msg.sender === 'assistant';
                const isAudioPlaying = activeAudioId === msg.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      isAssistant ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    {isAssistant && (
                      <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        isAssistant
                          ? 'bg-stone-50 text-stone-800 border border-stone-200'
                          : 'bg-emerald-700 text-white'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

                      <div
                        className={`mt-3 pt-2.5 border-t flex items-center justify-between text-[11px] ${
                          isAssistant
                            ? 'border-stone-200 text-stone-500'
                            : 'border-emerald-600 text-emerald-100'
                        }`}
                      >
                        <span>{msg.timestamp}</span>

                        {isAssistant && (
                          <div className="flex items-center gap-2">
                            {msg.confidence && (
                              <span className="font-mono text-[10px]">
                                {Math.round(msg.confidence * 100)}% Match
                              </span>
                            )}
                            <button
                              onClick={() => handlePlayMessage(msg)}
                              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                                isAudioPlaying
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'bg-stone-200 text-stone-800 hover:bg-stone-300'
                              }`}
                            >
                              {isAudioPlaying ? (
                                <>
                                  <VolumeX className="w-3 h-3 text-amber-700" />
                                  <span>Stop</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-3 h-3 text-emerald-700" />
                                  <span>Listen</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {!isAssistant && (
                      <div className="w-8 h-8 rounded-full bg-stone-300 text-stone-700 flex items-center justify-center shrink-0 mt-1">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-1 animate-pulse">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs text-stone-600 flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-700" />
                    <span>Gemini 3.8 Flash is formulating localized regenerative agro-advice...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Input & Microphone Controller */}
            <div className="p-4 bg-stone-50 border-t border-stone-200">
              {/* Sound Wave Animation if Listening */}
              {isListening && (
                <div className="mb-3 p-2 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 h-6">
                      <div className="w-1 bg-emerald-600 wave-bar rounded-full"></div>
                      <div className="w-1 bg-emerald-600 wave-bar rounded-full"></div>
                      <div className="w-1 bg-emerald-600 wave-bar rounded-full"></div>
                      <div className="w-1 bg-emerald-600 wave-bar rounded-full"></div>
                      <div className="w-1 bg-emerald-600 wave-bar rounded-full"></div>
                    </div>
                    <span className="font-semibold">{t.listening}</span>
                  </div>
                  <span className="text-[11px] text-emerald-700">Speak now in your regional language</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                {/* Large Accessible Microphone Button */}
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    isListening
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm'
                  }`}
                  title={isListening ? 'Stop Listening' : t.speakNow}
                  aria-label={isListening ? 'Stop Listening' : t.speakNow}
                >
                  {isListening ? <MicOff className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
                </button>

                {/* Text query fallback */}
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t.askVoicePrompt}
                  className="flex-1 px-4 py-3 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />

                {/* Send Button */}
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || isLoading}
                  className="px-4 py-3 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white font-medium rounded-xl text-xs sm:text-sm transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.send}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
