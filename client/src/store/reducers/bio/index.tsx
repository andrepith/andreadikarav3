import {
  GET_BIO,
  BIO_ERROR,
  UPDATE_BIO,
  ADD_SOCIAL,
  DELETE_SOCIAL,
  UPDATE_SOCIAL,
  ADD_EXPERIENCE,
  DELETE_EXPERIENCE,
  UPDATE_EXPERIENCE,
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
    case ADD_EXPERIENCE:
    case UPDATE_EXPERIENCE:
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
    case DELETE_EXPERIENCE:
      return {
        ...state,
        bio: {
          // @ts-expect-error
          ...state.bio,
          // @ts-expect-error
          experience: state.bio.experience.filter(
            (exp: { _id: string }) => exp._id !== payload
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
