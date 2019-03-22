import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import TableRow from './TicketListTableRow';

export default class TicketList extends Component {
  constructor(props) {
    super(props);
    this.state = {ticket: []};
  }
  componentDidMount(){
    this.refresh();
  }

  refresh = () => {
    axios.get('http://localhost:4000/ticket')
      .then(response => {
        console.log("refreshing");
        console.log(response);
        this.setState({ ticket: response.data.tickets });
      })
      .catch( (error , response) => {
        console.log(error);
      })
  }


  
  tabRow(object, i){
    return this.state.ticket.map((object, i) => {
      return <TableRow obj={object} key={i} indice={i} delete ={ (ind) => this.deleteItem(ind)} />;
    });
  }

  deleteItem(index){
		this.setState({ticket : this.state.ticket.filter((_,i) => i !== index)});
	}


  render() {
    return (
      <div>
        <h3 align="center">Ticket List</h3>
        <table className="table table-striped text-white" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th></th>
              <th>Ticket type</th>
              <th>Topics</th>
              <th>Description</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {  this.tabRow() }
          </tbody>
        </table>
      </div>
    );
  }
}