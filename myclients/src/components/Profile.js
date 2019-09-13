import React, { Component } from 'react'
import AuthServices from '../services/Services';
import Clientview from './ClientView';
import { Link } from 'react-router-dom';
import ZoomImg from './ZoomImg'
import Button from 'react-bootstrap/Button'
import coolbackground from '../img/cool-background.png'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addClient: "",
      allClients: [],
      file: null,
      userData: {},
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

  componentWillMount() {
    this.getUserData()
  }

  getUserData = () => {
    this.service.getUserData()
      .then(userData => {
        this.setState({
          ...this.state,
          userData: userData
        })
      })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const clientName = this.state.addClient;

    this.service.addClient(clientName)
      .then(response => {
        this.setState({
          ...this.state,
          addClient: "",
          allClients: response.clients,
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
    value.replace(/^ +/gm, '')
    this.setState({ [name]: value });
  }

  handlePhotoSubmit(e) {
    e.preventDefault()
    this.service.addUserPicture(this.state.file)
      .then(response => {
        this.setState({
          ...this.state,
          file: null,
          userData: response,
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
    console.log(this.state.file)
    return (
      <div className="profile-wrapper">
        <img className="cool-background" alt="cool-background" src={coolbackground}/> 
        {(this.state.userData.picture) ?
          <React.Fragment>
            <ZoomImg className="userPicture" src={this.state.userData.picture.imgPath} alt={this.state.userData.picture.imgName} />
          </React.Fragment>
          : ""}

        <Button className="logoutbutton" onClick={this.props.logout} variant="outline-secondary">Logout</Button>
        <h3 className="elegantshadow" id="userName">Bienvenido {this.state.userData.username}</h3>
        <section className="addClientWrapper">
          <h4>Add a new client:</h4>
          <form onSubmit={this.handleFormSubmit}>
            <input type="text" name="addClient"
              value={this.state.addClient}
              onChange={(e) => this.handleClientChange(e)} />
            {/* <input type="submit" value="Add Client" onClick={this.showAllClients} /> */}
          </form>
        </section>
        <div className="clientsList">
          {(this.state.allClients.picture) ?
            this.state.allClients.map((client, idx) => {
              return <div key={idx}>
                <Link to={`/client/` + client._id}>
                  <Clientview nombre={client.clientName} identificador={client._id} pic={client.picture.imgPath} />
                </Link>
              </div>
            })
            : this.state.allClients.map((client, idx) => {
              return <div key={idx}>
                <Link to={`/client/` + client._id}>
                  <Clientview nombre={client.clientName} identificador={client._id} />
                </Link>
              </div>
            })
          }
        </div>

        <form className="userPicFormWrapper" onSubmit={(e) => this.handlePhotoSubmit(e)}>
          <Button type="submit" variant="outline-success">Update your profile pic</Button>
          <input type="file" onChange={(e) => this.handlePhotoChange(e)} /> <br />
        </form>
      </div>
    )
  }
}
