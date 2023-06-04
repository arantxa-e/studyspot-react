import { useLoaderData } from "react-router";
import { StudySpot as StudySpotInterface } from "../types";
import { StudySpotCard } from "../layout";

export const StudySpot = () => {
  const data = useLoaderData() as StudySpotInterface;

  return (
    <>
      <StudySpotCard data={data} />
    </>
  );
};
