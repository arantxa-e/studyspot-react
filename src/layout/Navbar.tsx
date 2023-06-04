import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/">StudySpot</NavLink>
          </Typography>

          <Button color="inherit" onClick={() => navigate("/sign-up")}>
            Sign Up
          </Button>
          <Button color="inherit" onClick={() => navigate("/login")}>
            Log In
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};
