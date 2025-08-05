import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Post", "User", "DBStatus", "Driver"],
  endpoints: (builder) => ({
    getDbStatus: builder.query({
      query: () => "/test-connection",
      providesTags: ["DBStatus"],
    }),
    getPosts: builder.query({
      query: () => "posts",
      providesTags: ["Post"],
    }),
    getPost: builder.query({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    getDrivers: builder.query({
      query: () => "/drivers",
      providesTags: ["Driver"],
      transformResponse: (response) => response.drivers,
    }),
    createDriver: builder.mutation({
      query: (driver) => ({
        url: "/drivers",
        method: "POST",
        body: driver,
      }),
      invalidatesTags: ["Driver"],
    }),
    updateDriver: builder.mutation({
      query: ({ id, ...driver }) => ({
        url: "/drivers",
        method: "PUT",
        body: { id, ...driver },
      }),
      invalidatesTags: ["Driver"],
    }),
    deleteDriver: builder.mutation({
      query: (id) => ({
        url: "/drivers",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Driver"],
    }),
  }),
});

export const {
  useGetDbStatusQuery,
  useGetPostsQuery,
  useGetPostQuery,
  useGetDriversQuery,
  useCreateDriverMutation,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
} = api;