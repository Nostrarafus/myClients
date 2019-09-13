import React, { Component } from 'react';
import AuthServices from '../services/Services';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import hero from '../img/hero-laptop.jpg'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthServices();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
      .then(response => {
        this.setState({ username: "", password: "" });
        this.props.getUser(response);
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="formwrapper" >
        <img className="hero-background" alt="hero" src={hero}/>
        <h2  className="elegantshadow">Login to MyClients APP </h2>
        <section className="loginBox">
      <Form onSubmit={this.handleFormSubmit}>
        <Form.Group controlId="formGroupUserName">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Jon Snow" name="username"
            value={this.state.username} onChange={e => this.handleChange(e)} />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" 
            value={this.state.password} onChange={e => this.handleChange(e)} />
        </Form.Group>
        <button type="submit" className="login-button">Login</button>

      </Form>

      <p>Don't have account?
            <Link to={"/signup"}> <span>Signup</span> </Link>
        </p>
        </section>
      </div>
    )
  }
}

export default Login;



