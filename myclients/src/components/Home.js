import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <h1 className="deepshadow">Welcome to myClients app</h1>
        <div className="homeFlex"></div>
        <div className="logLink">  <Link className="link" to={'/login'}> <h3 className="retroshadow">Login</h3>  </Link></div>
        <div className="signLink"> <Link className="link" to={'/signup'}> <h3 className="retroshadow">Signup</h3>  </Link></div>
      </div>
    )
  }
}