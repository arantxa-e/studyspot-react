import { Navbar } from "../layout";
import { Container } from "@mui/material";
import { Outlet } from "react-router";

export const Root = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
