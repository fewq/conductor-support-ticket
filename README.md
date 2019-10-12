# Conductor - Accenture Support Ticket System

This is a project for SUTD's 50.003 Elements of Software Construction course. Here is our pitch deck to the Accenture staff on June 2018: https://docs.google.com/presentation/d/e/2PACX-1vSBr5Upz-oO_xdLsB_D-mZcDMwb1H9UJsOPV2n_b5Yxp8lRzxYCoQHy2eiG9DuPQ5quzd1ttzsBypKb/pub?start=true&loop=false&delayms=10000.

## The Team

Yuan Jia
Thaddeus Phua
Tey Siew Wen
Sean Lew

## Tech Stack

- [React](https://facebook.github.io/react/) and [React Router](https://reacttraining.com/react-router/) for the frontend
- [Express](http://expressjs.com/), [CORS](https://www.npmjs.com/package/cors), [Mongoose](http://mongoosejs.com/) and [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for the backend
- [Sass](http://sass-lang.com/) and [React Bootstrap](https://react-bootstrap.github.io/) for styles (using the SCSS syntax)

## Set up instructions
Run `npm install` and then `npm start` and you're good to go!

We have written `npm start` such that the server will be started up with `nodemon` and the client will be started up with `react-scripts start` using `concurrently`. So you just to have keep a single terminal window up to host both the client and server.

### To check for live data updates
There are several ways you can check if your post/get requests are made successfully.
1. Using the browser, Inspect the website and go to the Console Tab. Valid and successful requests will have a status code of 200. 
2. Observe the actual website logged in as an admin account / a client. 
    - As an admin, you can see all the tickets in the database in the form of a kanban board 
    - As a client, you can only see tickets that you raised. 
3. Using the shell, connect to the MongoDB atlas cluster with the following commands:
```
mongo "mongodb+srv://cluster0-aeopj.mongodb.net/test" --username user
/* password is 123 */
``` 
```
show dbs
```
```
use test
```
```
db.ticket.findById(your_filter, your_projection).pretty()
```
