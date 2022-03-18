import {
  GET_BIO,
  BIO_ERROR,
  UPDATE_BIO,
  ADD_SOCIAL,
  DELETE_SOCIAL,
  UPDATE_SOCIAL,
} from "src/store/types";

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
    case ADD_SOCIAL:
    case UPDATE_SOCIAL:
      return { ...state, bio: payload };
    case DELETE_SOCIAL:
      return {
        ...state,
        bio: {
          // @ts-expect-error
          ...state.bio,
          // @ts-expect-error
          social: state.bio.social.filter(
            (soc: { _id: string }) => soc._id !== payload
          ),
        },
      };
    case BIO_ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default bio;
