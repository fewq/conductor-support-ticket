export default {
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
      byId: {
        "0": {
          id: "0",
          email: "client@conductor.com",
          title: "Ticket 1",
          description: "Ticket 1",
          status: "Pending Admin",
          statusToAdmin: "Pending Admin",
          priority: 1,
          notified: false,
          tasks: ["0"]
        },
        "1": {
          id: "1",
          email: "client@conductor.com",
          title: "Ticket 2",
          description: "Ticket 2",
          status: "Pending Admin",
          statusToAdmin: "Pending Admin",
          priority: 1,
          notified: false,
          tasks: ["1"]
        },
        "2": {
          id: "2",
          email: "client@conductor.com",
          title: "Ticket 3",
          description: "Ticket 3",
          status: "Pending Admin",
          statusToAdmin: "Pending Admin",
          priority: 1,
          notified: false,
          tasks: ["2"]
        },
        "3": {
          id: "3",
          email: "client@conductor.com",
          title: "Ticket 4",
          description: "Ticket 4",
          status: "Pending Admin",
          statusToAdmin: "Pending Admin",
          priority: 1,
          notified: false,
          tasks: ["3"]
        }
      }
    },
    tasks: {
      byId: {
        "0": {
          id: "0",
          name: "Click to edit or delete",
          done: false
        },
        "1": {
          id: "1",
          name: "Click to edit or delete",
          done: false
        },
        "2": {
          id: "2",
          name: "Click to edit or delete",
          done: false
        },
        "3": {
          id: "3",
          name: "Click to edit or delete",
          done: false
        }
      }
    }
  },
  kanbanState: {
    listCards: {
      "0": ["0", "1", "2", "3"],
      "1": [],
      "2": [],
      "3": [],
      "4": []
    },
    selectedCard: "ID_OF_CARD_IN_FOCUS",
    itemToEdit: "ID_OF_LIST_CARD_TASK_TO_EDIT",
    attributeToEdit: "EXAMPLE:_TITLE_DESCRIPTION_NEWLIST",
    mostCommon: "Others"
  },
  uiState: {
    cardMenuPosition: {},
    shouldShowCardMenu: false
  }
};
