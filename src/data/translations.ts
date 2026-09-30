import { LanguageCode } from '../types';

export interface TranslationDictionary {
  brand: string;
  tagline: string;
  bricsInitiative: string;
  heroHeadline: string;
  heroSubheadline: string;
  onboardCta: string;
  exploreAdvisory: string;
  voiceAssistant: string;
  diseaseChecker: string;
  smsGateway: string;
  bricsCoop: string;
  extensionDashboard: string;
  lowDataMode: string;
  normalMode: string;
  offlineMode: string;
  onlineMode: string;
  readAloud: string;
  stopAudio: string;
  confidence: string;
  regenerativeFocus: string;
  satelliteVigor: string;
  soilHealth: string;
  sevenDayPlan: string;
  symptomsLabel: string;
  uploadPhoto: string;
  diagnoseNow: string;
  askVoicePrompt: string;
  speakNow: string;
  listening: string;
  typeQuestion: string;
  send: string;
  smsDemoTitle: string;
  smsDemoSubtitle: string;
  twoWaySmsHelp: string;
  riskHeatmap: string;
  federatedModels: string;
  openStandards: string;
}

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    brand: 'KisanNet',
    tagline: 'BRICS AgriN Digital Agriculture Network',
    bricsInitiative: 'A Digital Public Good for Climate-Resilient Agriculture',
    heroHeadline: 'AI-Powered Digital Agriculture for Every Smallholder Farmer',
    heroSubheadline: 'Plot-level agro-advisories powered by Sentinel-2 satellites, Soil Health Cards, and weather intelligence. Reaching farmers through regional voice, SMS, and regenerative farming AI across BRICS nations.',
    onboardCta: 'Register Plot (Under 2 Min)',
    exploreAdvisory: 'View Live Advisory Demo',
    voiceAssistant: 'Voice Sahayak',
    diseaseChecker: 'Crop Disease AI',
    smsGateway: 'SMS & Feature Phone Gateway',
    bricsCoop: 'BRICS Model Hub',
    extensionDashboard: 'Extension Officer Portal',
    lowDataMode: '2G Low-Data Mode',
    normalMode: 'Satellite Full View',
    offlineMode: 'Offline Cache Active',
    onlineMode: 'Live Satellite Sync',
    readAloud: 'Listen Advisory',
    stopAudio: 'Stop Audio',
    confidence: 'Confidence Score',
    regenerativeFocus: 'Regenerative Agriculture Practices',
    satelliteVigor: 'Satellite NDVI & Moisture',
    soilHealth: 'Soil Health Card Triangulation',
    sevenDayPlan: '7-Day Agronomic Action Calendar',
    symptomsLabel: 'Describe or Pick Crop Symptoms',
    uploadPhoto: 'Upload or Capture Leaf Photo',
    diagnoseNow: 'Diagnose Disease & Treatment',
    askVoicePrompt: 'Ask a farming question in your mother tongue...',
    speakNow: 'Tap to Speak',
    listening: 'Listening to your voice...',
    typeQuestion: 'Or type your question here...',
    send: 'Send Query',
    smsDemoTitle: 'Zero-Internet SMS & Feature Phone Delivery',
    smsDemoSubtitle: '95% alerts delivered under 5 minutes. Works on any basic phone without data connection.',
    twoWaySmsHelp: 'Reply 1 (Weather), 2 (Bio-inputs), 3 (Mandi Prices), 4 (Voice Callback)',
    riskHeatmap: 'Regional Agricultural Risk Heatmap',
    federatedModels: 'Shared BRICS Model Registry & Federated Learning',
    openStandards: 'Open APIs & Data Residency Protocols',
  },
  hi: {
    brand: 'किसाननेट (KisanNet)',
    tagline: 'ब्रिक्स एग्रीएन डिजिटल कृषि नेटवर्क',
    bricsInitiative: 'जलवायु-अनुकूल खेती के लिए डिजिटल सार्वजनिक मंच',
    heroHeadline: 'हर छोटे और सीमांत किसान के लिए एआई-संचालित डिजिटल कृषि',
    heroSubheadline: 'सेंटिनल-2 उपग्रह, सॉइल हेल्थ कार्ड और मौसम पूर्वानुमान पर आधारित सटीक खेत-स्तरीय सलाह। क्षेत्रीय आवाज, एसएमएस और प्राकृतिक पुनर्योजी खेती मार्गदर्शन।',
    onboardCta: 'खेत पंजीकृत करें (2 मिनट में)',
    exploreAdvisory: 'लाइव कृषि सलाह देखें',
    voiceAssistant: 'आवाज सहायक (Voice Sahayak)',
    diseaseChecker: 'फसल रोग जांच व निदान',
    smsGateway: 'एसएमएस व साधारण फोन सेवा',
    bricsCoop: 'ब्रिक्स मॉडल केंद्र',
    extensionDashboard: 'कृषि अधिकारी डैशबोर्ड',
    lowDataMode: 'कम-डेटा (2G) मोड',
    normalMode: 'उपग्रह दृश्य',
    offlineMode: 'ऑफ़लाइन संचित सलाह',
    onlineMode: 'सक्रिय उपग्रह संपर्क',
    readAloud: 'सलाह सुनें',
    stopAudio: 'आवाज बंद करें',
    confidence: 'विश्वसनीयता स्तर',
    regenerativeFocus: 'पुनर्योजी व जैविक कृषि पद्धतियाँ',
    satelliteVigor: 'उपग्रह एनडीवीआई व नमी सूचकांक',
    soilHealth: 'मृदा स्वास्थ्य कार्ड मिलान',
    sevenDayPlan: '7-दिवसीय कृषि कार्य कैलेंडर',
    symptomsLabel: 'पत्ती के लक्षण चुनें या लिखें',
    uploadPhoto: 'पत्ती की फोटो अपलोड करें',
    diagnoseNow: 'रोग की जांच व उपचार देखें',
    askVoicePrompt: 'अपनी भाषा में कोई भी कृषि प्रश्न पूछें...',
    speakNow: 'बोलने के लिए दबाएं',
    listening: 'आपकी आवाज सुनी जा रही है...',
    typeQuestion: 'या अपना प्रश्न यहां लिखें...',
    send: 'पूछें',
    smsDemoTitle: 'बिना इंटरनेट एसएमएस व साधारण फोन सेवा',
    smsDemoSubtitle: '95% चेतावनियां 5 मिनट में साधारण मोबाइल पर पहुंचती हैं।',
    twoWaySmsHelp: 'जवाब दें: 1 (मौसम), 2 (जैविक नुस्खा), 3 (मंडी भाव), 4 (कॉल सहायता)',
    riskHeatmap: 'क्षेत्रीय कृषि जोखिम मानचित्र',
    federatedModels: 'साझा ब्रिक्स मॉडल व गोपनीयता-युक्त फेडरेटेड लर्निंग',
    openStandards: 'ओपन एपीआई व डेटा संप्रभुता मानक',
  },
  or: {
    brand: 'କିସାନନେଟ୍ (KisanNet)',
    tagline: 'ବ୍ରିକ୍ସ ଏଗ୍ରିଏନ୍ ଡିଜିଟାଲ୍ କୃଷି ନେଟୱର୍କ',
    bricsInitiative: 'ଜଳବାୟୁ ସହନଶୀଳ କୃଷି ପାଇଁ ଡିଜିଟାଲ୍ ସାର୍ବଜନୀନ ବ୍ୟବସ୍ଥା',
    heroHeadline: 'ପ୍ରତ୍ୟେକ କ୍ଷୁଦ୍ର ଓ ନାମମାତ୍ର ଚାଷୀଙ୍କ ପାଇଁ ଏଆଇ-ଚାଳିତ ଡିଜିଟାଲ୍ କୃଷି',
    heroSubheadline: 'ସେଣ୍ଟିନେଲ-୨ ଉପଗ୍ରହ, ମାଟି ସ୍ୱାସ୍ଥ୍ୟ କାର୍ଡ ଏବଂ ପାଣିପାଗ ପୂର୍ବାନୁମାନ ଆଧାରିତ ପ୍ଲଟ୍-ସ୍ତରୀୟ ପରାମର୍ଶ। ଓଡ଼ିଆ ଭଏସ୍ ସହାୟକ ଏବଂ ଏସଏମଏସ ଜରିଆରେ ଉପଲବ୍ଧ।',
    onboardCta: 'ଜମି ପଞ୍ଜୀକରଣ କରନ୍ତୁ (୨ ମିନିଟ୍)',
    exploreAdvisory: 'ଦୈନିକ ପରାମର୍ଶ ଦେଖନ୍ତୁ',
    voiceAssistant: 'ଓଡ଼ିଆ ଭଏସ୍ ସହାୟକ',
    diseaseChecker: 'ଫସଲ ରୋଗ ପରୀକ୍ଷା ଓ ପ୍ରତିକାର',
    smsGateway: 'ଏସଏମଏସ ଓ ସାଧାରଣ ଫୋନ୍ ସେବା',
    bricsCoop: 'ବ୍ରିକ୍ସ ମଡେଲ୍ ହବ୍',
    extensionDashboard: 'କୃଷି ଅଧିକାରୀ ଡ୍ୟାସବୋର୍ଡ',
    lowDataMode: '୨ଜି କମ୍-ଡାଟା ମୋଡ୍',
    normalMode: 'ସାଟେଲାଇଟ୍ ଭ୍ୟୁ',
    offlineMode: 'ଅଫଲାଇନ୍ ସଞ୍ଚିତ ତଥ୍ୟ',
    onlineMode: 'ଲାଇଭ୍ ସଂଯୋଗ',
    readAloud: 'ପରାମର୍ଶ ଶୁଣନ୍ତୁ',
    stopAudio: 'ଅଡିଓ ବନ୍ଦ କରନ୍ତୁ',
    confidence: 'ବିଶ୍ୱାସନୀୟତା ସୂଚକାଙ୍କ',
    regenerativeFocus: 'ପ୍ରାକୃତିକ ପୁନର୍ଜୀବନୀ କୃଷି ପଦ୍ଧତି',
    satelliteVigor: 'ଉପଗ୍ରହ ଏନଡିଭିଆଇ ଓ ଆର୍ଦ୍ରତା',
    soilHealth: 'ମୃତ୍ତିକା ସ୍ୱାସ୍ଥ୍ୟ କାର୍ଡ ଯାଞ୍ଚ',
    sevenDayPlan: '୭-ଦିନିଆ କୃଷି କାର୍ଯ୍ୟସୂଚୀ',
    symptomsLabel: 'ପତ୍ରର ଲକ୍ଷଣ ଚୟନ କରନ୍ତୁ ବା ଲେଖନ୍ତୁ',
    uploadPhoto: 'ପତ୍ରର ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ',
    diagnoseNow: 'ରୋଗ ନିର୍ଣ୍ଣୟ ଓ ଚିକିତ୍ସା ଦେଖନ୍ତୁ',
    askVoicePrompt: 'ଆପଣଙ୍କ ଭାଷାରେ ଯେକୌଣସି କୃଷି ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ...',
    speakNow: 'କହିବା ପାଇଁ ଦବାନ୍ତୁ',
    listening: 'ଆପଣଙ୍କ କଥା ଶୁଣାଯାଉଛି...',
    typeQuestion: 'କିମ୍ବା ଏଠାରେ ପ୍ରଶ୍ନ ଲେଖନ୍ତୁ...',
    send: 'ପଠାନ୍ତୁ',
    smsDemoTitle: 'ବିନା ଇଣ୍ଟରନେଟ୍ ଏସଏମଏସ ସେବା',
    smsDemoSubtitle: '୯୫% ସତର୍କତା ୫ ମିନିଟ୍ ମଧ୍ୟରେ ସାଧାରଣ ବଟନ୍ ଫୋନରେ ପହଞ୍ଚିଥାଏ।',
    twoWaySmsHelp: 'ଉତ୍ତର ଦିଅନ୍ତୁ: ୧ (ପାଣିପାଗ), ୨ (ଜୈବିକ ଔଷଧ), ୩ (ମଣ୍ଡି ଦର), ୪ (ଭଏସ୍ କଲ୍)',
    riskHeatmap: 'ଆଞ୍ଚଳିକ କୃଷି ବିପଦ ମାନଚିତ୍ର',
    federatedModels: 'ବ୍ରିକ୍ସ ସହଭାଗୀ ଏଆଇ ମଡେଲ୍',
    openStandards: 'ମୁକ୍ତ ତଥ୍ୟ ମାନକ ଓ ନିରାପତ୍ତା',
  },
  ta: {
    brand: 'கிசான்நெட் (KisanNet)',
    tagline: 'பிரிக்ஸ் அக்ரிஎன் டிஜிட்டல் விவசாய நெட்வொர்க்',
    bricsInitiative: 'காலநிலை தாங்கும் விவசாயத்திற்கான டிஜிட்டல் பொது தளம்',
    heroHeadline: 'ஒவ்வொரு சிறு விவசாயிக்குமான செயற்கை நுண்ணறிவு விவசாய நெட்வொர்க்',
    heroSubheadline: 'சென்டினல்-2 செயற்கைக்கோள், மண் நல அட்டை மற்றும் வானிலை முன்னறிவிப்பு அடிப்படையிலான பண்ணை ஆலோசனைகள். தமிழ் குரல் வழி மற்றும் SMS மூலம் எளிய அணுகல்.',
    onboardCta: 'நிலத்தை பதிவு செய்க (2 நிமிடங்களில்)',
    exploreAdvisory: 'பண்ணை ஆலோசனையைக் காண்க',
    voiceAssistant: 'குரல் வழிகாட்டி (Voice Sahayak)',
    diseaseChecker: 'பயிர் நோய் கண்டறிதல் & தீர்வு',
    smsGateway: 'SMS மற்றும் சாதாரண போன் சேவை',
    bricsCoop: 'பிரிக்ஸ் கூட்டு மையம்',
    extensionDashboard: 'வேளாண் அலுவலர் தளம்',
    lowDataMode: 'குறைந்த டேட்டா (2G) முறை',
    normalMode: 'செயற்கைக்கோள் காட்சி',
    offlineMode: 'ஆஃப்லைன் சேமிப்பு',
    onlineMode: 'நேரலை இணைப்பு',
    readAloud: 'ஆலோசனையைக் கேள்',
    stopAudio: 'நிறுத்து',
    confidence: 'நம்பகத்தன்மை அளவு',
    regenerativeFocus: 'இயற்கை மீளுருவாக்க விவசாய முறைகள்',
    satelliteVigor: 'செயற்கைக்கோள் NDVI & ஈரப்பதம்',
    soilHealth: 'மண் பரிசோதனை அட்டை ஒப்பீடு',
    sevenDayPlan: '7-நாள் விவசாய செயல் திட்டம்',
    symptomsLabel: 'இலை அறிகுறிகளைத் தேர்ந்தெடுக்கவும்',
    uploadPhoto: 'இலை புகைப்படத்தை பதிவேற்றவும்',
    diagnoseNow: 'நோய் கண்டறிந்து தீர்வு பெறுக',
    askVoicePrompt: 'உங்கள் தாய்மொழியில் விவசாய கேள்விகளைக் கேளுங்கள்...',
    speakNow: 'பேச அழுத்தவும்',
    listening: 'உங்கள் குரல் கேட்கப்படுகிறது...',
    typeQuestion: 'அல்லது உங்கள் கேள்வியை தட்டச்சு செய்யவும்...',
    send: 'அனுப்புக',
    smsDemoTitle: 'இணையமற்ற SMS மற்றும் எளிய போன் சேவை',
    smsDemoSubtitle: '95% எச்சரிக்கைகள் 5 நிமிடங்களுக்குள் எந்தவொரு எளிய போனிலும் சென்றடைகிறது.',
    twoWaySmsHelp: 'பதிலளிக்கவும்: 1 (வானிலை), 2 (இயற்கை பூச்சி மருந்து), 3 (சந்தை விலை), 4 (அழைப்பு உதவி)',
    riskHeatmap: 'மண்டல விவசாய அபாய வரைபடம்',
    federatedModels: 'பிரிக்ஸ் கூட்டு மாதிரி பதிவகம்',
    openStandards: 'திறந்த API மற்றும் தரவு பாதுகாப்பு',
  },
};
