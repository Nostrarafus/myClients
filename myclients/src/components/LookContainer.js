import React, { Component } from 'react'
import AuthServices from '../services/Services';
import LookList from './LookList';
import LookElement from './LookElement';


export default class LookContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newLookDescription: "",
      newLookPic: "",
      allLooks: [],
      clientData: this.props.clientData
    }
    this.service = new AuthServices();
  }
  componentDidMount() {
    this.getLooks()

  }


  getLooks() {
    const clientID = this.props.clientData._id
    this.service.getLooks(clientID)
      .then(allLooks => {
        console.log(allLooks)
        if(allLooks !== null){
        allLooks = allLooks.map(look => {
          return new LookElement(
            look._id, look.description, look.timestamp,
          )
        })
        this.setState({
          ...this.state,
          allLooks: allLooks
        })}
      })
  }

  updateNewLookDescription(e) {
    this.setState({
      ...this.state,
      newLookDescription: e.target.value
    })
  }

  addNewLook(e) {
    const newLook = this.state.newLookDescription
    const clientID = this.state.clientData._id
    if (e.key === 'Enter') {
      this.service.addNewLook(newLook, clientID)
        .then(createdLook => {
          console.log(createdLook)
          let looksClonedArray = [...this.state.allLooks]
          looksClonedArray.unshift(
            new LookElement(createdLook._id, createdLook.description, createdLook.timestamp)
          )

          this.setState({
            ...this.state,
            looks: looksClonedArray,
            newLookDescription: ""
          })
        })
    }
  }

  render() {
    // console.log(this.props.clientData)
      // console.log(this.state.clientData)
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
