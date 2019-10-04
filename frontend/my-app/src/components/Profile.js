import React from "react";
import Image from 'react-bootstrap/Image'
import axios from 'axios';
import NavBar from './NavBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const coverImageStyle = {

    flex: '1 1 0%',
      display: 'grid',
      overflow: 'hidden',
      height: '40%',
      width: '90%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
  
  }


// const imageStyle = {
//     maxWidth:'100px',
//     maxHeight:'100px',
//     textAlign:'center'
// }

// const joinButtonStyle = {
//     maxWidth:'100px',
//     maxHeight:'100px',
//     float:'left'
// }

// function getBase64(url) {
//     return axios
//       .get(url, {
//         responseType: 'arraybuffer'
//       })
//       .then(response => new Buffer(response.data, 'binary').toString('base64'))
//   }


export default class Profile extends React.Component{
    constructor(props){
        super(props);
      
        this.state = {
        //   bio : '',
        //   city : '',
        //   picture : null,
            events:null,
            hasEvent: false
        };
      }

    

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/profile/get-event/?userid=${localStorage.getItem('userid')}`)
        .then(res => {
            const items = res.data;
            this.setState({ 
                // bio:items.bio,
                // city:items.city,
                // picture:items.picture,
                events:items,
                hasEvent:true
             });
        })
        .catch(error => {
            console.log(error)
        });
    }

    
    render(){
        let profileText;
        
        if (!this.state.hasEvent){
            profileText = <p>No Events yet</p>
        }else{
            profileText = <h1>Your Purchased Events:</h1>
        }
        
        
        
        return(
            <>
            <Row style={{marginBottom:'200px'}}>
                <NavBar></NavBar>
                <Image style={coverImageStyle} src={require('./static/background_profile.jpeg')}></Image>
            </Row>
            <Row>
                <Col xs={2} md={2}></Col>
                <Col xs={8} md={8}>
                    {profileText}
                    {this.state.events && this.state.events.filter(event => event.participators.includes( parseInt(localStorage.getItem('userid')) )).map(event => (
                    <a href={"/event/" + event.id}>{event.name} </a>
                    ))}
                </Col>
                <Col xs={2} md={2}></Col>
                
            </Row>

            {/* <Row>
              <Col xs={2} md={2}>
              
              </Col>
              <Col xs={8} md={8}>
              {profileText}
              <div>
                <div>
                    <img src={this.state.picture}></img>
                    <div>
                        {this.state.bio}
                    </div>
                    <div>
                        {this.state.city}
                    </div>
                </div>
            </div>
            
              </Col>
              <Col xs={2} md={2}>
                
              </Col>
            </Row> */}
            </>
      )
    }
}


