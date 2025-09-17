import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    name: 'John Admin',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=50',
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'user123',
    name: 'Jane User',
    role: 'user',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=50',
  },
];

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth',
    prepareHeaders: (headers, { getState }) => {
      // Safe access to state even in server components
      const token = getState()?.auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: async ({ email, password }) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const user = mockUsers.find(
          (u) => u.email === email && u.password === password
        );
        
        if (user) {
          const token = `mock-token-${user.id}-${Date.now()}`;
          return {
            data: {
              user: { id: user.id, email: user.email, name: user.name, role: user.role, avatar: user.avatar },
              token,
            },
          };
        } else {
          return { error: { status: 401, data: { message: 'Invalid credentials' } } };
        }
      },
    }),
    getCurrentUser: builder.query({
      queryFn: async (_, { getState }) => {
        const { auth } = getState();
        if (auth.token && auth.user) {
          return { data: auth.user };
        }
        return { error: { status: 401, data: { message: 'Not authenticated' } } };
      },
    }),
  }),
});

export const { useLoginMutation, useGetCurrentUserQuery } = authApi;