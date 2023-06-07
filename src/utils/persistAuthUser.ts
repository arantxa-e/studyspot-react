import decodeToken, { JwtPayload } from "jwt-decode";
import { AuthenticatedUser } from "../types";
import { setUserCredentials } from "../reducers";
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
          setUserCredentials({ user: undefined, token: undefined })
        );
      } else {
        return store.dispatch(setUserCredentials(user));
      }
    }
  }
};
