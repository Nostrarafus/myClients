import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthServices from '../services/Services'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
          <Button type="submit" variant="outline-primary">Signup</Button>
        </Form>

        <p>Already have account?
          <Link to={"/login"}><p>Login</p> </Link>
        </p>
        </section>
      </React.Fragment>
    )
  }
}
