import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const mockEvents = [
  {
    id: 1,
    title: 'Gaming Tournament 2024',
    description: 'Annual gaming championship with multiple games',
    date: '2024-03-15',
    status: 'active',
    participants: 245,
    prize: '$10,000',
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?w=300'
  },
  {
    id: 2,
    title: 'Valorant Championship',
    description: 'Professional Valorant tournament',
    date: '2024-03-22',
    status: 'upcoming',
    participants: 128,
    prize: '$5,000',
    image: 'https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?w=300'
  },
  {
    id: 3,
    title: 'CS:GO Masters',
    description: 'Counter-Strike Global Offensive tournament',
    date: '2024-02-28',
    status: 'completed',
    participants: 64,
    prize: '$3,000',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?w=300'
  }
];

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/events' }),
  tagTypes: ['Event'],
  endpoints: (builder) => ({
    getEvents: builder.query({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { data: mockEvents };
      },
      providesTags: ['Event'],
    }),
    createEvent: builder.mutation({
      queryFn: async (eventData) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const newEvent = {
          id: Date.now(),
          ...eventData,
          participants: 0,
          status: 'upcoming'
        };
        mockEvents.push(newEvent);
        return { data: newEvent };
      },
      invalidatesTags: ['Event'],
    }),
  }),
});

export const { useGetEventsQuery, useCreateEventMutation } = eventsApi;