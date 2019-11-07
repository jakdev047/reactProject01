import React, { Component } from 'react';
import Contact from './contact.js';
import {Consumer}from '../../context';

class Contacts extends Component {

  // dom render
  render() {
    return (
      <Consumer>
        {value => {
          const {contacts} = value;
          return (
            <div>
              <h2 className="display-4 mb-2">
                <span className="text-danger">Contact</span> List
              </h2>
              {
                contacts.length === 0 ? <h4 className="text-secondary my-3">There is no contact</h4> : contacts.map(contact => <Contact contact={contact} key={contact.id}/>)
              }
            </div>
          )
        }}
      </Consumer>
    )
  }
}
export default  Contacts;
