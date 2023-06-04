import { createBrowserRouter } from "react-router-dom";
import { Root, Home, StudySpot, SignUp, Login } from "./routes";
import {
  getStudySpotByIdLoader,
  getStudySpotsLoader,
} from "./services/loaders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: getStudySpotsLoader,
      },
      {
        path: "/studyspot/:id",
        element: <StudySpot />,
        loader: getStudySpotByIdLoader,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      { path: "/login", element: <Login /> },
    ],
  },
]);
