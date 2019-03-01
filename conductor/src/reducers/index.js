import { combineReducers } from "redux";
// import uiState from "./uiState";
// import rootState from "./rootState";
// import domainData from "./domainData";
import testReducer from "./testReducer";

//export default combineReducers({ domainData, rootState, uiState });
export default combineReducers({ posts: testReducer });
