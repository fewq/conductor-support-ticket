// Mongoose allows us to also create a schema for the Ticket. But for now we don't really exactly need this because the frontend form will always determine the json object that is being uploaded

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Ticket = new Schema({
  dateOfCreation: {
    type: Date,
  },
  statusToClient: {
    type: String,
  },
  statusToAdmin: {
    type: String,
  },
  createdBy: {
    type: String, //email or usertitle
  },
  completedBy: {
    type: String, //name of employee
  },
  dateOfCompletion: {
    type: Date,
  },
  description: {
    type: Array, 
  },
  title: {
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