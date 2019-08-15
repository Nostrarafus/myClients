import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthServices from '../services/Services'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import hero from '../img/hero-laptop.jpg'

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.service = new AuthServices();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service.signup(username, password)
      .then(response => {
        this.setState({
          username: "",
          password: "",
        });
        // this.props.getUser(response)
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          error: true
        });
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <React.Fragment>
        <div className="formwrapper">
        <img className="hero-background" alt="hero" src={hero}/>
         <h2  className="elegantshadow">Signup to MyClients APP </h2>
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
          <Button className="login-button" type="submit" variant="outline-secondary">Signup</Button>
        </Form>

        <p>Already have account?
          <Link to={"/login"}><span>Login</span> </Link>
        </p>
        </section>
        </div>
      </React.Fragment>
    )
  }
}
