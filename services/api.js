import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Post", "User", "DBStatus", "Driver"],
  endpoints: (builder) => ({
    // ============================================ DB Connection Check ============================================

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

    // ============================================ Driver Endpoints ============================================

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

    // ============================================ Cab Endpoints ============================================

    getCabs: builder.query({
      query: () => "/cabs",
      providesTags: ["Cab"],
      transformResponse: (response) => response.cabs,
    }),

    createCab: builder.mutation({
      query: (cab) => ({
        url: "/cabs",
        method: "POST",
        body: cab,
      }),
      invalidatesTags: ["Cab"],
    }),

    updateCab: builder.mutation({
      query: ({ id, ...cab }) => ({
        url: "/cabs",
        method: "PUT",
        body: { id, ...cab },
      }),
      invalidatesTags: ["Cab"],
    }),

    deleteCab: builder.mutation({
      query: (id) => ({
        url: "/cabs",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Cab"],
    }),
  }),
});

export const {
  // DB Connection Check
  useGetDbStatusQuery,
  useGetPostsQuery,
  useGetPostQuery,

  // Driver Endpoints
  useGetDriversQuery,
  useCreateDriverMutation,
  useUpdateDriverMutation,
  useDeleteDriverMutation,

  // Cab Endpoints
  useGetCabsQuery,
  useCreateCabMutation,
  useUpdateCabMutation,
  useDeleteCabMutation,
} = api;
