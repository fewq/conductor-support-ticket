// set up express, cors, body parser
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

// Body Parser Middleware

app.use(bodyParser.json({limit:'10mb'}));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit:'10mb',
    parameterLimit:50000
  })
);
///////////////////////////// EMAIL SENDER ///////////////////////////
app.post("/api/notify", (req, res) => {
  let output;
  if (req.body.target == "client") {
    output = `
    <h3>Ticket Title: ${req.body.title}</h3>
    <p>Your ticket status is now: ${req.body.status}</p>
    <p>Message: ${req.body.message}</p>
    <p>View your ticket here: localhost:3000/view/${req.body.link}</p>
  `;
  } else if (req.body.target == "admin") {
    output = `
    <h3>New Ticket: ${req.body.title}</h3>
    <p>Client's email: ${req.body.client}</p>
    <p>Description: ${req.body.description}</p>
  `;
  }

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "rashad.green@ethereal.email",
      pass: "3tgthkxNKmvs5hWjSB"
    },
    tls: {
      rejectUnauthorized: false
    } // necessary for sending from local host
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Admin Test" <rashad.green@ethereal.email>', // sender address
    to: req.body.email, // list of receivers
    subject: "Test Notification", // Subject line
    text: "Testing", // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    //console.log(res);
  });
});

///////////////////////////// DATABASE ///////////////////////////
app.use(cors());

// set up Mongoose, the Object Relation Mapper for Mongodb
const mongoose = require("mongoose");
const config = require("./config/atlas.js");
mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, {
    useNewUrlParser: true
  })
  .then(
    () => {
      console.log("Database is connected");
    },
    err => {
      console.log("Can not connect to the database" + err);
    }
  );

// set up routes & port
const ticketRoutes = require("./routers/ticket.route");
const statusUpdateRoutes = require("./routers/statusUpdate.route");
app.use("/ticket", ticketRoutes);
app.use("/status", statusUpdateRoutes);

module.exports = app;
