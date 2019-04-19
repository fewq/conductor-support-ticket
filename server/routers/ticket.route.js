/* eslint-disable no-undef */
const express = require('express');
const ticketRoutes = express.Router();
let Ticket = require('../models/ticket');
const  multer = require('multer')

const upload = multer({
    limits: {
        fileSize: 1000000,
        files: 4,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})
// POST: Add a ticket
ticketRoutes.route('/add').post(upload.array('fileUpload',4), async(req, res) => {
    let ticket = new Ticket(req.body);
    const data = [];
    if (req.body.files != null) {
        console.log("there are files attached.")
        ticket.numUploads = req.body.files.length
        for(let i = 0; i<req.body.files.length; i++){
            data[i] = req.body.files[i].buffer;
            console.log(req.body.files[i].buffer);
        }
        ticket.fileUpload = data //we created a new fileUpload of type: buffer in Ticket model
    }
    await ticket.save()
    res.send(ticket)
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
        const tickets = await Ticket.find({
            statusToClient:{$nin: "Deleted"}
        })
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
        
        const ticket = await Ticket.findOne({_id: req.params.id});
        const data = [];
        if(!ticket || !ticket.fileUpload){
            throw new Error(); 
        }
        for(let i=0; i<ticket.numUploads; i++){
           data[i] = ticket.fileUpload[i] 
        }
        res.set('Content-Type', 'image/jpg') //default contatent type is JSON
        res.send(data) //send back the image 
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
        res.status(500).send()
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

ticketRoutes.route('/deletetic/:id').patch(async (req, res) => {
    try {
        const ticket = await Ticket.findOne({
            _id: req.params.id
        })
        if (!ticket) {
            res.status(404).send()
        }
        ticket.statusToClient = "Deleted"
        ticket.statusToAdmin = "Deleted"
        await ticket.save()
        res.send(ticket)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = ticketRoutes;