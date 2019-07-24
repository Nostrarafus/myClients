import axios from 'axios'

export default class AuthServices {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
 
  }

  addClient = (clientName) => {
    console.log(clientName)
    return this.service.post('/index/addClient', {clientName})
    .then(response => response.data )
  }

  signup = (username, password) => {
    return this.service.post('/auth/signup', {username, password})
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/auth/login', {username, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/auth/loggedin',)
    .then(response => response.data)
  }

  logout = () => {
    return this.service.get('/auth/logout',)
    .then(response => response.data)
  }
}