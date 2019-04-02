import { createStore, compose } from "redux";
import kanbanReducers from "./reducers/index";
import domainData from "./appModule/adminData";

const initialState = {
  domainData,
  kanbanState: {
    listCards: {
      // how cards are sorted inside lists - sorting matters here
      "0": ["0", "1", "2"],
      "1": ["3"],
      "2": ["4"]
    },
    selectedCard: "ID_OF_CARD_IN_FOCUS",
    itemToEdit: "ID_OF_LIST_CARD_TASK_TO_EDIT",
    attributeToEdit: "EXAMPLE:_TITLE_DESCRIPTION_NEWLIST"
  },
  uiState: {
    cardMenuPosition: {},
    shouldShowCardMenu: false
  }
};
console.log("Store: ", domainData);
let store = createStore(
  kanbanReducers,
  initialState,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // for browser extension: redux devtool
  )
);

export default store;
