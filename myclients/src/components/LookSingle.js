import React, { Component } from 'react'
import ZoomImg from './ZoomImg';
import moment from "moment";
import Button from 'react-bootstrap/Button'




export default class LookSingle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeStamp: null,
      lookID: this.props,
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
      <div className="singleLook">
        <div className="lookPicDiv">
        <ZoomImg className="lookPic" src={this.props.picture} />
        </div>
        <div className="description-time-wrapper">
          <p>Description: {this.props.lookDescription}</p>
          <span className="timestamp">{this.state.timeStamp}</span>
          <Button size="sm" onClick={() => this.props.deleteLook(this.props._id)}
            variant="outline-danger" >Delete</Button>
        </div>
      </div>
    )
  }
}
