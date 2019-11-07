import React, { Component } from 'react';
import { Consumer } from '../../context';
import uuid from 'uuid';
import TextInputGroup from '../layout/textInputGroup';
import axios from 'axios';

const initialState = {
  name: '',
  email: '',
  phone: '',
  country: '',
  gender: '',
  skills: [],
  errors:{}
}
class AddContact extends Component {
  constructor(){
    super()
    this.myForm = React.createRef()
  }
  state = {
    ...initialState
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
  onSubmit = (dispatch,e) => {
    e.preventDefault();

    const { name,email,phone,country,gender,skills } = this.state
    const newContact = {
      id:uuid(),
      name,
      email,
      phone,
      country,
      gender,
      skills
    }

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

    axios.post(`https://jsonplaceholder.typicode.com/users`,newContact)
          .then(res=> dispatch({  type:'ADD_CONTACT', payload: res.data }))

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
                    <label htmlFor="country">Choose Your Country</label>
                    <select name="country" className='form-control form-control-lg' onChange={this.onChange} id='country' >
                      <option>Choose Your Country</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="India">India</option>
                      <option value="Pakistan">Pakistan</option>
                    </select>
                  </div> 

                  <div className="form-group">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gender"  onChange={this.onChange} value="Male" id="gender1" />
                      <label htmlFor="gender1" className="form-check-label">Male</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gender"  onChange={this.onChange} value="Female" id="gender2" />
                      <label htmlFor="gender2" className="form-check-label">Female</label>
                    </div>
                  </div>

                  <div className="form-group">
                    <h5>Skills</h5>
                    <div className="form-check">
                      <input name="skills" className="form-check-input" type="checkbox"  onChange={this.onChange} value="HTML5" id="html" />
                      <label htmlFor="html" className="form-check-label">HTML5</label>
                    </div>
                    <div className="form-check">
                      <input name="skills" className="form-check-input" type="checkbox"   onChange={this.onChange} value="CSS3" id="css" />
                      <label htmlFor="css" className="form-check-label">CSS3</label>
                    </div>
                    <div className="form-check">
                      <input name="skills" className="form-check-input" type="checkbox"   onChange={this.onChange} value="Javascript" id="js" />
                      <label htmlFor="js" className="form-check-label">Javascript</label>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <input  type="submit" className="btn btn-block btn-success" value="Submit"/>
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
export default AddContact;
