import React from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
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

export default class LogIn extends React.Component{
  constructor(props){
    super(props);
  
    this.state = {
      username:'',
      password : '',
      currUser: '',
      error_msg: null,
      loggedIn:false
    };
  }
  validateForm(){
    return this.state.email.length>0&&this.state.email.includes("@")&&this.state.password.length > 0&&this.state.username.length>0;
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
      const data = {
        password: this.state.password,
        username: this.state.username
      }
      axios.post('http://127.0.0.1:8000/rest-auth/login/', data)
      .then(response => {
        console.log(response);
        localStorage.setItem('token', response.data.key);
        localStorage.setItem('userid', response.data.user.id);
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('useremail', response.data.user.email);
        console.log(localStorage.getItem('token'));
        console.log(localStorage.getItem('userid'));
        console.log(localStorage.getItem('username'));
        console.log(localStorage.getItem('useremail'));
        this.setState({
          loggedIn:true
        })
      }).catch(err => {
        console.log(err.response)
        this.setState({
          error_msg: err.response.data
        })
      });
    }
  render(){
    let loginSucceed = this.state.loggedIn;
    let username = this.state.username;
    let loginSucceedText = '';
    
    if (loginSucceed){
      loginSucceedText = <h3 style={{fontFamily:'Lato',color:'#7dd31f'}}>Welcome Back!</h3>
    }

    return (
      <>
      {loginSucceedText}
      <Form style={this.state.loggedIn ? { display: 'none' } : {}} onSubmit={this.handleSubmit}>
        
        <Form.Group controlId="formBasicEmail">
          {/* <Form.Label>username</Form.Label> */}
          <Form.Control
            type="text" 
            name="username" 
            placeholder="username"
            value={this.state.username}
            onChange={this.handle_change}
             />
          <Form.Text className="text-muted">
          </Form.Text>
        { this.state.error_msg && this.state.error_msg.username && <div style={errorMsgStyle}>&nbsp;&nbsp;&nbsp;{this.state.error_msg.username}</div>}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control 
            type="password" 
            name="password"
            placeholder="Password" 
            value={this.state.password}
            onChange={this.handle_change}/>
          { this.state.error_msg && this.state.error_msg.password && <div style={errorMsgStyle}>&nbsp;&nbsp;&nbsp;{this.state.error_msg.password}</div>}
          { this.state.error_msg && this.state.error_msg.non_field_errors && <div style={errorMsgStyle}>&nbsp;&nbsp;&nbsp;{this.state.error_msg.non_field_errors}</div>}
        </Form.Group>
      
        <Button style={buttonStyle} type="submit">
          Log In
        </Button>
      </Form>
      </>
    )
  }
    };
    
