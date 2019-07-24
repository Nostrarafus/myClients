import React, { Component } from 'react'
import AuthServices from '../services/Services';

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addClient: "",
      allClients: []
    }
    this.service = new AuthServices();
  }

  componentDidMount() {
    this.service.showAllClients()
      .then(allClients => {
        const names = allClients.map(client => client.clientName)
        this.setState({
          ...this.state,
          allClients: names
        });
      })
  }



  showAllClients = () => {
    this.service.showAllClients()
      .then(allClients => {
        this.setState({
          ...this.state,
          allClients: allClients
        });
      })
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
    this.showAllClients()
  }

  handleClientChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <button onClick={this.props.logout}>Logout</button>
        <h1>Bienvenido {}</h1>
        <h2>Add a new client:</h2>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="addClient" value={this.state.addClient} onChange={(e) => this.handleClientChange(e)} />
          <input type="submit" value="Add Client" />
        </form>
        <ol className="clientsList">
          {
            this.state.allClients.map((client,idx)=>{
              return <li key={idx}>{client}</li>
            })
          }
        </ol>
      </div>
    )
  }
}
