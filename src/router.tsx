import { createBrowserRouter } from "react-router-dom";
import {
  Root,
  Home,
  StudySpot,
  Login,
  UserSignUp,
  PartnerSignUp,
} from "./routes";
import {
  getStudySpotByIdLoader,
  getStudySpotsLoader,
  createUserAction,
  loginUserAction,
  createPartnerAction,
  loginPartnerAction,
  addReviewAction,
  getPartnerLoader,
} from "./services";
import { PartnerDashboard } from "./routes/PartnerDashboard";

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
        element: <Login />,
        action: loginUserAction,
      },
      {
        path: "/partner/login",
        element: <Login />,
        action: loginPartnerAction,
      },
      {
        path: "/partner/sign-up",
        element: <PartnerSignUp />,
        action: createPartnerAction,
      },
      {
        path: "/partner/dashboard",
        element: <PartnerDashboard />,
        loader: getPartnerLoader,
      },
    ],
  },
]);
