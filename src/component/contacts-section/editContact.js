import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/textInputGroup';
import axios from 'axios';

const initialState = {
  name: '',
  email: '',
  phone: '',
  errors:{}
}
class EditContact extends Component {
  constructor(){
    super()
    this.myForm = React.createRef()
  }
  state = {
    ...initialState
  }

  async componentDidMount() {
    const {id} = this.props.match.params;
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    })
  }

  onChange = (e) => {
    if(e.target.type === 'checkbox'){
      if(e.target.checked){
        this.setState({ 
          ...this.state,
          skills: this.state.skills.concat(e.target.value)
         })
      }
      else {
        this.setState({ 
          ...this.state,
          skills: this.state.skills.filter(skill => skill !== e.target.value)
         })
      }
    }
    else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }
  onSubmit = async(dispatch,e) => {
    e.preventDefault();

    const { name,email,phone } = this.state
    
    // check for errors
    if(name === '') {
      this.setState({
        errors:{name:'Name is required'}
        
      })
      return;
    }
    if(email === '') {
      this.setState({
        errors:{email:'Email is required'}
      })
      return;
    }
    if(phone === '') {
      this.setState({
        errors:{phone:'Phone is required'}
      })
      return;
    }

    // update process
    const updateContact = {
      name,
      email,
      phone
    }
    const {id} = this.props.match.params;
    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,updateContact);
    dispatch({  type:'UPDATE_CONTACT', payload: res.data })

    this.myForm.current.reset()
    this.setState({
      ...initialState
    });

    this.props.history.push('/');
    
    console.log(this.state)
  }
  render() {
    const { name,email,phone,errors} = this.state;
    return(
      <Consumer>
        {value => {
          const {dispatch} = value;
          return (
            <div className="card my-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form ref={this.myForm} onSubmit={this.onSubmit.bind(this,dispatch)}>

                  <TextInputGroup label="Name" name="name" placeholder="Enter name..." value={name} onChange={this.onChange} id="name" error={errors.name} />
                  <TextInputGroup label="Email" name="email" placeholder="Enter email..." value={email} onChange={this.onChange} id="email" error={errors.email} />
                  <TextInputGroup label="Phone" name="phone" placeholder="Enter phone..." value={phone} onChange={this.onChange} id="phone" error={errors.phone} />

                  <div className="form-group">
                    <input  type="submit" className="btn btn-block btn-success" value="Update Contact"/>
                  </div>
                </form>
              </div>       
            </div>
          )
        }}
      </Consumer>
    )
  }
}
export default EditContact;
