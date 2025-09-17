import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const mockPromoCodes = [
  {
    id: 1,
    code: 'WELCOME2024',
    discount: 20,
    type: 'percentage',
    status: 'active',
    usageCount: 145,
    maxUsage: 500,
    expiryDate: '2024-12-31'
  },
  {
    id: 2,
    code: 'NEWUSER10',
    discount: 10,
    type: 'fixed',
    status: 'active',
    usageCount: 89,
    maxUsage: 1000,
    expiryDate: '2024-06-30'
  },
  {
    id: 3,
    code: 'EXPIRED2023',
    discount: 15,
    type: 'percentage',
    status: 'expired',
    usageCount: 234,
    maxUsage: 300,
    expiryDate: '2023-12-31'
  }
];

export const promoApi = createApi({
  reducerPath: 'promoApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/promo' }),
  tagTypes: ['PromoCode'],
  endpoints: (builder) => ({
    getPromoCodes: builder.query({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { data: mockPromoCodes };
      },
      providesTags: ['PromoCode'],
    }),
  }),
});

export const { useGetPromoCodesQuery } = promoApi;