import axios from "axios";
import { GET_BIO, BIO_ERROR, UPDATE_BIO } from "src/store/types";

export const getBio = () => async (dispatch: any) => {
  try {
    const res = await axios.get("api/bio");
    dispatch({
      type: GET_BIO,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: BIO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateBio = (formData: any) => async (dispatch: any) => {
  try {
    const config = {
      headers: {
        "Contect-Type": "application/json",
      },
    };
    const res = await axios.post("api/bio", formData, config);

    dispatch({
      type: UPDATE_BIO,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: BIO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
