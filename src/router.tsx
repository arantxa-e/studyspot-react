import { createBrowserRouter } from "react-router-dom";
import { Root, Home, StudySpot, UserSignUp, UserLogin } from "./routes";
import {
  getStudySpotByIdLoader,
  getStudySpotsLoader,
  createUserAction,
  loginUserAction,
  addReviewAction,
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
        action: addReviewAction,
      },
      {
        path: "/user/sign-up",
        element: <UserSignUp />,
        action: createUserAction,
      },
      {
        path: "/user/login",
        element: <UserLogin />,
        action: loginUserAction,
      },
    ],
  },
]);
