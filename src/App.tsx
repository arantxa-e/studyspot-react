import { RouterProvider } from "react-router";
import { router } from "./router";
import { ThemeProvider, createTheme } from "@mui/material";
import { persistAuthUser } from "./utils/persistAuthUser";
import { useEffect } from "react";

const theme = createTheme({});

function App() {
  useEffect(() => {
    persistAuthUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
