import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AuthServices from '../services/Services'
import LookContainer from './LookContainer';
import InfoContainer from './InfoContainer';
import TaskContainer from './TaskContainer';
import ZoomImg from './ZoomImg';

export default class Client extends Component {
  constructor() {
    super()
    this.state = {
      clientData: null,
      file: null
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
        this.setState({
          ...this.state,
          clientData: response
        });
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
    this.service.addNewInfoBox(infoTitle, clientID)
      .then(response => {
        this.setState({
          ...this.state,
          clientData: response
        });
      })
  }


  handlePhotoSubmit(e) {
    e.preventDefault()
    const clientID = this.state.clientData._id
    const clientName = this.state.clientData.clientName
    this.service.addClientPicture(this.state.file, clientID, clientName)
      .then(response => {
        this.setState({
          ...this.state,
          file: null,
          clientData: response,
        });
      })
  }


  handlePhotoChange(e) {
    this.setState({
      ...this.state,
      file: e.target.files[0]
    })
  }



  render() {

    return (
      <div>
        <h3><Link to={'/profile'}>Volver al perfil</Link></h3>

        {
          (this.state.clientData)
            ?
            <React.Fragment>
              <h1>Cliente {this.state.clientData.clientName}</h1>
            </React.Fragment>
            : <h3>Loading...</h3>
        }
        {
          (this.state.clientData)
            ?
            <React.Fragment>
              <form onSubmit={(e) => this.handlePhotoSubmit(e)}>
                <input type="file" onChange={(e) => this.handlePhotoChange(e)} /> <br />
                <button type="submit">Update your {this.state.clientData.clientName} pic</button>
              </form>
              <div className="clientPic">
                {(this.state.clientData.picture) ?
                  <React.Fragment>
                    <ZoomImg src={this.state.clientData.picture.imgPath} alt={this.state.clientData.picture.imgName} />
                  </React.Fragment>
                  : ""}
              </div>
            </React.Fragment>
            : <h3>Loading...</h3>
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
              : <h3>Loading...</h3>
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

              : <h3>Loading...</h3>
          }
        </div>
        <div className="taskContainer">
          {
            (this.state.clientData)
              ?
              <React.Fragment>
                <TaskContainer
                  taskData={this.state.clientData.tasks}
                  clientID={this.state.clientData._id}
                />

              </React.Fragment>
              : <h3>Loading...</h3>
          }
        </div>
      </div>
    )
  }
}
