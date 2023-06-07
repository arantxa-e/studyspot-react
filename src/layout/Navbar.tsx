import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { logoutPartnerAction, logoutUserAction } from "../services";
import { selectCurrentPartner, selectCurrentUser } from "../reducers";

export const Navbar = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const partner = useAppSelector(selectCurrentPartner);
  const loggedInUser = user || partner;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/">StudySpot</NavLink>
          </Typography>

          {loggedInUser && (
            <>
              <Typography>{user?.displayName ?? partner?.company}</Typography>
              <Button
                color="inherit"
                onClick={user ? logoutUserAction : logoutPartnerAction}
              >
                Log Out
              </Button>
            </>
          )}

          {!loggedInUser && (
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
