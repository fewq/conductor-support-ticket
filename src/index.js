import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import kanbanReducers from "./reducers/index";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Auth from "./Auth";
import axios from "axios";

//calls the constructor in Auth.js but doesn't check authentication yet
// will be passed to state later
const auth = new Auth();

//original state is blank
let state = {};

// function definition
// updates the changes and re-renders the changed components
Window.setState = (changes, store) => {
  //updates the state via changes
  state = Object.assign({}, state, changes);
  //passes the state object to the App via the spread syntax

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App {...state} />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
};

//do not remove the next line, it prevents errors
/* eslint no-restricted-globals: 0*/
let appInitialState = {
  name: auth.getProfile().name,
  location: location.pathname.replace(/^\/?|\/$/g, ""),
  //if it still doesn't work change location to window.location
  auth
};

// populate store from DB
axios.get("http://localhost:4000/ticket/getall").then(response => {
  let numberOfTickets = response.data.length;
  let tickets = response.data;
  let cardList = tickets.map((object, i) => {
    return {
      id: String(i),
      title: object.title,
      description: object.description,
      tasks: [String(i)]
    };
  });

  // TODO update dynamically (depending on status)
  let listCard = [];

  let taskList = {};
  for (let i = 0; i < numberOfTickets; i++) {
    taskList[String(i)] = {
      id: String(i),
      name: "Click to edit or delete",
      done: false
    };

    listCard[String(i)] = String(i);
  }
  //console.log("List ", listCard);

  const initialState = {
    domainData: {
      lists: {
        byId: {
          "0": {
            id: "0",
            name: "Todo"
          },
          "1": {
            name: "In Progress",
            id: "1"
          },
          "2": {
            id: "2",
            name: "Done"
          }
        },
        allLists: ["0", "1", "2"]
      },
      cards: {
        byId: cardList
      },
      tasks: {
        byId: taskList
      }
    },
    kanbanState: {
      listCards: { "0": listCard, "1": [], "2": [] },
      selectedCard: "ID_OF_CARD_IN_FOCUS",
      itemToEdit: "ID_OF_LIST_CARD_TASK_TO_EDIT",
      attributeToEdit: "EXAMPLE:_TITLE_DESCRIPTION_NEWLIST"
    },
    uiState: {
      cardMenuPosition: {},
      shouldShowCardMenu: false
    }
  };

  let store = createStore(
    kanbanReducers,
    initialState,
    compose(
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__() // for browser extension: redux devtool
    )
  );

  Window.setState(appInitialState, store);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
