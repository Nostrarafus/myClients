import React, { Component } from 'react'
import InfoSingle from './InfoSingle';

export default class InfoList extends Component {
  render() {
    return (
      <ol className="infos-list">
        {
          (this.props)?
          this.props.infoData.map((info, idx) =>
            <InfoSingle
              key={idx}
              infoData={info}
              infoID={this.props.infoID}
              deleteInfo={this.props.deleteInfo}
            >
            </InfoSingle>
          )
          :null
        }
      </ol>
    )
  }
}
