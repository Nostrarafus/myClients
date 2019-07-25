import React, { Component } from 'react'
import ZoomImg from './ZoomImg';

export default class OutlookSingle extends Component {


  render() {
    return (
      <li className="singleOutlook">
        <div className="img-description-time-wrapper">
          <ZoomImg />
          <p>Description: {this.props.description}</p>
          <span className="timestamp">{this.props.timestamp}</span>
        </div>
      </li>
    )
  }
}
