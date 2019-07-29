import React, { Component } from 'react'
import ZoomImg from './ZoomImg';
import moment from "moment";



export default class LookSingle extends Component {
  constructor() {
    super()
    this.state={
      timeStamp: null
    }
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      timeStamp: moment(this.props.created_at).format("dddd, MMMM Do YYYY, H:mm ")
    })
  }

  render() {
    return (
      <li className="singleLook">
        <div className="img-description-time-wrapper">
          <ZoomImg src={this.props.picture} />
          <p>Description: {this.props.lookDescription}</p>
          <span className="timestamp">{this.state.timeStamp}</span>
        </div>
      </li>
    )
  }
}
