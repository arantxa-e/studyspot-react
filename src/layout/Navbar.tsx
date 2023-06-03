import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export const Navbar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            StudySpot
          </Typography>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
    </>
  );
};
