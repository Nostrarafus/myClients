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
      listTitle: {
        hobbies: "Hobbies",
        dp: "Datos personales",
        restaurantes: "Restaurantes visitados",
      }
    }
    this.service = new AuthServices()
  }


  componentDidMount() {
    this.getSingleClient();
    // setTimeout(() => {
    //   console.log(this.state.clientData.infos)
    // }, 500);
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


  render() {
    console.log(this.state.clientData)
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
                <InfoContainer clientID={this.state.clientData._id} infoData={this.state.clientData.infos} title={this.state.listTitle.hobbies}></InfoContainer>
                <InfoContainer clientID={this.state.clientData._id} infoData={this.state.clientData.infos} title={this.state.listTitle.dp} ></InfoContainer>
                <InfoContainer clientID={this.state.clientData._id} infoData={this.state.clientData.infos} title={this.state.listTitle.restaurantes}></InfoContainer>
              </React.Fragment>

              : null
          }
        </div>
      </div>
    )
  }
}
