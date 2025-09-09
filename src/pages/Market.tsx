import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Market = () => {
  const [selectedState, setSelectedState] = useState('maharashtra');
  const [selectedCrop, setSelectedCrop] = useState('rice');

  const marketData = {
    maharashtra: {
      rice: [
        { mandi: 'Pune APMC', price: 2150, change: 5.2, lastUpdated: '2 hours ago' },
        { mandi: 'Mumbai APMC', price: 2280, change: -1.5, lastUpdated: '1 hour ago' },
        { mandi: 'Nashik APMC', price: 2100, change: 3.8, lastUpdated: '3 hours ago' },
        { mandi: 'Aurangabad APMC', price: 2050, change: 2.1, lastUpdated: '2 hours ago' }
      ],
      wheat: [
        { mandi: 'Pune APMC', price: 2350, change: 4.2, lastUpdated: '1 hour ago' },
        { mandi: 'Mumbai APMC', price: 2420, change: -2.1, lastUpdated: '2 hours ago' },
        { mandi: 'Nashik APMC', price: 2280, change: 6.5, lastUpdated: '1 hour ago' },
        { mandi: 'Aurangabad APMC', price: 2190, change: 1.8, lastUpdated: '3 hours ago' }
      ],
      cotton: [
        { mandi: 'Pune APMC', price: 5800, change: 8.5, lastUpdated: '2 hours ago' },
        { mandi: 'Mumbai APMC', price: 6100, change: -3.2, lastUpdated: '1 hour ago' },
        { mandi: 'Nashik APMC', price: 5650, change: 5.1, lastUpdated: '4 hours ago' },
        { mandi: 'Aurangabad APMC', price: 5900, change: 2.8, lastUpdated: '2 hours ago' }
      ]
    }
  };

  const priceHistory = [
    { date: '2024-01-01', price: 2000 },
    { date: '2024-01-08', price: 2050 },
    { date: '2024-01-15', price: 2120 },
    { date: '2024-01-22', price: 2080 },
    { date: '2024-01-29', price: 2150 },
  ];

  const marketNews = [
    {
      title: 'Rice prices surge due to monsoon delays',
      summary: 'Delayed monsoon in key rice-producing states has led to a 15% increase in rice prices across major mandis.',
      time: '2 hours ago',
      impact: 'positive'
    },
    {
      title: 'Government announces minimum support price increase',
      summary: 'MSP for wheat increased by ₹200 per quintal, benefiting farmers across the country.',
      time: '5 hours ago',
      impact: 'positive'
    },
    {
      title: 'Export demand for cotton remains strong',
      summary: 'International demand for Indian cotton continues to drive prices upward in domestic markets.',
      time: '1 day ago',
      impact: 'positive'
    }
  ];

  const getCurrentPrices = () => {
    return marketData[selectedState as keyof typeof marketData]?.[selectedCrop as keyof typeof marketData.maharashtra] || [];
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

  return (
    <div className="min-h-screen warm-gradient">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Market Insights 📈
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time market prices, trends, and analysis to help you make informed selling decisions
          </p>
        </div>

        {/* Filters */}
        <Card className="earth-card p-6 mb-8 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="sugarcane">Sugarcane</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Price Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="earth-card p-6 text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-bold text-foreground">₹{getAveragePrice()}</div>
            <div className="text-sm text-muted-foreground">Average Price/Quintal</div>
          </Card>

          <Card className="earth-card p-6 text-center">
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
          </Card>

          <Card className="earth-card p-6 text-center">
            <div className="text-3xl mb-2">🏪</div>
            <div className="text-2xl font-bold text-foreground">{getCurrentPrices().length}</div>
            <div className="text-sm text-muted-foreground">Active Mandis</div>
          </Card>

          <Card className="earth-card p-6 text-center">
            <div className="text-3xl mb-2">⏰</div>
            <div className="text-2xl font-bold text-foreground">Live</div>
            <div className="text-sm text-muted-foreground">Real-time Data</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Prices */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Current Mandi Prices</h2>
            <div className="space-y-4">
              {getCurrentPrices().map((mandi, index) => (
                <Card key={index} className="earth-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{mandi.mandi}</h3>
                      <p className="text-sm text-muted-foreground">Updated {mandi.lastUpdated}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">₹{mandi.price}</div>
                      <div className={`text-sm font-medium flex items-center ${
                        mandi.change > 0 ? 'text-success' : 'text-destructive'
                      }`}>
                        <span className="mr-1">{mandi.change > 0 ? '↗' : '↘'}</span>
                        {Math.abs(mandi.change)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1 bg-cta">
                      Set Price Alert
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Market News & Analysis */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Market News & Analysis</h2>
            <div className="space-y-4">
              {marketNews.map((news, index) => (
                <Card key={index} className="earth-card p-6">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">
                      {news.impact === 'positive' ? '📈' : news.impact === 'negative' ? '📉' : '📰'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">{news.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{news.summary}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{news.time}</span>
                        <Button size="sm" variant="ghost">
                          Read More
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="earth-card p-6 mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <span>🔔</span>
                  <span>Set Alerts</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <span>📊</span>
                  <span>Price History</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <span>📈</span>
                  <span>Analytics</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <span>🌍</span>
                  <span>Export Data</span>
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Price Insights */}
        <Card className="earth-card p-8 mt-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">AI Market Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-success/10 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🎯</span>
                <h3 className="font-semibold text-foreground">Best Selling Time</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Based on historical data and current trends
              </p>
              <p className="font-bold text-success">Next 2-3 weeks</p>
            </div>

            <div className="bg-cta/10 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">💡</span>
                <h3 className="font-semibold text-foreground">Recommendation</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                AI suggests holding or selling
              </p>
              <p className="font-bold text-cta">Hold for better prices</p>
            </div>

            <div className="bg-primary/10 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">📍</span>
                <h3 className="font-semibold text-foreground">Best Mandi</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Highest price in your area
              </p>
              <p className="font-bold text-primary">Mumbai APMC</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Market;