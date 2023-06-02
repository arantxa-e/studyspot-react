import MapboxMap, { Source, Layer } from "react-map-gl";
import { GeoJSONSourceOptions } from "mapbox-gl";
import { useGetStudySpotsQuery } from "../services/studySpot";
import { useState, useEffect } from "react";
import { LayerProps } from "react-map-gl";

export const Map = () => {
  const { data, error, isLoading } = useGetStudySpotsQuery();
  const [geojson, setGeojson] = useState<GeoJSONSourceOptions["data"]>();

  const layerStyle: LayerProps = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  };

  useEffect(() => {
    if (data) {
      setGeojson({
        type: "FeatureCollection" as const,
        features: data?.map((studySpot) => studySpot.location),
      });
    }
  }, [data]);

  return (
    <MapboxMap
      reuseMaps
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {geojson && (
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      )}
    </MapboxMap>
  );
};
