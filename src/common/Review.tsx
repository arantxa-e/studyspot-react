import { Typography, Grid, Rating } from "@mui/material";
import { Review as ReviewInterface } from "../types";

export const Review: React.FC<{ review: ReviewInterface }> = ({ review }) => {
  return (
    <>
      <Grid container>
        <Grid item>
          <Typography fontStyle="bold">{review.displayName}</Typography>
        </Grid>
        <Grid item>
          <Rating name="read-only" value={review.rating} readOnly />
        </Grid>
        <Grid item>
          <Typography>{review.rating} / 5</Typography>
        </Grid>
      </Grid>
      <div>
        <Typography>{review.content}</Typography>
      </div>
    </>
  );
};
