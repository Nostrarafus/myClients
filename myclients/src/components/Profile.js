import React, { Component } from 'react'
import AuthServices from '../services/Services';
import Clientview from './ClientView';
import { Link } from 'react-router-dom';

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addClient: "",
      allClients: [],
    }
    this.service = new AuthServices();
  }

  componentDidMount() {
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
        console.log(response)
        this.setState({
          ...this.state,
          addClient: "",
          allClients: response,
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
    console.log(this.state.allClients)
    return (
      <div>
        <button onClick={this.props.logout}>Logout</button>
        <h1>Bienvenido {}</h1>
        <h2>Add a new client:</h2>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="addClient" value={this.state.addClient} onChange={(e) => this.handleClientChange(e)} />
          <input type="submit" value="Add Client" onClick={this.showAllClients} />
        </form>
        <ol className="clientsList">
          {
            this.state.allClients.map((client, idx) => {
              return <li key={idx}>
                <Link to={`/client/` + client._id}>
                  <Clientview nombre={client.clientName} identificador={client._id} />
                </Link>
              </li>
            })
          }
        </ol>
      </div>
    )
  }
}
