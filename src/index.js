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
      ID: object._id,
      email: object.createdBy,
      title: object.title,
      description: object.description,
      status: object.statusToClient,
      statusToAdmin: object.statusToAdmin,
      priority: object.priority,
      notified: object.notified,
      tasks: [String(i)],
      ticket: object
    };
  });
  // sort by priority
  cardList.sort((a, b) => a.priority - b.priority);

  // Update dynamically depending on status
  let listTODO = [];
  let listBA = [];
  let listDev = [];
  let listClient = [];
  let listDone = [];
  //let lists = [listTODO, listBA, listDev, listClient, listDone];

  let taskList = {};
  for (let i = 0; i < numberOfTickets; i++) {
    taskList[i] = {
      id: String(i),
      name: "Click to edit or delete",
      done: false
    };

    switch (cardList[i].statusToAdmin) {
      case "Pending Admin":
        listTODO.push(String(i));
        break;
      case "Pending BA":
        listBA.push(String(i));
        break;
      case "Pending Developers":
        listDev.push(String(i));
        break;
      case "Pending Client":
        listClient.push(String(i));
        break;
      case "Resolved":
        listDone.push(String(i));
        break;
      default:
        break;
    }
  }

  const initialState = {
    domainData: {
      lists: {
        byId: {
          "0": {
            id: "0",
            name: "Todo"
          },
          "1": {
            id: "1",
            name: "Pending BA"
          },
          "2": {
            id: "2",
            name: "Pending Developers"
          },
          "3": {
            id: "3",
            name: "Pending Client"
          },
          "4": {
            id: "4",
            name: "Done"
          }
        },
        allLists: ["0", "1", "2", "3", "4"]
      },
      cards: {
        byId: cardList
      },
      tasks: {
        byId: taskList
      }
    },
    kanbanState: {
      listCards: {
        "0": listTODO,
        "1": listBA,
        "2": listDev,
        "3": listClient,
        "4": listDone
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
  console.log(initialState);

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
