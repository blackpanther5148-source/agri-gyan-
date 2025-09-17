import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  TrendingUp, 
  TrendingDown, 
  Bell, 
  MapPin, 
  Clock, 
  DollarSign, 
  BarChart3, 
  RefreshCw,
  Zap,
  Target,
  AlertCircle,
  CheckCircle,
  Activity,
  Volume2,
  Droplets,
  Star
} from 'lucide-react';

const Market = () => {
  const [selectedState, setSelectedState] = useState('maharashtra');
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [liveUpdates, setLiveUpdates] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [priceAlerts, setPriceAlerts] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState('Pune, Maharashtra');
  const [showPriceChart, setShowPriceChart] = useState(false);
  const [marketVolatility, setMarketVolatility] = useState(2.8);
  const [sortBy, setSortBy] = useState('distance');
  const [targetPrice, setTargetPrice] = useState('');
  const { toast } = useToast();

  // Enhanced market data with comprehensive information
  const marketData = {
    maharashtra: {
      rice: [
        { 
          mandi: 'Pune APMC', 
          price: 2150, 
          change: 5.2, 
          lastUpdated: '2 hours ago',
          volume: '1,250 quintals',
          quality: 'Grade A',
          moisture: '12%',
          minPrice: 2000,
          maxPrice: 2300,
          marketStatus: 'active',
          distance: '45 km',
          priceHistory: [2000, 2050, 2100, 2120, 2150],
          volatility: 'Low',
          recommendation: 'Buy',
          traders: 34
        },
        { 
          mandi: 'Mumbai APMC', 
          price: 2280, 
          change: -1.5, 
          lastUpdated: '1 hour ago',
          volume: '2,100 quintals',
          quality: 'Grade A+',
          moisture: '11%',
          minPrice: 2100,
          maxPrice: 2400,
          marketStatus: 'active',
          distance: '120 km',
          priceHistory: [2200, 2250, 2300, 2320, 2280],
          volatility: 'Medium',
          recommendation: 'Hold',
          traders: 58
        },
        { 
          mandi: 'Nashik APMC', 
          price: 2100, 
          change: 3.8, 
          lastUpdated: '3 hours ago',
          volume: '980 quintals',
          quality: 'Grade B+',
          moisture: '13%',
          minPrice: 1950,
          maxPrice: 2200,
          marketStatus: 'active',
          distance: '85 km',
          priceHistory: [1950, 2000, 2050, 2080, 2100],
          volatility: 'Low',
          recommendation: 'Buy',
          traders: 28
        },
        { 
          mandi: 'Aurangabad APMC', 
          price: 2050, 
          change: 2.1, 
          lastUpdated: '2 hours ago',
          volume: '750 quintals',
          quality: 'Grade B',
          moisture: '14%',
          minPrice: 1900,
          maxPrice: 2150,
          marketStatus: 'closing_soon',
          distance: '200 km',
          priceHistory: [1900, 1950, 2000, 2025, 2050],
          volatility: 'High',
          recommendation: 'Sell',
          traders: 19
        }
      ],
      wheat: [
        { 
          mandi: 'Pune APMC', 
          price: 2350, 
          change: 4.2, 
          lastUpdated: '1 hour ago',
          volume: '1,800 quintals',
          quality: 'Grade A',
          moisture: '10%',
          minPrice: 2200,
          maxPrice: 2500,
          marketStatus: 'active',
          distance: '45 km',
          priceHistory: [2200, 2250, 2300, 2325, 2350],
          volatility: 'Low',
          recommendation: 'Hold',
          traders: 42
        },
        { 
          mandi: 'Mumbai APMC', 
          price: 2420, 
          change: -2.1, 
          lastUpdated: '2 hours ago',
          volume: '2,500 quintals',
          quality: 'Grade A+',
          moisture: '9%',
          minPrice: 2300,
          maxPrice: 2600,
          marketStatus: 'active',
          distance: '120 km',
          priceHistory: [2300, 2400, 2450, 2470, 2420],
          volatility: 'Medium',
          recommendation: 'Buy',
          traders: 67
        }
      ],
      cotton: [
        { 
          mandi: 'Pune APMC', 
          price: 5800, 
          change: 8.5, 
          lastUpdated: '2 hours ago',
          volume: '850 bales',
          quality: 'Shankar-6',
          moisture: '7%',
          minPrice: 5400,
          maxPrice: 6200,
          marketStatus: 'active',
          distance: '45 km',
          priceHistory: [5400, 5500, 5650, 5720, 5800],
          volatility: 'High',
          recommendation: 'Sell',
          traders: 31
        }
      ],
      sugarcane: [
        { 
          mandi: 'Pune Sugar Factory', 
          price: 320, 
          change: 2.5, 
          lastUpdated: '1 hour ago',
          volume: '15,000 tonnes',
          quality: 'High Sucrose',
          moisture: '75%',
          minPrice: 300,
          maxPrice: 350,
          marketStatus: 'active',
          distance: '35 km',
          priceHistory: [300, 310, 315, 318, 320],
          volatility: 'Low',
          recommendation: 'Hold',
          traders: 12
        }
      ]
    }
  };

  // Market news and insights
  const marketNews = [
    {
      title: 'Rice prices surge due to monsoon delays',
      summary: 'Delayed monsoon in key rice-producing states has led to a 15% increase in rice prices across major mandis.',
      time: '2 hours ago',
      impact: 'positive',
      severity: 'high'
    },
    {
      title: 'Government announces minimum support price increase',
      summary: 'MSP for wheat increased by ₹200 per quintal, benefiting farmers across the country.',
      time: '5 hours ago',
      impact: 'positive',
      severity: 'medium'
    },
    {
      title: 'Export demand for cotton remains strong',
      summary: 'International demand for Indian cotton continues to drive prices upward in domestic markets.',
      time: '1 day ago',
      impact: 'positive',
      severity: 'medium'
    }
  ];

  // Live updates simulation
  useEffect(() => {
    if (liveUpdates) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
        // Simulate price fluctuations
        setMarketVolatility(prev => Math.max(1, Math.min(5, prev + (Math.random() - 0.5) * 0.5)));
      }, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [liveUpdates]);

  const getCurrentPrices = () => {
    const data = marketData[selectedState as keyof typeof marketData]?.[selectedCrop as keyof typeof marketData.maharashtra] || [];
    
    // Sort data based on selected criteria
    return [...data].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price;
        case 'volume':
          return parseInt(b.volume.replace(/[^0-9]/g, '')) - parseInt(a.volume.replace(/[^0-9]/g, ''));
        case 'distance':
        default:
          return parseInt(a.distance.replace(/[^0-9]/g, '')) - parseInt(b.distance.replace(/[^0-9]/g, ''));
      }
    });
  };

  const getAveragePrice = () => {
    const prices = getCurrentPrices();
    return prices.length > 0 ? Math.round(prices.reduce((sum, item) => sum + item.price, 0) / prices.length) : 0;
  };

  const getTrendDirection = () => {
    const prices = getCurrentPrices();
    if (prices.length === 0) return 'neutral';
    const avgChange = prices.reduce((sum, item) => sum + item.change, 0) / prices.length;
    return avgChange > 0 ? 'up' : avgChange < 0 ? 'down' : 'neutral';
  };

  const getTotalVolume = () => {
    const prices = getCurrentPrices();
    return prices.reduce((sum, item) => {
      const volume = parseInt(item.volume.replace(/[^0-9,]/g, '').replace(',', ''));
      return sum + volume;
    }, 0);
  };

  const handleSetPriceAlert = (price: number) => {
    if (!targetPrice) {
      toast({
        title: "Please enter target price",
        description: "Enter a target price to set up the alert",
        variant: "destructive",
      });
      return;
    }

    setPriceAlerts(prev => [...prev, {
      crop: selectedCrop,
      targetPrice: parseInt(targetPrice),
      currentPrice: price,
      createdAt: new Date()
    }]);

    toast({
      title: "Price Alert Set!",
      description: `You'll be notified when ${selectedCrop} reaches ₹${targetPrice}`,
    });

    setTargetPrice('');
  };

  return (
    <div className="min-h-screen warm-gradient">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-foreground">
              Market Insights 📈
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${liveUpdates ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm text-muted-foreground">
                  {liveUpdates ? 'Live Updates' : 'Updates Paused'}
                </span>
              </div>
              <Button
                variant={liveUpdates ? "secondary" : "default"}
                size="sm"
                onClick={() => setLiveUpdates(!liveUpdates)}
              >
                {liveUpdates ? <Zap className="w-4 h-4 mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                {liveUpdates ? 'Pause' : 'Resume'}
              </Button>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-2">
            Real-time market prices, trends, and analysis to help you make informed selling decisions
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Your Location: {userLocation}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity className="w-4 h-4" />
              <span>Market Volatility: {marketVolatility.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <Card className="earth-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Select State
              </label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="punjab">Punjab</SelectItem>
                  <SelectItem value="haryana">Haryana</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Crop
              </label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">🌾 Rice</SelectItem>
                  <SelectItem value="wheat">🌾 Wheat</SelectItem>
                  <SelectItem value="cotton">🌱 Cotton</SelectItem>
                  <SelectItem value="sugarcane">🎋 Sugarcane</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">📍 Distance</SelectItem>
                  <SelectItem value="price">💰 Price (High to Low)</SelectItem>
                  <SelectItem value="volume">📦 Volume</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Set Price Alert (₹)
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="2500"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                />
                <Button size="sm" onClick={() => handleSetPriceAlert(getAveragePrice())}>
                  <Bell className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Enhanced Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="earth-card p-6 text-center border-l-4 border-green-500">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-3xl font-bold text-foreground">₹{getAveragePrice()}</div>
            <div className="text-sm text-muted-foreground">Average Price/Quintal</div>
            <Progress value={75} className="mt-2" />
          </Card>

          <Card className="earth-card p-6 text-center border-l-4 border-blue-500">
            <div className="text-3xl mb-2">
              {getTrendDirection() === 'up' ? '📈' : getTrendDirection() === 'down' ? '📉' : '➡️'}
            </div>
            <div className={`text-2xl font-bold ${
              getTrendDirection() === 'up' ? 'text-success' : 
              getTrendDirection() === 'down' ? 'text-destructive' : 'text-muted-foreground'
            }`}>
              {getTrendDirection() === 'up' ? 'Rising' : getTrendDirection() === 'down' ? 'Falling' : 'Stable'}
            </div>
            <div className="text-sm text-muted-foreground">Market Trend</div>
            <Badge className="mt-2" variant={marketVolatility > 3 ? "destructive" : "secondary"}>
              Volatility: {marketVolatility.toFixed(1)}%
            </Badge>
          </Card>

          <Card className="earth-card p-6 text-center border-l-4 border-purple-500">
            <div className="text-3xl mb-2">🏪</div>
            <div className="text-2xl font-bold text-foreground">{getCurrentPrices().length}</div>
            <div className="text-sm text-muted-foreground">Active Markets</div>
            <div className="text-xs text-green-600 mt-1">
              Total Volume: {getTotalVolume().toLocaleString()} quintals
            </div>
          </Card>

          <Card className="earth-card p-6 text-center border-l-4 border-orange-500">
            <div className="text-3xl mb-2">⏰</div>
            <div className="text-2xl font-bold text-foreground">Live</div>
            <div className="text-sm text-muted-foreground">Real-time Data</div>
            <div className="text-xs text-blue-600 mt-1">
              {priceAlerts.length} Active Alerts
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Current Prices */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Current {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)} Prices
            </h2>
            <div className="space-y-4">
              {getCurrentPrices().map((mandi, index) => (
                <Card key={index} className="earth-card p-6 border-l-4 border-green-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-foreground">{mandi.mandi}</h3>
                        <Badge variant={mandi.marketStatus === 'active' ? "default" : "secondary"}>
                          {mandi.marketStatus === 'active' ? '🟢 Active' : '🟡 Closing Soon'}
                        </Badge>
                        <Badge variant="outline">
                          {mandi.recommendation === 'Buy' && <TrendingUp className="w-3 h-3 mr-1" />}
                          {mandi.recommendation === 'Sell' && <TrendingDown className="w-3 h-3 mr-1" />}
                          {mandi.recommendation}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {mandi.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {mandi.lastUpdated}
                        </span>
                        <span className="flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          {mandi.traders} traders
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-foreground">₹{mandi.price}</div>
                      <div className={`text-sm font-medium flex items-center justify-end ${
                        mandi.change > 0 ? 'text-success' : 'text-destructive'
                      }`}>
                        <span className="mr-1">{mandi.change > 0 ? '📈' : '📉'}</span>
                        {Math.abs(mandi.change)}%
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Range: ₹{mandi.minPrice} - ₹{mandi.maxPrice}
                      </div>
                    </div>
                  </div>
                  
                  {/* Comprehensive Market Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <Volume2 className="w-3 h-3" />
                        VOLUME
                      </div>
                      <div className="text-sm font-semibold text-blue-600">{mandi.volume}</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <Star className="w-3 h-3" />
                        QUALITY
                      </div>
                      <div className="text-sm font-semibold text-purple-600">{mandi.quality}</div>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <Droplets className="w-3 h-3" />
                        MOISTURE
                      </div>
                      <div className="text-sm font-semibold text-orange-600">{mandi.moisture}</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <Target className="w-3 h-3" />
                        VOLATILITY
                      </div>
                      <div className="text-sm font-semibold text-green-600">{mandi.volatility}</div>
                    </div>
                  </div>

                  {/* Price Trend Chart */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-4">
                    <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <BarChart3 className="w-3 h-3" />
                      PRICE TREND (LAST 5 UPDATES)
                    </div>
                    <div className="flex items-end gap-1 h-12">
                      {mandi.priceHistory.map((price, idx) => {
                        const height = ((price - mandi.minPrice) / (mandi.maxPrice - mandi.minPrice)) * 100;
                        return (
                          <div
                            key={idx}
                            className="bg-gradient-to-t from-green-500 to-green-400 rounded-sm flex-1"
                            style={{ height: `${Math.max(height, 10)}%` }}
                            title={`₹${price}`}
                          />
                        );
                      })}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>₹{Math.min(...mandi.priceHistory)}</span>
                      <span>₹{Math.max(...mandi.priceHistory)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Bell className="w-4 h-4 mr-2" />
                      Set Alert
                    </Button>
                    <Button size="sm" className="flex-1 bg-cta">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Contact Trader
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* AI Market Analysis */}
            <Card className="earth-card p-6">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  AI Market Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Best Selling Opportunity</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {getCurrentPrices().length > 0 && getCurrentPrices()[0].mandi} offers the highest price for {selectedCrop} at ₹{getCurrentPrices()[0]?.price}. Consider selling within 2-3 days.
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Market Forecast</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Expect 2-4% price increase next week. Quality grades A+ showing stronger demand in urban markets.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Market News */}
            <Card className="earth-card p-6">
              <CardHeader className="pb-3">
                <CardTitle>Market News & Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {marketNews.map((news, index) => (
                    <div key={index} className="border-b border-gray-100 dark:border-gray-800 pb-3 last:border-b-0">
                      <div className="flex items-start gap-2">
                        <Badge variant={news.impact === 'positive' ? 'default' : 'destructive'}>
                          {news.impact === 'positive' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        </Badge>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{news.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{news.summary}</p>
                          <p className="text-xs text-muted-foreground mt-1">{news.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Price Alerts */}
            <Card className="earth-card p-6">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Price Alerts ({priceAlerts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {priceAlerts.length > 0 ? (
                  <div className="space-y-2">
                    {priceAlerts.map((alert, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-950 rounded">
                        <div>
                          <div className="text-sm font-medium">{alert.crop}</div>
                          <div className="text-xs text-muted-foreground">Target: ₹{alert.targetPrice}</div>
                        </div>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No active alerts. Set price alerts to get notified when your target price is reached.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;