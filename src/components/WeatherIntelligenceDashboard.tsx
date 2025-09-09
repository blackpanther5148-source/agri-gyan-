import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, MapPin, AlertCircle, Thermometer, Droplets, Wind, Sun } from 'lucide-react';

const WeatherIntelligenceDashboard: React.FC = () => {
  const [alertLevel, setAlertLevel] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('New Delhi, India');

  useEffect(() => {
    const interval = setInterval(() => {
      setAlertLevel(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const weatherAlerts = [
    { 
      type: 'Heavy Rainfall', 
      severity: 'high', 
      message: 'Expected 80mm rainfall in next 24 hours. Prepare drainage systems.',
      action: 'Cover sensitive crops and ensure proper field drainage',
      icon: '🌧️',
      time: '2 hours'
    },
    { 
      type: 'Heat Wave', 
      severity: 'medium', 
      message: 'Temperature will exceed 42°C for next 3 days.',
      action: 'Increase irrigation frequency and provide shade cover',
      icon: '🌡️',
      time: '6 hours'
    },
    { 
      type: 'Frost Warning', 
      severity: 'critical', 
      message: 'Temperature may drop to 2°C tonight.',
      action: 'Apply protective measures immediately for tender crops',
      icon: '❄️',
      time: '12 hours'
    }
  ];

  const currentWeather = {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    rainfall: 2.5,
    uvIndex: 7,
    pressure: 1013,
    visibility: 10
  };

  const weeklyForecast = [
    { day: 'Today', icon: '🌤️', high: 32, low: 22, rain: 20, condition: 'Partly Cloudy' },
    { day: 'Tomorrow', icon: '🌧️', high: 28, low: 20, rain: 80, condition: 'Heavy Rain' },
    { day: 'Wed', icon: '⛈️', high: 25, low: 18, rain: 90, condition: 'Thunderstorm' },
    { day: 'Thu', icon: '🌥️', high: 30, low: 21, rain: 40, condition: 'Cloudy' },
    { day: 'Fri', icon: '☀️', high: 35, low: 24, rain: 10, condition: 'Sunny' },
    { day: 'Sat', icon: '🌤️', high: 33, low: 23, rain: 15, condition: 'Partly Cloudy' },
    { day: 'Sun', icon: '☀️', high: 36, low: 25, rain: 5, condition: 'Clear' }
  ];

  const cropGuidance = [
    {
      crop: 'Wheat',
      stage: 'Flowering',
      recommendation: 'Reduce watering due to expected heavy rainfall',
      priority: 'high',
      action: 'Create drainage channels immediately'
    },
    {
      crop: 'Rice',
      stage: 'Transplanting',
      recommendation: 'Perfect conditions for transplanting after rain',
      priority: 'optimal',
      action: 'Prepare seedlings for field transfer'
    },
    {
      crop: 'Maize',
      stage: 'Vegetative',
      recommendation: 'Monitor for fungal diseases due to high humidity',
      priority: 'medium',
      action: 'Apply preventive fungicide spray'
    }
  ];

  const severityColors = {
    low: 'text-success border-success/30 bg-success/10',
    medium: 'text-warning border-warning/30 bg-warning/10',
    high: 'text-destructive border-destructive/30 bg-destructive/10',
    critical: 'text-destructive border-destructive/50 bg-destructive/20 animate-pulse-glow'
  };

  return (
    <section className="py-24 bg-gradient-to-br from-card-soft to-background relative overflow-hidden">
      {/* Weather Animation Background */}
      <div className="absolute inset-0 opacity-20">
        {/* Animated Clouds */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-20 bg-primary/10 rounded-full animate-float"
            style={{
              left: `${10 + (i * 20)}%`,
              top: `${10 + Math.sin(i) * 20}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${4 + i}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 bg-card-glass backdrop-blur-xl rounded-full px-6 py-3 border border-accent/30 mb-6">
            <Cloud className="w-5 h-5 text-accent animate-bounce-gentle" />
            <span className="font-mono text-sm font-medium text-foreground">Weather Intelligence</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            Real-Time 
            <span className="electric-gradient bg-clip-text text-transparent block sm:inline"> Weather Analytics</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Advanced meteorological analysis with crop-specific guidance, alert systems, 
            and precision agriculture recommendations.
          </p>
        </div>

        {/* Alert System */}
        <div className="mb-12">
          <Card className="brutalist-card">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-display font-bold text-foreground">
                  Weather Alert System
                </h3>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">{selectedLocation}</span>
                </div>
              </div>

              {/* Active Alerts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {weatherAlerts.map((alert, index) => (
                  <Card 
                    key={index}
                    className={`relative overflow-hidden border-2 transition-all duration-500 ${
                      severityColors[alert.severity as keyof typeof severityColors]
                    } ${index === alertLevel ? 'scale-105 shadow-electric' : ''}`}
                  >
                    <CardContent className="p-6">
                      {/* Ripple Effect */}
                      {index === alertLevel && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                      animate-pulse pointer-events-none" />
                      )}
                      
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl animate-bounce-gentle">{alert.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-display font-bold text-foreground">{alert.type}</h4>
                            <span className="text-xs font-mono bg-card/50 px-2 py-1 rounded">
                              {alert.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                          <div className="bg-card/50 p-3 rounded-lg">
                            <p className="text-xs font-medium text-foreground">
                              💡 {alert.action}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 mb-12">
          {/* Current Conditions */}
          <div className="xl:col-span-2">
            <Card className="brutalist-card">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-2xl font-display font-bold text-foreground mb-8">
                  Current Weather Conditions
                </h3>

                {/* Main Weather Display */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                  <div className="glass-card p-4 sm:p-6 text-center group">
                    <Thermometer className="w-8 h-8 sm:w-12 sm:h-12 text-destructive mx-auto mb-2 sm:mb-4 group-hover:animate-magnetic" />
                    <div className="text-xl sm:text-3xl font-display font-bold text-foreground mb-1 sm:mb-2">
                      {currentWeather.temperature}°C
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Temperature</div>
                  </div>

                  <div className="glass-card p-6 text-center group">
                    <Droplets className="w-12 h-12 text-primary mx-auto mb-4 group-hover:animate-magnetic" />
                    <div className="text-3xl font-display font-bold text-foreground mb-2">
                      {currentWeather.humidity}%
                    </div>
                    <div className="text-sm text-muted-foreground">Humidity</div>
                  </div>

                  <div className="glass-card p-6 text-center group">
                    <Wind className="w-12 h-12 text-accent mx-auto mb-4 group-hover:animate-magnetic" />
                    <div className="text-3xl font-display font-bold text-foreground mb-2">
                      {currentWeather.windSpeed}
                    </div>
                    <div className="text-sm text-muted-foreground">km/h Wind</div>
                  </div>

                  <div className="glass-card p-6 text-center group">
                    <Sun className="w-12 h-12 text-cta mx-auto mb-4 group-hover:animate-magnetic" />
                    <div className="text-3xl font-display font-bold text-foreground mb-2">
                      {currentWeather.uvIndex}
                    </div>
                    <div className="text-sm text-muted-foreground">UV Index</div>
                  </div>
                </div>

                {/* 7-Day Forecast */}
                <div className="space-y-4">
                  <h4 className="text-lg sm:text-xl font-display font-bold text-foreground">7-Day Forecast</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3 sm:gap-4">
                    {weeklyForecast.map((day, index) => (
                      <div key={index} className="glass-card p-4 text-center hover-electric">
                        <div className="text-sm font-medium text-foreground mb-2">{day.day}</div>
                        <div className="text-3xl mb-2">{day.icon}</div>
                        <div className="space-y-1">
                          <div className="text-lg font-bold text-foreground">{day.high}°</div>
                          <div className="text-sm text-muted-foreground">{day.low}°</div>
                          <div className="flex items-center justify-center text-primary text-xs">
                            <Droplets className="w-3 h-3 mr-1" />
                            {day.rain}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Crop Guidance */}
          <div>
            <Card className="brutalist-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <AlertCircle className="w-6 h-6 text-cta" />
                  <h3 className="text-xl font-display font-bold text-foreground">
                    Crop Guidance
                  </h3>
                </div>

                <div className="space-y-4">
                  {cropGuidance.map((guide, index) => (
                    <Card key={index} className="glass-card">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-display font-bold text-foreground">{guide.crop}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            guide.priority === 'high' ? 'bg-destructive/20 text-destructive' :
                            guide.priority === 'optimal' ? 'bg-success/20 text-success' :
                            'bg-warning/20 text-warning'
                          }`}>
                            {guide.stage}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{guide.recommendation}</p>
                        
                        <div className="bg-card/50 p-3 rounded-lg">
                          <p className="text-xs font-medium text-foreground">
                            🎯 {guide.action}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="mt-6 space-y-3">
                  <Button className="w-full btn-holographic">
                    📱 Get Weather Alerts
                  </Button>
                  <Button className="w-full btn-glass">
                    🗺️ View Radar Map
                  </Button>
                  <Button className="w-full btn-glass">
                    📊 Historical Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Interactive Map Placeholder */}
        <Card className="brutalist-card">
          <CardContent className="p-8">
            <h3 className="text-2xl font-display font-bold text-foreground mb-6">
              Live Weather Map
            </h3>
            
            <div className="relative bg-muted-dark rounded-2xl overflow-hidden" style={{ height: '400px' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce-gentle" />
                  <h4 className="text-xl font-display font-bold text-foreground mb-2">
                    Interactive Weather Map
                  </h4>
                  <p className="text-muted-foreground max-w-md">
                    Real-time weather patterns with crop impact visualization and 
                    hyperlocal forecasting for precision agriculture.
                  </p>
                </div>
              </div>
              
              {/* Weather Markers */}
              <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-warning rounded-full animate-pulse-glow">
                <div className="absolute -inset-2 border-2 border-warning rounded-full animate-ping" />
              </div>
              <div className="absolute top-3/4 right-1/4 w-4 h-4 bg-primary rounded-full animate-pulse-glow">
                <div className="absolute -inset-2 border-2 border-primary rounded-full animate-ping" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WeatherIntelligenceDashboard;