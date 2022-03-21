import axios from "axios";
import {
  AUTH_ERROR,
  GET_BIO,
  BIO_ERROR,
  UPDATE_BIO,
  ADD_SOCIAL,
  DELETE_SOCIAL,
  UPDATE_SOCIAL,
  ADD_EXPERIENCE,
  DELETE_EXPERIENCE,
  UPDATE_EXPERIENCE,
  ADD_SKILLSET,
} from "src/store/types";

const bioError = (err: any) => (dispatch: any) => {
  dispatch({
    type: BIO_ERROR,
    payload: { msg: err.response.statusText, status: err.response.status },
  });

  if (err.response.status === 401) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const getBio = () => async (dispatch: any) => {
  try {
    const res = await axios.get("api/bio");
    dispatch({
      type: GET_BIO,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch(bioError(err));
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
    dispatch(bioError(err));
  }
};

export const addSocial = (formData: any) => async (dispatch: any) => {
  try {
    const config = {
      headers: {
        "Contect-Type": "application/json",
      },
    };
    const res = await axios.put("api/bio/social", formData, config);
    dispatch({
      type: ADD_SOCIAL,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch(bioError(err));
  }
};

export const deleteSocial = (socialID: string) => async (dispatch: any) => {
  try {
    await axios.delete(`api/bio/social/${socialID}`);
    dispatch({ type: DELETE_SOCIAL, payload: socialID });
  } catch (err: any) {
    dispatch(bioError(err));
  }
};

export const updateSocial =
  (formData: any, socialID: string) => async (dispatch: any) => {
    try {
      const config = {
        headers: {
          "Contect-Type": "application/json",
        },
      };
      const res = await axios.post(
        `api/bio/social/${socialID}`,
        formData,
        config
      );

      dispatch({
        type: UPDATE_SOCIAL,
        payload: res.data,
      });
    } catch (err: any) {
      dispatch(bioError(err));
    }
  };

export const addExperience = (formData: any) => async (dispatch: any) => {
  try {
    const config = {
      headers: {
        "Contect-Type": "application/json",
      },
    };
    const res = await axios.put("api/bio/experience", formData, config);
    dispatch({
      type: ADD_EXPERIENCE,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch(bioError(err));
  }
};

export const deleteExperience = (expID: string) => async (dispatch: any) => {
  try {
    await axios.delete(`api/bio/experience/${expID}`);
    dispatch({ type: DELETE_EXPERIENCE, payload: expID });
  } catch (err: any) {
    dispatch(bioError(err));
  }
};

export const updateExperience =
  (formData: any, expID: string) => async (dispatch: any) => {
    try {
      const config = {
        headers: {
          "Contect-Type": "application/json",
        },
      };
      const res = await axios.post(
        `api/bio/experience/${expID}`,
        formData,
        config
      );

      dispatch({
        type: UPDATE_EXPERIENCE,
        payload: res.data,
      });
    } catch (err: any) {
      dispatch(bioError(err));
    }
  };

export const addSkills = (formData: any) => async (dispatch: any) => {
  try {
    const config = {
      headers: {
        "Contect-Type": "application/json",
      },
    };
    const res = await axios.put("api/bio/skillset", formData, config);
    dispatch({
      type: ADD_SKILLSET,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch(bioError(err));
  }
};
