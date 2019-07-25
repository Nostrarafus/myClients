import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './sass/main.scss';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import AuthServices from './services/Services';
import Home from './components/Home';
import Client from './components/Client';

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
            <Route exact path='/' render={() => { return <Redirect to="/profile" /> }} />
            <Route exact path='/login' render={() => { return <Redirect to="/profile" /> }} />
            <Route exact path='/profile' render={() => <Profile {...this.state.loggedInUser} logout={this.logout} />} />
            <Route exact path='/client/:id' component={Client} />
          </Switch>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Switch>
            <Route exact path='/' render={() => <Home />} />
            <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser} />} />
            <Route exact path='/login' render={() => <Login getUser={this.getTheUser} />} />
            <Route render={() => { return <Redirect to="/login" /> }} />
          </Switch>

        </React.Fragment>
      )
    }
  }
}

export default App;
