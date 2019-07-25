import React, { Component } from 'react'
import AuthServices from '../services/Services'

export default class Client extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.service = new AuthServices()
  }


  componentDidMount() {
    this.getSingleClient();
  }

  getSingleClient = () => {
    const { params } = this.props.match;
    const clientID = params.id
    this.service.getSingleClient(clientID)
      .then(response => {
        const theclient = response[0];
        this.setState(theclient);
      })
      .catch((err) => {
        console.log(err)
      })
  }



  render() {
    return (
      <div>
        <h1>Aqui esta el perfil de: {this.state.clientName}</h1>
      </div>
    )
  }
}
