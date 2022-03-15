import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "../../types";

const initialState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated: null,
  loading: true,
};

const auth = (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      if (typeof window !== "undefined") {
        localStorage.setItem("token", payload.token);
      }
      return { ...state, ...payload, isAuthenticated: true, loading: false };
    case LOGIN_FAIL:
    case AUTH_ERROR:
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
      return { ...state, token: null, isAuthenticated: false, loading: false };
    default:
      return state;
  }
};

export default auth;
