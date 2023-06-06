import MapboxMap, { NavigationControl } from "react-map-gl";
import React from "react";
import { LocationOption, MapViewState, StudySpot } from "../types";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLoaderData } from "react-router";
import { MapMarker } from "../common/MapMarker";

export const Map: React.FC<{
  selectedLocation?: LocationOption;
  viewState: MapViewState;
  setViewState: React.Dispatch<React.SetStateAction<MapViewState>>;
}> = ({ selectedLocation, viewState, setViewState }) => {
  const data = useLoaderData() as Array<StudySpot>;

  return (
    <MapboxMap
      reuseMaps
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100%", height: "700px" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {data?.map((studySpot) => {
        return <MapMarker key={studySpot._id} studySpot={studySpot} />;
      })}

      {selectedLocation && (
        <MapMarker
          longitude={selectedLocation.geometry.coordinates[0]}
          latitude={selectedLocation.geometry.coordinates[1]}
          currentLocation
        />
      )}

      <NavigationControl showZoom position="top-right" />
    </MapboxMap>
  );
};
