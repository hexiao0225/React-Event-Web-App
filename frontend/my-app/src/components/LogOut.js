import React from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios';

const buttonStyle={
  color: 'white',
  backgroundColor: 'transparent',
  borderColor: 'white',
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

export default class LogOut extends React.Component{

  validateForm(){
    return this.state.email.length>0&&this.state.email.includes("@")&&this.state.password.length > 0&&this.state.username.length>0;
  }

  handleSubmit = e =>{
      e.preventDefault();

      axios.post('http://127.0.0.1:8000/rest-auth/logout/')
      .then(res =>{
        console.log(res.data)
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        localStorage.removeItem('username');
        localStorage.removeItem('useremail');
        window.location.reload();
      } );

    }
  render(){
    return (
      <Form onSubmit={this.handleSubmit}>
        <Button style={buttonStyle} type="submit">
                Log Out
        </Button>
      </Form>
    )
  }
    };
    