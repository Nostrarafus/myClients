import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AuthServices from '../services/Services'
import LookContainer from './LookContainer';
import InfoContainer from './InfoContainer';

export default class Client extends Component {
  constructor() {
    super()
    this.state = {
      clientData: null,
    }
    this.service = new AuthServices()
  }


  componentDidMount() {
    this.getSingleClient();
    setTimeout(() => {
      this.sendCorrectInfo();
    }, 200);
  }

  getSingleClient = () => {
    const { params } = this.props.match;
    const clientID = params.id
    this.service.getSingleClient(clientID)
      .then(response => {
        console.log(response)
        this.setState({
          ...this.state,
          clientData: response
        });
      })
      .catch((err) => {
        console.log(err)
      })
  }

  sendCorrectInfo = () => {
    console.log(this.state.clientData)

  }

  render() {
    return (
      <div>
        <h3><Link to={'/profile'}>Volver al perfil</Link></h3>
        {
          (this.state.clientData)
            ?
            <React.Fragment>
              <h1>Aqui esta el perfil de: {this.state.clientData.clientName}</h1>
            </React.Fragment>
            : null
        }

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
                <InfoContainer clientID={this.state.clientData._id} infoData={this.state.clientData.infos[1].infoData} infoTitle={this.state.clientData.infos[1].infoTitle} infoID={this.state.clientData.infos[0]._id} ></InfoContainer>
                <InfoContainer clientID={this.state.clientData._id} infoData={this.state.clientData.infos[0].infoData} infoTitle={this.state.clientData.infos[0].infoTitle} infoID={this.state.clientData.infos[1]._id} ></InfoContainer>
                <InfoContainer clientID={this.state.clientData._id} infoData={this.state.clientData.infos[2].infoData} infoTitle={this.state.clientData.infos[2].infoTitle} infoID={this.state.clientData.infos[2]._id} ></InfoContainer>
              </React.Fragment>

              : null
          }
        </div>
      </div>
    )
  }
}
