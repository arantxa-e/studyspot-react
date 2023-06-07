import decodeToken, { JwtPayload } from "jwt-decode";
import { AuthenticatedUser } from "../types";
import { setCredentials } from "../reducers";
import { store } from "../store";

export const persistAuthUser = () => {
  const data = localStorage.getItem("user");

  if (data) {
    const user = JSON.parse(data) as AuthenticatedUser;
    const token = decodeToken<JwtPayload>(user.token);

    if (token) {
      if (token.exp && Date.now() >= token.exp * 1000) {
        localStorage.clear();
        return store.dispatch(
          setCredentials({ user: undefined, token: undefined })
        );
      } else {
        return store.dispatch(setCredentials(user));
      }
    }
  }
};
