// for heroku deployment testing

// const request = require('request');
// const {ObjectID} = require('mongodb');
// const ticket = {
//     _id: new ObjectID(),
//     dateSubmitted: "13/03/2019",
//     status: "Pending",
//     submittedBy: "testing@gmail.com",
//     completedBy: "eddie@techaccenture.com",
//     description: "testing server manually from manualtest.js",
//     categories: "Database, Loading, Error 404"
// }
// request.post('https://afternoon-retreat-21951.herokuapp.com/tickets',{
//     json:true,
//     body: ticket
// },(error, res, body) => {
//     if (error) {
//         console.error(error)
//         return
//     }
//     console.log(`statusCode: ${res.statusCode}`)
//     console.log(body)
// });