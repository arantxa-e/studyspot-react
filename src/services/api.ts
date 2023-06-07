import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthenticatedUser, User, Partner, StudySpot, Review } from "../types";
import { RootState } from "../store";

const baseUrl = import.meta.env.VITE_STUDYSPOT_API_BASE_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["StudySpots"],

  endpoints: (builder) => ({
    // studyspot endpoints
    getStudySpots: builder.query<Array<StudySpot>, void>({
      query: () => `/studyspots`,
    }),
    getStudySpotById: builder.query<StudySpot, string>({
      query: (id) => `/studyspots/${id}`,
    }),

    // user endpoints
    createUser: builder.mutation<AuthenticatedUser, Partial<User>>({
      query: (payload) => ({
        url: "/user",
        method: "post",
        body: payload,
      }),
    }),
    loginUser: builder.mutation<AuthenticatedUser, Partial<User>>({
      query: (payload) => ({
        url: "/user/login",
        method: "post",
        body: payload,
      }),
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/user/logout",
        method: "post",
      }),
    }),

    // partner endpoints
    createPartner: builder.mutation<AuthenticatedUser, Partial<Partner>>({
      query: (payload) => ({
        url: "/partner",
        method: "post",
        body: payload,
      }),
    }),
    getPartnerProfile: builder.query<Partner, void>({
      query: () => `/partner/profile`,
    }),
    loginPartner: builder.mutation<AuthenticatedUser, Partial<Partner>>({
      query: (payload) => ({
        url: "/partner/login",
        method: "post",
        body: payload,
      }),
    }),
    logoutPartner: builder.mutation<void, void>({
      query: () => ({
        url: "/partner/logout",
        method: "post",
      }),
    }),

    // review endoints
    addReview: builder.mutation<Review, Partial<Review>>({
      query: (payload) => ({
        url: "/reviews",
        method: "post",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetStudySpotsQuery,
  useGetStudySpotByIdQuery,
  useCreateUserMutation,
  useLogoutUserMutation,
} = api;
