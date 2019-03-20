import React, { Component } from "react";
import axios from "axios";
import TableRow from './TicketListTableRow';

export default class TicketList extends Component {
  constructor(props) {
    super(props);
    this.state = {ticket: []};
  }
  componentDidMount(){
    axios.get('http://localhost:4000/ticket')
      .then(response => {
        this.setState({ ticket: response.data.tickets });
      })
      .catch( (error , res) => {
        console.log(error);
      })
  }
  tabRow(){
    return this.state.ticket.map( (object, i) => {
        return <TableRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3 align="center">Ticket List</h3>
        <table className="table table-striped text-white" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Ticket type</th>
              <th>Topics</th>
              <th>Description</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            { this.tabRow() }
          </tbody>
        </table>
      </div>
    );
  }
}