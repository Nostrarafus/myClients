import React, { Component } from 'react'
import InfoList from './InfoList';
import AuthServices from '../services/Services';


export default class InfoContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newInfoDescription: "",
      infoData: this.props.infoData,
      clientID: this.props.clientID,
      infoTitle: this.props.infoTitle,
      infoID: this.props.infoID,
    }
    this.service = new AuthServices();

    //  console.log(this.state)
  }


  // getInfos() {
  //   const clientID = this.state.clientID
  //   this.service.getLooks(clientID)
  //     .then(allInfo => {
  //       console.log(allInfo)
  //         this.setState({
  //           ...this.state,
  //           infoData: allInfo
  //         })
  //       })
  // }

  addNewInfo(e) {
    const newInfo = this.state.newInfoDescription
    const clientID = this.state.clientID
    const infoTitle = this.state.infoTitle
    if (e.key === 'Enter') {
      this.service.addNewInfo(newInfo, clientID, infoTitle)
        .then(createdInfo => {
          // console.log(createdInfo)
          let infosClonedArray = [...this.state.infoData]
          infosClonedArray.unshift(createdInfo)
          this.setState({
            ...this.state,
            looks: infosClonedArray,
            newInfoDescription: ""
          })
        })
    }
  }


  updateNewInfoDescription(e) {
    this.setState({
      ...this.state,
      newInfoDescription: e.target.value
    })
  }


  render() {
    return (
      <section className="info-collection">

        <h1>{this.state.infoTitle}</h1>
        <input type="text"
          placeholder="Add a new Info description"
          className="add-new-info"
          value={this.state.newInfoDescription}
          onChange={(e) => this.updateNewInfoDescription(e)}
          onKeyDown={(e) => this.addNewInfo(e)}
        />

        {(this.state.infoData) ?
          <InfoList infoData={this.state.infoData} infoID={this.state.infoID} />
          : null
        }


      </section>
    )
  }
}
