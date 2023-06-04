import { LoaderFunctionArgs } from "react-router";
import { store } from "../store";
import { api } from "./api";

export const getStudySpotsLoader = async () => {
  const response = await store
    .dispatch(api.endpoints.getStudySpots.initiate())
    .unwrap();
  return response;
};

export const getStudySpotByIdLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  if (!params.id) return;
  const response = await store
    .dispatch(api.endpoints.getStudySpotById.initiate(params.id))
    .unwrap();
  return response;
};
