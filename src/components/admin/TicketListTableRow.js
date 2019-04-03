import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { convertDateToString } from "./helper";


class TableRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.state = {ticket: this.props.obj};
  }

  alert = () => {
    if(window.confirm('Are you sure you want to delete this ticket?')) {
        axios.delete('http://localhost:4000/ticket/delete/' + this.state.ticket._id)
            .then(res => {
                console.log('deleted' + this.state.ticket._id);

            });

        var update = {
            statusToClient: "Closed",
            statusToAdmin: "Closed",
            ticketId: this.state.ticket._id,
            attendedBy: this.state.attendedBy,
            dateOfUpdate: new Date(),
        }
        
        axios.post('http://localhost:4000/status/add', update)
            .then(res => {
                console.log("posting status update")
                console.log(res);
            })
            .catch(err => console.log(err))

        var message = {
            title: "Close Ticket",
            status: "Closed by " + this.state.attendedBy,
            receiver: this.ticket.createdBy,
        }

        axios.post("/api/notify", message)
            .then(res => {
                console.log('emailed');
            })
          .catch(err => console.log(err))

        this.routeChange();
    }
  }


  render() {
   
    let displayDate = convertDateToString(this.props.obj.dateOfCreation);
    return (
        <tr>
          <td>
            {displayDate}
          </td>
          <td>
            {this.props.obj.createdBy}
          </td>
          <td>
            {this.props.obj.formType}
          </td>
          <td>
            {this.props.obj.title}
          </td>
          <td>
            {this.props.obj.statusToClient}
          </td>
          <td>
            <span class="badge badge-secondary">{this.props.obj._id}</span>
          </td>
          <td>
            <Link to={{ 
              pathname:`/view/${this.props.obj._id}`, 
              state: { 
                ticket: this.props.obj
              }
              }} className="btn btn-primary">View</Link>
          </td>
          <td>
            <button onClick={this.alert} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;