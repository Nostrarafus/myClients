import React, { Component } from 'react'
import InfoSingle from './InfoSingle';

export default class InfoList extends Component {
  render() {
    return (
      <ol className="Look-list">
      {
        this.props.Infos.map(info =>
          <InfoSingle
            key={info._id}
            {...info}
          >
          </InfoSingle>
        )
      }
    </ol>
    )
  }
}
