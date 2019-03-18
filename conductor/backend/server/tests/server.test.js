const expect = require ('expect');
const request = require ('supertest');

const{ObjectID} = require('mongodb');
const {app} = require ('./../server');
const {Ticket} = require ('./../models/ticket');

const tickets = [{
   _id: new ObjectID(),
   description: 'description 1',
   status: 'pending'
},{
   _id: new ObjectID(),
   description: 'description 2',
   status: 'pending',
}]

beforeEach((done) => {
   Ticket.deleteMany({}).then(() => {
      return Ticket.insertMany(tickets);
   }).then(() => {
      done()
   });
});

describe('POST /tickets', () => {
   it('should create a new ticket', (done) => {
      var description = 'description 3';

      request(app)
         .post('/tickets')
         .send({description})
         .expect(200)
         .expect((res) => {
            expect(res.body.description).toBe(description);
         })
         .end((err, res) =>{
            if (err) {
               return done(err);
            }

            Ticket.find({description}).then((tickets) => {
               expect(tickets.length).toBe(1)
               expect(tickets[0].description).toBe(description);
               done();
            }).catch((e) => done(e));
         });
   });

   it('should not create ticket with invalid body data', (done) => {
      request(app)
         .post('/tickets')
         .send({})
         .expect(400)
         .end((err, res) => {
            if(err){
            return done(err);
         }

         Ticket.find().then((tickets) => {
            expect(tickets.length).toBe(2);
            done();
         }).catch((e) =>done(e))
      });
   });
});

describe('GET /tickets', () => {
   it('should get all tickets', (done) => {
      request(app)
         .get('/tickets')
         .expect(200)
         .expect((res) => {
            expect(res.body.tickets.length).toBe(2);
         })
         .end(done);
   });
});

describe('GET /tickets/:id', () => {
   it('should return ticket doc', (done) => {
      request(app)
      .get(`/tickets/${tickets[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
         expect(res.body.ticket.text).toBe(tickets[0].text);
      })
      .end(done);
   });

   it('should return 404 if ticket not found', (done) => {
      var hexId = new ObjectID().toHexString();

      request(app)
      .get(`/tickets/${hexId}`)
      .expect(404)
      .end(done);
   });

   it('should return 404 for non-object ids', (done) => {
      request(app)
      .get('/tickets/123abc')
      .expect(404)
      .end(done)
   });
});

describe('DELETE /tickets/:id', () => {
   it('should remove a ticket', (done) => {
      var hexId = tickets[1]._id.toHexString();

      request(app)
         .delete(`/tickets/${hexId}`)
         .expect(200)
         .expect((res) => {
            expect(res.body.ticket._id).toBe(hexId);
         })
      .end((err, res) => {
         if (err) {
            return done(err) //error gets rendered by Mocha
         }

      Ticket.findById(hexId).then((ticket) => {
         expect(ticket).toBeFalsy();
         done();
      }).catch((e) =>done(e));
   });
});

   it('should return 404 if ticket not found', (done) => {
      var hexId = new ObjectID().toHexString();

      request(app)
      .delete(`/tickets/${hexId}`)
      .expect(404)
      .end(done);
   });

   it('should return 404 if object id is invalid', (done) => {
      request(app)
      .delete('/tickets/123abc')
      .expect(404)
      .end(done)
   });
});

describe('PATCH /tickets/:id', () => {
   it('should update the ticket', (done) => {
      var hexId = tickets[0]._id.toHexString();
      var description = 'This should be the new description';

      request(app)
         .patch(`/tickets/${hexId}`)
         .send({
            status:'done',
            description
         })
         .expect(200)
         .expect((res) => {
            //custom expect calls
            expect(res.body.ticket.description).toBe(description);
            expect(res.body.ticket.status).toBe('done');
         })
      .end(done);
   });
});
