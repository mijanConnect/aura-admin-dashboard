'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Crown, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  TrendingUp,
  DollarSign,
  Calendar
} from 'lucide-react';

const packageFeatures = [
  { name: 'Premium Gaming Access', included: true },
  { name: 'Exclusive Tournaments', included: true },
  { name: 'Priority Support', included: true },
  { name: 'Advanced Analytics', included: true },
  { name: 'Custom Profile Themes', included: true },
  { name: 'Early Event Access', included: true },
  { name: 'Bonus Rewards', included: true },
  { name: 'Ad-Free Experience', included: true }
];

export default function AuraPackagePage() {
  const [packageSettings, setPackageSettings] = useState({
    monthlyPrice: 19.99,
    yearlyPrice: 199.99,
    isActive: true,
    maxUsers: 10000,
    trialDays: 7,
    autoRenewal: true
  });

  const stats = [
    { label: 'Active Subscribers', value: 2847, icon: Users, color: 'text-blue-600', trend: '+12%' },
    { label: 'Monthly Revenue', value: '$56,829', icon: DollarSign, color: 'text-green-600', trend: '+8%' },
    { label: 'Churn Rate', value: '2.3%', icon: TrendingUp, color: 'text-orange-600', trend: '-0.5%' },
    { label: 'Avg. Subscription', value: '8.4 months', icon: Calendar, color: 'text-purple-600', trend: '+1.2 months' }
  ];

  const handleSettingChange = (key, value) => {
    setPackageSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Crown className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-900">Aura+ Premium Package</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">View Analytics</Button>
          <Button>Save Changes</Button>
        </div>
      </div>

      {/* Package Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    {stat.trend}
                  </p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Package Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Crown className="h-5 w-5 mr-2" />
              Package Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyPrice">Monthly Price ($)</Label>
                <Input
                  id="monthlyPrice"
                  type="number"
                  step="0.01"
                  value={packageSettings.monthlyPrice}
                  onChange={(e) => handleSettingChange('monthlyPrice', parseFloat(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yearlyPrice">Yearly Price ($)</Label>
                <Input
                  id="yearlyPrice"
                  type="number"
                  step="0.01"
                  value={packageSettings.yearlyPrice}
                  onChange={(e) => handleSettingChange('yearlyPrice', parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="trialDays">Free Trial Period (days)</Label>
              <Input
                id="trialDays"
                type="number"
                value={packageSettings.trialDays}
                onChange={(e) => handleSettingChange('trialDays', parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Package Active</Label>
                  <p className="text-sm text-gray-600">Enable Aura+ subscriptions</p>
                </div>
                <Switch
                  checked={packageSettings.isActive}
                  onCheckedChange={(checked) => handleSettingChange('isActive', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto Renewal</Label>
                  <p className="text-sm text-gray-600">Automatically renew subscriptions</p>
                </div>
                <Switch
                  checked={packageSettings.autoRenewal}
                  onCheckedChange={(checked) => handleSettingChange('autoRenewal', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Package Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {packageFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">{feature.name}</span>
                  <div className="flex items-center space-x-2">
                    {feature.included ? (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        ✓ Included
                      </Badge>
                    ) : (
                      <Badge variant="outline">Not Included</Badge>
                    )}
                    <Switch checked={feature.included} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Premium Benefits Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Premium Benefits Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
              <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Exclusive Access</h3>
              <p className="text-sm text-gray-600">VIP tournaments, early event access, and premium game modes</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Priority Support</h3>
              <p className="text-sm text-gray-600">24/7 premium support with dedicated assistance</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <Star className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Enhanced Experience</h3>
              <p className="text-sm text-gray-600">Ad-free experience, custom themes, and bonus rewards</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Subscribers */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Subscribers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'John Smith', email: 'john@example.com', plan: 'Yearly', date: '2024-03-15' },
              { name: 'Emma Wilson', email: 'emma@example.com', plan: 'Monthly', date: '2024-03-14' },
              { name: 'Alex Chen', email: 'alex@example.com', plan: 'Yearly', date: '2024-03-13' },
              { name: 'Sarah Johnson', email: 'sarah@example.com', plan: 'Monthly', date: '2024-03-12' }
            ].map((subscriber, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{subscriber.name}</p>
                  <p className="text-sm text-gray-600">{subscriber.email}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{subscriber.plan}</Badge>
                  <p className="text-sm text-gray-600 mt-1">{subscriber.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}