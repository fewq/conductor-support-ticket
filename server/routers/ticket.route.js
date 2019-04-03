const express = require('express');
const ticketRoutes = express.Router();
let Ticket = require('../models/ticket');
const  multer = require('multer')

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})
// POST: Add a ticket
ticketRoutes.route('/add').post(upload.single('fileUpload'), async(req, res) => {
    
    let ticket = new Ticket(req.body);
    ticket.fileUpload = req.file.buffer //we created a new fileUpload of type: buffer in Ticket model
    await ticket.save()
    res.send()
}, (error, req, res ,next) =>{
    res.status(400).send({error:error.message})
});

// POST: Add a file
// ticketRoutes.route('/upload').post(upload.single('fileUpload'), async (req,res) => {
//     let ticket = new Ticket();
//     ticket.fileUpload= req.file.buffer
//     await ticket.save()
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })

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
// GET: retrieve file Upload of ticket
ticketRoutes.route('/view/:id/fileupload').get(async (req, res) => {
    try{
        console.log("Hi im here!")
        const ticket = await Ticket.findOne({_id: req.params.id});
        
        if(!ticket || !ticket.fileUpload){
            throw new Error(); 
        }
        res.set('Content-Type', 'image/jpg') //default contatent type is JSON
        res.send(ticket.fileUpload) //send back the image
    }
    catch(e){
        res.status(404).send()
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