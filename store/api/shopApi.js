import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const mockShopItems = [
  {
    id: 1,
    name: 'Gaming Headset Pro',
    price: 129.99,
    category: 'Hardware',
    stock: 25,
    status: 'available',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?w=300'
  },
  {
    id: 2,
    name: 'RGB Mechanical Keyboard',
    price: 89.99,
    category: 'Hardware',
    stock: 15,
    status: 'available',
    image: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?w=300'
  },
  {
    id: 3,
    name: 'Aura+ Premium Package',
    price: 19.99,
    category: 'Subscription',
    stock: 999,
    status: 'available',
    image: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?w=300'
  }
];

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/shop' }),
  tagTypes: ['ShopItem'],
  endpoints: (builder) => ({
    getShopItems: builder.query({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { data: mockShopItems };
      },
      providesTags: ['ShopItem'],
    }),
  }),
});

export const { useGetShopItemsQuery } = shopApi;