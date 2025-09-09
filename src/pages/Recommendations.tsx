import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@supabase/supabase-js';

const Recommendations = () => {
  const [user, setUser] = useState<User | null>(null);
  const [crops, setCrops] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    soilType: '',
    soilPh: '',
    irrigationAvailable: false,
    previousCrop: '',
    location: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    fetchCrops();
    fetchRecommendations();
  }, []);

  const fetchCrops = async () => {
    const { data, error } = await supabase
      .from('crops')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching crops:', error);
    } else {
      setCrops(data || []);
    }
  };

  const fetchRecommendations = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('crop_recommendations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching recommendations:', error);
    } else {
      setRecommendations(data || []);
    }
  };

  const generateRecommendations = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to get recommendations.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simple recommendation algorithm based on soil and season
      const suitableCrops = crops.filter(crop => {
        const phMatch = formData.soilPh ? 
          (parseFloat(formData.soilPh) >= crop.soil_ph_min && parseFloat(formData.soilPh) <= crop.soil_ph_max) : 
          true;
        
        const waterMatch = formData.irrigationAvailable ? 
          crop.water_requirement !== 'high' : 
          crop.water_requirement === 'low';
        
        return phMatch && waterMatch;
      }).slice(0, 5);

      // Create mock recommendations with scores
      const mockRecommendations = suitableCrops.map((crop, index) => ({
        crop_name: crop.name,
        suitability_score: Math.floor(Math.random() * 20) + 80, // 80-100
        yield_prediction: Math.floor(Math.random() * 5) + 3, // 3-8 tons/ha
        profit_estimate: Math.floor(Math.random() * 50000) + 30000, // 30k-80k
        risk_factors: ['Weather dependency', 'Market volatility'],
        benefits: ['High yield potential', 'Good market demand']
      }));

      // Save to database
      const { error } = await supabase
        .from('crop_recommendations')
        .insert({
          user_id: user.id,
          soil_ph: parseFloat(formData.soilPh) || null,
          soil_type: formData.soilType,
          irrigation_available: formData.irrigationAvailable,
          previous_crop: formData.previousCrop,
          recommended_crops: mockRecommendations
        });

      if (error) throw error;

      fetchRecommendations();
      toast({
        title: "Recommendations Generated!",
        description: "Your personalized crop recommendations are ready.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCropRecommendationCard = (rec: any) => {
    const recommendedCrops = rec.recommended_crops || [];
    
    return recommendedCrops.map((crop: any, index: number) => (
      <Card key={index} className="earth-card p-6 hover-glow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl">🌾</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{crop.crop_name}</h3>
              <p className="text-sm text-muted-foreground">Recommended Crop</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-success">{crop.suitability_score}%</div>
            <div className="text-sm text-muted-foreground">Suitability</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-card-soft p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Expected Yield</div>
            <div className="text-lg font-semibold text-foreground">{crop.yield_prediction} t/ha</div>
          </div>
          <div className="bg-card-soft p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Profit Estimate</div>
            <div className="text-lg font-semibold text-cta">₹{(crop.profit_estimate / 1000).toFixed(0)}K</div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Benefits</h4>
            <div className="flex flex-wrap gap-2">
              {crop.benefits?.map((benefit: string, i: number) => (
                <span key={i} className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Risk Factors</h4>
            <div className="flex flex-wrap gap-2">
              {crop.risk_factors?.map((risk: string, i: number) => (
                <span key={i} className="px-2 py-1 bg-destructive/10 text-destructive text-xs rounded-full">
                  {risk}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Button className="w-full mt-4 bg-primary" size="sm">
          View Detailed Plan
        </Button>
      </Card>
    ));
  };

  return (
    <div className="min-h-screen sky-gradient">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI Crop Recommendations 🌱
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get personalized crop suggestions based on your soil conditions, climate, and market trends
          </p>
        </div>

        {/* Input Form */}
        <Card className="earth-card p-8 mb-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Tell us about your field</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Soil Type
              </label>
              <Select value={formData.soilType} onValueChange={(value) => setFormData({...formData, soilType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clay">Clay</SelectItem>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="loamy">Loamy</SelectItem>
                  <SelectItem value="black">Black Cotton</SelectItem>
                  <SelectItem value="red">Red Soil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Soil pH (optional)
              </label>
              <Input
                type="number"
                step="0.1"
                min="4"
                max="9"
                value={formData.soilPh}
                onChange={(e) => setFormData({...formData, soilPh: e.target.value})}
                placeholder="e.g., 6.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Previous Crop (optional)
              </label>
              <Input
                value={formData.previousCrop}
                onChange={(e) => setFormData({...formData, previousCrop: e.target.value})}
                placeholder="e.g., Rice, Wheat"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Location
              </label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="e.g., Pune, Maharashtra"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.irrigationAvailable}
                  onChange={(e) => setFormData({...formData, irrigationAvailable: e.target.checked})}
                  className="rounded border-muted"
                />
                <span className="text-sm font-medium text-foreground">Irrigation facility available</span>
              </label>
            </div>
          </div>

          <Button
            onClick={generateRecommendations}
            disabled={loading || !user}
            className="w-full mt-6 bg-cta hover:bg-cta/90"
            size="lg"
          >
            {loading ? 'Analyzing...' : 'Get AI Recommendations'}
          </Button>

          {!user && (
            <p className="text-center text-muted-foreground mt-4">
              Please <a href="/auth" className="text-primary hover:underline">sign in</a> to get recommendations
            </p>
          )}
        </Card>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Your Recommendations</h2>
            <div className="space-y-8">
              {recommendations.map((rec, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-foreground">
                      Generated on {new Date(rec.created_at).toLocaleDateString()}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getCropRecommendationCard(rec)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {recommendations.length === 0 && user && (
          <Card className="earth-card p-12 text-center">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No recommendations yet</h3>
            <p className="text-muted-foreground">Fill out the form above to get your first AI-powered crop recommendations!</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Recommendations;