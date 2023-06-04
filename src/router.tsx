import { createBrowserRouter } from "react-router-dom";
import { Root, Home, StudySpot, SignUp, Login } from "./routes";
import {
  getStudySpotByIdLoader,
  getStudySpotsLoader,
  createUserAction,
} from "./services";

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
        action: createUserAction,
      },
      { path: "/login", element: <Login /> },
    ],
  },
]);
