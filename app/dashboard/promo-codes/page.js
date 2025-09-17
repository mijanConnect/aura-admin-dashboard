'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useGetPromoCodesQuery } from '@/store/api/promoApi';
import { Plus, Search, Percent, DollarSign, Calendar, Users } from 'lucide-react';

export default function PromoCodesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: promoCodes = [], isLoading, error } = useGetPromoCodesQuery();

  const filteredCodes = promoCodes.filter(code =>
    code.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const variants = {
      active: 'default',
      expired: 'secondary',
      inactive: 'outline'
    };
    const colors = {
      active: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800',
      inactive: 'bg-gray-100 text-gray-800'
    };
    return { variant: variants[status], color: colors[status] };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Promo Code Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Promo Code
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Percent className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {promoCodes.filter(code => code.status === 'active').length}
            </p>
            <p className="text-sm text-gray-600">Active Codes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">
              {promoCodes.reduce((sum, code) => sum + code.usageCount, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Uses</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">$12,450</p>
            <p className="text-sm text-gray-600">Savings Given</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">
              {promoCodes.filter(code => code.status === 'expired').length}
            </p>
            <p className="text-sm text-gray-600">Expired</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search promo codes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Promo Codes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && (
          [...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))
        )}
        
        {filteredCodes.map((code) => {
          const statusBadge = getStatusBadge(code.status);
          const usagePercentage = (code.usageCount / code.maxUsage) * 100;
          
          return (
            <Card key={code.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-mono">{code.code}</CardTitle>
                  <Badge className={statusBadge.color}>
                    {code.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-medium">
                    {code.type === 'percentage' ? `${code.discount}%` : `$${code.discount}`}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Usage:</span>
                    <span className="font-medium">
                      {code.usageCount} / {code.maxUsage}
                    </span>
                  </div>
                  <Progress value={usagePercentage} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Expires:</span>
                  <span className="font-medium">
                    {new Date(code.expiryDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Edit
                  </Button>
                  <Button size="sm" className="flex-1">
                    Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}