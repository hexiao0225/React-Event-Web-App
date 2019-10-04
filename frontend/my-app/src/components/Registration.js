import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const buttonStyle={
  color: 'black',
  backgroundColor: 'transparent',
  borderColor: 'black',
  borderWidth: '1px',
  borderRadius: '20px',
  fontFamily:'Lato',
  fontSize:'15px',
  paddingLeft:'15px',
  paddingRight:'15px',
  paddingTop:'5px',
  paddingBottom:'5px',
  // marginLeft:'100px',
  left:'50%'
}

const errorMsgStyle={
  color: 'tomato',
  fontSize: '15px'
}

export default class Registration extends React.Component {
  constructor(props){
    super(props);
  
    this.state = {
      username : '',
      email : '',
      password1 :'',
      password2 :'',
      registered: false,
      error_msg: null
    };
  }

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  handleSubmit = e =>{
    e.preventDefault();
    console.log(this.state)
    const data = {
      username: this.state.username,
      email: this.state.email,
      password1 :this.state.password1,
      password2 :this.state.password2,
    }

    axios.post('http://localhost:8000/rest-auth/registration/', data)
    .then(res => {
      console.log(res)
      console.log(res.data);
      console.log(res.data.user)
      localStorage.setItem('token', res.data.key);
      localStorage.setItem('userid', res.data.user.id);
      localStorage.setItem('username', res.data.user.username);
      localStorage.setItem('useremail', res.data.user.email);
      console.log(localStorage.getItem('token'));
      console.log(localStorage.getItem('userid'));
      console.log(localStorage.getItem('username'));
      console.log(localStorage.getItem('useremail'));
      this.setState({
        registered:true
      })
      window.location.reload();
    } 
      ).catch(error => {
        console.log(error.response)
        console.log(error.response.data.email)
        console.log(error.response.data.username)
        this.setState({
          error_msg: error.response.data
        })
      });
  }
  

  render(){
    let registerSucceed = this.state.registered;
    let username = this.state.username;
    let registerSucceedText = '';
    
    if (registerSucceed){
      registerSucceedText = <h3 style={{fontFamily:'Lato',color:'#7dd31f'}}>Success!</h3>
    }

    
    return (
      <div>
          {registerSucceedText}
          <Form style={this.state.registered ? { display: 'none' } : {}} onSubmit={this.handleSubmit}>

            <Form.Group>
              <Form.Control type="email" 
                                name="email" 
                                placeholder="Email address"
                                value={this.state.email}
                                onChange={this.handle_change} />
            { this.state.error_msg && this.state.error_msg.email && <div style={errorMsgStyle}>&nbsp;&nbsp;&nbsp;{this.state.error_msg.email}</div>}
            </Form.Group>
            <Form.Group>
              <Form.Control type="username" 
                                name="username" 
                                placeholder="username"
                                value={this.state.username}
                                onChange={this.handle_change} />
            { this.state.error_msg && this.state.error_msg.username && <div style={errorMsgStyle}>&nbsp;&nbsp;&nbsp;{this.state.error_msg.username}</div>}
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" 
                                name="password1" 
                                placeholder="password(must be more than 8 characters)"
                                value={this.state.password1}
                                onChange={this.handle_change} />
            { this.state.error_msg && this.state.error_msg.password1 && <div style={errorMsgStyle}>&nbsp;&nbsp;&nbsp;{this.state.error_msg.password1}</div>}
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" 
                                name="password2" 
                                placeholder="password(must be more than 8 characters)"
                                value={this.state.password2}
                                onChange={this.handle_change} />
            { this.state.error_msg && this.state.error_msg.non_field_errors && <div style={errorMsgStyle}>&nbsp;&nbsp;&nbsp;{this.state.error_msg.non_field_errors}</div>}
            </Form.Group>
            <Button style={buttonStyle} type="submit">
                          Register
            </Button>
          </Form>


      </div>)
  }
    };
