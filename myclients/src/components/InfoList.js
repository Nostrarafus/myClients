import React, { Component } from 'react'
import InfoSingle from './InfoSingle';

export default class InfoList extends Component {
  render() {
   // console.log(this.props.infoID)
    return (
      <ol className="infos-list">
        {
          (this.props)?
          this.props.infoData.map((info, idx) =>
            <InfoSingle
              key={idx}
              infoData={info}
              infoID={this.props.infoID}
            >
            </InfoSingle>
          )
          :null
        }
      </ol>
    )
  }
}
