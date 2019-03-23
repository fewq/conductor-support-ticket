import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { convertDateToString, renderTopics } from "./helper";


class TableRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.state = {ticket: this.props.obj};
  }
  
  delete() {
    axios.get('http://localhost:4000/ticket/delete/' + this.props.obj._id)
      .then(res => {
        console.log('deleted' + this.props.obj._id);
        this.props.delete(this.props.indice);
      })
      .catch(err => console.log(err))
  }


  render() {
   
    let displayDate = convertDateToString(this.props.obj.dateOfCreation);
    return (
        <tr>
          <td>
            {displayDate}
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
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;