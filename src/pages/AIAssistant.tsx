import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Bot, 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  Brain, 
  MessageCircle, 
  Headphones, 
  Zap,
  Activity,
  CheckCircle,
  AlertTriangle,
  Target,
  Clock,
  Star,
  Settings,
  HelpCircle,
  BookOpen,
  TrendingUp,
  Camera,
  Image,
  FileText,
  Lightbulb,
  Shield,
  Sparkles,
  Users,
  Phone,
  Video,
  Mail,
  Calendar
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  confidence?: number;
  category?: string;
  suggestions?: string[];
}

interface AICapability {
  name: string;
  description: string;
  accuracy: number;
  responseTime: string;
  icon: React.ReactNode;
  features: string[];
}

interface ExpertConsultation {
  id: string;
  expertName: string;
  specialization: string;
  availability: string;
  rating: number;
  consultationFee: string;
  responseTime: string;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedMode, setSelectedMode] = useState('general');
  const [aiStats, setAiStats] = useState({
    totalQueries: 0,
    accurateResponses: 0,
    avgResponseTime: 0,
    userSatisfaction: 0
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // AI Capabilities
  const aiCapabilities: AICapability[] = [
    {
      name: 'Disease Diagnosis',
      description: 'AI-powered plant disease identification with 95%+ accuracy',
      accuracy: 95,
      responseTime: '2-3 seconds',
      icon: <Brain className="w-5 h-5" />,
      features: ['Image analysis', 'Symptom matching', 'Treatment recommendations', 'Prevention tips']
    },
    {
      name: 'Crop Management',
      description: 'Comprehensive farming guidance and crop optimization',
      accuracy: 92,
      responseTime: '1-2 seconds',
      icon: <TrendingUp className="w-5 h-5" />,
      features: ['Planting schedules', 'Fertilizer recommendations', 'Irrigation planning', 'Harvest timing']
    },
    {
      name: 'Market Intelligence',
      description: 'Real-time market analysis and price predictions',
      accuracy: 88,
      responseTime: '0.5-1 seconds',
      icon: <Activity className="w-5 h-5" />,
      features: ['Price forecasting', 'Demand analysis', 'Best selling times', 'Market trends']
    },
    {
      name: 'Weather Insights',
      description: 'Localized weather predictions and agricultural alerts',
      accuracy: 90,
      responseTime: '0.3 seconds',
      icon: <Zap className="w-5 h-5" />,
      features: ['7-day forecasts', 'Extreme weather alerts', 'Optimal farming windows', 'Climate advice']
    }
  ];

  // Expert Consultations
  const expertConsultations: ExpertConsultation[] = [
    {
      id: '1',
      expertName: 'Dr. Rajesh Kumar',
      specialization: 'Plant Pathology & Disease Management',
      availability: 'Available now',
      rating: 4.9,
      consultationFee: '₹500/session',
      responseTime: '< 5 minutes'
    },
    {
      id: '2',
      expertName: 'Dr. Priya Sharma',
      specialization: 'Crop Science & Sustainable Agriculture',
      availability: 'Available in 15 mins',
      rating: 4.8,
      consultationFee: '₹450/session',
      responseTime: '< 15 minutes'
    },
    {
      id: '3',
      expertName: 'Prof. Amit Patel',
      specialization: 'Soil Science & Nutrition',
      availability: 'Available tomorrow',
      rating: 4.7,
      consultationFee: '₹600/session',
      responseTime: '< 2 hours'
    }
  ];

  // Sample AI responses based on query type
  const generateAIResponse = (query: string): Message => {
    const lowercaseQuery = query.toLowerCase();
    let response = '';
    let category = 'general';
    let confidence = 85;
    let suggestions: string[] = [];

    if (lowercaseQuery.includes('disease') || lowercaseQuery.includes('pest') || lowercaseQuery.includes('infection')) {
      category = 'disease';
      confidence = 95;
      response = `🔬 Based on your query about plant diseases, I can help you identify and treat the issue. For the most accurate diagnosis, I recommend uploading a clear image of the affected plant. Common diseases this season include Late Blight, Powdery Mildew, and Bacterial Leaf Spot. 

📊 **Immediate Actions:**
1. Isolate affected plants if possible
2. Take clear photos of symptoms
3. Note when symptoms first appeared
4. Check environmental conditions

Would you like to upload an image for AI disease scanning, or do you have specific symptoms to describe?`;
      suggestions = ['Upload plant image', 'Describe symptoms', 'Treatment options', 'Prevention methods'];
    } else if (lowercaseQuery.includes('market') || lowercaseQuery.includes('price') || lowercaseQuery.includes('sell')) {
      category = 'market';
      confidence = 92;
      response = `📈 **Current Market Analysis:**

**Top Performing Crops Today:**
• Rice: ₹2,280/quintal (↗ +5.2%)
• Wheat: ₹2,420/quintal (↘ -1.5%)
• Cotton: ₹6,100/quintal (↗ +8.5%)

**Best Selling Opportunities:**
🎯 Mumbai APMC shows highest prices for your region. Market trends suggest selling within 2-3 days for optimal returns.

**AI Recommendations:**
✅ Strong demand for Grade A+ quality
✅ Weather conditions favor current pricing
⚠️ Price volatility expected next week`;
      suggestions = ['View detailed prices', 'Set price alerts', 'Market forecast', 'Best selling time'];
    } else if (lowercaseQuery.includes('weather') || lowercaseQuery.includes('rain') || lowercaseQuery.includes('climate')) {
      category = 'weather';
      confidence = 90;
      response = `🌤️ **Agricultural Weather Insights:**

**Current Conditions:**
• Temperature: 28°C (Optimal for most crops)
• Humidity: 68% (Moderate)
• Wind: 12 km/h (Light breeze)
• UV Index: 7 (High - protect crops)

**7-Day Forecast:**
🌧️ Rain expected in 3-4 days (15-25mm)
🌡️ Temperature range: 24-32°C
💨 Moderate winds, good for pollination

**Farming Recommendations:**
✅ Good time for planting
✅ Apply fertilizer before rain
⚠️ Monitor for fungal diseases post-rain`;
      suggestions = ['Extended forecast', 'Irrigation schedule', 'Planting calendar', 'Weather alerts'];
    } else if (lowercaseQuery.includes('fertilizer') || lowercaseQuery.includes('nutrition') || lowercaseQuery.includes('soil')) {
      category = 'nutrition';
      confidence = 88;
      response = `🌱 **Soil & Nutrition Guidance:**

**Recommended Fertilizer Schedule:**
📅 **Current Stage:** Pre-flowering
• NPK 19:19:19 - 25kg/acre (Apply now)
• Micronutrient spray - Weekly
• Organic compost - 2 tons/acre

**Soil Health Indicators:**
✅ pH Level: 6.5 (Optimal)
⚠️ Nitrogen: Moderate (needs supplement)
✅ Phosphorus: Good
⚠️ Potassium: Low (increase K fertilizer)

**Expert Tips:**
🔍 Soil testing recommended every 6 months
💧 Deep watering after fertilizer application
📊 Monitor plant response for 7-14 days`;
      suggestions = ['Soil test booking', 'Fertilizer calculator', 'Organic options', 'Application schedule'];
    } else {
      response = `🤖 Hello! I'm your AI Agricultural Assistant. I can help you with:

🔬 **Disease Diagnosis** - Upload plant images for instant analysis
📈 **Market Intelligence** - Real-time prices and selling recommendations  
🌤️ **Weather Insights** - Agricultural forecasts and planning
🌱 **Crop Management** - Fertilizer, irrigation, and care guidance
👨‍🌾 **Expert Consultation** - Connect with agricultural specialists

How can I assist you today? You can ask me questions, upload images, or use voice commands!`;
      suggestions = ['Disease scanning', 'Market prices', 'Weather forecast', 'Expert consultation'];
    }

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: response,
      timestamp: new Date(),
      confidence,
      category,
      suggestions
    };
  };

  // Voice recognition setup (simplified for demo)
  const startListening = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setInputMessage("What's wrong with my tomato plants? They have yellow spots on leaves.");
      toast({
        title: "Voice input captured",
        description: "Voice message converted to text successfully!"
      });
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  // Text-to-speech
  const speakResponse = (text: string) => {
    if (!voiceEnabled) return;
    
    setIsSpeaking(true);
    // Simulate TTS
    setTimeout(() => {
      setIsSpeaking(false);
      toast({
        title: "Voice response complete",
        description: "AI assistant finished speaking"
      });
    }, 4000);
  };

  // Send message
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
      
      // Update stats
      setAiStats(prev => ({
        totalQueries: prev.totalQueries + 1,
        accurateResponses: prev.accurateResponses + (aiResponse.confidence! > 80 ? 1 : 0),
        avgResponseTime: 1.2,
        userSatisfaction: 4.6
      }));

      // Speak response if voice enabled
      if (voiceEnabled) {
        speakResponse(aiResponse.content);
      }

      toast({
        title: "AI Response Ready! 🤖",
        description: `Analysis complete with ${aiResponse.confidence}% confidence`
      });
    }, 2000);
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '0',
      type: 'assistant',
      content: `🌾 **Welcome to your AI Agricultural Assistant!** 

I'm here to help you with all your farming needs. I can provide:
• Instant disease diagnosis from plant photos
• Real-time market prices and selling advice
• Weather forecasts and farming recommendations
• Expert agricultural guidance

Try asking me something like "What's the best price for rice today?" or upload a photo of your crops!`,
      timestamp: new Date(),
      confidence: 100,
      category: 'welcome',
      suggestions: ['Disease scanning', 'Market prices', 'Weather forecast', 'Expert help']
    };
    setMessages([welcomeMessage]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 183, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 183, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-card-glass backdrop-blur-xl rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-primary/30 mb-4 sm:mb-6">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-pulse-glow" />
              <span className="font-mono text-xs sm:text-sm font-medium text-foreground">AI Agricultural Assistant</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Your Smart
              <span className="electric-gradient bg-clip-text text-transparent block sm:inline"> Farming Companion</span>
              <span className="text-2xl sm:text-3xl"> 🤖</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Advanced AI assistant with voice commands, expert consultation, and real-time agricultural intelligence
            </p>

            {/* AI Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{aiStats.totalQueries}</div>
                <div className="text-sm text-muted-foreground">Queries Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{aiStats.accurateResponses}</div>
                <div className="text-sm text-muted-foreground">Accurate Responses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cta">{aiStats.avgResponseTime}s</div>
                <div className="text-sm text-muted-foreground">Avg Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{aiStats.userSatisfaction}/5</div>
                <div className="text-sm text-muted-foreground">User Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="earth-card h-[600px] flex flex-col">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center gap-2">
                  <Bot className="w-6 h-6 text-primary" />
                  <CardTitle>AI Chat Assistant</CardTitle>
                  <Badge variant="default" className="bg-success">
                    <Activity className="w-3 h-3 mr-1" />
                    Online
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">🇺🇸 English</SelectItem>
                      <SelectItem value="hi">🇮🇳 Hindi</SelectItem>
                      <SelectItem value="mr">🇮🇳 Marathi</SelectItem>
                      <SelectItem value="te">🇮🇳 Telugu</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant={voiceEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                  >
                    {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>

              {/* Chat Messages */}
              <CardContent className="flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-lg p-4 ${
                        message.type === 'user' 
                          ? 'bg-primary text-white' 
                          : 'bg-muted text-foreground'
                      }`}>
                        {message.type === 'assistant' && (
                          <div className="flex items-center gap-2 mb-2">
                            <Bot className="w-4 h-4" />
                            <span className="text-xs font-medium">AI Assistant</span>
                            {message.confidence && (
                              <Badge variant="outline" className="text-xs">
                                {message.confidence}% confidence
                              </Badge>
                            )}
                          </div>
                        )}
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        {message.suggestions && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs"
                                onClick={() => setInputMessage(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                        <div className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-4 max-w-[80%]">
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4" />
                          <span className="text-sm">AI is thinking...</span>
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Select value={selectedMode} onValueChange={setSelectedMode}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">🌾 General</SelectItem>
                        <SelectItem value="disease">🔬 Disease Focus</SelectItem>
                        <SelectItem value="market">📈 Market Focus</SelectItem>
                        <SelectItem value="weather">🌤️ Weather Focus</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={`Ask me anything about farming... (${selectedLanguage.toUpperCase()})`}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                      disabled={isProcessing}
                    />
                    <Button
                      variant={isListening ? "destructive" : "outline"}
                      size="sm"
                      onClick={isListening ? stopListening : startListening}
                      disabled={isProcessing}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    <Button onClick={sendMessage} disabled={!inputMessage.trim() || isProcessing}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  {isListening && (
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        Listening... Speak now
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Features */}
          <div className="space-y-6">
            {/* AI Capabilities */}
            <Card className="earth-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiCapabilities.map((capability, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {capability.icon}
                      <span className="font-medium text-sm">{capability.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {capability.accuracy}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{capability.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Response: {capability.responseTime}</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(star => (
                          <Star key={star} className={`w-3 h-3 ${star <= Math.floor(capability.accuracy/20) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="earth-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Camera className="w-4 h-4 mr-2" />
                  Disease Scan
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Market Prices
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="w-4 h-4 mr-2" />
                  Weather Forecast
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Crop Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Farming Guide
                </Button>
              </CardContent>
            </Card>

            {/* Expert Consultation */}
            <Card className="earth-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Expert Consultation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {expertConsultations.map((expert) => (
                  <div key={expert.id} className="p-3 bg-gradient-to-r from-primary/5 to-cta/5 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{expert.expertName}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{expert.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{expert.specialization}</p>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-success">{expert.availability}</span>
                      <span className="font-medium">{expert.consultationFee}</span>
                    </div>
                    <Button size="sm" className="w-full">
                      <Video className="w-3 h-3 mr-1" />
                      Consult Now
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;