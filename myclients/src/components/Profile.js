import React, { Component } from 'react'
import AuthServices from '../services/Services';
import Clientview from './ClientView';
import { Link } from 'react-router-dom';
import ZoomImg from './ZoomImg'


export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addClient: "",
      allClients: [],
      userPhoto: {},
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

  getUserData = () =>{
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

  handlePhotoSubmit(e) {
    e.preventDefault()
    this.service.addUserPicture(this.state.file)
    this.getUserData()
  }


  handlePhotoChange(e) {
    // console.log("archivos seleccionado")
    // console.log(e.target.files[0])

    this.setState({
      ...this.state,
      file: e.target.files[0]
    })
  }

  render() {
    //console.log(this.state.userData)
    return (
      <div>
        <button onClick={this.props.logout}>Logout</button>
        <h1>Bienvenido {this.state.userData.username}</h1>
        <h2>Add a new client:</h2>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="addClient" value={this.state.addClient} onChange={(e) => this.handleClientChange(e)} />
          <input type="submit" value="Add Client" onClick={this.showAllClients} />
        </form>
        <div className="clientsList">
          {
            this.state.allClients.map((client, idx) => {
              return <div key={idx}>
                <Link to={`/client/` + client._id}>
                  <Clientview nombre={client.clientName} identificador={client._id} />
                </Link>
              </div>
            })
          }
        </div>

        <form onSubmit={(e) => this.handlePhotoSubmit(e)}>
          <input type="file" onChange={(e) => this.handlePhotoChange(e)} /> <br />
          <button type="submit">Update your profile pic</button>
        </form>
        <div className="userPic">
          {(this.state.userData.picture) ? <ZoomImg src={this.state.userData.picture[0].imgPath} alt={this.state.userData.picture[0].imgName} /> : ""}
        </div>

        
      </div>
    )
  }
}
