import React, { Component } from 'react'
import moment from "moment";

export default class LookSingle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeStamp: null,
      infoID: this.props.infoID,
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
      <li className={this.state.infoID + "singleInfo"}>

        {(this.props) ?
          <div className="description-wrapper">
            <p>{this.props.infoData}</p>
            <button onClick={() => this.props.deleteInfo(this.props.infoData, this.props.infoID)}>Delete</button>
          </div>
          : null
        }
      </li>
    )
  }
}
