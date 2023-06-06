import { Typography, Link } from "@mui/material";
import { Review, ReviewForm } from ".";
import { useState } from "react";
import { Review as ReviewInterface } from "../types";

export const Reviews: React.FC<{ reviews?: ReviewInterface[] }> = ({
  reviews,
}) => {
  const [displayRatingForm, setDisplayRatingForm] = useState<boolean>(false);
  const toggleDisplayRatingForm = () =>
    setDisplayRatingForm(!displayRatingForm);

  return (
    <>
      <Typography variant="h6" component="h2">
        Reviews
      </Typography>

      <Link component="button" onClick={toggleDisplayRatingForm}>
        {displayRatingForm ? "Cancel" : "Add review"}
      </Link>

      {displayRatingForm && <ReviewForm />}

      {reviews?.map((review) => (
        <Review review={review} />
      ))}

      {!reviews?.length && "No reviews yet."}
    </>
  );
};
