'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useGetGamesQuery } from '@/store/api/gamesApi';
import { Plus, Search, Users, Star, Settings } from 'lucide-react';
import Image from 'next/image';

export default function GameManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: games = [], isLoading, error } = useGetGamesQuery();

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const variants = {
      active: 'default',
      maintenance: 'secondary',
      inactive: 'outline'
    };
    const colors = {
      active: 'bg-green-500',
      maintenance: 'bg-yellow-500',
      inactive: 'bg-gray-500'
    };
    return { variant: variants[status] || 'secondary', color: colors[status] || 'bg-gray-500' };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Game Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Game
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search games..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Filter by Category</Button>
          </div>
        </CardContent>
      </Card>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => {
          const statusBadge = getStatusBadge(game.status);
          return (
            <Card key={game.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant={statusBadge.variant} className="capitalize">
                    {game.status}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{game.title}</h3>
                  <Badge variant="outline">{game.category}</Badge>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {game.players.toLocaleString()} players
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                      {game.rating}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                  <Button size="sm" className="flex-1">
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}