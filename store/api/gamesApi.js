import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const mockGames = [
  {
    id: 1,
    title: 'Valorant',
    category: 'FPS',
    status: 'active',
    players: 1250,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?w=300'
  },
  {
    id: 2,
    title: 'Counter-Strike 2',
    category: 'FPS',
    status: 'active',
    players: 980,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?w=300'
  },
  {
    id: 3,
    title: 'League of Legends',
    category: 'MOBA',
    status: 'maintenance',
    players: 2100,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?w=300'
  }
];

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/games' }),
  tagTypes: ['Game'],
  endpoints: (builder) => ({
    getGames: builder.query({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { data: mockGames };
      },
      providesTags: ['Game'],
    }),
  }),
});

export const { useGetGamesQuery } = gamesApi;