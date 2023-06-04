import { LoaderFunctionArgs } from "react-router";
import { store } from "../store";
import { studySpotApi } from "./studySpot";

export const getStudySpotsLoader = async () => {
  const response = await store
    .dispatch(studySpotApi.endpoints.getStudySpots.initiate())
    .unwrap();
  return response;
};

export const getStudySpotByIdLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  if (!params.id) return;
  const response = await store
    .dispatch(studySpotApi.endpoints.getStudySpotById.initiate(params.id))
    .unwrap();
  return response;
};
