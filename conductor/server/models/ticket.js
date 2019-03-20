// Mongoose allows us to also create a schema for the Ticket. But for now we don't really exactly need this because the frontend form will always determine the json object that is being uploaded

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Ticket = new Schema({
  // dateSubmitted: {
  //   type: String,
  // },
  // status: {
  //   type: String,
  // },
  // submittedBy: {
  //   type: String //email or username
  // },
  // completedBy: {
  //   type: String //name of employee
  // },
  description: {
    type: String, 
  },
  topics: {
    type: Array,
  },
  formType: {
    type: String
  }
});

module.exports = mongoose.model('Ticket', Ticket);