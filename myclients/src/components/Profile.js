import React, { Component } from 'react'
import AuthServices from '../services/Services';

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addClient: ""
    }
    this.service = new AuthServices();
  }
  
  
  handleFormSubmit = (event) => {
    event.preventDefault();
    const clientName = this.state.addClient;
    
    this.service.addClient(clientName)
    .then(response => {
      this.setState({
        addClient: "",
      });
    })
    .catch(error => {
      this.setState({
        addClient: clientName,
        error: true
      });
    })
  }
  
  handleClientChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  
  render() {
    //console.log(this.state.addClient);
    return (
      <div>
        <button onClick={this.props.logout}>Logout</button>
        <h1>Bienvenido </h1>
        <h2>Add a new client:</h2>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="addClient" value={this.state.addClient} onChange={e => this.handleClientChange(e)} />
          <input type="submit" value="Add Client" />
        </form>
      </div>
    )
  }
}
