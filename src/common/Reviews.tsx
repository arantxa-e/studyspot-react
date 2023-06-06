import { Typography, Link } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Review, ReviewForm } from ".";
import { useState } from "react";
import { Review as ReviewInterface } from "../types";
import { useAppSelector } from "../hooks";

export const Reviews: React.FC<{ reviews?: ReviewInterface[] }> = ({
  reviews,
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const [displayRatingForm, setDisplayRatingForm] = useState<boolean>(false);
  const toggleDisplayRatingForm = () =>
    setDisplayRatingForm(!displayRatingForm);

  return (
    <>
      <Typography variant="h6" component="h2">
        Reviews
      </Typography>

      {!user && (
        <>
          <NavLink to="/sign-up">Sign up</NavLink> or{" "}
          <NavLink to="/login">login</NavLink> to leave a review.
        </>
      )}

      {user && (
        <Link component="button" onClick={toggleDisplayRatingForm}>
          {displayRatingForm && user ? "Cancel" : "Add review"}
        </Link>
      )}

      {displayRatingForm && <ReviewForm />}

      {reviews?.map((review) => (
        <Review review={review} key={review._id} />
      ))}

      {!reviews?.length && "No reviews yet."}
    </>
  );
};
