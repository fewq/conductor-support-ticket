import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      formType: "",
      topics: [],
      description: ""
    }
  }

  componentDidMount() {
      axios.get('http://localhost:4000/ticket/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                formType: response.data.formType, 
                topics: response.data.topics,
                description: response.data.description });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      formType: this.state.formType,
      topics: this.state.topics,
      description: this.state.description
    };
    axios.post('http://localhost:4000/ticket/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/restricted');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Edit Ticket</h3>
            <form onSubmit={this.onSubmit}>
            
                <div className="form-group">
                    <label htmlFor="description" style={{ display: "block" }}>
                        Your Message
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Ticket" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}