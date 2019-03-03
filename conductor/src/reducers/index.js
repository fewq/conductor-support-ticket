import { combineReducers } from "redux";
import uiState from "./uiState";
import kanbanState from "./kanbanState";
import domainData from "./domainData";

// whenever an action is performed, the action data is sent to all reducers
export default combineReducers({
  domainData,
  kanbanState,
  uiState
});
