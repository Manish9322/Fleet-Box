import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Post", "User", "DBStatus", "Driver", "Cab", "Booking", "Auth"],
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

    // ============================================ Users Endpoints ============================================

    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
      transformResponse: (response) => response.users,
    }),

    createUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ id, ...user }) => ({
        url: "/users",
        method: "PUT",
        body: { id, ...user },
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: "/users",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["User"],
    }),

    // ============================================ Booking Endpoints ============================================

    getBookings: builder.query({
      query: () => "/bookings",
      providesTags: ["Booking"],
      transformResponse: (response) => response.bookings,
    }),

    createBooking: builder.mutation({
      query: (booking) => ({
        url: "/bookings",
        method: "POST",
        body: booking,
      }),
      invalidatesTags: ["Booking"],
    }),

    updateBooking: builder.mutation({
      query: ({ id, ...booking }) => ({
        url: "/bookings",
        method: "PUT",
        body: { id, ...booking },
      }),
      invalidatesTags: ["Booking"],
    }),

    deleteBooking: builder.mutation({
      query: (id) => ({
        url: "/bookings",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Booking"],
    }),

    // ============================================ Auth Endpoints ============================================

    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/signin",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    getCurrentUser: builder.query({
      query: () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("No user ID found in local storage");
        }
        return `/users?id=${userId}`;
      },
      providesTags: ["Auth"],
      transformResponse: (response) => response.user,
    }),

    signInAdmin: builder.mutation({
      query: (credentials) => ({
        url: "/admin/signin",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    getCurrentAdmin: builder.query({
      query: () => {
        const adminId = localStorage.getItem("adminId");
        if (!adminId) {
          throw new Error("No admin ID found in local storage");
        }
        return `/users?id=${adminId}`;
      },
      providesTags: ["Auth"],
      transformResponse: (response) => response.user,
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

  // User Endpoints
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,

  // Booking Endpoints
  useGetBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,

  // Auth Endpoints
  useSignInMutation,
  useGetCurrentUserQuery,
  useSignInAdminMutation,
  useGetCurrentAdminQuery,

} = api;
