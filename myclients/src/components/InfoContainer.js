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
    }
    this.service = new AuthServices();
    this.hobbies = "hobbies"
    console.log(this.state.infoData)
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
    const hobbies = this.hobbies
    if (e.key === 'Enter'){
    this.service.addNewInfo(newInfo, clientID, hobbies)
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
  }}



  updateNewInfoDescription(e) {
    this.setState({
      ...this.state,
      newInfoDescription: e.target.value
    })
  }


  render() {
    return (
      <section className="info-collection">
       
          <h1>Esta caja info se llama {this.props.infoClass}</h1>
          <input type="text"
            placeholder="Add a new Info description"
            className="add-new-info"
            value={this.state.newInfoDescription}
            onChange={(e) => this.updateNewInfoDescription(e)}
            onKeyDown={(e) => this.addNewInfo(e)}
          />

        {(this.state.infoData) ?
          <InfoList infos={this.state.infoData} />
          : null
        }


      </section>
    )
  }
}