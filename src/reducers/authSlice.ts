import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthenticatedPartner, AuthenticatedUser } from "../types";
import type { RootState } from "../store";

const slice = createSlice({
  name: "auth",
  initialState: {
    user: undefined,
    partner: undefined,
    token: undefined,
  } as Partial<AuthenticatedUser> & Partial<AuthenticatedPartner>,
  reducers: {
    setUserCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<Partial<AuthenticatedUser>>
    ) => {
      state.user = user;
      state.token = token;
    },
    setPartnerCredentials: (
      state,
      {
        payload: { partner, token },
      }: PayloadAction<Partial<AuthenticatedPartner>>
    ) => {
      state.partner = partner;
      state.token = token;
    },
  },
});

export const { setUserCredentials, setPartnerCredentials } = slice.actions;

export const authReducer = slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectCurrentPartner = (state: RootState) => state.auth.partner;
