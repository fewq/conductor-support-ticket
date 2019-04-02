const express = require('express');
const ticketRoutes = express.Router();
let Ticket = require('../models/ticket');

// POST: Add a ticket
ticketRoutes.route('/add').post((req, res) => {
    let ticket = new Ticket(req.body);
    ticket.save()
        .then(ticket => {
            res.status(200)
            res.send(ticket);
        })
        .catch(err => {
            res.status(400);
        });
});

// GET: Retrieve all tickets
ticketRoutes.route('/getall').get(async (req, res) => {
    try {
        const tickets = await Ticket.find()
        res.status(200).send(tickets)
    } catch (e) {
        res.status(500).send()
    }
});

// GET: Retrieve all tickets from a specific email
ticketRoutes.route('/email/:email').get( async (req, res) => {
    try {
        const tickets = await Ticket.find({
            createdBy: req.params.email,
        });
        if (tickets.length == 0) {
            return res.status(404).send()
        }
        res.send(tickets)
    } catch (e) {
        res.status(500).send()
    }
});


// GET: Retrieve a specific ticket with ID
ticketRoutes.route('/view/:id').get(async (req, res) => {
    try {
        const ticket = await Ticket.findOne({
            _id: req.params.id,
        });
        if (!ticket) {
            return res.status(404).send()
        }
        res.send(ticket)
    } catch (e) {
        res.status(500).send()
    }
})

// PATCH: Update a specific ticket with ID
ticketRoutes.route('/update/:id').patch(async (req, res) => {
    const updates = Object.keys(req.body)
    try {
        const ticket = await Ticket.findOne({
            _id: req.params.id,
        })

        if (!ticket) {
            return res.status(404).send()
        }

        updates.forEach((update) => {
            ticket[update] = req.body[update]
        })
        await ticket.save()
        res.send(ticket)
    } catch (e) {
        res.status(400).send(e)
    }
})

// DELETE: Remove a specific ticket with ID
ticketRoutes.route('/delete/:id').delete( async (req, res) => {
    try {
        const ticket = await Ticket.findOneAndDelete({
            _id: req.params.id
        })
        if (!ticket) {
            res.status(404).send()
        }
        res.send(ticket)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = ticketRoutes;