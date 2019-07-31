import React, { Component } from 'react'
import TaskSingle from './TaskSingle';

export default class TaskList extends Component {
    render() {
        return (
            <ol className="task-list">
                {
                    this.props.taskData.map(task =>
                        <TaskSingle
                            toggleDone={this.props.toggleDone}
                            toggleFavourite={this.props.toggleFavourite}
                            key={task._id}
                            {...task}
                        >

                        </TaskSingle>
                    )
                }
            </ol>
        )
    }
}
