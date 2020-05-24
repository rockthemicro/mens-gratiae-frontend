import { combineReducers } from "redux";
import simpleReducer from './simpleReducer';
import logInStatusReducer from "./logInStatusReducer";
import editQuestionReducer from "./editQuestionReducer";
import editResearchFormReducer from "./editResearchFormReducer";
import editTestFormReducer from "./editTestFormReducer";

export default combineReducers({
    simpleReducer,
    logInStatusReducer,
    editQuestionReducer,
    editResearchFormReducer,
    editTestFormReducer,
});