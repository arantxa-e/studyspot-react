import {
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Grid,
  CardActionArea,
  Rating,
} from "@mui/material";
import { StudySpot as StudySpotInterface } from "../types";
import { Logo, BusinessHours, Reviews } from ".";
import { useNavigate } from "react-router";

const Details: React.FC<StudySpotInterface> = (data) => {
  return (
    <CardContent>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Logo src={data.logo} />
        </Grid>

        <Grid item>
          <Grid container>
            <Grid item>
              <Typography variant="h5" component="h1">
                {data.name}
              </Typography>
            </Grid>
            <Grid item>
              <Rating name="read-only" value={data.rating} readOnly />
            </Grid>
            <Grid item>
              <Typography>{data.rating} / 5</Typography>
            </Grid>
          </Grid>
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
        <Details {...data} />
      ) : (
        <CardActionArea
          onClick={() => navigate(`/studyspot/${data._id}`)}
          disableRipple
        >
          <Details {...data} />
        </CardActionArea>
      )}
      <CardContent>
        {extended && (
          <>
            <BusinessHours hours={data.hours} />
            <Divider />
            <Reviews reviews={data.reviews} />
          </>
        )}
      </CardContent>
    </Card>
  );
};
