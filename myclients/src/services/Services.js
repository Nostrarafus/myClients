import axios from 'axios'

const errHandler = err => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message
  }
  throw err;
}


export default class AuthServices {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_URL,
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

  getSingleClient = (clientID) => {
    return this.service.post(`/clientData`, { clientID })
      .then(response => response.data)
      .catch(errHandler);
  }

  addNewLook = (newLook, clientID, file) => {
    console.log(newLook, clientID)
    const formData = new FormData();
    formData.append("photo", file)
    formData.append("newLook", newLook)
    return this.service.post(`/client/${clientID}/addNewLook`, formData)
      .then(response => response.data)
      .catch(errHandler);
  }

  addNewInfo = (newInfo, clientID, infoTitle) => {
    return this.service.post(`/client/${clientID}/addNewInfo`, { newInfo, infoTitle })
      .then(response => response.data)
      .catch(errHandler);
  }

  addNewInfoBox = (infoTitle, clientID) => {
    return this.service.post(`/addNewInfoBox`, { infoTitle, clientID })
      .then(response => response.data)
      .catch(errHandler);
  }

  deleteInfo = (info, infoID) => {
    console.log(info)
    return this.service.post(`/deleteInfo`, { info, infoID })
      .then(response => response.data)
      .catch(errHandler);
  }

  addNewTask = (newTask, clientID) => {
    return this.service.post(`/addTask`, { newTask, clientID })
      .then(response => response.data)
      .catch(errHandler);
  }

  deleteTaskInfo = (taskID, clientID) => {
    return this.service.post(`/deleteTaskInfo`, { taskID, clientID })
      .then(response => response.data)
      .catch(errHandler);
  }

  toggleTask = (taskID, clientID, done, fav) => {
    return this.service.post(`/toggle`, { taskID, clientID, done, fav })
      .then(response => response.data)
      .catch(errHandler);
  }

  addClientPicture = (file, clientID, clientName) => {
    const formData = new FormData();
    formData.append("photo", file)
    formData.append("clientName", clientName)
    return this.service.post(`/client/${clientID}/addClientPic`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.data)
      .catch(errHandler);
  }

}


  // getLooks = (clientID) => {
  //   return this.service.get(`/client/${clientID}/allLooks`)
  //     .then(response => response.data)
  //     .catch(errHandler);
  // }