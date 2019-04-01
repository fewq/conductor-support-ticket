const express = require('express');
const statusUpdateRoutes = express.Router();
let StatusUpdate = require('../models/statusUpdate');

// POST: Add a statusUpdate
statusUpdateRoutes.route('/add').post((req, res) => {
    let statusUpdate = new StatusUpdate(req.body);
    statusUpdate.save()
        .then(statusUpdate => {
            res.status(200)
            res.send(statusUpdate);
        })
        .catch(err => {
            res.status(400);
        });
});

// GET: Retrieve all statusUpdates
statusUpdateRoutes.route('/getall').get(async (req, res) => {
    try {
        const statusUpdates = await StatusUpdate.find()
        res.status(200).send(statusUpdates)
    } catch (e) {
        res.status(500).send()
    }
});

// GET: Retrieve all statusUpdates for a specific ticket
statusUpdateRoutes.route('/ticketid/:id').get( async (req, res) => {
    try {
        const statusUpdates = await StatusUpdate.find({
            ticketId: req.params.id,
        });
        if (statusUpdates.length == 0) {
            return res.status(404).send()
        }
        res.send(statusUpdates)
    } catch (e) {
        res.status(500).send()
    }
});


// GET: Retrieve a specific statusUpdate with ID
statusUpdateRoutes.route('/view/:id').get(async (req, res) => {
    try {
        const statusUpdate = await StatusUpdate.findOne({
            _id: req.params.id,
        });
        if (!statusUpdate) {
            return res.status(404).send()
        }
        res.send(statusUpdate)
    } catch (e) {
        res.status(500).send()
    }
})

// PATCH: Update a specific StatusUpdate with ID
statusUpdateRoutes.route('/update/:id').patch(async (req, res) => {
    const updates = Object.keys(req.body)
    try {
        const statusUpdate = await StatusUpdate.findOne({
            _id: req.params.id,
        })

        if (!statusUpdate) {
            return res.status(404).send()
        }

        updates.forEach((update) => {
            statusUpdate[update] = req.body[update]
        })
        await statusUpdate.save()
        res.send(statusUpdate)
    } catch (e) {
        res.status(400).send(e)
    }
})

// DELETE: Remove a specific statusUpdate with ID
statusUpdateRoutes.route('/delete/:id').delete( async (req, res) => {
    try {
        const statusUpdate = await StatusUpdate.findOneAndDelete({
            _id: req.params.id
        })
        if (!statusUpdate) {
            res.status(404).send()
        }
        res.send(statusUpdate)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = statusUpdateRoutes;