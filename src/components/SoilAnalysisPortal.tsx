import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Droplets, Zap, TrendingUp } from 'lucide-react';

const SoilAnalysisPortal: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
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

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 4000);
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
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 bg-card-glass backdrop-blur-xl rounded-full px-6 py-3 border border-primary/30 mb-6">
            <Sparkles className="w-5 h-5 text-primary animate-pulse-glow" />
            <span className="font-mono text-sm font-medium text-foreground">Soil Intelligence Portal</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            AI-Powered 
            <span className="electric-gradient bg-clip-text text-transparent block sm:inline"> Soil Analysis</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Revolutionary circular waveform visualization with real-time reactive particles 
            showing nutrient levels and soil composition analysis.
          </p>
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
                    {isAnalyzing ? 'Analyzing...' : 'Scan Soil'}
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
                  Nutrient Levels
                </h3>
                
                <div className="space-y-4">
                  {nutrientData.map((nutrient, index) => (
                    <div key={index} className="glass-card p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{nutrient.icon}</span>
                          <span className="font-medium text-foreground">{nutrient.name}</span>
                        </div>
                        <span className={`text-sm font-bold ${nutrient.color}`}>
                          {nutrient.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${
                              nutrient.status === 'optimal' ? 'bg-success' :
                              nutrient.status === 'high' ? 'bg-primary' :
                              nutrient.status === 'low' ? 'bg-warning' : 'bg-accent'
                            }`}
                            style={{ width: `${Math.min(nutrient.level, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm font-mono font-bold text-foreground">
                          {typeof nutrient.level === 'number' && nutrient.level < 10 
                            ? nutrient.level.toFixed(1) 
                            : Math.round(nutrient.level)
                          }{nutrient.name === 'pH Level' ? '' : '%'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card className="brutalist-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-cta" />
                  <h3 className="text-xl font-display font-bold text-foreground">
                    AI Recommendations
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div className="glass-card p-3">
                    <p className="text-sm text-foreground">
                      💡 <strong>Phosphorus boost needed:</strong> Apply bone meal or rock phosphate
                    </p>
                  </div>
                  <div className="glass-card p-3">
                    <p className="text-sm text-foreground">
                      🌱 <strong>Optimal for:</strong> Wheat, corn, and legume crops
                    </p>
                  </div>
                  <div className="glass-card p-3">
                    <p className="text-sm text-foreground">
                      💧 <strong>Irrigation:</strong> Reduce watering by 15% for better yields
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