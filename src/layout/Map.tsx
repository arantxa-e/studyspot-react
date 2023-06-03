import MapboxMap, { Marker, NavigationControl } from "react-map-gl";
import { useGetStudySpotsQuery } from "../services/studySpot";
import { useState, useEffect } from "react";
import { Search } from ".";
import { LocationOption } from "../types";
import MarkerIcon from "../assets/mapbox-icon.png";
import "mapbox-gl/dist/mapbox-gl.css";

export const Map = () => {
  const { data } = useGetStudySpotsQuery();
  const [selectedLocation, setSelectedLocation] = useState<LocationOption>();

  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 14,
  });

  useEffect(() => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) =>
          setViewState((state) => ({
            ...state,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }))
        );
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Search
        setViewState={setViewState}
        setSelectedLocation={setSelectedLocation}
      />
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
