import { useLoaderData } from "react-router";
import { Partner } from "../types";
import { Typography } from "@mui/material";

export const PartnerDashboard = () => {
  const partner = useLoaderData() as Partner;

  return (
    <Typography variant="h5" component="h1">
      {partner?.company} Dashboard
    </Typography>
  );
};
