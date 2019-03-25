// set up express, cors, body parser
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

///////////////////////////// EMAIL SENDER ///////////////////////////
app.post("/api/notify", (req, res) => {
  // for now response is empty
  const output = `
    <h3>Ticket Title: ${req.body.title}</h3>
    <p>Your ticket status: ${req.body.status}</p>
  `;

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
    to: "hfut07+7xzrkpohotcqs@sharklasers.com", // list of receivers
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
  });
});

///////////////////////////// DATABASE ///////////////////////////
app.use(cors());

// set up Mongoose, the Object Relation Mapper for Mongodb
const mongoose = require("mongoose");
const config = require("./config/atlas.js");
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  err => {
    console.log("Can not connect to the database" + err);
  }
);

// set up routes & port
const ticketRoutes = require("./ticket.route");
app.use("/ticket", ticketRoutes);

const PORT = 4000;

// check if Server is running,
// if yes it will show "Database is connected"
app.listen(PORT, function() {
  console.log("Server is running on Port:", PORT);
});

/* SEAN local database part
 // require('./config/config.js');

// const _ = require('lodash');
// const {ObjectID} = require('mongodb');
// var {Ticket} = require('./models/ticket');
//Allows us to add a new document to the database, passing in a json from postman
app.post('/tickets', (req, res) => {
  var ticket = new Ticket({
    dateSubmitted: req.body.text,
    status: req.body.status,
    submittedBy: req.body.submittedBy,
    completedBy: req.body.completedBy,
    description: req.body.description,
    categories: req.body.categories
  });

  ticket.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//Allows us to GET all the tickets that are currently in the database
app.get('/tickets', (req, res) => {
   Ticket.find().then((tickets) => {
      res.send({
         tickets
      })
   }, (e) => {
      res.status(400).send(e);
   });
});

//Allows us to GET a specific ticket using id, we can add methods to retrieve tickets using other parameters like email, categories, etc.
app.get('/tickets/:id', (req, res) => {
   var id = req.params.id;

   if(!ObjectID.isValid(id)){
      return res.status(404).send();
   }

   Ticket.findById(id).then((ticket) => {
      if (!ticket) {
         return res.status(404).send();
      }

      res.send({
         ticket
      });
   }).catch((e) => {
      res.status(400).send();
   });
});

//Allows us to DELETE a specific ticket using the id
app.delete('/tickets/:id', (req, res) => {
   var id = req.params.id;

   if(!ObjectID.isValid(id)){
      return res.status(404).send();
   }

   Ticket.findByIdAndRemove(id).then((ticket) =>{
      if (!ticket) {
         return res.status(404).send();
      }
      res.send({
         ticket
      });
   }).catch((e) => {
      res.status(400).send();
   });
});

//allows us to Update an existing ticket given the id
app.patch('/tickets/:id', 

   Ticket.findByIdAndUpdate(id, {$set: body}, {new: true}).then((ticket) => {
      if(!ticket){
         return res.status(400).send();
      }
      res.send({ticket});
   }).catch((e) => {
      res.status(400).send();
   });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

// New User Registration code to Register User into Atlas Database 
// Not Implemented & Tested Yet.
// Some code that I found online.

// const MongoClient = require('mongodb').MongoClient;

// function withCredentials(callback) {
//    const uri = "mongodb+srv://user:123@cluster0-aeopj.mongodb.net/test?retryWrites=true"
//    const client = new MongoClient(uri, { useNewUrlParser: true });
//    client.connect(uri, function(err, client) {
//     if(err) {
//       console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//     } else {
//       console.log('Connected to Atlas');
//      const collection = client.db("users").collection("credentials");
//      callback(collection);
//     }
//   });
// }

// withCredentials(function(credentials) {
//    app.post('/registeruser', function(req,res){    
//      const cred = { };
//      cred.uname = req.body.uname;
//      cred.password = req.body.password;
//      credentials.insertOne(cred, function(err,newuser){
//         if(err){
//           res.status(500).send("Username exists");
//         } else {
//           res.status(200).send("New User Created");
//         }
//      })
//    });
//  });

//exported so that servertest can run
module.exports = {app};
*/
