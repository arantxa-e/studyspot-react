import {
  Button,
  TextField,
  Grid,
  Typography,
  Rating,
  Box,
} from "@mui/material";
import { Form } from "react-router-dom";
import { useState } from "react";

export const ReviewForm: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  return (
    <Box>
      <Typography component="h3" variant="h6">
        Your review
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Form method="post" noValidate>
          <Grid container spacing={2}>
            <Grid item>
              <Typography fontStyle="bold">Rating</Typography>
            </Grid>
            <Grid item>
              <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="content"
                required
                fullWidth
                multiline
                id="content"
                label="Review"
                autoFocus
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit Review
          </Button>
        </Form>
      </Box>
    </Box>
  );
};
