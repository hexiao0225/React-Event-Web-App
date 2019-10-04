import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Modal from 'react-bootstrap/Modal'
import CreateNewEventButton from './CreatNewEventButton';
import LogIn from './LogIn'
import LogOut from './LogOut'
import Registration from './Registration'




// const headingStyle = {
//     backgroundColor: "#607d8b",
//     boxShadow: 'none'

// }

const navBarStyle = {
  // opacity:'1',
  // position: 'absolute',
  // width: '100%vw',
  // background: 'transparent !important'
  position: 'absolute', 
  top: '30px', 
  height:'30px',
  left: 0, 
  right: 0, 
  bottom: 0, 
  justifyContent: 'center', 
  alignItems: 'center',
  color:'white'

}

const linkStyle = {
  color:'white',
  fontFamily:'Lato',
  fontWeight:'200'
}

const modalStyle = {
  fontFamily:'Lato',
  // width: '300px',
  // borderRadius:'20px',
  // backgroundColor:'grey'
}


export default class NavBar extends React.Component{

  constructor(props) {
    super(props);
    this.handleLoginShow = this.handleLoginShow.bind(this);
    this.handleLoginClose = this.handleLoginClose.bind(this);
    this.handleRegisterShow = this.handleRegisterShow.bind(this);
    this.handleRegisterClose = this.handleRegisterClose.bind(this);

    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      showLoginModal:false,
      showRegisterModal:false,
    };

    
  }

  handleLoginClose() {
    this.setState({ 
      showLoginModal: false
    });
    window.location.reload()
  }

  handleLoginShow() {
    this.setState({ showLoginModal: true });
  }

  handleRegisterClose() {
    this.setState({ 
      showRegisterModal: false
    });
  }

  handleRegisterShow() {
    this.setState({ showRegisterModal: true });
  }

  
  // componentDidMount() {
  //   if (this.state.logged_in) {
  //     fetch('http://127.0.0.1:8000/api/current-user/', {

  //     })
  //       .then(res => res.text())
  //       .then(text => {
  //         console.log(text)
  //       });
  //   }else{
  //     console.log("not logged in");
  //   }

   
  // }


  render(){
    const isLoggedIn = this.state.logged_in;
    let link;
    let profileLink;
    let registerLink;
    // let createProfileLink;
    let newEventButton;
    const username = localStorage.getItem('username');


    if (isLoggedIn){
      link = <LogOut></LogOut>
      profileLink = <Nav.Link style={linkStyle} href="/profile">{username}</Nav.Link>
      // createProfileLink = <Nav.Link style={linkStyle} href="/create-profile">Create your profile</Nav.Link>
      newEventButton = <CreateNewEventButton></CreateNewEventButton>

      
    }else{
      link = <Nav.Link style={linkStyle} onClick={this.handleLoginShow}>Log In</Nav.Link>
      registerLink = <Nav.Link style={linkStyle} onClick={this.handleRegisterShow}>Register</Nav.Link>
    }
    return(
      <Navbar style={navBarStyle}>
        <Navbar.Brand style={linkStyle} href="/">Event App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link style={linkStyle} href="/"></Nav.Link>
          </Nav>
          {newEventButton}
          {registerLink}
          {profileLink}
          {/* {createProfileLink} */}
          {link}
          
        </Navbar.Collapse>

        <Modal show={this.state.showLoginModal} onHide={this.handleLoginClose}>
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <Modal.Body style={modalStyle}>
            <LogIn></LogIn>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={this.handleLoginClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleLoginClose}>
              Save Changes
            </Button>
          </Modal.Footer> */}
        </Modal>

        <Modal show={this.state.showRegisterModal} onHide={this.handleRegisterClose}>
          <div style={modalStyle}>
            <Modal.Header closeButton>
              <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Registration></Registration>
            </Modal.Body>
            {/* <Modal.Footer>
              <Button variant="secondary" onClick={this.handleRegisterClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleRegisterClose}>
                Save Changes
              </Button>
            </Modal.Footer> */}
          </div>
        </Modal>

      </Navbar>
  )
  }
}


