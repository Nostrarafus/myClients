import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import AuthServices from '../services/Services'
import LookContainer from './LookContainer';
import InfoContainer from './InfoContainer';
import TaskContainer from './TaskContainer';
import ZoomImg from './ZoomImg';
import MyContainer from './MyPoseContainer';
import Button from 'react-bootstrap/Button'


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
        <h5><Link to={'/profile'}>Volver a tu perfil</Link></h5>
<div className="client-name-pic-wrapper">
        {
          (this.state.clientData)
            ?
            <React.Fragment>
              <h3 className="retroshadow">Perfil de {this.state.clientData.clientName}</h3>
            </React.Fragment>
            : <h3 className="">Loading...</h3>
        }
        {
          (this.state.clientData)
            ?
            <React.Fragment>
              <div className="clientPic">
                {(this.state.clientData.picture) ?
                  <React.Fragment>
                    {/* <MyContainer className={"clientPicContainer"}> */}
                    <ZoomImg src={this.state.clientData.picture.imgPath} alt={this.state.clientData.picture.imgName} />
                    {/* </MyContainer> */}
                  </React.Fragment>
                  : ""}
              </div>

            </React.Fragment>
            : <h3 className="elegantshadow">Loading...</h3>
        }
        </div>
        {
           (this.state.clientData)
           ?
           <React.Fragment> 
              <form onSubmit={(e) => this.handlePhotoSubmit(e)} className="clientPicForm">
                <input type="file" onChange={(e) => this.handlePhotoChange(e)} /> 
                <Button type="submit" variant="outline-info">Update your {this.state.clientData.clientName} pic</Button>
              </form>
           </React.Fragment>
        :<h3>Loading...</h3>
        }

        <div className="looksInClient">
          <h5>What where you wearing the last visits:</h5>
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
                 <div className="col-lg-12 text-center">
                {
                  this.state.clientData.infos.map((info, idx) => {
                    return (
                      <MyContainer key={idx}>
                        <InfoContainer className={'infoContainer'}
                          key={idx}
                          clientID={this.state.clientData._id}
                          infoData={info.infoData}
                          infoTitle={info.infoTitle}
                          infoID={info._id} />
                      </MyContainer>
                    )
                  })
                }
                </div>
                <div className="col-lg-12 text-center">
                <Button  onClick={() => this.addNewInfoBox()} type="submit" variant="outline-info">Add a new Infobox for your client</Button>
                </div>
              </React.Fragment>

              : <h3 className="elegantshadow">Loading...</h3>
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
              : <h3 className="elegantshadow">Loading...</h3>
          }
        </div>
      </div>
    )
  }
}
