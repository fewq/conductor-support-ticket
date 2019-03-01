import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {
  // domainData,
  // appState: {
  //   listCards: {
  //     // how cards are sorted inside lists - sorting matters here
  //     "0": ["0", "1", "2"],
  //     "1": ["3"],
  //     "2": ["4"]
  //   },
  //   selectedCard: "ID_OF_CARD_IN_FOCUS",
  //   itemToEdit: "ID_OF_LIST_CARD_TASK_TO_EDIT",
  //   attributeToEdit: "EXAMPLE:_TITLE_DESCRIPTION_NEWLIST"
  // },
  // uiState: {
  //   cardMenuPosition: {},
  //   shouldShowCardMenu: false
  // }
};

const middleware = [thunk];

let store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
