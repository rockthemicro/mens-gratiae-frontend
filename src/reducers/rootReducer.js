import { combineReducers } from "redux";
import simpleReducer from './simpleReducer';
import logInStatusReducer from "./logInStatusReducer";
import editQuestionReducer from "./editQuestionReducer";

export default combineReducers({simpleReducer, logInStatusReducer, editQuestionReducer});