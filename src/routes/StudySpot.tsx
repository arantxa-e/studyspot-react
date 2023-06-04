import { useLoaderData } from "react-router";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import { StudySpot as StudySpotInterface } from "../types";

export const StudySpot = () => {
  const data = useLoaderData() as StudySpotInterface;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h1">
          {data.name}
        </Typography>
        {data.hasFreeWifi && <Chip label="Free Wifi" />}

        <Typography variant="body2" component="div">
          {data.phoneNumber} • {data.location.properties.address}
        </Typography>

        <Divider />
        <Typography variant="body1">{data.description}</Typography>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary">
          Save
        </Button>
      </CardActions>
    </Card>
  );
};
