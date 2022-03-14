import { stat } from "fs";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "../../types";

const initialState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
  isAuthenticated: null,
  loading: true,
};

const auth = (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case LOGIN_SUCCESS:
      if (typeof window !== "undefined") {
        localStorage.setItem("token", payload.token);
      }
      return { ...state, ...payload, isAuthenticated: true, loading: false };
    case LOGIN_FAIL:
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
      return { ...state, token: null, isAuthenticated: false, loading: false };
    default:
      return state;
  }
};

export default auth;
