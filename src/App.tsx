import { RouterProvider } from "react-router";
import { router } from "./router";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
