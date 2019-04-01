import axios from "axios";

var tickets;
var numberOfTickets;
var cardsById;
const taskList = axios
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

    let taskList = {};
    for (let i = 0; i < 8; i++) {
      taskList[String(i)] = {
        id: String(i),
        name: "Click to edit or delete",
        done: false
      };
    }
    console.log("Check Sample Tasks created.");

    console.log(taskList);
    return taskList;
  })
  .catch((error, response) => {
    console.log(error);
  });

export default taskList;
