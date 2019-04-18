const expect = require('expect');
const request = require('supertest');

const {
   ObjectID
} = require('mongodb');
const app = require('../app');
let Ticket = require('../models/ticket');


const tickets = [{
   _id: new ObjectID(),
   statusToClient: 'test 1',
   statusToAdmin: 'test 1',
   createdBy: 'testing1@gmail.com',
   completedBy: 'test1',
   description: 'First test ticket',
   title: 'First test ticket',
   topics: [],
   formType: 'test1'
}, {
   _id: new ObjectID(),
   statusToClient: 'test 2',
   statusToAdmin: 'test 2',
   createdBy: 'testing2@hotmail.com',
   completedBy: 'test2',
   description: 'Second test ticket',
   title: 'second test ticket',
   topics: [],
   formType: 'test2'

}]



describe('POST /ticket/add', () => {
   //Database is reset to the default 2 tickets declared on top BEFORE first POST test.
   before((done) => {
      Ticket.deleteMany({}).then(() => {
         return Ticket.insertMany(tickets);
      }).then(() => {
         done()
      });
   });
   it('should create a new ticket without fileUpload', (done) => {
      var createdBy = 'testing 123';
      request(app)
         .post('/ticket/add')
         .send({
            createdBy
         })
         .expect(200)
         .expect((res) => {
            expect(res.body.createdBy).toBe(createdBy);
         })
         .end((err, res) => {
            if (err) {
               return done(err);
            }
            Ticket.find({
               createdBy
            }).then((tickets) => {
               expect(tickets.length).toBe(1)
               expect(tickets[0].createdBy).toBe(createdBy);
               done();
            }).catch((e) => done(e));
         });
   });
   it('should create a new ticket with single fileUpload', (done) => {
      var createdBy = 'testing fileupload';
      request(app)
         .post('/ticket/add')
         .field('Content-Type', 'multipart/form-data')
         .field('createdBy', createdBy)
         .attach('fileUpload', '/Users/seanlew/Desktop/conductor-support-ticket/server/images/philly.jpg')
         .expect(200)
         .expect((res) => {
            expect(res.body.createdBy).toBe(createdBy);
         })
         .end((err, res) => {
            if (err) {
               return done(err);
            }
            Ticket.find({
               createdBy
            }).then((tickets) => {
               expect(tickets[0].numUploads).toBe(1)
               expect(tickets.length).toBe(1)
               expect(tickets[0].createdBy).toBe(createdBy);
               done();
            }).catch((e) => done(e));
         });
   });
   it('should create a new ticket with multiple fileUploads', (done) => {
      var createdBy = 'testing multiple fileupload';
      request(app)
         .post('/ticket/add')
         .field('Content-Type', 'multipart/form-data')
         .field('createdBy', createdBy)
         .attach('fileUpload', '/Users/seanlew/Desktop/conductor-support-ticket/server/images/profile-pic.jpg')
         .attach('fileUpload', '/Users/seanlew/Desktop/conductor-support-ticket/server/images/philly.jpg')
         .expect(200)
         .expect((res) => {
            expect(res.body.createdBy).toBe(createdBy);
         })
         .end((err, res) => {
            if (err) {
               return done(err);
            }
            Ticket.find({
               createdBy
            }).then((tickets) => {
               expect(tickets[0].numUploads).toBe(2)
               expect(tickets.length).toBe(1)
               expect(tickets[0].createdBy).toBe(createdBy);
               done();
            }).catch((e) => done(e));
         });
   });

   it('should return 400 with invalid file format', (done) => {
      var createdBy = 'testing invalid fileupload';

      request(app)
         .post('/ticket/add')
         .field('Content-Type', 'multipart/form-data')
         .field('createdBy', createdBy)
         .attach('fileUpload', '/Users/seanlew/Desktop/conductor-support-ticket/server/images/test.txt')
         .expect(400)
         .end(done)
   })

   it('should return 400 if file is too large', (done) => {
      var createdBy = 'testing large fileupload';

      request(app)
         .post('/ticket/add')
         .field('Content-Type', 'multipart/form-data')
         .field('createdBy', createdBy)
         .attach('fileUpload', '/Users/seanlew/Desktop/conductor-support-ticket/server/images/fall.jpg')
         .expect(400)
         .expect((res) => {
            var error = JSON.parse(res.error.text)
            expect(error.error).toBe("File too large")
         })
         .end(done)
   })
});

describe('GET /ticket/getall', () => {
   it('should get all tickets', (done) => {
      request(app)
         .get('/ticket/getall')
         .expect(200)
         .expect((res) => {
            expect(res.body.length).toBe(5);
         })
         .end(done);
   });
});

describe('GET /ticket/email/:email', () => {
   it('should return all ticket from email', (done) => {
      request(app)
         .get(`/ticket/email/${tickets[0].createdBy}`)
         .expect(200)
         .expect((res) => {
            expect(res.body.length).toBe(1);
         })
         .end(done);
   });

   it('should return 404 if email not found', (done) => {
      request(app)
         .get(`/ticket/email/anonymous@mail.com`)
         .expect(404)
         .end(done);
   });
});

describe('GET /ticket/view/:id', () => {
   it('should return ticket doc', (done) => {
      request(app)
         .get(`/ticket/view/${tickets[0]._id.toHexString()}`)
         .expect(200)
         .expect((res) => {
            expect(res.body.title).toBe(tickets[0].title);
         })
         .end(done);
   });

   it('should return 404 if ticket not found', (done) => {
      var hexId = new ObjectID().toHexString();
      request(app)
         .get(`/ticket/view/${hexId}`)
         .expect(404)
         .end(done);
   });

   it('should return 500 for non-object ids', (done) => {
      request(app)
         .get('/ticket/view/123abc')
         .expect(500)
         .end(done)
   });
});

describe('GET /ticket/view/:id/fileupload', (done) => {
   var createdBy = 'testing fileupload';
   var hexId;
   var binaryImage;
   // var fs =require("fs")
   // fs.readFile('/Users/seanlew/Desktop/conductor-support-ticket/server/images/philly.jpg',function(err,data) {
   //    if(err) throw err;
   //    binaryImage = new Buffer(data,'binary').toString('base64');
   //    //console.log(binaryImage)
   // });

   it('should return 200 retrieve data for fileuploads', (done) => {
      Ticket.find({
         createdBy
      }).then((tickets) => {
         hexId = tickets[0]._id;
         request(app)
            .get(`/ticket/view/${hexId}/fileupload`)
            .expect(200)
            .expect((res) =>{
            })
            .end(done);
      }).catch((e) => done(e));
   })
});

describe('DELETE /ticket/delete/:id', () => {
   it('should remove a ticket', (done) => {
      var hexId = tickets[1]._id.toHexString();
      request(app)
         .delete(`/ticket/delete/${hexId}`)
         .expect(200)
         .expect((res) => {
            expect(res.body._id).toBe(hexId);
         })
         .end((err, res) => {
            if (err) {
               return done(err) //error gets rendered by Mocha
            }

            Ticket.findById(hexId).then((ticket) => {
               expect(ticket).toBeFalsy();
               done();
            }).catch((e) => done(e));
         });
   });

   it('should return 404 if ticket not found', (done) => {
      var hexId = new ObjectID().toHexString();
      request(app)
         .delete(`/ticket/view/${hexId}`)
         .expect(404)
         .end(done);
   });

   it('should return 500 if object id is invalid', (done) => {
      request(app)
         .delete('/ticket/delete/123abc')
         .expect(500)
         .end(done)
   });
});

describe('PATCH /ticket/update/:id', () => {
   it('should update the ticket', (done) => {
      var hexId = tickets[0]._id.toHexString();
      var newTicket = {
         description: 'This should be the new description'
      }
      request(app)
         .patch(`/ticket/update/${hexId}`)
         .send(newTicket)
         .expect(200)
         .expect((res) => {
            //custom expect calls
            expect(res.body.description).toBe(newTicket.description);
         })
         .end(done);
   });

   it('should not upate ticket if cannot find', (done) => {
      var hexId = new ObjectID().toHexString();
      request(app)
         .delete(`/ticket/update/${hexId}`)
         .expect(404)
         .end(done)
   })
   it('should return 500 for non-object ids', (done) => {
      request(app)
         .patch('/ticket/update/123abc')
         .expect(500)
         .end(done)
   });
});

describe('PATCH /ticket/deletetic/:id', () => {
   it('should update ticket doc to deleted', (done) => {
      request(app)
         .patch(`/ticket/deletetic/${tickets[0]._id.toHexString()}`)
         .expect(200)
         .expect((res) => {
            expect(res.body.title).toBe(tickets[0].title);
            expect(res.body.statusToAdmin).toBe("Deleted")
         })
         .end(done);
   });

   it('should return 404 if ticket not found', (done) => {
      var hexId = new ObjectID().toHexString();
      request(app)
         .patch(`/ticket/deletetic/${hexId}`)
         .expect(404)
         .end(done);
   });

   it('should return 500 for non-object ids', (done) => {
      request(app)
         .patch('/ticket/deletetic/123abc')
         .expect(500)
         .end(done)
   });
});