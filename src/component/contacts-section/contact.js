import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Consumer} from '../../context';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Contact extends Component {
  // data store 
  state= {
    showContactInfo: false
  };
  // event
  onShowClick = (e) => {
    this.setState({
      showContactInfo: !this.state.showContactInfo
    })
  }
  onDeleteClick = (id,dispatch) => {

    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
          .then(res=> dispatch({ type: 'DELETE_CONTACT', payload: id }) )
  }
  // dom render
  render() {
    const {id,name,email,phone} = this.props.contact;
    return (
      <Consumer>
        {
          value => {
            const {dispatch} = value;
            return (
              <div className="card card-body my-3">
                <h3>
                  {name} 
                  <i className="fa fa-sort-desc" onClick={this.onShowClick} style={{cursor:'pointer'}}/>
                  <i className="fa fa-times" onClick={this.onDeleteClick.bind(this,id,dispatch)} style={{cursor:'pointer',float:'right',color: '#eb1b33'}}/>
                  <Link to={`contact/edit/${id}`}>
                    <i  className="fa fa-pencil-square-o" style={{cursor:'pointer',float:'right',color: '#000',marginRight:'1rem'}} />
                  </Link>
                    
                </h3>
                { this.state.showContactInfo ? 
                  <ul className="list-group">
                    <li className="list-group-item">Email: {email}</li>
                    <li className="list-group-item">Contact: {phone}</li>
                  </ul>
                  :
                  null
                }
              </div>
            )
          }
        }
      </Consumer>
    )
  }
}
Contact.propTypes = {
  contact: PropTypes.object.isRequired
}
export default Contact;
