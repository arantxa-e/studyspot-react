import { ActionFunctionArgs, redirect } from "react-router";
import { store } from "../store";
import { studySpotApi } from "./studySpot";
import { User } from "../types/user";
import { setCredentials } from "../reducers/authSlice";

export const createUserAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const user = await store
    .dispatch(
      studySpotApi.endpoints.createUser.initiate(formData as Partial<User>)
    )
    .unwrap();

  store.dispatch(setCredentials(user));

  return redirect(`/`);
};
