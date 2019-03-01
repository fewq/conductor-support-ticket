import { combineReducers } from "redux";
import uiState from "./uiState";
import kanbanState from "./kanbanState";
import domainData from "./domainData";

export default combineReducers({
  domainData,
  kanbanState,
  uiState
});
