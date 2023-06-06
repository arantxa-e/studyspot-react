import { ActionFunctionArgs, redirect } from "react-router";
import { store } from "../store";
import { api } from "./api";
import { User } from "../types/user";
import { setCredentials } from "../reducers/authSlice";

export const createUserAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const user = await store
    .dispatch(api.endpoints.createUser.initiate(formData as Partial<User>))
    .unwrap();

  store.dispatch(setCredentials(user));

  return redirect(`/`);
};

export const loginUserAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const user = await store
    .dispatch(api.endpoints.loginUser.initiate(formData as Partial<User>))
    .unwrap();

  store.dispatch(setCredentials(user));

  return redirect(`/`);
};

export const logoutUserAction = async () => {
  await store.dispatch(api.endpoints.logoutUser.initiate()).unwrap();

  store.dispatch(setCredentials({ user: undefined, token: undefined }));

  return redirect(`/`);
};
