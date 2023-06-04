import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/">StudySpot</NavLink>
          </Typography>

          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
    </>
  );
};
