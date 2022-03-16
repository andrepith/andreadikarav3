import { GET_BIO, BIO_ERROR, UPDATE_BIO } from "src/store/types";

const initialState = {
  bio: null,
  error: {},
};

const bio = (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case GET_BIO:
    case UPDATE_BIO:
      return { ...state, bio: payload };
    case BIO_ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default bio;
