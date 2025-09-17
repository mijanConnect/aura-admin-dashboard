'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useGetEventsQuery } from '@/store/api/eventsApi';
import { Plus, Search, Users, Calendar, Trophy } from 'lucide-react';
import Image from 'next/image';

export default function EventManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: events = [], isLoading, error } = useGetEventsQuery();

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const variants = {
      active: 'default',
      upcoming: 'secondary',
      completed: 'outline'
    };
    return variants[status] || 'secondary';
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search events..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
              <Badge 
                variant={getStatusBadge(event.status)}
                className="absolute top-4 right-4"
              >
                {event.status}
              </Badge>
            </div>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{event.description}</p>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {event.participants} participants
                </div>
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 mr-2" />
                  {event.prize} prize pool
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1">
                  Edit
                </Button>
                <Button size="sm" className="flex-1">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms.' : 'Create your first event to get started.'}
            </p>
            {!searchTerm && (
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}