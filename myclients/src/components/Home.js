import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import hero from '../img/hero-laptop.jpg'

export default class Home extends Component {
  render() {
    return (
      <div className="home-background">
        <img className="hero-background" alt="hero" src={hero}/>
      <div className="home">
        <h1 className="deepshadow" id="home-title">Welcome to myClients app</h1>
        <div className="logLink">  <Link className="link-home" to={'/login'}> <h3 className="deepshadow">Login</h3>  </Link></div>
        <div className="signLink"> <Link className="link-home" to={'/signup'}> <h3 className="deepshadow">Signup</h3>  </Link></div>
      </div>
      </div>
    )
  }
}