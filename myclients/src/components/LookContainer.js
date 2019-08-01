import React, { Component } from 'react'
import AuthServices from '../services/Services';
import LookList from './LookList';
// import MyContainer from './MyPoseContainer';
import Button from 'react-bootstrap/Button'

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
  }

  updateNewLookDescription(e) {
    let regexp = e.target.value
    regexp.replace(/^ +/gm, '')
    this.setState({
      ...this.state,
      newLookDescription: regexp
    })
  }

  addNewLook = (e) => {
    e.preventDefault();
    const newLook = this.state.newLookDescription
    const clientID = this.state.clientID
    const lookPic = this.state.newLookFile

    this.service.addNewLook(newLook, clientID, lookPic)
      .then(response => {
        this.setState({
          ...this.state,
          newLookDescription: "",
          newLookFile: null,
          looksData: response.looks
        });
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
      <section className="looks-collection">
        <form onSubmit={this.addNewLook} encType="multipart/form-data" className="looksForm">
          <input type="text"
            placeholder="Add a new Look description"
            className="add-new-look"
            value={this.state.newLookDescription}
            onChange={(e) => this.updateNewLookDescription(e)}
          />

          <input type="file" placeholder="choose your look pic" onChange={(e) => this.handlePhotoChange(e)} />
          <Button type="submit"  variant="outline-success">add your cool look</Button>
        </form>

        {(this.state.looksData) ?
          // <MyContainer>
            <LookList looks={this.state.looksData} />
          // </MyContainer>
          : <h5>Loading...</h5>
        }

      </section>
    )
  }
}
