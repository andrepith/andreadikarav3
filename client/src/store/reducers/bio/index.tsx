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
  ADD_SKILLSET,
  DELETE_SKILLSET,
  UPDATE_SKILLSET,
  ADD_PORTOFOLIO,
  DELETE_PORTOFOLIO,
  UPDATE_PORTOFOLIO,
  ADD_EDUCATION,
  DELETE_EDUCATION,
  UPDATE_EDUCATION,
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
    case ADD_SKILLSET:
    case UPDATE_SKILLSET:
    case ADD_PORTOFOLIO:
    case UPDATE_PORTOFOLIO:
    case ADD_EDUCATION:
    case UPDATE_EDUCATION:
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
    case DELETE_SKILLSET:
      return {
        ...state,
        bio: {
          // @ts-expect-error
          ...state.bio,
          // @ts-expect-error
          skillset: state.bio.skillset.filter(
            (skill: { _id: string }) => skill._id !== payload
          ),
        },
      };
    case DELETE_PORTOFOLIO:
      return {
        ...state,
        bio: {
          // @ts-expect-error
          ...state.bio,
          // @ts-expect-error
          portofolio: state.bio.portofolio.filter(
            (item: { _id: string }) => item._id !== payload
          ),
        },
      };
    case DELETE_EDUCATION:
      return {
        ...state,
        bio: {
          // @ts-expect-error
          ...state.bio,
          // @ts-expect-error
          education: state.bio.education.filter(
            (edu: { _id: string }) => edu._id !== payload
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
