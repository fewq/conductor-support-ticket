const express = require('express');
const ticketRoutes = express.Router();

let Ticket = require('./models/ticket');

// add ticket
ticketRoutes.route('/add').post((req, res) => {
    let ticket = new Ticket(req.body);
    ticket.save()
        .then(ticket => {
            res.status(200).json({'ticket': "ticket added successfully."});
            res.send(ticket);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// get all tickets
ticketRoutes.route('/').get((req, res) => {
    Ticket.find().then((tickets) => {
        res.send({
            tickets
        })
    }, (e) => {
        res.status(400).send(e);
    });
});

// get specific tickets
ticketRoutes.route('/:id').get((req, res) => {
    Ticket.findById(req.params.id).then((err, ticket) => {
        if(!ticket) {
            res.status(404).send("Data not found.");
        } else {
            res.send({tickets});
        }
    });
});

// edit Ticket
ticketRoutes.route('/edit/:id').get( (req, res) => {
    let id = req.params.id;
    Ticket.findById(id, (err, ticket) => {
        res.send({ticket});
    });
});

ticketRoutes.route('/update/:id').post( (req, res) => {
    Ticket.findById(req.params.id, (err, ticket) => {
        if(!ticket) {
            res.status(404).send("Data not found.");
        } else {
            // more variables to be added later, depending on updated form
            ticket.description = req.body.description;
            ticket.categories = req.body.topics;
            ticket.formType = req.body.formType;
            
            ticket.save()
                .then(ticket => {
                    res.json('Update complete.');
                })
                .catch(err => {
                    res.status(400).send("unable to update.");
                });
        }
    });
});

ticketRoutes.route('/delete/:id').get( (req, res) => {
    Ticket.findByIdAndRemove({_id: req.params.id}, (err, ticket) => {
        if (err) res.json(err);
        else res.json('Removed.');
    });
});

module.exports = ticketRoutes;