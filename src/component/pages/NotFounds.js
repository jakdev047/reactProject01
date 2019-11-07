import React, { Component } from 'react'

export default class NotFounds extends Component {
  render() {
    return (
      <div>
        <h2 className="display-4"><span className="text-danger">404</span> Page Not Found</h2>
        <p className="leads">Sorry, that page does not exist</p>
      </div>
    )
  }
}
