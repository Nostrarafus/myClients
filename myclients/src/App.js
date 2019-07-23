import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import AuthServices from './services/Services';

class App extends Component {
  constructor(props) {
    super(props)
    //arrancamos el estado con un valor de loggedInUser con nada (luego lo vamos a reemplazar con el valor real)
    this.state = { loggedInUser: null };
    this.service = new AuthServices();
  }


  fetchUser = () => {
    if (this.state.loggedInUser === null) {
    //utilizamos el método loggedin para cualquier momento que deseemos obtener la información del usuario quede guardada en el state de app
    this.service.loggedin()
      .then(response => {
        this.setState({
          loggedInUser: response
        })
      })
      .catch(err => {
        this.setState({
          loggedInUser: false
        })
      })
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  logout = () => {
    this.service.logout()
      .then(() => {
        this.setState({ loggedInUser: null });
      })
  }


  render() {
    this.fetchUser()
    if (this.state.loggedInUser) {
      return (
        <React.Fragment>
          <Switch>
            <Route exact path='/profile' render={() => <Profile {...this.state.loggedInUser} logout={this.logout} />} />

          </Switch>

        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Switch>
            <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser} />} />
            <Route exact path='/login' render={() => <Login getUser={this.getTheUser} />} />
          </Switch>

        </React.Fragment>
      )
    }
  }
}

export default App;
