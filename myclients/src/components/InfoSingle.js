import React, { Component } from 'react'
import moment from "moment";
import Button from 'react-bootstrap/Button'

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
            <Button size="sm" onClick={() => this.props.deleteInfo(this.props.infoData, this.props.infoID)}
              variant="outline-danger" >Delete</Button>
            {/* <button onClick={() => this.props.deleteInfo(this.props.infoData, this.props.infoID)}>
              Delete</button> */}
          </div>
          : null
        }
      </li>
    )
  }
}
