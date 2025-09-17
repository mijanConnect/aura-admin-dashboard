import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Mock dashboard data
const mockDashboardData = {
  stats: {
    totalUsers: 15420,
    activeEvents: 12,
    totalRevenue: 45230.50,
    activeGames: 8,
    promoCodes: 25,
    shopItems: 156
  },
  recentActivities: [
    {
      id: 1,
      type: 'user_registered',
      message: 'New user John Doe registered',
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      type: 'event_created',
      message: 'Gaming Tournament 2024 event created',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 3,
      type: 'purchase',
      message: 'User purchased Aura+ Premium Package',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: 4,
      type: 'game_updated',
      message: 'Valorant Championship game updated',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
    },
  ],
  chartData: [
    { name: 'Jan', users: 400, revenue: 2400 },
    { name: 'Feb', users: 300, revenue: 1398 },
    { name: 'Mar', users: 200, revenue: 9800 },
    { name: 'Apr', users: 278, revenue: 3908 },
    { name: 'May', users: 189, revenue: 4800 },
    { name: 'Jun', users: 239, revenue: 3800 },
  ]
};

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/dashboard' }),
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { data: mockDashboardData };
      },
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;