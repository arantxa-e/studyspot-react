import MapboxMap, { Marker, NavigationControl } from "react-map-gl";
import { useGetStudySpotsQuery } from "../services/studySpot";
import React, { useState, useEffect } from "react";
import { LocationOption } from "../types";
import MarkerIcon from "../assets/mapbox-icon.png";
import "mapbox-gl/dist/mapbox-gl.css";

export const Map: React.FC<{ selectedLocation: LocationOption }> = ({
  selectedLocation,
}) => {
  const { data } = useGetStudySpotsQuery();

  const [viewState, setViewState] = useState({
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
    <>
      <MapboxMap
        reuseMaps
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {data?.map((studySpot) => {
          return (
            <Marker
              key={studySpot.name}
              longitude={studySpot.location.geometry.coordinates[0]}
              latitude={studySpot.location.geometry.coordinates[1]}
              style={{ cursor: "pointer" }}
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
    </>
  );
};
