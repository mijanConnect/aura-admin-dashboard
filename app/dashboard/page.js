"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetDashboardDataQuery } from "@/store/api/dashboardApi";
import {
  Users,
  Calendar,
  DollarSign,
  Gamepad2,
  Ticket,
  Store,
} from "lucide-react";

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <p
              className={`text-xs ${
                trend > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend > 0 ? "↗" : "↘"} {Math.abs(trend)}%
            </p>
          )}
        </div>
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const { data: dashboardData, isLoading, error } = useGetDashboardDataQuery();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading dashboard data</p>
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const recentActivities = dashboardData?.recentActivities || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <Badge variant="secondary" className="text-sm">
          Live Data
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers?.toLocaleString()}
          icon={Users}
          trend={12}
        />
        <StatCard
          title="Active Events"
          value={stats.activeEvents}
          icon={Calendar}
          trend={8}
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue?.toLocaleString()}`}
          icon={DollarSign}
          trend={15}
        />
        <StatCard
          title="Active Games"
          value={stats.activeGames}
          icon={Gamepad2}
          trend={5}
        />
        <StatCard
          title="Promo Codes"
          value={stats.promoCodes}
          icon={Ticket}
          trend={-3}
        />
        <StatCard
          title="Shop Items"
          value={stats.shopItems}
          icon={Store}
          trend={7}
        />
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "user_registered"
                      ? "bg-green-500"
                      : activity.type === "event_created"
                      ? "bg-blue-500"
                      : activity.type === "purchase"
                      ? "bg-purple-500"
                      : "bg-yellow-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
