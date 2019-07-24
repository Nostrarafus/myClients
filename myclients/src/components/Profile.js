import React, { Component } from 'react'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {}

  }
  render() {
    return (
      <div>
        <h1>Bienvenido </h1>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    )
  }
}
