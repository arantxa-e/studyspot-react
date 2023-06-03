import MapboxMap, { Source, Layer, NavigationControl } from "react-map-gl";
import { GeoJSONSourceOptions } from "mapbox-gl";
import { useGetStudySpotsQuery } from "../services/studySpot";
import { useState, useEffect } from "react";
import { LayerProps } from "react-map-gl";
import { Search } from ".";

export const Map = () => {
  const { data } = useGetStudySpotsQuery();
  const [geojson, setGeojson] = useState<GeoJSONSourceOptions["data"]>();
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 10,
  });
  const layerStyle: LayerProps = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
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
      <Search setViewState={setViewState} />
      <MapboxMap
        reuseMaps
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {geojson && (
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
        )}
        <NavigationControl showZoom position="top-right" />
      </MapboxMap>
    </>
  );
};
