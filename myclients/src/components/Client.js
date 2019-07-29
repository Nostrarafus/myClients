import React, { Component } from 'react'
import AuthServices from '../services/Services'
import LookContainer from './LookContainer';
import InfoContainer from './InfoContainer';

export default class Client extends Component {
  constructor() {
    super()
    this.state = {
      userData: {},
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
        console.log(response)
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
    this.getSingleClient()
    this.service.getUserData()
      .then(userData => {
        this.setState({
          ...this.state,
          userData: userData
        })
      })
  }


  render() {
    console.log(this.state.clientData)
    return (
      <div>
          <h1>Aqui esta el perfil de: {this.state.clientData.clientName}</h1>
        <div className="looksInClient">
        {
          (this.state.clientData)
            ?
            <React.Fragment>
              <LookContainer clientID={this.state.clientData._id} looksData={this.state.clientData.looks}></LookContainer>
            </React.Fragment>
            : null
        }
        </div>
        <div className="infosInClient">
        {
          (this.state.clientData)
            ?
            <React.Fragment>
              <InfoContainer clientID={this.state.clientData._id} infoData={this.state.clientData.infos}></InfoContainer>
            </React.Fragment>
            : null
        }
        </div>
      </div>
    )
  }
}
