import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Sparkles, Droplets, Zap, TrendingUp, Download, Wifi, WifiOff, Languages, Circle, MapPin, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SoilAnalysisPortal: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isOffline, setIsOffline] = useState(false);
  const [lastAnalysisTime, setLastAnalysisTime] = useState(new Date());
  const [showInputSection, setShowInputSection] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [manualPh, setManualPh] = useState('');
  const [soilMoisture, setSoilMoisture] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const { toast } = useToast();

  // Language translations
  const translations = {
    en: {
      title: "AI-Powered Soil Analysis",
      subtitle: "Revolutionary circular waveform visualization with real-time reactive particles showing nutrient levels and soil composition analysis.",
      soilHealth: "Overall Soil Health",
      scanSoil: "Scan Soil",
      analyzing: "Analyzing...",
      nutrientLevels: "Nutrient Levels",
      recommendations: "AI Recommendations",
      nitrogen: "Nitrogen",
      phosphorus: "Phosphorus", 
      potassium: "Potassium",
      phLevel: "pH Level",
      optimal: "Optimal",
      low: "Low",
      high: "High",
      neutral: "Neutral",
      soilCondition: "Soil condition is GOOD for Rice 🌾 and Wheat 🌿",
      phosphorusRecommendation: "Phosphorus boost needed: Apply bone meal or rock phosphate",
      cropRecommendation: "Optimal for: Wheat, corn, and legume crops",
      irrigationRecommendation: "Reduce watering by 15% for better yields",
      saveReport: "Save Report",
      offlineMode: "Offline Mode - Last Analysis Shown",
      exportSuccess: "Soil analysis report exported successfully!",
      // User Input Section
      userInputs: "User Inputs",
      locationSelection: "Location Selection",
      selectLocation: "Select your region/village",
      autoDetectLocation: "📍 Auto-detect Location (GPS)",
      manualInputs: "Manual Inputs (Optional)",
      soilPhLabel: "Soil pH Level",
      soilPhPlaceholder: "Enter pH (e.g., 6.8)",
      soilMoistureLabel: "Soil Moisture Level",
      moistureLow: "Low",
      moistureMedium: "Medium",
      moistureHigh: "High",
      analyzeSoilButton: "📊 Analyze Soil",
      fetchingData: "Fetching soil data...",
      analysisComplete: "Analysis complete!",
      enterLocationFirst: "Please select your location first"
    },
    hi: {
      title: "AI-संचालित मिट्टी विश्लेषण",
      subtitle: "पोषक तत्वों के स्तर और मिट्टी की संरचना का विश्लेषण दिखाने वाले वास्तविक समय के कणों के साथ क्रांतिकारी गोलाकार तरंग दृश्य।",
      soilHealth: "कुल मिट्टी स्वास्थ्य",
      scanSoil: "मिट्टी स्कैन करें",
      analyzing: "विश्लेषण कर रहे हैं...",
      nutrientLevels: "पोषक तत्व का स्तर",
      recommendations: "AI सुझाव",
      nitrogen: "नाइट्रोजन",
      phosphorus: "फास्फोरस",
      potassium: "पोटेशियम",
      phLevel: "pH स्तर",
      optimal: "इष्टतम",
      low: "कम",
      high: "अधिक",
      neutral: "तटस्थ",
      soilCondition: "मिट्टी की स्थिति चावल 🌾 और गेहूं 🌿 के लिए अच्छी है",
      phosphorusRecommendation: "फास्फोरस बूस्ट की आवश्यकता: हड्डी का भोजन या रॉक फॉस्फेट लगाएं",
      cropRecommendation: "इसके लिए इष्टतम: गेहूं, मक्का और फली की फसलें",
      irrigationRecommendation: "बेहतर उपज के लिए पानी देना 15% कम करें",
      saveReport: "रिपोर्ट सहेजें",
      offlineMode: "ऑफ़लाइन मोड - अंतिम विश्लेषण दिखाया गया",
      exportSuccess: "मिट्टी विश्लेषण रिपोर्ट सफलतापूर्वक निर्यात की गई!",
      // User Input Section
      userInputs: "उपयोगकर्ता इनपुट",
      locationSelection: "स्थान चयन",
      selectLocation: "अपना क्षेत्र/गांव चुनें",
      autoDetectLocation: "📍 स्थान स्वतः खोजें (GPS)",
      manualInputs: "मैन्युअल इनपुट (वैकल्पिक)",
      soilPhLabel: "मिट्टी pH स्तर",
      soilPhPlaceholder: "pH दर्ज करें (जैसे, 6.8)",
      soilMoistureLabel: "मिट्टी की नमी का स्तर",
      moistureLow: "कम",
      moistureMedium: "मध्यम",
      moistureHigh: "अधिक",
      analyzeSoilButton: "📊 मिट्टी का विश्लेषण करें",
      fetchingData: "मिट्टी की जानकारी प्राप्त कर रहे हैं...",
      analysisComplete: "विश्लेषण पूर्ण!",
      enterLocationFirst: "कृपया पहले अपना स्थान चुनें"
    },
    te: {
      title: "AI-చోదిత నేల విశ్లేషణ",
      subtitle: "పోషక స్థాయిలు మరియు నేల కూర్పు విశ్లేషణను చూపించే రియల్ టైమ్ రియాక్టివ్ కణాలతో విప్లవకారీ వృత్తాకార తరంగ రూపం దృశ్యీకరణ.",
      soilHealth: "మొత్తం నేల ఆరోగ్యం",
      scanSoil: "నేల స్కాన్ చేయండి",
      analyzing: "విశ్లేషిస్తోంది...",
      nutrientLevels: "పోషక స్థాయిలు",
      recommendations: "AI సిఫార్సులు",
      nitrogen: "నైట్రోజన్",
      phosphorus: "ఫాస్ఫరస్",
      potassium: "పొటాషియం",
      phLevel: "pH స్థాయి",
      optimal: "అనుకూలమైన",
      low: "తక్కువ",
      high: "అధిక",
      neutral: "తటస్థ",
      soilCondition: "నేల పరిస్థితి వరి 🌾 మరియు గోధుమలకు 🌿 మంచిది",
      phosphorusRecommendation: "ఫాస్ఫరస్ బూస్ట్ అవసరం: ఎముక భోజనం లేదా రాక్ ఫాస్ఫేట్ వర్తించండి",
      cropRecommendation: "దీనికి అనుకూలమైనది: గోధుమలు, మొక్కజొన్న మరియు పప్పుధాన్యాలు",
      irrigationRecommendation: "మెరుగైన దిగుబడి కోసం నీటిపారుదల 15% తగ్గించండి",
      saveReport: "నివేదిక సేవ్ చేయండి",
      offlineMode: "ఆఫ్‌లైన్ మోడ్ - చివరి విశ్లేషణ చూపబడింది",
      exportSuccess: "నేల విశ్లేషణ నివేదిక విజయవంతంగా ఎగుమతి చేయబడింది!",
      // User Input Section
      userInputs: "వినియోగదారు ఇన్‌పుట్‌లు",
      locationSelection: "స్థాన ఎంపిక",
      selectLocation: "మీ ప్రాంతం/గ్రామం ఎంచుకోండి",
      autoDetectLocation: "📍 స్థానం స్వయంచాలకంగా గుర్తించండి (GPS)",
      manualInputs: "మాన్యువల్ ఇన్‌పుట్‌లు (ఐచ్ఛికం)",
      soilPhLabel: "నేల pH స్థాయి",
      soilPhPlaceholder: "pH నమోదు చేయండి (ఉదా., 6.8)",
      soilMoistureLabel: "నేల తేమ స్థాయి",
      moistureLow: "తక్కువ",
      moistureMedium: "మధ్యస్థ",
      moistureHigh: "అధిక",
      analyzeSoilButton: "📊 నేల విశ్లేషణ చేయండి",
      fetchingData: "నేల డేటా పొందుతోంది...",
      analysisComplete: "విశ్లేషణ పూర్తయింది!",
      enterLocationFirst: "దయచేసి మొదట మీ స్థానాన్ని ఎంచుకోండి"
    }
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' }
  ];

  const getCurrentTranslation = () => translations[selectedLanguage as keyof typeof translations] || translations.en;

  // Location data for Indian regions
  const locationOptions = [
    { value: 'punjab-ludhiana', label: 'Punjab - Ludhiana', coords: [30.9010, 75.8573] },
    { value: 'haryana-karnal', label: 'Haryana - Karnal', coords: [29.6857, 76.9905] },
    { value: 'up-meerut', label: 'Uttar Pradesh - Meerut', coords: [28.9845, 77.7064] },
    { value: 'maharashtra-pune', label: 'Maharashtra - Pune', coords: [18.5204, 73.8567] },
    { value: 'karnataka-bangalore', label: 'Karnataka - Bangalore', coords: [12.9716, 77.5946] },
    { value: 'telangana-hyderabad', label: 'Telangana - Hyderabad', coords: [17.3850, 78.4867] },
    { value: 'tamilnadu-coimbatore', label: 'Tamil Nadu - Coimbatore', coords: [11.0168, 76.9558] },
    { value: 'gujarat-ahmedabad', label: 'Gujarat - Ahmedabad', coords: [23.0225, 72.5714] }
  ];

  // Simulate API data fetch
  const simulateApiDataFetch = async (location: string) => {
    const locationData = {
      'punjab-ludhiana': { ph: 7.2, nitrogen: 85, phosphorus: 68, potassium: 92, moisture: 'medium' },
      'haryana-karnal': { ph: 7.5, nitrogen: 82, phosphorus: 72, potassium: 88, moisture: 'medium' },
      'up-meerut': { ph: 6.8, nitrogen: 75, phosphorus: 60, potassium: 80, moisture: 'low' },
      'maharashtra-pune': { ph: 6.5, nitrogen: 78, phosphorus: 65, potassium: 85, moisture: 'medium' },
      'karnataka-bangalore': { ph: 6.9, nitrogen: 80, phosphorus: 70, potassium: 82, moisture: 'high' },
      'telangana-hyderabad': { ph: 7.0, nitrogen: 77, phosphorus: 63, potassium: 87, moisture: 'medium' },
      'tamilnadu-coimbatore': { ph: 6.7, nitrogen: 83, phosphorus: 69, potassium: 90, moisture: 'high' },
      'gujarat-ahmedabad': { ph: 7.8, nitrogen: 70, phosphorus: 55, potassium: 75, moisture: 'low' }
    };
    
    return locationData[location as keyof typeof locationData] || locationData['up-meerut'];
  };

  // Auto-detect location using GPS
  const autoDetectLocation = () => {
    const t = getCurrentTranslation();
    
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulate finding closest location based on coordinates
          const { latitude, longitude } = position.coords;
          
          // Simple distance calculation to find nearest location
          let closestLocation = locationOptions[0];
          let minDistance = Infinity;
          
          locationOptions.forEach(location => {
            const [lat, lng] = location.coords;
            const distance = Math.sqrt(
              Math.pow(lat - latitude, 2) + Math.pow(lng - longitude, 2)
            );
            if (distance < minDistance) {
              minDistance = distance;
              closestLocation = location;
            }
          });
          
          setSelectedLocation(closestLocation.value);
          setIsLoading(false);
          
          toast({
            title: "Location Detected!",
            description: `Found: ${closestLocation.label}`,
          });
        },
        (error) => {
          setIsLoading(false);
          toast({
            title: "Location Error",
            description: "Could not detect location. Please select manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "GPS Not Available",
        description: "Please select your location manually.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Check network status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    setIsOffline(!navigator.onLine);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const soilLayers = [
    { name: 'Topsoil', depth: '0-15cm', health: 85, nutrients: ['N', 'P', 'K'], color: 'bg-gradient-to-r from-amber-800 to-amber-600' },
    { name: 'Subsoil', depth: '15-60cm', health: 72, nutrients: ['Ca', 'Mg'], color: 'bg-gradient-to-r from-orange-900 to-orange-700' },
    { name: 'Substratum', depth: '60cm+', health: 68, nutrients: ['Fe', 'Mn'], color: 'bg-gradient-to-r from-red-900 to-red-800' }
  ];

  const nutrientData = [
    { name: 'Nitrogen', level: 78, status: 'optimal', icon: '🌱', color: 'text-success' },
    { name: 'Phosphorus', level: 65, status: 'low', icon: '⚡', color: 'text-warning' },
    { name: 'Potassium', level: 82, status: 'high', icon: '💪', color: 'text-primary' },
    { name: 'pH Level', level: 6.8, status: 'neutral', icon: '⚖️', color: 'text-accent' }
  ];

  // Calculate overall soil health
  const calculateOverallHealth = () => {
    const layerAverage = soilLayers.reduce((acc, layer) => acc + layer.health, 0) / soilLayers.length;
    const nutrientAverage = nutrientData.slice(0, 3).reduce((acc, nutrient) => acc + nutrient.level, 0) / 3;
    return Math.round((layerAverage + nutrientAverage) / 2);
  };

  const overallHealth = calculateOverallHealth();

  const getHealthStatus = (health: number) => {
    if (health >= 80) return { status: 'excellent', color: 'text-success', bgColor: 'bg-success' };
    if (health >= 60) return { status: 'good', color: 'text-primary', bgColor: 'bg-primary' };
    if (health >= 40) return { status: 'fair', color: 'text-warning', bgColor: 'bg-warning' };
    return { status: 'poor', color: 'text-destructive', bgColor: 'bg-destructive' };
  };

  const healthStatus = getHealthStatus(overallHealth);

  const startAnalysis = async () => {
    const t = getCurrentTranslation();
    
    if (!selectedLocation && !showInputSection) {
      toast({
        title: "Location Required",
        description: t.enterLocationFirst,
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    setIsLoading(true);
    setLastAnalysisTime(new Date());
    
    try {
      let soilData;
      
      // Use manual inputs if provided, otherwise fetch from API
      if (manualPh && soilMoisture) {
        soilData = {
          ph: parseFloat(manualPh) || 6.8,
          nitrogen: Math.random() * 30 + 70, // Random between 70-100
          phosphorus: Math.random() * 30 + 60, // Random between 60-90
          potassium: Math.random() * 25 + 75, // Random between 75-100
          moisture: soilMoisture
        };
      } else if (selectedLocation) {
        // Simulate API fetch delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        soilData = await simulateApiDataFetch(selectedLocation);
      } else {
        throw new Error('No location or manual data provided');
      }
      
      // Update the nutrient data with fetched/calculated values
      updateNutrientData(soilData);
      
      setHasAnalyzed(true);
      setShowInputSection(false);
      
      toast({
        title: t.analysisComplete,
        description: "Soil data updated successfully!",
      });
      
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Could not analyze soil. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
      setIsLoading(false);
    }
  };

  interface SoilData {
    ph: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    moisture: string;
  }

  const updateNutrientData = (data: SoilData) => {
    // This would normally update the nutrient data state
    // For now, we'll show the data was processed
    console.log('Updated soil data:', data);
  };

  const exportReport = () => {
    const t = getCurrentTranslation();
    const reportData = {
      timestamp: new Date().toLocaleString(),
      overallHealth: overallHealth,
      soilLayers: soilLayers,
      nutrients: nutrientData,
      recommendations: [
        t.phosphorusRecommendation,
        t.cropRecommendation,
        t.irrigationRecommendation
      ],
      language: selectedLanguage
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `soil-analysis-report-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Report Exported!",
      description: t.exportSuccess,
    });
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Language Selector and Offline Indicator */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-40 bg-card-glass backdrop-blur-xl border-primary/30">
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Offline Indicator */}
          {isOffline && (
            <div className="flex items-center gap-2 bg-warning/10 backdrop-blur-xl rounded-full px-4 py-2 border border-warning/30">
              <WifiOff className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-warning">
                {getCurrentTranslation().offlineMode}
              </span>
            </div>
          )}
        </div>

        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 bg-card-glass backdrop-blur-xl rounded-full px-6 py-3 border border-primary/30 mb-6">
            <Sparkles className="w-5 h-5 text-primary animate-pulse-glow" />
            <span className="font-mono text-sm font-medium text-foreground">Soil Intelligence Portal</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            {getCurrentTranslation().title.split(' ').slice(0, 1).join(' ')}
            <span className="electric-gradient bg-clip-text text-transparent block sm:inline"> {getCurrentTranslation().title.split(' ').slice(1).join(' ')}</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {getCurrentTranslation().subtitle}
          </p>
        </div>

        {/* User Input Section */}
        {showInputSection && (
          <div className="mb-12">
            <Card className="brutalist-card">
              <CardContent className="p-6 sm:p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    {getCurrentTranslation().userInputs}
                  </h3>
                  <p className="text-muted-foreground">
                    Enter your location and soil details for analysis
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Location Selection */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        {getCurrentTranslation().locationSelection}
                      </h4>
                      
                      {/* Location Dropdown */}
                      <div className="space-y-4">
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                          <SelectTrigger className="w-full h-14 text-lg bg-card-glass backdrop-blur-xl border-primary/30">
                            <SelectValue placeholder={getCurrentTranslation().selectLocation} />
                          </SelectTrigger>
                          <SelectContent>
                            {locationOptions.map((location) => (
                              <SelectItem key={location.value} value={location.value}>
                                <div className="flex items-center gap-2 py-2">
                                  <MapPin className="w-4 h-4 text-primary" />
                                  <span>{location.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {/* GPS Auto-detect Button */}
                        <Button 
                          onClick={autoDetectLocation}
                          disabled={isLoading}
                          className="w-full h-12 btn-glass text-lg font-medium"
                        >
                          {isLoading ? (
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          ) : (
                            <MapPin className="w-5 h-5 mr-2" />
                          )}
                          {getCurrentTranslation().autoDetectLocation}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Manual Inputs */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-accent" />
                        {getCurrentTranslation().manualInputs}
                      </h4>
                      
                      <div className="space-y-4">
                        {/* pH Input */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            {getCurrentTranslation().soilPhLabel}
                          </label>
                          <Input
                            type="number"
                            step="0.1"
                            min="0"
                            max="14"
                            value={manualPh}
                            onChange={(e) => setManualPh(e.target.value)}
                            placeholder={getCurrentTranslation().soilPhPlaceholder}
                            className="h-12 text-lg bg-card-glass backdrop-blur-xl border-primary/30"
                          />
                        </div>
                        
                        {/* Moisture Level Buttons */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-3">
                            {getCurrentTranslation().soilMoistureLabel}
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { value: 'low', label: getCurrentTranslation().moistureLow, color: 'bg-warning/10 border-warning/30 text-warning' },
                              { value: 'medium', label: getCurrentTranslation().moistureMedium, color: 'bg-primary/10 border-primary/30 text-primary' },
                              { value: 'high', label: getCurrentTranslation().moistureHigh, color: 'bg-success/10 border-success/30 text-success' }
                            ].map((moisture) => (
                              <Button
                                key={moisture.value}
                                variant={soilMoisture === moisture.value ? 'default' : 'outline'}
                                onClick={() => setSoilMoisture(moisture.value)}
                                className={`h-12 text-sm font-medium transition-all duration-300 ${
                                  soilMoisture === moisture.value 
                                    ? 'bg-primary text-primary-foreground border-primary' 
                                    : moisture.color
                                }`}
                              >
                                {moisture.label}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analyze Button */}
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={startAnalysis}
                    disabled={isAnalyzing || isLoading || (!selectedLocation && (!manualPh || !soilMoisture))}
                    className="w-full sm:w-auto px-8 py-4 text-xl font-bold btn-holographic min-w-[250px]"
                    size="lg"
                  >
                    {isAnalyzing || isLoading ? (
                      <>
                        <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                        {getCurrentTranslation().fetchingData}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6 mr-3" />
                        {getCurrentTranslation().analyzeSoilButton}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Section Toggle */}
        {hasAnalyzed && (
          <div className="text-center mb-8">
            <Button 
              onClick={() => setShowInputSection(!showInputSection)}
              variant="outline"
              className="btn-glass"
            >
              {showInputSection ? 'Hide Inputs' : 'Show Inputs'}
            </Button>
          </div>
        )}

        {/* Overall Soil Health Summary */}
        <div className="mb-12">
          <Card className="brutalist-card">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Circular Health Progress */}
                <div className="relative flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    {/* Background Circle */}
                    <Circle className="w-32 h-32 text-muted/30 absolute" />
                    {/* Progress Circle */}
                    <svg className="w-32 h-32 transform -rotate-90 absolute" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className={`${healthStatus.color} transition-all duration-1000`}
                        strokeDasharray={`${(overallHealth * 251.32) / 100} 251.32`}
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Center Text */}
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className={`text-3xl font-bold ${healthStatus.color}`}>{overallHealth}%</span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Health</span>
                    </div>
                  </div>
                </div>
                
                {/* Health Status and Condition */}
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-4">
                    <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                      {getCurrentTranslation().soilHealth}
                    </h3>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${healthStatus.bgColor}/10 border border-current/20`}>
                      <span className={`w-2 h-2 rounded-full ${healthStatus.bgColor}`} />
                      <span className={`font-medium capitalize ${healthStatus.color}`}>
                        {healthStatus.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Soil Condition Recommendation */}
                  <div className="bg-success/10 rounded-lg p-4 border border-success/20">
                    <p className="text-success font-medium flex items-center gap-2">
                      <span className="text-xl">✅</span>
                      {getCurrentTranslation().soilCondition}
                    </p>
                  </div>
                  
                  {/* Low Nutrient Warning */}
                  <div className="bg-warning/10 rounded-lg p-4 border border-warning/20 mt-3">
                    <p className="text-warning font-medium flex items-center gap-2">
                      <span className="text-xl">⚠️</span>
                      {getCurrentTranslation().phosphorusRecommendation}
                    </p>
                  </div>
                </div>
                
                {/* Export Report Button */}
                <div className="flex flex-col gap-3">
                  <Button 
                    onClick={exportReport}
                    className="btn-glass flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    {getCurrentTranslation().saveReport}
                  </Button>
                  
                  {!isOffline && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Wifi className="w-3 h-3 text-success" />
                      <span>Live Data</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 mb-16">
          {/* Soil Visualization */}
          <div className="xl:col-span-2">
            <Card className="brutalist-card overflow-hidden">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-display font-bold text-foreground">
                    Soil Layer Analysis
                  </h3>
                  <Button 
                    onClick={startAnalysis}
                    className={`btn-holographic ${isAnalyzing ? 'animate-pulse-glow' : ''}`}
                    disabled={isAnalyzing}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    {isAnalyzing ? getCurrentTranslation().analyzing : getCurrentTranslation().scanSoil}
                  </Button>
                </div>

                {/* Circular Waveform Visualization */}
                <div className="relative flex items-center justify-center mb-8">
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                    {/* Pulse Rings */}
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute inset-0 border-2 border-primary/30 rounded-full 
                                   ${isAnalyzing ? 'animate-pulse-glow' : ''}`}
                        style={{
                          transform: `scale(${0.3 + (i * 0.2)})`,
                          animationDelay: `${i * 0.5}s`
                        }}
                      />
                    ))}
                    
                    {/* Central Soil Sample */}
                    <div className="absolute inset-1/2 w-16 h-16 sm:w-24 sm:h-24 -translate-x-1/2 -translate-y-1/2 
                                  rounded-full bg-gradient-to-br from-amber-600 to-orange-800 
                                  flex items-center justify-center animate-bounce-gentle">
                      <Droplets className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>

                    {/* Floating Nutrient Particles */}
                    {nutrientData.map((nutrient, i) => (
                      <div
                        key={i}
                        className={`absolute w-8 h-8 sm:w-12 sm:h-12 rounded-full glass-card flex items-center justify-center
                                   ${isAnalyzing ? 'animate-magnetic' : 'animate-float'}`}
                        style={{
                          top: `${25 + Math.sin((animationPhase + i) * Math.PI / 2) * 30}%`,
                          left: `${25 + Math.cos((animationPhase + i) * Math.PI / 2) * 30}%`,
                          animationDelay: `${i * 0.3}s`
                        }}
                      >
                        <span className="text-sm sm:text-lg">{nutrient.icon}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Soil Layers */}
                <div className="space-y-4">
                  {soilLayers.map((layer, index) => (
                    <div 
                      key={index} 
                      className="flex items-center p-4 glass-card hover-electric cursor-pointer"
                    >
                      <div className={`w-16 h-12 rounded-lg ${layer.color} mr-4 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-display font-bold text-foreground">{layer.name}</h4>
                          <span className="text-sm text-muted-foreground">{layer.depth}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full electric-gradient transition-all duration-1000"
                              style={{ width: `${layer.health}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground">{layer.health}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nutrient Analysis */}
          <div className="space-y-6">
            <Card className="brutalist-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-display font-bold text-foreground mb-6">
                  {getCurrentTranslation().nutrientLevels}
                </h3>
                
                <div className="space-y-4">
                  {nutrientData.map((nutrient, index) => {
                    const t = getCurrentTranslation();
                    const nutrientName = nutrient.name === 'Nitrogen' ? t.nitrogen :
                                       nutrient.name === 'Phosphorus' ? t.phosphorus :
                                       nutrient.name === 'Potassium' ? t.potassium :
                                       nutrient.name === 'pH Level' ? t.phLevel : nutrient.name;
                    
                    const statusText = nutrient.status === 'optimal' ? t.optimal :
                                     nutrient.status === 'low' ? t.low :
                                     nutrient.status === 'high' ? t.high :
                                     nutrient.status === 'neutral' ? t.neutral : nutrient.status;
                    
                    return (
                      <div key={index} className="glass-card p-4 hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
                              <span className="text-xl">{nutrient.icon}</span>
                            </div>
                            <div>
                              <span className="font-medium text-foreground block">{nutrientName}</span>
                              <span className="text-xs text-muted-foreground">{nutrient.name}</span>
                            </div>
                          </div>
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                            nutrient.status === 'optimal' ? 'bg-success/10 border border-success/20' :
                            nutrient.status === 'high' ? 'bg-primary/10 border border-primary/20' :
                            nutrient.status === 'low' ? 'bg-warning/10 border border-warning/20' :
                            'bg-accent/10 border border-accent/20'
                          }`}>
                            <span className={`w-2 h-2 rounded-full ${
                              nutrient.status === 'optimal' ? 'bg-success' :
                              nutrient.status === 'high' ? 'bg-primary' :
                              nutrient.status === 'low' ? 'bg-warning' : 'bg-accent'
                            }`} />
                            <span className={`text-xs font-bold ${nutrient.color}`}>
                              {statusText.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-1000 ${
                                nutrient.status === 'optimal' ? 'bg-success' :
                                nutrient.status === 'high' ? 'bg-primary' :
                                nutrient.status === 'low' ? 'bg-warning' : 'bg-accent'
                              }`}
                              style={{ width: `${Math.min(nutrient.level, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm font-mono font-bold text-foreground min-w-[50px] text-right">
                            {typeof nutrient.level === 'number' && nutrient.level < 10 
                              ? nutrient.level.toFixed(1) 
                              : Math.round(nutrient.level)
                            }{nutrient.name === 'pH Level' ? '' : '%'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card className="brutalist-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-cta" />
                  <h3 className="text-xl font-display font-bold text-foreground">
                    {getCurrentTranslation().recommendations}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div className="glass-card p-4 hover:scale-105 transition-transform duration-300">
                    <p className="text-sm text-foreground flex items-start gap-3">
                      <span className="text-lg">💡</span>
                      <span>
                        <strong className="text-warning">Phosphorus:</strong><br />
                        {getCurrentTranslation().phosphorusRecommendation}
                      </span>
                    </p>
                  </div>
                  <div className="glass-card p-4 hover:scale-105 transition-transform duration-300">
                    <p className="text-sm text-foreground flex items-start gap-3">
                      <span className="text-lg">🌱</span>
                      <span>
                        <strong className="text-success">Crops:</strong><br />
                        {getCurrentTranslation().cropRecommendation}
                      </span>
                    </p>
                  </div>
                  <div className="glass-card p-4 hover:scale-105 transition-transform duration-300">
                    <p className="text-sm text-foreground flex items-start gap-3">
                      <span className="text-lg">💧</span>
                      <span>
                        <strong className="text-primary">Irrigation:</strong><br />
                        {getCurrentTranslation().irrigationRecommendation}
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoilAnalysisPortal;