import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthenticatedUser, User, StudySpot } from "../types";
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

  endpoints: (builder) => ({
    getStudySpots: builder.query<Array<StudySpot>, void>({
      query: () => `/studyspots`,
    }),
    getStudySpotById: builder.query<StudySpot, string>({
      query: (id) => `/studyspots/${id}`,
    }),
    createUser: builder.mutation<AuthenticatedUser, Partial<User>>({
      query: (payload) => ({
        url: "/user",
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
} = api;