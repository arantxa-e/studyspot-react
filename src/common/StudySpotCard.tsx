import {
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Grid,
  CardActionArea,
} from "@mui/material";
import { StudySpot as StudySpotInterface } from "../types";
import { Logo, BusinessHours } from ".";
import { useNavigate } from "react-router";

const renderDetails = (data: StudySpotInterface) => {
  return (
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
  );
};

export const StudySpotCard: React.FC<{
  data: StudySpotInterface;
  extended?: boolean;
}> = ({ data, extended = false }) => {
  const navigate = useNavigate();

  return (
    <Card>
      {extended ? (
        renderDetails(data)
      ) : (
        <CardActionArea
          onClick={() => navigate(`/studyspot/${data._id}`)}
          disableRipple
        >
          {renderDetails(data)}
        </CardActionArea>
      )}
      <CardContent>
        {extended && (
          <>
            <Divider />
            <BusinessHours hours={data.hours} />
          </>
        )}
      </CardContent>
    </Card>
  );
};
