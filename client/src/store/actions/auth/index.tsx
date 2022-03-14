import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "../../types";

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
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
