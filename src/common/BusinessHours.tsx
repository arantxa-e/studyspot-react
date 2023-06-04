import React from "react";
import { StudySpot } from "../types";
import { Grid, Typography } from "@mui/material";

const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const BusinessHours: React.FC<{ hours: StudySpot["hours"] }> = ({
  hours,
}) => {
  return (
    <Grid container>
      {daysOfTheWeek.map((day) => {
        const d = day.toLowerCase() as keyof StudySpot["hours"];
        return (
          <Grid container key={d}>
            <Grid item xs={4} md={2}>
              <Typography fontWeight="bold">{day}</Typography>
            </Grid>
            <Grid item>
              <Typography>
                {hours[d] ? `${hours[d]?.open} - ${hours[d]?.close}` : "Closed"}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};
