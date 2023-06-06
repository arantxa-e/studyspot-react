import { Marker, MarkerProps } from "react-map-gl";
import { StudySpot } from "../types";
import CurrentLocationMarker from "../assets/mapbox-icon.png";
import { useNavigate } from "react-router";
import { styled } from "@mui/material";

interface MapMarkerProps extends Partial<MarkerProps> {
  currentLocation?: boolean;
  studySpot?: StudySpot;
}

const MarkerImage = styled("img")({
  width: 50,
  height: 50,
  border: "3px solid black",
  borderRadius: "100%",
  padding: 5,
  background: "#FFFFFF",
});

export const MapMarker: React.FC<MapMarkerProps> = ({
  studySpot,
  currentLocation = false,
  longitude = studySpot?.location.geometry.coordinates[0],
  latitude = studySpot?.location.geometry.coordinates[1],
  ...props
}) => {
  const navigate = useNavigate();

  return (
    <Marker
      {...props}
      style={{ cursor: studySpot ? "pointer" : "inherit" }}
      onClick={() =>
        studySpot ? navigate(`studyspot/${studySpot._id}`) : null
      }
      longitude={longitude}
      latitude={latitude}
    >
      {currentLocation && <MarkerImage src={CurrentLocationMarker} />}
      {studySpot && <MarkerImage src={studySpot?.logo} alt={studySpot?.name} />}
    </Marker>
  );
};
