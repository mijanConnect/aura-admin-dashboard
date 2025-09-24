"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Users,
  DollarSign,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";

const DashboardPage = () => {
  // Sample data for Total Revenue chart
  const revenueData = [
    { month: "Jan", revenue: 70, line: 72 },
    { month: "Feb", revenue: 20, line: 62 },
    { month: "Mar", revenue: 35, line: 74 },
    { month: "Apr", revenue: 25, line: 68 },
    { month: "May", revenue: 40, line: 73 },
    { month: "Jun", revenue: 15, line: 87 },
    { month: "Jul", revenue: 55, line: 98 },
    { month: "Aug", revenue: 18, line: 72 },
    { month: "Sep", revenue: 58, line: 74 },
    { month: "Oct", revenue: 52, line: 76 },
    { month: "Nov", revenue: 88, line: 98 },
    { month: "Dec", revenue: 42, line: 63 },
  ];

  // Sample data for New Sign-ups chart
  const signupData = [
    { month: "Jan", signups: 65, line: 78 },
    { month: "Feb", revenue: 18, line: 60 },
    { month: "Mar", revenue: 28, line: 74 },
    { month: "Apr", revenue: 20, line: 58 },
    { month: "May", revenue: 42, line: 78 },
    { month: "Jun", revenue: 8, line: 87 },
    { month: "Jul", revenue: 58, line: 98 },
    { month: "Aug", revenue: 12, line: 72 },
    { month: "Sep", revenue: 60, line: 74 },
    { month: "Oct", revenue: 52, line: 78 },
    { month: "Nov", revenue: 85, line: 93 },
    { month: "Dec", revenue: 40, line: 63 },
  ];

  return (
    <div className="">
      <div className="">
        {/* Top Row - Revenue Chart and Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Total Revenue Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-500 border-slate-400 text-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white font-medium">
                    Total Revenue
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-slate-400"
                  >
                    MORE
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={revenueData}>
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "white", fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "white", fontSize: 12 }}
                        domain={[0, 100]}
                      />
                      <Bar
                        dataKey="revenue"
                        fill="rgba(255, 255, 255, 0.3)"
                        radius={[2, 2, 0, 0]}
                      />
                      <Line
                        type="monotone"
                        dataKey="line"
                        stroke="#60a5fa"
                        strokeWidth={2}
                        dot={{ fill: "#60a5fa", r: 3 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center mt-4 space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-white opacity-30 rounded-sm"></div>
                    <span>2021</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                    <span>2021</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Cards */}
          <div className="space-y-6 ">
            <Card className="bg-slate-500 border-slate-400 text-white ">
              <CardHeader className="pb-2 mb-10 mt-7">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white font-medium">
                    Statistics
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-slate-400 text-xs"
                  >
                    Last 7 Days
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 mb-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-slate-400 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Users className="w-4 h-4" />
                      <span className="text-xs text-slate-200">Total User</span>
                    </div>
                    <div className="text-xl font-semibold">500</div>
                  </div>
                  <div className="bg-slate-400 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs text-slate-200">
                        Earn From AURA+
                      </span>
                    </div>
                    <div className="text-xl font-semibold">500</div>
                  </div>
                  <div className="bg-slate-400 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <ShoppingBag className="w-4 h-4" />
                      <span className="text-xs text-slate-200">
                        Earn From AP Shop
                      </span>
                    </div>
                    <div className="text-xl font-semibold">2000</div>
                  </div>
                  <div className="bg-slate-400 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-xs text-slate-200">
                        Total Revenue
                      </span>
                    </div>
                    <div className="text-xl font-semibold">530000</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* User Engagement Section */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-white font-medium mb-1">User Engagement</h3>
            <p className="text-slate-300 text-sm">
              An overview of AURA user activity and demographics
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-slate-400"
            >
              Last 24 Hours
            </Button>
            <input
              type="date"
              defaultValue="2025-09-02"
              className="bg-slate-600 text-white border border-slate-400 rounded px-3 py-1 text-sm"
            />
            <input
              type="date"
              defaultValue="2025-09-03"
              className="bg-slate-600 text-white border border-slate-400 rounded px-3 py-1 text-sm"
            />
            <Button size="sm" className="bg-slate-600 hover:bg-slate-700">
              Apply
            </Button>
          </div>
        </div>
        <div className="bg-slate-500 rounded-lg p-4 mb-8">
          {/* AURA+ Subscriptions */}
          <div className="mb-6">
            <h4 className="text-white font-medium mb-3">AURA+ SUBSCRIPTIONS</h4>
            <div className="grid grid-cols-4 gap-4">
              <Card className="bg-slate-400 border-slate-300">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    50000
                  </div>
                  <div className="text-sm text-slate-200">
                    Total Active Users
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-400 border-slate-300">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    14800
                  </div>
                  <div className="text-sm text-slate-200">
                    Daily Active Users (DAU)
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-blue-400 border-blue-300">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    10100
                  </div>
                  <div className="text-sm text-blue-100">
                    Weekly Active Users (WAU)
                  </div>
                  <div className="text-xs text-blue-200 mt-1">
                    Frame 2147226548
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-400 border-slate-300">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    34500
                  </div>
                  <div className="text-sm text-slate-200">
                    Monthly Active Users (MAU)
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* New Sign-ups Chart */}
        <Card className="bg-slate-500 border-slate-400 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-white font-medium">
              New Sign-ups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={signupData}>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "white", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "white", fontSize: 12 }}
                    domain={[0, 100]}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="rgba(255, 255, 255, 0.3)"
                    radius={[2, 2, 0, 0]}
                  />
                  <Line
                    type="monotone"
                    dataKey="line"
                    stroke="#60a5fa"
                    strokeWidth={2}
                    dot={{ fill: "#60a5fa", r: 3 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center mt-4 space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white opacity-30 rounded-sm"></div>
                <span>2021</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                <span>2021</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
