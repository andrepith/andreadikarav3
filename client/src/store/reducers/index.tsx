import { combineReducers } from "redux";
import auth from "./auth";
import bio from "./bio";

const rootReducer = combineReducers({ auth, bio });

export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
