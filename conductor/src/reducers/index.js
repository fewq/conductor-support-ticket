import { combineReducers } from "redux";
import uiState from "./uiState";
import kanbanState from "./kanbanState";
import domainData from "./domainData";
import testReducer from "./testReducer";

export default combineReducers({
  posts: testReducer,
  domainData,
  kanbanState,
  uiState
});
