'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Mic, 
  Camera, 
  Settings, 
  Users, 
  Clock, 
  Shield,
  Maximize
} from 'lucide-react';

export default function VideoCallSettingsPage() {
  const [settings, setSettings] = useState({
    allowVideoRecording: true,
    allowScreenSharing: true,
    maxParticipants: 50,
    defaultMuteOnJoin: false,
    enableWaitingRoom: true,
    allowBreakoutRooms: true,
    maxCallDuration: 120, // minutes
    enableChatDuringCall: true,
    requirePassword: false,
    autoStartRecording: false
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const callStats = [
    { label: 'Active Calls', value: 12, icon: Video, color: 'text-green-600' },
    { label: 'Total Participants', value: 245, icon: Users, color: 'text-blue-600' },
    { label: 'Avg Call Duration', value: '45 min', icon: Clock, color: 'text-purple-600' },
    { label: 'Recordings Today', value: 8, icon: Camera, color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Video Call Settings</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Advanced
          </Button>
          <Button>Save Changes</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {callStats.map((stat, index) => (
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

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Video className="h-5 w-5 mr-2" />
            General Call Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Maximum Participants</Label>
              <Input
                id="maxParticipants"
                type="number"
                value={settings.maxParticipants}
                onChange={(e) => handleSettingChange('maxParticipants', parseInt(e.target.value))}
                min="2"
                max="1000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxCallDuration">Max Call Duration (minutes)</Label>
              <Input
                id="maxCallDuration"
                type="number"
                value={settings.maxCallDuration}
                onChange={(e) => handleSettingChange('maxCallDuration', parseInt(e.target.value))}
                min="5"
                max="480"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Default Mute on Join</Label>
                <p className="text-sm text-gray-600">Participants join with microphone muted</p>
              </div>
              <Switch
                checked={settings.defaultMuteOnJoin}
                onCheckedChange={(checked) => handleSettingChange('defaultMuteOnJoin', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Waiting Room</Label>
                <p className="text-sm text-gray-600">Host must admit participants</p>
              </div>
              <Switch
                checked={settings.enableWaitingRoom}
                onCheckedChange={(checked) => handleSettingChange('enableWaitingRoom', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Screen Sharing</Label>
                <p className="text-sm text-gray-600">Participants can share their screens</p>
              </div>
              <Switch
                checked={settings.allowScreenSharing}
                onCheckedChange={(checked) => handleSettingChange('allowScreenSharing', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Breakout Rooms</Label>
                <p className="text-sm text-gray-600">Host can create separate discussion rooms</p>
              </div>
              <Switch
                checked={settings.allowBreakoutRooms}
                onCheckedChange={(checked) => handleSettingChange('allowBreakoutRooms', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recording & Security Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="h-5 w-5 mr-2" />
              Recording Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Video Recording</Label>
                <p className="text-sm text-gray-600">Enable call recording feature</p>
              </div>
              <Switch
                checked={settings.allowVideoRecording}
                onCheckedChange={(checked) => handleSettingChange('allowVideoRecording', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Start Recording</Label>
                <p className="text-sm text-gray-600">Automatically record all calls</p>
              </div>
              <Switch
                checked={settings.autoStartRecording}
                onCheckedChange={(checked) => handleSettingChange('autoStartRecording', checked)}
              />
            </div>

            <div className="pt-4">
              <Label>Recording Storage Location</Label>
              <Input className="mt-2" placeholder="Cloud Storage Path" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Require Password</Label>
                <p className="text-sm text-gray-600">Password protection for calls</p>
              </div>
              <Switch
                checked={settings.requirePassword}
                onCheckedChange={(checked) => handleSettingChange('requirePassword', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Chat During Call</Label>
                <p className="text-sm text-gray-600">Allow text messaging in calls</p>
              </div>
              <Switch
                checked={settings.enableChatDuringCall}
                onCheckedChange={(checked) => handleSettingChange('enableChatDuringCall', checked)}
              />
            </div>

            <div className="pt-4">
              <Label>Encryption Level</Label>
              <div className="flex items-center mt-2">
                <Badge variant="default">AES-256 Enabled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call Quality Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Maximize className="h-5 w-5 mr-2" />
            Video Quality & Bandwidth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Video Quality</Label>
              <select className="w-full p-2 border rounded-md">
                <option>HD (720p)</option>
                <option>Full HD (1080p)</option>
                <option>4K (2160p)</option>
                <option>Auto (Adaptive)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>Audio Quality</Label>
              <select className="w-full p-2 border rounded-md">
                <option>Standard</option>
                <option>High</option>
                <option>Music (Stereo)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>Bandwidth Limit</Label>
              <select className="w-full p-2 border rounded-md">
                <option>Unlimited</option>
                <option>1 Mbps</option>
                <option>2 Mbps</option>
                <option>5 Mbps</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}