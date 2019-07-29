import React, { Component } from 'react'

export default class InfoSingle extends Component {
  render() {
    return (
      <li className="singleInfo">
        <div className="info-description-time-wrapper">
          <h1>Title:{this.props.title}</h1>
          <p>Description: {this.props.description}</p>
          <span className="timestamp">{this.props.timestamp}</span>
        </div>
      </li>
    )
  }
}
