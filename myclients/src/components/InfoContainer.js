import React, { Component } from 'react'
import InfoList from './InfoList';
import AuthServices from '../services/Services';
import LookElement from './LookElement';

export default class InfoContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newInfoDescription: "",
      allInfo: [],
      clientData: this.props.clientData,
    }
    this.service = new AuthServices();
  }


  getInfos() {
    const clientID = this.state.clientData._id
    this.service.getLooks(clientID)
      .then(allLooks => {
        console.log(allLooks.looks)
        if (allLooks !== null) {
          allLooks = allLooks.looks.map(look => {
            return new LookElement(
              look._id, look.lookDescription, look.timestamp,
            )
          })
          this.setState({
            ...this.state,
            allLooks: allLooks
          })
        }
      })
  }

  addNewInfo(e) {
    if (e.key === 'Enter') {
      //  this.service.addInfo()
      //     .then(createdInfo=> {
      //       let infoClonedArray = [...this.state.tasks]

      //       createdInfo = createdTask.data

      //       infoClonedArray.unshift(
      //         new TaskElement(createdTask._id, createdTask.description, createdTask.timestamp, createdTask.favourited, createdTask.done)
      //       )

      //       this.setState({
      //         ...this.state,
      //         allInfo: infoClonedArray,
      //         newInfoDescription: ""
      //       })
      //     })

    }
  }


  render() {
    return (
      <section className="info-collection">
        <h1>{this.state.info}</h1>
        <form onSubmit={() => this.addNewInfo()}>
          <input type="text"
            placeholder="Add a new Info description"
            className="add-new-info"
            value={this.state.newInfoDescription}
            onChange={(e) => this.updateNewInfoDescription(e)}
            onKeyDown={(e) => this.addNewInfo(e)}
          />

        </form>

        <InfoList infos={this.state.allInfos} />


      </section>
    )
  }
}
