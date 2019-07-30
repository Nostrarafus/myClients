import React, { Component } from 'react'
import InfoSingle from './InfoSingle';

export default class InfoList extends Component {
  render() {
    return (
      <ol className="infos-list">
        {
          (this.props.infos)?
          this.props.infos.map(info =>
            <InfoSingle
              key={info._id}
              {...info}
            >
            </InfoSingle>
          )
          :null
        }
      </ol>
    )
  }
}
