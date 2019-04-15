import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

import TableRow from './TicketListTableRow';

export default class TicketList extends Component {
  constructor(props) {
    super(props);
    var _isMounted = false;
    let idToken = jwtDecode(localStorage.getItem("id_token"));
    var email = idToken.email;
    this.state = {ticket: [], email: email, routerKey: this.props.location.key};
  }
  componentDidMount(){
    this._isMounted = true;
    console.log("new router location key assigned")
    console.log(this.props.location.key);

    if (this._isMounted) {
      this.refresh();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.routerKey != this.props.location.key) {
      this.setState({routerKey: this.props.location.key})
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  refresh = () => {
    axios.get('http://localhost:4000/ticket/email/' + this.state.email)
      .then(response => {
        console.log("refreshing");
        console.log(response);
        this.setState({ ticket: response.data });
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
        <table className="table table-striped  text-white">
          <thead>
            <tr>
              <th>Date Submitted</th>
              <th>Ticket type</th>
              <th>Title</th>
              <th>Status</th>
              <th>Ticket ID</th>
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