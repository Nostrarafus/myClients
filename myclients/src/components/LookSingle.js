import React, { Component } from 'react'
import ZoomImg from './ZoomImg';
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
console.log(this.timeStamp)
    return (
      <li className="singleLook">
        <div className="img-description-time-wrapper">
          <ZoomImg src={this.props.picture} />
          <p>Description: {this.props.lookDescription}</p>
          <span className="timestamp">{this.timeStamp}</span>
        </div>
      </li>
    )
  }
}
