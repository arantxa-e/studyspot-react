import { Map, Search } from "../layout";
import { useState, useEffect } from "react";
import { LocationOption, MapViewState } from "../types";

export const Home = () => {
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
      <Search
        setSelectedLocation={setSelectedLocation}
        setViewState={setViewState}
      />
      <Map
        viewState={viewState}
        setViewState={setViewState}
        selectedLocation={selectedLocation}
      />
    </div>
  );
};
