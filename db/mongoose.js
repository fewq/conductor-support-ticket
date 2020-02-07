const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ticket-manager",
    {
        useNewUrlParser: true,
        useCreateIndex: true
    }
);

const Ticket = require("../models/ticket");
