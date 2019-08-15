import React, { Component } from 'react'
import AuthServices from '../services/Services';
import LookList from './LookList';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Button from 'react-bootstrap/Button'
import ZoomImg from './ZoomImg';

export default class LookContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newLookDescription: "",
      newLookFile: null,
      newLookFileFromCamera: null,
      looksData: this.props.looksData,
      clientID: this.props.clientID,
      showCamera: false,
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

  onTakePhoto(dataUri) {
    console.log(dataUri)
    this.setState({
      ...this.state,
      newLookFileFromCamera: dataUri,
    })
    // this.service.addNewLook(newLook, clientID, dataUri)
    //   // Do stuff with the dataUri photo...
    //   // console.log('takePhoto');
    //   .then(response => {
    //     this.setState({
    //       ...this.state,
    //       newLookDescription: "",
    //       looksData: response.looks,
    //       showCamera: false,
    //     })
    //   })
  }

  addNewLookFromCamera = (e) => {
    e.preventDefault();
    const newLook = this.state.newLookDescription
    const clientID = this.state.clientID
    const lookPicCam = this.refs.previewPic
    this.service.addNewLookFromCamera(newLook, clientID, lookPicCam)
      .then(response => console.log(response))
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
          newLookFileFromCamera: null,
          looksData: response.looks,
        });
      })
  }

  showCamera() {
    this.setState({
      ...this.state,
      showCamera: true
    })
  }

  deleteLook = (lookID) => {
    const clientID = this.state.clientID
    this.service.deleteLook(lookID, clientID)
      .then(response => {
        this.setState({
          ...this.state,
          looksData: response.looks,
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
        {
          (this.state.showCamera) ?
            <Camera
              onTakePhoto={(dataUri) => { this.onTakePhoto(dataUri); }}
            />
            : ""
        }
        <form onSubmit={this.addNewLook} encType="multipart/form-data" className="looksForm">
          <input type="text"
            placeholder="Add a new Look description"
            className="add-new-look"
            value={this.state.newLookDescription}
            onChange={(e) => this.updateNewLookDescription(e)}
          />
          <Button variant="outline-primary" onClick={() => this.showCamera()}>Take your look picture</Button>
          <Button type="file" variant="outline-primary"
            onChange={(e) => this.handlePhotoChange(e)}>choose your look pic</Button>
          <Button type="submit" variant="outline-success">add your cool look</Button>

        </form>

        {
          (this.state.newLookFileFromCamera) ?
            <div className="previewPicWrapper">
              <p>Do you like this pic?</p>
              <ZoomImg id="previewPic" src={this.state.newLookFileFromCamera} />
              <Button type="submit" variant="outline-success" onClick={this.addNewLookFromCamera}>
                add your cool look from taken pic</Button>
            </div>
            : null
        }

        {(this.state.looksData) ?
          <LookList
            looks={this.state.looksData}
            deleteLook={this.deleteLook}
          />
          : <h5>Loading...</h5>
        }

      </section>
    )
  }
}
