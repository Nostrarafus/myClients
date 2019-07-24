import React, { Component } from 'react'

export default class Clientview extends Component {
  state= {
      id: this.props.identificador
    }
  

  render() {
    return (
      <React.Fragment>
        <h1>Cliente:{this.props.nombre}</h1>
      </React.Fragment>
    )
  }
}
