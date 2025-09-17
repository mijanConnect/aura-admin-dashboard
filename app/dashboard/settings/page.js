'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Palette,
  Database,
  Mail,
  Globe,
  Lock
} from 'lucide-react';

export default function SettingsPage() {
  const { user } = useSelector((state) => state.auth);
  const [settings, setSettings] = useState({
    // Profile settings
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    website: '',
    
    // Security settings
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: 30,
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    
    // Appearance settings
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    
    // System settings
    autoBackup: true,
    dataRetention: 90,
    apiAccess: false
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingSections = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: User,
      description: 'Manage your profile information'
    },
    {
      id: 'security',
      title: 'Security',
      icon: Shield,
      description: 'Security and privacy settings'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Notification preferences'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      description: 'Theme and display settings'
    },
    {
      id: 'system',
      title: 'System',
      icon: Database,
      description: 'System and backup settings'
    }
  ];

  const [activeSection, setActiveSection] = useState('profile');

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback className="text-xl">
            {user?.name?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
        <div>
          <Button variant="outline">Change Avatar</Button>
          <p className="text-sm text-gray-600 mt-2">JPG, PNG or GIF (max 2MB)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={settings.name}
            onChange={(e) => handleSettingChange('name', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={settings.email}
            onChange={(e) => handleSettingChange('email', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={settings.bio}
          onChange={(e) => handleSettingChange('bio', e.target.value)}
          placeholder="Tell us about yourself"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          type="url"
          value={settings.website}
          onChange={(e) => handleSettingChange('website', e.target.value)}
          placeholder="https://example.com"
        />
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <Label className="text-base">Two-Factor Authentication</Label>
          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
        </div>
        <Switch
          checked={settings.twoFactorEnabled}
          onCheckedChange={(checked) => handleSettingChange('twoFactorEnabled', checked)}
        />
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <Label className="text-base">Login Notifications</Label>
          <p className="text-sm text-gray-600">Get notified of new login attempts</p>
        </div>
        <Switch
          checked={settings.loginNotifications}
          onCheckedChange={(checked) => handleSettingChange('loginNotifications', checked)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
        <Input
          id="sessionTimeout"
          type="number"
          value={settings.sessionTimeout}
          onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
          min="5"
          max="1440"
        />
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Password Requirements</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Minimum 8 characters</li>
          <li>• Include uppercase and lowercase letters</li>
          <li>• Include at least one number</li>
          <li>• Include at least one special character</li>
        </ul>
      </div>

      <Button className="w-full">Change Password</Button>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5" />
          <div>
            <Label className="text-base">Email Notifications</Label>
            <p className="text-sm text-gray-600">Receive notifications via email</p>
          </div>
        </div>
        <Switch
          checked={settings.emailNotifications}
          onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
        />
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center space-x-3">
          <Bell className="h-5 w-5" />
          <div>
            <Label className="text-base">Push Notifications</Label>
            <p className="text-sm text-gray-600">Receive push notifications</p>
          </div>
        </div>
        <Switch
          checked={settings.pushNotifications}
          onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
        />
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5" />
          <div>
            <Label className="text-base">Marketing Emails</Label>
            <p className="text-sm text-gray-600">Receive promotional and marketing emails</p>
          </div>
        </div>
        <Switch
          checked={settings.marketingEmails}
          onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
        />
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium mb-2 text-blue-900">Notification Types</h4>
        <div className="space-y-2">
          {['System updates', 'Security alerts', 'Event reminders', 'New features', 'Account activity'].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-blue-800">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Theme</Label>
        <div className="flex space-x-4">
          {['light', 'dark', 'auto'].map((theme) => (
            <label key={theme} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="theme"
                value={theme}
                checked={settings.theme === theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
                className="rounded-full"
              />
              <span className="capitalize">{theme}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="language">Language</Label>
        <select
          id="language"
          value={settings.language}
          onChange={(e) => handleSettingChange('language', e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="ja">Japanese</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timezone">Timezone</Label>
        <select
          id="timezone"
          value={settings.timezone}
          onChange={(e) => handleSettingChange('timezone', e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="UTC">UTC</option>
          <option value="America/New_York">Eastern Time</option>
          <option value="America/Los_Angeles">Pacific Time</option>
          <option value="Europe/London">London</option>
          <option value="Asia/Tokyo">Tokyo</option>
        </select>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Display Preferences</h4>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-sm">Compact mode</span>
            <Switch />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm">Show animations</span>
            <Switch defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm">High contrast</span>
            <Switch />
          </label>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <Label className="text-base">Automatic Backup</Label>
          <p className="text-sm text-gray-600">Automatically backup your data</p>
        </div>
        <Switch
          checked={settings.autoBackup}
          onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dataRetention">Data Retention (days)</Label>
        <Input
          id="dataRetention"
          type="number"
          value={settings.dataRetention}
          onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
          min="30"
          max="365"
        />
        <p className="text-sm text-gray-600">How long to keep deleted data before permanent removal</p>
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <Label className="text-base">API Access</Label>
          <p className="text-sm text-gray-600">Enable third-party API access</p>
        </div>
        <Switch
          checked={settings.apiAccess}
          onCheckedChange={(checked) => handleSettingChange('apiAccess', checked)}
        />
      </div>

      <div className="p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-medium mb-2 text-yellow-900">Danger Zone</h4>
        <p className="text-sm text-yellow-800 mb-4">
          These actions cannot be undone. Please proceed with caution.
        </p>
        <div className="space-y-2">
          <Button variant="outline" className="w-full text-yellow-700 border-yellow-300">
            Export All Data
          </Button>
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSettings();
      case 'security': return renderSecuritySettings();
      case 'notifications': return renderNotificationSettings();
      case 'appearance': return renderAppearanceSettings();
      case 'system': return renderSystemSettings();
      default: return renderProfileSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {settingSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                        activeSection === section.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${
                        activeSection === section.id ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <p className={`font-medium ${
                          activeSection === section.id ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {section.title}
                        </p>
                        <p className="text-xs text-gray-600">{section.description}</p>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>
                {settingSections.find(s => s.id === activeSection)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderActiveSection()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}