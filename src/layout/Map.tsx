import MapboxMap, { Marker, NavigationControl } from "react-map-gl";
import React from "react";
import { LocationOption, MapViewState, StudySpot } from "../types";
import MarkerIcon from "../assets/mapbox-icon.png";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLoaderData, useNavigate } from "react-router";

export const Map: React.FC<{
  selectedLocation?: LocationOption;
  viewState: MapViewState;
  setViewState: React.Dispatch<React.SetStateAction<MapViewState>>;
}> = ({ selectedLocation, viewState, setViewState }) => {
  const data = useLoaderData() as Array<StudySpot>;
  const navigate = useNavigate();

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
        return (
          <Marker
            key={studySpot.name}
            longitude={studySpot.location.geometry.coordinates[0]}
            latitude={studySpot.location.geometry.coordinates[1]}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`studyspot/${studySpot._id}`)}
          >
            <img
              src={MarkerIcon}
              alt={studySpot.name}
              style={{ width: "50px", height: "50px" }}
            />
          </Marker>
        );
      })}

      {selectedLocation && (
        <Marker
          longitude={selectedLocation.geometry.coordinates[0]}
          latitude={selectedLocation.geometry.coordinates[1]}
          style={{ cursor: "pointer" }}
        >
          <img
            src={MarkerIcon}
            alt="Selected location"
            style={{ width: "50px", height: "50px" }}
          />
        </Marker>
      )}

      <NavigationControl showZoom position="top-right" />
    </MapboxMap>
  );
};
