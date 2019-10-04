import React, { Component } from 'react';
import EventList from './EventList';
import "react-bootstrap/dist/react-bootstrap.min.js";
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavBar from './NavBar';



const coverImageStyle = {
  // maxWidth: '1000px',
  // height: 'auto',
  flex: '1 1 0%',
    // position: 'relative',
    display: 'grid',
    overflow: 'hidden',
    height: '40%',
    width: '90%',
    // maxHeight:'600px',
    overflow:'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // opacity: '0.8',
    

}
const buttonStyle={
  color: 'black',
  backgroundColor: 'transparent',
  borderColor: 'black',
  // borderWidth: '1px',
  borderRadius: '15px',
  fontFamily:'Lato',
  fontSize:'18px',
  paddingLeft:'10px',
  paddingRight:'10px',
  paddingTop:'5px',
  paddingBottom:'5px',
  width:'100px',
  margin:'20px'
}

const centerTextStyle={
  fontFamily:'Lato',
  fontSize:'90px',
  fontWeight:'600',
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color:'white',
  transitionDelay: '2s'
}
const centerButtonStyle={
  fontFamily:'Lato',
  fontSize:'50px',
  fontWeight:'600',
  marginRight:'1px',
  textAlign:'center',
  color:'white',
  transitionDelay: '2s'
}

const subTextStyle={
  fontFamily:'Lato',
  fontSize:'30px',
  fontWeight:'600',
  position: 'absolute',
  top: '60%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color:'white'
}

const h1TextStyle={
  fontFamily:'Lato',
  fontSize:'30px',
  fontWeight:'600',
  textAlign:'center',
  marginTop:'80px',
  color:'black'
}

class HomeLayout extends Component {
  constructor() {
    super()
    this.state = {
      lat: 0,
      lng: 0,
      dis: 1000000,
    }
  }

  componentDidMount() { 
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          this.setState({
            lat: position.coords.latitude, 
            lng: position.coords.longitude
          })
        });
    } else {
      console.log("fail!")
    }
  }

  handleButtonClick(distance) {
    if(distance === 'else') {
      this.setState({
        dis: 1000000
      })
    } else {
      this.setState({
        dis: parseFloat(distance)
      })
    }
  }

  render() {
    console.log(this.state.lat + "," + this.state.lng);
    return (
      <div>
            <Row>
            <NavBar></NavBar>
              <Image style={coverImageStyle} src={require('./static/plant_drawing.jpg')}></Image>
              <div style={centerTextStyle}>Join and Enjoy</div>
              <div style={subTextStyle}>Discover Events Around You</div>

            </Row>
            <div style={{height:'100px'}}>
              <h1 style={h1TextStyle}>Popular Events</h1>

            </div>
            <div style={centerButtonStyle}>
              <button style={buttonStyle} onClick={() => this.handleButtonClick('1.6')}>1 mile</button>
              <button style={buttonStyle} onClick={() => this.handleButtonClick('3.2')}>2 mile</button>
              <button style={buttonStyle} onClick={() => this.handleButtonClick('8')}>5 mile</button>
              <button style={buttonStyle} onClick={() => this.handleButtonClick('16')}>10 mile</button>
              <button style={buttonStyle} onClick={() => this.handleButtonClick('else')}>All</button>
            </div>
             
            <Row>
              <Col xs={2} md={2}>
              
              </Col>
              <Col xs={8} md={8}>
                <EventList props = {this.state}></EventList>
              </Col>
              <Col xs={2} md={2}>
                
              </Col>
            </Row>
          </div>

          
        

    );
  }
}

export default HomeLayout;
