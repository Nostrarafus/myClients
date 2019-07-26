import axios from 'axios'

const errHandler = err => {
  // console.error(err);
  if (err.response && err.response.data) {
    // console.error("API response", err.response.data);
    throw err.response.data.message
  }
  throw err;
}



export default class AuthServices {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })

  }


  signup = (username, password) => {
    return this.service.post('/auth/signup', { username, password })
      .then(response => response.data)
      .catch(errHandler);
  }

  login = (username, password) => {
    return this.service.post('/auth/login', { username, password })
      .then(response => response.data)
      .catch(errHandler);
  }

  loggedin = () => {
    return this.service.get('/auth/loggedin')
      .then(response => response.data)
      .catch(errHandler);
  }

  logout = () => {
    return this.service.get('/auth/logout')
      .then(response => response.data)
      .catch(errHandler);
  }

  addClient = (clientName) => {
    return this.service.post('/addClient', { clientName })
      .then(response => response.data)
      .catch(errHandler);
  }

  showAllClients = () => {
    return this.service.get('/allClients')
      .then(response => response.data)
      .catch(errHandler);
  }


  getSingleClient = (clientID) => {
    return this.service.get(`/client/${clientID}`)
      .then(response => response.data)
      .catch(errHandler);
  }


  addUserPicture = (file) => {
    const formData = new FormData();
    formData.append("photo", file)
    return this.service.post('/users/Userpic', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.data)
      .catch(errHandler);
  }

  getUserData = () => {
    return this.service.get('/user')
      .then(response => response.data)
      .catch(errHandler);
  }

  addNewLook = (newLook, clientID) => {
    return this.service.post('/addLook', { newLook , clientID })
      .then(response => response.data)
      .catch(errHandler);
  }

  getLooks = (clientID) => {
    return this.service.get('/allLooks', { clientID })
      .then(response => response.data)
      .catch(errHandler);
  }
}