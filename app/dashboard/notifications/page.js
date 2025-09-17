'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  Send, 
  Users, 
  Calendar, 
  Target,
  MessageSquare,
  Smartphone,
  Globe,
  Clock
} from 'lucide-react';

export default function PushNotificationsPage() {
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    targetAudience: 'all',
    scheduledTime: '',
    type: 'general'
  });

  const stats = [
    { label: 'Total Sent', value: 15420, icon: Send, color: 'text-blue-600' },
    { label: 'Delivered', value: 14285, icon: Bell, color: 'text-green-600' },
    { label: 'Opened', value: 8951, icon: MessageSquare, color: 'text-purple-600' },
    { label: 'Click Rate', value: '12.4%', icon: Target, color: 'text-orange-600' }
  ];

  const recentNotifications = [
    {
      id: 1,
      title: 'New Tournament Starting',
      message: 'Join the Valorant Championship now!',
      sent: '2024-03-15 14:30',
      delivered: 2456,
      opened: 1523,
      type: 'event'
    },
    {
      id: 2,
      title: 'Maintenance Notice',
      message: 'Scheduled maintenance from 2-4 AM',
      sent: '2024-03-14 18:00',
      delivered: 3421,
      opened: 2145,
      type: 'system'
    },
    {
      id: 3,
      title: 'New Features Available',
      message: 'Check out the latest updates!',
      sent: '2024-03-13 12:00',
      delivered: 4123,
      opened: 2876,
      type: 'update'
    }
  ];

  const handleInputChange = (field, value) => {
    setNotification(prev => ({ ...prev, [field]: value }));
  };

  const getTypeBadge = (type) => {
    const variants = {
      event: 'bg-blue-100 text-blue-800',
      system: 'bg-red-100 text-red-800',
      update: 'bg-green-100 text-green-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return variants[type] || variants.general;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Push Notifications</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Send Now
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create Notification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Create Notification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Notification Title</Label>
              <Input
                id="title"
                value={notification.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter notification title"
                maxLength={50}
              />
              <p className="text-xs text-gray-500">{notification.title.length}/50 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={notification.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Enter notification message"
                maxLength={200}
                rows={3}
              />
              <p className="text-xs text-gray-500">{notification.message.length}/200 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Notification Type</Label>
              <select 
                id="type"
                value={notification.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="general">General</option>
                <option value="event">Event</option>
                <option value="system">System</option>
                <option value="update">Update</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <select 
                id="audience"
                value={notification.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Users</option>
                <option value="premium">Premium Users</option>
                <option value="active">Active Users</option>
                <option value="inactive">Inactive Users</option>
                <option value="new">New Users</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduledTime">Schedule Time (Optional)</Label>
              <Input
                id="scheduledTime"
                type="datetime-local"
                value={notification.scheduledTime}
                onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Send Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4" />
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-600">Send notifications to mobile devices</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <div>
                    <Label>Web Notifications</Label>
                    <p className="text-sm text-gray-600">Show notifications in web browser</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <div>
                    <Label>In-App Notifications</Label>
                    <p className="text-sm text-gray-600">Show notifications within the app</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-4">Notification Frequency</h4>
              <div className="space-y-2">
                <Label htmlFor="frequency">Maximum per day</Label>
                <select id="frequency" className="w-full p-2 border rounded-md">
                  <option value="unlimited">Unlimited</option>
                  <option value="5">5 notifications</option>
                  <option value="3">3 notifications</option>
                  <option value="1">1 notification</option>
                </select>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-4">Quiet Hours</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quiet-start">Start Time</Label>
                  <Input id="quiet-start" type="time" defaultValue="22:00" />
                </div>
                <div>
                  <Label htmlFor="quiet-end">End Time</Label>
                  <Input id="quiet-end" type="time" defaultValue="08:00" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentNotifications.map((notif) => (
              <div key={notif.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{notif.title}</h4>
                    <Badge className={getTypeBadge(notif.type)}>
                      {notif.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                  <p className="text-xs text-gray-500">Sent: {notif.sent}</p>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">{notif.delivered}</span> delivered
                  </div>
                  <div className="text-sm">
                    <span className="text-blue-600 font-medium">{notif.opened}</span> opened
                  </div>
                  <div className="text-xs text-gray-500">
                    {((notif.opened / notif.delivered) * 100).toFixed(1)}% rate
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}