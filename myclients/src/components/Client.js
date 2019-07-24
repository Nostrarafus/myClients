import React, { Component } from 'react'

export default class Client extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  componentDidMount() {
    this.getSingleClient();
  }

  getSingleClient = () => {
    const { params } = this.props.match;
    console.log({ params })
    this.service.getSingleClient(params._id)
      .then(response => {
        const theclient = response;
        this.setState(theclient);
      })
      .catch((err) => {
        console.log(err)
      })
  }



  render() {
    return (
      <div>
        <h1>Aqui esta el perfil de: </h1>
      </div>
    )
  }
}
