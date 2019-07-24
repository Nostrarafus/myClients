import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <h1>Welcome to myClients app</h1>
        <div className="logLink">  <Link className="link" to={'/login'}> <h1>Login</h1>  </Link></div>
        <div className="signLink"> <Link className="link" to={'/signup'}> <h1>Signup</h1>  </Link></div>
      </div>
    )
  }
}