import React, { Component } from 'react'
import LookSingle from './LookSingle';

export default class LookList extends Component {

  render() {

    return (
      <ol className="Look-list">
        {
          this.props.looks.map(look =>
            <LookSingle
              key={look._id}
              {...look}
            >
            </LookSingle>
          )
        }
      </ol>
    )
  }
}
