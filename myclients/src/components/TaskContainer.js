import React, { Component } from 'react'
import TaskList from './TaskList';
import AuthServices from '../services/Services';


export default class TaskContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTaskDescription: "",
      taskData: this.props.taskData,
      clientID: this.props.clientID,
    }
    this.service = new AuthServices();
  }

  toggle(taskID, property) {
    const clientID = this.state.clientID
    let chosenTask = this.state.taskData.filter(task => task._id === taskID)[0]
    chosenTask[property] = !chosenTask[property]
    this.service.toggleTask(taskID, clientID, chosenTask.done, chosenTask.favourited)
      .then(response => {
        this.setState({
          ...this.state,
          taskData: response.tasks,
        });
      })
  }

  updatenewTaskDescription(e) {
    let regexp = e.target.value
    regexp.replace(/^ +/gm, '')
    this.setState({
      ...this.state,
      newTaskDescription: regexp
    })
  }

  addNewTask(e) {
    const newTask = this.state.newTaskDescription
    const clientID = this.state.clientID
    if (e.key === 'Enter') {
      this.service.addNewTask(newTask, clientID)
        .then(response => {
          this.setState({
            ...this.state,
            newTaskDescription: "",
            taskData: response.tasks,
          });
        })
    }
  }

  deleteTaskInfo = (taskID) => {
    const clientID = this.state.clientID
    this.service.deleteTaskInfo(taskID, clientID)
      .then(response => {
        this.setState({
          ...this.state,
          newTaskDescription: "",
          taskData: response.tasks,
        });
      })

  }

  render() {
    return (
      <section className="task-collection">
        <input type="text"
          placeholder="Add a new task"
          className="add-new-task"
          value={this.state.newTaskDescription}
          onChange={(e) => this.updatenewTaskDescription(e)}
          onKeyDown={(e) => this.addNewTask(e)} />

        {(this.state.taskData) ?
          <TaskList
            taskData={this.state.taskData}
            toggleDone={(task) => this.toggle(task, "done")}
            toggleFavourite={(task) => this.toggle(task, "favourited")}
            deleteTaskInfo={this.deleteTaskInfo}
          >
          </TaskList>
          : <h3>Loading...</h3>
        }
      </section>
    )
  }
}
