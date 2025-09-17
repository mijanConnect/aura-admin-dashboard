'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useGetShopItemsQuery } from '@/store/api/shopApi';
import { Plus, Search, Package, DollarSign, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function ShopManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: shopItems = [], isLoading, error } = useGetShopItemsQuery();

  const filteredItems = shopItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockBadge = (stock) => {
    if (stock > 50) return { variant: 'default', color: 'bg-green-100 text-green-800' };
    if (stock > 10) return { variant: 'secondary', color: 'bg-yellow-100 text-yellow-800' };
    return { variant: 'destructive', color: 'bg-red-100 text-red-800' };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Shop Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{shopItems.length}</p>
            <p className="text-sm text-gray-600">Total Products</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">
              ${shopItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">Total Value</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {shopItems.filter(item => item.stock < 20).length}
            </p>
            <p className="text-sm text-gray-600">Low Stock</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && (
          [...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))
        )}
        
        {filteredItems.map((item) => {
          const stockBadge = getStockBadge(item.stock);
          
          return (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <Badge 
                  className={`absolute top-4 right-4 ${stockBadge.color}`}
                >
                  {item.stock} in stock
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-green-600">
                    ${item.price}
                  </div>
                  <Badge variant="outline">{item.category}</Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>Status: {item.status}</span>
                  <span>Stock: {item.stock}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Edit
                  </Button>
                  <Button size="sm" className="flex-1">
                    View Sales
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