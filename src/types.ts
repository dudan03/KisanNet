export type LanguageCode = 'en' | 'hi' | 'or' | 'ta';

export interface SoilData {
  pH: number;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  organicCarbon: string;
}

export interface SatelliteIndices {
  ndvi: number;
  ndwiMoisture: number;
  canopyCover: string;
}

export interface WeatherData {
  tempMax: number;
  tempMin: number;
  forecast: string;
  humidity: number;
  windSpeed: number;
}

export interface DailyWeatherForecast {
  date: string;
  dayName: string;
  condition: string;
  conditionIcon: 'sun' | 'cloud-sun' | 'cloud-rain' | 'cloud-lightning' | 'cloud';
  tempMax: number;
  tempMin: number;
  precipitationMm: number;
  rainProbability: number;
  humidity: number;
  windSpeedKmH: number;
  sprayWindow: 'Ideal' | 'Caution' | 'Unsuitable';
  irrigationStatus: 'Pause (Rain Expected)' | 'Normal AWD Cycle' | 'Light Irrigation Recommended' | 'Conserve Moisture (Heat Alert)';
  farmingContext: string;
}


export interface FarmerProfile {
  name: string;
  phone: string;
  language: LanguageCode;
  location: string;
  crop: string;
  plotSize: string;
  sowingDate: string;
  stage: string;
  soilData: SoilData;
}

export interface RegenerativeAction {
  title: string;
  type: string;
  impact: string;
  details: string;
}

export interface DayAction {
  day: string;
  weather: string;
  action: string;
}

export interface AdvisoryData {
  advisoryId: string;
  generatedAt: string;
  farmerName: string;
  plotLocation: string;
  crop: string;
  stage: string;
  confidenceScore: string;
  primaryActionToday: {
    title: string;
    urgency: string;
    explanation: string;
    icon?: string;
  };
  regenerativeActions: RegenerativeAction[];
  sevenDayCalendar: DayAction[];
  satelliteInsights: {
    ndviStatus: string;
    moistureIndex: string;
    soilHealthSummary: string;
  };
}

export interface DiseaseDiagnosisResult {
  diseaseName: string;
  scientificName: string;
  confidence: number;
  severity: 'Low' | 'Moderate' | 'High' | 'Severe';
  symptomsIdentified: string[];
  regenerativeTreatment: string;
  chemicalTreatment: string;
  preventionSteps: string[];
  source: string;
  cropAnalyzed?: string;
  method?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  audioBase64?: string;
  timestamp: string;
  language: LanguageCode;
  confidence?: number;
  source?: string;
}

export interface SmsMessage {
  id: string;
  sender: 'network' | 'farmer';
  text: string;
  time: string;
  type?: 'rain' | 'pest' | 'market' | 'general' | 'heat';
}

export interface BricsNode {
  country: string;
  institution: string;
  nodeId: string;
  status: string;
  sharedModel: string;
  accuracyScore: string;
  activeFarmers: string;
  dataResidency: string;
  flag: string;
}

export interface ExtensionCluster {
  id: string;
  block: string;
  villageCount: number;
  farmers: number;
  primaryCrop: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
  alertReason: string;
  soilHealthIndex: string;
  ndwiMoisture: string;
  smsDeliveryRate: string;
}

export interface ApplicationPreset {
  id: string;
  name: string;
  role: 'Smallholder Farmer' | 'Extension Worker / FPO' | 'Agri-Officer & Researcher' | 'National Node Admin';
  flag: string;
  country: string;
  location: string;
  crop: string;
  language: LanguageCode;
  description: string;
  scenarioHighlight: string;
  primaryAction: string;
  lowDataMode?: boolean;
  targetView?: 'advisory' | 'disease' | 'voice' | 'sms' | 'extension' | 'brics';
  profile: FarmerProfile;
  advisory: AdvisoryData;
  initialSms?: string;
  voiceGreeting?: string;
}

