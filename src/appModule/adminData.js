import axios from "axios";

var tickets;
var numberOfTickets;
var cardsById;
var taskList;

let load = new Promise(resolve => {
  axios
    .get("http://localhost:4000/ticket/getall")
    .then(response => {
      console.log("retrieving data for admin kanban.");
      //tickets = response.data.tickets;
      console.log(response);
      numberOfTickets = response.data.length;
      /*
      // create cards based on tickets found in database
      cardsById = tickets.map((object, i) => {
        return {
          id: String(i),
          title: object.title,
          description: object.description,
          tasks: [String(i)]
        };
      });
  
      console.log("cardsById");
      console.log(cardsById);
  
  */
      // create sample tasks for cards that are not done yet
      const createTasks = input => {
        let sampleTasks = {};
        for (let i = 0; i < input; i++) {
          sampleTasks[String(i)] = {
            id: String(i),
            name: "Click to edit or delete",
            done: false
          };
        }
        console.log("Check Sample Tasks created.");
        return sampleTasks;
      };

      taskList = createTasks(8);
      console.log(taskList);
    })
    .then(resolve)
    .catch((error, response) => {
      console.log(error);
    });
});

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
    // intending to replace as
    // byId: cardsById
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
    byId: {
      "0": {
        id: "0",
        name: "Click to edit or delete",
        done: true
      },
      "1": {
        id: "1",
        name: "Click check button to toggle complete",
        done: false
      },
      "2": {
        id: "2",
        name: "Click on the top right icon to view the card menu",
        done: false
      },
      "3": {
        id: "3",
        name: "Drag and drop card",
        done: false
      },
      "4": {
        id: "4",
        name: "Task",
        done: false
      },
      "5": {
        id: "5",
        name: "Task",
        done: false
      },
      "6": {
        id: "6",
        name: "Task",
        done: false
      },
      "7": {
        id: "7",
        name: "Task",
        done: false
      }
    }
  }
};
