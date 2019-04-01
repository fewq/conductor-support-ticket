const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StatusUpdate = new Schema({
  ticketId: {
    type: String
  },
  dateOfUpdate: {
    type: Date
  },
  attendedBy: {
    type: String    // can modify the attendedBy field 
                    // to show email or name to client
  },
  comments: {
    type: String
  },
  acknowledgedByClient: {
    type: Boolean
  }, 
}, {
  collection: 'statusUpdates'
})

module.exports = mongoose.model('StatusUpdate', StatusUpdate);