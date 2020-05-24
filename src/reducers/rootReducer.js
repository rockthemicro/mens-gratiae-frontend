import { combineReducers } from "redux";
import simpleReducer from './simpleReducer';
import logInStatusReducer from "./logInStatusReducer";
import editQuestionReducer from "./editQuestionReducer";
import editResearchAndTestFormReducer from "./editResearchAndTestFormReducer";

export default combineReducers({
    simpleReducer,
    logInStatusReducer,
    editQuestionReducer,
    editResearchAndTestFormReducer
});