import { ActionFunctionArgs, redirect } from "react-router";
import { store } from "../store";
import { api } from "./api";
import { User, Partner } from "../types/user";
import {
  setUserCredentials,
  setPartnerCredentials,
} from "../reducers/authSlice";
import { Review } from "../types";

export const createUserAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const user = await store
    .dispatch(api.endpoints.createUser.initiate(formData as Partial<User>))
    .unwrap();

  store.dispatch(setUserCredentials(user));

  return redirect(`/`);
};

export const loginUserAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const user = await store
    .dispatch(api.endpoints.loginUser.initiate(formData as Partial<User>))
    .unwrap();

  store.dispatch(setUserCredentials(user));
  localStorage.setItem("user", JSON.stringify(user));

  return redirect(`/`);
};

export const logoutUserAction = async () => {
  await store.dispatch(api.endpoints.logoutUser.initiate()).unwrap();

  store.dispatch(setUserCredentials({ user: undefined, token: undefined }));
  localStorage.clear();

  return redirect(`/`);
};

export const addReviewAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  if (!params.id) return;

  const formData = await request.formData();
  formData.append("studySpot", params.id);

  return await store
    .dispatch(api.endpoints.addReview.initiate(formData as Partial<Review>))
    .unwrap();
};

export const createPartnerAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const user = await store
    .dispatch(
      api.endpoints.createPartner.initiate(formData as Partial<Partner>)
    )
    .unwrap();

  store.dispatch(setPartnerCredentials(user));

  return redirect(`/partner/dashboard`);
};

export const loginPartnerAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const user = await store
    .dispatch(api.endpoints.loginPartner.initiate(formData as Partial<Partner>))
    .unwrap();

  store.dispatch(setPartnerCredentials(user));
  localStorage.setItem("partner", JSON.stringify(user));

  return redirect(`/partner/dashboard`);
};

export const logoutPartnerAction = async () => {
  await store.dispatch(api.endpoints.logoutPartner.initiate()).unwrap();

  store.dispatch(
    setPartnerCredentials({ partner: undefined, token: undefined })
  );
  localStorage.clear();

  return redirect(`/`);
};
