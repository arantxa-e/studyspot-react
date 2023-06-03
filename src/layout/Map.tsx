import MapboxMap, { Source, Layer, NavigationControl } from "react-map-gl";
import { GeoJSONSourceOptions } from "mapbox-gl";
import { useGetStudySpotsQuery } from "../services/studySpot";
import { useState, useEffect } from "react";
import { LayerProps } from "react-map-gl";
import { Search } from ".";
import { LocationOption } from "../types";

export const Map = () => {
  const { data } = useGetStudySpotsQuery();
  const [geojson, setGeojson] = useState<GeoJSONSourceOptions["data"]>();
  const [selectedLocation, setSelectedLocation] = useState<LocationOption>();
  useState<GeoJSONSourceOptions["data"]>();

  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 14,
  });

  const studySpotStyles: LayerProps = {
    id: "studySpotStyles",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  };

  const selectedLocationStyles: LayerProps = {
    id: "selectedLocationStyles",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#FF0000",
    },
  };

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

  useEffect(() => {
    if (data) {
      setGeojson({
        type: "FeatureCollection" as const,
        features: data?.map((studySpot) => studySpot.location),
      });
    }
  }, [data]);

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
        {geojson && (
          <Source id="studySpots" type="geojson" data={geojson}>
            <Layer {...studySpotStyles} />
          </Source>
        )}

        {selectedLocation && (
          <Source
            id="selectedLocation"
            type="geojson"
            data={selectedLocation.geometry}
          >
            <Layer {...selectedLocationStyles} />
          </Source>
        )}
        <NavigationControl showZoom position="top-right" />
      </MapboxMap>
    </>
  );
};
