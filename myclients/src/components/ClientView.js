import React, { Component } from 'react'

export default class Clientview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clientview: this.props.nombre
    }
  }



  render() {
    return (
      <React.Fragment>
        <div className="clientViewWrapper">
          <div className="clientview">
            <div className="coolName"> {this.props.nombre}</div>
          </div>
          {
            (this.props.pic)?
            <img className="clientviewpic" src={this.props.pic} alt="" />
            :""
          }
        </div>
      </React.Fragment>
    )
  }
}
