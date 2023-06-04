import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StudySpot } from "../types/studyspot";
import { User } from "../types/user";

const baseUrl = import.meta.env.VITE_STUDYSPOT_API_BASE_URL;

export const studySpotApi = createApi({
  reducerPath: "studySpotApi",
  baseQuery: fetchBaseQuery({ baseUrl }),

  endpoints: (builder) => ({
    getStudySpots: builder.query<Array<StudySpot>, void>({
      query: () => `/studyspots`,
    }),
    getStudySpotById: builder.query<StudySpot, string>({
      query: (id) => `/studyspots/${id}`,
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (payload) => ({ url: "/user", method: "post", body: payload }),
    }),
  }),
});

export const {
  useGetStudySpotsQuery,
  useGetStudySpotByIdQuery,
  useCreateUserMutation,
} = studySpotApi;
