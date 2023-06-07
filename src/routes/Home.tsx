import { Map, Search } from "../layout";
import { StudySpotCard } from "../common";
import { useState, useEffect } from "react";
import { LocationOption, MapViewState, StudySpot } from "../types";
import { useLoaderData } from "react-router";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

export const Home = () => {
  const studySpots = useLoaderData() as Array<StudySpot>;

  const [selectedLocation, setSelectedLocation] = useState<
    LocationOption | undefined
  >();

  const [viewState, setViewState] = useState<MapViewState>({
    longitude: -100,
    latitude: 40,
    zoom: 14,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        setViewState((state) => ({
          ...state,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }))
      );
    }
  }, []);

  return (
    <div>
      <Typography>
        Want to add or manage your listing?{" "}
        <NavLink to="/partner/sign-up">Sign up</NavLink> or{" "}
        <NavLink to="/partner/login">login</NavLink> as a partner.
      </Typography>
      <Search
        setSelectedLocation={setSelectedLocation}
        setViewState={setViewState}
      />
      <Map
        viewState={viewState}
        setViewState={setViewState}
        selectedLocation={selectedLocation}
      />
      {studySpots.map((studySpot) => (
        <StudySpotCard key={studySpot._id} data={studySpot} />
      ))}
    </div>
  );
};
