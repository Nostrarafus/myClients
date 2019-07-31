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
  }

  getSingleClient = () => {
    const { params } = this.props.match;
    const clientID = params.id
    this.service.getSingleClient(clientID)
      .then(response => {
        // console.log(response)
        this.setState({
          ...this.state,
          clientData: response
        });
      })
      .catch((err) => {
        console.log(err)
      })
  }

  addNewInfoBox() {
    let infoTitle
    let popUp = prompt("Please name the new info box", "Favourite movies")
    if (popUp === null || popUp === "") {
      infoTitle = undefined;
    } else {
      infoTitle = popUp;
    }
    const { params } = this.props.match;
    const clientID = params.id
    console.log(clientID)
    console.log(infoTitle)
    this.service.addNewInfoBox(infoTitle, clientID)
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
                <LookContainer
                  clientID={this.state.clientData._id}
                  looksData={this.state.clientData.looks}>
                </LookContainer>
              </React.Fragment>
              : null
          }
        </div>
        <div className="infosInClient">
          {
            (this.state.clientData)
              ?
              <React.Fragment>
                {
                  this.state.clientData.infos.map((info, idx) => {
                    return (
                      <InfoContainer
                        key={idx}
                        clientID={this.state.clientData._id}
                        infoData={info.infoData}
                        infoTitle={info.infoTitle}
                        infoID={info._id} />
                    )
                  })
                }

                <button onClick={() => this.addNewInfoBox()}>Add a new Infobox for your client</button>
              </React.Fragment>

              : null
          }
        </div>
      </div>
    )
  }
}
