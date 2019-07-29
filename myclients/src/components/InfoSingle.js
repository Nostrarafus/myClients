import React, { Component } from 'react'
import moment from "moment";

export default class LookSingle extends Component {
  constructor() {
    super()
    this.timeStamp = null

  }

  componentDidMount() {
    this.timeStamp = moment(this.props.created_at).format("DD/MM/Y HH:mm")
  }

  render() {
    return (
      <li className="singleInfo">
        <div className="description-time-wrapper">
          <p>Description: {this.props.infoDescription}</p>
          <span className="timestamp">{this.timeStamp}</span>
        </div>
      </li>
    )
  }
}
