import React, { Component } from 'react'
import moment from "moment";

export default class LookSingle extends Component {
  constructor() {
    super()
    this.state = {
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
    // console.log(this.props)
    return (
      <li className="singleInfo">
        <div className="description-time-wrapper">
          {(this.props) ?
            <p>Description: {this.props.infoData}</p>
            : null}

          {/* <span className="timestamp">{this.state.timeStamp}</span> */}
        </div>
      </li>
    )
  }
}
