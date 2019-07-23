import React, { Component } from 'react'

export default class Profile extends Component {
  render() {
    return (
      <div>
        <h1>ESTAS LOGUEADO SITO</h1>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    )
  }
}
