import React, { Component } from 'react'
import checkbox from "../img/checkbox.png"
import checkboxEnabled from "../img/checkbox-enabled.png"

export default class TaskSingle extends Component {


  render() {
    console.log(this.props)
    return (
      <li className="task">
        {/* <input type="checkbox" className="done"></input> */}

        {
          this.props.taskData.done
            ?
            <img src={checkboxEnabled} className="done" alt="" onClick={() => this.props.toggleDone(this.props.taskData._id)}></img>
            :
            <img src={checkbox} className="done" alt="" onClick={() => this.props.toggleDone(this.props.taskData._id)}></img>
        }

        <svg className="favourite" style={{ fill: this.props.taskData.favourited ? "yellow" : "grey" }}
          onClick={() => this.props.toggleFavourite(this.props.taskData._id)}
          xmlns="http://www.w3.org/2000/svg" width="12" height="12"
          viewBox="0 0 24 24">
          <path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>

        <div className="name-timestamp-wrapper">
          <h3 className="name" title={this.props.taskData.description}>{this.props.taskData.description}</h3>
          <button onClick={() => this.props.deleteTaskInfo(this.props.taskData._id)}>Delete</button>
          {/* <span className="timestamp">{this.props.timestamp}</span> */}
        </div>
      </li> 
    )
  }
}


//this.props.taskData.description,