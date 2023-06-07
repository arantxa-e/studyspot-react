import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { logoutUserAction } from "../services";

export const Navbar = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/">StudySpot</NavLink>
          </Typography>

          {user ? (
            <>
              <Typography>{user.displayName}</Typography>
              <Button color="inherit" onClick={logoutUserAction}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/user/sign-up")}>
                Sign Up
              </Button>
              <Button color="inherit" onClick={() => navigate("/user/login")}>
                Log In
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
