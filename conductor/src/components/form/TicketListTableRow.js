import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class TableRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
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
    let objDate = new Date(this.props.obj.dateOfCreation);
    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let displayDate = objDate.toLocaleDateString("en-US", dateOptions);
    return (
        <tr>
          <td>
            {this.props.indice}
          </td>
          <td>
            {this.props.obj.formType}
          </td>
          <td>
            {this.props.obj.topics}
          </td>
          <td>
            {this.props.obj.title}
          </td>
          <td>
            {this.props.obj.statusToClient}
          </td>
          <td>
            {displayDate}
          </td>
          <td>
          <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;