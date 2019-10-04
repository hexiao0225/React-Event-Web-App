import React, { Component } from 'react';
import "react-bootstrap/dist/react-bootstrap.min.js";
// import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";



import NavBar from './components/NavBar';
// import Registration from './components/Registration';
// import LogIn from './components/LogIn';
// import event from './components/Event'
// import CreateEvent from './components/CreateEvent';
// import EventThumbNail from './components/EventThumbNail';
import AppRouter from './components/AppRouter'
// import EventList from './components/EventList'
// import CheckOut from './components/CheckOut'






class App extends Component {
  // state = {
  //      showSidebar: false,
  //    }
  render() {
    // const { showSidebar } = this.state;

    return (
      <AppRouter></AppRouter>
      
      // <Container>
        
        
      //       <Row style={{height:'100px'}}>
      //       </Row>
      //       <Row>
            
      //         <Col xs={12} md={2}>
      //         </Col>
      //         <Col xs={12} md={6}>
      //           <AppRouter></AppRouter>
      //         </Col>
      //         <Col xs={12} md={8}>
      //         </Col>
      //         <Col xs={6} md={4}>
      //         </Col>
      //       </Row>
      //     </Container>

          
        

    );
  }
}

export default App;
