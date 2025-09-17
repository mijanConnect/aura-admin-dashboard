import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    joinDate: "2024-01-15",
    avatar:
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=50",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
    joinDate: "2024-02-20",
    avatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=50",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "moderator",
    status: "inactive",
    joinDate: "2024-01-10",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=50",
  },
];

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/users" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { data: mockUsers };
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
