import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StudySpot } from "../types/studyspot";

const baseUrl = import.meta.env.VITE_STUDYSPOT_API_BASE_URL;

export const studySpotApi = createApi({
  reducerPath: "studySpotApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getStudySpots: builder.query<Array<StudySpot>, void>({
      query: () => `/studyspots`,
    }),
  }),
});

export const { useGetStudySpotsQuery } = studySpotApi;
