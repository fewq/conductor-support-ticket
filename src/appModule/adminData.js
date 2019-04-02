import axios from "axios";

let test = "before";
let taskList;

function getData() {
  return new Promise((resolve, reject) => {
    console.log("doing promise");
    test = "after";
  });
}

async function waitData() {
  await getData();
}

function getDat() {
  return axios.get("http://localhost:4000/ticket/getall");
}

async function i() {
  try {
    await getDat();
    test = "after";
  } catch (error) {
    console.log(error);
  }
}

i();

async function fetchData() {
  await axios.get("http://localhost:4000/ticket/getall");
  /*.then(response => {
      console.log("retrieving data for admin kanban.");
      //tickets = response.data.tickets;
      console.log(response);
      let numberOfTickets = response.data.length;
      return numberOfTickets;
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

      taskList = createTasks(2);
      console.log(taskList);
      
    })
    .catch((error, response) => {
      console.log(error);
    });*/
  test = "after";
  console.log(test);
}

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
        tasks: ["0"]
      },
      "1": {
        id: "1",
        title: "TODO 2",
        description: "",
        tasks: ["1"]
      },
      "2": {
        id: "2",
        title: "TODO 3",
        description: "Description",
        tasks: ["2"]
      },
      "3": {
        id: "3",
        title: "Click to expand",
        description: "Click to edit",
        tasks: ["3"]
      },
      "4": {
        id: "4",
        title: test,
        description: "Description",
        tasks: ["4"]
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
      },
      "4": {
        id: "4",
        name: "Click to edit or delete",
        done: false
      }
    }
  }
};
