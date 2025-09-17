'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  FileText, 
  Shield, 
  AlertTriangle, 
  Users, 
  MessageSquare,
  Eye,
  Edit,
  Save
} from 'lucide-react';

const guidelineCategories = [
  {
    id: 1,
    title: 'Community Behavior',
    description: 'Rules for respectful interaction within the community',
    lastUpdated: '2024-03-10',
    status: 'active',
    violations: 45
  },
  {
    id: 2,
    title: 'Gaming Conduct',
    description: 'Fair play and anti-cheat guidelines',
    lastUpdated: '2024-03-08',
    status: 'active',
    violations: 12
  },
  {
    id: 3,
    title: 'Content Guidelines',
    description: 'Rules for user-generated content and media sharing',
    lastUpdated: '2024-03-05',
    status: 'active',
    violations: 23
  },
  {
    id: 4,
    title: 'Privacy Policy',
    description: 'Data protection and privacy guidelines',
    lastUpdated: '2024-02-28',
    status: 'under_review',
    violations: 2
  }
];

export default function CommunityGuidelinesPage() {
  const [selectedGuideline, setSelectedGuideline] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [guidelineContent, setGuidelineContent] = useState('');

  const stats = [
    { label: 'Total Guidelines', value: 4, icon: FileText, color: 'text-blue-600' },
    { label: 'Active Violations', value: 82, icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Reports Today', value: 15, icon: Shield, color: 'text-yellow-600' },
    { label: 'Compliance Rate', value: '94.2%', icon: Users, color: 'text-green-600' }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      active: { variant: 'default', color: 'bg-green-100 text-green-800' },
      under_review: { variant: 'secondary', color: 'bg-yellow-100 text-yellow-800' },
      draft: { variant: 'outline', color: 'bg-gray-100 text-gray-800' }
    };
    return variants[status] || variants.draft;
  };

  const handleEdit = (guideline) => {
    setSelectedGuideline(guideline);
    setGuidelineContent(getGuidelineContent(guideline.title));
    setIsEditing(true);
  };

  const getGuidelineContent = (title) => {
    const content = {
      'Community Behavior': `1. Respect all community members
2. No harassment, bullying, or discrimination
3. Keep conversations constructive and helpful
4. Report inappropriate behavior
5. Use appropriate language in all communications
6. No spam or excessive self-promotion
7. Respect moderator decisions
8. Follow platform-specific rules`,
      
      'Gaming Conduct': `1. Play fairly and avoid cheating
2. No exploitation of game bugs or glitches  
3. Respect opponents and teammates
4. No griefing or intentional sabotage
5. Use anti-cheat software as required
6. Report suspicious activity
7. Follow tournament rules strictly
8. Maintain good sportsmanship`,
      
      'Content Guidelines': `1. No offensive or inappropriate content
2. Respect intellectual property rights
3. No explicit or adult content
4. Keep content relevant to gaming
5. Use appropriate tags and descriptions
6. No malicious links or downloads
7. Respect privacy of others
8. Follow copyright guidelines`,
      
      'Privacy Policy': `1. Personal data protection measures
2. Information collection practices
3. Data usage and sharing policies
4. User rights and control options
5. Security measures in place
6. Contact information for privacy concerns
7. Updates to privacy policy
8. Compliance with regulations`
    };
    return content[title] || 'Guideline content not available.';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Community Guidelines</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            New Guideline
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Guidelines List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Guidelines List</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {guidelineCategories.map((guideline) => {
                const statusBadge = getStatusBadge(guideline.status);
                return (
                  <div
                    key={guideline.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedGuideline?.id === guideline.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedGuideline(guideline)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm">{guideline.title}</h3>
                      <Badge className={statusBadge.color}>
                        {guideline.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{guideline.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Updated: {guideline.lastUpdated}</span>
                      <span className="text-red-600">{guideline.violations} violations</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Guideline Editor */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {selectedGuideline ? selectedGuideline.title : 'Select a Guideline'}
                </CardTitle>
                {selectedGuideline && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                    {isEditing && (
                      <Button size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {selectedGuideline ? (
                <div className="space-y-4">
                  {!isEditing ? (
                    <div className="prose max-w-none">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm">
                          {getGuidelineContent(selectedGuideline.title)}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Guideline Title</Label>
                        <Input
                          id="title"
                          value={selectedGuideline.title}
                          placeholder="Enter guideline title"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          value={selectedGuideline.description}
                          placeholder="Enter guideline description"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="content">Guideline Content</Label>
                        <Textarea
                          id="content"
                          value={guidelineContent}
                          onChange={(e) => setGuidelineContent(e.target.value)}
                          placeholder="Enter detailed guideline content"
                          rows={10}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="active" />
                          <Label htmlFor="active">Active Guideline</Label>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">
                          {selectedGuideline.violations} violations reported
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Select a guideline from the list to view or edit</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Violations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Recent Violations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { user: 'User123', guideline: 'Community Behavior', severity: 'High', date: '2024-03-15 14:30' },
              { user: 'GamerPro', guideline: 'Gaming Conduct', severity: 'Medium', date: '2024-03-15 12:15' },
              { user: 'PlayerOne', guideline: 'Content Guidelines', severity: 'Low', date: '2024-03-15 10:45' },
              { user: 'NewUser456', guideline: 'Community Behavior', severity: 'Medium', date: '2024-03-15 09:20' }
            ].map((violation, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    violation.severity === 'High' ? 'bg-red-500' :
                    violation.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="font-medium">{violation.user}</p>
                    <p className="text-sm text-gray-600">Violated: {violation.guideline}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={violation.severity === 'High' ? 'destructive' : 'secondary'}
                    className={
                      violation.severity === 'High' ? 'bg-red-100 text-red-800' :
                      violation.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }
                  >
                    {violation.severity}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">{violation.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}