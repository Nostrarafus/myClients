import React, { Component } from 'react'
import AuthServices from '../services/Services'
import LookContainer from './LookContainer';

export default class Client extends Component {
  constructor() {
    super()
    this.state = {
      userData:{},
      clientData: null
    }
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
        this.setState({
          ...this.state,
          clientData: theclient
        });
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentWillMount() {
    this.service.getUserData()
      .then(userData => {
        this.setState({
          ...this.state,
          userData: userData
        })
      })
  }


  render() {
    return (
      <div>
        {
          (this.state.clientData)
          ?
          <React.Fragment>
        <h1>Aqui esta el perfil de: {this.state.clientData.clientName}</h1>
        <LookContainer clientData={this.state.clientData}></LookContainer>
        </React.Fragment>
          :null
          }
      </div>
    )
  }
}
