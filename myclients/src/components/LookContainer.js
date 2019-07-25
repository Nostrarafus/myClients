import React, { Component } from 'react'
import LookList from './LookList';

export default class LookContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newLookDescription: "",
      newLookPic: "",
      allLooks: []
    }

  }

  updateNewLookDescription(e) {
    this.setState({
      ...this.state,
      newLookDescription: e.target.value
    })
  }

  addNewTask(e) {
    if (e.key === 'Enter') {
      this.service.addNewLook()
        .then(createdLook => {
          let looksClonedArray = [...this.state.allLooks]
          let createdLook = createdLook.data

          tasksClonedArray.unshift(
            new TaskElement(createdTask._id, createdTask.description, createdTask.timestamp, createdTask.favourited, createdTask.done)
          )

          this.setState({
            ...this.state,
            tasks: looksClonedArray,
            newTaskString: ""
          })
        })
    }
  }

  render() {
    console.log(this.props)
    return (
      <section className="task-collection">
        <input type="text"
          placeholder="Add a new Look"
          className="add-new-look"
          value={this.state.newLookDescription}
          onChange={(e) => this.updateNewLookDescription(e)}
          onKeyDown={(e) => this.addNewLook(e)} />

        <LookList Looks={this.state.allLooks} />

      </section>
    )
  }
}
