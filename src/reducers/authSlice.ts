import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthenticatedUser } from "../types";
import type { RootState } from "../store";

const slice = createSlice({
  name: "auth",
  initialState: {
    user: undefined,
    token: undefined,
  } as Partial<AuthenticatedUser>,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<Partial<AuthenticatedUser>>
    ) => {
      state.user = user;
      state.token = token;
    },
  },
});

export const { setCredentials } = slice.actions;

export const authReducer = slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
