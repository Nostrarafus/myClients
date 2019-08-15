import React, { Component } from 'react';
import AuthServices from '../services/Services';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
        <Button type="submit" variant="outline-primary">Login</Button>

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




/* <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

          <input type="submit" value="Login" />
        </form>
        <p>Don't have account?
            <Link to={"/signup"}> Signup</Link>
        </p>
      </div>  */

//       <React.Fragment>
//         <form onSubmit={this.handleFormSubmit} className="form">
//           <div className='form__field-wrapper'>
//             <input
//               className='form__field-input'
//               type='text'
//               name='username'
//               value={this.state.username}
//               placeholder='Jon Snow'
//               onChange={(e) => this.handleChange(e)}/>
//             <label className='form__field-label' htmlFor='username'>
//               Username
//         </label>
//           </div>
//           <div className='form__field-wrapper'>
//             <input
//               className='form__field-input'
//               name='password'
//               type='password'
//               value={this.state.password}
//               placeholder='••••••••••'
//               onChange={e => this.handleChange(e)} />
//             <label className='form__field-label' htmlFor='password'>
//               Password
//         </label>
//           </div>
//           <div className='form__submit-btn-wrapper'>
//             {/* {this.props.currentlySending ? (
//               <LoadingButton />
//             ) : ( */}
//                 <input type="submit" value="Login" />
//               {/* )} */}
//           </div>
//         </form>

//         <p>Don't have account?
// <Link to={"/signup"}> Signup</Link>
//         </p>

//       </React.Fragment>