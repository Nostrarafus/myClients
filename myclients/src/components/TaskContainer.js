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

  componentDidMount() {
    // axios
    //     .get("http://localhost:7000/tasks")
    //     .then(taskData => {
    //         taskData = taskData.data.map(task => {
    //             return new TaskElement(
    //                 task._id, task.description, task.timestamp, task.favourited, task.done
    //             )
    //         })

    //         this.setState({
    //             ...this.state,
    //             tasks: taskData
    //         })
    //     })
  }

  toggle(taskID, property) {
    let chosenTask = this.state.tasks.filter(task => task._id === taskID)[0]
    chosenTask[property] = !chosenTask[property]
    console.log(chosenTask)
    // this.service.toggle()
    // axios
    //   .put(`http://localhost:7000/task/${taskID}`, {
    //     done: chosenTask.done,
    //     favourited: chosenTask.favourited
    //   })
    //   .then(updatedTaskInfo => {
    //     console.log(updatedTaskInfo);

    //     this.setState({
    //       ...this.state
    //     })
    //   })
  }

  updateNewTaskString(e) {
    this.setState({
      ...this.state,
      newTaskDescription: e.target.value
    })
  }

  addNewTask(e) {
    const newTask = this.state.newTaskDescription
    const clientID = this.state.clientID
    // const infoTitle = this.state.infoTitle
    if (e.key === 'Enter') {
      this.service.addNewTask(newTask, clientID)
        .then(response => {
          console.log(response.infoData)
          // this.setState({
          //   ...this.state,
          //   newTaskDescription: "",
          //   taskData: response,
          // });
        })
        .catch(error => {
          this.setState({
            newInfoDescription: newTask,
            error: true
          });
        })
    }
  }

  render() {
    return (
      <section className="task-collection">
        <input type="text"
          placeholder="Add a new task"
          className="add-new-task"
          value={this.state.newTaskString}
          onChange={(e) => this.updateNewTaskString(e)}
          onKeyDown={(e) => this.addNewTask(e)} />




        {(this.state.taskData) ?
          <TaskList taskData={this.state.taskData}
            toggleDone={(task) => this.toggle(task, "done")}
            toggleFavourite={(task) => this.toggle(task, "favourited")}
          >
          </TaskList>
          : null
        }
      </section>
    )
  }
}
