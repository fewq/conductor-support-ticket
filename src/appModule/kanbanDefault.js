import taskList from "./getData";

export default {
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
    byId: {
      "0": {
        id: "0",
        title: "TODO 1",
        description: "Description",
        tasks: ["0", "1", "2", "3"]
      },
      "1": {
        id: "1",
        title: "TODO 2",
        description: "",
        tasks: ["4"]
      },
      "2": {
        id: "2",
        title: "TODO 3",
        description: "Description",
        tasks: ["5", "6"]
      },
      "3": {
        id: "3",
        title: "Click to expand",
        description: "Click to edit",
        tasks: []
      },
      "4": {
        id: "4",
        title: "TODO",
        description: "Description",
        tasks: ["7"]
      }
    }
  },
  tasks: {
    byId: taskList
  }
};
