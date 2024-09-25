import { combineReducers } from "redux";
import userReducer from "./user.reducer.js";
import logReducer from "./log.reducer.js";

const rootReducer = combineReducers({
  user: userReducer,
  log: logReducer,
});

export default rootReducer;