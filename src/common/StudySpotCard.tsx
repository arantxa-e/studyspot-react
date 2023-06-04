import {
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import { StudySpot as StudySpotInterface } from "../types";
import { Logo } from ".";

export const StudySpotCard: React.FC<{ data: StudySpotInterface }> = ({
  data,
}) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Logo src={data.logo} />
          </Grid>

          <Grid item>
            <Typography variant="h5" component="h1">
              {data.name}
            </Typography>
            {data.hasFreeWifi && <Chip label="Free Wifi" />}
            <Typography variant="body2">
              {data.phoneNumber} • {data.address}
            </Typography>
          </Grid>
        </Grid>

        <Divider />
        <Typography variant="body1">{data.description}</Typography>
      </CardContent>
    </Card>
  );
};
