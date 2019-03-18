// Mongoose allows us to also create a schema for the Ticket. But for now we don't really exactly need this because the frontend form will always determine the json object that is being uploaded

var mongoose = require('mongoose');

var Ticket = mongoose.model('Ticket', {
  dateSubmitted: {
    type: String,
  },
  status: {
    type: String,
  },
  submittedBy: {
    type: String //email or username
  },
  completedBy: {
    type: String //name of employee
  },
  description: {
    type: String, 
  },
  categories: {
    type: String
  }
});

module.exports = {Ticket};
