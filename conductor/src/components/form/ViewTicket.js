/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import axios from "axios";
import { convertDateToString } from "./helper";
import { Link } from 'react-router-dom';

export default class TicketList extends Component {
    constructor(props) {
        super(props);
        const {ticket} = this.props.location.state;
        const displayDate = convertDateToString(ticket.dateOfCreation);
        this.state = {ticket: ticket, displayDate: displayDate};
        this.routeChange = this.routeChange.bind(this);
    }

    alert() {
        if(window.confirm('Are you sure you want to delete this ticket?')) {
            this.delete();
        }
    }

    routeChange() {
        let path = `./restricted`;
        this.props.history.push(path);
      }

    delete() {
        axios.get('http://localhost:4000/ticket/delete/' + this.state.ticket._id)
          .then(res => {
            console.log('deleted' + this.state.ticket._id);
            this.routeChange();

          })
          .catch(err => console.log(err))
      }

    renderTopics() {
        return this.state.ticket.topics.map((obj, i) => {
            return <span class="badge badge-pill badge-info"> {obj} </span>
        });
    }

    render() {
        
        return(
            <div className="container-fluid">
                <div>
                    <h3> {this.state.ticket.title} <span class="badge badge-pill badge-secondary"> {this.state.ticket.statusToClient} </span></h3>
                    <div className="d-flex justify-content-center">
                    { this.renderTopics() }
                    </div>
                    <div>
                        <p> {this.state.displayDate} </p>
                        <h4> Description </h4>
                        <p> {this.state.ticket.description} </p>
                    </div>
                </div>
                <Link to={"/edit/"+this.state.ticket._id} className="btn btn-light">Edit Description</Link>
                <button onClick={this.alert} className="btn btn-danger">Delete Ticket</button>
            </div>

        )
    }
}