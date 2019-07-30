import React, { Component } from 'react'
import AuthServices from '../services/Services';
import LookList from './LookList';




export default class LookContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newLookDescription: "",
      newLookFile: null,
      looksData: this.props.looksData,
      clientID: this.props.clientID,
    }
    this.service = new AuthServices();
   // console.log(this.state.looksData)
  }

  updateNewLookDescription(e) {
    this.setState({
      ...this.state,
      newLookDescription: e.target.value
    })
  }

  addNewLook = (e) => {
    e.preventDefault();
    const newLook = this.state.newLookDescription
    const clientID = this.state.clientID
    const lookPic = this.state.newLookFile

    this.service.addNewLook(newLook, clientID, lookPic)
      .then(createdLook => {
        console.log(createdLook)
        let looksClonedArray = [...this.state.looksData]
        looksClonedArray.unshift(
          createdLook
        )

        this.setState({
          ...this.state,
          looks: looksClonedArray,
          newLookDescription: "",
          newLookFile: null
        })
      })
  }




  handlePhotoChange(e) {
    this.setState({
      ...this.state,
      newLookFile: e.target.files[0]
    })
  }

  render() {

    return (
      <section className="task-collection">
        <form onSubmit={this.addNewLook} encType="multipart/form-data">
          <input type="text"
            placeholder="Add a new Look description"
            className="add-new-look"
            value={this.state.newLookDescription}
            onChange={(e) => this.updateNewLookDescription(e)}
          />

          <input type="file" placeholder="add your look pic" onChange={(e) => this.handlePhotoChange(e)} /> <br />

          <input type="submit" value="add your cool look" />
        </form>

        {(this.state.looksData) ?
          <LookList looks={this.state.looksData} />
          : null
        }

      </section>
    )
  }
}
