import axios from "axios";
import setAuthToken from "src/utils/setAuthToken";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "../../types";

// Login
export const loadUser = () => async (dispatch: any) => {
  if (typeof window !== "undefined" && localStorage.token) {
    setAuthToken(localStorage.token);
    try {
      await axios.get("/api/auth");
      dispatch({ type: USER_LOADED });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  }
};

// Login User
export const login =
  (email: string, password: string) => async (dispatch: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/api/auth", body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
