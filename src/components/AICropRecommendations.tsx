import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, TrendingUp, Zap, MapPin, Calendar, Droplets, Sun } from 'lucide-react';

const AICropRecommendations = () => {
  const [activeRecommendation, setActiveRecommendation] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const recommendations = [
    {
      crop: "Wheat",
      icon: "🌾",
      confidence: 96,
      yield: "4.2 tons/hectare",
      season: "Winter",
      reason: "Optimal soil pH and nitrogen levels",
      color: "from-amber-500 to-orange-600"
    },
    {
      crop: "Corn",
      icon: "🌽",
      confidence: 89,
      yield: "8.5 tons/hectare",  
      season: "Summer",
      reason: "High moisture content and temperature match",
      color: "from-yellow-500 to-amber-600"
    },
    {
      crop: "Soybeans",
      icon: "🫘",
      confidence: 84,
      yield: "2.8 tons/hectare",
      season: "Spring",
      reason: "Nitrogen-fixing benefits for soil health",
      color: "from-green-500 to-emerald-600"
    }
  ];

  const factors = [
    { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "Optimal Zone 7B" },
    { icon: <Calendar className="w-5 h-5" />, label: "Season", value: "Winter Planting" },
    { icon: <Droplets className="w-5 h-5" />, label: "Moisture", value: "68% Optimal" },
    { icon: <Sun className="w-5 h-5" />, label: "Sunlight", value: "8hrs Daily" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRecommendation(prev => (prev + 1) % recommendations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  return (
    <section className="py-16 sm:py-20 bg-background relative overflow-hidden">
      {/* Animated Particles */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 bg-card-glass backdrop-blur-xl rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-primary/30 mb-4 sm:mb-6">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-pulse-glow" />
            <span className="font-mono text-xs sm:text-sm font-medium text-foreground">AI Crop Intelligence</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 sm:mb-6">
            AI Crop 
            <span className="electric-gradient bg-clip-text text-transparent block sm:inline"> Recommendations</span>
            <span className="text-2xl sm:text-3xl md:text-4xl"> 🌱</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Get personalized crop recommendations powered by advanced AI algorithms analyzing 
            soil conditions, climate data, and market trends in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Recommendation Display */}
          <div className="xl:col-span-2">
            <Card className="brutalist-card overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-4 sm:mb-0">
                    Smart Crop Analysis
                  </h3>
                  <Button 
                    onClick={startAnalysis}
                    className={`btn-holographic w-full sm:w-auto ${isAnalyzing ? 'animate-pulse-glow' : ''}`}
                    disabled={isAnalyzing}
                  >
                    <Brain className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}
                  </Button>
                </div>

                {/* Active Recommendation */}
                <div className="relative mb-8">
                  <div className="glass-card p-6 sm:p-8 hover-electric cursor-pointer">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br ${recommendations[activeRecommendation].color} flex items-center justify-center text-2xl sm:text-3xl animate-bounce-gentle`}>
                        {recommendations[activeRecommendation].icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                          <h4 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2 sm:mb-0">
                            {recommendations[activeRecommendation].crop}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <div className="text-sm font-mono text-muted-foreground">Confidence:</div>
                            <div className="text-lg font-bold text-primary">
                              {recommendations[activeRecommendation].confidence}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Expected Yield</div>
                            <div className="text-lg font-semibold text-foreground">
                              {recommendations[activeRecommendation].yield}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Best Season</div>
                            <div className="text-lg font-semibold text-foreground">
                              {recommendations[activeRecommendation].season}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          <strong>Recommendation:</strong> {recommendations[activeRecommendation].reason}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* All Recommendations */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recommendations.map((rec, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveRecommendation(index)}
                      className={`glass-card p-4 cursor-pointer transition-all duration-300 ${
                        activeRecommendation === index ? 'ring-2 ring-primary' : 'hover:bg-secondary'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${rec.color} flex items-center justify-center text-xl`}>
                          {rec.icon}
                        </div>
                        <div className="font-medium text-foreground text-sm">{rec.crop}</div>
                        <div className="text-xs text-primary font-mono">{rec.confidence}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Factors */}
          <div className="space-y-6">
            <Card className="brutalist-card">
              <CardContent className="p-6">
                <h3 className="text-lg sm:text-xl font-display font-bold text-foreground mb-6">
                  Analysis Factors
                </h3>
                
                <div className="space-y-4">
                  {factors.map((factor, index) => (
                    <div key={index} className="glass-card p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          {factor.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground">{factor.label}</div>
                          <div className="font-medium text-foreground text-sm">{factor.value}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Insights */}
            <Card className="brutalist-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-cta" />
                  <h3 className="text-lg font-display font-bold text-foreground">
                    Market Insights
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div className="glass-card p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Wheat Price</span>
                      <span className="text-sm font-bold text-success">↗ $245/ton</span>
                    </div>
                  </div>
                  <div className="glass-card p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Demand Forecast</span>
                      <span className="text-sm font-bold text-primary">High</span>
                    </div>
                  </div>
                  <div className="glass-card p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Competition</span>
                      <span className="text-sm font-bold text-warning">Medium</span>
                    </div>
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

export default AICropRecommendations;