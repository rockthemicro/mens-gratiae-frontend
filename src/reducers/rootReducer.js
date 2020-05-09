import { combineReducers } from "redux";
import simpleReducer from './simpleReducer';
import logInStatusReducer from "./logInStatusReducer";

export default combineReducers({simpleReducer, logInStatusReducer});