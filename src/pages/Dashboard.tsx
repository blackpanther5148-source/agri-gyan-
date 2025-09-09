import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [recentRecommendations, setRecentRecommendations] = useState<any[]>([]);
  const [recentDetections, setRecentDetections] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
      fetchUserData(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate('/auth');
          return;
        }
        setUser(session.user);
        fetchUserData(session.user.id);
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserData = async (userId: string) => {
    // Fetch user profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    setProfile(profileData);

    // Fetch recent recommendations
    const { data: recommendations } = await supabase
      .from('crop_recommendations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(3);
    
    setRecentRecommendations(recommendations || []);

    // Fetch recent disease detections
    const { data: detections } = await supabase
      .from('disease_detections')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(3);
    
    setRecentDetections(detections || []);
  };

  const quickActions = [
    {
      title: 'Get Crop Recommendations',
      description: 'AI-powered crop suggestions based on your soil and weather',
      icon: '🌱',
      link: '/recommendations',
      color: 'primary'
    },
    {
      title: 'Scan Plant Disease',
      description: 'Upload a photo to detect plant diseases instantly',
      icon: '🔍',
      link: '/disease-scanner',
      color: 'accent'
    },
    {
      title: 'Market Insights',
      description: 'Check current crop prices and market trends',
      icon: '📈',
      link: '/market',
      color: 'cta'
    },
    {
      title: 'Weather Forecast',
      description: 'Get detailed weather predictions for farming',
      icon: '🌤️',
      link: '/weather',
      color: 'success'
    }
  ];

  const farmingTips = [
    {
      title: 'Optimal Planting Time',
      tip: 'Plant your Kharif crops after the first good monsoon shower for better germination rates.',
      icon: '⏰'
    },
    {
      title: 'Soil Health Check',
      tip: 'Test your soil pH every 6 months. Most crops thrive in slightly acidic to neutral pH (6.0-7.0).',
      icon: '🧪'
    },
    {
      title: 'Water Management',
      tip: 'Use drip irrigation to save water and ensure consistent moisture levels for your crops.',
      icon: '💧'
    }
  ];

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen warm-gradient">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, {profile?.full_name || 'Farmer'}! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Here's your farming dashboard with personalized insights and recommendations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="earth-card p-6 text-center">
            <div className="text-3xl mb-2">🌾</div>
            <div className="text-2xl font-bold text-foreground">{recentRecommendations.length}</div>
            <div className="text-sm text-muted-foreground">Crop Recommendations</div>
          </Card>
          
          <Card className="earth-card p-6 text-center">
            <div className="text-3xl mb-2">🔍</div>
            <div className="text-2xl font-bold text-foreground">{recentDetections.length}</div>
            <div className="text-sm text-muted-foreground">Disease Scans</div>
          </Card>
          
          <Card className="earth-card p-6 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-success">87%</div>
            <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
          </Card>
          
          <Card className="earth-card p-6 text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-bold text-cta">₹2.5L</div>
            <div className="text-sm text-muted-foreground">Estimated Savings</div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <Card className="earth-card p-6 hover-glow transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="text-4xl mb-4">{action.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                  <Button className={`w-full bg-${action.color}`} size="sm">
                    Get Started
                  </Button>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentRecommendations.length > 0 ? (
                recentRecommendations.map((rec, index) => (
                  <Card key={index} className="earth-card p-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">🌱</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">Crop Recommendation</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(rec.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="earth-card p-6 text-center">
                  <div className="text-4xl mb-4">🌱</div>
                  <p className="text-muted-foreground">No recent activity. Start by getting crop recommendations!</p>
                  <Link to="/recommendations">
                    <Button className="mt-4 bg-primary">Get Started</Button>
                  </Link>
                </Card>
              )}
            </div>
          </div>

          {/* Farming Tips */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Today's Farming Tips</h2>
            <div className="space-y-4">
              {farmingTips.map((tip, index) => (
                <Card key={index} className="earth-card p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{tip.icon}</div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">{tip.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tip.tip}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;